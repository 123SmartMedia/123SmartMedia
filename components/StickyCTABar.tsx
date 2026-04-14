'use client';

import Link from 'next/link';
import { Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const DISMISS_KEY = 'sticky_cta_dismissed_until';
const DISMISS_DAYS = 7;

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // start hidden, check after mount
  const pathname = usePathname();

  // Don't render on thank-you pages
  const hidden = pathname?.startsWith('/thank-you');

  useEffect(() => {
    // Check localStorage dismiss preference
    try {
      const until = localStorage.getItem(DISMISS_KEY);
      if (until && Date.now() < Number(until)) {
        setDismissed(true);
        return;
      }
    } catch {}
    setDismissed(false);

    // Appear after scrolling 400px
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(
        DISMISS_KEY,
        String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000)
      );
    } catch {}
    setDismissed(true);
  }

  if (hidden || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: fixed top-right pill */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed right-6 top-20 z-[60] hidden items-center gap-2 md:flex"
          >
            <Link
              href="/contact"
              data-cta-type="primary"
              className="flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-lg ring-2 ring-brand/20 transition-all hover:bg-blue-700 hover:shadow-brand/30 hover:shadow-xl"
              aria-label="Book your free consultation"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Book Free Consultation
            </Link>
            <button
              onClick={dismiss}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-gray-200"
              aria-label="Dismiss consultation button for 7 days"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </motion.div>

          {/* Mobile: fixed bottom bar (above MobileStickyNav) */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-[64px] left-0 right-0 z-[60] flex items-center justify-between gap-3 bg-brand px-4 py-3 shadow-lg md:hidden"
          >
            <Link
              href="/contact"
              data-cta-type="primary"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white py-2.5 text-sm font-bold text-brand transition-colors hover:bg-blue-50"
              aria-label="Book your free consultation"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              📞 Book Your Free Consultation
            </Link>
            <button
              onClick={dismiss}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
