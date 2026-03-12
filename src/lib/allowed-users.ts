import { db } from "./db";

export async function isAllowedUser(email: string | null | undefined): Promise<boolean> {
  if (!email) return false;
  const user = await db.allowedUser.findUnique({
    where: { email: email.toLowerCase() },
  });
  return !!user;
}
