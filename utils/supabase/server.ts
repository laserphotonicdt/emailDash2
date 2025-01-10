import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name)?.value;
          if (!cookie) return undefined;

          try {
            // Handle base64 encoded cookies
            if (cookie.startsWith("base64-")) {
              const base64Value = cookie.slice(7);
              return Buffer.from(base64Value, "base64").toString("utf-8");
            }
            return cookie;
          } catch (error) {
            console.error("Failed to parse cookie:", error);
            return undefined;
          }
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component
            // This can be ignored if you have middleware refreshing
            // user sessions
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component
            // This can be ignored if you have middleware refreshing
            // user sessions
          }
        },
      },
    },
  );
}

export async function auth() {
  const supabase = createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}
