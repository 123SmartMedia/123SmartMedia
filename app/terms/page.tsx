import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | 123 Smart Media',
  description: 'Terms and conditions for using 123 Smart Media services.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: April 13, 2026</p>

      <div className="prose prose-gray mt-10 max-w-none">

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing or using the services provided by 123 Smart Media (&ldquo;Company,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these
          Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use our services.
        </p>
        <p>
          These Terms apply to all visitors, users, and clients of 123smartmedia.com and all related
          services.
        </p>

        <h2>2. Services</h2>
        <p>
          123 Smart Media provides AI-powered digital marketing services for home service businesses,
          including but not limited to:
        </p>
        <ul>
          <li>Website design and hosting</li>
          <li>AI chatbot and receptionist services</li>
          <li>SMS and email automation</li>
          <li>Social media setup and management</li>
          <li>Lead generation and follow-up automation</li>
        </ul>
        <p>
          We reserve the right to modify, suspend, or discontinue any service at any time with reasonable
          notice.
        </p>

        <h2>3. Subscriptions and Billing</h2>
        <h3>Subscription plans</h3>
        <p>
          Our services are offered on a monthly or annual subscription basis. Subscriptions automatically
          renew at the end of each billing period unless cancelled. Annual subscriptions are billed
          upfront for the full year.
        </p>
        <h3>Payment</h3>
        <p>
          All payments are processed securely through Stripe. By providing payment information, you
          authorize us to charge the applicable fees to your payment method. All fees are in US dollars
          and are non-refundable except as stated in Section 4.
        </p>
        <h3>Price changes</h3>
        <p>
          We reserve the right to change subscription prices. We will provide at least 30 days&apos;
          notice before any price change takes effect for existing subscribers.
        </p>
        <h3>Add-ons</h3>
        <p>
          AI add-on services are billed as additional recurring charges on top of your base plan.
          One-time services (such as Social Media Business Page Setup) are billed once at the time
          of purchase.
        </p>

        <h2>4. Refund Policy</h2>
        <p>
          We offer a <strong>30-day money-back guarantee</strong> on all new subscriptions. If you are
          not satisfied within the first 30 days, contact us at{' '}
          <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a> for a full refund.
        </p>
        <p>
          After 30 days, subscription fees are non-refundable. Cancellation takes effect at the end
          of the current billing period — you retain access until then. One-time fees are non-refundable
          once work has commenced.
        </p>

        <h2>5. Cancellation</h2>
        <p>
          You may cancel your subscription at any time from your dashboard under Billing, or by
          contacting us. There are no cancellation fees or long-term contracts. Cancellation takes
          effect at the end of the current billing cycle.
        </p>

        <h2>6. Acceptable Use</h2>
        <p>You agree not to use our services to:</p>
        <ul>
          <li>Violate any applicable law or regulation</li>
          <li>Send unsolicited spam or harass individuals</li>
          <li>Transmit malicious code or interfere with our systems</li>
          <li>Impersonate any person or entity</li>
          <li>Collect user data without consent</li>
          <li>Engage in any deceptive or fraudulent activity</li>
        </ul>
        <p>
          We reserve the right to suspend or terminate accounts that violate these terms without refund.
        </p>

        <h2>7. SMS Communications</h2>
        <p>
          By opting into SMS communications, you consent to receive automated text messages from
          123 Smart Media. You may opt out at any time by replying STOP. Standard message and data
          rates may apply. See our <Link href="/privacy-policy">Privacy Policy</Link> for full SMS terms.
        </p>

        <h2>8. Intellectual Property</h2>
        <p>
          All website content, branding, software, and materials provided by 123 Smart Media are our
          property or licensed to us. You may not reproduce, distribute, or create derivative works
          without our written permission.
        </p>
        <p>
          Content you provide (logos, business information, photos) remains your property. By submitting
          content, you grant us a license to use it to provide and promote our services on your behalf.
        </p>

        <h2>9. Website Ownership</h2>
        <p>
          Websites built and hosted by 123 Smart Media on behalf of clients are licensed to the client
          for the duration of their active subscription. Upon cancellation, clients may request a copy
          of their website assets (design files, copy, images) within 30 days. Hosting and AI services
          will be deactivated upon cancellation.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, 123 Smart Media shall not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including lost profits, lost revenue,
          or lost data, arising from your use of our services.
        </p>
        <p>
          Our total liability for any claim arising from these Terms or our services shall not exceed
          the total fees paid by you in the 3 months preceding the claim.
        </p>

        <h2>11. Disclaimer of Warranties</h2>
        <p>
          Our services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties
          of any kind, express or implied. We do not guarantee specific results, lead volumes, or revenue
          outcomes. Individual results vary based on industry, location, competition, and other factors.
        </p>

        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify and hold harmless 123 Smart Media, its officers, employees, and agents
          from any claims, damages, or expenses arising from your use of our services, your violation
          of these Terms, or your violation of any third-party rights.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the State of New York, without regard to conflict
          of law principles. Any disputes shall be resolved in the courts of Nassau County, New York.
        </p>

        <h2>14. Changes to Terms</h2>
        <p>
          We may update these Terms at any time. We will notify you of material changes by email or
          by posting a notice on our website. Continued use of our services after changes constitutes
          acceptance of the updated Terms.
        </p>

        <h2>15. Contact</h2>
        <p>
          For questions about these Terms, contact us at:
        </p>
        <address className="not-italic">
          <strong>123 Smart Media</strong><br />
          Long Island, New York<br />
          Email: <a href="mailto:hello@123smartmedia.com">hello@123smartmedia.com</a><br />
          Phone: (800) 123-7627
        </address>
      </div>

      <div className="mt-12 border-t border-gray-100 pt-8 text-sm text-gray-500">
        <Link href="/privacy-policy" className="text-brand hover:underline">Privacy Policy</Link>
        {' · '}
        <Link href="/" className="text-brand hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}
