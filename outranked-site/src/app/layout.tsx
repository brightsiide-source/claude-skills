import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Outranked SEO Agency | Dominate Local Search Results",
    template: "%s | Outranked SEO Agency",
  },
  description:
    "Outranked is a data-driven SEO agency helping local businesses rank higher on Google. Web design, local SEO, Google Ads, and content marketing packages starting at $5,000.",
  keywords: [
    "SEO agency",
    "local SEO",
    "web design",
    "Google Ads",
    "search engine optimization",
    "digital marketing",
  ],
  openGraph: {
    title: "Outranked SEO Agency | Dominate Local Search Results",
    description:
      "Data-driven SEO strategies that deliver measurable ROI for local businesses.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
