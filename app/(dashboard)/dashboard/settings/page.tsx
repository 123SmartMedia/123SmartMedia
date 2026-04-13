'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/types/database';
import { motion } from 'framer-motion';
import { Save, Info } from 'lucide-react';

const industries = [
  { value: 'contractor', label: 'General Contractor' },
  { value: 'landscaper', label: 'Landscaping' },
  { value: 'plumber', label: 'Plumbing' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'pool', label: 'Pool Service' },
  { value: 'mason', label: 'Masonry' },
  { value: 'salon', label: 'Salon / Beauty' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'other', label: 'Other' },
] as const;

type FormState = 'idle' | 'saving' | 'saved' | 'error';

export default function SettingsPage() {
  const [form, setForm] = useState({
    business_name: '',
    phone: '',
    industry: '',
    sms_opt_in: false,
  });
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('business_name, phone, industry, sms_opt_in')
        .eq('id', user.id)
        .single();

      if (data) {
        setForm({
          business_name: data.business_name ?? '',
          phone: data.phone ?? '',
          industry: data.industry ?? '',
          sms_opt_in: data.sms_opt_in ?? false,
        });
      }
    }
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('saving');
    setErrorMsg('');

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setState('error'); setErrorMsg('Not authenticated'); return; }

    const industry = form.industry as Database['public']['Tables']['profiles']['Insert']['industry'];
    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        business_name: form.business_name,
        phone: form.phone || null,
        industry,
        sms_opt_in: form.sms_opt_in,
        sms_opt_in_source: form.sms_opt_in ? 'dashboard_settings' : null,
        sms_opt_in_timestamp: form.sms_opt_in ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      setState('error');
      setErrorMsg(error.message);
    } else {
      setState('saved');
      setTimeout(() => setState('idle'), 3000);
    }
  }

  const inputClass =
    'mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Update your business profile and preferences.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-gray-200 bg-white p-8">
        <h2 className="text-base font-bold text-gray-900">Business Information</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              type="text"
              value={form.business_name}
              onChange={(e) => setForm((p) => ({ ...p, business_name: e.target.value }))}
              placeholder="Smith Plumbing LLC"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              placeholder="(555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <select
            value={form.industry}
            onChange={(e) => setForm((p) => ({ ...p, industry: e.target.value }))}
            className={inputClass}
          >
            <option value="">Select your industry…</option>
            {industries.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* SMS Preferences */}
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-sm font-semibold text-gray-800">SMS Notifications</h3>
          <label className="mt-3 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.sms_opt_in}
              onChange={(e) => setForm((p) => ({ ...p, sms_opt_in: e.target.checked }))}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
            />
            <span className="text-sm text-gray-700">
              Receive SMS updates about your account, new leads, and billing reminders.
            </span>
          </label>
          {form.sms_opt_in && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
              <Info className="h-3.5 w-3.5 shrink-0" />
              Standard message rates may apply. Reply STOP at any time to opt out.
            </p>
          )}
        </div>

        {state === 'error' && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
            {errorMsg}
          </p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={state === 'saving'}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-bold text-white transition-all hover:bg-brand-dark hover:shadow-lg disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {state === 'saving' ? 'Saving…' : 'Save Changes'}
          </button>

          {state === 'saved' && (
            <motion.p
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm font-medium text-green-600"
            >
              ✓ Changes saved
            </motion.p>
          )}
        </div>
      </form>
    </div>
  );
}
