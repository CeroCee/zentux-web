"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import TeamShowcase from "@/components/TeamShowcase";
import { RewardsPanel } from "@/components/RewardsPanel";
import { ProfileMenu } from "@/components/ProfileMenu";
import { ProfilePanel } from "@/components/ProfilePanel";
import { AuthenticatedCheckoutLink } from "@/components/AuthenticatedCheckoutLink";

const BRAND_NAME = "Zentux";
const OPTIMIZER_NAME = "Zentux Optimizer Pro";
const AUTOCLICKER_NAME = "Zentux v7";
const FREE_AUTOCLICKER_NAME = "Zentux v6";
const MACRO_NAME = "Zentux Macro";
const CURSOR_NAME = "Zentux Cursor";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const licenseApiBaseUrl = (
  process.env.NEXT_PUBLIC_LICENSE_API_URL ?? "https://zentuxlicenseserver2.onrender.com"
).replace(/\/+$/, "");
const optimizerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/zentux.optimizer.exe";
const autoclickerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/Zentux.v7.exe";
const macroDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxMacro.exe";
const cursorDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/Cursorv3Setup.exe";
const freeAutoclickerDownloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/Zentux.v6.exe";
const pricingPlans = [
  {
    id: "15-days",
    label: "15 dias",
    price: "$1.79 USD",
  },
  {
    id: "30-days",
    label: "30 dias",
    price: "$3.58 USD",
  },
  {
    id: "7-months",
    label: "7 meses",
    price: "$25 USD",
  },
] as const;
const supportUrl = "https://guns.lol/cerocee";
const discordUrl = "https://discord.gg/KEWZHDQq6X";
const licenseApiUrl = (
  process.env.NEXT_PUBLIC_LICENSE_API_URL ?? "https://zentuxlicenseserver2.onrender.com"
).replace(/\/+$/, "");

const tabs = ["Home", "Products", "Rewards", "Reviews", "FAQ", "Meet The Team", "Profile"] as const;
type Tab = (typeof tabs)[number];
type LegalPanel = "privacy" | "terms";
const desktopTabs: Tab[] = ["Home", "Products", "Rewards", "Reviews"];
const moreTabs: Tab[] = ["FAQ", "Meet The Team"];

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
  es: { Home: "Home", Products: "Productos", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "Mi Perfil" },
  en: { Home: "Home", Products: "Products", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "My Profile" },
  de: { Home: "Home", Products: "Produkte", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "Profil" },
  fr: { Home: "Accueil", Products: "Produits", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "Profil" },
  it: { Home: "Home", Products: "Prodotti", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "Profilo" },
  pt: { Home: "Home", Products: "Produtos", Rewards: "Rewards", Reviews: "Reviews", FAQ: "FAQ", "Meet The Team": "Meet The Team", Profile: "Perfil" },
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
    personalization: "Personalizacion",
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
      "Tu suscripcion activa funciona como un paquete completo de Zentux. La misma licencia puede validar Zentux Optimizer Pro, Zentux v7 y Zentux Macro mientras la suscripcion siga activa.",
    delivery: "Entrega",
    validation: "Validacion",
    downloads: "Descargas",
    inStockText: "En stock y disponible.",
    licenseEmailText: "La licencia llega por email despues del pago.",
    validationText: "La validacion online protege el acceso Pro.",
    downloadUnavailable: "Descarga no disponible",
    downloadUnavailableText:
      "Las descargas se activaran dentro de esta ventana cuando cada app este lista.",
    startingPrice: "Precio inicial",
    optionLabel: "Opcion",
    purchaseNow: "Comprar ahora",
    paymentLinkPending: "Enlace de pago pendiente",
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
    personalization: "Personalization",
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
      "Your active subscription works as a full Zentux package. The same license can validate supported apps like Zentux Optimizer Pro, Zentux v7, and Zentux Macro, as long as the subscription is active.",
    delivery: "Delivery",
    validation: "Validation",
    downloads: "Downloads",
    inStockText: "In stock and available.",
    licenseEmailText: "License arrives by email after checkout.",
    validationText: "Online license check protects Pro access.",
    downloadUnavailable: "Download Unavailable",
    downloadUnavailableText:
      "Downloads will be enabled inside this details window when each app is ready.",
    startingPrice: "Starting price",
    optionLabel: "Option",
    purchaseNow: "Purchase now",
    paymentLinkPending: "Payment link pending",
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
    personalization: "Personnalisation",
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
    personalization: "Personalizzazione",
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
    personalization: "Personalizacao",
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
    downloadActive: true,
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
    downloadActive: true,
    details:
      "Zentux v7 is the premium autoclicker built for fast click workflows with Hold mode, Toggle mode, configurable hotkeys, mouse button support, and a compact gamer interface.",
  },
  {
    name: FREE_AUTOCLICKER_NAME,
    image: "/zentux-v6.png",
    badge: "Free",
    description: "Free autoclicker with no license required",
    category: "Free",
    price: "Free",
    status: "- In Stock",
    downloadUrl: freeAutoclickerDownloadUrl,
    downloadActive: true,
    details:
      "Zentux v6 is a free autoclicker made for simple click automation without a license. Download it, open it, and use the basic autoclick tools without needing a Zentux subscription.",
  },
  {
    name: MACRO_NAME,
    image: "/zentux-macro.png",
    badge: "Included",
    description: "Advanced macro recorder and repeater",
    category: "Automation",
    price: "Included",
    status: "- No disponible",
    downloadUrl: macroDownloadUrl,
    downloadActive: false,
    details:
      "Zentux Macro records your mouse and keyboard actions, then repeats them with a cleaner interface and more control than basic macro tools. It is designed for users who want a more advanced TinyTask-style workflow inside the Zentux package.",
  },
  {
    name: CURSOR_NAME,
    image: "/zentux-cursor.png",
    badge: "Free",
    description: "Custom cursor app for your favorite games",
    category: "Free",
    price: "Free",
    status: "- In Stock",
    downloadUrl: cursorDownloadUrl,
    downloadActive: true,
    details:
      "Zentux Cursor lets you personalize your cursor for your favorite games with a bold gamer style, quick setup, saved cursor profiles, and a free installer download.",
  },
];

const creatorVideos = [
  {
    creator: "Zhowtime13",
    platform: "TikTok",
    description: "Zentux review and gameplay test",
    embedUrl: "https://www.tiktok.com/embed/v2/7584919414978432276",
    videoUrl: "https://www.tiktok.com/@zhowt1m3/video/7584919414978432276",
    creatorUrl: "https://www.tiktok.com/@zhowt1m3",
  },
  {
    creator: "Darkxz_FVM",
    platform: "TikTok",
    description: "Zentux Cursor setup and gameplay review",
    embedUrl: "https://www.tiktok.com/embed/v2/7594255665476979976",
    videoUrl: "https://www.tiktok.com/@darkxz_fvm/video/7594255665476979976",
    creatorUrl: "https://www.tiktok.com/@darkxz_fvm",
  },
  {
    creator: "rdangel0880",
    platform: "TikTok",
    description: "Zentux creator showcase and community test",
    embedUrl: "https://www.tiktok.com/embed/v2/7557904027854392587",
    videoUrl: "https://www.tiktok.com/@rdangel0880/video/7557904027854392587",
    creatorUrl: "https://www.tiktok.com/@rdangel0880",
  },
  {
    creator: "Zhowtime13",
    platform: "TikTok",
    description: "Zentux Cursor and Zentux v7 combo test",
    embedUrl: "https://www.tiktok.com/embed/v2/7602112098117700884",
    videoUrl: "https://www.tiktok.com/@zhowt1m3/video/7602112098117700884",
    creatorUrl: "https://www.tiktok.com/@zhowt1m3",
  },
  {
    creator: "1mspeedx",
    platform: "TikTok",
    description: "Zentux v7 gameplay review",
    embedUrl: "https://www.tiktok.com/embed/v2/7557722639482080524",
    videoUrl: "https://www.tiktok.com/@1mspeedx/video/7557722639482080524",
    creatorUrl: "https://www.tiktok.com/@1mspeedx",
  },
];

type DiscordOnlineResponse = {
  success?: boolean;
  onlineCount?: number | null;
  fresh?: boolean;
};

const DISCORD_ONLINE_REFRESH_MS = 15000;

async function fetchDiscordOnlineCount() {
  const response = await fetch(`${licenseApiUrl}/api/site/discord-online`, {
    cache: "no-store",
  });
  if (!response.ok) return null;

  const data = (await response.json()) as DiscordOnlineResponse;
  if (data.success === false || data.fresh === false) return null;
  return typeof data.onlineCount === "number" ? data.onlineCount : null;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const language: LanguageCode = "es";
  const labels = t(language);
  const [onlineCount, setOnlineCount] = useState<number | null>(null);
  const [showDiscordBubble, setShowDiscordBubble] = useState(true);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalPanel, setLegalPanel] = useState<LegalPanel | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[number] | null
  >(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const search = new URLSearchParams(window.location.search);
      if (search.get("tab") === "rewards") setActiveTab("Rewards");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

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
    let cancelled = false;

    const loadOnlineCount = async () => {
      const count = await fetchDiscordOnlineCount().catch(() => null);
      if (!cancelled) setOnlineCount(count);
    };

    void loadOnlineCount();
    const timer = window.setInterval(() => {
      void loadOnlineCount();
    }, DISCORD_ONLINE_REFRESH_MS);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("license_session");
    if (!sessionId) return;

    const storageKey = `zentux-license-result:${sessionId}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");

    const verifyLicenseCheckout = async () => {
      for (let attempt = 0; attempt < 5; attempt += 1) {
        try {
          const response = await fetch(`${licenseApiBaseUrl}/api/web/license/result`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });
          if (response.ok) {
            const data = await response.json().catch(() => null);
            if (data?.status === "fulfilled") break;
          }
        } catch (error) {
          console.warn("License checkout verification failed:", error);
        }
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }
    };

    void verifyLicenseCheckout();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paypal_success") !== "1") return;

    const subscriptionId = window.sessionStorage.getItem("zentux-paypal-subscription-id");
    if (!subscriptionId) return;

    const storageKey = `zentux-paypal-result:${subscriptionId}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");

    const verifyPayPalCheckout = async () => {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        try {
          const response = await fetch(`${licenseApiBaseUrl}/api/web/license/paypal/result`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ subscriptionId }),
          });
          if (response.ok) {
            const data = await response.json().catch(() => null);
            if (data?.status === "fulfilled") {
              window.sessionStorage.removeItem("zentux-paypal-subscription-id");
              break;
            }
          }
        } catch (error) {
          console.warn("PayPal license checkout verification failed:", error);
        }
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }
    };

    void verifyPayPalCheckout();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paypal_order_success") !== "1") return;

    const orderId = window.sessionStorage.getItem("zentux-paypal-order-id") || params.get("token");
    if (!orderId) return;

    const storageKey = `zentux-paypal-order-result:${orderId}`;
    if (window.sessionStorage.getItem(storageKey)) return;
    window.sessionStorage.setItem(storageKey, "1");

    const capturePayPalOrder = async () => {
      for (let attempt = 0; attempt < 8; attempt += 1) {
        try {
          const response = await fetch(`${licenseApiBaseUrl}/api/web/license/paypal/order/capture`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          if (response.ok) {
            const data = await response.json().catch(() => null);
            if (data?.status === "fulfilled") {
              window.sessionStorage.removeItem("zentux-paypal-order-id");
              break;
            }
          }
        } catch (error) {
          console.warn("PayPal one-time license checkout verification failed:", error);
        }
        await new Promise((resolve) => window.setTimeout(resolve, 1500));
      }
    };

    void capturePayPalOrder();
  }, []);

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setMoreOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05010b] text-white">
      <SiteBackground />

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <button
            onClick={() => selectTab("Home")}
            className="flex min-w-0 items-center gap-3 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur-xl transition hover:border-[#a855f7]/60"
          >
            <Image
              src="/logo-web.png"
              alt="Zentux logo"
              width={38}
              height={38}
              className="rounded-full object-cover"
              priority
            />
            <div className="hidden text-left sm:block">
              <div className="text-sm font-black leading-none">{BRAND_NAME}</div>
              <div className="mt-1 text-[11px] font-bold text-[#b989ff]">
                Gaming Tools
              </div>
            </div>
          </button>

          <nav className="hidden items-center rounded-full border border-white/10 bg-black/45 p-1 text-xs font-black text-[#bfb8c8] shadow-[0_0_60px_rgba(168,85,247,0.08)] backdrop-blur-xl md:flex lg:text-sm">
            {desktopTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => selectTab(tab)}
                className={`rounded-full px-4 py-2 transition lg:px-5 ${
                  activeTab === tab
                    ? "border border-[#a855f7]/70 bg-[#160821]/80 text-white shadow-[0_0_24px_rgba(168,85,247,0.28)]"
                    : "hover:bg-white/10 hover:text-white"
                }`}
              >
                {tabLabels[language][tab]}
              </button>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                className={`rounded-full px-4 py-2 transition lg:px-5 ${
                  moreTabs.includes(activeTab)
                    ? "border border-[#a855f7]/70 bg-[#160821]/80 text-white shadow-[0_0_24px_rgba(168,85,247,0.28)]"
                    : "hover:bg-white/10 hover:text-white"
                }`}
              >
                More <span className="text-[#b989ff]">▼</span>
              </button>
              {moreOpen && (
                <div className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 rounded-2xl border border-[#a855f7]/25 bg-black/80 p-2 shadow-[0_0_50px_rgba(168,85,247,0.22)] backdrop-blur-2xl">
                  {moreTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => selectTab(tab)}
                      className={`block w-full rounded-xl px-4 py-3 text-left text-sm transition ${
                        activeTab === tab
                          ? "border border-[#a855f7]/50 bg-[#160821] text-white"
                          : "text-[#d8d2df] hover:bg-white/[0.06] hover:text-white"
                      }`}
                    >
                      {tabLabels[language][tab]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <OnlineVisitors count={onlineCount} />
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[#a855f7]/55 bg-black/35 px-5 py-2.5 text-sm font-black text-[#d6b4ff] backdrop-blur-xl transition hover:bg-[#a855f7] hover:text-white md:inline-flex"
            >
              {labels.getHelp}
            </a>
            <ProfileMenu onOpenProfile={() => selectTab("Profile")} />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#a855f7]/35 bg-black/45 text-xl font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.16)] backdrop-blur-xl transition hover:border-[#a855f7] md:hidden"
            aria-label="Open navigation menu"
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="mx-auto mt-3 max-w-7xl px-1 md:hidden">
            <div className="zentux-mobile-menu rounded-[28px] border border-[#a855f7]/30 bg-black/78 p-3 shadow-[0_0_70px_rgba(168,85,247,0.24)] backdrop-blur-2xl">
              <div className="grid gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => selectTab(tab)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm font-black transition ${
                      activeTab === tab
                        ? "border border-[#a855f7]/60 bg-[#160821] text-white shadow-[0_0_22px_rgba(168,85,247,0.24)]"
                        : "text-[#d8d2df] hover:bg-white/[0.06] hover:text-white"
                    }`}
                  >
                    {tabLabels[language][tab]}
                  </button>
                ))}
              </div>

              <div className="mt-3 grid gap-2 border-t border-white/10 pt-3">
                <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                  <span className="text-sm font-black text-white">
                    🟢 Online {onlineCount ?? "..."}
                  </span>
                </div>
                <a
                  href={supportUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-[#a855f7]/45 bg-[#160821]/70 px-4 py-3 text-center text-sm font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.16)]"
                >
                  {labels.getHelp}
                </a>
              </div>
            </div>
          </div>
        )}
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
        {activeTab === "Rewards" && <RewardsPanel onBackHome={() => selectTab("Home")} />}
        {activeTab === "Profile" && <ProfilePanel />}
        {activeTab === "Reviews" && <ReviewsPanel />}
        {activeTab === "FAQ" && <FaqPanel />}
        {activeTab === "Meet The Team" && <TeamShowcase />}
      </div>

      <DiscordBubble
        visible={showDiscordBubble && activeTab === "Home"}
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
  count,
}: {
  count: number | null;
}) {
  return (
    <div
      className="hidden items-center gap-2 rounded-full border border-[#a855f7]/50 bg-black/45 px-3 py-2.5 text-xs font-black text-white shadow-[0_0_28px_rgba(168,85,247,0.2)] backdrop-blur-xl lg:flex"
      title="Discord members online"
    >
      <span>🟢 Online</span>
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
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/45 text-xs font-black uppercase text-white shadow-[0_0_35px_rgba(168,85,247,0.12)] backdrop-blur-xl transition hover:border-[#a855f7]/60"
        aria-label="Change language"
      >
        {selected.code}
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
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Zentux",
      url: "https://zentux.gg",
      logo: "https://zentux.gg/logo-web.png",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Zentux",
      alternateName: "Zentux Gaming Tools",
      url: "https://zentux.gg",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zentux v7",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows",
      url: "https://zentux.gg/products/zentux-v7",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zentux Optimizer",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows",
      url: "https://zentux.gg/products/zentux-optimizer",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Zentux Recorder",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Windows",
      url: "https://zentux.gg/products/zentux-recorder",
    },
  ];

  return (
    <div className="space-y-10 sm:space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="grid min-h-[calc(100vh-8rem)] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left">
          <h1
            aria-label="Zentux Gaming Tools for Windows"
            className="text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
          >
            {labels.homeTitleA}
            <span className="block bg-gradient-to-r from-[#d85cff] to-[#7c6bff] bg-clip-text text-transparent">
              {labels.homeTitleB}
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-semibold leading-7 text-[#c4b8ce] sm:text-lg lg:mx-0">
            Gaming tools made for performance, automation and complete control.
          </p>

          <div className="mx-auto mt-5 flex max-w-xl flex-wrap justify-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#d8c8ef] lg:mx-0 lg:justify-start">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              Ultra lightweight
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              Secure licenses
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2">
              24/7 support
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
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

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 border-y border-white/10 py-5 sm:grid-cols-4 lg:mx-0">
            <HeroStat value="6,800+" label={labels.productsSold} />
            <HeroStat value="4.68" label={labels.rating} />
            <HeroStat value="$1.79" label={labels.price} />
            <HeroStat value="24/7" label={labels.support} />
          </div>

          <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-3 lg:mx-0">
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

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <ProductPreviewCluster />
        </div>
      </section>

      <SeoContentSection setActiveTab={setActiveTab} />

      <LegalFooter setActiveTab={setActiveTab} onOpenLegal={onOpenLegal} />
    </div>
  );
}

function SeoContentSection({ setActiveTab }: { setActiveTab: (tab: Tab) => void }) {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-black/45 p-6 shadow-[0_0_80px_rgba(168,85,247,0.08)] backdrop-blur-2xl sm:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-[#b989ff]">
        Zentux Gaming Tools
      </p>
      <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
        Gaming Tools Built for Windows
      </h2>
      <p className="mt-4 max-w-4xl text-sm font-semibold leading-7 text-[#c4b8ce] sm:text-base">
        Zentux provides lightweight gaming tools for Windows focused on
        performance, automation and control. Explore Zentux v7, Zentux
        Optimizer and Zentux Recorder from the official Zentux platform.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 text-sm font-black">
        <a
          href="/products/zentux-v7"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white transition hover:border-[#a855f7]"
        >
          Zentux v7
        </a>
        <a
          href="/products/zentux-optimizer"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white transition hover:border-[#a855f7]"
        >
          Zentux Optimizer
        </a>
        <a
          href="/products/zentux-recorder"
          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-white transition hover:border-[#a855f7]"
        >
          Zentux Recorder
        </a>
        <button
          type="button"
          onClick={() => setActiveTab("Products")}
          className="rounded-full border border-[#a855f7]/40 bg-[#a855f7]/10 px-4 py-2 text-[#d8c8ef] transition hover:border-[#c75cff]"
        >
          View all products
        </button>
      </div>
    </section>
  );
}

function ProductPreviewCluster() {
  return (
    <div className="relative mx-auto flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-[32px] border border-white/10 bg-black/45 p-5 shadow-[0_0_100px_rgba(168,85,247,0.16)] backdrop-blur-xl lg:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(168,85,247,0.26),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-10 bottom-0 h-28 rounded-full bg-[#a855f7]/25 blur-3xl" />
      <video
        className="pointer-events-none relative z-10 h-[380px] max-h-[72vh] w-auto select-none rounded-[24px] object-contain shadow-[0_0_70px_rgba(168,85,247,0.22)] sm:h-[440px] lg:h-[500px]"
        src="/videos/zentux-optimizer-showcase.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controlsList="nodownload noplaybackrate noremoteplayback"
        aria-label="Zentux Optimizer product showcase"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/25" />
      <div className="pointer-events-none absolute inset-0 rounded-[32px] ring-1 ring-inset ring-[#c75cff]/15" />
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
              src="/logo-web.png"
              alt="Zentux logo"
              width={44}
              height={44}
              className="rounded-full object-cover"
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
          <button onClick={() => setActiveTab("Rewards")}>Rewards</button>
          <button onClick={() => setActiveTab("Reviews")}>Reviews</button>
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
          <AuthenticatedCheckoutLink href={checkoutUrl} planId="30-days">
            Buy License
          </AuthenticatedCheckoutLink>
          <button onClick={() => setActiveTab("Products")}>Downloads</button>
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

  if (!visible) {
    return null;
  }

  const closeBubble = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 260);
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
  labels: Record<string, string>;
  onSelectProduct: (product: (typeof products)[number]) => void;
}) {
  const premiumProducts = products.filter((product) =>
    [OPTIMIZER_NAME, AUTOCLICKER_NAME, MACRO_NAME].includes(product.name),
  );
  const freeProducts = products.filter((product) => product.price === "Free");
  const heroProducts = [
    products.find((product) => product.name === OPTIMIZER_NAME),
    products.find((product) => product.name === AUTOCLICKER_NAME),
    products.find((product) => product.name === MACRO_NAME),
  ].filter(Boolean) as (typeof products)[number][];
  const [selectedPlanId, setSelectedPlanId] = useState<
    (typeof pricingPlans)[number]["id"]
  >(pricingPlans[0].id);
  const [isPlanMenuOpen, setIsPlanMenuOpen] = useState(false);
  const selectedPlan =
    pricingPlans.find((plan) => plan.id === selectedPlanId) ?? pricingPlans[0];
  const bundleFeatures = [
    "1 licencia",
    "3 aplicaciones premium",
    "Activacion instantanea",
    "Actualizaciones incluidas",
    "Windows 10 y 11",
  ];

  return (
    <section className="py-10 text-white">
      <div className="overflow-hidden rounded-[2rem] border border-[#a855f7]/55 bg-[#05030a]/80 shadow-[0_0_80px_rgba(168,85,247,0.16)]">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.02fr_1fr] lg:p-10">
          <div className="relative min-h-[390px] overflow-hidden rounded-[1.5rem] bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.32),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]">
            <div className="absolute inset-x-8 bottom-8 h-20 rounded-[999px] bg-[#9d4edd]/30 blur-[38px]" />
            <div className="absolute inset-x-6 bottom-5 h-px bg-gradient-to-r from-transparent via-[#d946ef]/70 to-transparent" />
            <div className="absolute left-5 top-5 z-20 rounded-full border border-[#c45cff]/55 bg-[#140820]/80 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[#e4b6ff] shadow-[0_0_25px_rgba(168,85,247,0.22)]">
              Complete Bundle
            </div>
            {heroProducts.map((product, index) => {
              const layouts = [
                "left-[4%] top-[18%] w-[34%] rotate-[-5deg] opacity-95 zentux-bundle-card-left",
                "left-[29%] top-[8%] z-10 w-[40%] zentux-bundle-card-center",
                "right-[4%] top-[19%] w-[34%] rotate-[4deg] opacity-95 zentux-bundle-card-right",
              ];
              return (
                <div
                  key={product.name}
                  className={`absolute ${layouts[index]} aspect-[0.74] overflow-hidden rounded-xl border border-white/10 bg-black/25 shadow-[0_18px_55px_rgba(0,0,0,0.65)]`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index === 1}
                    quality={100}
                    sizes="(min-width: 1024px) 260px, 33vw"
                    className="object-contain object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/5" />
                </div>
              );
            })}
            <div className="absolute inset-x-5 bottom-5 z-20 grid gap-2 rounded-2xl border border-white/10 bg-black/35 p-3 backdrop-blur-md sm:grid-cols-2 xl:grid-cols-3">
              {bundleFeatures.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wide text-[#eadcff]"
                >
                  <span className="size-1.5 rounded-full bg-[#d46bff] shadow-[0_0_10px_rgba(212,107,255,0.8)]" />
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center py-2">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#d46bff]">
              Paquete completo
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
              Zentux{" "}
              <span className="bg-gradient-to-r from-white via-[#e9c8ff] to-[#c45cff] bg-clip-text text-transparent">
                Complete
              </span>
            </h2>
            <p className="mt-4 text-lg font-black uppercase text-[#d9d2e4]">
              Una licencia. Todos los productos premium.
            </p>
            <p className="mt-2 text-sm font-bold text-[#bfb5c9]">
              Una sola suscripcion desbloquea las 3 aplicaciones premium.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {premiumProducts.map((product) => (
                <span
                  key={product.name}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#a855f7]/45 bg-[#12051e]/75 px-3 py-2 text-sm font-black text-white shadow-[0_0_20px_rgba(168,85,247,0.12)]"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#7c3aed] text-white shadow-[0_0_18px_rgba(168,85,247,0.45)]">
                    ✓
                  </span>
                  {product.name.replace("Zentux ", "")}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-[1.35rem] border border-[#a855f7]/60 bg-[#12051e]/70 p-5 shadow-[inset_0_0_35px_rgba(168,85,247,0.12)]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#d46bff]">
                Elige tu plan
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-3">
                <span className="text-5xl font-black tracking-tight">
                  {selectedPlan.price.replace(" USD", "")}
                </span>
                <span className="pb-2 text-sm font-black uppercase text-[#c45cff]">
                  USD / {selectedPlan.label}
                </span>
              </div>

              <p className="mt-5 text-xs font-black uppercase tracking-[0.22em] text-[#d46bff]">
                Opcion
              </p>
              <button
                type="button"
                onClick={() => setIsPlanMenuOpen((open) => !open)}
                aria-expanded={isPlanMenuOpen}
                className={`mt-3 flex w-full items-center justify-between rounded-full border px-5 py-4 text-left text-sm font-black transition ${
                  isPlanMenuOpen
                    ? "border-white bg-[#07020f] text-white"
                    : "border-[#a855f7]/70 bg-[#090314] text-white hover:border-white/75"
                }`}
              >
                <span>{selectedPlan.label}</span>
                <span className="ml-auto mr-4 text-[#e8d5ff]">
                  {selectedPlan.price}
                </span>
                <span className="text-xs text-white">
                  {isPlanMenuOpen ? "⌃" : "⌄"}
                </span>
              </button>
              <div
                className={`mt-2 overflow-hidden rounded-[1.35rem] border border-[#a855f7]/75 bg-[#090314]/98 p-2 shadow-[0_24px_55px_rgba(0,0,0,0.35),0_0_35px_rgba(168,85,247,0.18)] transition ${
                  isPlanMenuOpen ? "block" : "hidden"
                }`}
              >
                {pricingPlans.map((plan) => {
                  const active = plan.id === selectedPlan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(plan.id);
                        setIsPlanMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-black transition ${
                        active
                          ? "bg-[#7c2ed1]/55 text-white shadow-[0_0_24px_rgba(168,85,247,0.22)]"
                          : "bg-black/25 text-[#d8cfe1] hover:bg-white/[0.07] hover:text-white"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`grid size-6 place-items-center rounded-full text-xs ${
                            active
                              ? "bg-[#a855f7] text-white"
                              : "border border-white/18"
                          }`}
                        >
                          {active ? "✓" : ""}
                        </span>
                        {plan.label}
                      </span>
                      <span>{plan.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AuthenticatedCheckoutLink
              href={checkoutUrl}
              planId={selectedPlan.id}
              className="mt-3 inline-flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#b336ff] to-[#d46bff] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-white shadow-[0_0_45px_rgba(168,85,247,0.36)] transition hover:scale-[1.01]"
            >
              <span>♛</span>
              Desbloquear Zentux Complete
              <span className="text-[11px] font-black tracking-normal text-white/85">
                {selectedPlan.price} / {selectedPlan.label}
              </span>
            </AuthenticatedCheckoutLink>

            <AuthenticatedCheckoutLink
              href="#paypal"
              planId={selectedPlan.id}
              provider="paypal"
              className="mt-3 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-[#ffd166]/45 bg-gradient-to-r from-[#ffc439] to-[#ffdf75] px-6 py-4 text-center text-sm font-black uppercase tracking-wide text-[#111827] shadow-[0_0_32px_rgba(255,196,57,0.22)] transition hover:scale-[1.01]"
            >
              <span className="rounded-md bg-[#003087] px-2 py-1 text-white">PayPal</span>
              Pagar una vez con PayPal
            </AuthenticatedCheckoutLink>

            <p className="mt-5 text-center text-sm font-semibold text-[#bfb5c9]">
              🔒 Tu suscripcion activa funciona como un paquete completo de Zentux.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <h3 className="text-2xl font-black uppercase tracking-tight">
          ¿Qué incluye tu licencia?
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#a99db6]">
          Todo esto viene incluido con Zentux Complete
        </p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {premiumProducts.map((product, index) => (
          <PremiumPackageCard
            key={product.name}
            product={product}
            accent={index === 0 ? "pink" : index === 1 ? "red" : "blue"}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-sm font-semibold text-[#a99db6]">
        ⓘ Estos productos solo funcionan con una suscripcion activa.
      </p>

      <div className="mt-6 text-center">
        <h3 className="text-2xl font-black uppercase tracking-tight">
          Productos gratuitos
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#a99db6]">
          Siempre disponibles sin necesidad de licencia
        </p>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {freeProducts.map((product) => (
          <FreeProductWideCard
            key={product.name}
            product={product}
          />
        ))}
      </div>

      <div className="mt-10 grid gap-4 rounded-[1.5rem] border border-[#a855f7]/45 bg-[#0c0613]/82 p-5 shadow-[0_0_55px_rgba(168,85,247,0.14)] sm:grid-cols-2 lg:grid-cols-4">
        <ProductBenefit icon="🛡️" title="Pago seguro" text="Procesado por Stripe o PayPal. 100% seguro." />
        <ProductBenefit icon="⚡" title="Activación instantánea" text="Tu licencia se activa después del pago." />
        <ProductBenefit icon="↻" title="Funciona en Windows" text="Compatible con Windows 10 y 11." />
        <ProductBenefit icon="🎧" title="Soporte por Discord" text="Soporte rápido y comunidad activa." />
      </div>
    </section>
  );
}

function PremiumPackageCard({
  product,
  accent,
}: {
  product: (typeof products)[number];
  accent: "pink" | "red" | "blue";
}) {
  const accents = {
    pink: {
      border: "border-[#d946ef]/60",
      glow: "from-[#d946ef]/30",
      icon: "text-[#ff4dde] border-[#ff4dde]/55",
      button: "from-[#581c87] to-[#a21caf]",
      symbol: "◔",
    },
    red: {
      border: "border-[#ef4444]/60",
      glow: "from-[#ef4444]/30",
      icon: "text-[#ff2d2d] border-[#ff2d2d]/55",
      button: "from-[#5b1020] to-[#a11b34]",
      symbol: "⌖",
    },
    blue: {
      border: "border-[#3b82f6]/60",
      glow: "from-[#2563eb]/30",
      icon: "text-[#2f8cff] border-[#2f8cff]/55",
      button: "from-[#172554] to-[#2563eb]",
      symbol: "</>",
    },
  }[accent];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.35rem] border ${accents.border} bg-[#07040b]/92 p-5 shadow-[0_0_45px_rgba(0,0,0,0.3)] transition hover:-translate-y-1 hover:shadow-[0_0_70px_rgba(168,85,247,0.22)]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${accents.glow} via-transparent to-transparent opacity-80`} />
      <div className="absolute right-0 top-0 h-40 w-44 opacity-95 transition duration-500 group-hover:scale-105">
        <Image
          src={product.image}
          alt={product.name}
          fill
          quality={100}
          sizes="180px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#07040b]/15 to-[#07040b]" />
      </div>
      <div className="relative z-10">
        <span className="rounded-md bg-[#7c3aed] px-3 py-2 text-xs font-black uppercase text-white">
          Incluido
        </span>
        <div className={`mt-8 grid size-20 place-items-center rounded-xl border bg-black/35 text-4xl font-black ${accents.icon}`}>
          {accents.symbol}
        </div>
        <h4 className="mt-6 text-2xl font-black">{product.name}</h4>
        <p className="mt-1 text-sm font-bold text-[#c9c2d0]">
          {product.description}
        </p>
        <p className="mt-4 min-h-[72px] max-w-[86%] text-sm font-semibold leading-6 text-[#bfb5c9]">
          {product.details.split(".")[0]}.
        </p>
        <div className={`mt-5 rounded-lg bg-gradient-to-r ${accents.button} px-4 py-2 text-center text-xs font-black uppercase tracking-wide text-white`}>
          ✓ Incluido con tu licencia
        </div>
        {product.downloadActive ? (
          <a
            href={product.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 bg-black/45 px-4 py-3 text-sm font-black transition hover:border-white/35 hover:bg-white hover:text-black"
          >
            Descargar app
            <span>↓</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-3 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-white/10 bg-black/35 px-4 py-3 text-sm font-black text-white/45"
          >
            En desarrollo
          </button>
        )}
      </div>
    </article>
  );
}

function FreeProductWideCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <article className="group relative overflow-hidden rounded-[1.35rem] border border-[#4ade80]/55 bg-[#041006]/90 p-5 shadow-[0_0_45px_rgba(74,222,128,0.1)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(74,222,128,0.22),transparent_42%)]" />
      <div className="relative z-10 grid gap-5 sm:grid-cols-[210px_1fr] md:grid-cols-[240px_1fr]">
        <div className="flex min-h-[220px] items-center justify-center">
          <div className="relative h-[220px] w-full max-w-[235px] transition duration-500 group-hover:scale-105 md:h-[235px] md:max-w-[250px]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              quality={100}
              sizes="(min-width: 768px) 250px, 235px"
              className="object-contain object-center"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-md bg-[#1d760d]/80 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#8cff4f]">
            Free
          </span>
          <h4 className="text-2xl font-black">{product.name}</h4>
          <p className="mt-1 text-sm font-bold text-[#d7ead5]">
            {product.description}
          </p>
          <p className="mt-3 max-w-md text-sm font-semibold leading-6 text-[#b8ccb6]">
            {product.details.split(".")[0]}.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={product.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-[#76ff32]/50 bg-[#1d760d] px-7 py-3 text-sm font-black text-white transition hover:bg-[#2aa815]"
            >
              Descargar ↓
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProductBenefit({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-4 border-white/10 p-3 lg:border-r last:lg:border-r-0">
      <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-[#7c3aed]/15 text-3xl text-[#c45cff]">
        {icon}
      </div>
      <div>
        <h4 className="font-black">{title}</h4>
        <p className="mt-1 text-sm font-semibold leading-5 text-[#bfb5c9]">
          {text}
        </p>
      </div>
    </div>
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
  const canDownload = product.downloadActive;

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
            <span className={canDownload ? "text-[#59ffb7]" : "text-[#ffb86b]"}>
              {product.status}
            </span>
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
          <span
            className={`rounded-full border px-4 py-1 text-[10px] font-black uppercase tracking-wide ${
              canDownload
                ? "border-white/20 bg-white/[0.05] text-white"
                : "border-[#ffb86b]/30 bg-[#ffb86b]/10 text-[#ffcf95]"
            }`}
          >
            {canDownload ? labels.available : "No disponible"}
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
  const [selectedPlanId, setSelectedPlanId] = useState<
    (typeof pricingPlans)[number]["id"]
  >(pricingPlans[0].id);
  const [plansOpen, setPlansOpen] = useState(false);
  const selectedPlan =
    pricingPlans.find((plan) => plan.id === selectedPlanId) ?? pricingPlans[0];

  if (!product) {
    return null;
  }
  const isFreeProduct = product.price === "Free";
  const canDownload = product.downloadActive;

  return (
    <div className="fixed inset-0 z-[85] flex items-center justify-center bg-black/80 px-3 py-4 backdrop-blur-md sm:px-6">
      <section className="zentux-legal-modal grid max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#a855f7]/55 bg-[#07030f] shadow-[0_0_110px_rgba(168,85,247,0.3)] lg:grid-cols-[0.94fr_1.06fr]">
        <div className="relative min-h-[330px] border-b border-[#a855f7]/25 bg-black lg:min-h-[760px] lg:border-b-0 lg:border-r">
          <Image
            src={product.image}
            alt={product.name}
            fill
            quality={100}
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
          <span className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
            {product.badge}
          </span>
          <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/55 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white backdrop-blur-xl">
            {product.status}
          </span>
        </div>

        <div className="relative max-h-[94vh] overflow-y-auto p-5 sm:p-8 lg:p-10">
          <div>
            <div className="pr-20 sm:pr-28">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#c76cff]">
                {isFreeProduct ? "Free Tool" : labels.packageLabel ?? copy.en.packageLabel}
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-white sm:text-4xl">
                {product.name}
              </h2>
              <p className="mt-3 text-lg font-semibold text-[#bfb5c9]">
                {product.description}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full border border-white/10 bg-[#120b19]/90 px-3 py-2 text-xs font-black text-white backdrop-blur-xl transition hover:bg-white hover:text-black sm:right-7 sm:top-7 sm:px-4 sm:text-sm lg:right-9 lg:top-9"
            >
              {labels.close ?? copy.en.close}
            </button>
          </div>

          <div className="mt-7 rounded-[1.35rem] border border-[#a855f7]/40 bg-[#160821]/65 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-[#b989ff]">
                  {isFreeProduct ? "Free download" : labels.completeLicense ?? copy.en.completeLicense}
                </p>
                <h3 className="mt-2 text-xl font-black text-white sm:text-2xl">
                  {isFreeProduct ? "No package required." : labels.oneLicense ?? copy.en.oneLicense}
                </h3>
              </div>
              <span className="rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-black">
                {isFreeProduct ? "Free" : labels.included ?? copy.en.included}
              </span>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-[#c9c2d0]">
              {isFreeProduct
                ? `${product.name} is free. Download it directly from this website and use it without a Zentux license or email delivery.`
                : labels.modalLicenseText ?? copy.en.modalLicenseText}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DetailPoint
              title={labels.status ?? copy.en.status}
              text={
                canDownload
                  ? labels.inStockText ?? copy.en.inStockText
                  : "No disponible de momento."
              }
            />
            <DetailPoint
              title={isFreeProduct ? "Descarga directa" : labels.delivery ?? copy.en.delivery}
              text={
                isFreeProduct
                  ? "No se envia nada al Gmail. La descarga empieza directamente desde esta pagina."
                  : labels.licenseEmailText ?? copy.en.licenseEmailText
              }
            />
            <DetailPoint
              title={isFreeProduct ? "Sin licencia" : labels.validation ?? copy.en.validation}
              text={
                isFreeProduct
                  ? "No necesita suscripcion, pago ni validacion online para usar este producto."
                  : labels.validationText ?? copy.en.validationText
              }
            />
            <DetailPoint
              title={labels.downloads ?? copy.en.downloads}
              text={
                canDownload
                  ? isFreeProduct
                    ? "El instalador gratis esta disponible ahora desde este boton."
                    : "The installer is available now from this product window."
                  : labels.downloadUnavailableText ?? copy.en.downloadUnavailableText
              }
            />
          </div>

          <p className="mt-6 text-sm font-semibold leading-7 text-[#b9afc6]">
            {product.details}
          </p>

          {isFreeProduct ? (
            <div className="mt-7 rounded-[1.5rem] border border-[#59ffb7]/45 bg-[#071712]/90 p-5 shadow-[0_0_35px_rgba(89,255,183,0.14)] sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#79ffc2]">
                Free download
              </p>
              <p className="mt-2 text-3xl font-black text-white">$0 USD</p>
              <a
                href={product.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 block w-full rounded-full bg-gradient-to-r from-[#59ffb7] to-[#8cff5f] px-7 py-4 text-center text-sm font-black text-black shadow-[0_0_38px_rgba(89,255,183,0.28)] transition hover:scale-[1.01]"
              >
                Download Free
              </a>
              <p className="mt-4 flex items-center gap-2 text-xs font-bold text-[#b9d9ca]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#59ffb7] shadow-[0_0_14px_#59ffb7]" />
                No license or payment required.
              </p>
            </div>
          ) : (
          <div className="mt-7 rounded-[1.5rem] border border-[#b15cff]/70 bg-[#10051b]/90 p-5 shadow-[0_0_35px_rgba(168,85,247,0.2)] sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#c985ff]">
              {labels.startingPrice ?? copy.en.startingPrice}
            </p>
            <p className="mt-2 text-4xl font-black text-white">{selectedPlan.price}</p>

            <div className="relative mt-5">
              <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#c985ff]">
                {labels.optionLabel ?? copy.en.optionLabel}
              </p>
              <button
                type="button"
                onClick={() => setPlansOpen((open) => !open)}
                aria-expanded={plansOpen}
                className="flex w-full items-center justify-between rounded-full border border-[#a855f7]/75 bg-[#0d0618] px-5 py-4 text-left font-black text-white transition hover:border-[#d18aff]"
              >
                <span>{selectedPlan.label}</span>
                <span className={`text-xl transition ${plansOpen ? "rotate-180" : ""}`}>⌄</span>
              </button>

              {plansOpen ? (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[1.25rem] border border-[#a855f7]/65 bg-[#11071d] p-2 shadow-[0_22px_60px_rgba(0,0,0,0.65)]">
                  {pricingPlans.map((plan) => {
                    const active = plan.id === selectedPlan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setPlansOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-bold transition ${
                          active
                            ? "bg-[#7c2ed1]/35 text-white"
                            : "text-[#d8cfe1] hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`grid h-6 w-6 place-items-center rounded-full text-xs ${active ? "bg-[#9b4dff]" : "border border-white/15"}`}>
                            {active ? "✓" : ""}
                          </span>
                          {plan.label}
                        </span>
                        <span>{plan.price}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <AuthenticatedCheckoutLink
              href={checkoutUrl}
              planId={selectedPlan.id}
              className="mt-6 block w-full rounded-full bg-white px-7 py-4 text-center text-sm font-black text-black shadow-[0_0_36px_rgba(196,112,255,0.5)] transition hover:scale-[1.01]"
            >
              {labels.purchaseNow ?? copy.en.purchaseNow}
            </AuthenticatedCheckoutLink>

            {canDownload ? (
              <a
                href={product.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block w-full rounded-full border border-[#59ffb7]/55 bg-[#59ffb7]/10 px-7 py-4 text-center text-sm font-black text-[#9dffd1] transition hover:bg-[#59ffb7]/15"
              >
                Download App
              </a>
            ) : (
              <button
                type="button"
                disabled
                title="Downloads will be enabled when the app builds are ready."
                className="mt-3 w-full cursor-not-allowed rounded-full border border-[#a855f7]/55 bg-transparent px-7 py-4 text-sm font-black text-[#8f849a] opacity-80"
              >
                {labels.downloadUnavailable ?? copy.en.downloadUnavailable}
              </button>
            )}
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-[#aaa0b5]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#a855f7] shadow-[0_0_14px_#a855f7]" />
              {labels.inStockText ?? copy.en.inStockText}
            </p>
          </div>
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

function ReviewsPanel() {
  return (
    <section className="py-10">
      <PanelTitle
        label="Video Reviews"
        title="Creator Reviews"
        text="Watch real videos from creators using Zentux."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {creatorVideos.map((video) => (
          <article
            key={video.videoUrl}
            className="group overflow-hidden rounded-[28px] border border-white/10 bg-black/45 shadow-[0_0_80px_rgba(168,85,247,0.08)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#b45cff]/80 hover:shadow-[0_0_70px_rgba(168,85,247,0.22)]"
          >
            <div className="relative border-b border-white/10 bg-[#07030d]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.22),transparent_42%)] opacity-80" />
              <div className="relative aspect-[9/14] w-full overflow-hidden">
                <iframe
                  src={video.embedUrl}
                  title={`${video.creator} Zentux video review`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>

            <div className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {video.creator}
                  </h3>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-[#20e8f2]">
                    {video.platform}
                  </p>
                </div>
                <span className="rounded-full border border-[#a855f7]/40 bg-[#160821]/70 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#d8b4fe]">
                  Creator
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold leading-6 text-[#c9c2d0]">
                {video.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-4 py-3 text-xs font-black text-white shadow-[0_0_34px_rgba(168,85,247,0.22)] transition hover:scale-[1.02]"
                >
                  Watch Full Video
                </a>
                <a
                  href={video.creatorUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-black text-white transition hover:border-[#20e8f2]/70 hover:bg-[#20e8f2]/10"
                >
                  Follow Creator
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-[28px] border border-[#a855f7]/30 bg-black/45 p-7 shadow-[0_0_90px_rgba(168,85,247,0.13)] backdrop-blur-xl">
        <div className="relative">
          <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[#a855f7]/20 blur-3xl" />
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b989ff]">
            Creator Program
          </p>
          <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-3xl font-black text-white">
                Want to review Zentux?
              </h3>
              <p className="mt-3 max-w-2xl text-sm font-semibold leading-7 text-[#c9c2d0]">
                Create content about Zentux and apply to become an official creator.
              </p>
            </div>
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="w-fit rounded-xl bg-gradient-to-r from-[#20e8f2] to-[#a855f7] px-6 py-4 text-sm font-black text-white shadow-[0_0_45px_rgba(32,232,242,0.22)] transition hover:scale-[1.02]"
            >
              Apply as Creator
            </a>
          </div>
        </div>
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
          a="No. Zentux premium apps are subscription based. One active license unlocks supported Zentux products included in the package. Zentux Cursor and Zentux v6 are free."
        />
        <FaqItem
          q="📩 How do I receive my license?"
          a="After checkout, the license key is sent to the email used during payment. Paste it inside a supported Zentux app to validate access."
        />
        <FaqItem
          q="📦 What is included?"
          a="The package includes supported Zentux products like Zentux Optimizer Pro, Zentux v7, and Zentux Macro when those builds are available. Zentux Cursor and Zentux v6 are available as separate free downloads."
        />
        <FaqItem
          q="⬇️ Can I download the apps now?"
          a="Zentux v7, Zentux v6, and Zentux Cursor currently have active download buttons. Other apps will show downloads again when their builds are ready."
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

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <article className="rounded-[24px] border border-white/10 bg-black/38 p-6 backdrop-blur-xl">
      <h3 className="text-lg font-black text-white">{q}</h3>
      <p className="mt-3 leading-7 text-[#c9c2d0]">{a}</p>
    </article>
  );
}
