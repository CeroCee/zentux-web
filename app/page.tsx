import Image from "next/image";
import type { ReactNode } from "react";

const APP_NAME = "ZentuxOptimizer Pro";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const downloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxOptimizer.exe";
const supportUrl = "https://guns.lol/cerocee";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Reviews", href: "#reviews" },
  { label: "Status", href: "#status" },
  { label: "FAQ", href: "#faq" },
];

const featureCards = [
  {
    title: "Cleaner",
    text: "Safe temporary file cleanup, storage diagnostics, and selective deletion tools.",
  },
  {
    title: "Game Booster",
    text: "Game detection, priority control, overlay checks, and gaming preparation tools.",
  },
  {
    title: "RAM Tools",
    text: "Review heavy background apps and reduce memory pressure before launching a game.",
  },
  {
    title: "License System",
    text: "No free mode. Pro features unlock only with an active online license.",
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
  return (
    <main className="min-h-screen overflow-hidden bg-[#030305] text-white">
      <SiteBackground />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-black/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-7">
          <a href="#home" className="flex min-w-0 items-center gap-3">
            <Image
              src="/zentux-icon.png"
              alt="Zentux logo"
              width={42}
              height={42}
              className="rounded-full border border-white/10 bg-[#120711]"
              priority
            />
            <div className="min-w-0">
              <div className="text-base font-black leading-none text-white sm:text-lg">
                Zentux
              </div>
              <div className="mt-1 text-xs font-semibold text-[#20e8f2]">
                Performance Tools
              </div>
            </div>
          </a>

          <nav className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-sm font-bold text-[#bfb8be] md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 transition hover:bg-white hover:text-black"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#20e8f2]/55 px-5 py-2.5 text-sm font-black text-[#20e8f2] transition hover:bg-[#20e8f2] hover:text-black"
            >
              Get Help
            </a>
            <a
              href={checkoutUrl}
              className="rounded-full bg-[#c51f35] px-5 py-2.5 text-sm font-black text-white shadow-[0_0_30px_rgba(197,31,53,0.28)] transition hover:bg-[#f22d49]"
            >
              Buy Pro
            </a>
          </div>
        </div>
      </header>

      <section id="home" className="relative min-h-screen px-5 pt-28 sm:px-7">
        <div className="mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#20e8f2]">
              Windows optimizer
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-7xl">
              Zentux
              <span className="block text-[#20e8f2]">Optimizer Pro.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-[#c9c2c7]">
              Premium Windows performance control for cleaner storage, game prep,
              RAM review, and license-protected Pro tools.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={checkoutUrl}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-black text-black shadow-[0_0_45px_rgba(255,255,255,0.22)] transition hover:bg-[#20e8f2]"
              >
                Buy ZentuxOptimizer Pro
              </a>
              <a
                href={downloadUrl}
                className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-black text-white transition hover:border-[#20e8f2] hover:text-[#20e8f2]"
              >
                Download App
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
              <HeroStat value="6,800+" label="sold" />
              <HeroStat value="5.0" label="rating" />
              <HeroStat value="$3" label="price" />
              <HeroStat value="24/7" label="support" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-[#c51f35]/20 blur-3xl" />
            <div className="relative rounded-[32px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_0_90px_rgba(32,232,242,0.08)] backdrop-blur-xl">
              <div className="rounded-[26px] border border-[#3b1722] bg-[#08050a] p-6">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-[#20e8f2]">
                      Live panel
                    </p>
                    <h2 className="mt-2 text-2xl font-black">Performance Overview</h2>
                  </div>
                  <span className="rounded-full border border-[#c51f35]/60 bg-[#c51f35]/15 px-4 py-2 text-xs font-black text-[#ff6f80]">
                    Pro
                  </span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Metric label="CPU" value="18%" width="18%" />
                  <Metric label="RAM" value="64%" width="64%" />
                  <Metric label="Disk" value="71%" width="71%" danger />
                  <Metric label="GPU" value="32%" width="32%" />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/35 p-5">
                  <p className="font-black">Optimization Ready</p>
                  <p className="mt-2 text-sm leading-6 text-[#bfb8be]">
                    Cleaner, Game Booster, Deep Cleaner, FPS checks, and RAM tools
                    unlock after license validation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell id="products" label="Products" title="One license. Full optimizer access.">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="rounded-[28px] border border-white/10 bg-[#0a0a0d]/82 p-7">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8f8b91]">
              Premium product
            </p>
            <h3 className="mt-4 text-4xl font-black">6,800+ products sold</h3>
            <p className="mt-4 max-w-md leading-8 text-[#c9c2c7]">
              ZentuxOptimizer Pro is built as a premium app, not a free demo.
              Users subscribe, receive a license key by email, and unlock Pro
              features inside the app.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              <SmallStat value="Instant" label="delivery" />
              <SmallStat value="Online" label="license" />
              <SmallStat value="Pro" label="access" />
            </div>
          </div>

          <a
            href={checkoutUrl}
            className="group mx-auto w-full max-w-[430px] overflow-hidden rounded-[28px] border border-[#37202b] bg-[#0b080c]/92 text-white no-underline transition hover:-translate-y-1 hover:border-[#c51f35]/80 hover:shadow-[0_0_55px_rgba(197,31,53,0.24)] lg:mx-0"
          >
            <div className="relative h-[390px] overflow-hidden border-b border-[#251722] bg-[#070305]">
              <Image
                src="/producto.png"
                alt={APP_NAME}
                fill
                priority
                quality={100}
                sizes="430px"
                className="object-contain p-2 transition duration-500 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09050a]/85 via-transparent to-black/5" />
              <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
                Popular
              </div>
              <div className="absolute inset-x-5 bottom-5 flex justify-center opacity-0 transition group-hover:opacity-100">
                <span className="rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-black">
                  View Details
                </span>
              </div>
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
      </SectionShell>

      <SectionShell id="features" label="Features" title="Separated tools, clearer control.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[24px] border border-white/10 bg-[#08080b]/86 p-6 transition hover:border-[#20e8f2]/60"
            >
              <div className="mb-5 h-10 w-10 rounded-2xl border border-[#20e8f2]/45 bg-[#20e8f2]/10" />
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#c9c2c7]">{feature.text}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="reviews" label="Reviews" title="Customer feedback.">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-[28px] border border-white/10 bg-[#08080b]/86 p-7 lg:col-span-2">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8f8b91]">
              Overall rating
            </p>
            <div className="mt-4 flex flex-wrap items-end gap-4">
              <span className="text-6xl font-black">5.00</span>
              <span className="pb-3 text-lg">*****</span>
              <span className="pb-3 text-sm text-[#8f8b91]">verified customers</span>
            </div>
            <div className="mt-6 space-y-3">
              <RatingBar label="5*" value="100%" count="6,800+" />
              <RatingBar label="4*" value="0%" count="0" />
              <RatingBar label="3*" value="0%" count="0" />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#08080b]/86 p-7">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-[#8f8b91]">
              Total products sold
            </p>
            <div className="mt-4 text-5xl font-black">6,800+</div>
            <p className="mt-4 leading-7 text-[#c9c2c7]">
              Built around premium tools, activation, and direct support.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review}
              className="rounded-[22px] border border-white/10 bg-[#08080b]/86 p-5"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-black">
                  Z
                </span>
                <div>
                  <p className="font-black">Verified User</p>
                  <p className="text-xs text-[#8f8b91]">Zentux customer</p>
                </div>
              </div>
              <p className="text-sm">*****</p>
              <p className="mt-3 text-sm leading-7 text-[#c9c2c7]">{review}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="status" label="Status" title="Product status.">
        <div className="space-y-3 rounded-[28px] border border-white/10 bg-[#08080b]/86 p-5">
          <StatusRow name="ZentuxOptimizer Pro" price="$3.00 / 15 days" status="Available" />
          <StatusRow name="License Validation" price="Included" status="Online" />
          <StatusRow name="Email License Delivery" price="Included" status="Online" />
          <StatusRow name="Support Page" price="Included" status="Online" />
        </div>
      </SectionShell>

      <SectionShell id="faq" label="FAQ" title="Before you buy.">
        <div className="grid gap-4 lg:grid-cols-2">
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
      </SectionShell>

      <section className="px-5 pb-20 sm:px-7">
        <div className="mx-auto max-w-7xl rounded-[32px] border border-[#3b1722] bg-[#10060d] p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#20e8f2]">
                Unlock Pro
              </p>
              <h2 className="mt-3 text-3xl font-black">
                Ready to use ZentuxOptimizer Pro?
              </h2>
              <p className="mt-3 max-w-2xl text-[#c9c2c7]">
                Subscribe, receive your license, download the app, and activate it
                from the Account screen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={checkoutUrl}
                className="rounded-full bg-[#c51f35] px-7 py-3.5 text-sm font-black text-white transition hover:bg-[#f22d49]"
              >
                Buy Pro
              </a>
              <a
                href={supportUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#20e8f2]/55 px-7 py-3.5 text-sm font-black text-[#20e8f2] transition hover:bg-[#20e8f2] hover:text-black"
              >
                Get Help
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] px-5 py-8 text-center text-sm text-[#8f8b91] sm:px-7">
        ZentuxOptimizer Pro. Premium Windows performance tools by Zentux.
      </footer>
    </main>
  );
}

function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#030305]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(32,232,242,0.12),transparent_28%),radial-gradient(circle_at_18%_38%,rgba(197,31,53,0.12),transparent_30%),linear-gradient(90deg,rgba(0,0,0,0.1),rgba(255,255,255,0.035),rgba(0,0,0,0.15))]" />
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle,rgba(255,255,255,0.55)_1px,transparent_1px)] [background-size:96px_96px]" />
    </div>
  );
}

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative border-t border-white/[0.06] px-5 py-20 sm:px-7">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#8f8b91]">
            {label}
          </p>
          <h2 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="text-2xl font-black">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#8f8b91]">
        {label}
      </div>
    </div>
  );
}

function SmallStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-lg font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8f8b91]">
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
        <span className="text-sm font-bold text-[#c9c2c7]">{label}</span>
        <span className="text-xl font-black">{value}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-white/10">
        <div
          className="h-2 rounded-full"
          style={{ width, backgroundColor: danger ? "#c51f35" : "#20e8f2" }}
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
    <div className="grid grid-cols-[34px_1fr_64px] items-center gap-3 text-xs font-bold text-[#9b8791]">
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
    <article className="rounded-[24px] border border-white/10 bg-[#08080b]/86 p-6">
      <h3 className="text-lg font-black text-white">{q}</h3>
      <p className="mt-3 leading-7 text-[#c9c2c7]">{a}</p>
    </article>
  );
}
