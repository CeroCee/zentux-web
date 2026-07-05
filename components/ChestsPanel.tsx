"use client";

import { useEffect, useState } from "react";
import { ChestOpeningReel } from "./ChestOpeningReel";
import { chestOutcomes, getChestOutcome, type ChestResult } from "./chestData";

const licenseApiUrl = (
  process.env.NEXT_PUBLIC_LICENSE_API_URL ??
  "https://zentuxlicenseserver2.onrender.com"
).replace(/\/+$/, "");

const chestPackages = [
  { id: "chest-1", count: 1, price: "$3.99", label: "1 Zentux Chest", featured: false },
  { id: "chest-3", count: 3, price: "$9.99", label: "3 Zentux Chests", featured: true },
  { id: "chest-5", count: 5, price: "$14.99", label: "5 Zentux Chests", featured: false },
] as const;

type OrderResult = {
  status: string;
  chestCount?: number;
  results?: ChestResult[];
};

type ChestsPanelProps = {
  sessionId: string | null;
  cancelled: boolean;
};

export function ChestsPanel({ sessionId, cancelled }: ChestsPanelProps) {
  const [buyingPackage, setBuyingPackage] = useState<string | null>(null);
  const [openState, setOpenState] = useState<"idle" | "opening" | "ready" | "error">(
    sessionId ? "opening" : "idle",
  );
  const [results, setResults] = useState<ChestResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openingIndex, setOpeningIndex] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const loadResult = async () => {
      try {
        const response = await fetch(
          `${licenseApiUrl}/api/chests/result?session_id=${encodeURIComponent(sessionId)}`,
          { signal: controller.signal, cache: "no-store" },
        );
        const data = (await response.json()) as OrderResult & { error?: string };
        if (response.ok && data.status === "fulfilled" && data.results) {
          setResults(data.results);
          setOpeningIndex(0);
          setAnimationComplete(data.results.length === 0);
          setOpenState("ready");
          return;
        }
        if (response.status === 202 && attempts < 30) {
          attempts += 1;
          timeout = setTimeout(loadResult, 2000);
          return;
        }
        throw new Error(data.error || "No pudimos recuperar el resultado de tus cajas.");
      } catch (requestError) {
        if (controller.signal.aborted) return;
        setError(requestError instanceof Error ? requestError.message : "No se pudo abrir la caja.");
        setOpenState("error");
      }
    };

    void loadResult();
    return () => {
      controller.abort();
      if (timeout) clearTimeout(timeout);
    };
  }, [sessionId]);

  const startCheckout = async (packageId: string) => {
    setBuyingPackage(packageId);
    setError(null);
    try {
      const response = await fetch(`${licenseApiUrl}/api/chests/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId }),
      });
      const data = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !data.checkoutUrl) {
        throw new Error(data.error || "No se pudo iniciar el pago.");
      }
      window.location.assign(data.checkoutUrl);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : "No se pudo iniciar el pago.");
      setBuyingPackage(null);
    }
  };

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  };

  const continueOpening = () => {
    if (openingIndex < results.length - 1) {
      setOpeningIndex((current) => current + 1);
      return;
    }
    setAnimationComplete(true);
  };

  return (
    <section className="relative py-10">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-[#a855f7]/20 blur-[120px]" />

      <div className="relative overflow-hidden rounded-[34px] border border-[#a855f7]/30 bg-[linear-gradient(145deg,rgba(20,8,38,.96),rgba(4,3,15,.94))] px-6 py-10 shadow-[0_0_100px_rgba(168,85,247,.16)] sm:px-10 lg:px-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c084fc]/35 bg-[#a855f7]/10 px-4 py-2 text-xs font-black uppercase tracking-[.2em] text-[#d8b4fe]">
              ✦ Server-side rewards
            </div>
            <h1 className="mt-5 text-5xl font-black leading-[.95] text-white sm:text-7xl">
              Zentux <span className="bg-gradient-to-r from-[#f472b6] via-[#c084fc] to-[#22d3ee] bg-clip-text text-transparent">Chests.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-[#bbb2c8] sm:text-lg">
              Abre cajas y gana acceso desde 15 días hasta Lifetime. El resultado se calcula en el servidor después de confirmar el pago y las keys se entregan aquí y por email.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-black uppercase tracking-[.14em] text-[#a69bb3]">
              <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2">100% transparente</span>
              <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2">Entrega instantánea</span>
              <span className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2">Pago seguro Stripe</span>
            </div>
          </div>

          <div className={`zentux-chest-stage ${openState === "opening" ? "zentux-chest-opening" : ""}`} aria-live="polite">
            <div className="zentux-chest-question">?</div>
            <div className="zentux-chest-lid"><span /></div>
            <div className="zentux-chest-body"><span className="zentux-chest-lock">Z</span></div>
            <div className="zentux-chest-floor" />
            <p className="mt-6 text-center text-sm font-black uppercase tracking-[.22em] text-[#d8b4fe]">
              {openState === "opening" ? "Abriendo tus cajas…" : "What will you unlock?"}
            </p>
          </div>
        </div>
      </div>

      {(cancelled || error) && (
        <div className="mt-6 rounded-2xl border border-[#f472b6]/35 bg-[#3b0a2a]/60 px-5 py-4 text-sm font-bold text-[#f9a8d4]">
          {error || "El pago fue cancelado. No se realizó ningún cargo."}
        </div>
      )}

      {openState === "ready" && (
        <div className="zentux-results-in mt-8 rounded-[30px] border border-[#22d3ee]/35 bg-[#061522]/85 p-6 shadow-[0_0_80px_rgba(34,211,238,.14)] sm:p-8">
          {!animationComplete && results[openingIndex] ? (
            <ChestOpeningReel
              key={results[openingIndex].id}
              result={results[openingIndex]}
              current={openingIndex + 1}
              total={results.length}
              onContinue={continueOpening}
            />
          ) : (
          <>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[.24em] text-[#67e8f9]">Purchase complete</p>
              <h2 className="mt-2 text-3xl font-black text-white">Tus cajas están abiertas</h2>
            </div>
            <span className="rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-4 py-2 text-xs font-black text-[#a5f3fc]">
              {results.length} resultado{results.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((result) => {
              const outcome = getChestOutcome(result.prizeId);
              return (
                <article key={result.id} className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-5">
                  <div className="absolute inset-x-0 top-0 h-1" style={{ background: outcome.color }} />
                  <div className="flex items-center gap-4">
                    <KeySprite position={outcome.position} color={outcome.color} compact />
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: outcome.color }}>{result.rarity}</p>
                      <h3 className="mt-1 text-2xl font-black text-white">{result.label}</h3>
                    </div>
                  </div>
                  {result.licenseKey ? (
                    <button
                      type="button"
                      onClick={() => void copyKey(result.licenseKey!)}
                      className="mt-5 w-full rounded-xl border border-white/10 bg-white/[.05] px-3 py-3 font-mono text-xs font-bold text-[#dffcff] transition hover:border-[#22d3ee]/60"
                    >
                      {copiedKey === result.licenseKey ? "✓ Key copiada" : result.licenseKey}
                    </button>
                  ) : (
                    <p className="mt-5 rounded-xl border border-[#ec4899]/25 bg-[#ec4899]/10 px-4 py-3 text-sm font-bold text-[#f9a8d4]">Try again — esta caja no contiene una key.</p>
                  )}
                </article>
              );
            })}
          </div>
          </>
          )}
        </div>
      )}

      <div className="mt-12">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[.28em] text-[#b989ff]">Choose your pack</p>
          <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">Compra tus Zentux Chests</h2>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {chestPackages.map((pack) => (
            <article
              key={pack.id}
              className={`relative rounded-[28px] border p-6 transition hover:-translate-y-1 ${pack.featured ? "border-[#c084fc]/70 bg-[#1a0a31]/90 shadow-[0_0_65px_rgba(168,85,247,.2)]" : "border-white/10 bg-black/40"}`}
            >
              {pack.featured && <span className="absolute right-5 top-5 rounded-full bg-[#a855f7] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">Best value</span>}
              <div className="text-4xl">🎁</div>
              <h3 className="mt-5 text-2xl font-black text-white">{pack.label}</h3>
              <p className="mt-2 text-sm font-semibold text-[#9f94ad]">{pack.count} oportunidad{pack.count === 1 ? "" : "es"} independiente{pack.count === 1 ? "" : "s"}</p>
              <div className="mt-7 text-4xl font-black text-white">{pack.price}<span className="ml-2 text-sm text-[#8f84a0]">USD</span></div>
              <button
                type="button"
                disabled={buyingPackage !== null}
                onClick={() => void startCheckout(pack.id)}
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#db2777] via-[#a855f7] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[.12em] text-white shadow-[0_0_35px_rgba(168,85,247,.24)] transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60"
              >
                {buyingPackage === pack.id ? "Conectando con Stripe…" : `Comprar ${pack.count === 1 ? "Chest" : "Chests"}`}
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.24em] text-[#ec4899]">🔑 Possible outcomes</p>
            <h2 className="mt-2 text-4xl font-black text-white">Cada premio. Cada probabilidad.</h2>
          </div>
          <p className="max-w-xl text-sm font-semibold leading-6 text-[#9f94ad]">Cada caja realiza una tirada independiente. Las probabilidades suman exactamente 100%.</p>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {chestOutcomes.map((outcome) => (
            <article key={outcome.id} className="group relative overflow-hidden rounded-[26px] border border-white/10 bg-[#0c1026]/80 p-4 text-center transition hover:-translate-y-1" style={{ boxShadow: `inset 0 -3px 0 ${outcome.color}, 0 0 35px ${outcome.color}18` }}>
              <span className="absolute right-3 top-3 rounded-lg px-2.5 py-1 text-xs font-black text-white" style={{ background: outcome.color }}>{outcome.probability}</span>
              <KeySprite position={outcome.position} color={outcome.color} />
              <h3 className="mt-2 text-xl font-black text-white">{outcome.label}</h3>
              <p className="mt-1 text-sm font-black" style={{ color: outcome.color }}>{outcome.rarity}</p>
            </article>
          ))}
        </div>
      </div>

      <p className="mt-8 text-center text-xs font-semibold leading-6 text-[#776d84]">
        Al comprar aceptas las condiciones de Zentux. Los resultados son aleatorios y definitivos. Nunca compartas tus keys.
      </p>
    </section>
  );
}

function KeySprite({ position, color, compact = false }: { position: string; color: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Zentux license key prize"
      className={`${compact ? "h-20 w-20 shrink-0" : "mx-auto mt-8 h-36 w-full"} bg-[url('/chest-keys.png')] bg-no-repeat transition duration-300 group-hover:scale-105`}
      style={{
        backgroundSize: "300% 200%",
        backgroundPosition: position,
        filter: `drop-shadow(0 0 16px ${color}88)`,
      }}
    />
  );
}
