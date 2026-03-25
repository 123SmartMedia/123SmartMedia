import Link from 'next/link';
import { Phone } from 'lucide-react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/demo', label: 'Live Demo' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteHeader() {
  const phone = process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-7627';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-brand">
          <span aria-hidden="true">⚡</span>
          <span>123 Smart Media</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-brand transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA (hidden on mobile — sticky bar handles it) */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${phone.replace(/\D/g, '')}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            <Phone className="h-4 w-4" />
            {phone}
          </a>
          <Link
            href="/contact"
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark transition-colors"
          >
            Get Free Site
          </Link>
        </div>
      </div>
    </header>
  );
}
