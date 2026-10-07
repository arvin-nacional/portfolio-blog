import type { ReactNode } from "react";
import { isAdmin } from "@/lib/auth/session";

export default async function AdminOnly({ children }: { children: ReactNode }) {
  return (await isAdmin()) ? children : null;
}
