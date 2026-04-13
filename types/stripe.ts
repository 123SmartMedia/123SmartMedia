import type { PlanKey } from '@/lib/constants';

export interface CheckoutRequest {
  planKey: PlanKey;
  billing: 'monthly' | 'annual';
  addonPriceIds?: string[];
}

export interface CheckoutResponse {
  url: string;
}

export interface PortalRequest {
  customerId: string;
}

export interface PortalResponse {
  url: string;
}
