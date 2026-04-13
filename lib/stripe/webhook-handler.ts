import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';

type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';

async function upsertSubscription(sub: Stripe.Subscription) {
  const supabase = createAdminClient();
  const userId = sub.metadata?.userId;

  if (!userId) {
    console.warn('Stripe webhook: subscription missing userId metadata', sub.id);
    return;
  }

  const item = sub.items.data[0];
  // current_period_end lives on the item in newer Stripe API versions
  const periodEnd =
    'current_period_end' in sub
      ? new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000).toISOString()
      : null;

  await supabase.from('subscriptions').upsert(
    {
      stripe_subscription_id: sub.id,
      stripe_customer_id: String(sub.customer),
      user_id: userId,
      plan_tier: (sub.metadata?.planKey as 'starter' | 'growth' | 'elite' | null) ?? null,
      status: sub.status as SubscriptionStatus,
      current_period_end: periodEnd,
      cancel_at_period_end: sub.cancel_at_period_end,
      stripe_price_id: item?.price.id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'stripe_subscription_id' }
  );
}

export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === 'subscription' && session.subscription) {
        // Subscription record will be created by customer.subscription.created
        console.log('Checkout completed for customer:', session.customer);
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await upsertSubscription(event.data.object as Stripe.Subscription);
      break;

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const supabase = createAdminClient();
      await supabase
        .from('subscriptions')
        .update({ status: 'canceled', updated_at: new Date().toISOString() })
        .eq('stripe_subscription_id', sub.id);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice & { subscription?: string | null };
      const supabase = createAdminClient();
      if (invoice.subscription) {
        await supabase
          .from('subscriptions')
          .update({ status: 'past_due', updated_at: new Date().toISOString() })
          .eq('stripe_subscription_id', String(invoice.subscription));
      }
      break;
    }

    default:
      console.log(`Unhandled Stripe event: ${event.type}`);
  }
}
