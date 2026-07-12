import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProductUrl, seoProducts, siteUrl } from "@/lib/seo-products";

export const metadata: Metadata = {
  title: "Zentux Products | Windows Gaming Tools",
  description:
    "Explore official Zentux Gaming Tools for Windows, including Zentux v7, Zentux Optimizer and Zentux Recorder.",
  alternates: {
    canonical: `${siteUrl}/products`,
  },
  openGraph: {
    title: "Zentux Products | Windows Gaming Tools",
    description:
      "Explore official Zentux Gaming Tools for Windows, including Zentux v7, Zentux Optimizer and Zentux Recorder.",
    url: `${siteUrl}/products`,
    siteName: "Zentux",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsSeoPage() {
  return (
    <main className="min-h-screen bg-[#050107] px-6 py-12 text-white">
      <section className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/45 p-8 shadow-[0_0_100px_rgba(168,85,247,0.14)]">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b989ff]">
          Official Zentux Platform
        </p>
        <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
          Zentux Gaming Tools for Windows
        </h1>
        <p className="mt-5 max-w-3xl text-base font-semibold leading-7 text-[#c4b8ce]">
          Zentux provides lightweight Windows gaming tools focused on
          performance, automation and control. Explore Zentux v7, Zentux
          Optimizer and Zentux Recorder from the official Zentux platform.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {seoProducts.map((product) => (
            <article
              key={product.slug}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5"
            >
              <Image
                src={product.image}
                alt={`${product.name} product image`}
                width={480}
                height={320}
                className="h-48 w-full rounded-[1rem] object-cover"
              />
              <h2 className="mt-5 text-2xl font-black">{product.name}</h2>
              <p className="mt-3 text-sm font-semibold leading-6 text-[#c4b8ce]">
                {product.description}
              </p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-5 inline-flex rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-5 py-3 text-sm font-black text-white"
              >
                View {product.name}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/" className="text-sm font-black text-[#d8c8ef] underline">
            Back to Zentux home
          </Link>
        </div>
      </section>
    </main>
  );
}
