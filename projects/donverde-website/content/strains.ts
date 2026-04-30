export type StrainType = "indica" | "sativa" | "hybrid";

export interface Strain {
  slug: string;
  name: string;
  type: StrainType;
  lineage: string;
  thc: string;
  dominantTerpenes: string[];
  tagline: string;
  notes: string;
  effects: string[];
  flavors: string[];
  cultivar: "in-house" | "classic" | "exotic";
  featured?: boolean;
}

export const strains: Strain[] = [
  {
    slug: "rio-grande-runtz",
    name: "Rio Grande Runtz",
    type: "hybrid",
    lineage: "Runtz × Don Verde Phenotype #4",
    thc: "27.4%",
    dominantTerpenes: ["Caryophyllene", "Limonene", "Linalool"],
    tagline: "Candy nose, desert finish.",
    notes:
      "Dense, frost-coated nugs with a sticky pull and a candy-store bouquet. The DVF #4 cut sharpens the sweet Runtz top-note with a peppery, gas-tinted backbone — a connoisseur hybrid that still holds shelf appeal.",
    effects: ["Euphoric", "Relaxed", "Creative"],
    flavors: ["Sweet", "Tropical Citrus", "Pepper"],
    cultivar: "in-house",
    featured: true
  },
  {
    slug: "mesilla-mintz",
    name: "Mesilla Mintz",
    type: "indica",
    lineage: "Animal Mints × Kush Mintz",
    thc: "29.1%",
    dominantTerpenes: ["Caryophyllene", "Humulene", "Myrcene"],
    tagline: "Cool menthol, deep dusk.",
    notes:
      "A heavy mint-driven indica grown for the slow burn. Long flower time, slow-cured to keep the chlorophyll out and the terps loud. For evenings, recovery, and the kind of customer who knows what they're ordering.",
    effects: ["Sedating", "Body-heavy", "Sleep"],
    flavors: ["Mint", "Cookie Dough", "Earthy"],
    cultivar: "classic",
    featured: true
  },
  {
    slug: "high-desert-haze",
    name: "High Desert Haze",
    type: "sativa",
    lineage: "Super Silver Haze × Chemdog '91",
    thc: "26.8%",
    dominantTerpenes: ["Terpinolene", "Pinene", "Ocimene"],
    tagline: "All upshift, no crash.",
    notes:
      "A bright, lifted morning sativa with the unmistakable SSH zest cut by classic Chem funk. Built for the daytime menu — productive, chatty, clear-headed. A reliable pull-through for any sativa-leaning shopper.",
    effects: ["Energizing", "Focused", "Uplifted"],
    flavors: ["Citrus Peel", "Pine", "Diesel"],
    cultivar: "in-house",
    featured: true
  },
  {
    slug: "javelina-jelly",
    name: "Javelina Jelly",
    type: "hybrid",
    lineage: "Pink Jelly × Sundae Driver",
    thc: "28.2%",
    dominantTerpenes: ["Limonene", "Caryophyllene", "Myrcene"],
    tagline: "Pink-stem heritage, balanced midday burn.",
    notes:
      "Soft pink hues run through the calyxes; the smoke is jammy and rounded. A balanced hybrid that performs equally well in pre-rolls and whole flower jars.",
    effects: ["Balanced", "Happy", "Social"],
    flavors: ["Berry", "Cream", "Vanilla"],
    cultivar: "in-house"
  },
  {
    slug: "border-glue",
    name: "Border Glue",
    type: "indica",
    lineage: "Original Glue (GG4) × Don Verde Cut",
    thc: "30.3%",
    dominantTerpenes: ["Caryophyllene", "Limonene", "Pinene"],
    tagline: "Sticky, stoney, ours.",
    notes:
      "Our take on the GG4 lineage — slowed down, terp-forward, and trichome-soaked. A budtender favorite for the customer asking for 'something heavy.'",
    effects: ["Heavy", "Relaxed", "Couch-lock"],
    flavors: ["Pine Resin", "Coffee", "Earth"],
    cultivar: "classic"
  },
  {
    slug: "cumbres-cookies",
    name: "Cumbres Cookies",
    type: "hybrid",
    lineage: "GSC × Wedding Cake",
    thc: "27.9%",
    dominantTerpenes: ["Limonene", "Caryophyllene", "Linalool"],
    tagline: "High-altitude crossover.",
    notes:
      "Grown to a tall finish and cured patiently. Cookie-forward palate with a Wedding Cake creamy tail — a high-margin daily for any well-stocked menu.",
    effects: ["Relaxed", "Creative", "Hungry"],
    flavors: ["Cookie", "Vanilla Cream", "Spice"],
    cultivar: "classic"
  }
];

export function getStrain(slug: string) {
  return strains.find((s) => s.slug === slug);
}

export function getFeaturedStrains() {
  return strains.filter((s) => s.featured);
}
