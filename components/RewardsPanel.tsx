"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RewardsPanelProps = {
  completed?: boolean;
  standalone?: boolean;
  onBackHome?: () => void;
};

type RewardStep = "choose" | "starting" | "waiting" | "success" | "error";

type RewardStatus = {
  success?: boolean;
  sessionId?: string;
  lootLabsUrl?: string;
  status?: "pending" | "completed" | "claimed" | "expired" | "failed";
  rewardHours?: number;
  requiredTasks?: number;
  completedTasks?: number;
  expiresAt?: string;
  licenseExpiresAt?: string | null;
  completedAt?: string | null;
  claimedAt?: string | null;
  licenseKey?: string | null;
  error?: string;
};

const storageKey = "zentux_rewards_session_id";

export function RewardsPanel({
  completed = false,
  standalone = false,
}: RewardsPanelProps) {
  const { status } = useSession();
  const [step, setStep] = useState<RewardStep>(completed ? "waiting" : "choose");
  const [reward, setReward] = useState<RewardStatus | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!completed) return;
    if (status === "loading") return;

    if (status !== "authenticated") {
      void signIn("discord", { callbackUrl: "/rewards/complete" });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const sessionId =
      params.get("reward_session") ||
      params.get("puid") ||
      window.localStorage.getItem(storageKey) ||
      "";

    if (!sessionId) {
      setStep("error");
      setError("No encontramos una sesion de Rewards en este navegador. Vuelve a iniciar desde /rewards.");
      return;
    }

    let stopped = false;
    let attempts = 0;

    async function pollStatus() {
      attempts += 1;
      try {
        const response = await fetch("/api/account/rewards/status", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data: RewardStatus = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error || "No pudimos verificar tu recompensa todavia.");
        }
        if (stopped) return;
        setReward(data);

        if (data.status === "claimed") {
          window.localStorage.removeItem(storageKey);
          setStep("success");
          return;
        }

        if (data.status === "expired" || data.status === "failed") {
          setStep("error");
          setError(
            data.status === "expired"
              ? "Esta sesion de Rewards expiro. Inicia una nueva desde /rewards."
              : "LootLabs confirmo la sesion, pero Zentux no pudo activar el acceso. Contacta soporte."
          );
          return;
        }

        if (attempts < 60) {
          window.setTimeout(pollStatus, 3000);
        }
      } catch (pollError) {
        if (stopped) return;
        setError(pollError instanceof Error ? pollError.message : "No pudimos verificar tu recompensa todavia.");
        if (attempts < 60) {
          window.setTimeout(pollStatus, 3000);
        } else {
          setStep("error");
        }
      }
    }

    setStep("waiting");
    void pollStatus();

    return () => {
      stopped = true;
    };
  }, [completed, status]);

  const startReward = async () => {
    if (status === "loading" || step === "starting") return;
    if (status !== "authenticated") {
      await signIn("discord", { callbackUrl: "/rewards" });
      return;
    }

    setStep("starting");
    setError("");

    try {
      const response = await fetch("/api/account/rewards/start", {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const data: RewardStatus = await response.json().catch(() => ({}));
      if (!response.ok || !data.lootLabsUrl || !data.sessionId) {
        throw new Error(data.error || "No pudimos iniciar Rewards.");
      }

      window.localStorage.setItem(storageKey, data.sessionId);
      window.location.assign(data.lootLabsUrl);
    } catch (startError) {
      setStep("error");
      const message = startError instanceof Error ? startError.message : "No pudimos iniciar Rewards.";
      setError(message.includes("Rewards")
        ? message
        : "Ya tienes una licencia activa de Rewards. Espera a que expire antes de reclamar otra.");
    }
  };

  const renderRightCard = () => {
    if (step === "choose" || step === "starting") {
      return (
        <ProviderCard
          disabled={status === "loading" || step === "starting"}
          loading={step === "starting"}
          signedIn={status === "authenticated"}
          onContinue={startReward}
        />
      );
    }

    if (step === "success") return <SuccessCard reward={reward} />;
    if (step === "error") return <ErrorCard message={error} />;
    return <WaitingCard error={error} reward={reward} />;
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
          {renderRightCard()}
        </div>
      </div>

      {!standalone && (
        <p className="mx-auto mt-7 max-w-3xl text-center text-xs font-semibold leading-6 text-[#8f84a0]">
          Las recompensas gratuitas usan proveedores externos. Nunca compartas tu key y completa las tareas unicamente
          desde el enlace oficial abierto por esta pagina.
        </p>
      )}
    </section>
  );
}

function ProviderCard({
  disabled,
  loading,
  signedIn,
  onContinue,
}: {
  disabled: boolean;
  loading: boolean;
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
            Completa tareas patrocinadas en LootLabs. Zentux activara tu acceso solo cuando LootLabs confirme la sesion.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <RewardMetric label="Tareas aproximadas" value="3 tasks" />
        <RewardMetric label="Tiempo estimado" value="2-5 min" />
        <RewardMetric label="Recompensa" value="24h Zentux" />
        <RewardMetric label="Verificacion" value="Postback real" />
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_36px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Creando sesion..." : signedIn ? "Abrir LootLabs" : "Inicia sesion para continuar"}
      </button>
    </div>
  );
}

function WaitingCard({ error, reward }: { error: string; reward: RewardStatus | null }) {
  const completedTasks = Math.min(reward?.completedTasks || 0, reward?.requiredTasks || 3);
  const requiredTasks = reward?.requiredTasks || 3;
  const lootLabsUrl = reward?.lootLabsUrl || "";

  return (
    <div className="rounded-[1.8rem] border border-[#a855f7]/35 bg-[#090313]/90 p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#a855f7]/35 bg-[#7c3aed]/20 text-4xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        ⏳
      </div>
      <h2 className="mt-5 text-3xl font-black text-white">
        Verificando LootLabs
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#c8bed3]">
        Esperando la confirmacion real del proveedor. Zentux necesita {requiredTasks} tareas verificadas para activar el acceso.
      </p>
      <div className="mt-5 rounded-2xl border border-[#a855f7]/25 bg-white/[0.04] p-4">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[#c8bed3]">
          <span>Progreso</span>
          <span>{completedTasks}/{requiredTasks}</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#d946ef] to-[#22d3ee] transition-all"
            style={{ width: `${Math.max(5, (completedTasks / requiredTasks) * 100)}%` }}
          />
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm font-bold leading-7 text-[#d8d1e2]">
        <div>✓ No se activa acceso solo por abrir esta pagina.</div>
        <div>✓ El acceso se entrega al completar {requiredTasks} tareas verificadas.</div>
        <div>✓ Cada sesion usa un codigo unico para evitar duplicados.</div>
      </div>
      {completedTasks < requiredTasks && lootLabsUrl && (
        <a
          href={lootLabsUrl}
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_36px_rgba(168,85,247,0.3)] transition hover:scale-[1.01]"
        >
          Continuar tareas en LootLabs
        </a>
      )}
      {completedTasks < requiredTasks && (
        <p className="mt-3 text-xs font-semibold leading-5 text-[#9f94ad]">
          Completa una tarea, vuelve aqui, y presiona el boton para continuar hasta llegar a {requiredTasks}/{requiredTasks}.
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm font-bold text-[#fbbf24]">{error}</p>
      )}
    </div>
  );
}

function SuccessCard({ reward }: { reward: RewardStatus | null }) {
  const expiresAt = reward?.licenseExpiresAt || reward?.expiresAt
    ? new Intl.DateTimeFormat("es", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date((reward?.licenseExpiresAt || reward?.expiresAt) as string))
    : "24 horas desde la activacion";

  return (
    <div className="rounded-[1.8rem] border border-[#22c55e]/35 bg-[#03160f]/90 p-6 text-center shadow-[0_0_50px_rgba(34,197,94,0.12)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#22c55e]/35 bg-[#16a34a]/20 text-4xl">
        ✅
      </div>
      <h2 className="mt-5 text-3xl font-black text-white">Acceso activado</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#c8bed3]">
        Recibiste 24 horas de acceso a Zentux desde Zentux Rewards.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <RewardMetric label="Tiempo restante" value="24h" />
        <RewardMetric label="Expira" value={expiresAt} />
      </div>
      <div className="mt-4 rounded-2xl border border-[#22c55e]/20 bg-[#22c55e]/10 p-4 text-left">
        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#86efac]">Key vinculada</div>
        <div className="mt-2 break-all font-mono text-sm font-black text-white">
          {reward?.licenseKey || "ZENTUX-REWARD-********"}
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a
          href="/?tab=products"
          className="rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#22d3ee] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-black"
        >
          Abrir Zentux
        </a>
        <a
          href="/"
          className="rounded-2xl border border-white/15 px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

function ErrorCard({ message }: { message: string }) {
  return (
    <div className="rounded-[1.8rem] border border-[#ef4444]/35 bg-[#19060a]/90 p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#ef4444]/35 bg-[#ef4444]/15 text-4xl">
        ⚠️
      </div>
      <h2 className="mt-5 text-3xl font-black text-white">No se pudo activar</h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#f3c4c4]">
        {message || "No pudimos verificar esta recompensa. Intenta crear una nueva sesion."}
      </p>
      <a
        href="/rewards"
        className="mt-6 inline-flex rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white"
      >
        Volver a Rewards
      </a>
    </div>
  );
}

function RewardMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a69bb3]">
        {label}
      </div>
      <div className="mt-2 text-lg font-black text-white">{value}</div>
    </div>
  );
}
