'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';

const SESSION_KEY = 'exit_intent_shown';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    let triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(SESSION_KEY, '1');
      setVisible(true);
    }

    // Desktop: mouse moves toward top of viewport (exit intent)
    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 20) trigger();
    }

    // Mobile: back button / popstate
    function onPopState() {
      trigger();
    }

    // Add a dummy history entry so popstate fires on back button
    window.history.pushState(null, '', window.location.href);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('popstate', onPopState);

    return () => {
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // Focus trap
  useEffect(() => {
    if (visible) inputRef.current?.focus();
  }, [visible]);

  // Escape to close
  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setVisible(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      // Send to leads API — reuses the existing endpoint
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Exit Intent Lead',
          businessName: 'Unknown',
          email,
          phone: 'Not provided',
          service: 'Free Website Mockup',
          message: 'Submitted via exit-intent popup',
          smsConsent: false,
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true); // Fail gracefully
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Free website mockup offer"
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVisible(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="Close offer"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            {!submitted ? (
              <>
                {/* Header */}
                <div className="bg-gradient-to-br from-[#0040cc] to-[#0066FF] px-6 pb-5 pt-6 text-white">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                    <Gift className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-extrabold">
                    Wait — get your free website mockup before you go!
                  </h2>
                  <p className="mt-2 text-sm text-blue-100">
                    Drop your email and we&apos;ll send a custom mockup of what your new site could look like — free, no strings attached.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 pb-6 pt-5">
                  <label htmlFor="exit-email" className="block text-sm font-semibold text-gray-700">
                    Your business email
                  </label>
                  <input
                    ref={inputRef}
                    id="exit-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourbusiness.com"
                    className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none ring-0 transition-shadow focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-3 w-full rounded-xl bg-brand py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-60"
                  >
                    {loading ? 'Sending…' : 'Send My Free Mockup →'}
                  </button>
                  <p className="mt-3 text-center text-xs text-gray-400">
                    No spam. Unsubscribe anytime.
                  </p>
                </form>
              </>
            ) : (
              /* Success state */
              <div className="px-8 py-10 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                  <span className="text-2xl" aria-hidden="true">🎉</span>
                </div>
                <h3 className="text-xl font-extrabold text-gray-900">You&apos;re on the list!</h3>
                <p className="mt-2 text-sm text-gray-600">
                  We&apos;ll have a custom website mockup in your inbox within 24 hours.
                </p>
                <button
                  onClick={() => setVisible(false)}
                  className="mt-6 text-sm font-semibold text-brand hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
