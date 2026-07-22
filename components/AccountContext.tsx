"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

export type AccountProfile = {
  account: {
    discordUserId: string;
    discordUsername: string;
    discordAvatarUrl: string | null;
    memberSince: string;
  };
  license: null | {
    licenseKey: string;
    active: boolean;
    status: string;
    paidUntil: string | null;
    source?: string;
  };
  activity: Array<Record<string, unknown>>;
  purchases: number;
};

type AccountContextValue = {
  profile: AccountProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (status !== "authenticated") {
      setProfile(null);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/account/profile", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo cargar tu perfil.");
      setProfile(data);
    } catch (error) {
      console.error("No se pudo cargar la cuenta Zentux:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(() => ({ profile, loading, refresh }), [profile, loading, refresh]);
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount debe usarse dentro de AccountProvider.");
  return context;
}
