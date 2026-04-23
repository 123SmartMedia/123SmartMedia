# 123 Smart Media — Project Status

**Last updated:** 2026-04-14  
**Active branch:** `main` (commit directly — no feature branches needed)  
**Repo:** [github.com/123SmartMedia/123SmartMedia](https://github.com/123SmartMedia/123SmartMedia)  
**Vercel project:** `prj_WOgVbAkbJa6ZtiMEzBrnuA9XGaPK` (team `team_AEmQpVpQt7Krrcfo9xwDlcMI`)  
**Supabase project:** `srumrljccqiuamivkupg`  

---

## Overall Status: DEPLOYED — Pending Domain + 3rd-Party Config

Production build is live. All code complete. Remaining work is mostly configuration tasks (domain, SendGrid, Twilio, Make.com) and one real Loom video URL swap.

---

## Deployment

| Environment | URL | Status |
|---|---|---|
| Production | `123-smart-media-cz28tfo1z-123-smart-media.vercel.app` | READY |
| Custom domain | `123smartmedia.com` | Not connected yet |

**Last commit pushed to main:** `9fb8f3c` — CRO+SEO upgrade  
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
| Email | SendGrid (code complete, needs API key in Vercel) |
| SMS | Twilio (code complete, needs credentials in Vercel) |
| Hosting | Vercel |
| Automation | Make.com (not yet wired) |

---

## File Map

```
app/
  page.tsx                          — Hero, TrustBadges, ClientLogos, ExplainerVideo, FAQ, ExitIntentPopup
  pricing/page.tsx                  — Plan cards + AI add-ons accordion + JSON-LD schema
  contact/page.tsx                  — Lead form with SMS consent + Zod validation
  login/page.tsx                    — Magic link login form
  services/page.tsx                 — Services overview with pricing
  portfolio/page.tsx                — 6 case studies with metrics
  privacy-policy/page.tsx           — Full policy with SMS opt-in/out language
  terms/page.tsx                    — Full ToS: refund, cancel, asset export
  demo/page.tsx                     — Demo page
  (dashboard)/
    layout.tsx                      — Auth guard (redirects to /login if unauthenticated)
    dashboard/page.tsx              — Plan status, stats grid, quick actions
    dashboard/billing/page.tsx      — Opens Stripe Customer Portal
    dashboard/settings/page.tsx     — Profile upsert (industry, SMS opt-in)
  api/
    auth/callback/route.ts          — PKCE code exchange → /dashboard (fires welcome email for new users)
    auth/signout/route.ts           — POST sign out → home
    leads/route.ts                  — Contact form → Supabase + SendGrid + Twilio (allSettled)
    stripe/checkout/route.ts        — POST → Stripe Checkout Session
    stripe/webhook/route.ts         — Stripe webhook (signature verified, force-dynamic)
    stripe/portal/route.ts          — POST → Stripe Customer Portal session

lib/
  supabase/client.ts                — createBrowserClient
  supabase/server.ts                — createServerClient + createAdminClient
  stripe/config.ts                  — Lazy getStripe() (never instantiated at module load)
  stripe/checkout.ts                — createCheckoutSession, createBillingPortalSession
  stripe/webhook-handler.ts         — Handles subscription created/updated/deleted, invoice.payment_failed
  sendgrid/emails.ts                — sendLeadConfirmation, sendLeadAlert, sendWelcomeEmail, sendSubscriptionConfirmation
  twilio/sms.ts                     — sendSmsOptInConfirmation, sendLeadAlertSms, sendMissedCallTextBack, sendAppointmentReminder
  constants.ts                      — PLANS, ADDONS, SMS_COPY, BUSINESS (all 12 Stripe price IDs)

components/
  StickyCTABar.tsx                  — Scroll-triggered sticky CTA, dismissible (localStorage 7-day TTL)
  UrgencyBanner.tsx                 — Amber urgency banner, dismissible, shown on every page
  TrustBadges.tsx                   — 6 trust badges shown in hero
  AIDemoModal.tsx                   — Simulated AI chat demo modal
  ClientLogos.tsx                   — Infinite-scroll client logo carousel
  ExplainerVideo.tsx                — Dark section with lazy Loom iframe + transcript toggle
  FAQSection.tsx                    — Accordion FAQ with FAQPage JSON-LD schema
  ExitIntentPopup.tsx               — Exit-intent popup (desktop mouseleave + mobile popstate)
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
- All 12 Stripe price IDs (STARTER/GROWTH/ELITE × MONTHLY/ANNUAL + 5 add-ons)

### Still needed in Vercel
- `SENDGRID_API_KEY`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `BUSINESS_OWNER_PHONE` (your phone — receives lead alert SMS)
- `NEXT_PUBLIC_SITE_URL` (set to `https://123smartmedia.com` after domain connects)

---

## Checklist

### Infrastructure
- [x] Vercel project connected to GitHub
- [x] Production build passing
- [x] Supabase project live with all tables + RLS
- [x] Stripe products, prices, and webhook created
- [ ] Custom domain `123smartmedia.com` connected to Vercel
- [ ] SSL / DNS propagated

### Code — Complete
- [x] Full homepage with CRO components
- [x] Pricing page (correct prices, JSON-LD, testimonials, FAQ)
- [x] Services, Portfolio, Privacy Policy, Terms pages
- [x] Contact form → Supabase + SendGrid + Twilio
- [x] Auth (magic link, PKCE, protected dashboard)
- [x] Stripe checkout + portal + webhook handler
- [x] SendGrid email templates (lead confirm, lead alert, welcome, billing)
- [x] Twilio SMS service (opt-in, lead alert, missed call, reminder)
- [x] Full SEO metadata (OG, Twitter card, canonical, robots, JSON-LD on pricing + FAQ)
- [x] 8 CRO components (StickyCTABar, UrgencyBanner, TrustBadges, AIDemoModal, ClientLogos, ExplainerVideo, FAQSection, ExitIntentPopup)

### Still Needed
- [ ] Add `SENDGRID_API_KEY`, `TWILIO_*`, `BUSINESS_OWNER_PHONE` to Vercel env vars
- [ ] Connect `123smartmedia.com` domain in Vercel dashboard
- [ ] Record Loom video and replace placeholder URL in `components/ExplainerVideo.tsx:89`
- [ ] Add real OG image (`public/og-image.png`, 1200×630px)
- [ ] Wire Make.com webhook (trigger on new `contact_submissions` row)
- [ ] Test Stripe checkout end-to-end in live mode
- [ ] Test magic link login + dashboard flow

---

## Known Issues / Notes

- `export { getStripe as stripe }` in `lib/stripe/config.ts` exports a **function**, not an instance. All callers use `getStripe()` directly. Never use the `stripe` named export with dot notation.
- `lib/supabase.ts` legacy file exists alongside `lib/supabase/` — not imported anywhere, safe to delete.
- Dashboard `force-dynamic` is handled by the layout auth guard. If any page is ever extracted to a standalone route, add `export const dynamic = 'force-dynamic'`.
- ExplainerVideo Loom URL is a placeholder — video will not play until replaced.

---

## Pricing Reference

| Plan | Monthly | Annual | Annual Savings |
|---|---|---|---|
| Starter | $199/mo | $159/mo | $480/yr |
| Growth | $349/mo | $279/mo | $840/yr |
| Elite | $499/mo | $399/mo | $1,200/yr |

**AI Add-ons:**
| Add-on | Price |
|---|---|
| AI Chatbot | $49/mo |
| SMS Automation | $39/mo |
| AI Receptionist | $79/mo |
| Email Automation | $29/mo |
| Social Automation | $49/mo |
| Social Media Page Setup | $299 one-time |
