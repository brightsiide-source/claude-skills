import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AgeGate } from "@/components/AgeGate";
import { SmoothScroll } from "@/components/SmoothScroll";
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
    default: `${site.legalName} — ${site.tagline}`,
    template: `%s — ${site.legalName}`,
  },
  description: site.description,
  metadataBase: new URL("https://doorhash.com"),
  openGraph: {
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    siteName: site.legalName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrains.variable}`}>
      <body className="bg-ink-950 text-cream antialiased">
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
