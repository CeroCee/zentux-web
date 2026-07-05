"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { chestOutcomes, getChestOutcome, type ChestOutcome, type ChestResult } from "./chestData";

const REEL_LENGTH = 38;
const WINNER_INDEX = 32;

type ChestOpeningReelProps = {
  result: ChestResult;
  current: number;
  total: number;
  onContinue: () => void;
};

type ReelItem = {
  key: string;
  outcome: ChestOutcome;
};

export function ChestOpeningReel({ result, current, total, onContinue }: ChestOpeningReelProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const winnerRef = useRef<HTMLDivElement>(null);
  const targetXRef = useRef(0);
  const [phase, setPhase] = useState<"spinning" | "revealed">("spinning");
  const winner = getChestOutcome(result.prizeId);
  const reelItems = useMemo(() => buildReel(result, winner), [result, winner]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const winnerCard = winnerRef.current;
    if (!viewport || !track || !winnerCard) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reducedMotion ? 500 : 5200;
    let finishTimer: number | undefined;
    let firstFrame = 0;
    let secondFrame = 0;

    track.style.transition = "none";
    track.style.transform = "translate3d(18px, 0, 0)";

    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const targetX = viewport.clientWidth / 2 - (winnerCard.offsetLeft + winnerCard.offsetWidth / 2);
        targetXRef.current = targetX;
        track.style.transition = `transform ${duration}ms cubic-bezier(.08,.68,.12,1)`;
        track.style.transform = `translate3d(${targetX}px, 0, 0)`;
        finishTimer = window.setTimeout(() => setPhase("revealed"), duration + 120);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      if (finishTimer) window.clearTimeout(finishTimer);
    };
  }, [result.id]);

  const skipAnimation = () => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const winnerCard = winnerRef.current;
    if (track && viewport && winnerCard) {
      const targetX = targetXRef.current
        || viewport.clientWidth / 2 - (winnerCard.offsetLeft + winnerCard.offsetWidth / 2);
      track.style.transition = "transform 180ms ease-out";
      track.style.transform = `translate3d(${targetX}px, 0, 0)`;
    }
    window.setTimeout(() => setPhase("revealed"), 190);
  };

  return (
    <div className="zentux-reel-shell" aria-live="polite">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <p className="text-xs font-black uppercase tracking-[.24em] text-[#67e8f9]">Opening chest</p>
          <h2 className="mt-2 text-3xl font-black text-white">Caja {current} de {total}</h2>
        </div>
        {phase === "spinning" && (
          <button
            type="button"
            onClick={skipAnimation}
            className="rounded-full border border-white/10 bg-white/[.04] px-4 py-2 text-xs font-black uppercase tracking-[.12em] text-[#aaa0b7] transition hover:border-[#c084fc]/50 hover:text-white"
          >
            Saltar animación
          </button>
        )}
      </div>

      <div ref={viewportRef} className="zentux-reel-viewport mt-6" role="status" aria-label={`Abriendo caja ${current} de ${total}`}>
        <div className="zentux-reel-center-line" aria-hidden="true" />
        <div ref={trackRef} className="zentux-reel-track">
          {reelItems.map((item, index) => (
            <div
              key={item.key}
              ref={index === WINNER_INDEX ? winnerRef : undefined}
              className={`zentux-reel-card ${phase === "revealed" && index === WINNER_INDEX ? "zentux-reel-card-winner" : ""}`}
              style={{
                borderColor: `${item.outcome.color}70`,
                boxShadow: `inset 0 -3px 0 ${item.outcome.color}, 0 0 24px ${item.outcome.color}18`,
              }}
            >
              <span className="zentux-reel-rarity" style={{ color: item.outcome.color }}>{item.outcome.rarity}</span>
              <div
                className="zentux-reel-key bg-[url('/chest-keys.png')] bg-no-repeat"
                style={{
                  backgroundPosition: item.outcome.position,
                  filter: `drop-shadow(0 0 12px ${item.outcome.color}99)`,
                }}
                aria-hidden="true"
              />
              <strong>{item.outcome.label}</strong>
            </div>
          ))}
        </div>
      </div>

      {phase === "spinning" ? (
        <div className="mt-5 flex items-center justify-center gap-3 text-sm font-bold text-[#9f94ad]">
          <span className="zentux-reel-spinner" aria-hidden="true" />
          La caja está eligiendo tu premio…
        </div>
      ) : (
        <div className="zentux-reel-reveal mt-6 text-center" style={{ borderColor: `${winner.color}70`, boxShadow: `0 0 60px ${winner.color}24` }}>
          <p className="text-xs font-black uppercase tracking-[.24em]" style={{ color: winner.color }}>Tu premio</p>
          <h3 className="mt-2 text-4xl font-black text-white">{result.label}</h3>
          <p className="mt-2 text-lg font-black" style={{ color: winner.color }}>{result.rarity}</p>
          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-[#a99fb6]">
            {result.licenseKey
              ? "¡Ganaste acceso! Tu key aparecerá en el resumen final y también fue enviada por email."
              : "Esta vez salió Try Again. La siguiente caja puede ser la buena."}
          </p>
          <button
            type="button"
            onClick={onContinue}
            className="mt-5 rounded-2xl bg-gradient-to-r from-[#db2777] via-[#a855f7] to-[#6366f1] px-7 py-3.5 text-sm font-black uppercase tracking-[.12em] text-white shadow-[0_0_35px_rgba(168,85,247,.24)] transition hover:scale-[1.02]"
          >
            {current < total ? "Abrir siguiente caja" : "Ver todos mis resultados"}
          </button>
        </div>
      )}
    </div>
  );
}

function buildReel(result: ChestResult, winner: ChestOutcome): ReelItem[] {
  const random = seededRandom(hashString(result.id));
  return Array.from({ length: REEL_LENGTH }, (_, index) => {
    const outcome = index === WINNER_INDEX ? winner : pickVisualOutcome(random());
    return { key: `${result.id}-${index}-${outcome.id}`, outcome };
  });
}

function pickVisualOutcome(value: number): ChestOutcome {
  const roll = Math.floor(value * 10000);
  let cursor = 0;
  for (const outcome of chestOutcomes) {
    cursor += outcome.weight;
    if (roll < cursor) return outcome;
  }
  return chestOutcomes[chestOutcomes.length - 1];
}

function hashString(value: string): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
