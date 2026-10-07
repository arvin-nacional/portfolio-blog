import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { redirect } from "next/navigation";
import { authConfig, isAdminSession, sessionOptions, type AdminSession } from "./session-config";

export const isAdmin = cache(async () => {
  const cookieStore = await cookies();
  if (!authConfig()) return false;
  const session = await getIronSession<AdminSession>(cookieStore, sessionOptions());
  return isAdminSession(session);
});

export async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized: admin sign-in required");
}

export async function requireAdminPage(returnTo: string) {
  if (!(await isAdmin())) redirect(`/sign-in?returnTo=${encodeURIComponent(returnTo)}`);
}
