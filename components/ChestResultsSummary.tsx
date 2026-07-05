"use client";

import { useEffect, useRef, useState } from "react";
import { getChestOutcome, summarizeChestResults, type ChestResult } from "./chestData";

type ChestResultsSummaryProps = {
  results: ChestResult[];
};

export function ChestResultsSummary({ results }: ChestResultsSummaryProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyTimerRef = useRef<number | null>(null);
  const rewardSummary = summarizeChestResults(results);

  useEffect(() => () => {
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
  }, []);

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey(key);
    if (copyTimerRef.current !== null) window.clearTimeout(copyTimerRef.current);
    copyTimerRef.current = window.setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-[#67e8f9]">Purchase complete</p>
          <h2 className="mt-2 text-3xl font-black text-white">Tus cajas están abiertas</h2>
          <p className="mt-2 text-sm font-semibold text-[#9f94ad]">Una sola key con todo el tiempo que ganaste.</p>
        </div>
        <span className="rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/10 px-4 py-2 text-xs font-black text-[#a5f3fc]">
          {results.length} resultado{results.length === 1 ? "" : "s"}
        </span>
      </div>

      {rewardSummary.awardedKeys.length === 1 && (
        <div className="mt-6 rounded-3xl border border-[#22d3ee]/40 bg-[#071a27]/90 p-6 text-center shadow-[0_0_60px_rgba(34,211,238,.12)]">
          <p className="text-xs font-black uppercase tracking-[.24em] text-[#67e8f9]">Tu única key combinada</p>
          <h3 className="mt-2 text-3xl font-black text-white">
            {rewardSummary.lifetime ? "Lifetime" : `${rewardSummary.totalDays} días acumulados`}
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm font-semibold text-[#9f94ad]">
            {rewardSummary.winningLabels.join(" + ")} — todo quedó sumado en esta misma key.
          </p>
          <button
            type="button"
            onClick={() => void copyKey(rewardSummary.awardedKeys[0])}
            className="mx-auto mt-5 block w-full max-w-2xl rounded-2xl border border-[#22d3ee]/30 bg-black/35 px-4 py-4 font-mono text-sm font-black text-[#dffcff] transition hover:border-[#22d3ee]/70"
          >
            {copiedKey === rewardSummary.awardedKeys[0] ? "✓ Key copiada" : rewardSummary.awardedKeys[0]}
          </button>
        </div>
      )}

      {rewardSummary.awardedKeys.length > 1 && (
        <div className="mt-6 rounded-3xl border border-[#f59e0b]/35 bg-[#2b1705]/70 p-6">
          <p className="text-xs font-black uppercase tracking-[.2em] text-[#fbbf24]">Compra anterior</p>
          <p className="mt-2 text-sm font-semibold text-[#d6c4a1]">Esta compra se creó antes del sistema combinado. Conserva sus keys originales:</p>
          <div className="mt-4 grid gap-3">
            {rewardSummary.awardedKeys.map((key) => (
              <button key={key} type="button" onClick={() => void copyKey(key)} className="rounded-xl border border-white/10 bg-black/25 px-3 py-3 font-mono text-xs font-bold text-white">
                {copiedKey === key ? "✓ Key copiada" : key}
              </button>
            ))}
          </div>
        </div>
      )}

      {rewardSummary.awardedKeys.length === 0 && (
        <div className="mt-6 rounded-3xl border border-[#ec4899]/30 bg-[#3b0a2a]/55 p-6 text-center text-sm font-bold text-[#f9a8d4]">
          Esta compra no obtuvo tiempo de acceso. Todas las cajas resultaron Try Again.
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((result) => {
          const outcome = getChestOutcome(result.prizeId);
          return (
            <article key={result.id} className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/35 p-5">
              <div className="absolute inset-x-0 top-0 h-1" style={{ background: outcome.color }} />
              <div className="flex items-center gap-4">
                <div
                  role="img"
                  aria-label={`${result.label} Zentux key prize`}
                  className="h-20 w-20 shrink-0 bg-[url('/chest-keys.png')] bg-no-repeat"
                  style={{
                    backgroundSize: "300% 200%",
                    backgroundPosition: outcome.position,
                    filter: `drop-shadow(0 0 16px ${outcome.color}88)`,
                  }}
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-[.18em]" style={{ color: outcome.color }}>{result.rarity}</p>
                  <h3 className="mt-1 text-2xl font-black text-white">{result.label}</h3>
                </div>
              </div>
              {outcome.days !== 0 ? (
                <p className="mt-5 rounded-xl border border-[#22d3ee]/25 bg-[#22d3ee]/10 px-4 py-3 text-sm font-bold text-[#a5f3fc]">
                  +{result.label} sumado a tu key combinada.
                </p>
              ) : (
                <p className="mt-5 rounded-xl border border-[#ec4899]/25 bg-[#ec4899]/10 px-4 py-3 text-sm font-bold text-[#f9a8d4]">Try again — esta caja no sumó tiempo.</p>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
