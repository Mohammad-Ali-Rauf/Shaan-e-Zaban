import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Dashboard from "@/components/Dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      progress: {
        include: {
          story: true
        },
      },
    },
  });

  if (!user) redirect("/auth/signin");

  return <Dashboard user={user} />;
}