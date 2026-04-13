import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe/checkout';
import { createClient } from '@/lib/supabase/server';
import type { CheckoutRequest } from '@/types/stripe';
import { PLANS } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<CheckoutRequest>;
    const { planKey, billing, addonPriceIds } = body;

    if (!planKey || !billing) {
      return NextResponse.json({ error: 'planKey and billing are required' }, { status: 400 });
    }
    if (!(planKey in PLANS)) {
      return NextResponse.json({ error: 'Invalid planKey' }, { status: 400 });
    }
    if (billing !== 'monthly' && billing !== 'annual') {
      return NextResponse.json({ error: 'billing must be monthly or annual' }, { status: 400 });
    }

    // Get authenticated user if present (not required — guests can checkout too)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const session = await createCheckoutSession({
      planKey,
      billing,
      customerEmail: user?.email,
      userId: user?.id,
      addonPriceIds,
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
