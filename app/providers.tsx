"use client";
import { SessionProvider } from "next-auth/react";
import { AccountProvider } from "@/components/AccountContext";
import CommunityChat from "@/components/CommunityChat";
export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider><AccountProvider>{children}<CommunityChat /></AccountProvider></SessionProvider>;
}
