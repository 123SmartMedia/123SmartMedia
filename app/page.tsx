'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Star, MapPin, TrendingUp, Users, Zap, Bell, Quote } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// ─── Animated counter hook ────────────────────────────────────────────────────
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// ─── Stats counter widget ─────────────────────────────────────────────────────
function StatCounter({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const { value, ref } = useCountUp(target);
  return (
    <div className="flex flex-col items-center gap-1">
      <span ref={ref} className="text-3xl font-extrabold text-white">
        {value.toLocaleString()}
        {suffix}
      </span>
      <span className="text-sm text-blue-200">{label}</span>
    </div>
  );
}

// ─── Dashboard preview mockup ─────────────────────────────────────────────────
function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mt-20 max-w-4xl"
    >
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-blue-300">
        Your Client Dashboard Preview
      </p>
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl"
      >
        {/* Mock browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/60" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/60" />
          <span className="h-3 w-3 rounded-full bg-green-400/60" />
          <div className="ml-3 flex-1 rounded bg-white/10 px-3 py-1 text-xs text-white/40">
            dashboard.123smartmedia.com
          </div>
        </div>

        {/* Mock dashboard content */}
        <div className="grid gap-4 p-6 sm:grid-cols-3">
          {/* Stat card: Live site */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="rounded-xl bg-white/10 p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                Site Status
              </span>
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">Live ✓</p>
            <p className="mt-1 text-xs text-blue-300">98% uptime · SSL active</p>
          </motion.div>

          {/* Stat card: MRR */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="rounded-xl bg-white/10 p-4"
          >
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                Monthly Revenue
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-white">$4,820</p>
            <p className="mt-1 text-xs text-green-400">↑ 23% vs last month</p>
          </motion.div>

          {/* Stat card: AI tools */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="rounded-xl bg-white/10 p-4"
          >
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-blue-200">
                AI Tools Active
              </span>
            </div>
            <div className="mt-3 space-y-1.5">
              {['Chatbot', 'SMS Auto', 'Receptionist'].map((tool) => (
                <div key={tool} className="flex items-center justify-between text-xs">
                  <span className="text-white/80">{tool}</span>
                  <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-green-400">
                    ON
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mock notification */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-6 mb-6 flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3"
        >
          <Bell className="h-4 w-4 shrink-0 text-green-400" />
          <div>
            <p className="text-sm font-semibold text-white">New lead captured!</p>
            <p className="text-xs text-green-300">
              Mike R. — HVAC repair · 2 min ago · AI chatbot engaged
            </p>
          </div>
        </motion.div>
      </motion.div>

      <p className="mt-4 text-center text-xs text-blue-300/60">
        Static preview — real data populates after onboarding
      </p>
    </motion.div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote: "We used to miss calls constantly. Now the AI books appointments while I'm on the roof. Best investment I've made.",
    name: 'Brian T.',
    title: 'Owner, Peak HVAC Services',
    industry: 'HVAC',
    rating: 5,
    result: '+340% leads',
  },
  {
    quote: "I was skeptical about AI but these guys made it dead simple. My phone stopped ringing with tire-kickers and started ringing with real customers.",
    name: 'Marco D.',
    title: 'Owner, GreenScape Landscaping',
    industry: 'Landscaping',
    rating: 5,
    result: 'Booked 6 weeks out',
  },
  {
    quote: "The AI receptionist paid for itself in the first week. It caught three emergency jobs on a Sunday I would have completely missed.",
    name: 'Dave K.',
    title: 'Owner, Reliable Plumbing Co.',
    industry: 'Plumbing',
    rating: 5,
    result: '2x emergency calls',
  },
  {
    quote: "I'd been in business 12 years and never had a website. Within two months I had more leads than I could handle. Wish I did this sooner.",
    name: 'Tony R.',
    title: 'Owner, Ironclad Masonry',
    industry: 'Masonry',
    rating: 5,
    result: '$40k pipeline in 60 days',
  },
  {
    quote: "Speed to lead is everything in remodeling. Our AI responds before the homeowner even finishes looking at a competitor's site.",
    name: 'James A.',
    title: 'Owner, Alpine General Contractors',
    industry: 'Contracting',
    rating: 5,
    result: '41% higher close rate',
  },
  {
    quote: "We used to basically hibernate from November to March. Now we're booking pool heater installs all winter. Game changer.",
    name: 'Chris M.',
    title: 'Owner, Suncoast Pool & Spa',
    industry: 'Pool Services',
    rating: 5,
    result: '+38% off-season revenue',
  },
];

// ─── Services grid ────────────────────────────────────────────────────────────
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

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8"
        style={{
          background:
            'linear-gradient(135deg, #0040cc 0%, #0066FF 40%, #0a1a6e 70%, #0d0d2b 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradientShift 10s ease infinite',
        }}
      >
        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-4xl text-center">
          {/* Trust badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <ShieldCheck className="h-4 w-4 text-green-300" />
            Licensed &amp; Insured · As seen serving Long Island &amp; beyond
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Free Website.{' '}
            <span className="text-accent">No Upfront Cost.</span>
            <br />
            Grow with AI.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-blue-100"
          >
            AI-powered websites, chatbots, and automations that work around the clock
            — so you can focus on the job, not chasing leads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#contact-form"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group w-full rounded-xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-accent-dark hover:shadow-accent/30 hover:shadow-xl sm:w-auto"
            >
              Claim My Free Website
              <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <Link
              href="/pricing"
              className="w-full rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
            >
              View Pricing
            </Link>
          </motion.div>

          {/* Social proof strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-blue-200"
          >
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
          </motion.div>

          {/* Stats counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8 border-t border-white/10 pt-10"
          >
            <StatCounter target={120} suffix="+" label="Clients served" />
            <StatCounter target={4200} suffix="+" label="Leads captured" />
            <StatCounter target={97} suffix="%" label="Client retention" />
          </motion.div>
        </div>

        {/* Dashboard mockup inside hero section */}
        <DashboardMockup />
      </section>

      {/* ── Services grid ────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-3xl font-bold text-gray-900"
        >
          Everything You Need to Dominate Local Search
        </motion.h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,102,255,0.1)' }}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <span className="text-3xl" aria-hidden="true">{icon}</span>
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex rounded-lg border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
          >
            View All Services →
          </Link>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-brand">
              Client Stories
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              Real Results from Real Business Owners
            </h2>
            <div className="mt-2 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-600">4.9/5 from 120+ clients</span>
            </div>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map(({ quote, name, title, industry, rating, result }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <Quote className="h-6 w-6 text-brand/20" aria-hidden="true" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">&ldquo;{quote}&rdquo;</p>

                {/* Result badge */}
                <span className="mt-4 inline-block self-start rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  {result}
                </span>

                <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{name}</p>
                    <p className="text-xs text-gray-500">{title}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 text-center"
          >
            <Link
              href="/portfolio"
              className="inline-flex rounded-lg border border-brand px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
            >
              See Full Case Studies →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-600">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-green-600" />
            Licensed &amp; Insured
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Google Partner
          </span>
          <span className="flex items-center gap-2">🔒 SOC 2 Compliant Hosting</span>
          <span className="flex items-center gap-2">🚀 Sites Live in 7 Days</span>
          <span className="flex items-center gap-2">💬 Dedicated Account Manager</span>
          <span className="flex items-center gap-2">💳 No Contracts · Cancel Anytime</span>
        </div>
      </section>

      {/* ── Inline contact CTA ───────────────────────────────────────────────── */}
      <section
        id="contact-form"
        className="bg-brand px-4 py-16 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-extrabold"
          >
            Ready for a Free Website?
          </motion.h2>
          <p className="mt-4 text-blue-100">
            No commitment. We&apos;ll send a custom demo preview within 24 hours.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-4 text-base font-bold text-brand shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
          >
            Get My Free Site Now →
          </Link>
        </div>
      </section>
    </>
  );
}
