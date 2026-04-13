'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    monthlyPrice: 497,
    annualPrice: 447,
    description: 'Perfect for contractors just getting started online.',
    features: [
      '5-page mobile-first website',
      'LocalBusiness SEO schema',
      'Contact form → Supabase + email notification',
      '1 service area page',
      'Google Analytics setup',
      'SSL + hosting included',
    ],
    cta: 'Get Started',
    highlight: false,
    addons: [
      { name: 'AI Chatbot', price: 99, description: '24/7 lead capture & FAQ bot' },
      { name: 'SMS Text-Back', price: 49, description: 'Auto-text missed callers within 60s' },
    ],
  },
  {
    name: 'Growth',
    monthlyPrice: 997,
    annualPrice: 897,
    description: 'The full stack for businesses ready to scale leads.',
    features: [
      'Everything in Starter',
      'AI Chatbot (24/7 lead capture)',
      'SMS automation — missed-call text-back',
      'Up to 5 service area pages',
      'Review request sequences',
      'Monthly performance report',
    ],
    cta: 'Most Popular — Get Started',
    highlight: true,
    addons: [
      { name: 'AI Receptionist', price: 149, description: 'Answers, qualifies & books calls 24/7' },
      { name: 'Email Automation', price: 79, description: 'Drip sequences + review requests' },
      { name: 'Social Automation', price: 99, description: 'Auto-post to Facebook & Instagram' },
    ],
  },
  {
    name: 'Elite',
    monthlyPrice: 1997,
    annualPrice: 1797,
    description: 'Full automation suite for established home service companies.',
    features: [
      'Everything in Growth',
      'AI Receptionist (answers & books calls)',
      'Unlimited service area pages',
      'Custom CRM integrations',
      'Priority support & dedicated account manager',
      'Quarterly strategy call',
    ],
    cta: 'Talk to Sales',
    highlight: false,
    addons: [
      { name: 'White-Label Reports', price: 199, description: 'Branded monthly reports for your clients' },
      { name: 'Custom CRM Build', price: 299, description: 'Tailored pipeline & automation workflows' },
    ],
  },
];

function AddonsAccordion({
  addons,
  highlight,
}: {
  addons: { name: string; price: number; description: string }[];
  highlight: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={['mt-6 rounded-xl border', highlight ? 'border-white/20' : 'border-gray-200'].join(' ')}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
          highlight
            ? 'text-blue-100 hover:bg-white/10'
            : 'text-gray-700 hover:bg-gray-50',
        ].join(' ')}
        aria-expanded={open}
      >
        <span>AI Add-Ons Available</span>
        <ChevronDown
          className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="addons"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 px-4 pb-4">
              {addons.map(({ name, price, description }) => (
                <li key={name} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className={['font-medium', highlight ? 'text-white' : 'text-gray-800'].join(' ')}>
                      {name}
                    </p>
                    <p className={highlight ? 'text-blue-200 text-xs' : 'text-gray-500 text-xs'}>
                      {description}
                    </p>
                  </div>
                  <span
                    className={[
                      'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold',
                      highlight ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand',
                    ].join(' ')}
                  >
                    +${price}/mo
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Simple, Transparent Pricing</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          No hidden fees. No long-term contracts. Cancel anytime.
        </p>

        {/* Monthly / Annual toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              !annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
              Save 10%
            </span>
          </button>
        </div>
      </div>

      {/* Tier cards */}
      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {tiers.map(({ name, monthlyPrice, annualPrice, description, features, cta, highlight, addons }, i) => {
          const price = annual ? annualPrice : monthlyPrice;
          return (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={[
                'relative flex flex-col rounded-2xl border p-8',
                highlight
                  ? 'border-brand bg-brand text-white shadow-xl ring-2 ring-brand'
                  : 'border-gray-200 bg-white text-gray-900 shadow-sm',
              ].join(' ')}
            >
              {highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                  Most Popular
                </span>
              )}

              <h2 className="text-xl font-bold">{name}</h2>
              <p className={['mt-1 text-sm', highlight ? 'text-blue-100' : 'text-gray-500'].join(' ')}>
                {description}
              </p>

              <div className="mt-6 flex items-end gap-1">
                <motion.span
                  key={`${name}-${price}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-extrabold"
                >
                  ${price}
                </motion.span>
                <span className={['mb-1 text-sm', highlight ? 'text-blue-200' : 'text-gray-400'].join(' ')}>
                  /mo{annual ? ' (billed annually)' : ''}
                </span>
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={highlight ? 'text-blue-200' : 'text-green-500'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* AI Add-Ons accordion */}
              <AddonsAccordion addons={addons} highlight={highlight} />

              <Link
                href="/contact"
                className={[
                  'mt-6 rounded-xl px-5 py-3 text-center text-sm font-bold transition-all',
                  highlight
                    ? 'bg-white text-brand hover:bg-blue-50 hover:shadow-md'
                    : 'bg-brand text-white hover:bg-brand-dark hover:shadow-md',
                ].join(' ')}
              >
                {cta}
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Trust line */}
      <p className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-500">
        <ShieldCheck className="h-4 w-4 text-green-600" />
        30-day money-back guarantee · No contracts · Licensed &amp; Insured
      </p>
    </div>
  );
}
