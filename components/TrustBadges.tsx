import { ShieldCheck, Star, Clock, PhoneCall, MapPin } from 'lucide-react';

interface Badge {
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
}

const badges: Badge[] = [
  {
    icon: <ShieldCheck className="h-5 w-5 text-green-400" aria-hidden="true" />,
    label: 'Licensed & Insured',
    ariaLabel: 'Licensed and insured agency',
  },
  {
    icon: (
      // Google "G" mark SVG
      <svg role="img" aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    label: 'Google Partner',
    ariaLabel: 'Certified Google Partner agency',
  },
  {
    icon: <span aria-hidden="true" className="text-lg leading-none">🔒</span>,
    label: 'SOC 2 Hosting',
    ariaLabel: 'SOC 2 compliant hosting infrastructure',
  },
  {
    icon: <Clock className="h-5 w-5 text-blue-300" aria-hidden="true" />,
    label: 'Live in 7 Days',
    ariaLabel: 'Website live within 7 business days',
  },
  {
    icon: <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" aria-hidden="true" />,
    label: '4.9/5 Rating',
    ariaLabel: '4.9 out of 5 star average client rating',
  },
  {
    icon: <MapPin className="h-5 w-5 text-blue-300" aria-hidden="true" />,
    label: 'All 50 States',
    ariaLabel: 'Serving businesses across all 50 U.S. states',
  },
];

export default function TrustBadges() {
  return (
    <div
      role="list"
      aria-label="Trust and credibility badges"
      className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3"
    >
      {badges.map(({ icon, label, ariaLabel }) => (
        <div
          key={label}
          role="listitem"
          aria-label={ariaLabel}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm"
        >
          {icon}
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
