"use client";
import React from "react";
import ThemeProvider from "./ThemeToggle/theme-provider";
import { SupabaseProvider } from "@/supabase.config";

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
        <SupabaseProvider session={session}>{children}</SupabaseProvider>
      </ThemeProvider>
    </>
  );
}
