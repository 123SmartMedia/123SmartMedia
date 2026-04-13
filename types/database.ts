export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          business_name: string;
          industry: 'contractor' | 'landscaper' | 'plumber' | 'hvac' | 'pool' | 'mason' | 'salon' | 'restaurant' | 'other' | null;
          phone: string | null;
          sms_opt_in: boolean;
          sms_opt_in_timestamp: string | null;
          sms_opt_in_source: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          business_name: string;
          industry?: 'contractor' | 'landscaper' | 'plumber' | 'hvac' | 'pool' | 'mason' | 'salon' | 'restaurant' | 'other' | null;
          phone?: string | null;
          sms_opt_in?: boolean;
          sms_opt_in_timestamp?: string | null;
          sms_opt_in_source?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          industry?: 'contractor' | 'landscaper' | 'plumber' | 'hvac' | 'pool' | 'mason' | 'salon' | 'restaurant' | 'other' | null;
          phone?: string | null;
          sms_opt_in?: boolean;
          sms_opt_in_timestamp?: string | null;
          sms_opt_in_source?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id: string | null;
          stripe_price_id: string | null;
          plan_tier: 'starter' | 'growth' | 'elite' | null;
          status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
          current_period_end: string | null;
          cancel_at_period_end: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          plan_tier?: 'starter' | 'growth' | 'elite' | null;
          status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string;
          stripe_subscription_id?: string | null;
          stripe_price_id?: string | null;
          plan_tier?: 'starter' | 'growth' | 'elite' | null;
          status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid';
          current_period_end?: string | null;
          cancel_at_period_end?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ai_addons: {
        Row: {
          id: string;
          subscription_id: string;
          addon_type: 'chatbot' | 'appointment_setter' | 'receptionist' | 'email_automation' | 'sms_automation' | 'social_automation';
          stripe_price_id: string;
          status: string;
          config: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          subscription_id: string;
          addon_type: 'chatbot' | 'appointment_setter' | 'receptionist' | 'email_automation' | 'sms_automation' | 'social_automation';
          stripe_price_id: string;
          status?: string;
          config?: Json | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          subscription_id?: string;
          addon_type?: 'chatbot' | 'appointment_setter' | 'receptionist' | 'email_automation' | 'sms_automation' | 'social_automation';
          stripe_price_id?: string;
          status?: string;
          config?: Json | null;
          created_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          business_name: string;
          email: string;
          phone: string | null;
          service_interest: string[] | null;
          message: string | null;
          sms_consent: boolean;
          ip_address: string | null;
          status: 'new' | 'contacted' | 'demo_built' | 'converted' | 'archived';
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          business_name: string;
          email: string;
          phone?: string | null;
          service_interest?: string[] | null;
          message?: string | null;
          sms_consent?: boolean;
          ip_address?: string | null;
          status?: 'new' | 'contacted' | 'demo_built' | 'converted' | 'archived';
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          business_name?: string;
          email?: string;
          phone?: string | null;
          service_interest?: string[] | null;
          message?: string | null;
          sms_consent?: boolean;
          ip_address?: string | null;
          status?: 'new' | 'contacted' | 'demo_built' | 'converted' | 'archived';
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
