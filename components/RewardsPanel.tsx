"use client";

import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount } from "@/components/AccountContext";

const lootLabsUrl = "https://lootdest.org/s?uwV5eHU8";
const zentuxOpenUrl = "/";

type ClaimResult = {
  success?: boolean;
  created?: boolean;
  extended?: boolean;
  addedHours?: number;
  provider?: string;
  license?: {
    licenseKey?: string;
    paidUntil?: string | null;
    active?: boolean;
    source?: string;
  };
  error?: string;
  code?: string;
};

type RewardsPanelProps = {
  completed?: boolean;
  standalone?: boolean;
  onBackHome?: () => void;
};

type RewardStep = "choose" | "waiting" | "claiming" | "success" | "error";

function formatDate(value?: string | null) {
  if (!value) return "Pendiente";
  return new Intl.DateTimeFormat("es-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatRemaining(value?: string | null) {
  if (!value) return "24 horas";
  const ms = new Date(value).getTime() - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "Expirado";
  const totalMinutes = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const restHours = hours % 24;
    return `${days}d ${restHours}h`;
  }
  return `${hours}h ${minutes}m`;
}

function maskKey(value?: string) {
  if (!value) return "ZENTUX-REWARD-••••••";
  const parts = value.split("-");
  if (parts.length < 4) return `${value.slice(0, 14)}••••••`;
  return `${parts.slice(0, 3).join("-")}-••••••`;
}

export function RewardsPanel({
  completed = false,
  standalone = false,
  onBackHome,
}: RewardsPanelProps) {
  const { status } = useSession();
  const { refresh } = useAccount();
  const [step, setStep] = useState<RewardStep>(completed ? "claiming" : "choose");
  const [claim, setClaim] = useState<ClaimResult | null>(null);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  const remaining = useMemo(
    () => formatRemaining(claim?.license?.paidUntil),
    [claim?.license?.paidUntil, tick],
  );

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const claimReward = useCallback(async () => {
    if (status === "loading") return;
    if (status !== "authenticated") {
      await signIn("discord", { callbackUrl: "/rewards/complete" });
      return;
    }

    setStep("claiming");
    setError("");
    try {
      const response = await fetch("/api/account/rewards/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "lootlabs" }),
      });
      const data = (await response.json().catch(() => null)) as ClaimResult | null;
      if (!response.ok || !data?.success) {
        throw new Error(data?.error || "No se pudo activar tu recompensa.");
      }
      setClaim(data);
      setStep("success");
      await refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "No se pudo activar tu recompensa.");
      setStep("error");
    }
  }, [refresh, status]);

  useEffect(() => {
    if (!completed) return;
    void claimReward();
  }, [claimReward, completed]);

  const startReward = async () => {
    if (status === "loading") return;
    if (status !== "authenticated") {
      await signIn("discord", { callbackUrl: "/rewards" });
      return;
    }
    window.open(lootLabsUrl, "_blank", "noopener,noreferrer");
    setStep("waiting");
  };

  const goHome = () => {
    if (onBackHome) {
      onBackHome();
      return;
    }
    window.location.href = "/";
  };

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-[#a855f7]/25 bg-black/55 p-7 shadow-[0_0_90px_rgba(168,85,247,0.18)] backdrop-blur-2xl sm:p-10">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#a855f7]/25 blur-3xl" />
          <div className="absolute -bottom-20 left-6 h-44 w-44 rounded-full bg-[#22d3ee]/10 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.34em] text-[#c084fc]">
              Zentux Rewards
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-6xl">
              Gana 24 horas de acceso gratis.
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-8 text-[#c8bed3] sm:text-lg">
              Completa tareas patrocinadas con proveedores verificados y activa acceso temporal a Zentux sin pagar.
              Por ahora el proveedor recomendado es LootLabs.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["01", "Elegir proveedor"],
                ["02", "Completar y verificar"],
                ["03", "Activar acceso"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="text-xs font-black text-[#c084fc]">{number}</div>
                  <div className="mt-2 text-sm font-black text-white">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[2.2rem] border border-white/10 bg-black/45 p-5 shadow-[0_0_80px_rgba(168,85,247,0.14)] backdrop-blur-2xl sm:p-6">
          {step === "choose" && (
            <ProviderCard
              disabled={status === "loading"}
              signedIn={status === "authenticated"}
              onContinue={startReward}
            />
          )}

          {step === "waiting" && (
            <WaitingCard onVerify={() => (window.location.href = "/rewards/complete")} />
          )}

          {step === "claiming" && <ClaimingCard />}

          {step === "success" && (
            <SuccessCard
              expiration={claim?.license?.paidUntil}
              remaining={remaining}
              licenseKey={claim?.license?.licenseKey}
              extended={Boolean(claim?.extended)}
              onHome={goHome}
            />
          )}

          {step === "error" && (
            <ErrorCard
              error={error}
              onRetry={claimReward}
              onChoose={() => setStep("choose")}
            />
          )}
        </div>
      </div>

      {!standalone && (
        <p className="mx-auto mt-7 max-w-3xl text-center text-xs font-semibold leading-6 text-[#8f84a0]">
          Las recompensas gratuitas usan proveedores externos. Nunca compartas tu key y completa las tareas únicamente
          desde el enlace oficial abierto por esta página.
        </p>
      )}
    </section>
  );
}

function ProviderCard({
  disabled,
  signedIn,
  onContinue,
}: {
  disabled: boolean;
  signedIn: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-[1.8rem] border border-[#a855f7]/35 bg-[#090313]/90 p-6">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#d946ef] via-[#8b5cf6] to-[#22d3ee]" />
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[#facc15]/35 bg-[#24143d] shadow-[0_0_30px_rgba(250,204,21,0.12)]">
          <Image src="/lootlabs-logo.svg" alt="LootLabs logo" width={48} height={48} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-white">LootLabs</h2>
            <span className="rounded-full border border-[#a855f7]/45 bg-[#7c3aed]/25 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#e9d5ff]">
              Recommended
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold leading-7 text-[#c8bed3]">
            Completa tareas patrocinadas y vuelve a Zentux para activar 24 horas de acceso gratis.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <RewardMetric label="Tareas aproximadas" value="3 tasks" />
        <RewardMetric label="Tiempo estimado" value="2-5 min" />
        <RewardMetric label="Recompensa" value="24h Zentux" />
        <RewardMetric label="Entrega" value="Automática" />
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_36px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {signedIn ? "Continuar con LootLabs" : "Inicia sesión para continuar"}
      </button>
    </div>
  );
}

function WaitingCard({ onVerify }: { onVerify: () => void }) {
  return (
    <div className="rounded-[1.8rem] border border-[#a855f7]/35 bg-[#090313]/90 p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#a855f7]/35 bg-[#7c3aed]/20 text-4xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        ⏳
      </div>
      <h2 className="mt-5 text-3xl font-black text-white">Verificando tareas...</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#c8bed3]">
        Completa LootLabs en la pestaña que abrimos. Cuando LootLabs te regrese a Zentux, activaremos tu acceso.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm font-bold leading-7 text-[#d8d1e2]">
        <div>✓ No cierres esta página si quieres mantener el flujo visible.</div>
        <div>✓ El acceso dura 24 horas desde la activación.</div>
        <div>✓ Si ya terminaste, puedes verificar manualmente.</div>
      </div>
      <button
        type="button"
        onClick={onVerify}
        className="mt-6 w-full rounded-2xl border border-[#a855f7]/50 bg-[#160821] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-[#7c3aed]/40"
      >
        Ya completé, verificar acceso
      </button>
    </div>
  );
}

function ClaimingCard() {
  return (
    <div className="rounded-[1.8rem] border border-[#a855f7]/35 bg-[#090313]/90 p-6 text-center">
      <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-[#a855f7]/20 border-t-[#d946ef]" />
      <h2 className="mt-6 text-3xl font-black text-white">Activando acceso...</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#c8bed3]">
        Estamos creando tu licencia Reward de 24 horas y vinculándola con tu cuenta de Discord.
      </p>
    </div>
  );
}

function SuccessCard({
  expiration,
  remaining,
  licenseKey,
  extended,
  onHome,
}: {
  expiration?: string | null;
  remaining: string;
  licenseKey?: string;
  extended: boolean;
  onHome: () => void;
}) {
  return (
    <div className="rounded-[1.8rem] border border-emerald-400/35 bg-[#03140c]/80 p-6">
      <div className="rounded-3xl border border-emerald-400/25 bg-emerald-400/10 p-5 text-center shadow-[0_0_50px_rgba(52,211,153,0.16)]">
        <div className="text-5xl">✅</div>
        <h2 className="mt-4 text-3xl font-black text-white">
          {extended ? "Tiempo agregado" : "Acceso activado"}
        </h2>
        <p className="mt-3 text-sm font-semibold leading-7 text-emerald-100/85">
          Recibiste 24 horas de acceso a Zentux desde Zentux Rewards.
        </p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <RewardMetric label="Tiempo restante" value={remaining} success />
        <RewardMetric label="Expira" value={formatDate(expiration)} success />
      </div>
      <div className="mt-3 rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-200/80">
          Key vinculada
        </div>
        <div className="mt-2 break-all font-mono text-sm font-black text-white">
          {maskKey(licenseKey)}
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link
          href={zentuxOpenUrl}
          className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-4 text-center text-sm font-black uppercase tracking-[0.16em] text-black transition hover:scale-[1.01]"
        >
          Abrir Zentux
        </Link>
        <button
          type="button"
          onClick={onHome}
          className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/[0.08]"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

function ErrorCard({
  error,
  onRetry,
  onChoose,
}: {
  error: string;
  onRetry: () => void;
  onChoose: () => void;
}) {
  return (
    <div className="rounded-[1.8rem] border border-red-400/35 bg-[#170409]/85 p-6 text-center">
      <div className="text-5xl">⚠️</div>
      <h2 className="mt-5 text-3xl font-black text-white">No se pudo activar</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-red-100/85">
        {error}
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onRetry}
          className="rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white"
        >
          Reintentar
        </button>
        <button
          type="button"
          onClick={onChoose}
          className="rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white"
        >
          Volver
        </button>
      </div>
    </div>
  );
}

function RewardMetric({
  label,
  value,
  success = false,
}: {
  label: string;
  value: string;
  success?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${success ? "text-emerald-200/80" : "text-[#a69bb3]"}`}>
        {label}
      </div>
      <div className="mt-2 text-lg font-black text-white">{value}</div>
    </div>
  );
}
