import Stripe from 'stripe';

// Use an empty string fallback so the module loads during build without
// throwing. Actual API calls will fail at runtime if the key is missing,
// which is the correct behavior for a server-only secret.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  typescript: true,
});
