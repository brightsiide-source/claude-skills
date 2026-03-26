import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://baltimorewebuyhomes.com"),
  title: {
    default:
      "We Buy Houses Baltimore MD | Cash Offer in 24 Hours | Close in 30 Days",
    template: "%s | Baltimore Cash Home Buyers",
  },
  description:
    "Sell your Baltimore house fast for cash. No repairs, no agents, no closing costs. We buy houses in any condition across the Baltimore metro area. Get your free, no-obligation cash offer in 24 hours and close in as little as 30 days.",
  keywords: [
    "we buy houses Baltimore",
    "sell my house fast Baltimore",
    "cash home buyers Baltimore MD",
    "sell house as-is Baltimore",
    "Baltimore house buyers",
    "sell my house fast Maryland",
    "cash for homes Baltimore",
    "we buy ugly houses Baltimore",
    "sell inherited house Baltimore",
    "foreclosure help Baltimore",
    "Baltimore real estate investors",
    "sell house no repairs Baltimore",
    "quick home sale Baltimore",
    "Baltimore County cash buyers",
    "sell house fast Dundalk",
    "cash home buyers Towson",
    "sell house fast Essex MD",
    "we buy houses Glen Burnie",
    "sell house Columbia MD",
    "Ellicott City cash home buyers",
  ],
  authors: [{ name: "Baltimore Cash Home Buyers" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Baltimore Cash Home Buyers",
    title: "We Buy Houses Baltimore MD | Cash Offer in 24 Hours",
    description:
      "Get a fair cash offer for your Baltimore home in 24 hours. No repairs, no agents, no fees. Close in 30 days or less.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "We Buy Houses in Baltimore for Cash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Buy Houses Baltimore MD | Cash Offer in 24 Hours",
    description:
      "Sell your Baltimore house fast for cash. No repairs, no agents, no closing costs.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://baltimorewebuyhomes.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Baltimore Cash Home Buyers",
    description:
      "We buy houses for cash in the Baltimore metro area. Get a fair cash offer in 24 hours and close in 30 days or less. No repairs, no agents, no closing costs.",
    url: "https://baltimorewebuyhomes.com",
    telephone: "(410) 555-CASH",
    email: "offers@baltimorewebuyhomes.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "100 E Pratt St",
      addressLocality: "Baltimore",
      addressRegion: "MD",
      postalCode: "21202",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.2904,
      longitude: -76.6122,
    },
    areaServed: [
      { "@type": "City", name: "Baltimore", containedInPlace: "Maryland" },
      { "@type": "AdministrativeArea", name: "Baltimore County" },
      { "@type": "AdministrativeArea", name: "Anne Arundel County" },
      { "@type": "AdministrativeArea", name: "Howard County" },
      { "@type": "AdministrativeArea", name: "Harford County" },
      { "@type": "City", name: "Towson" },
      { "@type": "City", name: "Dundalk" },
      { "@type": "City", name: "Essex" },
      { "@type": "City", name: "Glen Burnie" },
      { "@type": "City", name: "Columbia" },
      { "@type": "City", name: "Ellicott City" },
      { "@type": "City", name: "Catonsville" },
      { "@type": "City", name: "Parkville" },
      { "@type": "City", name: "Owings Mills" },
      { "@type": "City", name: "Pikesville" },
      { "@type": "City", name: "Edgewood" },
      { "@type": "City", name: "Bel Air" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    priceRange: "$$",
    image: "https://baltimorewebuyhomes.com/images/og-image.jpg",
    sameAs: [
      "https://www.facebook.com/BaltimoreCashHomeBuyers",
      "https://www.google.com/maps?cid=YOUR_GOOGLE_CID",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can you buy my Baltimore house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We can close in as little as 30 days or less. In some cases, we can close in as few as 7-14 days if you need to sell quickly. We work on your timeline.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to make repairs before selling?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No! We buy houses in any condition — fire damage, mold, structural issues, outdated, hoarder houses, you name it. We handle all repairs after closing.",
        },
      },
      {
        "@type": "Question",
        name: "Are there any fees or closing costs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Zero fees and zero closing costs. We pay all closing costs. The cash offer you accept is the amount you receive at closing. No hidden charges.",
        },
      },
      {
        "@type": "Question",
        name: "What areas in Baltimore do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We buy houses throughout the entire Baltimore metro area including Baltimore City, Baltimore County, Anne Arundel County, Howard County, Harford County, and surrounding areas like Towson, Dundalk, Essex, Glen Burnie, Columbia, Ellicott City, and more.",
        },
      },
      {
        "@type": "Question",
        name: "How do you determine the cash offer for my house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We evaluate your property based on its location, condition, comparable recent sales in the neighborhood, and current market conditions. Our offers are fair, transparent, and come with no obligation.",
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="geo.region" content="US-MD" />
        <meta name="geo.placename" content="Baltimore" />
        <meta name="geo.position" content="39.2904;-76.6122" />
        <meta name="ICBM" content="39.2904, -76.6122" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
