import { NextRequest, NextResponse } from 'next/server';
import { createBillingPortalSession } from '@/lib/stripe/checkout';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Look up the Stripe customer ID from subscriptions table
    const { data: sub, error: subError } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (subError || !sub?.stripe_customer_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    const session = await createBillingPortalSession(sub.stripe_customer_id);
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('Billing portal error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
