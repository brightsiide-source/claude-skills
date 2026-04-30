export const site = {
  name: "doorhash",
  legalName: "DoorHash",
  tagline: "Speed. Discretion. Soul.",
  longTagline:
    "Cannabis delivery and retail in Southern New Mexico — straight from our farm to your door.",
  description:
    "DoorHash is the fastest cannabis delivery and retail experience in Southern New Mexico. Top-shelf flower, vapes, edibles and concentrates from Don Verde Farms and the brands you trust — at your door in under an hour.",
  parent: "Don Verde Farms",
  region: "Southern New Mexico",
  hq: "Las Cruces, NM",
  age: 21,
  phone: "(575) 555-0420",
  email: "hello@doorhash.com",
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
    cities: ["Las Cruces", "Mesilla", "Sunland Park", "Anthony", "Doña Ana"],
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
