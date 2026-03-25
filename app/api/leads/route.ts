import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Lead } from '@/lib/supabase';

// Use the service-role key server-side so RLS doesn't block inserts
function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase server env vars');
  return createClient(url, key);
}

async function sendTwilioSms(lead: Lead) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.BUSINESS_OWNER_PHONE;

  if (!sid || !token || !from || !to) {
    console.warn('Twilio env vars not configured — skipping SMS');
    return;
  }

  const body = [
    `🔔 New Lead — ${lead.name}`,
    `📞 ${lead.phone}`,
    `✉️  ${lead.email}`,
    `🛠  Service: ${lead.service}`,
    lead.message ? `💬 "${lead.message}"` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Twilio error:', text);
  }
}

async function sendSendGridConfirmation(lead: Lead) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL ?? 'noreply@123smartmedia.com';

  if (!apiKey) {
    console.warn('SENDGRID_API_KEY not configured — skipping confirmation email');
    return;
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: lead.email, name: lead.name }],
          subject: "We received your request — 123 Smart Media",
        },
      ],
      from: { email: fromEmail, name: '123 Smart Media' },
      content: [
        {
          type: 'text/html',
          value: `
            <p>Hi ${lead.name},</p>
            <p>Thanks for reaching out! We received your request about <strong>${lead.service}</strong>
            and will be in touch within 1 business day.</p>
            <p>In the meantime, feel free to call us directly.</p>
            <br/>
            <p>— The 123 Smart Media Team</p>
          `,
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('SendGrid error:', text);
  }
}

async function notifyMakeWebhook(lead: Lead) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) return;

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => console.error('Make.com webhook error:', err));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, message } = body as Partial<Lead>;

    // Basic server-side validation
    if (!name || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'name, email, phone, and service are required' },
        { status: 400 }
      );
    }

    // Sanitise — only allow expected fields
    const lead: Lead = {
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 254),
      phone: String(phone).slice(0, 30),
      service: String(service).slice(0, 120),
      message: message ? String(message).slice(0, 1000) : '',
      source: 'website-contact-form',
    };

    // 1. Persist to Supabase
    const supabase = getSupabaseAdmin();
    const { error: dbError } = await supabase.from('leads').insert(lead);
    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
    }

    // 2. Fire notifications concurrently — failures are non-fatal
    await Promise.allSettled([
      sendTwilioSms(lead),
      sendSendGridConfirmation(lead),
      notifyMakeWebhook(lead),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Lead API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
