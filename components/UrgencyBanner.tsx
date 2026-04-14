'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

interface UrgencyBannerProps {
  message?: string;
}

const DEFAULT_MESSAGE = '⚡ Only 3 onboarding spots available this month — claim yours before they\'re gone.';

export default function UrgencyBanner({ message = DEFAULT_MESSAGE }: UrgencyBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      role="banner"
      aria-label="Limited availability notice"
      className="relative flex items-center justify-center gap-3 bg-amber-50 px-10 py-2.5 text-center text-sm font-medium text-amber-900"
      style={{ borderBottom: '1px solid rgba(251,191,36,0.3)' }}
    >
      <span>{message}</span>
      <a
        href="/contact"
        className="shrink-0 rounded-md bg-amber-500 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-amber-600"
      >
        Claim Your Spot
      </a>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-amber-700 transition-colors hover:bg-amber-100"
        aria-label="Dismiss notification"
      >
        <X className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
