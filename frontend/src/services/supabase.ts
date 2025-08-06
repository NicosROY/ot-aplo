import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types pour les réponses Supabase
export interface SupabaseResponse<T> {
  data: T | null;
  error: any;
}

// Service pour les utilisateurs
export const userService = {
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { data: user, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select(`
        *,
        communes (
          id,
          name,
          population
        )
      `)
      .eq('id', userId)
      .single();
    
    return { data, error };
  }
};

// Service pour les événements
export const eventService = {
  async getEvents(communeId?: number, status?: string) {
    let query = supabase
      .from('events')
      .select(`
        *,
        categories (name),
        user_profiles!inner (
          communes!inner (name)
        )
      `)
      .order('created_at', { ascending: false });

    if (communeId) {
      query = query.eq('commune_id', communeId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    return { data, error };
  },

  async createEvent(eventData: any) {
    const { data, error } = await supabase
      .from('events')
      .insert(eventData)
      .select()
      .single();
    
    return { data, error };
  },

  async updateEvent(id: number, updates: any) {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  async deleteEvent(id: number) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    return { error };
  }
};

// Service pour les catégories
export const categoryService = {
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    return { data, error };
  }
};

// Service pour les communes
export const communeService = {
  async getCommunes() {
    const { data, error } = await supabase
      .from('communes')
      .select('*')
      .order('name');
    
    return { data, error };
  },

  async getCommuneById(id: number) {
    const { data, error } = await supabase
      .from('communes')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  }
};

// Service pour les abonnements
export const subscriptionService = {
  async getSubscription(communeId: number) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('commune_id', communeId)
      .eq('status', 'active')
      .single();
    
    return { data, error };
  }
};

// Service pour l'onboarding
export const onboardingService = {
  async getOnboardingProgress(userId: string) {
    const { data, error } = await supabase
      .from('onboarding_progress')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    return { data, error };
  },

  async updateOnboardingProgress(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('onboarding_progress')
      .upsert({
        user_id: userId,
        ...updates
      })
      .select()
      .single();
    
    return { data, error };
  }
}; 