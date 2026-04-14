// ─── Twilio SMS service ───────────────────────────────────────────────────────
// All sends are fire-and-forget — failures are logged but never throw.

async function twilioFetch(body: URLSearchParams) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;

  if (!sid || !token || !from) {
    console.warn('[Twilio] env vars not configured — skipping SMS');
    return;
  }

  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ From: from, ...Object.fromEntries(body), }),
    }
  );

  if (!res.ok) console.error('[Twilio] send error:', await res.text());
}

// ─── 1. SMS opt-in confirmation — sent to the prospect ───────────────────────
export async function sendSmsOptInConfirmation({
  phone,
  name,
  businessName,
}: {
  phone: string;
  name: string;
  businessName: string;
}) {
  const message = [
    `Hi ${name}! This is 123 Smart Media.`,
    `We received your request for ${businessName} and will send your custom website demo within 24 hrs.`,
    `Reply STOP to opt out. Msg & data rates may apply.`,
  ].join(' ');

  await twilioFetch(new URLSearchParams({ To: phone, Body: message }));
}

// ─── 2. Internal new-lead alert — sent to business owner ─────────────────────
export async function sendLeadAlertSms({
  name,
  businessName,
  phone,
  service,
  smsConsent,
}: {
  name: string;
  businessName: string;
  phone: string;
  service: string;
  smsConsent?: boolean;
}) {
  const ownerPhone = process.env.BUSINESS_OWNER_PHONE;
  if (!ownerPhone) {
    console.warn('[Twilio] BUSINESS_OWNER_PHONE not set — skipping owner SMS');
    return;
  }

  const lines = [
    `🔔 New Lead — ${name} (${businessName})`,
    `📞 ${phone}`,
    `🛠  Service: ${service}`,
    smsConsent ? '✅ SMS consent given' : '❌ No SMS consent',
  ];

  await twilioFetch(new URLSearchParams({ To: ownerPhone, Body: lines.join('\n') }));
}

// ─── 3. Missed-call text-back ─────────────────────────────────────────────────
export async function sendMissedCallTextBack({
  phone,
  businessName,
}: {
  phone: string;
  businessName: string;
}) {
  const message = `Hi! You just missed a call from ${businessName}. We'd love to help — reply here or call us back and we'll get you taken care of right away! Reply STOP to opt out.`;
  await twilioFetch(new URLSearchParams({ To: phone, Body: message }));
}

// ─── 4. Appointment reminder ──────────────────────────────────────────────────
export async function sendAppointmentReminder({
  phone,
  businessName,
  date,
}: {
  phone: string;
  businessName: string;
  date: string;
}) {
  const message = `Hi! Reminder for your appointment with ${businessName} on ${date}. Reply C to confirm or R to reschedule. Reply STOP to opt out.`;
  await twilioFetch(new URLSearchParams({ To: phone, Body: message }));
}
