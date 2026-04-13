import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = "https://sacashhomebuyers.com";

export const metadata: Metadata = {
  title: "We Buy Houses San Antonio | Cash Home Buyers | Close in 30 Days",
  description:
    "Sell your San Antonio house fast for cash. No repairs, no closing costs, no commissions. Get a fair cash offer in 24 hours and close in as little as 7 days. We buy houses in any condition.",
  keywords:
    "we buy houses san antonio, sell my house fast san antonio, cash home buyers san antonio, sell house as is san antonio, we buy ugly houses san antonio, cash for houses san antonio tx",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "We Buy Houses San Antonio | Get a Cash Offer in 24 Hours",
    description:
      "Sell your San Antonio house fast for cash. No repairs, no closing costs, no commissions. Close in as little as 7 days.",
    url: SITE_URL,
    siteName: "SA Cash Home Buyers",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SA Cash Home Buyers - We Buy Houses in San Antonio for Cash",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "We Buy Houses San Antonio | Cash Offer in 24 Hours",
    description:
      "Sell your San Antonio house fast for cash. No repairs, no fees. Close in 7 days.",
    images: ["/og-image.png"],
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
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description:
    "We buy houses for cash in San Antonio, TX. Fast closings, no repairs, no fees. Get a fair cash offer in 24 hours and close in as little as 7 days.",
  url: SITE_URL,
  telephone: "+1-309-883-9464",
  email: "info@sacashhomebuyers.com",
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/og-image.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "San Antonio",
    addressLocality: "San Antonio",
    addressRegion: "TX",
    postalCode: "78201",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 29.4241,
    longitude: -98.4936,
  },
  areaServed: [
    { "@type": "City", name: "San Antonio", sameAs: "https://en.wikipedia.org/wiki/San_Antonio" },
    { "@type": "City", name: "Converse" },
    { "@type": "City", name: "Schertz" },
    { "@type": "City", name: "New Braunfels" },
    { "@type": "City", name: "Boerne" },
    { "@type": "City", name: "Seguin" },
    { "@type": "City", name: "Helotes" },
    { "@type": "City", name: "Leon Valley" },
    { "@type": "City", name: "Live Oak" },
    { "@type": "City", name: "Universal City" },
    { "@type": "City", name: "Floresville" },
    { "@type": "City", name: "Pleasanton" },
    { "@type": "AdministrativeArea", name: "Bexar County" },
  ],
  sameAs: [],
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.9,
    reviewCount: 200,
    bestRating: 5,
    worstRating: 1,
  },
  review: [
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Maria G." },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "I was facing foreclosure and didn't know what to do. These guys gave me a fair cash offer and closed in 12 days. They literally saved my credit. I can't thank them enough.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "James T." },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "Inherited my mother's house and it needed a LOT of work. They bought it as-is and I didn't have to spend a dime. The whole process was smooth and professional.",
    },
    {
      "@type": "Review",
      author: { "@type": "Person", name: "Sandra & Mike R." },
      reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
      reviewBody:
        "We needed to relocate for work in 3 weeks. They made us a fair offer the same day we called and we closed in 10 days. No showings, no hassle. Just done.",
    },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Sell Your House for Cash in San Antonio",
  description:
    "We buy houses in any condition for cash in San Antonio, TX. No repairs, no closing costs, no commissions. Get a fair cash offer in 24 hours and close in as little as 7 days.",
  provider: {
    "@type": "RealEstateAgent",
    name: "SA Cash Home Buyers",
    url: SITE_URL,
  },
  areaServed: {
    "@type": "City",
    name: "San Antonio",
    sameAs: "https://en.wikipedia.org/wiki/San_Antonio",
  },
  serviceType: "Cash Home Buying",
  offers: {
    "@type": "Offer",
    description:
      "Free, no-obligation cash offer for your San Antonio home — any condition, close in as few as 7 days",
    price: "0",
    priceCurrency: "USD",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Sell Your House for Cash in San Antonio",
  description:
    "Sell your San Antonio house in 3 simple steps — contact us, get a cash offer, and close on your timeline.",
  totalTime: "P30D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Contact Us",
      text: "Fill out our quick form or give us a call. Tell us about your property — any condition, any situation. No judgment, just solutions.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Get Your Cash Offer",
      text: "We'll evaluate your home and present a fair, no-obligation cash offer within 24 hours. No hidden fees, no surprises.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Close on Your Timeline",
      text: "Accept our offer and choose your closing date — as fast as 7 days or up to 30. We pay ALL closing costs. You walk away with cash.",
    },
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL,
  name: "SA Cash Home Buyers",
  description:
    "We buy houses for cash in San Antonio, TX. Fast closings, no repairs, no fees.",
  publisher: {
    "@type": "Organization",
    name: "SA Cash Home Buyers",
    url: SITE_URL,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do you determine your cash offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We evaluate your property based on its location, condition, the current San Antonio market, and comparable sales in your neighborhood. Our goal is always to give you a fair, competitive offer.",
      },
    },
    {
      "@type": "Question",
      name: "Do I really pay zero closing costs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — we pay ALL closing costs. The offer we make is the amount you walk away with. No hidden fees, no last-minute deductions.",
      },
    },
    {
      "@type": "Question",
      name: "How fast can you actually close?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can close in as few as 7 days if needed, though most sellers choose 2-4 weeks. You pick the closing date that works for your schedule.",
      },
    },
    {
      "@type": "Question",
      name: "What if my house needs major repairs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No problem. We buy houses in any condition — foundation issues, roof damage, mold, fire damage, you name it. You don't need to fix a thing.",
      },
    },
    {
      "@type": "Question",
      name: "Is there any obligation if I get an offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely not. Our cash offers are 100% no-obligation. If you don't like our offer, you're free to walk away with no pressure.",
      },
    },
    {
      "@type": "Question",
      name: "Are you going to lowball me?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide fair market offers based on real data. While we can't always match full retail value (since you're saving on repairs, commissions, and closing costs), many sellers find our net offer is very competitive when you factor in the savings.",
      },
    },
    {
      "@type": "Question",
      name: "Do you buy houses with tenants?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We buy occupied properties, even those with difficult tenants. You don't need to deal with evictions — we handle everything after closing.",
      },
    },
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We buy houses throughout San Antonio, Bexar County, and the surrounding areas including New Braunfels, Boerne, Seguin, Schertz, Converse, and more.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#38BDF8" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="San Antonio" />
        <meta name="geo.position" content="29.4241;-98.4936" />
        <meta name="ICBM" content="29.4241, -98.4936" />
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(howToSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
