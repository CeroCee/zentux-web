"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useAccount } from "./AccountContext";

export function ProfilePanel() {
  const { data: session, status } = useSession();
  const { profile, loading } = useAccount();
  const [reveal, setReveal] = useState(false);

  if (status !== "authenticated") {
    return (
      <section className="mx-auto max-w-xl py-24 text-center">
        <h1 className="text-4xl font-black">Tu cuenta Zentux</h1>
        <p className="mt-4 text-[#aaa0b8]">Inicia sesión para ver tu licencia y balance.</p>
        <button
          onClick={() => void signIn("discord")}
          className="mt-7 rounded-2xl bg-[#5865f2] px-8 py-4 font-black"
        >
          Entrar con Discord
        </button>
      </section>
    );
  }

  if (loading || !profile) {
    return <section className="py-24 text-center text-[#c4b5fd]">Cargando tu perfil…</section>;
  }

  const license = profile.license?.active ? profile.license : null;
  const memberLabel = license ? "★ Premium Member" : "No Member";
  const expires = license?.paidUntil
    ? new Date(license.paidUntil).toLocaleString("es-ES")
    : "Sin licencia activa";
  const key = license?.licenseKey || "No tienes una licencia activa";
  const masked = license?.licenseKey ? "•".repeat(Math.min(22, license.licenseKey.length)) : key;

  return (
    <section className="overflow-hidden rounded-[32px] border border-[#7c3aed]/35 bg-[#07050d]/90 shadow-[0_0_100px_rgba(124,58,237,.15)]">
      <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(126,34,206,.48),transparent_45%)]" />
        <div className="relative flex flex-wrap items-center gap-6">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full border-2 border-[#c084fc] shadow-[0_0_35px_rgba(192,132,252,.45)]"
            />
          )}
          <div>
            <h1 className="text-4xl font-black">{session.user.name}</h1>
            <span className="mt-3 inline-flex rounded-full bg-[#4c1d95] px-4 py-2 text-sm font-black text-[#e9d5ff]">
              {memberLabel}
            </span>
            <p className="mt-4 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm">
              ◉ Discord vinculado · {profile.account.discordUserId}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-5 sm:p-7 lg:grid-cols-2">
        <div className="rounded-[24px] border border-white/10 bg-white/[.025] p-6">
          <h2 className="text-xl font-black">Información de la cuenta</h2>
          <div className="mt-5 divide-y divide-white/10 text-sm">
            <Row label="Usuario" value={profile.account.discordUsername} />
            <Row
              label="Key"
              value={reveal ? key : masked}
              action={
                license?.licenseKey ? (
                  <button onClick={() => setReveal(!reveal)} className="text-[#c084fc]">
                    {reveal ? "Ocultar" : "Ver"}
                  </button>
                ) : null
              }
            />
            <Row label="Vencimiento" value={expires} />
            <Row
              label="Z-Coins ganados"
              value={`${(profile.account.zcoins + profile.account.bank).toLocaleString("es-ES")} Z-Coins`}
            />
            <Row
              label="Miembro desde"
              value={new Date(profile.account.memberSince).toLocaleDateString("es-ES")}
            />
          </div>
        </div>

        <div className="rounded-[24px] border border-white/10 bg-white/[.025] p-6">
          <h2 className="text-xl font-black">Estado de cuenta</h2>
          <div className="mt-5 rounded-2xl border border-[#22c55e]/20 bg-[#052e16]/25 p-5">
            <p className="font-black text-[#4ade80]">● Online</p>
            <p className="mt-2 text-sm text-[#aaa0b8]">
              Tu cuenta de Discord está conectada y protegida.
            </p>
          </div>
          <h3 className="mt-6 font-black">Resumen de actividad</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat value={license ? "1" : "0"} label="Licencia activa" />
            <Stat value={String(profile.purchases)} label="Compras totales" />
            <Stat value={profile.account.zcoins.toLocaleString("es-ES")} label="Z-Coins" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  action,
}: {
  label: string;
  value: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <span className="text-[#9f94ad]">{label}</span>
      <span className="flex min-w-0 items-center gap-3 text-right font-bold">
        <span className="truncate">{value}</span>
        {action}
      </span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-center">
      <strong className="text-2xl text-[#c084fc]">{value}</strong>
      <p className="mt-1 text-xs text-[#9f94ad]">{label}</p>
    </div>
  );
}
