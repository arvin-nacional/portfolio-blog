import { NextResponse, type NextRequest } from "next/server";
import { unsealData } from "iron-session";
import { authConfig, isAdminSession, SESSION_COOKIE, SESSION_TTL, type AdminSession } from "@/lib/auth/session-config";

export async function proxy(request: NextRequest) {
  const config = authConfig();
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  let authorized = false;
  if (config && cookie) {
    try {
      const session = await unsealData<AdminSession>(cookie, { password: config.secret, ttl: SESSION_TTL });
      authorized = isAdminSession(session);
    } catch { /* Invalid cookies never authorize access. */ }
  }
  if (authorized) return NextResponse.next();
  const url = new URL("/sign-in", request.url);
  url.searchParams.set("returnTo", request.nextUrl.pathname + request.nextUrl.search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/blog/add/:path*", "/blog/edit/:path*", "/projects/add/:path*", "/projects/edit/:path*"],
};
