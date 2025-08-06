export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  commune_id?: number;
  commune_name?: string;
  commune?: {
    id: number;
    name: string;
    population: number;
  };
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date_start: string;
  date_end: string;
  location: string;
  adresse: string;
  category_id: number;
  is_free: boolean;
  price?: number;
  uploaded_image_url?: string;
  gps_lat?: number;
  gps_lng?: number;
  coordinate?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  creator_id: string;
  status: 'pending' | 'approved' | 'rejected' | 'pushed';
  aplo_sync_status: 'pending' | 'synced' | 'error';
  commune_id: number;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface Commune {
  id: number;
  name: string;
  population: number;
  created_at: string;
}

export interface Subscription {
  id: number;
  commune_id: number;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'past_due';
  plan_type: 'small' | 'medium' | 'large';
  amount_monthly: number;
  currency: string;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: number;
  subscription_id: number;
  stripe_payment_intent_id: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'pending';
  payment_method: string;
  created_at: string;
}

export interface OnboardingProgress {
  id: string;
  user_id: string;
  step: number;
  completed: boolean;
  admin_data?: any;
  commune_data?: any;
  kyc_data?: any;
  legal_data?: any;
  team_data?: any;
  subscription_data?: any;
  created_at: string;
  updated_at: string;
}

export interface AdminNotification {
  id: number;
  type: 'event_created' | 'event_updated' | 'payment_received' | 'user_registered';
  title: string;
  message: string;
  data?: any;
  read: boolean;
  created_at: string;
}

export interface TeamInvitation {
  id: number;
  email: string;
  commune_id: number;
  role: 'admin' | 'user';
  token: string;
  expires_at: string;
  accepted: boolean;
  created_at: string;
} 