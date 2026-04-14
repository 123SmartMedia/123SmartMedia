'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, ShieldCheck, Star, Quote } from 'lucide-react';

// ─── Plan data ────────────────────────────────────────────────────────────────
const tiers = [
  {
    key: 'starter',
    name: 'Starter',
    monthlyPrice: 199,
    annualPrice: 159,
    description: 'Everything you need to get found online and start capturing leads.',
    features: [
      'Professional 5-page website',
      'Mobile-first, SEO-optimized design',
      'Unlimited content edits',
      'Contact form with email notifications',
      'Google Analytics & Search Console setup',
      'LocalBusiness schema markup',
      'SSL certificate & hosting included',
      'Live in 7 business days',
    ],
    cta: 'Get Started',
    highlight: false,
    addons: [
      { name: 'AI Chatbot', price: 49, description: '24/7 lead capture & FAQ automation' },
      { name: 'SMS Text-Back', price: 39, description: 'Auto-text missed callers within 60 seconds' },
    ],
  },
  {
    key: 'growth',
    name: 'Growth',
    monthlyPrice: 349,
    annualPrice: 279,
    description: 'The complete growth stack for businesses ready to dominate their market.',
    features: [
      'Everything in Starter',
      'AI Chatbot — 24/7 lead capture & booking',
      'SMS automation — missed-call text-back',
      'Up to 10 service area pages',
      'Automated review request sequences',
      'Monthly performance report',
      'Priority email & phone support',
    ],
    cta: 'Get Started',
    highlight: true,
    addons: [
      { name: 'AI Receptionist', price: 79, description: 'Answers, qualifies & books calls 24/7' },
      { name: 'Email Automation', price: 29, description: 'Drip sequences + review requests' },
      { name: 'Social Automation', price: 49, description: 'Auto-post to Facebook & Instagram' },
    ],
  },
  {
    key: 'elite',
    name: 'Elite',
    monthlyPrice: 499,
    annualPrice: 399,
    description: 'Full-service automation for established companies focused on scaling fast.',
    features: [
      'Everything in Growth',
      'AI Receptionist — answers & books calls 24/7',
      'Unlimited service area pages',
      'Custom CRM integrations',
      'Dedicated account manager',
      'Quarterly strategy call',
      'White-glove onboarding & setup',
    ],
    cta: 'Book a Call',
    highlight: false,
    addons: [
      { name: 'Social Media Business Page Setup', price: 299, oneTime: true, description: 'Professional setup of all business social profiles' },
      { name: 'Social Automation', price: 49, description: 'Auto-post to Facebook & Instagram' },
    ],
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqSections = [
  {
    heading: 'Getting Started',
    items: [
      {
        q: 'How quickly will my site be live?',
        a: 'Most sites are live within 7 business days of receiving your content (logo, photos, business info). We handle everything else.',
      },
      {
        q: 'Do I need to sign a long-term contract?',
        a: 'No contracts. Ever. Cancel anytime from your dashboard. You keep access through the end of your billing period.',
      },
      {
        q: 'Is there a setup fee?',
        a: 'No setup fees on any plan. The monthly price is all-inclusive.',
      },
      {
        q: 'What do I need to provide to get started?',
        a: 'Just your logo, a few photos of your work, your service area, and the services you offer. No design experience required — we do the heavy lifting.',
      },
    ],
  },
  {
    heading: 'Website Management',
    items: [
      {
        q: 'How many edits or updates can I request?',
        a: 'Unlimited. Text changes, photo swaps, new service pages, seasonal promotions — just send us a message and we handle it, typically within one business day.',
      },
      {
        q: 'Can I upgrade or downgrade my plan?',
        a: "Yes, anytime. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.",
      },
      {
        q: 'What happens to my website if I cancel?',
        a: "You retain access through the end of your billing period. Within 30 days of cancellation you can request an export of your site's assets — images, copy, and design files.",
      },
      {
        q: 'Can I use my own domain name?',
        a: 'Absolutely. We can connect your existing domain or help you register a new one. Domain registration fees (typically $10–15/year) are separate from your plan.',
      },
    ],
  },
  {
    heading: 'Technical Support',
    items: [
      {
        q: 'What does U.S.-based support mean?',
        a: 'Our team is based in the United States and answers emails and phone calls during business hours (9am–6pm ET, Mon–Fri). Elite plan clients also get a dedicated account manager.',
      },
      {
        q: 'Is website hosting included?',
        a: 'Yes. All plans include fast, secure hosting on enterprise infrastructure with 99.9% uptime SLA and automatic SSL certificates.',
      },
      {
        q: 'Do you monitor my site for downtime?',
        a: "Yes. We monitor all client sites 24/7. If something goes down, we're notified automatically and fix it — usually before you even know there was an issue.",
      },
      {
        q: 'Will my site rank on Google?',
        a: 'We build every site with technical SEO best practices — schema markup, fast load times, mobile optimization, and location pages. Results depend on your market, but our clients consistently see measurable improvement within 60–90 days.',
      },
    ],
  },
];

// ─── Pricing testimonials ─────────────────────────────────────────────────────
const pricingTestimonials = [
  {
    quote: "Switched from a $5,000/year web agency. Better site, better support, and I pay a fraction of what I used to.",
    name: 'Dave K.',
    title: 'Reliable Plumbing Co.',
    result: 'Saved $3,800/year',
  },
  {
    quote: "The Growth plan paid for itself in the first two weeks. The SMS text-back alone recovered three jobs I would have lost.",
    name: 'Brian T.',
    title: 'Peak HVAC Services',
    result: 'ROI in 2 weeks',
  },
  {
    quote: "I was paying more for a website that did nothing. This actually generates leads every single day.",
    name: 'Marco D.',
    title: 'GreenScape Landscaping',
    result: '+220% more quote requests',
  },
];

// ─── Subcomponents ────────────────────────────────────────────────────────────
function AddonsAccordion({
  addons,
  highlight,
}: {
  addons: { name: string; price: number; oneTime?: boolean; description: string }[];
  highlight: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={['mt-6 rounded-xl border', highlight ? 'border-white/20' : 'border-gray-200'].join(' ')}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
          highlight ? 'text-blue-100 hover:bg-white/10' : 'text-gray-700 hover:bg-gray-50',
        ].join(' ')}
        aria-expanded={open}
      >
        <span>AI Add-Ons Available</span>
        <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="addons"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <ul className="space-y-3 px-4 pb-4">
              {addons.map(({ name, price, oneTime, description }) => (
                <li key={name} className="flex items-start justify-between gap-4 text-sm">
                  <div>
                    <p className={['font-medium', highlight ? 'text-white' : 'text-gray-800'].join(' ')}>
                      {name}
                    </p>
                    <p className={['text-xs', highlight ? 'text-blue-200' : 'text-gray-500'].join(' ')}>
                      {description}
                    </p>
                  </div>
                  <span className={[
                    'shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap',
                    highlight ? 'bg-white/20 text-white' : 'bg-brand/10 text-brand',
                  ].join(' ')}>
                    {oneTime ? `$${price} one-time` : `+$${price}/mo`}
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

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-gray-900 hover:text-brand transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown className={['ml-4 h-4 w-4 shrink-0 text-gray-400 transition-transform', open ? 'rotate-180' : ''].join(' ')} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm leading-relaxed text-gray-600">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      {/* JSON-LD schema for pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Pricing — 123 Smart Media',
            description: 'Simple, transparent pricing for home service business websites. Starter $199/mo, Growth $349/mo, Elite $499/mo.',
            offers: tiers.map((t) => ({
              '@type': 'Offer',
              name: `${t.name} Plan`,
              price: t.monthlyPrice,
              priceCurrency: 'USD',
              description: t.description,
              eligibleCustomerType: 'https://schema.org/Business',
            })),
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">Pricing</p>
          <h1 className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Simple, Transparent Pricing
          </h1>
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
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* ── Tier cards ──────────────────────────────────────────────────────── */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiers.map(({ key, name, monthlyPrice, annualPrice, description, features, cta, highlight, addons }, i) => {
            const price = annual ? annualPrice : monthlyPrice;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={[
                  'relative flex flex-col rounded-2xl border p-8 transition-shadow hover:shadow-xl',
                  highlight
                    ? 'border-brand bg-brand text-white shadow-xl ring-2 ring-brand'
                    : 'border-gray-200 bg-white text-gray-900 shadow-sm',
                ].join(' ')}
              >
                {highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-md">
                    ⭐ Most Popular
                  </span>
                )}

                <h2 className="text-xl font-bold">{name}</h2>
                <p className={['mt-1 text-sm', highlight ? 'text-blue-100' : 'text-gray-500'].join(' ')}>
                  {description}
                </p>

                <div className="mt-6 flex items-end gap-1">
                  <motion.span
                    key={`${key}-${price}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-extrabold"
                  >
                    ${price}
                  </motion.span>
                  <span className={['mb-1 text-sm', highlight ? 'text-blue-200' : 'text-gray-400'].join(' ')}>
                    /mo{annual ? ' · billed annually' : ''}
                  </span>
                </div>

                {annual && (
                  <p className={['mt-1 text-xs', highlight ? 'text-blue-200' : 'text-green-600'].join(' ')}>
                    You save ${(monthlyPrice - annualPrice) * 12}/year
                  </p>
                )}

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={['mt-0.5 h-4 w-4 shrink-0', highlight ? 'text-green-300' : 'text-green-500'].join(' ')}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <AddonsAccordion addons={addons} highlight={highlight} />

                <Link
                  href="/contact"
                  className={[
                    'mt-6 rounded-xl px-5 py-3.5 text-center text-sm font-bold transition-all',
                    highlight
                      ? 'bg-white text-brand shadow-sm hover:bg-blue-50 hover:shadow-md'
                      : 'bg-brand text-white hover:bg-blue-700 hover:shadow-md hover:shadow-brand/20',
                  ].join(' ')}
                >
                  {cta} →
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Trust line ──────────────────────────────────────────────────────── */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            30-day money-back guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-600" />
            No contracts · Cancel anytime
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-600" />
            U.S.-based support
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 text-green-600" />
            Live in 7 business days
          </span>
        </div>

        {/* ── Pricing testimonials ─────────────────────────────────────────────── */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-gray-900">What Clients Say About the Value</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {pricingTestimonials.map(({ quote, name, title, result }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <Quote className="h-5 w-5 text-brand/20" />
                <p className="mt-3 text-sm leading-relaxed text-gray-600 italic">&ldquo;{quote}&rdquo;</p>
                <span className="mt-3 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {result}
                </span>
                <div className="mt-3 border-t border-gray-50 pt-3">
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-xs text-gray-500">{title}</p>
                  <div className="mt-1 flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FAQs ────────────────────────────────────────────────────────────── */}
        <div className="mt-20">
          <h2 className="text-center text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {faqSections.map(({ heading, items }) => (
              <div key={heading}>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand">
                  {heading}
                </h3>
                <div className="rounded-2xl border border-gray-100 bg-white px-6 shadow-sm">
                  {items.map(({ q, a }) => (
                    <FaqItem key={q} q={q} a={a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Final CTA ────────────────────────────────────────────────────────── */}
        <div className="mt-20 rounded-2xl bg-gradient-to-br from-[#0040cc] to-[#0d0d2b] px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-extrabold">Still Have Questions?</h2>
          <p className="mx-auto mt-3 max-w-lg text-blue-100">
            Book a free 15-minute call and we&apos;ll walk you through which plan is right for your business — no pressure, no sales pitch.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            Book a Free Consultation →
          </Link>
        </div>
      </div>
    </>
  );
}
