/**
 * Supabase Edge Function: submit-lead
 *
 * Receives a lead payload, stores it in the `leads` table, then
 * fires Twilio SMS + SendGrid email concurrently.
 *
 * Deploy:
 *   supabase functions deploy submit-lead
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const lead = await req.json();
    const { name, email, phone, service, message } = lead;

    if (!name || !email || !phone || !service) {
      return new Response(
        JSON.stringify({ error: 'name, email, phone, and service are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 1. Insert into Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { error: dbError } = await supabase.from('leads').insert({
      name,
      email,
      phone,
      service,
      message: message ?? '',
      source: 'edge-function',
    });

    if (dbError) {
      console.error('DB error:', dbError);
      return new Response(
        JSON.stringify({ error: 'Failed to save lead' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Twilio SMS
    const twilioSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const twilioToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const twilioFrom = Deno.env.get('TWILIO_FROM_NUMBER');
    const ownerPhone = Deno.env.get('BUSINESS_OWNER_PHONE');

    if (twilioSid && twilioToken && twilioFrom && ownerPhone) {
      const smsBody = [
        `🔔 New Lead — ${name}`,
        `📞 ${phone}`,
        `✉️  ${email}`,
        `🛠  Service: ${service}`,
        message ? `💬 "${message}"` : '',
      ]
        .filter(Boolean)
        .join('\n');

      fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioSid}/Messages.json`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${twilioSid}:${twilioToken}`)}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ From: twilioFrom, To: ownerPhone, Body: smsBody }),
      }).catch((e: Error) => console.error('Twilio error:', e));
    }

    // 3. SendGrid confirmation
    const sendgridKey = Deno.env.get('SENDGRID_API_KEY');
    const fromEmail = Deno.env.get('SENDGRID_FROM_EMAIL') ?? 'noreply@123smartmedia.com';

    if (sendgridKey) {
      fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sendgridKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email, name }], subject: 'We received your request — 123 Smart Media' }],
          from: { email: fromEmail, name: '123 Smart Media' },
          content: [
            {
              type: 'text/html',
              value: `<p>Hi ${name},</p><p>Thanks for reaching out! We received your request about <strong>${service}</strong> and will follow up within 1 business day.</p><p>— The 123 Smart Media Team</p>`,
            },
          ],
        }),
      }).catch((e: Error) => console.error('SendGrid error:', e));
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Edge function error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
