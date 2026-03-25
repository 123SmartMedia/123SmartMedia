'use client';

import Link from 'next/link';
import { Phone, CalendarCheck } from 'lucide-react';

interface MobileStickyNavProps {
  phone?: string;
  bookingUrl?: string;
}

/**
 * MobileStickyNav
 *
 * A fixed bottom bar shown on all pages on mobile viewports.
 * Provides one-tap access to call the business or open the booking flow.
 * Hidden on md+ screens where the desktop nav handles these CTAs.
 */
export default function MobileStickyNav({
  phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-7627',
  bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact',
}: MobileStickyNavProps) {
  const telHref = `tel:${phone.replace(/\D/g, '')}`;

  return (
    <nav
      aria-label="Mobile quick-actions"
      className={[
        // Only visible on mobile; hidden on md and above
        'fixed bottom-0 left-0 right-0 z-50',
        'flex md:hidden',
        // Safe-area inset so content clears home-indicator on iOS
        'pb-[env(safe-area-inset-bottom)]',
        'bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)]',
      ].join(' ')}
    >
      {/* ── Call button ─────────────────────────────────────────── */}
      <a
        href={telHref}
        className={[
          'flex-1 flex flex-col items-center justify-center gap-1 py-3',
          'text-brand font-semibold text-sm',
          'active:bg-blue-50 transition-colors',
          // Accessible focus ring
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset',
        ].join(' ')}
        aria-label={`Call us at ${phone}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        <span>Call</span>
      </a>

      {/* ── Divider ─────────────────────────────────────────────── */}
      <div className="w-px my-3 bg-gray-200" aria-hidden="true" />

      {/* ── Book button ─────────────────────────────────────────── */}
      <Link
        href={bookingUrl}
        className={[
          'flex-1 flex flex-col items-center justify-center gap-1 py-3',
          'text-accent font-semibold text-sm',
          'active:bg-orange-50 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset',
        ].join(' ')}
        aria-label="Book a free consultation"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" />
        <span>Book</span>
      </Link>
    </nav>
  );
}
