import Image from "next/image";
import Link from "next/link";
import { RewardsPanel } from "@/components/RewardsPanel";

export function RewardsPageShell({ completed = false }: { completed?: boolean }) {
  return (
    <main className="zentux-site relative min-h-screen overflow-hidden bg-[#08080D] text-white">
      <div aria-hidden="true" className="zentux-background pointer-events-none fixed inset-0 z-0" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-7">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl transition hover:border-[#a855f7]/60"
        >
          <Image
            src="/logo-web.png"
            alt="Zentux logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
            priority
          />
          <div>
            <div className="text-sm font-black leading-none">Zentux</div>
            <div className="mt-1 text-[11px] font-bold text-[#b989ff]">Gaming Tools</div>
          </div>
        </Link>
        <Link
          href="/"
          className="rounded-full border border-[#a855f7]/45 bg-black/35 px-5 py-2.5 text-sm font-black text-[#d6b4ff] backdrop-blur-xl transition hover:bg-[#a855f7] hover:text-white"
        >
          Home
        </Link>
      </header>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-7 lg:pt-16">
        <RewardsPanel completed={completed} standalone />
      </div>
    </main>
  );
}
