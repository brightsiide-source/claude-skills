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
};

// Featured product catalog used for floating tiles on the homepage.
// Strain names match the real Don Verde Farms cultivation catalog (rotates
// quarterly). Partner brands match what doorhash actually carries on the
// Dutchie menu. THC %s and prices are illustrative placeholders until live
// inventory wires through — see `lib/site.ts` for the Dutchie embed URL.
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
