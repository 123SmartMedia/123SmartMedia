-- Create leads table for the 123 Smart Media contact form router
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  email       text not null,
  phone       text not null,
  service     text not null,
  message     text not null default '',
  source      text not null default 'website-contact-form',
  status      text not null default 'new'  -- new | contacted | closed
);

-- Index for common query patterns
create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

-- RLS: only service-role key may insert/read (Next.js API route & Edge Function use it)
alter table public.leads enable row level security;

-- Allow insert from Edge Functions / API routes using the service role
create policy "service_role_all" on public.leads
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
