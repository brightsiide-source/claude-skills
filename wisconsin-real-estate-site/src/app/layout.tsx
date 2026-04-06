import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wisconsin Cash Home Buyers | Sell Your House Fast for Cash",
  description:
    "We buy houses in Wisconsin for cash. Get a fair offer in 24 hours. Close in 30 days or less. No repairs, no fees, no closing costs. Serving Milwaukee, Madison, Green Bay & all WI metros.",
  keywords:
    "sell my house fast Wisconsin, cash home buyers Milwaukee, we buy houses Madison, sell house fast Green Bay, cash offer home Wisconsin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-black text-white">{children}</body>
    </html>
  );
}
