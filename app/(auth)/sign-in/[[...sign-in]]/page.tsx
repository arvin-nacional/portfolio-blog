import SignInForm from "@/components/auth/SignInForm";
import { authConfig, safeReturnTo } from "@/lib/auth/session-config";
import { isAdmin } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import type { SearchParamsProps } from "@/types";

export default async function SignInPage({ searchParams }: SearchParamsProps) {
  const query = await searchParams;
  const returnTo = safeReturnTo(query?.returnTo);
  if (await isAdmin()) redirect(returnTo);
  return <SignInForm returnTo={returnTo} configured={!!authConfig()} />;
}
