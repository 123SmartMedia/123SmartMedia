'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  heading?: string;
  subheading?: string;
  items?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: 'Do I need to cancel my current website?',
    answer:
      'No — we handle the transition. We\'ll build your new site alongside your existing one, then swap your domain over only when everything is perfect. Zero downtime, zero stress.',
  },
  {
    question: 'How fast can I go live?',
    answer:
      'Most clients are live within 7 business days of providing their content (logo, photos, and business info). We handle design, copy, setup, and launch — all you have to do is review and approve.',
  },
  {
    question: 'What if I don\'t like the design?',
    answer:
      'We offer unlimited revisions until you\'re completely happy. Our designers work in your brand colors and style, and we don\'t consider the project done until you give the green light. If you\'re ever unsatisfied within the first 30 days, we\'ll issue a full refund.',
  },
  {
    question: 'Do you work with businesses outside the U.S.?',
    answer:
      'Our primary focus is U.S.-based home service businesses, where we have the deepest experience with local SEO and lead generation. We do occasionally work with Canadian businesses — reach out and we\'ll let you know if we\'re a fit.',
  },
  {
    question: 'Is there a long-term contract?',
    answer:
      'Never. All plans are month-to-month. You can cancel anytime from your dashboard with no cancellation fees and no questions asked. Annual plans are prepaid for a 20% discount but can be refunded on a prorated basis within 30 days.',
  },
];

function FAQItem({ question, answer }: FAQItem) {
  const [open, setOpen] = useState(false);
  const id = question.toLowerCase().replace(/\W+/g, '-');

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        id={`faq-btn-${id}`}
        aria-expanded={open}
        aria-controls={`faq-answer-${id}`}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-brand"
      >
        <span className="text-base font-semibold text-gray-900 group-hover:text-brand">
          {question}
        </span>
        <ChevronDown
          className={[
            'mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200',
            open ? 'rotate-180 text-brand' : '',
          ].join(' ')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${id}`}
            role="region"
            aria-labelledby={`faq-btn-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-gray-600">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection({
  heading = 'Frequently Asked Questions',
  subheading = 'Everything you need to know before getting started.',
  items = defaultFAQs,
}: FAQSectionProps) {
  // FAQPage JSON-LD schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">FAQ</p>
          <h2
            id="faq-heading"
            className="mt-2 text-3xl font-extrabold text-gray-900"
          >
            {heading}
          </h2>
          <p className="mt-3 text-gray-600">{subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 rounded-2xl border border-gray-100 bg-white px-6 shadow-sm sm:px-8"
        >
          {items.map((item) => (
            <FAQItem key={item.question} {...item} />
          ))}
        </motion.div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Still have questions?{' '}
            <a href="/contact" className="font-semibold text-brand hover:underline">
              Book a free call
            </a>{' '}
            and we&apos;ll answer everything.
          </p>
        </div>
      </div>
    </section>
  );
}
