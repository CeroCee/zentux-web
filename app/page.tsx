export default function Home() {
  const downloadUrl =
    "https://github.com/CeroCee/zentux-releases1/releases/download/v1.0.10/ZentuxSetup.exe";

  const features = [
    {
      title: "⚡ Rendimiento sin compromisos",
      points: [
        "Ultra ligero, consumo mínimo de recursos.",
        "Funciona en segundo plano sin bajar FPS.",
        "Autoclick ultra rápido sin lag ni stuttering.",
        "Optimizado para gaming competitivo.",
      ],
    },
    {
      title: "🎯 Precisión gamer",
      points: [
        "Autoclick configurable (Hold / Toggle).",
        "Respuesta inmediata a cada acción.",
        "Opciones para mejorar la precisión.",
        "Ideal para juegos competitivos y repetitivos.",
      ],
    },
    {
      title: "🖥️ Más que un autoclicker",
      points: [
        "Cambio de resolución directamente desde la app.",
        "Opciones para optimizar el rendimiento del PC.",
        "Funciones extra enfocadas en estabilidad y control.",
        "Todo centralizado en una sola aplicación.",
      ],
    },
    {
      title: "✨ Interfaz moderna y premium",
      points: [
        "Interfaz oscura, moderna y elegante.",
        "Inspiración premium tipo Apple.",
        "Clara, intuitiva y sin ruido visual.",
        "Todo al alcance, sin configuraciones complicadas.",
      ],
    },
    {
      title: "🔄 Actualizaciones simples y seguras",
      points: [
        "Instalador directo.",
        "Actualizaciones rápidas.",
        "Sin procesos confusos.",
        "Siempre en la última versión.",
      ],
    },
    {
      title: "🤝 Atención directa del desarrollador",
      points: [
        "Soporte cercano y real.",
        "Escucha activa a los usuarios.",
        "Mejoras constantes basadas en feedback.",
        "Comunidad primero.",
      ],
    },
  ];

  const faqs = [
    {
      q: "¿Zentux baja los FPS?",
      a: "No. Zentux está optimizado para ser ultra ligero y correr en segundo plano consumiendo mínimos recursos.",
    },
    {
      q: "¿Cómo descargo e इंस्टalo?",
      a: "Pulsa “Descargar Zentux”. Se baja el instalador ZentuxSetup.exe y lo ejecutas como cualquier programa de Windows.",
    },
    {
      q: "¿Tiene modo Hold y Toggle?",
      a: "Sí. Puedes configurar el autoclick en Hold (mientras mantienes) o Toggle (activar/desactivar).",
    },
    {
      q: "¿Funciona en juegos exigentes?",
      a: "Sí. Está pensado para gaming competitivo, buscando estabilidad y respuesta inmediata sin stuttering.",
    },
    {
      q: "¿Dónde se publica el instalador?",
      a: "En GitHub Releases, con descarga directa desde la web oficial de Zentux.",
    },
  ];

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Top glow */}
      <div className="pointer-events-none fixed inset-x-0 top-0 h-80 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

      {/* NAV */}
      <header className="sticky top-0 z-20 backdrop-blur bg-black/40 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-white/10 ring-1 ring-white/10 flex items-center justify-center font-bold">
              Z
            </div>
            <div className="leading-tight">
              <div className="font-semibold">Zentux</div>
              <div className="text-xs text-zinc-400">Autoclicker gamer</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#faq"
              className="hidden sm:inline-block text-sm text-zinc-300 hover:text-white transition"
            >
              FAQ
            </a>
            <a
              href={downloadUrl}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition"
            >
              Descargar
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-14">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-1.5 text-sm text-zinc-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Windows • Instalador directo
              </p>

              <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
                Zentux
              </h1>

              <p className="mt-4 text-xl text-zinc-300">
                Autoclicker gamer. Rendimiento real. Control total.
              </p>

              <p className="mt-6 text-zinc-400 leading-relaxed max-w-xl">
                Zentux es una aplicación moderna para Windows, diseñada especialmente
                para gaming, enfocada en máximo rendimiento, ligereza extrema y una
                experiencia limpia y elegante.
                <br />
                <br />
                No es solo un autoclicker: Zentux es una herramienta todo-en-uno para
                jugadores que buscan precisión, velocidad y control sin sacrificar FPS.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a
                  href={downloadUrl}
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black hover:bg-zinc-200 transition"
                >
                  Descargar Zentux
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition"
                >
                  Ver características
                </a>
              </div>

              <div className="mt-5 text-sm text-zinc-500">
                Descarga: ZentuxSetup.exe • Publicado en GitHub Releases
              </div>
            </div>

            {/* Right card */}
            <div className="lg:pl-8">
              <div className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-400">Por qué Zentux</div>
                  <div className="text-xs text-zinc-500">Gaming / Performance</div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  {[
                    { k: "Ultra rápido", v: "Clicking sin lag" },
                    { k: "No baja FPS", v: "Ligero y estable" },
                    { k: "Precisión", v: "Control total" },
                    { k: "Diseño premium", v: "Oscuro elegante" },
                  ].map((it) => (
                    <div
                      key={it.k}
                      className="rounded-2xl bg-black/40 ring-1 ring-white/10 p-4"
                    >
                      <div className="font-semibold">{it.k}</div>
                      <div className="text-sm text-zinc-400 mt-1">{it.v}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-black/40 ring-1 ring-white/10 p-5">
                  <div className="font-semibold">Descarga rápida</div>
                  <div className="text-sm text-zinc-400 mt-1">
                    Instala Zentux en segundos con el instalador oficial.
                  </div>
                  <a
                    href={downloadUrl}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black hover:bg-zinc-200 transition"
                  >
                    Descargar ZentuxSetup.exe
                  </a>
                </div>
              </div>

              <div className="mt-4 text-xs text-zinc-600 text-center">
                Tip: comparte tu web pública cuando esté en Vercel ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl px-6 py-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold">Características</h2>
            <p className="mt-2 text-zinc-400 max-w-2xl">
              Un set completo de herramientas pensado para jugadores que quieren
              precisión, velocidad y control sin sacrificar rendimiento.
            </p>
          </div>
          <a
            href={downloadUrl}
            className="hidden sm:inline-flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Descargar
          </a>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7"
            >
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <ul className="mt-4 space-y-2 text-zinc-400 list-disc list-inside">
                {f.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-white/5 via-white/5 to-transparent ring-1 ring-white/10 p-8 md:p-10">
          <h2 className="text-3xl font-semibold">🚀 ¿Por qué Zentux?</h2>
          <p className="mt-3 text-zinc-400 max-w-3xl leading-relaxed">
            ✔ Ultra rápido • ✔ No baja FPS • ✔ Precisión gamer • ✔ Funciones avanzadas • ✔ Diseño moderno • ✔ Soporte real
            <br />
            <br />
            Optimiza tu juego. Controla cada clic. Juega sin límites.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={downloadUrl}
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black hover:bg-zinc-200 transition"
            >
              Descargar Zentux hoy
            </a>
            <a
              href="#faq"
              className="inline-flex items-center justify-center rounded-full bg-black/40 ring-1 ring-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition"
            >
              Ver FAQ
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-semibold">FAQ</h2>
        <p className="mt-2 text-zinc-400">
          Respuestas rápidas a lo más común.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-3xl bg-white/5 ring-1 ring-white/10 p-7"
            >
              <div className="font-semibold">{f.q}</div>
              <div className="mt-2 text-zinc-400 leading-relaxed">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Zentux • Windows • Autoclicker gamer
          </div>
          <a
            href={downloadUrl}
            className="inline-flex items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            Descargar Zentux
          </a>
        </div>
      </footer>
    </main>
  );
}
