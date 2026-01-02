export default function Home() {
  const downloadUrl =
    "https://github.com/CeroCee/zentux-releases1/releases/download/v1.0.10/ZentuxSetup.exe";

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h1 className="text-6xl font-extrabold tracking-tight">Zentux</h1>
        <p className="mt-4 text-xl text-zinc-400">
          Autoclicker gamer. Rendimiento real. Control total.
        </p>

        <a
          href={downloadUrl}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-black hover:bg-zinc-200 transition"
        >
          Descargar Zentux
        </a>

        <p className="mt-4 text-sm text-zinc-500">
          Windows · Instalador directo · GitHub Releases
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 space-y-10">
        <p className="text-zinc-400 leading-relaxed">
          Zentux es una aplicación moderna para Windows, diseñada especialmente
          para gaming, enfocada en máximo rendimiento, ligereza extrema y una
          experiencia limpia y elegante.
          <br />
          <br />
          No es solo un autoclicker: Zentux es una herramienta todo-en-uno para
          jugadores que buscan precisión, velocidad y control sin sacrificar FPS.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">⚡ Rendimiento sin compromisos</h2>
            <ul className="mt-3 space-y-2 text-zinc-400 list-disc list-inside">
              <li>Ultra ligero, consumo mínimo</li>
              <li>No baja FPS en juegos exigentes</li>
              <li>Autoclick ultra rápido sin lag</li>
              <li>Optimizado para gaming competitivo</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold">🎯 Precisión gamer</h2>
            <ul className="mt-3 space-y-2 text-zinc-400 list-disc list-inside">
              <li>Hold / Toggle</li>
              <li>Respuesta inmediata</li>
              <li>Control absoluto</li>
              <li>Ideal para juegos repetitivos</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
