import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

interface LeadPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  smsConsent?: boolean;
}

async function sendTwilioSms(lead: LeadPayload) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.BUSINESS_OWNER_PHONE;

  if (!sid || !token || !from || !to) {
    console.warn('Twilio env vars not configured — skipping SMS');
    return;
  }

  const body = [
    `🔔 New Lead — ${lead.name} (${lead.businessName})`,
    `📞 ${lead.phone}`,
    `✉️  ${lead.email}`,
    `🛠  Service: ${lead.service}`,
    lead.smsConsent ? '✅ SMS consent given' : '',
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

  if (!res.ok) console.error('Twilio error:', await res.text());
}

async function sendSendGridConfirmation(lead: LeadPayload) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL ?? 'noreply@123smartmedia.com';
  if (!apiKey) { console.warn('SENDGRID_API_KEY not set — skipping email'); return; }

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
          subject: 'We received your request — 123 Smart Media',
        },
      ],
      from: { email: fromEmail, name: '123 Smart Media' },
      content: [
        {
          type: 'text/html',
          value: `
            <p>Hi ${lead.name},</p>
            <p>Thanks for reaching out! We received your request about
            <strong>${lead.service}</strong> for <strong>${lead.businessName}</strong>
            and will send a custom demo preview within 24 hours.</p>
            ${lead.smsConsent ? '<p>You\'ve also opted in to receive SMS updates. Reply STOP to any text to opt out.</p>' : ''}
            <br/>
            <p>— The 123 Smart Media Team</p>
          `,
        },
      ],
    }),
  });

  if (!res.ok) console.error('SendGrid error:', await res.text());
}

async function notifyMakeWebhook(lead: LeadPayload) {
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
    const body = await request.json() as Partial<LeadPayload>;
    const { name, businessName, email, phone, service, message, smsConsent } = body;

    if (!name || !businessName || !email || !phone || !service) {
      return NextResponse.json(
        { error: 'name, businessName, email, phone, and service are required' },
        { status: 400 }
      );
    }

    const lead: LeadPayload = {
      name: String(name).slice(0, 120),
      businessName: String(businessName).slice(0, 120),
      email: String(email).slice(0, 254),
      phone: String(phone).slice(0, 30),
      service: String(service).slice(0, 120),
      message: message ? String(message).slice(0, 1000) : undefined,
      smsConsent: Boolean(smsConsent),
    };

    // Persist to contact_submissions table
    const supabase = createAdminClient();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;

    const { error: dbError } = await supabase.from('contact_submissions').insert({
      name: lead.name,
      business_name: lead.businessName,
      email: lead.email,
      phone: lead.phone,
      service_interest: [lead.service],
      message: lead.message ?? null,
      sms_consent: lead.smsConsent ?? false,
      ip_address: ip,
      status: 'new',
    });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    // Fire notifications concurrently — failures are non-fatal
    await Promise.allSettled([
      sendTwilioSms(lead),
      sendSendGridConfirmation(lead),
      notifyMakeWebhook(lead),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Leads API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
