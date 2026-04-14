'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ExternalLink, Star, TrendingUp, Users, Zap } from 'lucide-react';

const caseStudies = [
  {
    slug: 'peak-hvac',
    company: 'Peak HVAC Services',
    industry: 'HVAC',
    location: 'Long Island, NY',
    logo: '❄️',
    heroColor: 'from-blue-600 to-cyan-500',
    tagline: 'From 3 calls/week to fully booked in 90 days',
    description:
      'Peak HVAC was relying on word-of-mouth and a decade-old website. We rebuilt their online presence from the ground up — new site, AI chatbot, and SMS automation — turning a slow winter into their busiest season ever.',
    results: [
      { metric: '340%', label: 'Increase in inbound leads' },
      { metric: '18hr', label: 'Avg. response time → 2 min' },
      { metric: '$12k', label: 'Added MRR in 90 days' },
    ],
    services: ['Professional Website', 'AI Chatbot', 'SMS Text-Back', 'Google Ads Integration'],
    quote:
      'We used to miss calls constantly. Now the AI books appointments while I\'m on the roof. Best investment I\'ve made.',
    quoteName: 'Brian T.',
    quoteTitle: 'Owner, Peak HVAC Services',
  },
  {
    slug: 'greenscape-landscaping',
    company: 'GreenScape Landscaping',
    industry: 'Landscaping',
    location: 'Nassau County, NY',
    logo: '🌿',
    heroColor: 'from-green-600 to-emerald-500',
    tagline: 'Booked solid for spring before February ended',
    description:
      'GreenScape needed a way to capture spring rush leads before competitors. We launched a high-converting site with an AI receptionist that handled inquiries 24/7 — filling their schedule two months ahead.',
    results: [
      { metric: '220%', label: 'More quote requests' },
      { metric: '6 wks', label: 'Booked out in advance' },
      { metric: '4.9★', label: 'Google rating (up from 3.8)' },
    ],
    services: ['Professional Website', 'AI Receptionist', 'Review Automation', 'Social Media Setup'],
    quote:
      'I was skeptical about AI but these guys made it dead simple. My phone stopped ringing with tire-kickers and started ringing with real customers.',
    quoteName: 'Marco D.',
    quoteTitle: 'Owner, GreenScape Landscaping',
  },
  {
    slug: 'reliable-plumbing',
    company: 'Reliable Plumbing Co.',
    industry: 'Plumbing',
    location: 'Suffolk County, NY',
    logo: '🔧',
    heroColor: 'from-orange-500 to-red-500',
    tagline: 'Emergency call volume doubled — without extra staff',
    description:
      'Reliable Plumbing needed to capture emergency calls after hours. Their AI receptionist now qualifies, triages, and dispatches — handling after-hours volume that used to go to competitors.',
    results: [
      { metric: '2x', label: 'Emergency call capture rate' },
      { metric: '$8,400', label: 'Recovered revenue (first month)' },
      { metric: '0', label: 'After-hours calls missed' },
    ],
    services: ['Professional Website', 'AI Receptionist', 'SMS Automation', 'Email Drip Sequences'],
    quote:
      'The AI receptionist paid for itself in the first week. It caught three emergency jobs on a Sunday that I would have completely missed.',
    quoteName: 'Dave K.',
    quoteTitle: 'Owner, Reliable Plumbing Co.',
  },
  {
    slug: 'suncoast-pool',
    company: 'Suncoast Pool & Spa',
    industry: 'Pool Services',
    location: 'Florida',
    logo: '🏊',
    heroColor: 'from-sky-500 to-blue-400',
    tagline: 'Turned a seasonal business into year-round revenue',
    description:
      'Suncoast depended on a 4-month busy season. We built an automated follow-up system and off-season email campaigns that generated pool heater and renovation leads through the winter.',
    results: [
      { metric: '38%', label: 'Revenue increase (off-season)' },
      { metric: '190+', label: 'New email subscribers captured' },
      { metric: '3x', label: 'Repeat booking rate' },
    ],
    services: ['Professional Website', 'Email Automation', 'AI Chatbot', 'Social Automation'],
    quote:
      'We used to basically hibernate from November to March. Now we\'re booking pool heater installs all winter. Game changer.',
    quoteName: 'Chris M.',
    quoteTitle: 'Owner, Suncoast Pool & Spa',
  },
  {
    slug: 'ironclad-masonry',
    company: 'Ironclad Masonry',
    industry: 'Masonry',
    location: 'New Jersey',
    logo: '🪨',
    heroColor: 'from-gray-600 to-slate-500',
    tagline: 'From zero web presence to $40k pipeline in 60 days',
    description:
      'Ironclad had no website, no reviews, and no online presence. Starting from scratch, we built a full digital foundation — site, social profiles, review generation, and a chatbot — creating a $40k+ project pipeline.',
    results: [
      { metric: '$40k+', label: 'Pipeline generated (60 days)' },
      { metric: '24', label: 'Google reviews in first month' },
      { metric: '100%', label: 'Online presence (from zero)' },
    ],
    services: ['Professional Website', 'Social Media Setup', 'Review Automation', 'AI Chatbot'],
    quote:
      'I\'d been in business 12 years and never had a website. Within two months I had more leads than I could handle. Wish I did this sooner.',
    quoteName: 'Tony R.',
    quoteTitle: 'Owner, Ironclad Masonry',
  },
  {
    slug: 'alpine-contractors',
    company: 'Alpine General Contractors',
    industry: 'General Contracting',
    location: 'Westchester, NY',
    logo: '🏗️',
    heroColor: 'from-yellow-500 to-orange-400',
    tagline: 'Cut lead response time from 6 hours to 90 seconds',
    description:
      'Alpine was losing high-value renovation leads to faster competitors. After deploying our SMS text-back and AI chatbot, their speed-to-lead dropped from hours to seconds — and close rates jumped.',
    results: [
      { metric: '90 sec', label: 'Average lead response time' },
      { metric: '41%', label: 'Higher close rate on new leads' },
      { metric: '$22k', label: 'Additional revenue (Q1)' },
    ],
    services: ['Professional Website', 'SMS Text-Back', 'AI Chatbot', 'AI Receptionist'],
    quote:
      'Speed to lead is everything in remodeling. Our AI responds before the homeowner even finishes looking at a competitor\'s site.',
    quoteName: 'James A.',
    quoteTitle: 'Owner, Alpine General Contractors',
  },
];

const industries = ['All', 'HVAC', 'Landscaping', 'Plumbing', 'Pool Services', 'Masonry', 'General Contracting'];

export default function PortfolioPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0040cc] to-[#0d0d2b] px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-300"
          >
            Client Results
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Real Businesses. Real Results.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg text-blue-100"
          >
            See how home service businesses across the country used 123 Smart Media to generate more leads, book more jobs, and grow faster.
          </motion.p>

          {/* Summary stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10"
          >
            {[
              { value: '120+', label: 'Clients Served' },
              { value: '$2.4M+', label: 'Client Revenue Generated' },
              { value: '97%', label: 'Client Retention Rate' },
            ].map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="text-3xl font-extrabold text-white">{value}</span>
                <span className="text-sm text-blue-200">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Case studies grid ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {caseStudies.map((study, i) => (
            <motion.article
              key={study.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
            >
              {/* Card header */}
              <div className={`bg-gradient-to-r ${study.heroColor} p-6 text-white`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-3xl" aria-hidden="true">{study.logo}</span>
                    <h2 className="mt-2 text-xl font-bold">{study.company}</h2>
                    <p className="text-sm text-white/80">{study.industry} · {study.location}</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold">
                    {study.industry}
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold leading-snug">&ldquo;{study.tagline}&rdquo;</p>
              </div>

              {/* Card body */}
              <div className="p-6">
                <p className="text-sm text-gray-600">{study.description}</p>

                {/* Results */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {study.results.map(({ metric, label }) => (
                    <div key={label} className="text-center">
                      <p className="text-xl font-extrabold text-brand">{metric}</p>
                      <p className="mt-0.5 text-xs text-gray-500">{label}</p>
                    </div>
                  ))}
                </div>

                {/* Services used */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {study.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-brand"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mt-5 border-l-4 border-brand/30 pl-4">
                  <p className="text-sm italic text-gray-600">&ldquo;{study.quote}&rdquo;</p>
                  <footer className="mt-2">
                    <p className="text-xs font-semibold text-gray-800">{study.quoteName}</p>
                    <p className="text-xs text-gray-500">{study.quoteTitle}</p>
                  </footer>
                </blockquote>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ── Industries served ─────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Industries We Serve</h2>
          <p className="mt-3 text-gray-600">
            We specialize in home service businesses. If you work with your hands, we help you fill your schedule.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              'HVAC', 'Plumbing', 'Landscaping', 'Pool & Spa', 'Masonry',
              'General Contracting', 'Electrical', 'Roofing', 'Painting',
              'Cleaning Services', 'Pest Control', 'Tree Services',
            ].map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="bg-brand px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold">Ready to Be Our Next Case Study?</h2>
          <p className="mt-4 text-blue-100">
            Get a free custom website preview within 24 hours. No commitment required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl sm:w-auto"
            >
              Claim My Free Website →
            </Link>
            <Link
              href="/pricing"
              className="w-full rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
