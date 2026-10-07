"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getIronSession } from "iron-session";
import { authConfig, safeReturnTo, sessionOptions, SESSION_COOKIE, SESSION_TTL, type AdminSession } from "@/lib/auth/session-config";
import { verifyPassword } from "@/lib/auth/password";
import { allowLoginAttempt } from "@/lib/auth/rate-limit";

export async function signIn(_previous: { error: string }, data: FormData) {
  const config = authConfig();
  if (!config) return { error: "Admin login needs local setup. Run the admin setup command." };
  const email = data.get("email");
  const password = data.get("password");
  if (typeof email !== "string" || typeof password !== "string" || email.length > 254 || password.length > 1024) return { error: "Invalid email or password." };
  try {
    if (!(await allowLoginAttempt())) return { error: "Too many sign-in attempts. Try again in 15 minutes." };
    const validPassword = await verifyPassword(password, config.passwordHash);
    if (!validPassword || email.trim().toLowerCase() !== config.email) return { error: "Invalid email or password." };
    const session = await getIronSession<AdminSession>(await cookies(), sessionOptions());
    session.email = config.email;
    session.credentialVersion = config.credentialVersion;
    session.expiresAt = Date.now() + SESSION_TTL * 1000;
    await session.save();
  } catch {
    return { error: "Sign-in is temporarily unavailable. Please try again." };
  }
  redirect(safeReturnTo(data.get("returnTo")));
}

export async function signOut() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/");
}
