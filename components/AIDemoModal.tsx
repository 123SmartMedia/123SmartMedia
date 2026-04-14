'use client';

import { X, Bot, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AIDemoModalProps {
  open: boolean;
  onClose: () => void;
}

// Simulated chat exchange for the demo
const chatMessages = [
  { from: 'bot', text: "Hi there! I'm the AI assistant for Mike's HVAC. How can I help you today?" },
  { from: 'user', text: "My AC stopped working. Do you do emergency repairs?" },
  { from: 'bot', text: "Absolutely! We offer same-day emergency HVAC service. To get you scheduled right away, can I grab your name and zip code?" },
  { from: 'user', text: "It's Sarah, zip is 11520." },
  { from: 'bot', text: "Thanks Sarah! We have a technician available today between 2–5pm in your area. Want me to book that for you?" },
  { from: 'user', text: "Yes please!" },
  { from: 'bot', text: "✅ You're booked! Mike will call you 30 minutes before arrival. You'll also get a confirmation text. Is there anything else?" },
];

export default function AIDemoModal({ open, onClose }: AIDemoModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="AI chatbot demo"
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-[#0040cc] to-[#0066FF] px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5 text-white" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">AI Assistant Demo</p>
                  <p className="flex items-center gap-1 text-xs text-blue-200">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" aria-hidden="true" />
                    Online now — capturing leads 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close demo"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Chat */}
            <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {chatMessages.map(({ from, text }, i) => (
                <div
                  key={i}
                  className={['flex', from === 'user' ? 'justify-end' : 'justify-start'].join(' ')}
                >
                  <p
                    className={[
                      'max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                      from === 'bot'
                        ? 'rounded-tl-sm bg-gray-100 text-gray-800'
                        : 'rounded-tr-sm bg-brand text-white',
                    ].join(' ')}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 bg-gray-50 px-4 py-4">
              <p className="mb-3 flex items-center gap-1.5 text-xs text-gray-500">
                <Zap className="h-3.5 w-3.5 text-yellow-500" aria-hidden="true" />
                See how our AI captures leads 24/7 — even while you sleep
              </p>
              <a
                href="/contact"
                data-event="ai-demo-click"
                className="block w-full rounded-xl bg-brand py-3 text-center text-sm font-bold text-white transition-colors hover:bg-blue-700"
              >
                Add This to My Website →
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
