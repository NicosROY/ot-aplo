import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, userService } from '../services/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          // Récupérer le profil utilisateur complet
          const { data: profile, error } = await userService.getUserProfile(session.user.id);
          
          if (profile && !error) {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              role: profile.role || 'user',
              commune_id: profile.commune_id,
              commune_name: profile.communes?.name,
              commune: profile.communes,
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at
            });
          } else {
            setUser({
              id: session.user.id,
              email: session.user.email!,
              role: 'user',
              created_at: session.user.created_at,
              updated_at: session.user.updated_at || session.user.created_at
            });
          }
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await userService.signOut();
    setUser(null);
  };

  const value = {
    user,
    loading,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 