'use client';

import { useRef } from 'react';

interface Client {
  name: string;
  industry: string;
  location: string;
  initials: string;
  color: string;
}

const clients: Client[] = [
  { name: 'Peak HVAC Services', industry: 'HVAC', location: 'Long Island, NY', initials: 'PH', color: '#0066FF' },
  { name: 'GreenScape Landscaping', industry: 'Landscaping', location: 'Nassau County, NY', initials: 'GL', color: '#16a34a' },
  { name: 'Reliable Plumbing Co.', industry: 'Plumbing', location: 'Suffolk County, NY', initials: 'RP', color: '#ea580c' },
  { name: 'Suncoast Pool & Spa', industry: 'Pool Services', location: 'Florida', initials: 'SP', color: '#0ea5e9' },
  { name: 'Ironclad Masonry', industry: 'Masonry', location: 'New Jersey', initials: 'IM', color: '#64748b' },
  { name: 'Alpine Contractors', industry: 'Contracting', location: 'Westchester, NY', initials: 'AC', color: '#f59e0b' },
  { name: 'Coastal Electric', industry: 'Electrical', location: 'Connecticut', initials: 'CE', color: '#7c3aed' },
  { name: 'ProRoof Solutions', industry: 'Roofing', location: 'Texas', initials: 'PR', color: '#dc2626' },
];

// Duplicate for seamless infinite scroll
const allClients = [...clients, ...clients];

export default function ClientLogos() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      aria-label="Client logos — home service businesses we serve"
      className="overflow-hidden border-y border-gray-100 bg-white py-10"
    >
      <p className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
        Trusted by Home Service Businesses Across the U.S.
      </p>

      <div className="relative">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />

        {/* Scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-6 [animation:logoScroll_28s_linear_infinite] hover:[animation-play-state:paused]"
          aria-hidden="true" // Screen readers get the section label above
          style={{ width: 'max-content' }}
        >
          {allClients.map(({ name, industry, location, initials, color }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex w-48 shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-gray-50 px-5 py-4"
              title={`${name} — ${location}`}
            >
              {/* Logo placeholder: colored circle with initials */}
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white"
                style={{ backgroundColor: color }}
                aria-label={`${industry} client — ${location}`}
              >
                {initials}
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-gray-700 leading-tight">{name}</p>
                <p className="text-xs text-gray-400">{industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible list for screen readers */}
      <ul className="sr-only">
        {clients.map(({ name, location }) => (
          <li key={name}>{name} — {location}</li>
        ))}
      </ul>
    </section>
  );
}
