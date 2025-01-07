"use client";
import KBar from "@/components/kbar";
import AppSidebar from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";

interface AppSidebarProps {
  session: Session | null;
}

interface HeaderProps {
  session: Session | null;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  defaultSidebarOpen: boolean;
}

export default function DashboardLayout({
  children,
  defaultSidebarOpen,
}: DashboardLayoutProps) {
  const router = useRouter();
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      }
      setSession(session);
    };

    getSession();
  }, [router, supabase]);

  if (!session) {
    return null;
  }

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultSidebarOpen}>
        <AppSidebar session={session} />
        <SidebarInset>
          <Header session={session} />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}
