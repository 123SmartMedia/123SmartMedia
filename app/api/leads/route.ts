import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendLeadConfirmation, sendLeadAlert } from '@/lib/sendgrid/emails';
import { sendSmsOptInConfirmation, sendLeadAlertSms } from '@/lib/twilio/sms';

export const dynamic = 'force-dynamic';

interface LeadPayload {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  smsConsent?: boolean;
}

async function notifyMakeWebhook(lead: LeadPayload) {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) return;
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => console.error('[Make.com] webhook error:', err));
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

    // Persist to contact_submissions
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
      console.error('[Leads] Supabase insert error:', dbError);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    // Fire all notifications concurrently — failures are non-fatal
    await Promise.allSettled([
      // Email: confirmation to prospect + internal alert to owner
      sendLeadConfirmation({
        name: lead.name,
        businessName: lead.businessName,
        email: lead.email,
        service: lead.service,
        smsConsent: lead.smsConsent,
      }),
      sendLeadAlert({
        name: lead.name,
        businessName: lead.businessName,
        email: lead.email,
        phone: lead.phone,
        service: lead.service,
        message: lead.message,
        smsConsent: lead.smsConsent,
      }),
      // SMS: opt-in confirmation to prospect (only if they consented)
      lead.smsConsent
        ? sendSmsOptInConfirmation({
            phone: lead.phone,
            name: lead.name,
            businessName: lead.businessName,
          })
        : Promise.resolve(),
      // SMS: internal new-lead alert to business owner
      sendLeadAlertSms({
        name: lead.name,
        businessName: lead.businessName,
        phone: lead.phone,
        service: lead.service,
        smsConsent: lead.smsConsent,
      }),
      // Make.com automation webhook
      notifyMakeWebhook(lead),
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('[Leads] error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
