import { getAuthUser } from "@/lib/supabase/auth";
import { AppShell } from "@/components/layout/AppShell";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  return (
    <AppShell userEmail={user.email ?? undefined}>
      {children}
    </AppShell>
  );
}
