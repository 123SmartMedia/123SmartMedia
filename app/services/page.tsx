import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, AI chatbots, SMS automation, and AI receptionists for home service businesses.',
};

const services = [
  {
    icon: '🌐',
    title: 'Web Development',
    price: 'From $997',
    features: [
      'Mobile-first, SEO-optimized design',
      'LocalBusiness Schema.org markup',
      'Google Analytics + Search Console setup',
      'Contact form wired to your CRM',
      'Live in 7 business days',
    ],
    cta: 'Get a Free Quote',
  },
  {
    icon: '🤖',
    title: 'AI Chatbot',
    price: 'From $297/mo',
    features: [
      '24/7 lead qualification',
      'Appointment scheduling integration',
      'Custom trained on your services & pricing',
      'Handoff to live agent when needed',
      'Monthly conversation analytics',
    ],
    cta: 'Try Live Demo',
    ctaHref: '/demo',
  },
  {
    icon: '📱',
    title: 'SMS Automation',
    price: 'From $197/mo',
    features: [
      'Instant missed-call text-back',
      'Review request sequences',
      'Appointment reminders',
      'Re-engagement campaigns',
      'Two-way texting inbox',
    ],
    cta: 'Learn More',
  },
  {
    icon: '📞',
    title: 'AI Receptionist',
    price: 'From $397/mo',
    features: [
      'Answers calls 24/7 in your business name',
      'Qualifies caller intent',
      'Books appointments directly',
      'Transfers urgent calls to you',
      'Call recording & transcripts',
    ],
    cta: 'Hear a Sample Call',
    ctaHref: '/demo',
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          A full stack of digital tools built exclusively for home service businesses —
          roofing, HVAC, plumbing, landscaping, and more.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-green-700">
          <ShieldCheck className="h-4 w-4" />
          Licensed &amp; Insured Agency — No lock-in contracts
        </div>
      </div>

      {/* Cards */}
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {services.map(({ icon, title, price, features, cta, ctaHref }) => (
          <div
            key={title}
            className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
          >
            <span className="text-4xl" aria-hidden="true">{icon}</span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-lg font-semibold text-brand">{price}</p>
            <ul className="mt-4 flex-1 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                  <span className="mt-0.5 text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href={ctaHref ?? '/contact'}
              className="mt-6 rounded-lg bg-brand px-5 py-3 text-center text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              {cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
