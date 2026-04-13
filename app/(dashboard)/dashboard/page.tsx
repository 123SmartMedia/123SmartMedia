import { createClient } from '@/lib/supabase/server';
import { TrendingUp, Globe, Zap, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = { title: 'Dashboard' };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch profile + subscription
  const [profileRes, subRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user!.id).single(),
    supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user!.id)
      .in('status', ['active', 'trialing'])
      .maybeSingle(),
  ]);

  const profile = profileRes.data;
  const subscription = subRes.data;

  const planLabel =
    subscription?.plan_tier
      ? subscription.plan_tier.charAt(0).toUpperCase() + subscription.plan_tier.slice(1)
      : null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">
          Welcome back{profile?.business_name ? `, ${profile.business_name}` : ''}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here&apos;s your site and AI performance at a glance.
        </p>
      </div>

      {/* No subscription banner */}
      {!subscription && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-orange-900">No active plan</p>
              <p className="mt-1 text-sm text-orange-700">
                Choose a plan to go live and start capturing leads.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-white hover:bg-accent-dark transition-colors"
            >
              View Plans
            </Link>
          </div>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Globe className="h-5 w-5 text-green-500" />}
          label="Site Status"
          value={subscription ? 'Live ✓' : 'Pending'}
          sub={subscription ? '98% uptime · SSL active' : 'Awaiting plan activation'}
          color={subscription ? 'green' : 'gray'}
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          label="Active Plan"
          value={planLabel ?? '—'}
          sub={
            subscription?.current_period_end
              ? `Renews ${new Date(subscription.current_period_end).toLocaleDateString()}`
              : 'No plan active'
          }
          color="blue"
        />
        <StatCard
          icon={<Zap className="h-5 w-5 text-yellow-500" />}
          label="AI Tools"
          value="View Add-Ons"
          sub="Chatbot · SMS · Receptionist"
          color="yellow"
          href="/pricing"
        />
        <StatCard
          icon={<Bell className="h-5 w-5 text-purple-500" />}
          label="New Leads"
          value="—"
          sub="Connect CRM to track"
          color="purple"
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-base font-bold text-gray-900">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <QuickAction
            href="/pricing"
            label="Upgrade Plan"
            description="Unlock more AI tools & service areas"
            color="brand"
          />
          <QuickAction
            href="/dashboard/billing"
            label="Manage Billing"
            description="View invoices & update payment method"
            color="gray"
          />
          <QuickAction
            href="/dashboard/settings"
            label="Update Profile"
            description="Business info, phone & SMS preferences"
            color="gray"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: 'green' | 'blue' | 'yellow' | 'purple' | 'gray';
  href?: string;
}) {
  const bg: Record<typeof color, string> = {
    green: 'bg-green-50',
    blue: 'bg-blue-50',
    yellow: 'bg-yellow-50',
    purple: 'bg-purple-50',
    gray: 'bg-gray-50',
  };

  const card = (
    <div className={['rounded-2xl border border-gray-200 p-5', bg[color]].join(' ')}>
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </span>
      </div>
      <p className="mt-3 text-xl font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{sub}</p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block hover:opacity-90 transition-opacity">
        {card}
      </Link>
    );
  }
  return card;
}

function QuickAction({
  href,
  label,
  description,
  color,
}: {
  href: string;
  label: string;
  description: string;
  color: 'brand' | 'gray';
}) {
  return (
    <Link
      href={href}
      className={[
        'group flex items-center justify-between rounded-xl border p-4 transition-all hover:shadow-sm',
        color === 'brand'
          ? 'border-brand/30 bg-brand/5 hover:bg-brand/10'
          : 'border-gray-200 bg-white hover:border-gray-300',
      ].join(' ')}
    >
      <div>
        <p className={['text-sm font-semibold', color === 'brand' ? 'text-brand' : 'text-gray-800'].join(' ')}>
          {label}
        </p>
        <p className="mt-0.5 text-xs text-gray-500">{description}</p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
