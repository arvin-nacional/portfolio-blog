"use client";

import { useActionState } from "react";
import { signIn } from "@/lib/actions/auth.action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "@/components/ui/logo";

export default function SignInForm({ returnTo, configured }: { returnTo: string; configured: boolean }) {
  const [state, action, pending] = useActionState(signIn, { error: "" });
  return (
    <form action={action} className="background-light900_dark200 w-full max-w-sm space-y-5 rounded-lg p-6">
      <Link href="/" aria-label="Arvin Paul home" className="flex justify-center"><Logo /></Link>
      <h1 className="text-center text-2xl font-bold">Admin sign-in</h1>
      {!configured && <p role="status">Run <code>node scripts/setup-admin.cjs</code> in the project terminal to set up your admin account.</p>}
      {state.error && <p role="alert" className="text-red-500">{state.error}</p>}
      <input type="hidden" name="returnTo" value={returnTo} />
      <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" autoComplete="username" className="bg-white text-dark-100" required maxLength={254} /></div>
      <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" autoComplete="current-password" className="bg-white text-dark-100" required maxLength={1024} /></div>
      <Button type="submit" disabled={pending || !configured} className="w-full bg-primary-500 text-white">{pending ? "Signing in…" : "Sign in"}</Button>
    </form>
  );
}
