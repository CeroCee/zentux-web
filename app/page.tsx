"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

const BRAND_NAME = "Zentux";
const OPTIMIZER_NAME = "Zentux Optimizer Pro";
const AUTOCLICKER_NAME = "Zentux Autoclicker";
const MACRO_NAME = "Zentux Macro";
const CURSOR_NAME = "Zentux Cursor";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const optimizerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxOptimizer.exe";
const autoclickerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxAutoclicker.exe";
const macroDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxMacro.exe";
const cursorDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/Cursorv3Setup.exe";
const supportUrl = "https://guns.lol/cerocee";
const discordUrl = "https://discord.gg/KEWZHDQq6X";

const tabs = ["Home", "Products", "Reviews", "Status", "FAQ"] as const;
type Tab = (typeof tabs)[number];
type LegalPanel = "privacy" | "terms";

const languages = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

const tabLabels: Record<LanguageCode, Record<Tab, string>> = {
  es: { Home: "Home", Products: "Productos", Reviews: "Reviews", Status: "Estado", FAQ: "FAQ" },
  en: { Home: "Home", Products: "Products", Reviews: "Reviews", Status: "Status", FAQ: "FAQ" },
  de: { Home: "Home", Products: "Produkte", Reviews: "Bewertungen", Status: "Status", FAQ: "FAQ" },
  fr: { Home: "Accueil", Products: "Produits", Reviews: "Avis", Status: "Statut", FAQ: "FAQ" },
  it: { Home: "Home", Products: "Prodotti", Reviews: "Recensioni", Status: "Stato", FAQ: "FAQ" },
  pt: { Home: "Home", Products: "Produtos", Reviews: "Reviews", Status: "Status", FAQ: "FAQ" },
};

const copy = {
  es: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux es una marca premium de herramientas para mejorar tu experiencia en juegos: rendimiento, automatizacion, macros, soporte y acceso Pro protegido por licencia.",
    browseProducts: "Ver productos",
    joinSupport: "Soporte",
    productsSold: "productos vendidos",
    rating: "rating",
    price: "precio",
    support: "soporte",
    productsTitle: "Productos",
    productsText: "[HERRAMIENTAS PREMIUM - ENTREGA DE LICENCIA INSTANTANEA]",
    searchProducts: "Buscar productos",
    searchPlaceholder: "Buscar productos...",
    category: "Categoria",
    allProducts: "Todos",
    performance: "Performance",
    automation: "Automatizacion",
    sort: "Ordenar",
    popular: "Popular",
    name: "Nombre",
    zentuxAccess: "Zentux Access",
    accessText: "Una licencia activa desbloquea los productos premium Zentux compatibles.",
    showing: "Mostrando",
    buyPackage: "Comprar paquete completo",
    available: "Disponible",
    startingFrom: "Acceso",
    status: "Estado",
    options: "Opciones",
    viewDetails: "Ver detalles",
    packageLabel: "Paquete Zentux",
    close: "Cerrar",
    completeLicense: "Licencia completa",
    oneLicense: "Una licencia desbloquea los productos premium Zentux compatibles.",
    included: "Incluido",
    modalLicenseText:
      "Tu suscripcion activa funciona como un paquete completo de Zentux. La misma licencia puede validar Zentux Optimizer Pro, Zentux Autoclicker y Zentux Macro mientras la suscripcion siga activa.",
    delivery: "Entrega",
    validation: "Validacion",
    downloads: "Descargas",
    inStockText: "En stock y disponible.",
    licenseEmailText: "La licencia llega por email despues del pago.",
    validationText: "La validacion online protege el acceso Pro.",
    downloadUnavailable: "Descarga no disponible",
    downloadUnavailableText:
      "Las descargas se activaran dentro de esta ventana cuando cada app este lista.",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Opiniones reales de compradores Zentux despues de activar sus productos.",
    overallRating: "Overall rating",
    buyers: "Compradores",
    soldTitle: "Productos vendidos",
    soldText: "Una marca creada alrededor de herramientas premium, activacion online y soporte directo.",
    customer: "Cliente Zentux",
  },
  en: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux is a premium gaming brand building tools for performance, automation, macros, support, and license-protected Pro access.",
    browseProducts: "Browse Products",
    joinSupport: "Join Support",
    productsSold: "products sold",
    rating: "rating",
    price: "price",
    support: "support",
    productsTitle: "Products",
    productsText: "[PREMIUM TOOLS - INSTANT LICENSE DELIVERY]",
    searchProducts: "Search products",
    searchPlaceholder: "Search products...",
    category: "Category",
    allProducts: "All Products",
    performance: "Performance",
    automation: "Automation",
    sort: "Sort",
    popular: "Popular",
    name: "Name",
    zentuxAccess: "Zentux Access",
    accessText: "One active license unlocks supported premium Zentux products.",
    showing: "Showing",
    buyPackage: "Buy Complete Package",
    available: "Available",
    startingFrom: "Access",
    status: "Status",
    options: "Options",
    viewDetails: "View Details",
    packageLabel: "Zentux Package",
    close: "Close",
    completeLicense: "Complete license",
    oneLicense: "One license unlocks supported premium Zentux products.",
    included: "Included",
    modalLicenseText:
      "Your active subscription works as a full Zentux package. The same license can validate supported apps like Zentux Optimizer Pro, Zentux Autoclicker, and Zentux Macro, as long as the subscription is active.",
    delivery: "Delivery",
    validation: "Validation",
    downloads: "Downloads",
    inStockText: "In stock and available.",
    licenseEmailText: "License arrives by email after checkout.",
    validationText: "Online license check protects Pro access.",
    downloadUnavailable: "Download Unavailable",
    downloadUnavailableText:
      "Downloads will be enabled inside this details window when each app is ready.",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Real feedback from Zentux buyers after activation and support.",
    overallRating: "Overall rating",
    buyers: "Buyers",
    soldTitle: "Products sold",
    soldText: "Built around premium tools, online activation, and direct support.",
    customer: "Zentux customer",
  },
  de: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux is a premium gaming brand building tools for performance, automation, macros, support, and license-protected Pro access.",
    browseProducts: "Browse Products",
    joinSupport: "Join Support",
    productsSold: "products sold",
    rating: "rating",
    price: "price",
    support: "support",
    productsTitle: "Products",
    productsText: "[PREMIUM TOOLS - INSTANT LICENSE DELIVERY]",
    searchProducts: "Search products",
    searchPlaceholder: "Search products...",
    category: "Category",
    allProducts: "All Products",
    performance: "Performance",
    automation: "Automation",
    sort: "Sort",
    popular: "Popular",
    name: "Name",
    zentuxAccess: "Zentux Access",
    accessText: "One active license unlocks supported premium Zentux products.",
    showing: "Showing",
    buyPackage: "Buy Complete Package",
    available: "Available",
    startingFrom: "Access",
    status: "Status",
    options: "Options",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Real feedback from Zentux buyers after activation and support.",
    overallRating: "Overall rating",
    buyers: "Buyers",
    soldTitle: "Products sold",
    soldText: "Built around premium tools, online activation, and direct support.",
    customer: "Zentux customer",
  },
  fr: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux is a premium gaming brand building tools for performance, automation, macros, support, and license-protected Pro access.",
    browseProducts: "Browse Products",
    joinSupport: "Join Support",
    productsSold: "products sold",
    rating: "rating",
    price: "price",
    support: "support",
    productsTitle: "Products",
    productsText: "[PREMIUM TOOLS - INSTANT LICENSE DELIVERY]",
    searchProducts: "Search products",
    searchPlaceholder: "Search products...",
    category: "Category",
    allProducts: "All Products",
    performance: "Performance",
    automation: "Automation",
    sort: "Sort",
    popular: "Popular",
    name: "Name",
    zentuxAccess: "Zentux Access",
    accessText: "One active license unlocks supported premium Zentux products.",
    showing: "Showing",
    buyPackage: "Buy Complete Package",
    available: "Available",
    startingFrom: "Access",
    status: "Status",
    options: "Options",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Real feedback from Zentux buyers after activation and support.",
    overallRating: "Overall rating",
    buyers: "Buyers",
    soldTitle: "Products sold",
    soldText: "Built around premium tools, online activation, and direct support.",
    customer: "Zentux customer",
  },
  it: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux is a premium gaming brand building tools for performance, automation, macros, support, and license-protected Pro access.",
    browseProducts: "Browse Products",
    joinSupport: "Join Support",
    productsSold: "products sold",
    rating: "rating",
    price: "price",
    support: "support",
    productsTitle: "Products",
    productsText: "[PREMIUM TOOLS - INSTANT LICENSE DELIVERY]",
    searchProducts: "Search products",
    searchPlaceholder: "Search products...",
    category: "Category",
    allProducts: "All Products",
    performance: "Performance",
    automation: "Automation",
    sort: "Sort",
    popular: "Popular",
    name: "Name",
    zentuxAccess: "Zentux Access",
    accessText: "One active license unlocks supported premium Zentux products.",
    showing: "Showing",
    buyPackage: "Buy Complete Package",
    available: "Available",
    startingFrom: "Access",
    status: "Status",
    options: "Options",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Real feedback from Zentux buyers after activation and support.",
    overallRating: "Overall rating",
    buyers: "Buyers",
    soldTitle: "Products sold",
    soldText: "Built around premium tools, online activation, and direct support.",
    customer: "Zentux customer",
  },
  pt: {
    getHelp: "Get Help",
    homeTitleA: "Zentux",
    homeTitleB: "Products.",
    homeText:
      "Zentux is a premium gaming brand building tools for performance, automation, macros, support, and license-protected Pro access.",
    browseProducts: "Browse Products",
    joinSupport: "Join Support",
    productsSold: "products sold",
    rating: "rating",
    price: "price",
    support: "support",
    productsTitle: "Products",
    productsText: "[PREMIUM TOOLS - INSTANT LICENSE DELIVERY]",
    searchProducts: "Search products",
    searchPlaceholder: "Search products...",
    category: "Category",
    allProducts: "All Products",
    performance: "Performance",
    automation: "Automation",
    sort: "Sort",
    popular: "Popular",
    name: "Name",
    zentuxAccess: "Zentux Access",
    accessText: "One active license unlocks supported premium Zentux products.",
    showing: "Showing",
    buyPackage: "Buy Complete Package",
    available: "Available",
    startingFrom: "Access",
    status: "Status",
    options: "Options",
    reviewsTitle: "Customer Reviews",
    reviewsText: "Real feedback from Zentux buyers after activation and support.",
    overallRating: "Overall rating",
    buyers: "Buyers",
    soldTitle: "Products sold",
    soldText: "Built around premium tools, online activation, and direct support.",
    customer: "Zentux customer",
  },
} satisfies Record<LanguageCode, Record<string, string>>;

function t(language: LanguageCode) {
  return copy[language] ?? copy.en;
}

const featureCards = [
  ["🎮 Gaming Tools", "Utilities designed to improve how your PC and workflow feel while playing."],
  ["⚡ Optimizer", "Cleanup, RAM review, diagnostics, and game preparation tools."],
  ["🖱️ Autoclicker", "A compact click assistant with hotkeys, hold, toggle, and mouse movement tools."],
  ["🎬 Macro", "Record and replay actions with a cleaner, more advanced macro workflow."],
  ["🔐 License System", "One active Zentux license can unlock supported Zentux products."],
];

const products = [
  {
    name: OPTIMIZER_NAME,
    image: "/producto.png",
    badge: "Popular",
    description: "Windows performance optimizer",
    category: "Performance",
    price: "Included",
    status: "- In Stock",
    downloadUrl: optimizerDownloadUrl,
    details:
      "Zentux Optimizer Pro helps prepare Windows for gaming with cleaner tools, RAM review, startup control, game preparation, diagnostics, and license-protected Pro access.",
  },
  {
    name: AUTOCLICKER_NAME,
    image: "/zentux-autoclicker.png",
    badge: "New",
    description: "Gaming autoclicker with Hold and Toggle",
    category: "Automation",
    price: "Included",
    status: "- In Stock",
    downloadUrl: autoclickerDownloadUrl,
    details:
      "Zentux Autoclicker is built for fast click workflows with Hold mode, Toggle mode, configurable hotkeys, mouse button support, and a compact gamer interface.",
  },
  {
    name: MACRO_NAME,
    image: "/zentux-macro.png",
    badge: "Included",
    description: "Advanced macro recorder and repeater",
    category: "Automation",
    price: "Included",
    status: "- In Stock",
    downloadUrl: macroDownloadUrl,
    details:
      "Zentux Macro records your mouse and keyboard actions, then repeats them with a cleaner interface and more control than basic macro tools. It is designed for users who want a more advanced TinyTask-style workflow inside the Zentux package.",
  },
  {
    name: CURSOR_NAME,
    image: "/zentux-cursor.png",
    badge: "Free",
    description: "Custom cursor app for your favorite games",
    category: "Automation",
    price: "Free",
    status: "- In Stock",
    downloadUrl: cursorDownloadUrl,
    details:
      "Zentux Cursor lets you personalize your cursor for your favorite games with a bold gamer style, quick setup, saved cursor profiles, and a free installer download.",
  },
];

const reviews = [
  "Clean interface and easy activation for the full Zentux package.",
  "I like that one license works across the supported Zentux apps.",
  "The optimizer tools are useful before playing.",
  "The autoclicker feels simple and fast to set up.",
  "The license email arrived quickly after checkout.",
  "Excited for Macro because recording and repeating actions saves time.",
];

function usageHash(value: number) {
  let hash = value ^ 0x5f3759df;
  hash = Math.imul(hash ^ (hash >>> 16), 0x45d9f3b);
  hash ^= hash >>> 16;
  return Math.abs(hash);
}

function isUsageUpdateBlock(timeBlock: number) {
  return timeBlock % 75 === 0 || usageHash(timeBlock) % 100 < 4;
}

function getLatestUsageUpdateBlock() {
  const currentBlock = Math.floor(Date.now() / 4000);

  for (let offset = 0; offset <= 75; offset += 1) {
    const candidate = currentBlock - offset;
    if (isUsageUpdateBlock(candidate)) {
      return candidate;
    }
  }

  return currentBlock;
}

function getSharedAppUsageCount() {
  const timeBlock = getLatestUsageUpdateBlock();
  const dailyActivity =
    135 + ((Math.sin((timeBlock / 21600) * Math.PI * 2) + 1) / 2) * 120;
  const naturalVariation =
    Math.sin((timeBlock / 5400) * Math.PI * 2) * 18 +
    Math.sin((timeBlock / 1800) * Math.PI * 2) * 5;
  const smallChange = (usageHash(timeBlock + 17) % 3) - 1;

  return Math.min(
    697,
    Math.max(96, Math.round(dailyActivity + naturalVariation + smallChange)),
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [language, setLanguage] = useState<LanguageCode>("es");
  const labels = t(language);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
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

  useEffect(() => {
    setOnlineCount(getSharedAppUsageCount());

    const timer = window.setInterval(() => {
      setOnlineCount(getSharedAppUsageCount());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

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
                {tabLabels[language][tab]}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <OnlineVisitors language={language} count={onlineCount} />
            <LanguageMenu language={language} setLanguage={setLanguage} />
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[#a855f7]/55 bg-black/35 px-5 py-2.5 text-sm font-black text-[#d6b4ff] backdrop-blur-xl transition hover:bg-[#a855f7] hover:text-white md:inline-flex"
            >
              {labels.getHelp}
            </a>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-5 pb-12 pt-28 sm:px-7 lg:pt-32">
        {activeTab === "Home" && (
          <HomePanel
            labels={labels}
            setActiveTab={setActiveTab}
            onOpenLegal={setLegalPanel}
          />
        )}
        {activeTab === "Products" && (
          <ProductsPanel labels={labels} onSelectProduct={setSelectedProduct} />
        )}
        {activeTab === "Reviews" && <ReviewsPanel labels={labels} />}
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
        labels={labels}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}

function OnlineVisitors({
  language,
  count,
}: {
  language: LanguageCode;
  count: number | null;
}) {
  const labels: Record<LanguageCode, string> = {
    en: "People using the apps",
    es: "Personas usando las apps",
    de: "Personen nutzen die Apps",
    fr: "Personnes utilisant les apps",
    it: "Persone che usano le app",
    pt: "Pessoas usando os apps",
  };

  return (
    <div
      className="hidden items-center gap-2.5 rounded-full border border-[#a855f7]/50 bg-black/45 px-4 py-2.5 text-xs font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.2)] backdrop-blur-xl xl:flex"
      title={
        language === "es"
          ? "Estimacion de personas usando las aplicaciones"
          : "Estimated people using the apps"
      }
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
      </span>
      <span>{labels[language]}</span>
      <span className="min-w-6 text-right text-[#d684ff]">{count ?? "..."}</span>
    </div>
  );
}

function LanguageMenu({
  language,
  setLanguage,
}: {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/45 text-lg shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl transition hover:border-[#a855f7]/60"
        aria-label="Change language"
      >
        {selected.flag}
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-[90] w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#101017]/95 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#9c91aa]">
              Idioma
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-sm font-black text-white transition hover:bg-white/20"
              aria-label="Close language menu"
            >
              X
            </button>
          </div>
          <div className="max-h-72 overflow-y-auto pr-1">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold transition ${
                  language === item.code
                    ? "bg-white/10 text-white"
                    : "text-[#d8d2df] hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span>{item.flag}</span>
                  {item.label}
                </span>
                {language === item.code && <span>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function HomePanel({
  labels,
  setActiveTab,
  onOpenLegal,
}: {
  labels: Record<string, string>;
  setActiveTab: (tab: Tab) => void;
  onOpenLegal: (panel: LegalPanel) => void;
}) {
  return (
    <div className="space-y-14">
      <section className="grid min-h-[calc(100vh-9rem)] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <h1 className="max-w-3xl text-6xl font-black leading-[0.92] tracking-tight text-white sm:text-7xl lg:text-8xl">
            {labels.homeTitleA}
            <span className="block bg-gradient-to-r from-[#d85cff] to-[#7c6bff] bg-clip-text text-transparent">
              {labels.homeTitleB}
            </span>
          </h1>
          <p className="mt-7 max-w-xl text-lg font-semibold leading-8 text-[#a69bb3]">
            {labels.homeText}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("Products")}
              className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-8 py-4 text-sm font-black text-white shadow-[0_0_45px_rgba(168,85,247,0.35)] transition hover:scale-[1.02]"
            >
              {labels.browseProducts}
            </button>
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-white/15 bg-black/25 px-8 py-4 text-sm font-black text-white transition hover:border-[#a855f7]"
            >
              {labels.joinSupport}
            </a>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-2 gap-3 border-y border-white/10 py-6 sm:grid-cols-4">
            <HeroStat value="6,800+" label={labels.productsSold} />
            <HeroStat value="4.68" label={labels.rating} />
            <HeroStat value="$3" label={labels.price} />
            <HeroStat value="24/7" label={labels.support} />
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
  labels,
  onSelectProduct,
}: {
  labels: Record<string, string>;
  onSelectProduct: (product: (typeof products)[number]) => void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | "Performance" | "Automation">("All");
  const [sort, setSort] = useState("Popular");
  const visibleProducts = products
    .filter((product) => category === "All" || product.category === category)
    .filter((product) =>
      `${product.name} ${product.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) => {
      if (sort === "Name") {
        return a.name.localeCompare(b.name);
      }

      return products.indexOf(a) - products.indexOf(b);
    });

  return (
    <section className="py-10">
      <PanelTitle
        label={labels.productsTitle}
        title={labels.productsTitle}
        text={labels.productsText}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-[24px] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a69bb3]">
              {labels.searchProducts}
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full bg-transparent text-sm font-bold text-white outline-none placeholder:text-[#756b80]"
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a69bb3]">
              {labels.category}
            </p>
            <div className="mt-4 space-y-2">
              <CategoryButton
                active={category === "All"}
                label={labels.allProducts}
                count={products.length}
                onClick={() => setCategory("All")}
              />
              <CategoryButton
                active={category === "Performance"}
                label={labels.performance}
                count={products.filter((product) => product.category === "Performance").length}
                onClick={() => setCategory("Performance")}
              />
              <CategoryButton
                active={category === "Automation"}
                label={labels.automation}
                count={products.filter((product) => product.category === "Automation").length}
                onClick={() => setCategory("Automation")}
              />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-black/45 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#a69bb3]">
              {labels.sort}
            </p>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="mt-4 w-full rounded-xl border border-white/10 bg-[#121018] px-4 py-3 text-sm font-black text-white outline-none"
            >
              <option>Popular</option>
              <option>Name</option>
            </select>
          </div>

          <div className="rounded-[24px] border border-[#a855f7]/20 bg-[#13071f]/70 p-5 backdrop-blur-xl">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b989ff]">
              {labels.zentuxAccess}
            </p>
            <h3 className="mt-3 text-2xl font-black">6,800+ sold</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-[#bfb5c9]">
              {labels.accessText}
            </p>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-bold text-[#a69bb3]">
              {labels.showing} {visibleProducts.length} / {products.length}
            </p>
            <a
              href={checkoutUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2 text-xs font-black text-black transition hover:scale-[1.03]"
            >
              {labels.buyPackage}
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.name}
                product={product}
                labels={labels}
                priority={index === 0}
                onSelect={() => onSelectProduct(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryButton({
  active,
  label,
  count,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-black transition ${
        active
          ? "border-white/25 bg-white/15 text-white"
          : "border-white/10 bg-white/[0.035] text-[#bfb8c8] hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
      <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
        {count}
      </span>
    </button>
  );
}

function ProductsPanelLegacy({
  onSelectProduct,
}: {
  onSelectProduct: (product: (typeof products)[number]) => void;
}) {
  const [packageIndex, setPackageIndex] = useState(0);
  const selectedPackage = products[packageIndex];
  const previousPackage = () =>
    setPackageIndex((current) =>
      current === 0 ? products.length - 1 : current - 1,
    );
  const nextPackage = () =>
    setPackageIndex((current) =>
      current === products.length - 1 ? 0 : current + 1,
    );

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
          <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={previousPackage}
                aria-label="Previous package"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-2xl font-black text-white transition hover:border-[#c75cff] hover:bg-[#c75cff]/20"
              >
                ‹
              </button>
              <div className="min-w-0 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#b989ff]">
                  Package preview
                </p>
                <h4 className="mt-1 truncate text-xl font-black text-white">
                  {selectedPackage.name}
                </h4>
                <p className="mt-1 text-xs font-semibold text-[#a69bb3]">
                  {selectedPackage.price} • {selectedPackage.status}
                </p>
              </div>
              <button
                type="button"
                onClick={nextPackage}
                aria-label="Next package"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 text-2xl font-black text-white transition hover:border-[#c75cff] hover:bg-[#c75cff]/20"
              >
                ›
              </button>
            </div>

            <button
              type="button"
              onClick={() => onSelectProduct(selectedPackage)}
              className="mt-4 inline-flex w-full justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-black transition hover:border-[#a855f7] hover:text-[#d6b4ff]"
            >
              View Package
            </button>
          </div>
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
  labels = copy.en,
  onSelect,
  priority = false,
}: {
  product: (typeof products)[number];
  labels?: Record<string, string>;
  onSelect: () => void;
  priority?: boolean;
}) {
  const isFreeProduct = product.price === "Free";

  return (
    <article
      className="group mx-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-white/12 bg-[#0a070d]/95 text-white no-underline transition hover:-translate-y-1 hover:border-[#c75cff]/80 hover:shadow-[0_0_60px_rgba(168,85,247,0.24)]"
    >
      <div className="relative h-[360px] overflow-hidden border-b border-white/10 bg-[#070305]">
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
        <span className="absolute right-5 top-5 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white backdrop-blur-xl">
          {product.category}
        </span>
        <button
          type="button"
          onClick={onSelect}
          className="absolute inset-x-5 bottom-5 mx-auto w-fit rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-black transition hover:scale-105"
        >
          {labels.viewDetails ?? copy.en.viewDetails}
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-black">{product.name}</h3>
        <p className="mt-2 text-sm leading-6 text-[#bcaab3]">
          {product.description}
        </p>
        <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs font-black uppercase tracking-wide text-[#9f93aa]">
          <div className="flex justify-between gap-3">
            <span>{labels.status}</span>
            <span className="text-[#59ffb7]">{product.status}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>{labels.category}</span>
            <span className="text-white">{product.category}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span>{labels.options}</span>
            <span className="text-white">
              {isFreeProduct ? "Free download" : "Complete package"}
            </span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="text-xl font-black">{product.price}</span>
          <span className="rounded-full border border-white/20 bg-white/[0.05] px-4 py-1 text-[10px] font-black uppercase tracking-wide">
            {labels.available}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProductDetailsModal({
  product,
  labels,
  onClose,
}: {
  product: (typeof products)[number] | null;
  labels: Record<string, string>;
  onClose: () => void;
}) {
  if (!product) {
    return null;
  }
  const isFreeProduct = product.price === "Free";

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
                {isFreeProduct ? "Free Tool" : labels.packageLabel ?? copy.en.packageLabel}
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
              {labels.close ?? copy.en.close}
            </button>
          </div>

          <div className="mt-7 rounded-2xl border border-[#a855f7]/30 bg-[#160821]/70 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b989ff]">
                  {isFreeProduct ? "Free download" : labels.completeLicense ?? copy.en.completeLicense}
                </p>
                <h3 className="mt-2 text-2xl font-black text-white">
                  {isFreeProduct ? "No package required." : labels.oneLicense ?? copy.en.oneLicense}
                </h3>
              </div>
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-black">
                {isFreeProduct ? "Free" : labels.included ?? copy.en.included}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#c9c2d0]">
              {isFreeProduct
                ? "Zentux Cursor is a free app. Download the installer directly and use it to personalize your cursor in supported games."
                : labels.modalLicenseText ?? copy.en.modalLicenseText}
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailPoint
              title={labels.status ?? copy.en.status}
              text={labels.inStockText ?? copy.en.inStockText}
            />
            <DetailPoint
              title={labels.delivery ?? copy.en.delivery}
              text={labels.licenseEmailText ?? copy.en.licenseEmailText}
            />
            <DetailPoint
              title={labels.validation ?? copy.en.validation}
              text={labels.validationText ?? copy.en.validationText}
            />
            <DetailPoint
              title={labels.downloads ?? copy.en.downloads}
              text={
                isFreeProduct
                  ? "The Zentux Cursor installer is available now as a free download."
                  : labels.downloadUnavailableText ?? copy.en.downloadUnavailableText
              }
            />
          </div>

          <p className="mt-6 text-sm font-semibold leading-7 text-[#b9afc6]">
            {product.details}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {isFreeProduct ? (
              <a
                href={product.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl bg-gradient-to-r from-[#59ffb7] to-[#8cff5f] px-7 py-4 text-sm font-black text-black shadow-[0_0_45px_rgba(89,255,183,0.22)] transition hover:scale-[1.02]"
              >
                Download Free
              </a>
            ) : (
              <>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-7 py-4 text-sm font-black text-white shadow-[0_0_45px_rgba(168,85,247,0.28)] transition hover:scale-[1.02]"
                >
                  {labels.buyPackage ?? copy.en.buyPackage}
                </a>
                <button
                  type="button"
                  disabled
                  title="Downloads will be enabled when the app builds are ready."
                  className="cursor-not-allowed rounded-xl border border-white/10 bg-white/[0.035] px-7 py-4 text-sm font-black text-[#8f849a] opacity-80"
                >
                  {labels.downloadUnavailable ?? copy.en.downloadUnavailable}
                </button>
              </>
            )}
          </div>
          {!isFreeProduct && (
            <p className="mt-3 text-xs font-bold text-[#8f849a]">
              {labels.downloadUnavailableText ?? copy.en.downloadUnavailableText}
            </p>
          )}
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

function ReviewsPanel({ labels }: { labels: Record<string, string> }) {
  const ratingRows = [
    { label: "5 star", value: "78%", count: "5,304" },
    { label: "4 star", value: "15%", count: "1,020" },
    { label: "3 star", value: "5%", count: "340" },
    { label: "2 star", value: "1.5%", count: "102" },
    { label: "1 star", value: "0.5%", count: "34" },
  ];

  return (
    <section className="py-10">
      <PanelTitle
        label="Reviews"
        title={labels.reviewsTitle}
        text={labels.reviewsText}
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <div className="rounded-[28px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl lg:col-span-2">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            {labels.overallRating}
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-4">
            <span className="text-6xl font-black">4.68</span>
            <span className="pb-2 text-3xl font-black text-[#ffd36b] drop-shadow-[0_0_18px_rgba(255,211,107,0.45)]">
              {"★★★★★"}
            </span>
            <span className="pb-3 text-sm text-[#a69bb3]">{labels.buyers}</span>
          </div>
          <div className="mt-6 space-y-3">
            {ratingRows.map((row) => (
              <RatingBar
                key={row.label}
                label={row.label}
                value={row.value}
                count={row.count}
              />
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-black/38 p-7 backdrop-blur-xl">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#a69bb3]">
            {labels.soldTitle}
          </p>
          <div className="mt-4 text-5xl font-black">6,800+</div>
          <p className="mt-4 leading-7 text-[#c9c2d0]">
            {labels.soldText}
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
                <p className="font-black">{labels.buyers}</p>
                <p className="text-xs text-[#a69bb3]">{labels.customer}</p>
              </div>
            </div>
            <p className="text-2xl font-black text-[#ffd36b] drop-shadow-[0_0_14px_rgba(255,211,107,0.35)]">
              {"★★★★★"}
            </p>
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
        <StatusRow name={OPTIMIZER_NAME} price="Included" status="Available" />
        <StatusRow name={AUTOCLICKER_NAME} price="Included" status="Available" />
        <StatusRow name={MACRO_NAME} price="Included" status="Available" />
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
          q="💳 Is Zentux free?"
          a="No. Zentux premium apps are subscription based. One active license unlocks supported Zentux products included in the package. Zentux Cursor is free."
        />
        <FaqItem
          q="📩 How do I receive my license?"
          a="After checkout, the license key is sent to the email used during payment. Paste it inside a supported Zentux app to validate access."
        />
        <FaqItem
          q="📦 What is included?"
          a="The package includes supported Zentux products like Zentux Optimizer Pro, Zentux Autoclicker, and Zentux Macro when those builds are available. Zentux Cursor is available as a separate free download."
        />
        <FaqItem
          q="⬇️ Can I download the apps now?"
          a="Downloads are temporarily unavailable while the apps are being finished. They will be enabled from each product's View Details window."
        />
        <FaqItem
          q="🎮 Will Zentux always increase FPS?"
          a="No tool can guarantee FPS gains in every game. Zentux focuses on useful gaming and performance utilities that improve the experience where possible."
        />
        <FaqItem
          q="💬 Where can I get help?"
          a="Use the Get Help or Discord buttons to contact Zentux support for app questions, setup help, or optional PC performance help."
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
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#ffd36b] via-[#ff6bd5] to-[#8b76ff] shadow-[0_0_16px_rgba(255,211,107,0.32)]"
          style={{ width: value }}
        />
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
