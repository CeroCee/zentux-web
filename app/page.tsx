import Image from "next/image";
import BuyProButton from "@/components/BuyProButton";

const APP_NAME = "ZentuxOptimizer Pro";
const PRICE = "$3.00 USD";
const BILLING = "Every 15 days";
const checkoutUrl = "https://buy.stripe.com/8x29ALdMMeKmcSs60q1wY01";
const downloadUrl =
  "https://github.com/CeroCee/CeroCee-zentuxoptimizer-releases/releases/latest/download/ZentuxOptimizer.exe";
const supportUrl = "https://guns.lol/cerocee";

const features = [
  {
    title: "Game Booster",
    text: "Detects active games, raises game priority, and helps reduce background pressure while you play.",
  },
  {
    title: "RAM Optimizer",
    text: "Finds heavy background apps and gives you control over what to close before launching a match.",
  },
  {
    title: "Deep Cleaner",
    text: "Shows what is taking the most space and lets you remove specific files, folders, and safe cleanup items.",
  },
  {
    title: "FPS Toolkit",
    text: "Checks overlays, power mode, game priority, and system load so you can understand why FPS may not change.",
  },
  {
    title: "License Protection",
    text: "Online license validation with no free mode. Pro tools unlock only for active subscribers.",
  },
  {
    title: "Support Access",
    text: "Get help through the Zentux support page, including optional PC performance assistance through Discord.",
  },
];

const steps = [
  "Subscribe through the secure Stripe checkout.",
  "Receive your license key by email.",
  "Open ZentuxOptimizer Pro and paste the license.",
  "Validate once and unlock the full optimizer.",
];

const productCards = [
  {
    title: "ZentuxOptimizer Pro",
    tag: "Popular",
    price: "$3.00",
    detail: "Windows performance optimizer",
    status: "In stock",
    image: "/producto.png",
  },
  {
    title: "Game Booster Toolkit",
    tag: "Included",
    price: "Pro",
    detail: "Priority, diagnostics, and overlay checks",
    status: "Active",
    image: "/producto.png",
  },
  {
    title: "Deep Cleaner Suite",
    tag: "Included",
    price: "Pro",
    detail: "Space analysis and selective cleanup",
    status: "Active",
    image: "/producto.png",
  },
  {
    title: "RAM Control Panel",
    tag: "Included",
    price: "Pro",
    detail: "Background app review and memory tools",
    status: "Active",
    image: "/producto.png",
  },
];

const reviewCards = [
  "Clean interface and easy activation.",
  "Helped me find what was slowing my PC.",
  "The cleaner and game booster are useful before playing.",
  "Support answered my questions fast.",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050107] text-white">
      <header className="sticky top-0 z-50 border-b border-[#33131d] bg-[#050107]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-7">
          <a href="#" className="flex min-w-0 items-center gap-3">
            <Image
              src="/zentux-icon.png"
              alt="Zentux logo"
              width={42}
              height={42}
              className="rounded-full border border-[#602536] bg-[#120711]"
              priority
            />
            <div className="min-w-0">
              <div className="text-base font-black leading-none text-white sm:text-lg">
                Zentux
              </div>
              <div className="mt-1 text-xs font-medium text-[#20e8f2]">
                Doll-Core Optimizer
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-[#d7c2cc] md:flex">
            <a className="transition hover:text-white" href="#features">
              Features
            </a>
            <a className="transition hover:text-white" href="#products">
              Products
            </a>
            <a className="transition hover:text-white" href="#license">
              License
            </a>
            <a className="transition hover:text-white" href="#reviews">
              Reviews
            </a>
            <a className="transition hover:text-white" href="#status">
              Status
            </a>
            <a className="transition hover:text-white" href="#faq">
              FAQ
            </a>
            <a
              href={supportUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-[#20e8f2]/60 px-5 py-2.5 text-sm font-bold text-[#20e8f2] transition hover:bg-[#06171c]"
            >
              Get Help
            </a>
            <BuyProButton compact />
          </nav>
        </div>
      </header>

      <section className="relative border-b border-[#2a1019]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(32,232,242,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(197,31,53,0.08)_1px,transparent_1px)] bg-[size:54px_54px] opacity-35" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#20e8f2] to-transparent" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-7 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase text-[#20e8f2]">
              <span className="rounded-full border border-[#1d7984] bg-[#06171c] px-4 py-2">
                Windows Performance
              </span>
              <span className="rounded-full border border-[#5b1c2a] bg-[#19070d] px-4 py-2 text-[#ff6b7b]">
                No Free Mode
              </span>
              <span className="rounded-full border border-[#37233f] bg-[#100713] px-4 py-2 text-[#dfc9ff]">
                Online License
              </span>
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
              {APP_NAME}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-[#e5d9df]">
              A premium Windows optimizer built for players who want a cleaner
              system, faster setup, and better control before gaming.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <BuyProButton />
              <a
                href={downloadUrl}
                className="inline-flex items-center justify-center rounded-full border border-[#3c1a25] bg-[#120711] px-7 py-3.5 text-sm font-bold text-white transition hover:border-[#20e8f2] hover:text-[#20e8f2]"
              >
                Download App
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-[#bba5af]">
              <span>{PRICE}</span>
              <span className="text-[#6f5260]">|</span>
              <span>{BILLING}</span>
              <span className="text-[#6f5260]">|</span>
              <span>License sent by email</span>
            </div>
          </div>

          <div className="rounded-[28px] border border-[#421824] bg-[#0b040b] p-4 shadow-[0_0_80px_rgba(197,31,53,0.12)]">
            <div className="rounded-[22px] border border-[#263844] bg-[#071018] p-5">
              <div className="mb-5 flex items-center justify-between border-b border-[#24313c] pb-4">
                <div>
                  <p className="text-xs font-bold uppercase text-[#20e8f2]">
                    Live System Panel
                  </p>
                  <h2 className="mt-1 text-2xl font-black">Performance Overview</h2>
                </div>
                <span className="rounded-full bg-[#c51f35] px-3 py-1 text-xs font-bold">
                  Pro
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Metric label="CPU" value="18%" color="#20e8f2" width="18%" />
                <Metric label="RAM" value="64%" color="#20e8f2" width="64%" />
                <Metric label="Disk" value="71%" color="#c51f35" width="71%" />
                <Metric label="GPU" value="32%" color="#8efcff" width="32%" />
              </div>

              <div className="mt-4 rounded-2xl border border-[#263844] bg-[#040811] p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black text-white">Optimization Ready</p>
                    <p className="mt-1 text-xs text-[#9db6bf]">
                      Cleaner, RAM tools, game priority, and overlay checks.
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-[#20e8f2] bg-[#07181f] shadow-[0_0_30px_rgba(32,232,242,0.25)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="products"
        className="relative border-b border-[#2a1019] bg-[#030104] px-5 py-16 sm:px-7"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(32,232,242,0.13),transparent_35%),radial-gradient(circle_at_18%_30%,rgba(197,31,53,0.12),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#8f8289]">
              Premium Tools - Instant License Delivery
            </p>
            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#cdbbc4]">
              Trusted Zentux tools for Windows optimization, game prep, and
              cleaner PC control.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
            <div className="rounded-3xl border border-[#37202b] bg-[#09050a]/90 p-7 shadow-[0_0_80px_rgba(32,232,242,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#20e8f2]">
                Total Sold
              </p>
              <div className="mt-5 text-6xl font-black leading-none text-white sm:text-7xl">
                6,800+
              </div>
              <p className="mt-4 max-w-md text-lg leading-8 text-[#d8c8d0]">
                products sold across Zentux releases and services.
              </p>

              <div className="mt-8 grid grid-cols-3 gap-3">
                <MiniStat value="5.0" label="rating" />
                <MiniStat value="24/7" label="support" />
                <MiniStat value="Pro" label="access" />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {productCards.map((product) => (
                <a
                  key={product.title}
                  href={checkoutUrl}
                  className="group overflow-hidden rounded-3xl border border-[#37202b] bg-[#0b080c]/88 text-white no-underline transition hover:-translate-y-1 hover:border-[#c51f35]/80 hover:shadow-[0_0_50px_rgba(197,31,53,0.22)]"
                >
                  <div className="relative h-60 overflow-hidden border-b border-[#251722] bg-[#070305]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09050a] via-transparent to-black/10" />
                    <div className="absolute left-5 top-5 rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-black">
                      {product.tag}
                    </div>
                    <div className="absolute inset-x-5 bottom-5 flex justify-center opacity-0 transition group-hover:opacity-100">
                      <span className="rounded-full bg-white px-5 py-2 text-xs font-black uppercase tracking-wide text-black shadow-[0_0_30px_rgba(255,255,255,0.28)]">
                        View Details
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-black text-white">{product.title}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-[#bcaab3]">
                      {product.detail}
                    </p>
                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="text-lg font-black text-white">{product.price}</span>
                      <span className="rounded-full border border-[#4b4b4b] bg-white/[0.05] px-3 py-1 text-[10px] font-black uppercase tracking-wide text-white">
                        - {product.status}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-5 py-16 sm:px-7">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase text-[#20e8f2]">Built for real use</p>
          <h2 className="mt-3 text-4xl font-black">Everything your setup needs before you play.</h2>
          <p className="mt-4 text-[#cdbbc4]">
            ZentuxOptimizer Pro does not promise magic FPS. It gives players a
            practical control center for cleanup, diagnostics, and gaming preparation.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-[#351722] bg-[#0b040b] p-6 transition hover:border-[#20e8f2]/70"
            >
              <div className="mb-5 h-1 w-14 rounded-full bg-[#c51f35]" />
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-[#c9b5bf]">{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reviews" className="border-y border-[#2a1019] bg-[#050107]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-7">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase text-[#20e8f2]">Customer Reviews</p>
            <h2 className="mt-3 text-4xl font-black">Trusted by active users.</h2>
            <p className="mt-4 text-[#cdbbc4]">
              Zentux focuses on simple activation, useful tools, and support that
              helps users understand their PC performance.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#37202b] bg-[#0b040b] p-6 lg:col-span-2">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8f8289]">
                Overall Rating
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-4">
                <span className="text-6xl font-black">5.00</span>
                <span className="pb-3 text-xl text-white">*****</span>
                <span className="pb-3 text-sm text-[#9b8791]">based on customer feedback</span>
              </div>
              <div className="mt-5 space-y-3">
                <RatingBar label="5*" value="100%" count="6,800+" />
                <RatingBar label="4*" value="0%" count="0" />
                <RatingBar label="3*" value="0%" count="0" />
              </div>
            </div>

            <div className="rounded-3xl border border-[#37202b] bg-[#0b040b] p-6">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-[#8f8289]">
                Products Sold
              </p>
              <div className="mt-3 text-5xl font-black">6,800+</div>
              <p className="mt-4 leading-7 text-[#c9b5bf]">
                A strong track record across Zentux products, updates, and support.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {reviewCards.map((review) => (
              <article
                key={review}
                className="rounded-2xl border border-[#351722] bg-[#0b040b] p-5"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-sm font-black">
                    Z
                  </span>
                  <div>
                    <p className="font-black">Verified User</p>
                    <p className="text-xs text-[#8f8289]">Zentux customer</p>
                  </div>
                </div>
                <p className="text-sm text-white">*****</p>
                <p className="mt-3 leading-7 text-[#c9b5bf]">{review}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="license" className="border-y border-[#2a1019] bg-[#09030a]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-7 lg:grid-cols-[0.9fr_1fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase text-[#ff5d70]">Simple activation</p>
            <h2 className="mt-3 text-4xl font-black">Subscribe, receive your key, unlock Pro.</h2>
            <p className="mt-4 leading-7 text-[#cdbbc4]">
              Every active subscriber receives a license by email. The app validates
              the license online and unlocks the optimizer only while the subscription
              remains active.
            </p>
          </div>

          <div className="rounded-3xl border border-[#421824] bg-[#050107] p-5">
            <div className="grid gap-3">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-[#291620] bg-[#0d060d] p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#c51f35] text-sm font-black">
                    {index + 1}
                  </span>
                  <p className="pt-1 text-[#eadfe5]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="status" className="mx-auto max-w-7xl px-5 py-16 sm:px-7">
        <div className="rounded-3xl border border-[#351722] bg-[#0b040b] p-6 sm:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase text-[#20e8f2]">Product Status</p>
              <h2 className="mt-2 text-3xl font-black">Zentux services are active.</h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1f8e5a] bg-[#042015] px-5 py-2 text-sm font-black text-[#64ffb1]">
              <span className="h-2 w-2 rounded-full bg-[#64ffb1]" />
              Online
            </span>
          </div>

          <div className="mt-7 grid gap-3">
            <StatusRow name="License Validation" price="Included" status="Online" />
            <StatusRow name="Email License Delivery" price="Included" status="Online" />
            <StatusRow name="ZentuxOptimizer Pro" price="$3.00 / 15 days" status="Available" />
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-5 py-16 sm:px-7">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-bold uppercase text-[#20e8f2]">FAQ</p>
            <h2 className="mt-3 text-4xl font-black">Clear answers before buying.</h2>
          </div>

          <div className="grid gap-4">
            <FaqItem
              q="Will this always increase FPS?"
              a="No optimizer can guarantee higher FPS in every game. ZentuxOptimizer helps remove common bottlenecks like background load, overlays, startup clutter, and heavy temporary files."
            />
            <FaqItem
              q="Can I use it without a subscription?"
              a="No. ZentuxOptimizer Pro is subscription-only. The main tools unlock after a valid license is activated."
            />
            <FaqItem
              q="How do I get my license?"
              a="After subscribing through Stripe, your license is sent to the email used at checkout."
            />
            <FaqItem
              q="Where can I get help?"
              a="Use the support link to contact Zentux. We can help with app questions and offer optional PC performance support through Discord."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-7">
        <div className="rounded-3xl border border-[#421824] bg-[#0b040b] p-7 sm:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-black">Ready to unlock ZentuxOptimizer Pro?</h2>
              <p className="mt-3 max-w-2xl text-[#cdbbc4]">
                Get the optimizer, activate your license, and prepare your Windows setup
                before gaming.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BuyProButton />
              <a
                href={supportUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[#20e8f2]/50 px-7 py-3.5 text-sm font-bold text-[#20e8f2] transition hover:bg-[#06171c]"
              >
                Get Help
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#2a1019] px-5 py-8 text-center text-sm text-[#9b8791] sm:px-7">
        ZentuxOptimizer Pro. Premium Windows performance tools by Zentux.
      </footer>
    </main>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l border-[#3a202b] pl-4 first:border-l-0 first:pl-0">
      <div className="text-2xl font-black text-white">{value}</div>
      <div className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#8f8289]">
        {label}
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
    <div className="grid gap-3 rounded-2xl border border-[#291620] bg-[#050107] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center">
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

function Metric({
  label,
  value,
  color,
  width,
}: {
  label: string;
  value: string;
  color: string;
  width: string;
}) {
  return (
    <div className="rounded-2xl border border-[#263844] bg-[#050a12] p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-[#b9d3db]">{label}</span>
        <span className="text-xl font-black">{value}</span>
      </div>
      <div className="mt-4 h-2 rounded-full bg-[#1b2838]">
        <div className="h-2 rounded-full" style={{ width, backgroundColor: color }} />
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <article className="rounded-2xl border border-[#351722] bg-[#0b040b] p-6">
      <h3 className="text-lg font-black text-white">{q}</h3>
      <p className="mt-3 leading-7 text-[#c9b5bf]">{a}</p>
    </article>
  );
}
