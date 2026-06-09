"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const APP_NAME = "ZentuxOptimizer Pro";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const downloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxOptimizer.exe";
const supportUrl = "https://guns.lol/cerocee";
const discordUrl = "https://discord.gg/KEWZHDQq6X";

const tabs = ["Home", "Products", "Reviews", "Status", "FAQ"] as const;
type Tab = (typeof tabs)[number];

const featureCards = [
  ["Cleaner", "Safe temporary file cleanup and storage diagnostics."],
  ["Game Booster", "Game detection, priority control, and overlay checks."],
  ["RAM Tools", "Review heavy apps and reduce background pressure."],
  ["License System", "Pro tools unlock only with an active online license."],
];

const reviews = [
  "Clean interface and easy activation.",
  "Helped me find what was slowing my PC.",
  "The cleaner and game booster are useful before playing.",
  "Support answered my questions fast.",
  "The license email arrived quickly.",
  "Simple tools, but very useful before gaming.",
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [showDiscordBubble, setShowDiscordBubble] = useState(true);

  useEffect(() => {
    if (showDiscordBubble) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowDiscordBubble(true);
    }, 30000);

    return () => window.clearTimeout(timer);
  }, [showDiscordBubble]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05010b] text-white">
      <SiteBackground />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            onClick={() => setActiveTab("Home")}
            className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl transition hover:border-[#a855f7]/60"
          >
            <Image
              src="/zentux-icon.png"
              alt="Zentux logo"
              width={38}
              height={38}
              className="rounded-full"
              priority
            />
            <div className="hidden text-left sm:block">
              <div className="text-sm font-black leading-none">Zentux</div>
              <div className="mt-1 text-[11px] font-bold text-[#b989ff]">
                Optimizer Pro
              </div>
            </div>
          </button>

          <nav className="flex items-center rounded-full border border-white/10 bg-black/45 p-1 text-xs font-black text-[#bfb8c8] shadow-[0_0_60px_rgba(168,85,247,0.08)] backdrop-blur-xl sm:text-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-3 py-2 transition sm:px-5 ${
                  activeTab === tab
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.16)]"
                    : "hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          <a
            href={supportUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full border border-[#a855f7]/55 bg-black/35 px-5 py-2.5 text-sm font-black text-[#d6b4ff] backdrop-blur-xl transition hover:bg-[#a855f7] hover:text-white md:inline-flex"
          >
            Get Help
          </a>
        </div>
      </header>

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-28 sm:px-7 lg:pt-32">
        {activeTab === "Home" && <HomePanel setActiveTab={setActiveTab} />}
        {activeTab === "Products" && <ProductsPanel />}
        {activeTab === "Reviews" && <ReviewsPanel />}
        {activeTab === "Status" && <StatusPanel />}
        {activeTab === "FAQ" && <FaqPanel />}
      </div>

      <DiscordBubble
        visible={showDiscordBubble}
        onClose={() => setShowDiscordBubble(false)}
      />
    </main>
  );
}

function HomePanel({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <section className="grid min-h-[calc(100vh-9rem)] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <h1 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
          Zentux
          <span className="block bg-gradient-to-r from-[#d85cff] to-[#7c6bff] bg-clip-text text-transparent">
            Optimizer.
          </span>
        </h1>
        <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-[#a69bb3]">
          Premium Windows performance tools built for cleaner storage, gaming
          preparation, RAM control, and license-protected Pro access.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab("Products")}
            className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-8 py-4 text-sm font-black text-white shadow-[0_0_45px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
          >
            Browse Products
          </button>
          <a
            href={supportUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/15 bg-black/25 px-8 py-4 text-sm font-black text-white transition hover:border-[#a855f7]"
          >
            Join Support
          </a>
        </div>

        <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 border-y border-white/10 py-6 sm:grid-cols-4">
          <HeroStat value="6,800+" label="products sold" />
          <HeroStat value="5.0" label="rating" />
          <HeroStat value="$3" label="price" />
          <HeroStat value="24/7" label="support" />
        </div>

        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
          <HomeTrustCard
            value="6.8k+"
            title="Happy Customers"
            text="Trusted by Zentux users who want simple performance tools."
          />
          <HomeTrustCard
            value="~30s"
            title="License Delivery"
            text="Automated license email after successful checkout."
          />
          <HomeTrustCard
            value="Secure"
            title="Payments"
            text="Stripe checkout with subscription billing and buyer protection."
          />
        </div>
      </div>

      <div className="relative hidden min-h-[520px] lg:block">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a855f7]/25 shadow-[0_0_120px_rgba(168,85,247,0.18)]" />
        <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#a855f7]/25" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-2xl" />
      </div>
    </section>
  );
}

function DiscordBubble({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsClosing(false);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const closeBubble = () => {
    setIsClosing(true);
    window.setTimeout(onClose, 260);
  };

  return (
    <aside
      className={`zentux-discord-bubble fixed bottom-5 right-5 z-[60] w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-[#6d5dfc]/45 bg-[#090718]/92 p-4 shadow-[0_0_60px_rgba(109,93,252,0.25)] backdrop-blur-2xl ${
        isClosing ? "zentux-discord-out" : ""
      }`}
    >
      <button
        type="button"
        onClick={closeBubble}
        className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm font-black text-[#8f84a0] transition hover:bg-white/10 hover:text-white"
        aria-label="Close Discord invite"
      >
        x
      </button>

      <div className="flex gap-3 pr-7">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#6d5dfc]/50 bg-[#5865f2]/20">
          <svg
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-[#dfe3ff]"
            aria-hidden="true"
          >
            <path d="M19.54 5.23A16.9 16.9 0 0 0 15.36 4c-.18.32-.39.76-.53 1.1a15.7 15.7 0 0 0-4.66 0c-.15-.36-.36-.78-.54-1.1a16.8 16.8 0 0 0-4.18 1.23C2.8 9.12 2.15 12.9 2.54 16.63A16.8 16.8 0 0 0 7.67 19.2c.42-.56.78-1.16 1.1-1.79-.6-.22-1.17-.5-1.71-.83l.42-.33a12.08 12.08 0 0 0 10.04 0l.42.33c-.54.33-1.11.61-1.71.83.32.63.69 1.23 1.1 1.79a16.8 16.8 0 0 0 5.13-2.57c.46-4.32-.78-8.07-2.92-11.4ZM8.68 14.34c-1 0-1.82-.92-1.82-2.04 0-1.13.8-2.04 1.82-2.04 1.01 0 1.84.91 1.82 2.04 0 1.12-.81 2.04-1.82 2.04Zm6.64 0c-1 0-1.82-.92-1.82-2.04 0-1.13.8-2.04 1.82-2.04 1.01 0 1.84.91 1.82 2.04 0 1.12-.8 2.04-1.82 2.04Z" />
          </svg>
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-black text-white">Join our Discord</h3>
          <p className="mt-1 text-sm leading-5 text-[#a69bb3]">
            Get support, updates and exclusive deals.
          </p>
        </div>
      </div>

      <a
        href={discordUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#5865f2] px-5 py-3 text-sm font-black text-white transition hover:bg-[#6d7cff]"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
          <path d="M19.54 5.23A16.9 16.9 0 0 0 15.36 4c-.18.32-.39.76-.53 1.1a15.7 15.7 0 0 0-4.66 0c-.15-.36-.36-.78-.54-1.1a16.8 16.8 0 0 0-4.18 1.23C2.8 9.12 2.15 12.9 2.54 16.63A16.8 16.8 0 0 0 7.67 19.2c.42-.56.78-1.16 1.1-1.79-.6-.22-1.17-.5-1.71-.83l.42-.33a12.08 12.08 0 0 0 10.04 0l.42.33c-.54.33-1.11.61-1.71.83.32.63.69 1.23 1.1 1.79a16.8 16.8 0 0 0 5.13-2.57c.46-4.32-.78-8.07-2.92-11.4ZM8.68 14.34c-1 0-1.82-.92-1.82-2.04 0-1.13.8-2.04 1.82-2.04 1.01 0 1.84.91 1.82 2.04 0 1.12-.81 2.04-1.82 2.04Zm6.64 0c-1 0-1.82-.92-1.82-2.04 0-1.13.8-2.04 1.82-2.04 1.01 0 1.84.91 1.82 2.04 0 1.12-.8 2.04-1.82 2.04Z" />
        </svg>
        Join Discord
      </a>
    </aside>
  );
}

function ProductsPanel() {
  return (
    <section className="mx-auto max-w-6xl py-10">
      <PanelTitle
        label="Products"
        title="ZentuxOptimizer Pro"
        text="One premium product, one subscription, full access to the optimizer."
      />

      <div className="mt-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[30px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            Premium access
          </p>
          <h3 className="mt-4 text-4xl font-black">6,800+ products sold</h3>
          <p className="mt-4 max-w-md leading-8 text-[#c9c2d0]">
            Subscribe through Stripe, receive your license by email, paste it in
            the app, and unlock the full Pro optimizer.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <SmallStat value="Instant" label="delivery" />
            <SmallStat value="Online" label="license" />
            <SmallStat value="Pro" label="access" />
          </div>
          <a
            href={downloadUrl}
            className="mt-7 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:border-[#a855f7] hover:text-[#d6b4ff]"
          >
            Download App
          </a>
        </div>

        <a
          href={checkoutUrl}
          className="group mx-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-white/12 bg-[#0a070d]/95 text-white no-underline transition hover:-translate-y-1 hover:border-[#c51f35]/80 hover:shadow-[0_0_60px_rgba(197,31,53,0.28)] lg:mx-0"
        >
          <div className="relative h-[390px] overflow-hidden border-b border-white/10 bg-[#070305]">
            <Image
              src="/producto.png"
              alt={APP_NAME}
              fill
              priority
              quality={100}
              sizes="430px"
              className="object-contain p-2 transition duration-500 group-hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09050a]/88 via-transparent to-black/5" />
            <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
              Popular
            </span>
            <span className="absolute inset-x-5 bottom-5 mx-auto hidden w-fit rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-black group-hover:block">
              View Details
            </span>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-black">{APP_NAME}</h3>
            <p className="mt-2 text-sm leading-6 text-[#bcaab3]">
              Windows performance optimizer
            </p>
            <div className="mt-8 flex items-center justify-between gap-3">
              <span className="text-xl font-black">$3.00</span>
              <span className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-1 text-[10px] font-black uppercase tracking-wide">
                - In Stock
              </span>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function ReviewsPanel() {
  return (
    <section className="py-10">
      <PanelTitle
        label="Reviews"
        title="Customer Reviews"
        text="Real feedback from Zentux users after activation and support."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl lg:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            Overall rating
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <span className="text-6xl font-black">5.00</span>
            <span className="pb-3 text-lg">*****</span>
            <span className="pb-3 text-sm text-[#a69bb3]">verified customers</span>
          </div>
          <div className="mt-6 space-y-3">
            <RatingBar label="5*" value="100%" count="6,800+" />
            <RatingBar label="4*" value="0%" count="0" />
            <RatingBar label="3*" value="0%" count="0" />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            Products sold
          </p>
          <div className="mt-4 text-5xl font-black">6,800+</div>
          <p className="mt-4 leading-7 text-[#c9c2d0]">
            Built around premium tools, activation, and direct support.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review}
            className="rounded-[22px] border border-white/10 bg-black/38 p-5 backdrop-blur-xl"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-black">
                Z
              </span>
              <div>
                <p className="font-black">Verified User</p>
                <p className="text-xs text-[#a69bb3]">Zentux customer</p>
              </div>
            </div>
            <p className="text-sm">*****</p>
            <p className="mt-3 text-sm leading-7 text-[#c9c2d0]">{review}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatusPanel() {
  return (
    <section className="py-10">
      <PanelTitle
        label="Status"
        title="Product Status"
        text="Current availability for ZentuxOptimizer Pro and its online services."
      />

      <div className="mt-10 space-y-3 rounded-[28px] border border-white/10 bg-black/38 p-5 backdrop-blur-xl">
        <StatusRow name="ZentuxOptimizer Pro" price="$3.00 / 15 days" status="Available" />
        <StatusRow name="License Validation" price="Included" status="Online" />
        <StatusRow name="Email License Delivery" price="Included" status="Online" />
        <StatusRow name="Support Page" price="Included" status="Online" />
      </div>
    </section>
  );
}

function FaqPanel() {
  return (
    <section className="py-10">
      <PanelTitle
        label="FAQ"
        title="Before you buy."
        text="Quick answers about subscription, license delivery, and app access."
      />

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <FaqItem
          q="Is ZentuxOptimizer free?"
          a="No. ZentuxOptimizer Pro requires an active subscription and valid license key."
        />
        <FaqItem
          q="How do I receive my license?"
          a="After checkout, the license key is sent to the email used during payment."
        />
        <FaqItem
          q="Will this always increase FPS?"
          a="No optimizer can guarantee FPS gains in every game. Zentux helps remove common bottlenecks and prepare Windows for gaming."
        />
        <FaqItem
          q="Where can I get help?"
          a="Use the Get Help button to contact Zentux support for app questions or optional PC performance help."
        />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map(([title, text]) => (
          <article
            key={title}
            className="rounded-[22px] border border-white/10 bg-black/38 p-5 backdrop-blur-xl"
          >
            <h3 className="font-black">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-[#c9c2d0]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 bg-[#05010b]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_20%,rgba(168,85,247,0.25),transparent_32%),radial-gradient(circle_at_18%_45%,rgba(32,232,242,0.09),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.25),rgba(168,85,247,0.12),rgba(0,0,0,0.34))]" />
      <div className="zentux-snow-layer zentux-snow-slow absolute -inset-y-full inset-x-0 opacity-45" />
      <div className="zentux-snow-layer zentux-snow-medium absolute -inset-y-full inset-x-0 opacity-35" />
      <div className="zentux-snow-layer zentux-snow-fast absolute -inset-y-full inset-x-0 opacity-25" />
    </div>
  );
}

function PanelTitle({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-black uppercase tracking-[0.32em] text-[#a69bb3]">
        {label}
      </p>
      <h2 className="mt-3 text-5xl font-black leading-tight text-white sm:text-6xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[#bfb5c9]">{text}</p>
    </div>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0">
      <div className="text-2xl font-black text-[#c75cff]">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8f84a0]">
        {label}
      </div>
    </div>
  );
}

function HomeTrustCard({
  value,
  title,
  text,
}: {
  value: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5 text-center shadow-[0_0_45px_rgba(168,85,247,0.08)] backdrop-blur-xl">
      <div className="text-3xl font-black bg-gradient-to-r from-[#d85cff] to-[#8b76ff] bg-clip-text text-transparent">
        {value}
      </div>
      <h3 className="mt-3 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#a69bb3]">{text}</p>
    </article>
  );
}

function SmallStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8f84a0]">
        {label}
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  width,
  danger = false,
}: {
  label: string;
  value: string;
  width: string;
  danger?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#c9c2d0]">{label}</span>
        <span className="text-xl font-black">{value}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full"
          style={{ width, backgroundColor: danger ? "#c51f35" : "#a855f7" }}
        />
      </div>
    </div>
  );
}

function RatingBar({
  label,
  value,
  count,
}: {
  label: string;
  value: string;
  count: string;
}) {
  return (
    <div className="grid grid-cols-[34px_1fr_64px] items-center gap-3 text-xs font-bold text-[#a69bb3]">
      <span>{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-white" style={{ width: value }} />
      </div>
      <span className="text-right">{count}</span>
    </div>
  );
}

function StatusRow({
  name,
  price,
  status,
}: {
  name: string;
  price: string;
  status: string;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/35 p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
      <span className="font-black text-white">{name}</span>
      <span className="w-fit rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-black text-white">
        {price}
      </span>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1f8e5a] bg-[#042015] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-[#64ffb1]">
        <span className="h-2 w-2 rounded-full bg-[#64ffb1]" />
        {status}
      </span>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-black/38 p-6 backdrop-blur-xl">
      <h3 className="text-lg font-black text-white">{q}</h3>
      <p className="mt-3 leading-7 text-[#c9c2d0]">{a}</p>
    </article>
  );
}
