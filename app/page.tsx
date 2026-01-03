import Image from "next/image";

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
            <a
              href="#features"
              className="text-sm text-white/70 hover:text-white transition"
            >
              Características
            </a>

            <a
              href="#faq"
              className="text-sm text-white/70 hover:text-white transition"
            >
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

            <a
              href={downloadUrl}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Descargar
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
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
                ● Windows · Instalador directo
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
                ● Versión {APP_VERSION}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              {APP_NAME}
            </h1>

            <p className="mt-4 text-xl text-white/80">
              Autoclicker gamer. Rendimiento real. Control total.
            </p>

            <p className="mt-6 max-w-xl text-white/60">
              Zentux es una aplicación moderna para Windows, diseñada
              especialmente para gaming, enfocada en máximo rendimiento,
              ligereza extrema y una experiencia limpia y elegante.
            </p>

            <p className="mt-4 max-w-xl text-white/60">
              No es solo un autoclicker: Zentux es una herramienta todo-en-uno
              para jugadores que buscan precisión, velocidad y control sin
              sacrificar FPS.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={downloadUrl}
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Descargar {APP_NAME}
              </a>

              <a
                href="#features"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                Ver características
              </a>

              <a
                href={discordUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                Soporte por Discord
              </a>
            </div>

            <p className="mt-4 text-xs text-white/40">
              Descarga: ZentuxSetup.exe · v{APP_VERSION} · GitHub Releases
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">¿Por qué Zentux?</h3>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Gaming / Performance
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="font-medium">Ultra rápido</div>
                  <div className="text-white/60">Clicking sin lag</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="font-medium">No baja FPS</div>
                  <div className="text-white/60">Ligero y estable</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="font-medium">Precisión</div>
                  <div className="text-white/60">Control total</div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                  <div className="font-medium">Diseño premium</div>
                  <div className="text-white/60">Oscuro elegante</div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Descarga rápida</div>
                  <div className="text-xs text-white/60">v{APP_VERSION}</div>
                </div>

                <p className="mt-1 text-sm text-white/60">
                  Instala Zentux en segundos con el instalador oficial.
                </p>

                <a
                  href={downloadUrl}
                  className="mt-4 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
                >
                  Descargar ZentuxSetup.exe
                </a>

                <a
                  href={discordUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex w-full justify-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10 transition"
                >
                  Soporte / Comunidad (Discord)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES (MODERN) */}
        <section id="features" className="mt-24 scroll-mt-28">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold">Características</h2>
              <p className="mt-3 max-w-2xl text-white/60">
                Un set completo de herramientas pensado para jugadores que
                quieren precisión, velocidad y control sin sacrificar
                rendimiento.
              </p>
            </div>

            <a
              href={downloadUrl}
              className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 transition md:inline-flex"
            >
              Descargar v{APP_VERSION}
            </a>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="⚡ Rendimiento sin compromisos"
              items={[
                "Ultra ligero (mínimos recursos)",
                "Funciona en segundo plano sin bajar FPS",
                "Sin stuttering ni lag",
                "Optimizado para gaming competitivo",
              ]}
            />

            <FeatureCard
              title="🎯 Precisión gamer"
              items={[
                "Autoclick configurable (Hold / Toggle)",
                "Respuesta inmediata a cada acción",
                "Control total en cada sesión",
                "Ideal para juegos repetitivos/competitivos",
              ]}
            />

            <FeatureCard
              title="🖥️ Todo-en-uno"
              items={[
                "Cambio de resolución desde la app",
                "Opciones de optimización de rendimiento",
                "Funciones extra enfocadas en estabilidad",
                "Todo centralizado en un solo lugar",
              ]}
            />
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">✨ Interfaz moderna y premium</h3>
              <p className="mt-2 text-white/70">
                Interfaz oscura, limpia y elegante, con sensación premium y sin
                ruido visual. Todo al alcance, sin configuraciones complicadas.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-lg font-semibold">🔄 Actualizaciones simples</h3>
              <p className="mt-2 text-white/70">
                Instalador directo y actualizaciones rápidas. Siempre en la
                última versión disponible.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Versión actual: v{APP_VERSION}
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  Archivo: ZentuxSetup.exe
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={downloadUrl}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Descargar ahora
            </a>

            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
            >
              Entrar al Discord
            </a>
          </div>
        </section>

        {/* DISCORD */}
        <section id="discord" className="mt-24 scroll-mt-28">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-semibold">Soporte y comunidad</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Entra al Discord oficial de Zentux para soporte, servicio al
              cliente, actualizaciones y contacto directo con el desarrollador.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={discordUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Unirme al Discord
              </a>

              <a
                href={downloadUrl}
                className="inline-flex rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition"
              >
                Descargar Zentux
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24 scroll-mt-28">
          <h2 className="text-3xl font-semibold">FAQ</h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <FaqItem
              q="¿Zentux baja FPS?"
              a="No. Zentux está diseñado para ser ultra ligero y funcionar en segundo plano sin afectar el rendimiento."
            />
            <FaqItem
              q="¿Cómo pido soporte?"
              a="Únete al Discord oficial y tendrás ayuda directa, info y actualizaciones."
            />
            <FaqItem
              q="¿Cómo instalo la app?"
              a="Descarga el instalador ZentuxSetup.exe y ejecútalo. Listo."
            />
            <FaqItem
              q="¿Qué versión es esta?"
              a={`Actualmente la web muestra la versión v${APP_VERSION}.`}
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-24 border-t border-white/10 py-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div>
              © {new Date().getFullYear()} {APP_NAME} · v{APP_VERSION}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={discordUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                Discord
              </a>
              <a href={downloadUrl} className="hover:text-white transition">
                Descargar
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
      <div className="text-lg font-semibold">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-white/70">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/60" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
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
