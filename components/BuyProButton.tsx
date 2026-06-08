"use client";

const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";

export default function BuyProButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={checkoutUrl}
      className={
        compact
          ? "inline-flex items-center justify-center rounded-full bg-[#c51f35] px-5 py-2.5 text-sm font-bold text-white shadow-[0_0_24px_rgba(197,31,53,0.28)] transition hover:bg-[#e12a41]"
          : "inline-flex items-center justify-center rounded-full bg-[#c51f35] px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_30px_rgba(197,31,53,0.34)] transition hover:bg-[#e12a41]"
      }
    >
      Buy ZentuxOptimizer Pro
    </a>
  );
}
