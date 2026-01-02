export default function Home() {
  const downloadUrl =
    "const downloadUrl =
  const downloadUrl =
  "https://github.com/CeroCee/zentux-releases1/releases/download/v1.0.10/ZentuxSetup.exe"; // <-- cambia si tu link es otro

  const title = "Zentux";
  const subtitle = "Autoclicker gamer. Rendimiento real. Control total.";

  const heroDescription =
    "Zentux es una aplicación moderna para Windows, diseñada especialmente para gaming, enfocada en máximo rendimiento, ligereza extrema y una experiencia limpia y elegante. No es solo un autoclicker: Zentux es una herramienta todo-en-uno para jugadores que buscan precisión, velocidad y control sin sacrificar FPS.";

  const sections = [
    {
      icon: "⚡",
      title: "Rendimiento sin compromisos",
      bullets: [
        "Optimizado para ser ultra ligero, consumiendo mínimos recursos.",
        "Funciona en segundo plano sin bajar FPS, incluso en juegos exigentes.",
        "Autoclick ultra rápido, sin lag ni stuttering.",
        "Pensado para gaming competitivo.",
      ],
    },
    {
      icon: "🎯",
      title: "Precisión gamer",
      bullets: [
        "Autoclick configurable (Hold / Toggle).",
        "Opciones para mejorar la precisión.",
        "Respuesta inmediata a cada acción.",
        "Ideal para juegos competitivos y repetitivos.",
      ],
    },
    {
      icon: "🖥️",
      title: "Más que un autoclicker",
      bullets: [
        "Cambio de resolución directamente desde la app.",
        "Opciones para optimizar el rendimiento del PC.",
        "Funciones extra enfocadas en estabilidad y control.",
        "Todo centralizado en una sola aplicación.",
      ],
    },
    {
      icon: "✨",
      title: "Interfaz moderna y premium",
      bullets: [
        "Interfaz oscura, moderna y elegante.",
        "Inspiración premium tipo Apple.",
        "Clara, intuitiva y sin ruido visual.",
        "Todo al alcance, sin configuraciones complicadas.",
      ],
    },
    {
      icon: "🔄",
      title: "Actualizaciones simples y seguras",
      bullets: [
        "Instalador directo.",
        "Actualizaciones rápidas.",
        "Sin procesos confusos.",
        "Siempre en la última versión.",
      ],
    },
    {
      icon: "🤝",
      title: "Atención directa del desarrollador",
      bullets: [
        "Soporte cercano.",
        "Escucha activa a los usuarios.",
        "Mejoras constantes basadas en feedback.",
      ],
    },
  ];

  const why = [
    "Ultra rápido",
    "No baja FPS",
    "Precisión gamer",
    "Funciones avanzadas",
    "Diseño moderno",
    "Soporte real",
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Fondo tipo Apple (glow) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-140px] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-[-160px] bottom-[-160px] h-[560px] w-[560px] rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 ring-1 ring-white/15" />
          <span className="text-lg font-semibold tracking-tight">{title}</span>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a className="hover:text-white" href="#features">
            Features
          </a>
          <a className="hover:text-white" href="#download">
            Descargar
          </a>
          <a className="hover:text-white" href="#faq">
            FAQ
          </a>
        </nav>

        <a
          href={downloadUrl}
          className="rounded-2xl bg-white px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
        >
          Descargar
        </a>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-12 pb-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 ring-1 ring-white/15">
              Windows • Gaming
              <span className="h-1 w-1 rounded-full bg-white/40" />
              Premium Dark
            </p>

            <h1 className="mt-6 text-5xl font-extrabold tracking-tight md:text-6xl">
              {title}
            </h1>

            <p className="mt-5 text-xl text-white/75">{subtitle}</p>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/65">
              {heroDescription}
            </p>

            <div
              id="download"
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href={downloadUrl}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90"
              >
                Descargar Zentux hoy
              </a>
              <p className="text-sm text-white/60">
                Instalador desde{" "}
                <span className="text-white/80">GitHub Releases</span>.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Ultra ligero", "mínimos recursos"],
                ["No baja FPS", "background safe"],
                ["Control total", "hold / toggle"],
              ].map(([a, b]) => (
                <div
                  key={a}
                  className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10"
                >
                  <div className="font-semibold text-white/85">{a}</div>
                  <div className="text-sm text-white/55">{b}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card preview */}
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-white/25" />
              <div className="h-3 w-3 rounded-full bg-white/15" />
              <div className="h-3 w-3 rounded-full bg-white/10" />
              <div className="ml-3 text-xs text-white/55">Zentux</div>
            </div>

            <div className="mt-6 space-y-4">
              {sections.slice(0, 3).map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl bg-black/40 p-4 ring-1 ring-white/10"
                >
                  <div className="text-sm font-semibold">
                    <span className="mr-2">{s.icon}</span>
                    {s.title}
                  </div>
                  <div className="mt-1 text-sm text-white/60">
                    {s.bullets[0]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tight">Features</h2>
        <p className="mt-2 text-white/60">
          Precisión, velocidad y control sin sacrificar rendimiento.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {sections.map((s) => (
            <div
              key={s.title}
              className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
            >
              <div className="text-lg font-semibold">
                <span className="mr-2">{s.icon}</span>
                {s.title}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/65">
                {s.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-6 pb-12">
        <h2 className="text-2xl font-bold tracking-tight">¿Por qué Zentux?</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {why.map((t) => (
            <span
              key={t}
              className="rounded-full bg-white/10 px-4 py-2 text-sm text-white/75 ring-1 ring-white/15"
            >
              ✔ {t}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white/5 p-7 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold">
            Optimiza tu juego. Controla cada clic. Juega sin límites.
          </h3>
          <p className="mt-2 text-white/65">
            Descarga Zentux hoy y mantente siempre en la última versión.
          </p>
          <a
            href={downloadUrl}
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 font-semibold text-black hover:opacity-90"
          >
            Descargar Zentux
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight">FAQ</h2>

        <div className="mt-6 space-y-3">
          <details className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <summary className="cursor-pointer font-semibold">
              ¿De dónde sale la descarga?
            </summary>
            <p className="mt-2 text-sm text-white/65">
              El botón descarga el instalador directamente desde{" "}
              <span className="text-white/80">GitHub Releases</span>.
            </p>
          </details>

          <details className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <summary className="cursor-pointer font-semibold">
              ¿Zentux baja FPS?
            </summary>
            <p className="mt-2 text-sm text-white/65">
              Está optimizado para ser ultra ligero y funcionar en segundo plano
              sin afectar rendimiento, incluso en juegos exigentes.
            </p>
          </details>

          <details className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <summary className="cursor-pointer font-semibold">
              ¿Tiene Hold / Toggle?
            </summary>
            <p className="mt-2 text-sm text-white/65">
              Sí. Zentux incluye autoclick configurable (Hold / Toggle) y
              opciones pensadas para precisión gamer.
            </p>
          </details>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-white/50">
        © {new Date().getFullYear()} Zentux. All rights reserved.
      </footer>
    </main>
  );
}
