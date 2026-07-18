"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const lootLabsUrl = "https://links.lootlabs.gg/s?uvW5eHU8";

type RewardsPanelProps = {
  completed?: boolean;
  standalone?: boolean;
  onBackHome?: () => void;
};

type RewardStep = "choose" | "waiting";

export function RewardsPanel({
  completed = false,
  standalone = false,
}: RewardsPanelProps) {
  const { status } = useSession();
  const [step, setStep] = useState<RewardStep>(completed ? "waiting" : "choose");

  useEffect(() => {
    if (completed) setStep("waiting");
  }, [completed]);

  const startReward = async () => {
    if (status === "loading") return;
    if (status !== "authenticated") {
      await signIn("discord", { callbackUrl: "/rewards" });
      return;
    }
    setStep("waiting");
    window.location.assign(lootLabsUrl);
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
          {step === "choose" ? (
            <ProviderCard
              disabled={status === "loading"}
              signedIn={status === "authenticated"}
              onContinue={startReward}
            />
          ) : (
            <WaitingCard completed={completed} />
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
            Completa tareas patrocinadas en LootLabs. La activación automática está pausada hasta conectar una verificación real del proveedor.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <RewardMetric label="Tareas aproximadas" value="3 tasks" />
        <RewardMetric label="Tiempo estimado" value="2-5 min" />
        <RewardMetric label="Recompensa" value="24h Zentux" />
        <RewardMetric label="Estado" value="Verificación pausada" />
      </div>

      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className="mt-6 w-full rounded-2xl bg-gradient-to-r from-[#d946ef] to-[#6366f1] px-5 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[0_0_36px_rgba(168,85,247,0.35)] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {signedIn ? "Abrir LootLabs" : "Inicia sesión para continuar"}
      </button>
    </div>
  );
}

function WaitingCard({ completed }: { completed?: boolean }) {
  return (
    <div className="rounded-[1.8rem] border border-[#a855f7]/35 bg-[#090313]/90 p-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#a855f7]/35 bg-[#7c3aed]/20 text-4xl shadow-[0_0_40px_rgba(168,85,247,0.2)]">
        ⏳
      </div>
      <h2 className="mt-5 text-3xl font-black text-white">
        {completed ? "Verificación pendiente" : "Completa LootLabs"}
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm font-semibold leading-7 text-[#c8bed3]">
        {completed
          ? "Por seguridad, Zentux no activará acceso solo por abrir esta página. Falta conectar una verificación real de LootLabs."
          : "Completa LootLabs en la pestaña que abrimos. No se entregará acceso hasta que conectemos una verificación real del proveedor."}
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left text-sm font-bold leading-7 text-[#d8d1e2]">
        <div>✓ No se activará acceso sin prueba real del proveedor.</div>
        <div>✓ La página de retorno ya no crea keys automáticamente.</div>
        <div>✓ Cuando LootLabs esté conectado por API/webhook, volverá la activación de 24 horas.</div>
      </div>
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
