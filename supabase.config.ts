"use client";

import { createClient } from "@/utils/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export const supabase = createClient();

export async function getSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}

export async function getUser(): Promise<User | null> {
  const session = await getSession();
  return session?.user ?? null;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

type SupabaseContextType = {
  session: Session | null;
  user: User | null;
};

const SupabaseContext = createContext<SupabaseContextType>({
  session: null,
  user: null,
});

interface SupabaseProviderProps {
  session: Session | null;
  children: ReactNode;
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  session: initialSession,
  children,
}) => {
  const [session, setSession] = useState<Session | null>(initialSession);
  const [user, setUser] = useState<User | null>(initialSession?.user ?? null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = React.useMemo(() => ({ session, user }), [session, user]);

  return React.createElement(SupabaseContext.Provider, { value }, children);
};

export const useSupabase = () => useContext(SupabaseContext);
