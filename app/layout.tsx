import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zentux",
  description: "Zentux — Autoclicker gamer. Rendimiento real. Control total.",
  applicationName: "Zentux",
  metadataBase: new URL("https://zentux-site-2.vercel.app"),
  openGraph: {
    title: "Zentux",
    description: "Autoclicker gamer. Rendimiento real. Control total.",
    url: "https://zentux-site-2.vercel.app",
    siteName: "Zentux",
    type: "website",
    images: [
      {
        url: "/zentux.png",
        width: 512,
        height: 512,
        alt: "Zentux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zentux",
    description: "Autoclicker gamer. Rendimiento real. Control total.",
    images: ["/zentux.png"],
  },
  icons: {
    icon: "/zentux.png",
    shortcut: "/zentux.png",
    apple: "/zentux.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
