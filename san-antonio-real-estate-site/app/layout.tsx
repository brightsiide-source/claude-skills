import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "We Buy Houses San Antonio | Cash Home Buyers | Close in 30 Days",
  description:
    "Sell your San Antonio house fast for cash. No repairs, no closing costs, no commissions. Get a fair cash offer in 24 hours and close in as little as 7 days. We buy houses in any condition.",
  keywords:
    "we buy houses san antonio, sell my house fast san antonio, cash home buyers san antonio, sell house as is san antonio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
