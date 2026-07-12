import type { MetadataRoute } from "next";
import { getProductUrl, seoProducts, siteUrl } from "@/lib/seo-products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/products`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...seoProducts.map((product) => ({
      url: getProductUrl(product.slug),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
