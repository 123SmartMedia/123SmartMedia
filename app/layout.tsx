import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from '@/components/ui/SiteHeader';
import MobileStickyNav from '@/components/ui/MobileStickyNav';
import StickyCTABar from '@/components/StickyCTABar';
import UrgencyBanner from '@/components/UrgencyBanner';
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
    'landscaping website',
    'AI chatbot for contractors',
    'SMS automation small business',
    'home service lead generation',
    'local SEO for contractors',
    'AI receptionist small business',
  ],
  metadataBase: new URL('https://123smartmedia.com'),
  alternates: {
    canonical: 'https://123smartmedia.com',
  },
  openGraph: {
    type: 'website',
    siteName: '123 Smart Media',
    title: '123 Smart Media | Websites Built for Home Service Businesses',
    description:
      'Done-for-you websites with unlimited edits and U.S.-based support — live in days. AI chatbots, SMS automation, and AI receptionists for contractors, HVAC, plumbing, landscaping, and more.',
    url: 'https://123smartmedia.com',
    images: [
      {
        url: 'https://123smartmedia.com/og-image.png',
        width: 1200,
        height: 630,
        alt: '123 Smart Media — AI-Powered Websites for Home Service Businesses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '123 Smart Media | Websites Built for Home Service Businesses',
    description:
      'Done-for-you websites with unlimited edits and U.S.-based support — live in days.',
    images: ['https://123smartmedia.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        <UrgencyBanner />
        <main>{children}</main>
        <Footer />
        {/*
          MobileStickyNav renders as a fixed bottom bar on viewports < md.
          It provides one-tap Call and Book actions on every page.
        */}
        <MobileStickyNav />
        <StickyCTABar />
      </body>
    </html>
  );
}
