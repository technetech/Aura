export const dynamic = 'force-dynamic';

import AppLayout from "@/components/layout/AppLayout";
import { getClients } from "@/actions/client";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clients = await getClients();
  return <AppLayout clients={clients}>{children}</AppLayout>;
}
