import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { SmoothScroll } from "@/components/SmoothScroll";
import { LocalBusinessJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DoorHash — Cannabis Delivery in Southern New Mexico",
    template: `%s | ${site.legalName} Cannabis Delivery NM`,
  },
  description: site.description,
  metadataBase: new URL("https://doorhash.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DoorHash — Cannabis Delivery in Southern New Mexico",
    description: site.description,
    siteName: site.legalName,
    type: "website",
    locale: "en_US",
    url: "https://doorhash.com",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "DoorHash — cannabis delivery in Southern New Mexico",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoorHash — Cannabis Delivery in Southern New Mexico",
    description: site.description,
    images: ["/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  applicationName: site.legalName,
  authors: [{ name: site.legalName }],
  category: "Cannabis Retail",
  keywords: [
    "cannabis delivery Las Cruces",
    "weed delivery Southern New Mexico",
    "dispensary Las Cruces NM",
    "Don Verde Farms",
    "doorhash",
    "marijuana delivery NM",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-ink-950 text-cream antialiased">
        <LocalBusinessJsonLd />
        <WebsiteJsonLd />
        <SmoothScroll>
          <Nav />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScroll>
        <AgeGate />
      </body>
    </html>
  );
}
