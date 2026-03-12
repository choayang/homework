import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { isAllowedUser } from "@/lib/allowed-users";

export async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const allowed = await isAllowedUser(session.user.email);
  if (!allowed) {
    redirect("/denied");
  }

  return <>{children}</>;
}
