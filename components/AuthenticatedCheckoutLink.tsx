"use client";

import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

const licenseApiBaseUrl = (
  process.env.NEXT_PUBLIC_LICENSE_API_URL ?? "https://zentuxlicenseserver2.onrender.com"
).replace(/\/+$/, "");

export function AuthenticatedCheckoutLink({
  href,
  planId,
  provider = "stripe",
  className,
  children,
}: {
  href: string;
  planId?: string;
  provider?: "stripe" | "paypal" | "paypal-subscription";
  className?: string;
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const linkedHref = session?.user?.discordId
    ? `${href}${href.includes("?") ? "&" : "?"}client_reference_id=${encodeURIComponent(session.user.discordId)}`
    : href;

  const startServerCheckout = async () => {
    setLoading(true);
    try {
      const endpoint = provider === "paypal"
        ? "/api/web/license/paypal/order/checkout"
        : provider === "paypal-subscription"
        ? "/api/web/license/paypal/checkout"
        : "/api/web/license/checkout";
      const response = await fetch(`${licenseApiBaseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId,
          discordUserId: session?.user?.discordId,
          discordUsername: session?.user?.name,
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.checkoutUrl) {
        throw new Error(data?.error || "Could not create checkout.");
      }
      if (provider === "paypal-subscription" && data.subscriptionId) {
        window.sessionStorage.setItem("zentux-paypal-subscription-id", data.subscriptionId);
      }
      if (provider === "paypal" && data.orderId) {
        window.sessionStorage.setItem("zentux-paypal-order-id", data.orderId);
      }
      window.location.href = data.checkoutUrl;
    } catch (error) {
      console.error("License checkout failed:", error);
      window.alert(`No se pudo abrir ${provider === "stripe" ? "Stripe" : "PayPal"}. Intenta de nuevo o contacta soporte.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <a
      href={linkedHref}
      target="_blank"
      rel="noreferrer"
      className={className}
      onClick={(event) => {
        if (status !== "authenticated") {
          event.preventDefault();
          void signIn("discord");
          return;
        }
        if (!planId) return;
        event.preventDefault();
        if (!loading) void startServerCheckout();
      }}
    >
      {loading ? `Abriendo ${provider === "stripe" ? "Stripe" : "PayPal"}...` : children}
    </a>
  );
}

