import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Done-for-you websites, AI chatbots, SMS automation, and AI receptionists built specifically for home service businesses. Plans start at $199/mo with no contracts.',
};

const services = [
  {
    icon: '🌐',
    title: 'Professional Website',
    price: 'Included in all plans',
    description:
      'A fast, mobile-first website built to rank locally and convert visitors into booked jobs — live within 7 business days.',
    features: [
      'Mobile-first, SEO-optimized design',
      'LocalBusiness schema markup',
      'Google Analytics & Search Console setup',
      'Contact form wired to email & CRM',
      'Unlimited content edits',
      'SSL certificate & hosting included',
    ],
    cta: 'Book a Free Consultation',
    ctaHref: '/contact',
  },
  {
    icon: '🤖',
    title: 'AI Chatbot',
    price: 'Add-on from $49/mo',
    description:
      '24/7 lead capture and qualification — so you never miss a potential customer, even at 2am on a Sunday.',
    features: [
      '24/7 lead qualification & FAQ automation',
      'Custom trained on your services & pricing',
      'Appointment scheduling integration',
      'Handoff to live agent when needed',
      'Monthly conversation analytics',
    ],
    cta: 'See It in Action',
    ctaHref: '/demo',
  },
  {
    icon: '📱',
    title: 'SMS Automation',
    price: 'Add-on from $39/mo',
    description:
      'Speed-to-lead is everything. Auto-text missed callers within 60 seconds and watch your close rate climb.',
    features: [
      'Instant missed-call text-back',
      'Automated review request sequences',
      'Appointment reminders',
      'Re-engagement campaigns',
      'Two-way texting inbox',
    ],
    cta: 'Book a Free Consultation',
    ctaHref: '/contact',
  },
  {
    icon: '📞',
    title: 'AI Receptionist',
    price: 'Add-on from $79/mo',
    description:
      'Never lose a job to voicemail again. Your AI receptionist answers calls in your business name, qualifies the caller, and books the appointment.',
    features: [
      'Answers calls 24/7 in your business name',
      'Qualifies caller intent',
      'Books appointments directly to your calendar',
      'Transfers urgent calls to you',
      'Call recordings & transcripts',
    ],
    cta: 'Hear a Sample Call',
    ctaHref: '/demo',
  },
  {
    icon: '✉️',
    title: 'Email Automation',
    price: 'Add-on from $29/mo',
    description:
      'Stay top-of-mind with past customers and convert leads who aren\'t ready to book yet — all on autopilot.',
    features: [
      'Welcome & onboarding drip sequences',
      'Automated review requests after job completion',
      'Seasonal promotional campaigns',
      'Re-engagement for cold leads',
      'Branded email templates',
    ],
    cta: 'Book a Free Consultation',
    ctaHref: '/contact',
  },
  {
    icon: '📣',
    title: 'Social Media Automation',
    price: 'Add-on from $49/mo',
    description:
      'Keep your social profiles active without lifting a finger. We auto-post content that builds credibility and attracts local customers.',
    features: [
      'Auto-post to Facebook & Instagram',
      'Content calendar tailored to your industry',
      'Before/after project showcases',
      'Seasonal and promotional posts',
      'Engagement monitoring',
    ],
    cta: 'Book a Free Consultation',
    ctaHref: '/contact',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0040cc] to-[#0d0d2b] px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-300">What We Do</p>
          <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">
            Every Tool You Need to Fill Your Schedule
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-blue-100">
            A complete digital stack built exclusively for home service businesses — from your first website to full AI automation.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-blue-200">
            <ShieldCheck className="h-4 w-4 text-green-300" />
            U.S.-based team · No contracts · Plans from $199/mo
          </div>
        </div>
      </section>

      {/* ── Services grid ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon, title, price, description, features, cta, ctaHref }) => (
            <div
              key={title}
              className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-4xl" aria-hidden="true">{icon}</span>
              <h2 className="mt-4 text-xl font-bold text-gray-900">{title}</h2>
              <p className="mt-0.5 text-sm font-semibold text-brand">{price}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={ctaHref}
                className="mt-6 rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Not Sure Which Services You Need?</h2>
          <p className="mt-4 text-gray-600">
            Book a free 15-minute call and we&apos;ll build a custom recommendation based on your business, market, and goals.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-brand px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl sm:w-auto"
            >
              Book a Free Consultation →
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-xl border-2 border-brand px-8 py-4 text-base font-semibold text-brand transition-colors hover:bg-brand hover:text-white sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
