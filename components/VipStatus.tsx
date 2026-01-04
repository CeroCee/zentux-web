"use client";

import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import BuyVipButton from "./BuyVipButton";

export default function VipStatus() {
  const [loading, setLoading] = useState(true);
  const [isVip, setIsVip] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setUser(null);
        setIsVip(false);
        setLoading(false);
        return;
      }

      setUser(u);

      const vipRef = ref(db, `users/${u.uid}/vip`);
      onValue(vipRef, (snap) => {
        setIsVip(!!snap.val());
        setLoading(false);
      });
    });

    return () => unsub();
  }, []);

  if (loading) {
    return (
      <div className="rounded-full bg-white/10 px-6 py-3 text-sm">
        Verificando estado VIP…
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70">
        Inicia sesión para comprar Zentux VIP
      </div>
    );
  }

  if (isVip) {
    return (
      <div className="rounded-full bg-green-500/20 px-6 py-3 text-sm font-semibold text-green-400">
        ✅ VIP ACTIVO
      </div>
    );
  }

  return <BuyVipButton />;
}
