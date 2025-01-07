import { auth } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return redirect("/");
  }

  return redirect("/dashboard/overview");
}
