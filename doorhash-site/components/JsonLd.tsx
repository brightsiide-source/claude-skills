import { site } from "@/lib/site";

const BASE = "https://doorhashnm.com";

/**
 * LocalBusiness — entity definition for the doorhash dispensary + delivery.
 * Used globally on every page via root layout. Anchors the @id graph.
 */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${BASE}/#store`,
    name: site.legalName,
    alternateName: ["DoorHash Cannabis", "doorhash"],
    description: site.description,
    url: BASE,
    telephone: site.phone,
    email: site.email,
    image: `${BASE}/og.svg`,
    logo: `${BASE}/favicon.svg`,
    priceRange: "$$",
    paymentAccepted: ["Cash", "Debit Card"],
    currenciesAccepted: "USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Cruces",
      addressRegion: "NM",
      addressCountry: "US",
    },
    areaServed: site.delivery.cities.map((c) => ({
      "@type": "City",
      name: c,
      containedInPlace: { "@type": "State", name: "New Mexico" },
    })),
    parentOrganization: { "@id": `${BASE}/#organization` },
    sameAs: [site.social.instagram, site.social.twitter, site.social.tiktok],
    knowsAbout: [
      "cannabis delivery",
      "cannabis retail",
      "indoor cannabis cultivation",
      "Don Verde Farms",
      "Southern New Mexico cannabis",
      "Las Cruces dispensary",
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Organization — parent + sister-brand graph. Don Verde Farms is the parent.
 */
export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: site.legalName,
    legalName: site.legalName,
    description: site.description,
    url: BASE,
    logo: `${BASE}/favicon.svg`,
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Cruces",
        addressRegion: "NM",
        addressCountry: "US",
      },
    },
    parentOrganization: {
      "@type": "Organization",
      "@id": "https://donverdefarms.com/#organization",
      name: site.parent,
      url: "https://donverdefarms.com",
      description:
        "Don Verde Farms is an indoor cannabis cultivator in Southern New Mexico. Don Verde owns and operates the doorhash retail and delivery brand.",
    },
    founder: [
      { "@type": "Person", name: "Neal Lucas", jobTitle: "Co-Founder" },
      { "@type": "Person", name: "Mike", jobTitle: "Co-Founder" },
      { "@type": "Person", name: "Javi", jobTitle: "Co-Founder" },
    ],
    sameAs: [site.social.instagram, site.social.twitter, site.social.tiktok],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone,
      email: site.email,
      contactType: "customer service",
      areaServed: "US-NM",
      availableLanguage: ["English", "Spanish"],
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * WebSite — anchors search-engine entity recognition for the domain.
 */
export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: site.legalName,
    alternateName: "doorhash",
    description: site.description,
    publisher: { "@id": `${BASE}/#organization` },
    inLanguage: "en-US",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Service — describes the cannabis delivery service offered.
 * Critical for AI engines answering "cannabis delivery near me" type queries.
 */
export function DeliveryServiceJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}/#delivery-service`,
    serviceType: "Cannabis Delivery",
    name: "DoorHash Cannabis Delivery",
    description:
      "DoorHash delivers cannabis flower, vapes, edibles, and concentrates across Las Cruces, New Mexico — centered on zip code 88007 with a 5 to 10 mile delivery radius — with an average delivery time of 30 to 55 minutes. Order minimum is $50; delivery is free over $100.",
    provider: { "@id": `${BASE}/#store` },
    areaServed: site.delivery.cities.map((c) => ({
      "@type": "City",
      name: c,
      containedInPlace: { "@type": "State", name: "New Mexico" },
    })),
    offers: {
      "@type": "Offer",
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: site.delivery.minOrder,
        priceCurrency: "USD",
        description: `${site.delivery.minOrder} dollar minimum order. Free delivery on orders of ${site.delivery.freeDeliveryOver} dollars or more.`,
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DoorHash Menu",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Cannabis Flower" },
        { "@type": "OfferCatalog", name: "Pre-Rolls" },
        { "@type": "OfferCatalog", name: "Vape Cartridges" },
        { "@type": "OfferCatalog", name: "Edibles" },
        { "@type": "OfferCatalog", name: "Concentrates" },
        { "@type": "OfferCatalog", name: "Drinks" },
      ],
    },
    audience: {
      "@type": "Audience",
      audienceType: "Adults 21 and over with valid government-issued ID",
    },
    termsOfService: `${BASE}/faq`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * HowTo — steps to place a delivery order. AI engines extract these as
 * answers to "how to order cannabis delivery in Las Cruces" queries.
 */
export function HowToOrderJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${BASE}/#how-to-order`,
    name: "How to order cannabis delivery from DoorHash in Las Cruces, NM",
    description:
      "Step-by-step process to order cannabis delivery from DoorHash in Las Cruces, New Mexico.",
    totalTime: "PT2M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: site.delivery.minOrder,
    },
    supply: [
      { "@type": "HowToSupply", name: "Valid government-issued photo ID showing age 21+" },
      { "@type": "HowToSupply", name: "Cash or debit card for payment on delivery" },
      { "@type": "HowToSupply", name: "Delivery address within DoorHash service area" },
    ],
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Enter your delivery address",
        text: "Visit doorhashnm.com and enter your delivery address. The site confirms whether your location is within the DoorHash service area — Las Cruces, NM, centered on zip code 88007 with a 5 to 10 mile radius.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Browse the live menu",
        text: "Shop the real-time DoorHash menu — flower, pre-rolls, vapes, edibles, and concentrates. Inventory and prices update in real time so you only see in-stock products.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Add items to cart and check out",
        text: "Build your cart with at least $50 to meet the order minimum. Orders of $100 or more deliver free. Choose payment method (cash or debit on delivery).",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Track your delivery",
        text: "Receive a tracking link via SMS the moment a driver picks up your order. Average delivery ETA is 30 to 55 minutes.",
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Receive your order with valid ID",
        text: "Present a valid government-issued ID showing you are 21 or older. The driver scans the ID, you sign for the delivery, and pay with cash or debit.",
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * FAQ schema for AI answer extraction.
 */
export function FaqJsonLd({ faqs }: { faqs: { q: string; a: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Breadcrumb trail for site hierarchy.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url.startsWith("http") ? it.url : `${BASE}${it.url}`,
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Speakable — marks key passages as voice-search-friendly.
 * Apply on pages with answer-quality content (FAQ, How To Order, About).
 */
export function SpeakableJsonLd({ cssSelector }: { cssSelector: string[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
