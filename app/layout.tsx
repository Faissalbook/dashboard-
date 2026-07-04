import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const fontDisplay = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://obsidiantread.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Obsidian Tread — Premium Tires, Precisely Matched",
    template: "%s | Obsidian Tread",
  },
  description:
    "Shop premium tires by size or vehicle, compare performance ratings, and book professional installation — all in one place.",
  keywords: ["tires", "tire shop", "tire search", "vehicle tire finder", "winter tires", "all-season tires"],
  openGraph: {
    type: "website",
    siteName: "Obsidian Tread",
    title: "Obsidian Tread — Premium Tires, Precisely Matched",
    description:
      "Shop premium tires by size or vehicle, compare performance ratings, and book professional installation.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Tread — Premium Tires, Precisely Matched",
    description: "Shop premium tires by size or vehicle, compare performance ratings, and book professional installation.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefe" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d10" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
