"use client";

import { useEffect, useState } from "react";

type Subscription = {
  available: boolean;
  status?: string;
  cancelScheduled?: boolean;
  accessUntil?: string | null;
  canCancel?: boolean;
};

export function SubscriptionPanel() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [opening, setOpening] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch("/api/account/subscription", { cache: "no-store", signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error("No se pudo consultar tu suscripción. Intenta de nuevo más tarde.");
        setSubscription(data);
      } catch (cause) {
        if (!controller.signal.aborted) setError(cause instanceof Error ? cause.message : "No se pudo consultar tu suscripción.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    void load();
    return () => controller.abort();
  }, []);

  async function openCancellation() {
    if (opening) return;
    setOpening(true);
    setError("");
    try {
      const response = await fetch("/api/account/subscription/portal", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "No se pudo abrir Stripe. Intenta de nuevo más tarde.");
      const url = new URL(data.url);
      if (url.protocol !== "https:" || url.hostname !== "billing.stripe.com") throw new Error("El enlace de Stripe no es válido.");
      window.location.assign(url.href);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo abrir Stripe.");
      setOpening(false);
    }
  }

  const date = subscription?.accessUntil
    ? new Date(subscription.accessUntil).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <section aria-labelledby="subscription-title" className="mt-6 rounded-2xl border border-[#a855f7]/30 bg-[#12071f]/70 p-5">
      <h3 id="subscription-title" className="font-black">Suscripción</h3>
      {loading ? <p role="status" className="mt-3 text-sm text-[#aaa0b8]">Consultando tu suscripción…</p> : subscription?.available ? (
        <>
          <p className="mt-3 text-sm font-bold text-[#c4b5fd]">
            {subscription.cancelScheduled ? "Cancelación programada" : subscription.status === "canceled" ? "Suscripción cancelada" : "Suscripción de Stripe vinculada"}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#aaa0b8]">
            {subscription.cancelScheduled
              ? `Tu suscripción no se renovará.${date ? ` Podrás seguir usando el producto hasta el ${date}.` : ""}`
              : subscription.canCancel
                ? "Puedes cancelar la renovación. Confirmarás la cancelación en Stripe y conservarás el acceso hasta terminar el período pagado."
                : "Esta suscripción no permite programar una cancelación desde aquí. Si necesitas ayuda, contacta soporte."}
          </p>
          {subscription.canCancel && <button type="button" onClick={() => void openCancellation()} disabled={opening}
            className="mt-4 rounded-xl border border-[#fb7185]/40 px-5 py-3 text-sm font-bold text-[#fda4af] transition hover:bg-[#fb7185]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c084fc] disabled:cursor-wait disabled:opacity-60">
            {opening ? "Abriendo Stripe…" : "Cancelar suscripción"}
          </button>}
        </>
      ) : subscription && <p className="mt-3 text-sm text-[#aaa0b8]">No tienes una suscripción de Stripe vinculada a esta cuenta de Discord.</p>}
      {error && <p role="alert" className="mt-3 text-sm text-[#fda4af]">{error}</p>}
    </section>
  );
}
