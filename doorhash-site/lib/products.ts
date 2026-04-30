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

// Placeholder catalog used for floating product tiles on the homepage.
// Real inventory pulls from the Dutchie embed on /menu.
export const featuredProducts: Product[] = [
  {
    id: "dv-tropic-thunder",
    name: "Tropic Thunder",
    brand: "Don Verde",
    category: "Flower",
    strain: "Hybrid",
    thc: "29.4%",
    price: 45,
    hue: "from-leaf-400 to-emerald-500",
    emoji: "🌿",
    badge: "House",
  },
  {
    id: "dv-verde-velvet",
    name: "Verde Velvet",
    brand: "Don Verde",
    category: "Flower",
    strain: "Indica",
    thc: "31.2%",
    price: 50,
    hue: "from-purple-500 to-leaf-500",
    emoji: "💜",
    badge: "Top Shelf",
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
  {
    id: "team-elite-zushi",
    name: "Zushi Mints",
    brand: "Team Elite Genetics",
    category: "Flower",
    strain: "Hybrid",
    thc: "33.0%",
    price: 55,
    hue: "from-pink-500 to-rose-600",
    emoji: "❄️",
    badge: "Drop",
  },
  {
    id: "blem-gummies",
    name: "Watermelon Gummies 100mg",
    brand: "BLEM",
    category: "Edibles",
    strain: "Hybrid",
    thc: "100mg",
    price: 18,
    hue: "from-rose-400 to-red-500",
    emoji: "🍉",
  },
  {
    id: "canndescent-calm-no2",
    name: "Calm No. 2",
    brand: "Canndescent",
    category: "Flower",
    strain: "Indica",
    thc: "24.6%",
    price: 48,
    hue: "from-violet-500 to-fuchsia-600",
    emoji: "🌙",
  },
];

export const strainTickerWords = [
  "Tropic Thunder",
  "Verde Velvet",
  "ASPD OG",
  "Blueberry Cake",
  "Zushi Mints",
  "Calm No.2",
  "Watermelon 100mg",
  "Emerald RSO",
  "House Cut Hash",
  "Sundae Driver",
  "Apples & Bananas",
  "Lemon Cherry Gelato",
];
