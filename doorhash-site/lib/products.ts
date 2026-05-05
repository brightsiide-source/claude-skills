export type Product = {
  id: string;
  name: string;
  brand: string;
  category: "Flower" | "Pre-rolls" | "Vapes" | "Edibles" | "Concentrates" | "Drinks";
  strain: "Indica" | "Sativa" | "Hybrid" | "CBD";
  thc: string;
  price: number;
  hue: string; // accent gradient
  emoji: string;
  badge?: string;
  // Documentary metadata — show on the card to signal craft + provenance.
  // Only populated for Don Verde house strains; partner brands leave blank.
  tastingNotes?: string[];      // e.g., ["citrus", "cherry", "cream"]
  harvestedDaysAgo?: number;    // e.g., 12  → "12d from harvest"
  lot?: string;                 // e.g., "DV-04-26"
};

// Featured product catalog used for floating tiles on the homepage.
// Strain names match the real Don Verde Farms cultivation catalog (rotates
// quarterly). Partner brands match what doorhash actually carries on the
// Dutchie menu. THC %s, prices, lot numbers, and harvest dates are
// illustrative placeholders until live inventory wires through —
// see `lib/site.ts` for the Dutchie embed URL.
export const featuredProducts: Product[] = [
  {
    id: "dv-lemon-cherry-gelato",
    name: "Lemon Cherry Gelato",
    brand: "Don Verde",
    category: "Flower",
    strain: "Hybrid",
    thc: "29.6%",
    price: 50,
    hue: "from-yellow-400 to-rose-500",
    emoji: "🍋",
    badge: "Top Shelf",
    tastingNotes: ["citrus", "cherry", "cream"],
    harvestedDaysAgo: 12,
    lot: "DV-04-26",
  },
  {
    id: "dv-runtz-rs11",
    name: "Runtz × RS11",
    brand: "Don Verde",
    category: "Flower",
    strain: "Hybrid",
    thc: "31.4%",
    price: 55,
    hue: "from-purple-500 to-pink-500",
    emoji: "🍇",
    badge: "House",
    tastingNotes: ["candy", "gas", "tropical"],
    harvestedDaysAgo: 18,
    lot: "DV-03-26",
  },
  {
    id: "dv-tropicana-cherry",
    name: "Tropicana Cherry",
    brand: "Don Verde",
    category: "Flower",
    strain: "Sativa",
    thc: "27.8%",
    price: 48,
    hue: "from-orange-400 to-red-500",
    emoji: "🍒",
    badge: "House",
    tastingNotes: ["orange", "cherry", "zest"],
    harvestedDaysAgo: 21,
    lot: "DV-02-26",
  },
  {
    id: "dv-french-macarons",
    name: "French Macarons",
    brand: "Don Verde",
    category: "Flower",
    strain: "Hybrid",
    thc: "30.2%",
    price: 52,
    hue: "from-pink-300 to-fuchsia-500",
    emoji: "🌸",
    badge: "Drop",
    tastingNotes: ["vanilla", "almond", "berry"],
    harvestedDaysAgo: 9,
    lot: "DV-05-26",
  },
  {
    id: "dv-julius-cesar",
    name: "Julius Cesar",
    brand: "Don Verde",
    category: "Flower",
    strain: "Sativa",
    thc: "28.9%",
    price: 48,
    hue: "from-amber-400 to-yellow-600",
    emoji: "👑",
    tastingNotes: ["earth", "spice", "citrus"],
    harvestedDaysAgo: 24,
    lot: "DV-01-26",
  },
  {
    id: "kurvana-aspd-og",
    name: "ASPD OG Live Resin",
    brand: "Kurvana",
    category: "Vapes",
    strain: "Hybrid",
    thc: "88.1%",
    price: 60,
    hue: "from-amber-400 to-orange-500",
    emoji: "💨",
    tastingNotes: ["pine", "kush", "earth"],
  },
  {
    id: "claybourne-blueberry",
    name: "Blueberry Cake Pre-roll Pack",
    brand: "Claybourne",
    category: "Pre-rolls",
    strain: "Hybrid",
    thc: "26.8%",
    price: 35,
    hue: "from-sky-400 to-indigo-500",
    emoji: "🚀",
    tastingNotes: ["blueberry", "cake", "sweet"],
  },
  {
    id: "emerald-rso-1g",
    name: "Emerald Bay RSO 1g",
    brand: "Emerald Bay",
    category: "Concentrates",
    strain: "Indica",
    thc: "72.4%",
    price: 40,
    hue: "from-emerald-500 to-teal-600",
    emoji: "🟢",
    badge: "Med",
    tastingNotes: ["earth", "gas", "full spectrum"],
  },
];

// Strain ticker on the hero — mixes real Don Verde catalog cuts with a
// few rotating partner-brand drops. Order is intentional (rhythm).
export const strainTickerWords = [
  "Lemon Cherry Gelato",
  "Runtz × RS11",
  "Tropicana Cherry",
  "Sugar Cane",
  "French Macarons",
  "Gelato Grape Pie",
  "Julius Cesar",
  "Don Verde d9",
  "ASPD OG",
  "Blueberry Cake",
  "Emerald RSO",
  "House Cut Rosin",
];
