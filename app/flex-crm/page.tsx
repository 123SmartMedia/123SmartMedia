'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, BarChart3, MessageSquare, Mail, Kanban, Upload,
  Zap, Shield, Globe, Star, Check, ChevronRight
} from 'lucide-react';

// ─── Industries ───────────────────────────────────────────────────────────────
const industries = [
  { icon: '🏠', label: 'Real Estate' },
  { icon: '💰', label: 'Mortgage' },
  { icon: '🚗', label: 'Auto Sales' },
  { icon: '🛡️', label: 'Insurance' },
  { icon: '🔧', label: 'Home Services' },
  { icon: '⚡', label: 'Solar' },
];

// ─── Features ─────────────────────────────────────────────────────────────────
const features = [
  {
    icon: Kanban,
    title: 'Visual Pipeline (Kanban)',
    description: 'Drag-and-drop lead boards with optimistic updates. See your entire pipeline at a glance — by stage, rep, or source.',
  },
  {
    icon: MessageSquare,
    title: 'Bulk SMS & Two-Way Inbox',
    description: 'Send mass texts from your own Twilio number. Two-way inbox shows threaded replies in real time with unread badges.',
  },
  {
    icon: Mail,
    title: 'Email Automation',
    description: 'Reusable templates with merge tags, event-triggered sequences, and activity-logged delivery via SendGrid.',
  },
  {
    icon: Upload,
    title: 'CSV Import & Lead Ingest',
    description: 'Wizard-based CSV import with column mapping and duplicate detection. REST API + Facebook Lead Ads webhook for inbound leads.',
  },
  {
    icon: Zap,
    title: 'Lead Scoring & Automation',
    description: 'Auto-score leads based on disposition and last-30-day activity. Set event/timing rules that trigger SMS or email automatically.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    description: 'KPI cards, bar/donut/funnel charts, team performance breakdowns, and one-click CSV export — all date-range filterable.',
  },
  {
    icon: Users,
    title: 'Team Management',
    description: 'Role hierarchy (owner → admin → agent → viewer). Agents see only their assigned leads — enforced at the server level.',
  },
  {
    icon: Globe,
    title: 'White-Label Branding',
    description: 'Upload your logo, set your brand color, and present FlexCRM as your own product. Custom domain support available.',
  },
];

// ─── Pricing tiers ────────────────────────────────────────────────────────────
const plans = [
  {
    name: 'Lite',
    subtitle: 'Home Service Edition',
    price: 49,
    description: 'Built for solo contractors and small crews.',
    features: [
      '2 users included',
      'Up to 2,500 leads',
      'Lead management & Kanban board',
      'SMS text-back automation',
      'Email sequences',
      'CSV import',
      'Activity feed & notes',
      'Basic reporting',
    ],
    cta: 'Start Free Trial',
    highlight: false,
  },
  {
    name: 'Pro',
    subtitle: 'For growing teams',
    price: 129,
    description: 'Full feature set for teams ready to scale.',
    features: [
      '5 users included (+$15/seat)',
      'Unlimited leads',
      'Everything in Lite',
      'Bulk SMS & email',
      'Lead scoring & automation rules',
      'Role-based visibility',
      'In-app notifications',
      'Advanced reporting & CSV export',
      'Facebook Lead Ads webhook',
    ],
    cta: 'Start Free Trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    subtitle: 'White-label & custom',
    price: 299,
    description: 'Full white-label for agencies and large teams.',
    features: [
      'Unlimited users',
      'Unlimited leads',
      'Everything in Pro',
      'White-label branding (logo + color)',
      'Custom domain support',
      'Dedicated onboarding',
      'Priority support (SLA)',
      'API access + Zapier/Make',
    ],
    cta: 'Contact Sales',
    highlight: false,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const quotes = [
  {
    text: "We replaced three tools with FlexCRM. Our loan officers close 30% faster because everything is in one place.",
    name: 'Rachel M.',
    title: 'Sales Manager, Summit Mortgage',
    result: '30% faster close rate',
  },
  {
    text: "The bulk SMS alone paid for itself in the first week. We reactivated 40 dead leads in one afternoon.",
    name: 'Tony V.',
    title: 'Owner, Velocity Auto Group',
    result: '40 reactivated leads',
  },
  {
    text: "We white-labeled it for our insurance agency team. Clients think it's our proprietary software.",
    name: 'Dana K.',
    title: 'Agency Principal, Keystone Insurance',
    result: 'Full white-label deployed',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function FlexCRMPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-950 px-4 py-24 text-white sm:px-6 lg:px-8">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-300"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
            Now available — FlexCRM 1.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            The CRM that{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              adapts to your industry
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-400"
          >
            FlexCRM is a white-label CRM platform built for high-volume industries — mortgage, insurance, auto sales, real estate, and home services. One platform, built to scale from solo to enterprise.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              data-cta-type="primary"
              className="group w-full rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-violet-700 hover:shadow-violet-500/30 hover:shadow-xl sm:w-auto"
            >
              Start Free Trial
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link
              href="/flex-crm/login"
              className="w-full rounded-xl border border-gray-700 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
            >
              Sign In →
            </Link>
          </motion.div>

          {/* Industry badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex flex-wrap justify-center gap-3"
          >
            {industries.map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-gray-800 bg-gray-900 px-4 py-1.5 text-sm text-gray-300"
              >
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center sm:grid-cols-4">
          {[
            { value: '6', suffix: ' industries', label: 'Supported out of the box' },
            { value: '100%', suffix: '', label: 'White-label ready' },
            { value: '$15', suffix: '/seat', label: 'Simple per-seat add-on' },
            { value: '∞', suffix: '', label: 'Leads on Pro & Enterprise' },
          ].map(({ value, suffix, label }) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-gray-900">{value}<span className="text-lg">{suffix}</span></p>
              <p className="mt-1 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
              Platform Features
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
              Everything your team needs to close more deals
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              FlexCRM ships with the full stack — no plug-ins, no hidden add-ons. Every feature is production-ready on day one.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
                  <Icon className="h-5 w-5 text-violet-600" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── White-label callout ───────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-gray-950 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm font-semibold uppercase tracking-widest text-violet-400">
                White-Label Ready
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-white">
                Make it yours. Brand it as your own.
              </h2>
              <p className="mt-4 text-gray-400">
                Upload your logo, set your brand color, and point your own domain. Your clients will never know it&apos;s FlexCRM — they&apos;ll just think you built something great.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Custom logo + brand color applied sitewide',
                  'Custom domain support (Enterprise)',
                  'Your name in every email and SMS',
                  'Fully removable FlexCRM branding',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-violet-700"
              >
                Talk to Sales <ChevronRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl border border-gray-800 bg-gray-900 p-6"
            >
              {/* Mock white-label preview */}
              <div className="mb-4 flex items-center gap-2 border-b border-gray-800 pb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-xs font-bold text-white">YC</div>
                <span className="text-sm font-bold text-white">Your Company CRM</span>
                <span className="ml-auto rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">Live</span>
              </div>
              <div className="space-y-2">
                {['12 new leads today', '3 deals moved to Closing', 'Bulk SMS sent to 47 contacts'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2.5 text-xs text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[['47', 'Active Leads'], ['$284k', 'Pipeline'], ['89%', 'Response Rate']].map(([val, lbl]) => (
                  <div key={lbl} className="rounded-lg bg-gray-800 p-3 text-center">
                    <p className="text-lg font-bold text-white">{val}</p>
                    <p className="text-xs text-gray-500">{lbl}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Results</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">What teams are saying</h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-3">
            {quotes.map(({ text, name, title, result }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6"
              >
                <div className="mb-3 flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-gray-700">&ldquo;{text}&rdquo;</p>
                <span className="mt-4 inline-block self-start rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  {result}
                </span>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">Pricing</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-gray-600">14-day free trial on all plans. No credit card required.</p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map(({ name, subtitle, price, description, features: planFeatures, cta, highlight }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={[
                  'relative flex flex-col rounded-2xl border p-8 shadow-sm',
                  highlight
                    ? 'border-violet-500 bg-white ring-2 ring-violet-500 shadow-violet-100'
                    : 'border-gray-200 bg-white',
                ].join(' ')}
              >
                {highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-4 py-1 text-xs font-bold text-white">
                    Most Popular
                  </span>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{subtitle}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-gray-900">{name}</h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-gray-900">${price}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{description}</p>
                </div>

                <ul className="my-6 flex-1 space-y-3">
                  {planFeatures.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className={['mt-0.5 h-4 w-4 shrink-0', highlight ? 'text-violet-600' : 'text-green-500'].join(' ')} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={name === 'Enterprise' ? '/contact' : '/contact'}
                  className={[
                    'block w-full rounded-xl py-3 text-center text-sm font-bold transition-all',
                    highlight
                      ? 'bg-violet-600 text-white hover:bg-violet-700'
                      : 'border border-gray-200 bg-gray-50 text-gray-900 hover:border-violet-500 hover:bg-violet-50 hover:text-violet-700',
                  ].join(' ')}
                >
                  {cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">
            Need a custom plan?{' '}
            <Link href="/contact" className="font-semibold text-violet-600 hover:underline">
              Talk to us →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-950 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto mb-4 h-10 w-10 text-violet-400" aria-hidden="true" />
          <h2 className="text-3xl font-extrabold">Ready to run your business from one platform?</h2>
          <p className="mt-4 text-gray-400">
            Start your 14-day free trial. No credit card. Cancel anytime.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              data-cta-type="primary"
              className="w-full rounded-xl bg-violet-600 px-8 py-4 text-base font-bold text-white transition-all hover:bg-violet-700 sm:w-auto"
            >
              Start Free Trial →
            </Link>
            <Link
              href="/flex-crm/login"
              className="w-full rounded-xl border border-gray-700 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/5 sm:w-auto"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
