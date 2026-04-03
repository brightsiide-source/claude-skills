import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Black Ridge Contracting | Roofing, Siding, Gutters & Concrete | Central Iowa",
  description:
    "Your Central Iowa roofing and exterior experts. Black Ridge Contracting provides professional roofing, siding, gutter, and concrete services for residential and commercial properties across all of Central Iowa.",
  keywords: [
    "roofing contractor Johnston Iowa",
    "siding installation Central Iowa",
    "gutter repair Des Moines",
    "concrete contractor Iowa",
    "Black Ridge Contracting",
    "exterior services Johnston IA",
  ],
  openGraph: {
    title: "Black Ridge Contracting | Central Iowa Roofing & Exterior Experts",
    description:
      "Professional roofing, siding, gutter, and concrete services for residential and commercial properties in Central Iowa.",
    url: "https://www.blackridgecontracting.com",
    siteName: "Black Ridge Contracting",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-gray-800 antialiased">
        <Header />
        <main className="pt-[108px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
