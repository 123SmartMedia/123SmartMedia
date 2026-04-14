import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/ui/SiteHeader';
import MobileStickyNav from '@/components/ui/MobileStickyNav';
import StickyBookButton from '@/components/ui/StickyBookButton';
import Footer from '@/components/shared/Footer';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: '123 Smart Media | Websites Built for Home Service Businesses',
    template: '%s | 123 Smart Media',
  },
  description:
    'Done-for-you websites with unlimited edits and U.S.-based support — live in days. AI chatbots, SMS automation, and AI receptionists for contractors, HVAC, plumbing, landscaping, and more.',
  keywords: [
    'websites for home service businesses',
    'contractor website design',
    'HVAC website',
    'plumber website',
    'AI chatbot for contractors',
    'SMS automation small business',
  ],
  metadataBase: new URL('https://123smartmedia.com'),
  openGraph: {
    type: 'website',
    siteName: '123 Smart Media',
    description: 'Done-for-you websites with unlimited edits and U.S.-based support — live in days.',
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
        <Footer />
        {/*
          MobileStickyNav renders as a fixed bottom bar on viewports < md.
          It provides one-tap Call and Book actions on every page.
        */}
        <MobileStickyNav />
        <StickyBookButton />
      </body>
    </html>
  );
}
