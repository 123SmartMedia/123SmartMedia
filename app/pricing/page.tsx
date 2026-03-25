'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

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
  },
];

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
              !annual
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
            ].join(' ')}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={[
              'rounded-full px-5 py-2 text-sm font-semibold transition-all',
              annual
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
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
        {tiers.map(({ name, monthlyPrice, annualPrice, description, features, cta, highlight }) => {
          const price = annual ? annualPrice : monthlyPrice;
          return (
            <div
              key={name}
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
                <span className="text-4xl font-extrabold">${price}</span>
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

              <Link
                href="/contact"
                className={[
                  'mt-8 rounded-xl px-5 py-3 text-center text-sm font-bold transition-colors',
                  highlight
                    ? 'bg-white text-brand hover:bg-blue-50'
                    : 'bg-brand text-white hover:bg-brand-dark',
                ].join(' ')}
              >
                {cta}
              </Link>
            </div>
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
