'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, Info } from 'lucide-react';

// ─── Validation schema ────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  businessName: z.string().min(2, 'Business name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-().]{7,}$/, 'Please enter a valid phone number'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().optional(),
  smsConsent: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

const services = [
  'Web Development',
  'AI Chatbot',
  'SMS Automation',
  'AI Receptionist',
  'Full Growth Package',
  'Not sure — just exploring',
];

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function SmsTooltip() {
  const [visible, setVisible] = useState(false);
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        aria-label="Learn about SMS messages"
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-brand hover:text-white transition-colors"
      >
        <Info className="h-3 w-3" />
      </button>
      {visible && (
        <span
          role="tooltip"
          className="absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg"
        >
          We may send you SMS updates about your website demo, appointment reminders, or
          account alerts. Standard message rates apply. Reply STOP at any time to opt out.
        </span>
      )}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [smsConfirmed, setSmsConfirmed] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const smsConsent = watch('smsConsent');

  async function onSubmit(data: FormValues) {
    setServerError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error((json as { error?: string }).error ?? 'Submission failed');
      }
      setSmsConfirmed(!!data.smsConsent);
      setSubmitted(true);
      reset();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';
  const errorClass = 'mt-1 text-xs text-red-600';

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* ── Left col ───────────────────────────────────────────────────────── */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Get Your Free Site</h1>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form and we&apos;ll send a custom demo preview within 24 hours —
            no obligation, no sales pressure.
          </p>

          <div className="mt-8 space-y-5">
            <div className="flex items-start gap-3 text-gray-700">
              <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold">Call or Text</p>
                <a
                  href={`tel:${(process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '8001237627').replace(/\D/g, '')}`}
                  className="text-brand hover:underline"
                >
                  {process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-SMART'}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-gray-700">
              <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:hello@123smartmedia.com" className="text-brand hover:underline">
                  hello@123smartmedia.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-gray-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
              <div>
                <p className="font-semibold">Service Area</p>
                <p>Long Island, NY &amp; All 50 US States · Remote-first</p>
              </div>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Licensed &amp; Insured · 30-day money-back guarantee
          </div>
        </div>

        {/* ── Right col: form ────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12 text-center"
            >
              <span className="text-5xl" aria-hidden="true">🎉</span>
              <h2 className="text-2xl font-bold text-gray-900">Request Received!</h2>
              <p className="text-gray-600">
                We&apos;ll build a custom demo preview and reach out within 24 hours.
                Check your email for confirmation.
              </p>
              {smsConfirmed && (
                <div className="mt-2 rounded-lg bg-blue-50 px-4 py-2 text-sm text-blue-800">
                  📱 SMS opt-in confirmed. You&apos;ll get updates via text — reply STOP anytime to opt out.
                </div>
              )}
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Submit another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Tell us about your project</h2>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  className={inputClass}
                  {...register('name')}
                />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
              </div>

              {/* Business name */}
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="businessName"
                  type="text"
                  autoComplete="organization"
                  placeholder="Smith Plumbing LLC"
                  className={inputClass}
                  {...register('businessName')}
                />
                {errors.businessName && <p className={errorClass}>{errors.businessName.message}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@smithplumbing.com"
                  className={inputClass}
                  {...register('email')}
                />
                {errors.email && <p className={errorClass}>{errors.email.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  className={inputClass}
                  {...register('phone')}
                />
                {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  className={inputClass}
                  {...register('service')}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service…
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {errors.service && <p className={errorClass}>{errors.service.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Tell us more (optional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Current website URL, biggest pain point, timeline…"
                  className={inputClass}
                  {...register('message')}
                />
              </div>

              {/* SMS Consent */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
                    {...register('smsConsent')}
                  />
                  <span className="text-sm text-gray-700">
                    I agree to receive SMS messages from 123 Smart Media about my website,
                    demo updates, and account alerts.
                    <SmsTooltip />
                  </span>
                </label>
                {smsConsent && (
                  <p className="mt-2 text-xs text-gray-500">
                    ✓ You&apos;ll receive SMS updates at the phone number above. Msg &amp; data rates may
                    apply. Reply STOP to opt out at any time.
                  </p>
                )}
              </div>

              {serverError && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                  {serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? 'Sending…' : (
                  <>
                    Get My Free Proposal
                    <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                No spam. We&apos;ll only use your info to respond to this request.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
