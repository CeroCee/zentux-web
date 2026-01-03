import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Zentux",
    template: "%s | Zentux",
  },
  description:
    "Zentux — Autoclicker gamer para Windows. Rendimiento real, precisión total y cero impacto en FPS.",
  applicationName: "Zentux",
  keywords: [
    "Zentux",
    "autoclicker",
    "autoclicker gamer",
    "gaming tool",
    "windows autoclicker",
    "no baja FPS",
    "clicker competitivo",
  ],
  metadataBase: new URL("https://zentux-web.vercel.app"),

  openGraph: {
    title: "Zentux",
    description:
      "Autoclicker gamer para Windows. Rendimiento real. Control total. Sin bajar FPS.",
    url: "https://zentux-web.vercel.app",
    siteName: "Zentux",
    locale: "es_ES",
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
    title: "Zentux",
    description:
      "Autoclicker gamer para Windows. Rendimiento real y control total.",
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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
