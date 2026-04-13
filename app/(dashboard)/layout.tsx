import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}
