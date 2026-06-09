"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const BRAND_NAME = "Zentux";
const OPTIMIZER_NAME = "ZentuxOptimizer Pro";
const AUTOCLICKER_NAME = "Zentux Autoclicker";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const optimizerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxOptimizer.exe";
const autoclickerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxAutoclicker.exe";
const supportUrl = "https://guns.lol/cerocee";
const discordUrl = "https://discord.gg/KEWZHDQq6X";

const tabs = ["Home", "Products", "Reviews", "Status", "FAQ"] as const;
type Tab = (typeof tabs)[number];
type LegalPanel = "privacy" | "terms";

const featureCards = [
  ["Gaming Tools", "Utilities designed to improve the way your PC feels while playing."],
  ["Optimizer", "Cleanup, RAM review, diagnostics, and game preparation tools."],
  ["Autoclicker", "A compact click assistant with hotkeys, hold, toggle, and mouse movement tools."],
  ["License System", "One active Zentux license can unlock supported Zentux products."],
];

const products = [
  {
    name: OPTIMIZER_NAME,
    image: "/producto.png",
    badge: "Popular",
    description: "Windows performance optimizer",
    price: "Included",
    status: "- In Stock",
    downloadUrl: optimizerDownloadUrl,
    details:
      "ZentuxOptimizer Pro helps prepare Windows for gaming with cleaner tools, RAM review, startup control, game preparation, diagnostics, and license-protected Pro access.",
  },
  {
    name: AUTOCLICKER_NAME,
    image: "/zentux-autoclicker.png",
    badge: "New",
    description: "Gaming autoclicker with Hold and Toggle",
    price: "Included",
    status: "- In Stock",
    downloadUrl: autoclickerDownloadUrl,
    details:
      "Zentux Autoclicker is built for fast click workflows with Hold mode, Toggle mode, configurable hotkeys, mouse button support, and a compact gamer interface.",
  },
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
  const [legalPanel, setLegalPanel] = useState<LegalPanel | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[number] | null
  >(null);

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
              <div className="text-sm font-black leading-none">{BRAND_NAME}</div>
              <div className="mt-1 text-[11px] font-bold text-[#b989ff]">
                Gaming Tools
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
        {activeTab === "Home" && (
          <HomePanel
            setActiveTab={setActiveTab}
            onOpenLegal={setLegalPanel}
          />
        )}
        {activeTab === "Products" && (
          <ProductsPanel onSelectProduct={setSelectedProduct} />
        )}
        {activeTab === "Reviews" && <ReviewsPanel />}
        {activeTab === "Status" && <StatusPanel />}
        {activeTab === "FAQ" && <FaqPanel />}
      </div>

      <DiscordBubble
        visible={showDiscordBubble}
        onClose={() => setShowDiscordBubble(false)}
      />
      <LegalModal
        activePanel={legalPanel}
        onClose={() => setLegalPanel(null)}
      />
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

function HomePanel({
  setActiveTab,
  onOpenLegal,
}: {
  setActiveTab: (tab: Tab) => void;
  onOpenLegal: (panel: LegalPanel) => void;
}) {
  return (
    <div className="space-y-14">
      <section className="grid min-h-[calc(100vh-9rem)] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h1 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Zentux
            <span className="block bg-gradient-to-r from-[#d85cff] to-[#7c6bff] bg-clip-text text-transparent">
              Products.
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-[#a69bb3]">
            A premium gaming brand building Windows tools for performance,
            faster workflows, smoother gameplay, and license-protected Pro
            access across Zentux apps.
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
              text="Trusted by users who want clean, premium gaming utilities."
            />
            <HomeTrustCard
              value="~30s"
              title="License Delivery"
              text="Automated license email for supported Zentux products."
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

      <LegalFooter setActiveTab={setActiveTab} onOpenLegal={onOpenLegal} />
    </div>
  );
}

function LegalFooter({
  setActiveTab,
  onOpenLegal,
}: {
  setActiveTab: (tab: Tab) => void;
  onOpenLegal: (panel: LegalPanel) => void;
}) {
  return (
    <footer className="rounded-[2rem] border border-white/10 bg-black/55 px-6 py-10 shadow-[0_0_80px_rgba(168,85,247,0.08)] backdrop-blur-2xl sm:px-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr_0.8fr_1.25fr]">
        <div>
          <button
            type="button"
            onClick={() => setActiveTab("Home")}
            className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 transition hover:border-[#a855f7]/60"
          >
            <Image
              src="/zentux-icon.png"
              alt="Zentux logo"
              width={44}
              height={44}
              className="rounded-full"
            />
            <div className="text-left">
              <div className="text-lg font-black leading-none">{BRAND_NAME}</div>
              <div className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#b989ff]">
                Gaming Tools
              </div>
            </div>
          </button>
          <p className="mt-5 max-w-sm text-sm font-semibold leading-6 text-[#91879f]">
            Premium Windows tools for gaming, optimization, click workflows,
            cleanup, and license-protected product access.
          </p>
        </div>

        <FooterColumn title="Navigation">
          <button onClick={() => setActiveTab("Home")}>Home</button>
          <button onClick={() => setActiveTab("Products")}>Products</button>
          <button onClick={() => setActiveTab("Reviews")}>Reviews</button>
          <button onClick={() => setActiveTab("Status")}>Status</button>
          <button onClick={() => setActiveTab("FAQ")}>FAQ</button>
        </FooterColumn>

        <FooterColumn title="Support">
          <a href={supportUrl} target="_blank" rel="noreferrer">
            Get Help
          </a>
          <a href={discordUrl} target="_blank" rel="noreferrer">
            Discord
          </a>
          <button onClick={() => onOpenLegal("privacy")}>
            Privacy Policy
          </button>
          <button onClick={() => onOpenLegal("terms")}>
            Terms of Service
          </button>
        </FooterColumn>

        <FooterColumn title="Products">
          <a href={checkoutUrl} target="_blank" rel="noreferrer">
            Buy License
          </a>
          <button onClick={() => setActiveTab("Products")}>Downloads</button>
          <button onClick={() => setActiveTab("Status")}>Status</button>
          <button onClick={() => setActiveTab("Products")}>Features</button>
        </FooterColumn>

        <div>
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">
            Payments
          </h3>
          <p className="mt-4 text-sm font-semibold leading-6 text-[#91879f]">
            Secure subscription checkout is handled by Stripe. Card details are
            processed by Stripe and are not stored by Zentux.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Stripe", "Visa", "Mastercard", "Apple Pay"].map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/10 bg-white/90 px-3 py-1.5 text-xs font-black text-black"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-7 text-center text-sm font-semibold leading-7 text-[#8b8198]">
        <p>Zentux (c) 2026. All rights reserved.</p>
        <p className="mx-auto mt-3 max-w-5xl">
          Zentux is an independent brand that creates Windows tools for gaming
          and performance workflows. Zentux is not affiliated with Microsoft,
          Roblox, Intel, AMD, NVIDIA, or any other third-party brand. All
          trademarks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">
        {title}
      </h3>
      <div className="mt-4 flex flex-col items-start gap-3 text-sm font-bold text-[#d8d1e2]">
        {children}
      </div>
    </div>
  );
}

function LegalModal({
  activePanel,
  onClose,
}: {
  activePanel: LegalPanel | null;
  onClose: () => void;
}) {
  if (!activePanel) {
    return null;
  }

  const isPrivacy = activePanel === "privacy";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm">
      <section className="zentux-legal-modal max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-[1.75rem] border border-[#a855f7]/35 bg-[#080512] shadow-[0_0_90px_rgba(168,85,247,0.22)]">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c76cff]">
              Zentux Legal
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              {isPrivacy ? "Privacy Policy" : "Terms of Service"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
          >
            Close
          </button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-6 sm:px-8">
          {isPrivacy ? <PrivacyPolicyText /> : <TermsOfServiceText />}
        </div>
      </section>
    </div>
  );
}

function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <h3 className="text-lg font-black text-white">{title}</h3>
      <div className="mt-3 space-y-3 text-sm font-semibold leading-7 text-[#b9afc6]">
        {children}
      </div>
    </section>
  );
}

function TermsOfServiceText() {
  return (
    <>
      <LegalSection title="1. Access and subscription">
        <p>
          Zentux products require an active license subscription. If a
          license is expired, invalid, refunded, canceled, or cannot be verified
          by the license server, Pro features in supported Zentux apps may be
          locked until the license is active again.
        </p>
      </LegalSection>

      <LegalSection title="2. License key use">
        <p>
          Each license key is connected to the subscription created through
          Stripe. You are responsible for keeping your license private. Sharing,
          reselling, leaking, or abusing license keys can lead to access being
          restricted.
        </p>
      </LegalSection>

      <LegalSection title="3. Performance tools">
        <p>
          Zentux apps can provide optimization, cleanup, game preparation,
          autoclicker controls, hotkeys, diagnostics, and related tools. Results
          can vary by device, game, drivers, Windows version, and background
          apps. Zentux does not guarantee a specific FPS increase or game
          outcome.
        </p>
      </LegalSection>

      <LegalSection title="4. Payments, renewals, and cancellation">
        <p>
          Payments and recurring billing are processed by Stripe. Subscription
          pricing, renewal timing, taxes, and payment method details are shown
          during checkout. You can contact support for help with cancellation or
          billing questions.
        </p>
      </LegalSection>

      <LegalSection title="5. Acceptable use">
        <p>
          You agree not to use Zentux products to damage systems, bypass
          security, attack services, or violate third-party terms. You are
          responsible for how you use the app on your own PC.
        </p>
      </LegalSection>

      <LegalSection title="6. Support">
        <p>
          Support is available through the official help links on this website.
          Response times can vary, but the goal is to help users activate,
          install, and understand the app safely.
        </p>
      </LegalSection>
    </>
  );
}

function PrivacyPolicyText() {
  return (
    <>
      <LegalSection title="1. Information collected">
        <p>
          Zentux may process the email used at checkout, license key status,
          subscription state, expiration date, and validation requests needed to
          unlock the app. The app may also send basic technical validation data
          so the server can confirm whether a license is active.
        </p>
      </LegalSection>

      <LegalSection title="2. Payments">
        <p>
          Payment information is handled by Stripe. Zentux does not store your
          full card number, bank details, or payment credentials.
        </p>
      </LegalSection>

      <LegalSection title="3. License emails">
        <p>
          License delivery emails may be sent through Resend or another email
          provider. These emails include the license information needed to use
          Zentux apps.
        </p>
      </LegalSection>

      <LegalSection title="4. How information is used">
        <p>
          Information is used to validate subscriptions, deliver licenses,
          provide support, protect against abuse, improve reliability, and keep
          the app locked when a subscription is not active.
        </p>
      </LegalSection>

      <LegalSection title="5. Service providers">
        <p>
          Zentux may use third-party services such as Stripe for payments,
          Render for server hosting, Resend for email delivery, GitHub for
          downloads, and Discord or support pages for customer help.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          For privacy, license, or support questions, use the official help
          links on this website.
        </p>
      </LegalSection>
    </>
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

function ProductsPanel({
  onSelectProduct,
}: {
  onSelectProduct: (product: (typeof products)[number]) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl py-10">
      <PanelTitle
        label="Products"
        title="Zentux Products"
        text="Premium gaming and performance tools under one Zentux brand."
      />

      <div className="mt-10 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[30px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            Zentux access
          </p>
          <h3 className="mt-4 text-4xl font-black">6,800+ products sold</h3>
          <p className="mt-4 max-w-md leading-8 text-[#c9c2d0]">
            Subscribe through Stripe, receive your license by email, paste it
            inside a supported Zentux app, and unlock the tools included with
            your active license.
          </p>
          <div className="mt-7 grid grid-cols-3 gap-3">
            <SmallStat value="Instant" label="delivery" />
            <SmallStat value="Online" label="license" />
            <SmallStat value="Multi" label="products" />
          </div>
          <button
            type="button"
            onClick={() => onSelectProduct(products[0])}
            className="mt-7 inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:border-[#a855f7] hover:text-[#d6b4ff]"
          >
            View Package
          </button>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {products.map((product, index) => (
            <ProductCard
              key={product.name}
              product={product}
              priority={index === 0}
              onSelect={() => onSelectProduct(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  onSelect,
  priority = false,
}: {
  product: (typeof products)[number];
  onSelect: () => void;
  priority?: boolean;
}) {
  return (
    <article
      className="group mx-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-white/12 bg-[#0a070d]/95 text-white no-underline transition hover:-translate-y-1 hover:border-[#c51f35]/80 hover:shadow-[0_0_60px_rgba(197,31,53,0.28)]"
    >
      <div className="relative h-[330px] overflow-hidden border-b border-white/10 bg-[#070305]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          quality={100}
          sizes="(min-width: 1024px) 430px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-center transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09050a]/88 via-transparent to-black/5" />
        <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
          {product.badge}
        </span>
        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-x-5 bottom-5 mx-auto w-fit rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-black transition hover:scale-105"
        >
          View Details
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#bcaab3]">
          {product.description}
        </p>
        <div className="mt-8 flex items-center justify-between gap-3">
          <span className="text-xl font-black">{product.price}</span>
          <span className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-1 text-[10px] font-black uppercase tracking-wide">
            {product.status}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProductDetailsModal({
  product,
  onClose,
}: {
  product: (typeof products)[number] | null;
  onClose: () => void;
}) {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/78 px-4 py-6 backdrop-blur-sm">
      <section className="zentux-legal-modal grid max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[2rem] border border-[#a855f7]/35 bg-[#080512] shadow-[0_0_100px_rgba(168,85,247,0.26)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[360px] border-b border-white/10 bg-black lg:border-b-0 lg:border-r">
          <Image
            src={product.image}
            alt={product.name}
            fill
            quality={100}
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/12 to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
            {product.badge}
          </span>
          <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/55 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white backdrop-blur-xl">
            {product.status}
          </span>
        </div>

        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c76cff]">
                Zentux Package
              </p>
              <h2 className="mt-3 text-4xl font-black leading-tight text-white">
                {product.name}
              </h2>
              <p className="mt-3 text-lg font-semibold text-[#bfb5c9]">
                {product.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-black text-white transition hover:bg-white hover:text-black"
            >
              Close
            </button>
          </div>

          <div className="mt-7 rounded-2xl border border-[#a855f7]/30 bg-[#160821]/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b989ff]">
                  Complete license
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  One license unlocks every supported Zentux product.
                </h3>
              </div>
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-black">
                Included
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#c9c2d0]">
              Your active subscription works as a full Zentux package. The same
              license can validate supported apps like ZentuxOptimizer Pro and
              Zentux Autoclicker, as long as the subscription is active.
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailPoint title="Status" text="In stock and available." />
            <DetailPoint title="Delivery" text="License arrives by email after checkout." />
            <DetailPoint title="Validation" text="Online license check protects Pro access." />
            <DetailPoint title="Support" text="Help available through Discord and support links." />
          </div>

          <p className="mt-6 text-sm font-semibold leading-7 text-[#b9afc6]">
            {product.details}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-7 py-4 text-sm font-black text-white shadow-[0_0_45px_rgba(168,85,247,0.28)] transition hover:scale-[1.02]"
            >
              Buy Complete Package
            </a>
            <a
              href={product.downloadUrl}
              className="rounded-xl border border-white/15 bg-white/[0.04] px-7 py-4 text-sm font-black text-white transition hover:border-[#20e8f2] hover:text-[#20e8f2]"
            >
              Download This App
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function DetailPoint({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="mt-2 text-xs font-semibold leading-5 text-[#a69bb3]">
        {text}
      </p>
    </div>
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
        text="Current availability for Zentux products and online services."
      />

      <div className="mt-10 space-y-3 rounded-[28px] border border-white/10 bg-black/38 p-5 backdrop-blur-xl">
        <StatusRow name={OPTIMIZER_NAME} price="$3.00 / 15 days" status="Available" />
        <StatusRow name={AUTOCLICKER_NAME} price="Included" status="Available" />
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
          q="Is Zentux free?"
          a="No. Zentux products require an active subscription and valid license key."
        />
        <FaqItem
          q="How do I receive my license?"
          a="After checkout, the license key is sent to the email used during payment."
        />
        <FaqItem
          q="Will Zentux always increase FPS?"
          a="No tool can guarantee FPS gains in every game. Zentux focuses on useful gaming and performance utilities that improve the experience where possible."
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
