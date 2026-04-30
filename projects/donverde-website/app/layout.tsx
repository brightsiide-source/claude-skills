import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { AgeGate } from "@/components/age-gate";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"]
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://donverdefarms.com"),
  title: {
    default: "Don Verde Farms — New Mexico's Craft Indoor Cannabis",
    template: "%s · Don Verde Farms"
  },
  description:
    "Don Verde Farms grows premium indoor cannabis in Southern New Mexico. Two decades of operator experience, craft cultivation, lab-verified flower — built for budtenders and the connoisseurs they serve.",
  keywords: [
    "Don Verde Farms",
    "New Mexico cannabis",
    "NM wholesale cannabis",
    "indoor cannabis Southern New Mexico",
    "craft cannabis NM",
    "Don Verde wholesale"
  ],
  openGraph: {
    title: "Don Verde Farms — New Mexico's Craft Indoor Cannabis",
    description:
      "Premium indoor cannabis grown in Southern New Mexico. Operator-owned, lab-verified, built for budtenders.",
    type: "website",
    locale: "en_US",
    siteName: "Don Verde Farms"
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" }
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Don Verde Farms",
  url: "https://donverdefarms.com",
  email: "info@donverdefarms.com",
  description:
    "Premium indoor cannabis cultivator in Southern New Mexico. License CCD-VICE-2023-0010.",
  sameAs: [
    "https://www.instagram.com/donverdefarms/",
    "https://www.facebook.com/p/Don-Verde-Farms-61553599491326/"
  ],
  address: {
    "@type": "PostalAddress",
    addressRegion: "NM",
    addressCountry: "US"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <AgeGate />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </body>
    </html>
  );
}
