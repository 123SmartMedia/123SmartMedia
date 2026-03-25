import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Star, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Websites That Book Jobs For You',
};

const services = [
  {
    icon: '🌐',
    title: 'Professional Website',
    description: 'Mobile-first sites built to convert visitors into booked jobs.',
  },
  {
    icon: '🤖',
    title: 'AI Chatbot',
    description: '24/7 AI chat that qualifies leads and schedules appointments automatically.',
  },
  {
    icon: '📱',
    title: 'SMS Automation',
    description: 'Instant follow-up texts that turn missed calls into booked work.',
  },
  {
    icon: '📞',
    title: 'AI Receptionist',
    description: 'Never miss another call — AI answers, qualifies, and books for you.',
  },
];

// LocalBusiness JSON-LD for SEO
function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: '123 Smart Media',
    description: 'AI-powered digital marketing agency for home service businesses',
    telephone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-7627',
    url: 'https://123smartmedia.com',
    priceRange: '$$',
    areaServed: 'United States',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand to-blue-800 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Trust badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
            <ShieldCheck className="h-4 w-4 text-green-300" />
            Licensed &amp; Insured Agency
          </div>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            We Build Websites That{' '}
            <span className="text-accent">Book Jobs For You</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-blue-100">
            AI-powered websites, chatbots, and automations that work around the clock
            — so you can focus on the job, not chasing leads.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-accent-dark transition-colors sm:w-auto"
            >
              Get Your Free Site
            </Link>
            <Link
              href="/demo"
              className="w-full rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-colors sm:w-auto"
            >
              See Live Demo
            </Link>
          </div>

          {/* Social proof strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              4.9/5 from 120+ clients
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Serving all 50 states
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              30-day money-back guarantee
            </span>
          </div>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Everything You Need to Dominate Local Search
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-3xl" aria-hidden="true">{icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex rounded-lg border border-brand px-6 py-3 text-sm font-semibold text-brand hover:bg-brand hover:text-white transition-colors"
          >
            View All Services →
          </Link>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Licensed &amp; Insured
          </span>
          <span className="flex items-center gap-2">⭐ Google Partner</span>
          <span className="flex items-center gap-2">🔒 SOC 2 Compliant Hosting</span>
          <span className="flex items-center gap-2">🚀 Sites Live in 7 Days</span>
          <span className="flex items-center gap-2">💬 Dedicated Account Manager</span>
        </div>
      </section>
    </>
  );
}
