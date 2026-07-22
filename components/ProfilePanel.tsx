"use client";

import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { useAccount } from "./AccountContext";

export function ProfilePanel() {
  const { data: session, status } = useSession();
  const { profile, loading, refresh } = useAccount();
  const [reveal, setReveal] = useState(false);
  const [redeemKey, setRedeemKey] = useState("");
  const [redeemStatus, setRedeemStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [redeemMessage, setRedeemMessage] = useState("");

  if (status !== "authenticated") {
    return (
      <section className="mx-auto max-w-xl py-24 text-center">
        <h1 className="text-4xl font-black">Tu cuenta Zentux</h1>
        <p className="mt-4 text-[#aaa0b8]">Inicia sesión para ver tu licencia vinculada.</p>
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

  async function handleRedeem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const licenseKey = redeemKey.trim().toUpperCase();
    if (!licenseKey) {
      setRedeemStatus("error");
      setRedeemMessage("Escribe una key válida para vincularla a tu Discord.");
      return;
    }

    setRedeemStatus("loading");
    setRedeemMessage("Verificando tu key…");
    try {
      const response = await fetch("/api/account/redeem", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(getRedeemErrorMessage(data.code, data.error));
      }

      setRedeemStatus("success");
      setRedeemMessage("Key vinculada correctamente a tu cuenta de Discord.");
      setRedeemKey("");
      await refresh();
    } catch (error) {
      setRedeemStatus("error");
      setRedeemMessage(error instanceof Error ? error.message : "No se pudo canjear la key.");
    }
  }

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
              label="Miembro desde"
              value={new Date(profile.account.memberSince).toLocaleDateString("es-ES")}
            />
          </div>
          {!license && (
            <form
              onSubmit={handleRedeem}
              className="mt-6 rounded-2xl border border-[#a855f7]/30 bg-[#12071f]/70 p-4"
            >
              <h3 className="text-sm font-black uppercase tracking-[.22em] text-[#c084fc]">
                Canjear key
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa0b8]">
                Si ya tienes una key, escríbela aquí para vincularla automáticamente a tu Discord.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <input
                  value={redeemKey}
                  onChange={(event) => setRedeemKey(event.target.value)}
                  placeholder="ZENTUX-XXXX-XXXX"
                  disabled={redeemStatus === "loading"}
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/45 px-4 py-3 text-sm font-bold uppercase text-white outline-none transition focus:border-[#c084fc]"
                />
                <button
                  type="submit"
                  disabled={redeemStatus === "loading"}
                  className="rounded-xl bg-gradient-to-r from-[#c026d3] to-[#2563eb] px-5 py-3 text-sm font-black text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {redeemStatus === "loading" ? "Verificando…" : "Canjear"}
                </button>
              </div>
              {redeemMessage && (
                <p
                  className={`mt-3 text-sm font-bold ${
                    redeemStatus === "success" ? "text-[#4ade80]" : redeemStatus === "error" ? "text-[#fb7185]" : "text-[#c4b5fd]"
                  }`}
                >
                  {redeemMessage}
                </p>
              )}
            </form>
          )}
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
          </div>
        </div>
      </div>
    </section>
  );
}

function getRedeemErrorMessage(code?: string, fallback?: string) {
  const messages: Record<string, string> = {
    not_found: "Esa key no existe. Revisa que esté escrita correctamente.",
    inactive: "Esa key está inactiva o vencida.",
    already_redeemed: "Esa key ya fue canjeada por otra cuenta de Discord.",
    user_has_license: "Tu Discord ya tiene otra licencia activa vinculada.",
    restricted_license: "Esa key pertenece a otra cuenta de Discord.",
    invalid_request: "Escribe una key válida para continuar.",
    unauthorized: "Inicia sesión con Discord para canjear una key.",
  };
  return messages[String(code || "")] || fallback || "No se pudo canjear la key.";
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
