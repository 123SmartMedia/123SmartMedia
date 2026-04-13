import Stripe from 'stripe';

// Lazily instantiated so the module loads cleanly at build time
// without requiring STRIPE_SECRET_KEY to be present.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('Missing STRIPE_SECRET_KEY environment variable');
    _stripe = new Stripe(key, { typescript: true });
  }
  return _stripe;
}

// Convenience re-export — use getStripe() in server code that runs at runtime
export { getStripe as stripe };
