import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const heading = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "S&C Exteriors | Roofing, Siding, Gutters & Concrete | Johnston, Iowa",
  description:
    "Your Central Iowa roofing and exterior experts. S&C Exteriors provides professional roofing, siding, gutter, and concrete services for residential and commercial properties in Johnston and all of Central Iowa.",
  keywords: [
    "roofing contractor Johnston Iowa",
    "siding installation Central Iowa",
    "gutter repair Des Moines",
    "concrete contractor Iowa",
    "S&C Exteriors",
    "exterior services Johnston IA",
  ],
  openGraph: {
    title: "S&C Exteriors | Central Iowa Roofing & Exterior Experts",
    description:
      "Professional roofing, siding, gutter, and concrete services for residential and commercial properties in Central Iowa.",
    url: "https://www.sandcexteriors.com",
    siteName: "S&C Exteriors",
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
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="font-body text-gray-800 antialiased">
        <Header />
        <main className="pt-[108px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
