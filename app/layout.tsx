import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl = "https://www.zentux.gg";
const logoUrl = `${siteUrl}/logo-web.png?v=20260620`;

export const metadata: Metadata = {
  title: {
    default: "Zentux",
    template: "%s | Zentux",
  },
  description:
    "Zentux Optimizer Pro is a premium Windows optimizer for gamers with cleanup, RAM tools, FPS diagnostics, game boosting, and online license activation.",
  applicationName: "Zentux",
  keywords: [
    "Zentux Optimizer",
    "Zentux",
    "Windows optimizer",
    "gaming optimizer",
    "FPS booster",
    "RAM optimizer",
    "PC cleaner",
    "game booster",
  ],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Zentux",
    description:
      "Premium Windows performance tools for gamers. Cleanup, RAM optimizer, game booster, FPS diagnostics, and license activation.",
    url: siteUrl,
    siteName: "Zentux",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: logoUrl,
        width: 1024,
        height: 1024,
        alt: "Zentux logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentux",
    description:
      "Premium Windows performance tools for gamers with online license activation.",
    images: [logoUrl],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/logo-web.png?v=20260620", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}
