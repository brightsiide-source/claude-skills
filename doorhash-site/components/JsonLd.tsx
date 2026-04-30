import { site } from "@/lib/site";

const BASE = "https://doorhash.com";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${BASE}/#store`,
    name: site.legalName,
    alternateName: "DoorHash Cannabis",
    description: site.description,
    url: BASE,
    telephone: site.phone,
    email: site.email,
    image: `${BASE}/og.svg`,
    logo: `${BASE}/favicon.svg`,
    priceRange: "$$",
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
    parentOrganization: {
      "@type": "Organization",
      name: site.parent,
      url: "https://donverdefarms.com",
    },
    sameAs: [site.social.instagram, site.social.twitter, site.social.tiktok],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: site.legalName,
    description: site.description,
    publisher: { "@id": `${BASE}/#store` },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

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
