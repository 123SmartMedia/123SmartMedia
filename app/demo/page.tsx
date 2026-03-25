import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Live Demo',
  description:
    'Try our AI chatbot and AI receptionist live. See how 123 Smart Media automates lead capture for home service businesses.',
};

export default function DemoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900">See It In Action</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-600">
          Chat with our AI below — the same system we deploy for your business.
          Ask it about services, pricing, or try to book an appointment.
        </p>
      </div>

      {/* Chatbot embed */}
      <div className="mt-10 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-600">AI Assistant — Online</span>
        </div>

        {/*
          Vapi.ai sandbox embed.
          Replace data-vapi-public-key with your actual key.
          The script is loaded client-side only via the script tag below.
        */}
        <div
          id="vapi-chat-widget"
          className="flex min-h-[480px] flex-col items-center justify-center bg-white p-8 text-center"
          aria-label="AI chatbot demo"
        >
          {/* Fallback UI shown until the Vapi widget loads */}
          <div className="max-w-sm space-y-4">
            <p className="text-5xl" aria-hidden="true">🤖</p>
            <p className="text-base font-medium text-gray-700">
              AI Chatbot Demo
            </p>
            <p className="text-sm text-gray-500">
              Add your{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs">
                NEXT_PUBLIC_VAPI_KEY
              </code>{' '}
              environment variable to activate the live Vapi.ai chatbot demo.
            </p>
            <a
              href="https://vapi.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
            >
              Get Vapi API Key →
            </a>
          </div>
        </div>
      </div>

      {/* Below-fold CTA */}
      <div className="mt-12 rounded-2xl bg-gray-50 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Ready for This on Your Website?
        </h2>
        <p className="mx-auto mt-3 max-w-md text-gray-600">
          We configure, train, and deploy the AI on your domain — fully branded, no
          tech knowledge required.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-xl bg-accent px-8 py-4 text-base font-bold text-white hover:bg-accent-dark transition-colors"
        >
          Get Your Free AI Setup
        </Link>
      </div>
    </div>
  );
}
