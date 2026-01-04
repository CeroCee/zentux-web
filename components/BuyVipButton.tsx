<div className="mt-8 flex flex-wrap gap-4">
  {/* BOTÓN NORMAL */}
  <a
    href={downloadUrl}
    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition"
  >
    Descargar Zentux (Setup.exe)
  </a>

  {/* BOTÓN VIP */}
  <BuyVipButton />

  <a
    href="#features"
    className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
  >
    Ver características
  </a>
</div>
