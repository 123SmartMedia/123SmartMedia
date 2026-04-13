'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { User } from '@supabase/supabase-js';
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  LogOut,
  Zap,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardSidebar({ user }: { user: User }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white md:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-brand">
            <span aria-hidden="true">⚡</span>
            <span className="text-sm">123 Smart Media</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand/10 text-brand'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
                {active && <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-50" />}
              </Link>
            );
          })}
        </nav>

        {/* AI upsell */}
        <div className="mx-3 mb-4 rounded-xl bg-gradient-to-br from-brand to-blue-800 p-4 text-white">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-300" />
            <span className="text-xs font-bold uppercase tracking-wide">AI Add-Ons</span>
          </div>
          <p className="mt-1.5 text-xs text-blue-100">
            Add chatbot, SMS automation, or AI receptionist to your plan.
          </p>
          <Link
            href="/pricing"
            className="mt-3 inline-block rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold hover:bg-white/30 transition-colors"
          >
            Explore Add-Ons →
          </Link>
        </div>

        {/* User footer */}
        <div className="border-t border-gray-100 p-4">
          <p className="truncate text-xs font-medium text-gray-700">{user.email}</p>
          <form action="/api/auth/signout" method="POST" className="mt-2">
            <button
              type="submit"
              className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 md:hidden">
        <Link href="/" className="flex items-center gap-1.5 font-bold text-brand text-sm">
          <span aria-hidden="true">⚡</span>
          123 Smart Media
        </Link>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={[
                'flex h-9 w-9 items-center justify-center rounded-lg transition-colors',
                pathname === href ? 'bg-brand/10 text-brand' : 'text-gray-500 hover:text-gray-900',
              ].join(' ')}
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
