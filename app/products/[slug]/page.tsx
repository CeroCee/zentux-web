import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductUrl, seoProducts, siteUrl } from "@/lib/seo-products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return seoProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = seoProducts.find((item) => item.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const url = getProductUrl(product.slug);

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: product.title,
      description: product.description,
      url,
      siteName: "Zentux",
      type: "website",
      images: [
        {
          url: `${siteUrl}${product.image}`,
          alt: `${product.name} product image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description,
      images: [`${siteUrl}${product.image}`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProductSeoPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = seoProducts.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: product.operatingSystem,
    url: getProductUrl(product.slug),
  };

  return (
    <main className="min-h-screen bg-[#050107] px-6 py-12 text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <article className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-black/45 p-8 shadow-[0_0_100px_rgba(168,85,247,0.14)] lg:grid-cols-[0.9fr_1.1fr]">
        <Image
          src={product.image}
          alt={`${product.name} product image`}
          width={720}
          height={520}
          className="h-full min-h-[320px] rounded-[1.5rem] object-cover"
          priority
        />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b989ff]">
            {product.category}
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            {product.name}
          </h1>
          <p className="mt-5 text-base font-semibold leading-7 text-[#c4b8ce]">
            {product.description}
          </p>
          <p className="mt-5 text-base font-semibold leading-7 text-[#c4b8ce]">
            {product.name} is part of Zentux Gaming Tools, the official
            Zentux platform for Windows tools built around performance,
            automation and control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-[#c75cff] to-[#806bff] px-6 py-3 text-sm font-black text-white"
            >
              Open Zentux
            </Link>
            <Link
              href="/products"
              className="rounded-xl border border-white/15 bg-black/25 px-6 py-3 text-sm font-black text-white"
            >
              All Products
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
