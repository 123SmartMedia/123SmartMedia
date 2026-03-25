'use client';

import { useState } from 'react';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

const services = [
  'Web Development',
  'AI Chatbot',
  'SMS Automation',
  'AI Receptionist',
  'Full Growth Package',
  'Not sure — just exploring',
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? 'Submission failed');
      }

      setState('success');
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (err) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* ── Left col: info ───────────────────────────────────── */}
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Get Your Free Site</h1>
          <p className="mt-4 text-lg text-gray-600">
            Fill out the form and we&apos;ll be in touch within 1 business day with a
            custom proposal — no obligation, no sales pressure.
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
                <p>All 50 US States · Remote-first</p>
              </div>
            </div>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Licensed &amp; Insured · 30-day money-back guarantee
          </div>
        </div>

        {/* ── Right col: form ──────────────────────────────────── */}
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {state === 'success' ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <span className="text-5xl" aria-hidden="true">🎉</span>
              <h2 className="text-2xl font-bold text-gray-900">Request Received!</h2>
              <p className="text-gray-600">
                We&apos;ll review your details and reach out within 1 business day. Check
                your email for a confirmation.
              </p>
              <button
                onClick={() => setState('idle')}
                className="mt-4 rounded-lg border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Tell us about your project</h2>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(555) 000-0000"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700">
                  Service Interested In <span className="text-red-500">*</span>
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  value={form.service}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                >
                  <option value="">Select a service…</option>
                  {services.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Tell us more (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Current website URL, biggest pain point, timeline…"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                />
              </div>

              {state === 'error' && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60 transition-colors"
              >
                {state === 'submitting' ? 'Sending…' : 'Get My Free Proposal →'}
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
