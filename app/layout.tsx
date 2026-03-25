import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/ui/SiteHeader';
import MobileStickyNav from '@/components/ui/MobileStickyNav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: '123 Smart Media | Websites That Book Jobs For You',
    template: '%s | 123 Smart Media',
  },
  description:
    'AI-powered websites, chatbots, SMS automation, and AI receptionists for home service businesses. Get more calls, more bookings, more revenue.',
  metadataBase: new URL('https://123smartmedia.com'),
  openGraph: {
    type: 'website',
    siteName: '123 Smart Media',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main>{children}</main>
        {/*
          MobileStickyNav renders as a fixed bottom bar on viewports < md.
          It provides one-tap Call and Book actions on every page.
        */}
        <MobileStickyNav />
      </body>
    </html>
  );
}
