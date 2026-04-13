'use client';

import { useState } from 'react';
import { CreditCard, ExternalLink, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function openPortal() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' });
      const data = await res.json() as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Failed to open billing portal');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription, invoices, and payment methods.
        </p>
      </div>

      {/* Portal card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10">
            <CreditCard className="h-6 w-6 text-brand" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">Stripe Customer Portal</h2>
            <p className="mt-1 text-sm text-gray-600">
              View and download invoices, update your payment method, cancel or upgrade your
              subscription — all in one secure place.
            </p>
            <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
              {[
                'View all past invoices & receipts',
                'Update credit card or bank account',
                'Cancel or pause your subscription',
                'Change billing cycle (monthly ↔ annual)',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            {error && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              onClick={openPortal}
              disabled={loading}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg disabled:opacity-60"
            >
              {loading ? (
                'Opening…'
              ) : (
                <>
                  Open Billing Portal
                  <ExternalLink className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* No subscription state */}
      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
        <p className="font-semibold text-gray-700">Don&apos;t have an active plan yet?</p>
        <p className="mt-1 text-sm text-gray-500">
          Choose a plan to go live with your website, AI chatbot, and automations.
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-block rounded-xl bg-accent px-6 py-3 text-sm font-bold text-white hover:bg-accent-dark transition-colors"
        >
          View Plans & Pricing →
        </Link>
      </div>

      <p className="flex items-center gap-2 text-xs text-gray-400">
        <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
        Payments processed securely by Stripe · 30-day money-back guarantee
      </p>
    </div>
  );
}
