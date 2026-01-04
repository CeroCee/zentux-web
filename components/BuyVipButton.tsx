"use client";

import { getAuth } from "firebase/auth";
import { useState } from "react";

export default function BuyVipButton() {
  const [loading, setLoading] = useState(false);

  const handleBuyVip = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión para comprar Zentux VIP");
      return;
    }

    setLoading(true);

    try {
      const token = await user.getIdToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/createCheckoutSession`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Error creando la sesión de pago");
      }

      window.location.href = data.url;
    } catch (err: any) {
      alert(err?.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleBuyVip}
      disabled={loading}
      className="rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition disabled:opacity-50"
    >
      {loading ? "Redirigiendo..." : "Comprar Zentux VIP"}
    </button>
  );
}
