'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { Shield } from 'lucide-react';

type State = 'idle' | 'loading' | 'sent' | 'error';

export default function FlexCRMLoginPage() {
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
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/flex-crm" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-extrabold text-white">
              F
            </div>
            <span className="text-xl font-extrabold text-white">FlexCRM</span>
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold text-white">Sign in to FlexCRM</h1>
          <p className="mt-2 text-sm text-gray-400">
            We&apos;ll send a secure magic link to your email.
          </p>
        </div>

        {state === 'sent' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-6 text-center"
          >
            <span className="text-5xl" aria-hidden="true">📬</span>
            <h2 className="text-xl font-bold text-white">Check your inbox</h2>
            <p className="text-sm text-gray-400">
              We sent a magic link to <strong className="text-white">{email}</strong>.
              Click it to sign in.
            </p>
            <p className="text-xs text-gray-600">Didn&apos;t receive it? Check your spam folder.</p>
            <button
              onClick={() => setState('idle')}
              className="mt-2 text-sm font-medium text-violet-400 hover:underline"
            >
              Try a different email
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourcompany.com"
                className="mt-1 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-shadow focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            {state === 'error' && (
              <p role="alert" className="rounded-xl bg-red-950 px-4 py-2 text-sm text-red-400">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full rounded-xl bg-violet-600 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/20 disabled:opacity-60"
            >
              {state === 'loading' ? 'Sending…' : 'Send Magic Link →'}
            </button>
          </form>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-600">
          <Shield className="h-3.5 w-3.5 text-green-500" />
          Secure · No password required · Powered by Supabase
        </div>

        <p className="mt-4 text-center text-xs text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/contact" className="text-violet-400 hover:underline">
            Request access →
          </Link>
        </p>

        <div className="mt-6 border-t border-gray-800 pt-5 text-center">
          <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Back to 123 Smart Media
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
