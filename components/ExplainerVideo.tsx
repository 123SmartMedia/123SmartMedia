'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';

const transcript = `
In this 60-second overview, you'll see how 123 Smart Media builds AI-powered websites
for home service businesses. We cover: your professional website going live within 7 days,
the AI chatbot capturing leads around the clock, SMS automation texting back missed callers
within 60 seconds, and the client dashboard where you can track every lead in real time.
Book a free consultation to see a custom mockup built for your specific business.
`.trim();

export default function ExplainerVideo() {
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handlePlay() {
    setPlaying(true);
  }

  return (
    <section
      aria-labelledby="video-heading"
      className="bg-gray-950 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400">
            See It in Action
          </p>
          <h2
            id="video-heading"
            className="mt-2 text-3xl font-extrabold text-white sm:text-4xl"
          >
            Watch How It Works in 60 Seconds
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-400">
            A quick walkthrough of what your business gets — from website launch to AI automation running on day one.
          </p>
        </motion.div>

        {/* Video container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-2xl bg-gray-800 shadow-2xl"
          style={{ aspectRatio: '16/9' }}
        >
          {!playing ? (
            /* Poster + play button overlay */
            <button
              onClick={handlePlay}
              className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-[#0040cc]/80 to-[#0d0d2b]/90"
              aria-label="Play explainer video"
            >
              {/* Animated pulse ring */}
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-20 w-20 animate-ping rounded-full bg-white/20" aria-hidden="true" />
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 text-brand" aria-hidden="true" />
                </span>
              </div>
              <p className="text-sm font-semibold text-white/90">Watch the 60-second overview</p>

              {/* Mock thumbnail grid */}
              <div className="absolute inset-0 -z-10 grid grid-cols-3 gap-0.5 opacity-20" aria-hidden="true">
                {['🌐 Website', '🤖 AI Chat', '📱 SMS', '📞 Calls', '📊 Dashboard', '⚡ Live'].map((label) => (
                  <div key={label} className="flex items-center justify-center bg-white/5 text-xs font-medium text-white">
                    {label}
                  </div>
                ))}
              </div>
            </button>
          ) : (
            /* Lazy-loaded iframe — only rendered after click */
            <iframe
              ref={iframeRef}
              src="https://www.loom.com/embed/placeholder?autoplay=1"
              title="123 Smart Media — 60-second product overview"
              className="h-full w-full"
              allow="autoplay; fullscreen"
              loading="lazy"
            />
          )}
        </motion.div>

        {/* Transcript toggle — accessibility */}
        <div className="mt-4">
          <button
            onClick={() => setShowTranscript((v) => !v)}
            className="flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
            aria-expanded={showTranscript}
            aria-controls="video-transcript"
          >
            {showTranscript ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showTranscript ? 'Hide transcript' : 'Show transcript'}
          </button>
          {showTranscript && (
            <div
              id="video-transcript"
              className="mt-3 rounded-xl bg-gray-800 p-4 text-sm leading-relaxed text-gray-300"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Transcript</p>
              <p>{transcript}</p>
            </div>
          )}
        </div>

        {/* CTA below video */}
        <div className="mt-8 text-center">
          <a
            href="/contact"
            data-cta-type="primary"
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-brand/30 hover:shadow-xl"
          >
            Book a Free Consultation →
          </a>
        </div>
      </div>
    </section>
  );
}
