import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ZentuxOptimizer Pro",
    template: "%s | Zentux",
  },
  description:
    "ZentuxOptimizer Pro is a premium Windows optimizer for gamers with cleanup, RAM tools, FPS diagnostics, game boosting, and online license activation.",
  applicationName: "ZentuxOptimizer Pro",
  keywords: [
    "ZentuxOptimizer",
    "Zentux",
    "Windows optimizer",
    "gaming optimizer",
    "FPS booster",
    "RAM optimizer",
    "PC cleaner",
    "game booster",
  ],
  metadataBase: new URL("https://zentux.gg"),
  openGraph: {
    title: "ZentuxOptimizer Pro",
    description:
      "Premium Windows performance tools for gamers. Cleanup, RAM optimizer, game booster, FPS diagnostics, and license activation.",
    url: "https://zentux.gg",
    siteName: "Zentux",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 512,
        height: 512,
        alt: "Zentux logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ZentuxOptimizer Pro",
    description:
      "Premium Windows performance tools for gamers with online license activation.",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
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
      <body>{children}</body>
    </html>
  );
}
