# 123 Smart Media — Website Upgrade Project

> **Goal**: Rebuild 123smartmedia.com with premium UI/UX, Stripe payments, and full-stack automation using Claude.ai + modern dev stack.

**Owner**: 123 Smart Media  
**Target Launch**: 30 days  
**Primary Focus**: UI/UX excellence + seamless payment/automation flow  
**Target Clients**: Small home service businesses (contractors, landscapers, plumbers, HVAC, pool services, masons)

---

## 🎯 Project Objectives

### Business Goals
- [ ] Convert "Free Website" lead magnet into paid subscriptions ($199-$499/mo)
- [ ] Enable frictionless Stripe checkout for plans + AI add-ons
- [ ] Automate onboarding: form → Supabase → SendGrid welcome → Twilio SMS confirmation
- [ ] Showcase portfolio with interactive case studies & live demo previews
- [ ] Achieve 95+ Lighthouse performance & accessibility scores

### Technical Goals
- [ ] Migrate to Next.js 14 (App Router) with TypeScript
- [ ] Implement Supabase Auth + Database for client management
- [ ] Integrate Stripe Checkout + Webhooks for subscription management
- [ ] Connect SendGrid (transactional email) + Twilio (SMS notifications)
- [ ] Deploy via Vercel with GitHub Actions CI/CD
- [ ] Build reusable UI component library with Tailwind CSS + Framer Motion

---

## 🛠️ Tech Stack Architecture
┌─────────────────────────────────────────┐
│ Frontend (Vercel) │
│ • Next.js 14 (App Router, TypeScript) │
│ • Tailwind CSS + shadcn/ui components │
│ • Framer Motion (animations) │
│ • React Hook Form + Zod (validation) │
└─────────────┬───────────────────────────┘
│ HTTPS / API Routes
┌─────────────▼───────────────────────────┐
│ Backend Services │
│ • Supabase: │
│ - Auth (magic links + OAuth) │
│ - PostgreSQL DB (clients, payments) │
│ - Storage (assets, previews) │
│ - Edge Functions (webhooks) │
│ │
│ • Stripe: │
│ - Checkout Sessions │
│ - Customer Portal │
│ - Webhooks (subscription events) │
│ │
│ • SendGrid: │
│ - Welcome emails │
│ - Billing receipts │
│ - Password resets │
│ │
│ • Twilio: │
│ - SMS opt-in confirmations │
│ - Billing reminders │
│ - 2FA (optional) │
└─────────────┬───────────────────────────┘
│ GitHub Actions
┌─────────────▼───────────────────────────┐
│ DevOps & Workflow │
│ • GitHub: Version control + PR reviews │
│ • Vercel: Preview deployments + prod │
│ • Claude.ai: AI pair-programming │
│ • Environment variables via Vercel UI │
└─────────────────────────────────────────┘


---

## 📂 Project Structure (Next.js App Router)

123-smart-media/
├── app/
│ ├── (marketing)/ # Public pages
│ │ ├── page.tsx # Hero + CTA (Free Website)
│ │ ├── pricing/
│ │ ├── services/
│ │ ├── portfolio/
│ │ ├── contact/
│ │ ├── privacy-policy/ # Updated legal pages
│ │ └── terms/
│ │
│ ├── (dashboard)/ # Auth-protected client area
│ │ ├── dashboard/
│ │ ├── billing/
│ │ ├── settings/
│ │ └── layout.tsx # Auth guard + sidebar
│ │
│ ├── api/
│ │ ├── stripe/
│ │ │ ├── checkout/route.ts
│ │ │ ├── webhook/route.ts
│ │ │ └── portal/route.ts
│ │ ├── contact/route.ts # Form handler → Supabase + SendGrid
│ │ ├── sms/route.ts # Twilio opt-in handler
│ │ └── auth/
│ │ ├── callback/route.ts
│ │ └── signout/route.ts
│ │
│ ├── layout.tsx # Root layout + providers
│ ├── globals.css # Tailwind + custom animations
│ └── robots.ts / sitemap.ts
│
├── components/
│ ├── ui/ # shadcn/ui base components
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── form.tsx
│ │ └── ...
│ │
│ ├── marketing/ # Public page components
│ │ ├── hero/
│ │ ├── pricing-cards/
│ │ ├── ai-addons-grid/
│ │ ├── testimonial-slider/
│ │ └── contact-form/
│ │
│ ├── dashboard/ # Client portal components
│ │ ├── stats-overview/
│ │ ├── site-preview/
│ │ ├── billing-history/
│ │ └── ai-toggle-switch/
│ │
│ └── shared/
│ ├── header.tsx
│ ├── footer.tsx
│ ├── sms-consent-badge.tsx
│ └── stripe-payment-element.tsx
│
├── lib/
│ ├── supabase/
│ │ ├── client.ts # Browser client
│ │ ├── server.ts # Server client
│ │ └── middleware.ts # RLS helpers
│ │
│ ├── stripe/
│ │ ├── config.ts
│ │ ├── checkout.ts
│ │ └── webhook-handler.ts
│ │
│ ├── sendgrid/
│ │ └── email-templates.ts
│ │
│ ├── twilio/
│ │ └── sms-service.ts
│ │
│ ├── utils.ts # cn(), formatters, validators
│ └── constants.ts # Pricing tiers, SMS copy, etc.
│
├── types/
│ ├── database.ts # Supabase generated types
│ ├── stripe.ts
│ └── api.ts
│
├── public/
│ ├── images/
│ ├── icons/
│ └── preview-sites/ # Static demo site snapshots
│
├── middleware.ts # Auth redirects + geo-blocking
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── project.md # ← You are here
└── README.md


---

## 🗄️ Supabase Database Schema

```sql
-- profiles (extends auth.users)
create table profiles (
  id uuid references auth.users primary key,
  business_name text not null,
  industry text check (industry in ('contractor','landscaper','plumber','hvac','pool','mason','salon','restaurant','other')),
  phone text,
  sms_opt_in boolean default false,
  sms_opt_in_timestamp timestamptz,
  sms_opt_in_source text, -- 'contact_form', 'checkout', etc.
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- subscriptions
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  stripe_customer_id text not null,
  stripe_subscription_id text,
  plan_tier text check (plan_tier in ('starter','growth','pro')),
  status text check (status in ('trialing','active','past_due','canceled','unpaid')),
  current_period_end timestamptz,
  cancel_at_period_end boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ai_addons
create table ai_addons (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid references subscriptions(id) on delete cascade,
  addon_type text check (addon_type in ('chatbot','appointment_setter','receptionist','email_automation','sms_automation','social_automation')),
  stripe_price_id text not null,
  status text default 'active',
  config jsonb, -- store chatbot prompts, SMS templates, etc.
  created_at timestamptz default now()
);

-- contact_submissions (for free website leads)
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text not null,
  email text not null,
  phone text,
  service_interest text[],
  message text,
  sms_consent boolean default false,
  ip_address inet,
  status text default 'new' check (status in ('new','contacted','demo_built','converted','archived')),
  created_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table profiles enable row level security;
alter table subscriptions enable row level security;
-- ... add policies so users can only access their own data