import { getStripe } from './config';
import { PLANS } from '@/lib/constants';

interface CreateCheckoutOptions {
  planKey: keyof typeof PLANS;
  billing: 'monthly' | 'annual';
  customerEmail?: string;
  userId?: string;
  addonPriceIds?: string[];
}

export async function createCheckoutSession({
  planKey,
  billing,
  customerEmail,
  userId,
  addonPriceIds = [],
}: CreateCheckoutOptions) {
  const plan = PLANS[planKey];
  const priceId = billing === 'annual' ? plan.annualPriceId : plan.monthlyPriceId;

  const lineItems = [
    { price: priceId, quantity: 1 },
    ...addonPriceIds.map((price) => ({ price, quantity: 1 })),
  ];

  const session = await getStripe().checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: lineItems,
    customer_email: customerEmail,
    metadata: { userId: userId ?? '', planKey, billing },
    subscription_data: {
      metadata: { userId: userId ?? '', planKey },
      trial_period_days: 0,
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?checkout=success&plan=${planKey}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?checkout=cancelled`,
    allow_promotion_codes: true,
  });

  return session;
}

export async function createBillingPortalSession(stripeCustomerId: string) {
  const session = await getStripe().billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing`,
  });
  return session;
}
