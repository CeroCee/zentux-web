import Image from "next/image";
import Link from "next/link";
import { RewardsPanel } from "@/components/RewardsPanel";

export function RewardsPageShell({ completed = false }: { completed?: boolean }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05010b] text-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#05010b]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(168,85,247,0.25),transparent_32%),radial-gradient(circle_at_18%_45%,rgba(32,232,242,0.09),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.25),rgba(168,85,247,0.12),rgba(0,0,0,0.34))]" />
        <div className="zentux-snow-layer zentux-snow-slow absolute -inset-y-full inset-x-0 opacity-45" />
        <div className="zentux-snow-layer zentux-snow-medium absolute -inset-y-full inset-x-0 opacity-35" />
        <div className="zentux-snow-layer zentux-snow-fast absolute -inset-y-full inset-x-0 opacity-25" />
      </div>

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
