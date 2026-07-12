import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

const siteUrl = "https://zentux.gg";
const logoUrl = `${siteUrl}/logo-web.png?v=20260620`;

export const metadata: Metadata = {
  title: {
    default: "Zentux | Gaming Tools for Windows",
    template: "%s | Zentux",
  },
  description:
    "Zentux is a gaming tools platform for Windows. Explore Zentux v7, Zentux Optimizer and Zentux Recorder — lightweight tools built for performance, automation and control.",
  applicationName: "Zentux",
  keywords: [
    "Zentux",
    "Zentux Gaming",
    "Zentux Gaming Tools",
    "Zentux v7",
    "Zentux Optimizer",
    "Zentux Recorder",
    "Windows Gaming Tools",
    "Gaming Performance Tools",
    "Gaming Automation Tools",
    "PC Gaming Tools",
  ],
  metadataBase: new URL("https://zentux.gg"),
  alternates: {
    canonical: "https://zentux.gg/",
  },
  openGraph: {
    title: "Zentux | Gaming Tools for Windows",
    description: "Gaming tools built for performance, automation and control.",
    url: "https://zentux.gg/",
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
    title: "Zentux | Gaming Tools for Windows",
    description: "Gaming tools built for performance, automation and control.",
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
    googleBot: {
      index: true,
      follow: true,
    },
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
