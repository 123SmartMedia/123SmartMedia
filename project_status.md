# 123 Smart Media — Project Status

**Last updated:** 2026-04-13  
**Current branch:** `main`  
**Repo:** [github.com/123SmartMedia/123SmartMedia](https://github.com/123SmartMedia/123SmartMedia)  
**Vercel project:** `prj_WOgVbAkbJa6ZtiMEzBrnuA9XGaPK` (team `team_AEmQpVpQt7Krrcfo9xwDlcMI`)  
**Supabase project:** `srumrljccqiuamivkupg`  

---

## Overall Status: DEPLOYED — Pending Final Config

Production build is live. All Stripe/Supabase/auth code is in place. Remaining work is dashboard configuration (price IDs, webhook registration, custom domain).

---

## Deployment

| Environment | URL | Status |
|---|---|---|
| Production | `123-smart-media-cz28tfo1z-123-smart-media.vercel.app` | READY |
| Custom domain | `123smartmedia.com` | Not connected yet |

**Last successful deploy:** `dpl_23QH8Q6Q9eznvEu9a8QiwtCfva6N` — commit `9ab6f8b`  
**Build fix history:** next.config.ts → .mjs, removed Pages Router config export, Stripe lazy-init via `getStripe()`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.1 (App Router, TypeScript) |
| Styling | Tailwind CSS + Framer Motion |
| Forms | react-hook-form + Zod |
| Auth | Supabase Auth (magic link / PKCE) |
| Database | Supabase PostgreSQL (RLS enabled) |
| Payments | Stripe Checkout + Customer Portal + Webhooks |
| Email | SendGrid (not wired up yet) |
| SMS | Twilio (not wired up yet) |
| Hosting | Vercel |
| Automation | Make.com (webhook trigger, not wired up yet) |

---

## File Map

```
app/
  page.tsx                          — Animated hero, stats counters, CTA → #contact-form
  pricing/page.tsx                  — Plan cards + AI add-ons accordion
  contact/page.tsx                  — Lead form with SMS consent + Zod validation
  login/page.tsx                    — Magic link login form
  services/page.tsx                 — Services overview
  demo/page.tsx                     — Demo page
  (dashboard)/
    layout.tsx                      — Auth guard (redirects to /login if unauthenticated)
    dashboard/page.tsx              — Plan status, stats grid, quick actions
    dashboard/billing/page.tsx      — Opens Stripe Customer Portal
    dashboard/settings/page.tsx     — Profile upsert (industry, SMS opt-in)
  api/
    auth/callback/route.ts          — PKCE code exchange → /dashboard
    auth/signout/route.ts           — POST sign out → home
    leads/route.ts                  — Contact form → contact_submissions table
    stripe/checkout/route.ts        — POST → Stripe Checkout Session
    stripe/webhook/route.ts         — Stripe webhook (signature verified)
    stripe/portal/route.ts          — POST → Stripe Customer Portal session

lib/
  supabase/client.ts                — createBrowserClient
  supabase/server.ts                — createServerClient + createAdminClient
  stripe/config.ts                  — Lazy getStripe() (never instantiated at module load)
  stripe/checkout.ts                — createCheckoutSession, createBillingPortalSession
  stripe/webhook-handler.ts         — Handles subscription created/updated/deleted, invoice.payment_failed
  constants.ts                      — PLANS, ADDONS, SMS_COPY, BUSINESS

components/
  dashboard/DashboardSidebar.tsx    — Desktop sidebar + mobile top bar
  shared/Footer.tsx                 — Dark footer with trust badges + SMS opt-out notice
  ui/MobileStickyNav.tsx            — Mobile sticky bottom nav
  ui/SiteHeader.tsx                 — Site header

types/
  database.ts                       — Full Supabase Database types (Insert/Update/Row)
  stripe.ts                         — CheckoutRequest type

middleware.ts                       — Guards /dashboard routes, refreshes session cookies
```

---

## Database (Supabase `srumrljccqiuamivkupg`)

All tables migrated with RLS enabled:

| Table | Purpose | RLS |
|---|---|---|
| `profiles` | Extends auth.users (business name, industry, SMS opt-in) | Users see own row only |
| `subscriptions` | Stripe subscription state per user | Users see own row only |
| `ai_addons` | Active AI add-ons per subscription | Via subscription owner |
| `contact_submissions` | Lead form submissions | Insert-only for anon |

Trigger: `handle_new_user()` — auto-creates `profiles` row on signup.

---

## Environment Variables

### Set in Vercel (confirmed)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PUBLISHABLE_KEY`

### Still needed in Vercel
- `STRIPE_STARTER_MONTHLY_PRICE_ID`
- `STRIPE_STARTER_ANNUAL_PRICE_ID`
- `STRIPE_GROWTH_MONTHLY_PRICE_ID`
- `STRIPE_GROWTH_ANNUAL_PRICE_ID`
- `STRIPE_ELITE_MONTHLY_PRICE_ID`
- `STRIPE_ELITE_ANNUAL_PRICE_ID`
- `STRIPE_ADDON_CHATBOT_PRICE_ID`
- `STRIPE_ADDON_SMS_PRICE_ID`
- `STRIPE_ADDON_RECEPTIONIST_PRICE_ID`
- `STRIPE_ADDON_EMAIL_PRICE_ID`
- `STRIPE_ADDON_SOCIAL_PRICE_ID`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `SENDGRID_API_KEY`
- `NEXT_PUBLIC_SITE_URL` (update to `https://123smartmedia.com` after domain connects)

---

## Checklist

### Infrastructure
- [x] Next.js 14 App Router scaffolded
- [x] Tailwind CSS + Framer Motion configured
- [x] Vercel project connected to GitHub (`123SmartMedia/123SmartMedia`)
- [x] Supabase project created (`srumrljccqiuamivkupg`)
- [x] Production build passing (green)
- [ ] Custom domain `123smartmedia.com` connected to Vercel
- [ ] SSL / DNS propagated

### Auth & Database
- [x] Supabase Auth (magic link) implemented
- [x] PKCE callback route (`/api/auth/callback`)
- [x] Sign out route
- [x] Protected dashboard layout (redirects unauthenticated users)
- [x] `profiles`, `subscriptions`, `ai_addons`, `contact_submissions` tables live
- [x] RLS policies enabled
- [x] Auto-profile trigger on signup

### Stripe
- [x] Checkout session API (`/api/stripe/checkout`)
- [x] Customer Portal API (`/api/stripe/portal`)
- [x] Webhook handler (subscription lifecycle + payment failed)
- [x] Stripe SDK lazy-init fix (no build-time crash)
- [ ] Products and prices created in Stripe dashboard
- [ ] Stripe price IDs added to Vercel env vars
- [ ] Webhook endpoint registered in Stripe dashboard (`/api/stripe/webhook`)
- [ ] Webhook events: `customer.subscription.*`, `invoice.payment_failed`, `checkout.session.completed`

### Pages / UI
- [x] Animated hero with stats counters
- [x] Pricing page with plan cards + AI add-ons accordion
- [x] Contact/lead form with SMS consent
- [x] Magic link login page
- [x] Dashboard home (plan status, quick actions)
- [x] Billing page (opens Stripe Customer Portal)
- [x] Settings page (profile + SMS opt-in)
- [x] Mobile sticky nav
- [x] Dark footer with trust badges
- [ ] Portfolio / case studies page
- [ ] Privacy policy + Terms of service pages
- [ ] Testimonials / social proof section

### Integrations (not yet wired)
- [ ] SendGrid — welcome email on signup, billing receipts
- [ ] Twilio — SMS opt-in confirmation, billing reminders
- [ ] Make.com — webhook automation trigger from contact form

---

## Known Issues / Notes

- `export { getStripe as stripe }` in `lib/stripe/config.ts` exports a **function**, not an instance. All callers correctly use `getStripe()` directly. Do not use the `stripe` named export with dot notation (`stripe.checkout...`) — it will throw.
- `lib/supabase.ts` exists as a legacy file alongside `lib/supabase/`. Not currently imported anywhere — safe to delete when cleaning up.
- Dashboard pages use `force-dynamic` is not set — they rely on the layout server component auth guard. If pages are ever extracted to standalone routes, add `export const dynamic = 'force-dynamic'`.
- Stripe plan tiers in code use `'starter' | 'growth' | 'elite'` but the DB schema in `project.md` shows `'starter' | 'growth' | 'pro'`. Code and live DB use `elite` — `project.md` is stale on this point.

---

## Pricing Reference

| Plan | Monthly | Annual |
|---|---|---|
| Starter | $199/mo | $159/mo (billed annually) |
| Growth | $349/mo | $279/mo |
| Elite | $499/mo | $399/mo |

**AI Add-ons** (per month, add to any plan):
| Add-on | Price |
|---|---|
| AI Chatbot | $49/mo |
| SMS Automation | $39/mo |
| AI Receptionist | $79/mo |
| Email Automation | $29/mo |
| Social Automation | $49/mo |
