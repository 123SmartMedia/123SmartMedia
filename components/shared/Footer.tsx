import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

const navLinks = [
  {
    heading: 'Services',
    links: [
      { label: 'Web Development', href: '/services' },
      { label: 'AI Chatbot', href: '/services#chatbot' },
      { label: 'SMS Automation', href: '/services#sms' },
      { label: 'AI Receptionist', href: '/services#receptionist' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Live Demo', href: '/demo' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-7627';

  return (
    <footer className="border-t border-gray-100 bg-gray-950 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand col */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <span aria-hidden="true">⚡</span>
              <span>123 Smart Media</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              AI-powered websites, chatbots & automations for home service businesses.
              More calls. More bookings. More revenue.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <a
                href={`tel:${phone.replace(/\D/g, '')}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {phone}
              </a>
              <a
                href="mailto:hello@123smartmedia.com"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                hello@123smartmedia.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                Long Island, NY &amp; All 50 States
              </span>
            </div>
          </div>

          {/* Nav cols */}
          {navLinks.map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {heading}
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Trust col */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
              Trust &amp; Security
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 shrink-0 text-green-500" />
                Licensed &amp; Insured Agency
              </li>
              <li className="flex items-center gap-2">
                <span>🔒</span> SSL &amp; SOC 2 Hosting
              </li>
              <li className="flex items-center gap-2">
                <span>💳</span> Powered by Stripe
              </li>
              <li className="flex items-center gap-2">
                <span>🚀</span> Sites Live in 7 Days
              </li>
              <li className="flex items-center gap-2">
                <span>↩️</span> 30-Day Money-Back Guarantee
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} 123 Smart Media LLC. All rights reserved.</p>
          <p className="text-gray-600">
            SMS messages sent with user consent only. Reply STOP to opt out.
          </p>
        </div>
      </div>
    </footer>
  );
}
