// ─── Pricing tiers ────────────────────────────────────────────────────────────
// Replace price_* placeholders with real Stripe Price IDs from your dashboard.
// Monthly + annual prices must be created as recurring prices in Stripe.

export const PLANS = {
  starter: {
    name: 'Starter',
    monthlyPrice: 497,
    annualPrice: 447,
    monthlyPriceId: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID ?? 'price_starter_monthly',
    annualPriceId: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID ?? 'price_starter_annual',
    description: 'Perfect for contractors just getting started online.',
  },
  growth: {
    name: 'Growth',
    monthlyPrice: 997,
    annualPrice: 897,
    monthlyPriceId: process.env.STRIPE_GROWTH_MONTHLY_PRICE_ID ?? 'price_growth_monthly',
    annualPriceId: process.env.STRIPE_GROWTH_ANNUAL_PRICE_ID ?? 'price_growth_annual',
    description: 'The full stack for businesses ready to scale leads.',
  },
  elite: {
    name: 'Elite',
    monthlyPrice: 1997,
    annualPrice: 1797,
    monthlyPriceId: process.env.STRIPE_ELITE_MONTHLY_PRICE_ID ?? 'price_elite_monthly',
    annualPriceId: process.env.STRIPE_ELITE_ANNUAL_PRICE_ID ?? 'price_elite_annual',
    description: 'Full automation suite for established home service companies.',
  },
} as const;

export type PlanKey = keyof typeof PLANS;

// ─── AI Add-ons ───────────────────────────────────────────────────────────────
export const ADDONS = {
  chatbot: {
    name: 'AI Chatbot',
    price: 99,
    priceId: process.env.STRIPE_ADDON_CHATBOT_PRICE_ID ?? 'price_addon_chatbot',
    description: '24/7 lead capture & FAQ bot',
  },
  smsAutoback: {
    name: 'SMS Text-Back',
    price: 49,
    priceId: process.env.STRIPE_ADDON_SMS_PRICE_ID ?? 'price_addon_sms',
    description: 'Auto-text missed callers within 60s',
  },
  receptionist: {
    name: 'AI Receptionist',
    price: 149,
    priceId: process.env.STRIPE_ADDON_RECEPTIONIST_PRICE_ID ?? 'price_addon_receptionist',
    description: 'Answers, qualifies & books calls 24/7',
  },
  emailAutomation: {
    name: 'Email Automation',
    price: 79,
    priceId: process.env.STRIPE_ADDON_EMAIL_PRICE_ID ?? 'price_addon_email',
    description: 'Drip sequences + review requests',
  },
  socialAutomation: {
    name: 'Social Automation',
    price: 99,
    priceId: process.env.STRIPE_ADDON_SOCIAL_PRICE_ID ?? 'price_addon_social',
    description: 'Auto-post to Facebook & Instagram',
  },
} as const;

// ─── SMS copy ─────────────────────────────────────────────────────────────────
export const SMS_COPY = {
  newLead: (name: string, service: string) =>
    `🔔 New lead: ${name} — ${service}. Check your dashboard.`,
  missedCall: (businessName: string) =>
    `Hi! You just missed a call at ${businessName}. Reply here or call us back and we'll get you taken care of!`,
  appointmentReminder: (businessName: string, date: string) =>
    `Hi! This is a reminder for your appointment with ${businessName} on ${date}. Reply C to confirm or R to reschedule.`,
} as const;

// ─── Business info ────────────────────────────────────────────────────────────
export const BUSINESS = {
  name: '123 Smart Media',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? '(800) 123-7627',
  email: 'hello@123smartmedia.com',
  url: 'https://123smartmedia.com',
  tagline: 'Websites That Book Jobs For You',
} as const;
