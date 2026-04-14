'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function StickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          // Hidden on mobile (MobileStickyNav handles it there), visible md+
          className="fixed bottom-6 right-6 z-50 hidden md:block"
        >
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-lg ring-2 ring-brand/30 transition-all hover:bg-brand-dark hover:shadow-brand/30 hover:shadow-xl"
          >
            <Phone className="h-4 w-4" />
            Book a Free Call
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
