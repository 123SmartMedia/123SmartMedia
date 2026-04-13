'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

type State = 'idle' | 'loading' | 'sent' | 'error';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setState('error');
      setErrorMsg(error.message);
    } else {
      setState('sent');
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-brand">
            <span aria-hidden="true">⚡</span>
            <span>123 Smart Media</span>
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold text-gray-900">Sign in to your dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            We&apos;ll send a magic link to your email — no password needed.
          </p>
        </div>

        {state === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <span className="text-5xl" aria-hidden="true">📬</span>
            <h2 className="text-xl font-bold text-gray-900">Check your email</h2>
            <p className="text-sm text-gray-600">
              We sent a magic link to <strong>{email}</strong>. Click it to sign in.
            </p>
            <p className="text-xs text-gray-400">Didn&apos;t get it? Check your spam folder.</p>
            <button
              onClick={() => setState('idle')}
              className="mt-2 text-sm font-medium text-brand hover:underline"
            >
              Try a different email
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
            </div>

            {state === 'error' && (
              <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg disabled:opacity-60"
            >
              {state === 'loading' ? 'Sending…' : 'Send Magic Link →'}
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
          Secure · No password required · Powered by Supabase
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Don&apos;t have an account?{' '}
          <Link href="/contact" className="text-brand hover:underline">
            Get started free →
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
