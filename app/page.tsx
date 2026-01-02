import Image from "next/image";

const downloadUrl =
  "https://github.com/CeroCee/zentux-releases1/releases/download/v1.0.10/ZentuxSetup.exe";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Zentux logo"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <div className="font-semibold">Zentux</div>
              <div className="text-xs text-white/60">Autoclicker gamer</div>
            </div>
          </div>

          <nav className="flex items-center gap-3">
            <a
              href="#faq"
              className="text-sm text-white/70 hover:text-white transition"
            >
              FAQ
            </a>

            <a
              href="https://discord.gg/KEWZHDQq6X"
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
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-white/80">
              ● Windows · Instalador directo
            </span>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              Zentux
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
                Descargar Zentux
              </a>

              <a
                href="#features"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                Ver características
              </a>
            </div>

            <p className="mt-4 text-xs text-white/40">
              Descarga: ZentuxSetup.exe · Publicado en GitHub Releases
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-lg font-semibold">¿Por qué Zentux?</h3>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-medium">Ultra rápido</div>
                <div className="text-white/60">Clicking sin lag</div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-medium">No baja FPS</div>
                <div className="text-white/60">Ligero y estable</div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-medium">Precisión</div>
                <div className="text-white/60">Control total</div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="font-medium">Diseño premium</div>
                <div className="text-white/60">Oscuro elegante</div>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-black/40 p-4">
              <div className="text-sm font-medium">Descarga rápida</div>
              <p className="mt-1 text-sm text-white/60">
                Instala Zentux en segundos con el instalador oficial.
              </p>

              <a
                href={downloadUrl}
                className="mt-4 inline-flex w-full justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
              >
                Descargar ZentuxSetup.exe
              </a>
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <section id="features" className="mt-24">
          <h2 className="text-3xl font-semibold">Características</h2>
          <p className="mt-3 max-w-2xl text-white/60">
            Un set completo de herramientas pensado para jugadores que quieren
            precisión, velocidad y control sin sacrificar rendimiento.
          </p>
        </section>

        {/* DISCORD */}
        <section id="discord" className="mt-24">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8">
            <h2 className="text-2xl font-semibold">Soporte y comunidad</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Entra al Discord oficial de Zentux para soporte, servicio al
              cliente, actualizaciones y contacto directo con el desarrollador.
            </p>

            <a
              href="https://discord.gg/KEWZHDQq6X"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
            >
              Unirme al Discord
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mt-24">
          <h2 className="text-3xl font-semibold">FAQ</h2>
          <p className="mt-3 text-white/60">
            Más preguntas y respuestas llegarán pronto.
          </p>
        </section>
      </main>
    </div>
  );
}
