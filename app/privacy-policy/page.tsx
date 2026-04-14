import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | 123 Smart Media',
  description: 'How 123 Smart Media collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 13, 2026</p>

      <div className="prose prose-gray mt-10 max-w-none">

        <h2>1. Who We Are</h2>
        <p>
          123 Smart Media (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates
          123smartmedia.com and provides AI-powered digital marketing services for home service businesses.
          Our principal place of business is Long Island, New York.
        </p>
        <p>
          Questions about this policy may be directed to{' '}
          <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a>.
        </p>

        <h2>2. Information We Collect</h2>
        <h3>Information you provide directly</h3>
        <ul>
          <li>Name, business name, email address, and phone number submitted via contact or lead forms</li>
          <li>Payment information (processed by Stripe — we do not store card numbers)</li>
          <li>Account credentials and profile details created during signup</li>
          <li>SMS opt-in consent, including timestamp and source</li>
          <li>Messages and communications sent to us</li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>IP address, browser type, and device information</li>
          <li>Pages visited, referring URLs, and time spent on site</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, operate, and improve our services</li>
          <li>Process payments and manage subscriptions</li>
          <li>Send transactional emails (receipts, account notifications)</li>
          <li>Send SMS messages to users who have opted in</li>
          <li>Respond to inquiries and provide customer support</li>
          <li>Send marketing communications (with your consent)</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. SMS Communications</h2>
        <p>
          By providing your phone number and checking the SMS consent box on our contact form, you agree
          to receive text messages from 123 Smart Media, including service updates, promotional offers,
          and lead notifications. Message and data rates may apply. Message frequency varies.
        </p>
        <p>
          <strong>To opt out:</strong> Reply STOP to any text message at any time. You may also email{' '}
          <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a> to be removed from SMS
          communications. After opting out, you will receive one final confirmation message.
        </p>
        <p>
          <strong>To get help:</strong> Reply HELP to any text message or contact us at{' '}
          <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a>.
        </p>
        <p>
          We do not sell or share your phone number with third parties for their marketing purposes.
        </p>

        <h2>5. Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share information with:</p>
        <ul>
          <li>
            <strong>Service providers:</strong> Stripe (payments), Supabase (database), SendGrid (email),
            Twilio (SMS), Vercel (hosting), and Make.com (automation). Each is bound by data processing
            agreements.
          </li>
          <li>
            <strong>Legal requirements:</strong> When required by law, court order, or government authority.
          </li>
          <li>
            <strong>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets.
          </li>
        </ul>

        <h2>6. Data Retention</h2>
        <p>
          We retain personal information for as long as necessary to provide our services and comply with
          legal obligations. Contact form submissions are retained for 2 years. Account data is retained
          for the duration of your subscription plus 90 days after cancellation, unless you request
          earlier deletion.
        </p>

        <h2>7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal information</li>
          <li>Opt out of marketing communications at any time</li>
          <li>Data portability (receive your data in a structured format)</li>
        </ul>
        <p>
          To exercise these rights, email{' '}
          <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a>. We will respond within
          30 days.
        </p>

        <h2>8. Cookies</h2>
        <p>
          We use essential cookies to operate our website and analytics cookies to understand how visitors
          use our site. You can disable cookies in your browser settings; however, some features may not
          function properly.
        </p>

        <h2>9. Security</h2>
        <p>
          We implement industry-standard security measures including SSL encryption, row-level security
          on our database, and access controls. No method of transmission over the internet is 100%
          secure, and we cannot guarantee absolute security.
        </p>

        <h2>10. Children&apos;s Privacy</h2>
        <p>
          Our services are not directed to individuals under 18. We do not knowingly collect personal
          information from children. If you believe we have inadvertently collected such information,
          please contact us immediately.
        </p>

        <h2>11. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material changes
          by posting the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
          Continued use of our services after changes constitutes acceptance of the updated policy.
        </p>

        <h2>12. Contact Us</h2>
        <p>
          If you have questions or concerns about this Privacy Policy, please contact us:
        </p>
        <address className="not-italic">
          <strong>123 Smart Media</strong><br />
          Long Island, New York<br />
          Email: <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a><br />
          Phone: (800) 123-7627
        </address>
      </div>

      <div className="mt-12 border-t border-gray-100 pt-8 text-sm text-gray-500">
        <Link href="/terms" className="text-brand hover:underline">Terms of Service</Link>
        {' · '}
        <Link href="/" className="text-brand hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}
