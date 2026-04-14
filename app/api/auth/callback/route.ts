import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { sendWelcomeEmail } from '@/lib/sendgrid/emails';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Check if this is a brand-new user (first sign-in)
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const createdAt = new Date(user.created_at).getTime();
        const now = Date.now();
        const isNewUser = now - createdAt < 60_000; // within last 60 seconds

        if (isNewUser) {
          // Fire-and-forget — don't block the redirect
          sendWelcomeEmail({
            email: user.email!,
            name: user.user_metadata?.full_name ?? user.user_metadata?.name,
          }).catch((err) => console.error('[Auth callback] welcome email error:', err));
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error('[Auth callback] code exchange error:', error.message);
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
