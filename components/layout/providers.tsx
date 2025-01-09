"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SupabaseProvider } from "@/supabase.config";

const queryClient = new QueryClient();

export default function Providers({
  session,
  children,
}: {
  session: any;
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={queryClient}>
          <SupabaseProvider session={session}>{children}</SupabaseProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
