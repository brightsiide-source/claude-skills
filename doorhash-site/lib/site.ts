export const site = {
  name: "doorhash",
  legalName: "DoorHash",
  tagline: "Speed. Discretion. Soul.",
  longTagline:
    "Cannabis delivery in Las Cruces, New Mexico — straight from Don Verde Farms to your door.",
  description:
    "Cannabis delivery in Las Cruces, NM. Top-shelf flower, vapes, edibles, and concentrates from Don Verde Farms — same-day within 5 to 10 miles of 88007.",
  parent: "Don Verde Farms",
  region: "Las Cruces, NM",
  hq: "Las Cruces, NM 88007",
  domain: "doorhashnm.com",
  baseUrl: "https://doorhashnm.com",
  age: 21,
  phone: "(575) 555-0420",
  email: "hello@doorhashnm.com",
  social: {
    instagram: "https://instagram.com/doorhash",
    twitter: "https://twitter.com/doorhash",
    tiktok: "https://tiktok.com/@doorhash",
  },
  dutchie: {
    // Replace with the real Dutchie embed URL once finalized.
    embedUrl: "https://dutchie.com/embedded-menu/door-hash",
    storeSlug: "door-hash",
  },
  delivery: {
    minOrder: 50,
    freeDeliveryOver: 100,
    // Single zone: 5–10 mile radius from 88007 (NW Las Cruces).
    // Realistically covers Las Cruces proper + Mesilla; outer edges may
    // include parts of Doña Ana (the unincorporated community).
    centerZip: "88007",
    radiusMiles: { inner: 5, outer: 10 },
    cities: ["Las Cruces"],
    primaryCity: "Las Cruces",
    // Neighborhoods inside the 5–10 mile radius — used for the coverage
    // map pins and for "do you deliver to ___" answers, not as separate
    // marketing cities.
    neighborhoods: ["Mesilla", "Picacho Hills", "University Park", "NW Las Cruces"],
    avgEta: "30–55 min",
  },
  nav: [
    { href: "/menu", label: "Menu" },
    { href: "/delivery", label: "Delivery" },
    { href: "/locations", label: "Locations" },
    { href: "/farm", label: "The Farm" },
    { href: "/rewards", label: "Rewards" },
    { href: "/about", label: "About" },
  ],
  footerLinks: [
    {
      title: "Shop",
      items: [
        { href: "/menu", label: "Full Menu" },
        { href: "/delivery", label: "Delivery" },
        { href: "/locations", label: "Locations" },
        { href: "/rewards", label: "Rewards" },
      ],
    },
    {
      title: "Company",
      items: [
        { href: "/about", label: "About" },
        { href: "/farm", label: "Don Verde Farms" },
        { href: "/careers", label: "Careers" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Help",
      items: [
        { href: "/faq", label: "FAQ" },
        { href: "/delivery", label: "Delivery info" },
        { href: "/terms", label: "Terms" },
        { href: "/privacy", label: "Privacy" },
      ],
    },
  ],
};

export type Site = typeof site;

