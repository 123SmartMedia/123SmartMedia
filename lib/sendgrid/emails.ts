// ─── SendGrid email service ───────────────────────────────────────────────────
// All sends are fire-and-forget — failures are logged but never throw.

const API_URL = 'https://api.sendgrid.com/v3/mail/send';

function apiKey() {
  return process.env.SENDGRID_API_KEY ?? '';
}

function fromEmail() {
  return process.env.SENDGRID_FROM_EMAIL ?? 'hello@123smartmedia.com';
}

async function send(payload: object) {
  const key = apiKey();
  if (!key) {
    console.warn('[SendGrid] SENDGRID_API_KEY not set — skipping email');
    return;
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('[SendGrid] send error:', res.status, text);
  }
}

// ─── Shared layout wrapper ────────────────────────────────────────────────────
function layout(body: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>123 Smart Media</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#0040cc 0%,#0066FF 100%);padding:28px 32px;">
            <p style="margin:0;font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">
              ⚡ 123 Smart Media
            </p>
            <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">
              Websites That Book Jobs For You
            </p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            ${body}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f8fafc;padding:20px 32px;border-top:1px solid #e5e7eb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
              123 Smart Media · Long Island, NY &amp; All 50 States<br/>
              <a href="mailto:hello@123smartmedia.com" style="color:#6b7280;">hello@123smartmedia.com</a>
              &nbsp;·&nbsp;
              <a href="https://123smartmedia.com/privacy-policy" style="color:#6b7280;">Privacy Policy</a>
              &nbsp;·&nbsp;
              <a href="https://123smartmedia.com/terms" style="color:#6b7280;">Terms of Service</a>
            </p>
            ${smsOptOutNotice}
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

const smsOptOutNotice = `
  <p style="margin:8px 0 0;font-size:11px;color:#9ca3af;">
    If you opted in to SMS messages, reply STOP to any text to unsubscribe. Msg &amp; data rates may apply.
  </p>
`;

// ─── 1. Lead confirmation — sent to the prospect ──────────────────────────────
export async function sendLeadConfirmation({
  name,
  businessName,
  service,
  email,
  smsConsent,
}: {
  name: string;
  businessName: string;
  service: string;
  email: string;
  smsConsent?: boolean;
}) {
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;">
      We got your request, ${name}!
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.6;">
      Thanks for reaching out about <strong>${service}</strong> for
      <strong>${businessName}</strong>. Our team will review your info and send
      a custom website demo preview within <strong>24 hours</strong>.
    </p>

    <!-- What happens next -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;margin-bottom:24px;">
      <tr><td style="padding:20px;">
        <p style="margin:0 0 12px;font-size:14px;font-weight:700;color:#1e40af;">What happens next:</p>
        <table cellpadding="0" cellspacing="0">
          ${['We build a custom demo preview of your new site', 'You receive a link within 24 hours', 'We hop on a quick call to walk you through it', 'Go live in as little as 7 days'].map((step, i) => `
          <tr>
            <td style="padding:4px 12px 4px 0;vertical-align:top;">
              <span style="display:inline-block;width:22px;height:22px;background:#0066FF;border-radius:50%;color:#fff;font-size:11px;font-weight:700;text-align:center;line-height:22px;">${i + 1}</span>
            </td>
            <td style="padding:4px 0;font-size:14px;color:#374151;">${step}</td>
          </tr>`).join('')}
        </table>
      </td></tr>
    </table>

    ${smsConsent ? `
    <p style="font-size:13px;color:#6b7280;background:#f9fafb;padding:12px 16px;border-radius:6px;margin-bottom:20px;">
      📱 <strong>SMS updates enabled.</strong> You'll receive a text confirmation shortly.
      Reply STOP to any message to opt out at any time.
    </p>` : ''}

    <p style="font-size:14px;color:#374151;line-height:1.6;">
      Questions in the meantime? Reply to this email or call us at
      <a href="tel:8001237627" style="color:#0066FF;font-weight:600;">(800) 123-7627</a>.
    </p>

    <p style="font-size:14px;color:#374151;margin-top:24px;">
      Talk soon,<br/>
      <strong>The 123 Smart Media Team</strong>
    </p>
  `;

  await send({
    personalizations: [{ to: [{ email, name }], subject: `Your free website demo is on the way, ${name}!` }],
    from: { email: fromEmail(), name: '123 Smart Media' },
    content: [{ type: 'text/html', value: layout(body) }],
  });
}

// ─── 2. Internal lead alert — sent to business owner ─────────────────────────
export async function sendLeadAlert({
  name,
  businessName,
  email,
  phone,
  service,
  message,
  smsConsent,
}: {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  message?: string;
  smsConsent?: boolean;
}) {
  const ownerEmail = process.env.SENDGRID_FROM_EMAIL ?? fromEmail();

  const body = `
    <h2 style="margin:0 0 4px;font-size:20px;font-weight:800;color:#111827;">🔔 New Lead</h2>
    <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">Submitted just now via 123smartmedia.com</p>

    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:20px;">
      ${[
        ['Name', name],
        ['Business', businessName],
        ['Email', `<a href="mailto:${email}" style="color:#0066FF;">${email}</a>`],
        ['Phone', `<a href="tel:${phone.replace(/\D/g, '')}" style="color:#0066FF;">${phone}</a>`],
        ['Service Interest', service],
        ['SMS Consent', smsConsent ? '✅ Yes' : '❌ No'],
        ...(message ? [['Message', message]] : []),
      ].map(([label, value], i) => `
      <tr style="background:${i % 2 === 0 ? '#f9fafb' : '#ffffff'};">
        <td style="padding:10px 16px;font-size:13px;font-weight:600;color:#374151;width:140px;">${label}</td>
        <td style="padding:10px 16px;font-size:13px;color:#111827;">${value}</td>
      </tr>`).join('')}
    </table>

    <a href="https://123smartmedia.com/dashboard" style="display:inline-block;background:#0066FF;color:#ffffff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">
      View in Dashboard →
    </a>
  `;

  await send({
    personalizations: [{ to: [{ email: ownerEmail }], subject: `🔔 New Lead: ${name} — ${businessName}` }],
    from: { email: fromEmail(), name: '123 Smart Media Alerts' },
    content: [{ type: 'text/html', value: layout(body) }],
  });
}

// ─── 3. Welcome email — sent to new subscribers on first login ────────────────
export async function sendWelcomeEmail({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  const displayName = name ?? 'there';

  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;">
      Welcome to 123 Smart Media, ${displayName}! 🎉
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.6;">
      Your account is set up and your dashboard is ready. Here's how to get the most out of your subscription:
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
      ${[
        ['🌐', 'Your Website', 'Our team will reach out within 24 hours to kick off your site build.'],
        ['📊', 'Your Dashboard', 'Track leads, manage billing, and control your AI tools in one place.'],
        ['🤖', 'Add AI Tools', 'Upgrade to add chatbot, SMS automation, or AI receptionist anytime.'],
        ['💳', 'Manage Billing', 'Update your plan or payment method from the Billing tab.'],
      ].map(([icon, title, desc]) => `
      <tr>
        <td style="padding:0 16px 16px 0;vertical-align:top;width:40px;">
          <span style="font-size:24px;">${icon}</span>
        </td>
        <td style="padding-bottom:16px;">
          <p style="margin:0 0 2px;font-size:14px;font-weight:700;color:#111827;">${title}</p>
          <p style="margin:0;font-size:13px;color:#6b7280;">${desc}</p>
        </td>
      </tr>`).join('')}
    </table>

    <a href="https://123smartmedia.com/dashboard" style="display:inline-block;background:#0066FF;color:#ffffff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;margin-bottom:24px;">
      Go to My Dashboard →
    </a>

    <p style="font-size:14px;color:#6b7280;line-height:1.6;">
      Questions? Reply to this email or call us at
      <a href="tel:8001237627" style="color:#0066FF;">(800) 123-7627</a>.
      We're here to help.
    </p>

    <p style="font-size:14px;color:#374151;margin-top:24px;">
      Welcome aboard,<br/>
      <strong>The 123 Smart Media Team</strong>
    </p>
  `;

  await send({
    personalizations: [{ to: [{ email, name: displayName }], subject: 'Welcome to 123 Smart Media — your dashboard is ready' }],
    from: { email: fromEmail(), name: '123 Smart Media' },
    content: [{ type: 'text/html', value: layout(body) }],
  });
}

// ─── 4. Subscription confirmation ────────────────────────────────────────────
export async function sendSubscriptionConfirmation({
  email,
  name,
  planName,
  billing,
  amount,
}: {
  email: string;
  name?: string;
  planName: string;
  billing: 'monthly' | 'annual';
  amount: number;
}) {
  const displayName = name ?? 'there';
  const billingLabel = billing === 'annual' ? 'per year' : 'per month';

  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#111827;">
      You're all set, ${displayName}! ✅
    </h2>
    <p style="margin:0 0 20px;font-size:15px;color:#4b5563;line-height:1.6;">
      Your <strong>${planName} Plan</strong> subscription is now active.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f7ff;border-radius:8px;padding:20px;margin-bottom:24px;">
      <tr><td>
        <p style="margin:0 0 4px;font-size:13px;color:#6b7280;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Your Plan</p>
        <p style="margin:0;font-size:20px;font-weight:800;color:#0040cc;">${planName} — $${amount.toLocaleString()} ${billingLabel}</p>
      </td></tr>
    </table>

    <p style="font-size:14px;color:#374151;line-height:1.6;margin-bottom:20px;">
      Our team will be in touch within 24 hours to begin your website setup.
      In the meantime, explore your dashboard to see what's included.
    </p>

    <a href="https://123smartmedia.com/dashboard" style="display:inline-block;background:#0066FF;color:#ffffff;font-size:15px;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;">
      Go to My Dashboard →
    </a>

    <p style="font-size:13px;color:#9ca3af;margin-top:24px;line-height:1.6;">
      To manage or cancel your subscription, visit
      <a href="https://123smartmedia.com/dashboard/billing" style="color:#0066FF;">Billing Settings</a>.
      No hidden fees. Cancel anytime.
    </p>
  `;

  await send({
    personalizations: [{ to: [{ email, name: displayName }], subject: `Your ${planName} Plan is active — let's get started!` }],
    from: { email: fromEmail(), name: '123 Smart Media' },
    content: [{ type: 'text/html', value: layout(body) }],
  });
}
