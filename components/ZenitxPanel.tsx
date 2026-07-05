"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAccount } from "./AccountContext";

const packages = [
  { id: "zenitx-100", amount: 100, price: "$0.05", minimum: 10, icon: "coin", featured: false },
  { id: "zenitx-250", amount: 250, price: "$0.10", minimum: 5, icon: "stack", featured: false },
  { id: "zenitx-500", amount: 500, price: "$0.18", minimum: 3, icon: "stack", featured: false },
  { id: "zenitx-1000", amount: 1000, price: "$0.30", minimum: 2, icon: "bag", featured: false },
  { id: "zenitx-2500", amount: 2500, price: "$0.50", minimum: 1, icon: "chest", featured: false },
  { id: "zenitx-5000", amount: 5000, price: "$0.85", minimum: 1, icon: "chest", featured: true }
] as const;

export function ZenitxPanel({ sessionId, cancelled }: { sessionId: string | null; cancelled: boolean }) {
  const { status } = useSession();
  const { profile, refresh } = useAccount();
  const [buying, setBuying] = useState<string | null>(null);
  const [message, setMessage] = useState(cancelled ? "El pago fue cancelado." : "");

  useEffect(() => {
    if (!sessionId || status !== "authenticated") return;
    let active = true;
    const verify = async () => {
      const response = await fetch("/api/account/zenitx/result", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId })
      });
      const data = await response.json();
      if (!active) return;
      if (response.ok && data.status === "fulfilled") {
        setMessage("Tus Zenitx se agregaron correctamente.");
        await refresh();
      } else if (response.status === 202) {
        window.setTimeout(verify, 1800);
      } else setMessage(data.error || "No pudimos verificar la compra.");
    };
    void verify();
    return () => { active = false; };
  }, [sessionId, status, refresh]);

  const buy = async (packageId: string) => {
    if (status !== "authenticated") {
      await signIn("discord");
      return;
    }
    setBuying(packageId);
    setMessage("");
    const response = await fetch("/api/account/zenitx/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ packageId })
    });
    const data = await response.json();
    if (!response.ok || !data.checkoutUrl) {
      setMessage(data.error || "No se pudo iniciar el pago.");
      setBuying(null);
      return;
    }
    window.location.assign(data.checkoutUrl);
  };

  return (
    <section className="py-8">
      <div className="overflow-hidden rounded-[34px] border border-[#a855f7]/65 bg-[linear-gradient(145deg,#070817,#03030b)] p-6 shadow-[0_0_80px_rgba(168,85,247,.18)] sm:p-9">
        <div className="flex flex-wrap items-center justify-between gap-5"><div className="flex items-center gap-5"><ZenitxIcon /><div><h1 className="text-4xl font-black sm:text-5xl">BUY <span className="bg-gradient-to-r from-[#a855f7] to-[#e879f9] bg-clip-text text-transparent">ZENITX</span></h1><p className="mt-2 text-[#b9adc8]">Elige un paquete y recíbelos al instante.</p></div></div><div className="rounded-full border border-[#a855f7]/50 bg-[#160821] px-5 py-3 font-black text-[#d8b4fe]">Balance: {(profile?.account.zenitx || 0).toLocaleString("es-ES")} Zenitx</div></div>
        {message && <div className="mt-6 rounded-2xl border border-[#c084fc]/30 bg-[#2e1065]/35 px-5 py-4 text-sm font-bold text-[#e9d5ff]">{message}</div>}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {packages.map((pack) => (
            <article key={pack.id} className={`relative flex min-h-[430px] flex-col rounded-[25px] border bg-[#070818] p-5 text-center ${pack.featured ? "border-[#c084fc] shadow-[0_0_40px_rgba(168,85,247,.2)]" : "border-[#7c3aed]/45"}`}>
              {pack.featured && <span className="absolute -top-9 right-1 rounded-t-xl bg-[#6b21a8] px-4 py-2 text-xs font-black">★ BEST VALUE</span>}
              <h2 className="text-3xl font-black text-[#c084fc]">{pack.amount.toLocaleString("en-US")}</h2><p className="mt-1 font-bold text-[#b7abc5]">ZENITX</p>
              <div className="flex flex-1 items-center justify-center"><div className={`zenitx-pack-art zenitx-${pack.icon}`}><span>Z</span></div></div>
              <div className="border-t border-white/10 pt-4"><p className="text-2xl font-black text-[#45e05f]">{pack.price}</p>{pack.minimum > 1 && <p className="mt-1 text-[10px] leading-4 text-[#9f94ad]">Mínimo {pack.minimum} paquetes por el límite de Stripe</p>}<button disabled={buying !== null} onClick={() => void buy(pack.id)} className="mt-4 w-full rounded-xl bg-gradient-to-b from-[#6d28d9] to-[#4c1d95] px-4 py-3 font-black shadow-[inset_0_1px_0_rgba(255,255,255,.2)] disabled:opacity-50">{buying === pack.id ? "Conectando…" : status === "authenticated" ? "Comprar" : "Entrar para comprar"}</button></div>
            </article>
          ))}
        </div>
        <div className="mt-7 grid gap-4 border-t border-white/10 pt-6 text-center text-sm text-[#b7abc5] md:grid-cols-3"><p>🛡️ <strong className="text-white">Pago seguro</strong><br />Protegido por Stripe</p><p>⚡ <strong className="text-white">Entrega instantánea</strong><br />Directo a tu cuenta</p><p>🏷️ <strong className="text-white">Moneda separada</strong><br />No abre cajas aleatorias</p></div>
      </div>
    </section>
  );
}

function ZenitxIcon() { return <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-[#7e22ce] bg-[radial-gradient(circle,#a855f7,#3b0764_68%,#160821)] text-5xl font-black shadow-[0_0_30px_rgba(168,85,247,.55)]">Z</div>; }
