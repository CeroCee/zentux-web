import Image from "next/image";
import BuyVipButton from "@/components/BuyVipButton";

const APP_NAME = "Zentux";
const APP_VERSION = "1.0.12";

const downloadUrl =
  "https://github.com/CeroCee/zentux-releases1/releases/download/v1.0.12/ZentuxSetup.exe";

const discordUrl = "https://discord.gg/KEWZHDQq6X";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt={`${APP_NAME} logo`}
              width={36}
              height={36}
              className="rounded-full"
              priority
            />
            <div>
              <div className="flex items-center gap-2">
                <div className="font-semibold">{APP_NAME}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-white/70">
                  v{APP_VERSION}
                </span>
              </div>
              <div className="text-xs text-white/60">Autoclicker gamer</div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <a href="#features" className="text-sm text-white/70 hover:text-white transition">
              Características
            </a>
            <a href="#faq" className="text-sm text-white/70 hover:text-white transition">
              FAQ
            </a>
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              Discord
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <main className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* LEFT */}
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
                ● Windows · Instalador directo
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
                ● Versión {APP_VERSION}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">{APP_NAME}</h1>

            <p className="mt-4 text-xl text-white/80">
              Autoclicker gamer. Rendimiento real. Control total.
            </p>

            <p className="mt-6 max-w-xl text-white/60">
              Zentux es una aplicación premium para Windows enfocada en gaming competitivo,
              máximo rendimiento y control total sin sacrificar FPS.
            </p>

            {/* BOTONES */}
            <div className="mt-8 flex flex-wrap gap-4">
              <BuyVipButton />

              <a
                href={downloadUrl}
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                Descargar instalador
              </a>
            </div>

            <p className="mt-4 text-xs text-white/40">
              Zentux es VIP-only · Suscripción mensual · Activación por cuenta
            </p>
          </div>

          {/* RIGHT CARD – VIP */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="relative">
              <h3 className="text-lg font-semibold">Zentux VIP</h3>

              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li>✔ Acceso completo a todas las funciones</li>
                <li>✔ Activación por cuenta (Firebase)</li>
                <li>✔ Sin versión free</li>
                <li>✔ Validación online (anti abuso)</li>
                <li>✔ Soporte directo por Discord</li>
              </ul>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
                <p className="text-sm text-white/70">
                  Suscripción mensual · Cancelable en cualquier momento
                </p>

                <div className="mt-4">
                  <BuyVipButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section id="features" className="mt-24">
          <h2 className="text-3xl font-semibold">Características</h2>
          <p className="mt-3 max-w-2xl text-white/60">
            Zentux está diseñado para jugadores que quieren ventaja, estabilidad
            y control absoluto.
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FaqItem q="¿Zentux es gratis?" a="No. Zentux es VIP-only mediante suscripción mensual." />
            <FaqItem q="¿El VIP es por dispositivo?" a="No. El VIP es por cuenta y se valida online." />
            <FaqItem q="¿Dónde recibo soporte?" a="En el Discord oficial de Zentux." />
            <FaqItem q="¿Puedo cancelar?" a="Sí. Puedes cancelar la suscripción cuando quieras." />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 border-t border-white/10 py-10 text-sm text-white/60">
          © {new Date().getFullYear()} Zentux · v{APP_VERSION}
        </footer>
      </main>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="font-semibold">{q}</div>
      <div className="mt-2 text-sm text-white/70">{a}</div>
    </div>
  );
}
