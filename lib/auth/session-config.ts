import { createHash } from "node:crypto";
import type { SessionOptions } from "iron-session";

export const SESSION_COOKIE = "portfolio_admin";
export const SESSION_TTL = 8 * 60 * 60;
export interface AdminSession {
  email?: string;
  credentialVersion?: string;
  expiresAt?: number;
}

export function authConfig() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  const secret = process.env.AUTH_SECRET;
  if (!email || !passwordHash || !/^scrypt\$[a-f0-9]{32}\$[a-f0-9]{128}$/.test(passwordHash) || !secret || secret.length < 32) return null;
  return { email, passwordHash, secret,
    credentialVersion: createHash("sha256").update(passwordHash).digest("hex") };
}

export function sessionOptions(): SessionOptions {
  const config = authConfig();
  if (!config) throw new Error("Admin authentication is not configured");
  return {
    cookieName: SESSION_COOKIE,
    password: config.secret,
    ttl: SESSION_TTL,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    },
  };
}

export function isAdminSession(session: AdminSession, now = Date.now()): boolean {
  const config = authConfig();
  return !!config && session.email === config.email &&
    session.credentialVersion === config.credentialVersion &&
    typeof session.expiresAt === "number" && session.expiresAt > now;
}

export function safeReturnTo(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || /[\\\x00-\x20]/.test(value)) return "/projects";
  return value;
}
