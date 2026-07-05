"use client";
import { SessionProvider } from "next-auth/react";
import { AccountProvider } from "@/components/AccountContext";
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider><AccountProvider>{children}</AccountProvider></SessionProvider>;
}
