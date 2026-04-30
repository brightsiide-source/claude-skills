export interface City {
  slug: string;
  name: string;
  region: string;
  county: string;
  population: string;
  lede: string;
  marketNote: string;
  stockingShops: { name: string; href?: string; note?: string }[];
}

export const cities: City[] = [
  {
    slug: "albuquerque",
    name: "Albuquerque",
    region: "Central New Mexico",
    county: "Bernalillo County",
    population: "562,000+",
    lede: "Albuquerque is New Mexico's largest cannabis market and the densest concentration of recreational dispensaries in the state. Don Verde Farms drops indoor flower into ABQ on a rolling cadence — small batches, premium menus, never bulk.",
    marketNote: "ABQ buyers tend to know their growers. The shops that stock Don Verde here are the ones whose budtenders can talk lineage and terpene profile, not just THC numbers.",
    stockingShops: [
      { name: "Stocking dispensary — coming", note: "Final list publishes with the next drop." }
    ]
  },
  {
    slug: "las-cruces",
    name: "Las Cruces",
    region: "Southern New Mexico",
    county: "Doña Ana County",
    population: "112,000+",
    lede: "Las Cruces is the closest major city to our farm. We grow within driving distance of every dispensary on this list, which means flower comes off the cure and onto the shelf without a multi-day shipping leg in between.",
    marketNote: "Las Cruces customers — especially the cross-border NM/TX traffic — are increasingly looking for craft NM-grown flower over national imports. That's the lane we're built for.",
    stockingShops: [
      { name: "Stocking dispensary — coming", note: "We hand-place at Las Cruces shops. Inquiries open." }
    ]
  },
  {
    slug: "santa-fe",
    name: "Santa Fe",
    region: "North Central New Mexico",
    county: "Santa Fe County",
    population: "89,000+",
    lede: "Santa Fe's recreational market favors craft and connoisseur — premium flower, well-cured, with a real story behind it. That's the brief Don Verde was built around.",
    marketNote: "Santa Fe budtenders tend to do real consultation rather than transactional sales. We provide talk-tracks and lineage notes for every cultivar so the floor staff can actually do that work.",
    stockingShops: [
      { name: "Stocking dispensary — coming", note: "Limited Santa Fe drops available on request." }
    ]
  },
  {
    slug: "sunland-park",
    name: "Sunland Park",
    region: "Southern New Mexico Border Region",
    county: "Doña Ana County",
    population: "16,000+",
    lede: "Sunland Park sits on the NM/TX/Mexico tri-state border — the busiest single-store cannabis traffic per capita in the state. We supply the operators here who keep their shelves built around quality, not turnover.",
    marketNote: "Border-zone dispensaries see real volume but reward standout product. Don Verde's small-batch indoor sits next to mass-grow flower and consistently moves first.",
    stockingShops: [
      { name: "Stocking dispensary — coming", note: "Border-region wholesale openings — inquire for placement." }
    ]
  },
  {
    slug: "roswell",
    name: "Roswell",
    region: "Eastern New Mexico",
    county: "Chaves County",
    population: "48,000+",
    lede: "Roswell is an underserved cannabis market with discerning longtime customers — the kind of shoppers who know when a strain has been rushed and when it's been cured properly. We grow for them.",
    marketNote: "Eastern NM dispensaries get fewer craft brand drops than the Albuquerque corridor. Don Verde Farms ships east — same indoor cure, no compromise on the road.",
    stockingShops: [
      { name: "Stocking dispensary — coming", note: "Eastern NM availability expanding." }
    ]
  }
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
