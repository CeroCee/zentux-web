"use client";

import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useAccount } from "./AccountContext";

export function ProfileMenu({ onOpenProfile }: { onOpenProfile: () => void }) {
  const { data: session, status } = useSession();
  const { profile, loading } = useAccount();
  const [open, setOpen] = useState(false);
  const active = Boolean(profile?.license?.active);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 items-center gap-2 rounded-full border border-[#a855f7]/55 bg-black/45 px-3 text-sm font-black text-[#d8b4fe] shadow-[0_0_28px_rgba(168,85,247,.16)] backdrop-blur-xl"
      >
        {session?.user?.image ? <Image src={session.user.image} alt="Avatar" width={26} height={26} className="rounded-full" /> : <span>◉</span>}
        <span className="max-w-28 truncate">{session?.user?.name || "Perfil"}</span><span>▾</span>
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+14px)] z-[100] w-[330px] rounded-[24px] border border-[#7c3aed]/55 bg-[#080611]/95 p-5 shadow-[0_24px_90px_rgba(0,0,0,.7),0_0_40px_rgba(124,58,237,.22)] backdrop-blur-2xl">
          {status !== "authenticated" ? (
            <div>
              <h3 className="text-xl font-black">Iniciar sesión con Discord</h3>
              <p className="mt-2 text-sm leading-6 text-[#aaa0b8]">Accede a tu cuenta, balances, compras y licencia vinculada.</p>
              <button onClick={() => void signIn("discord")} className="mt-5 w-full rounded-xl bg-[#5865f2] px-4 py-3 font-black text-white">◉ Entrar con Discord</button>
              <div className="mt-4 space-y-2 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm text-[#c6bdcf]">
                <p>✓ Sin contraseñas</p><p>✓ Acceso rápido</p><p>✓ Licencias vinculadas</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                {session.user.image && <Image src={session.user.image} alt="Avatar de Discord" width={54} height={54} className="rounded-full border border-[#c084fc]/50" />}
                <div className="min-w-0"><p className="truncate font-black">{session.user.name}</p><span className="mt-1 inline-flex rounded-full bg-[#4c1d95] px-2.5 py-1 text-[11px] font-black text-[#e9d5ff]">{active ? "★ Premium Member" : "No Member"}</span></div>
              </div>
              <button onClick={() => { onOpenProfile(); setOpen(false); }} className="mt-3 flex w-full items-center justify-between rounded-xl px-3 py-3 text-left hover:bg-white/[.06]"><span>♙ Mi Perfil</span><span>›</span></button>
              <div className="rounded-xl px-3 py-3 text-sm">
                <div className="flex justify-between"><span>Z-Coins ganados</span><strong className="text-[#facc15]">{loading ? "…" : (profile?.account.zcoins || 0).toLocaleString("es-ES")}</strong></div>
                <div className="mt-2 flex justify-between"><span>Zenitx comprados</span><strong className="text-[#c084fc]">{loading ? "…" : (profile?.account.zenitx || 0).toLocaleString("es-ES")}</strong></div>
              </div>
              <button onClick={() => void signOut()} className="mt-3 w-full border-t border-white/10 px-3 pt-4 text-left font-bold text-[#fb7185]">↪ Cerrar sesión</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

