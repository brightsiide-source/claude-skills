export interface JournalPost {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
  body: string[];
  pullQuote?: string;
  related?: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "indoor-cannabis-southern-new-mexico",
    title: "Why indoor cannabis wins in Southern New Mexico",
    description:
      "Outdoor cannabis is romantic; in Southern New Mexico, it's also brutally hard. Here's why Don Verde Farms grows entirely indoors — and what that gives every jar that ends up on a dispensary shelf.",
    category: "Cultivation",
    publishedAt: "2026-04-12",
    readMinutes: 4,
    pullQuote:
      "Outdoor in Southern NM isn't a romantic alternative. It's a different sport, and it ends with a different product on the shelf.",
    body: [
      "There's a story cannabis culture likes to tell about the outdoor harvest — sun-grown plants, cool nights, the romance of agriculture in its oldest form. It plays well in California. It plays well in southern Oregon. It does not play well in the Southern New Mexico high desert, and our flower is the way it is because of that fact.",
      "We're growing in a region where the daytime summer high regularly clears 100°F, where nighttime temperatures swing forty degrees in under twelve hours, and where late-season monsoons can dump an inch of rain on a maturing plant with no warning. Cannabis plants tolerate stress; what they don't tolerate is *unpredictable* stress, week after week, in the back third of the flowering window. The terpenes are the first casualty. The trichome heads are the second. By the time the flower is hung, the chemistry has already moved.",
      "An indoor room solves that problem the way a recording studio solves a windy outdoor concert. We control the temperature inside a tight band. We control humidity to single-digit percent windows during late flower. The lights are predictable, the airflow is engineered, and pressure differentials between rooms keep contamination from one cycle out of the next. None of that is glamorous. All of it is the difference between a jar that smells like itself and a jar that smells like green hay.",
      "There's also a regulatory honesty to indoor cultivation in New Mexico. Outdoor grows here often have to manage cross-contamination from neighboring agricultural land — pesticide drift, water-rights ambiguity, soil heritage from previous crops. An indoor facility under an active state cultivation license has a documented input chain. Every nutrient, every irrigation source, every IPM intervention is recorded. When a batch goes to the lab, we already know what should and shouldn't be in the COA. There are no surprises.",
      "The trade-off is energy and capital. Indoor is more expensive to build, more expensive to run, and far more demanding on the operators day-to-day. We accept that — because we'd rather grow less and grow it correctly than grow more and ship something we can't stand behind. That's the whole brief.",
      "If you're a budtender or a buyer reading this, the practical version is short. When you pick up a Don Verde jar, the smell is going to match the strain it's labeled as. The trichomes are going to be intact. The cure will be where it should be. There won't be a 'this batch was a little off' apology coming with the wholesale invoice. That consistency is the entire reason we made the indoor decision in the first place."
    ],
    related: ["the-21-day-cure", "reading-terpenes-budtenders"]
  },
  {
    slug: "reading-terpenes-budtenders",
    title: "Reading terpenes: a budtender's guide to the Don Verde catalog",
    description:
      "THC percentage is the easy number to talk about. It's also the least useful one. Here's how to read terpene profiles like a buyer — and how to use them on the floor with customers.",
    category: "Education",
    publishedAt: "2026-04-22",
    readMinutes: 5,
    pullQuote:
      "When a customer asks 'what's strong?', the answer they actually want is rarely 'the highest THC.' It's 'the one that does what you want it to do.'",
    body: [
      "The single most common misuse of cannabis lab data, in our experience, is using THC percentage as a proxy for quality. It isn't. THC tells you what the plant produces in one specific cannabinoid pathway. It tells you nothing about how the flower will smoke, how it will smell when the jar opens, how the high will land, or how long it will last. The terpene profile tells you most of that — and a budtender who can read a terpene panel is worth a lot more on the floor than one who can quote percentages.",
      "Here are the four terpenes that show up most consistently across the Don Verde catalog, and what they do.",
      "**Caryophyllene** is a peppery, woody terpene — think black pepper, a little clove. It's heavy in our indica side and shows up in most of our hybrids too. Practically, caryophyllene tends to be calming without being sedating; people often describe it as the one that 'rounds the edges.' If a customer wants to chill but stay functional, caryophyllene-dominant flower is the move.",
      "**Limonene** is bright citrus — lemon peel, sometimes orange. Limonene-forward flower tends to be uplifting, social, conversational. It's the terpene most associated with mood lift in early-effect studies. When somebody walks in on a tough day and asks for 'something that makes me feel better,' point them at limonene first.",
      "**Linalool** is floral and spicy — the same terpene that dominates lavender. Linalool tends to push toward sleep and body relaxation, especially in combination with myrcene. We grow several cultivars with substantial linalool because the post-work, pre-bed customer is one of the most reliable repeat shoppers in any dispensary.",
      "**Terpinolene** is the wildcard — woody, herbaceous, slightly fruity. It's often the dominant terpene in lifted, daytime-leaning sativas. Terpinolene-dominant strains tend to feel clear-headed, almost caffeinated. These are the strains for the customer who needs to do something after they smoke.",
      "When you're recommending Don Verde flower, the conversation we want you to have isn't about percentages. It's: *here's what this strain smells like in the jar, here's the dominant terpene, and here's the experience that's likely to come with that profile.* That's the conversation that builds repeat customers, because it's the one that actually predicts what their high will feel like.",
      "Every Don Verde strain page lists the dominant terpenes for the cultivar, in order. We list them because the floor staff needs them. If you're stocking us and you'd like printed talk-track cards for the back bar, we'll send them — that's part of the deal."
    ],
    related: ["the-21-day-cure", "indoor-cannabis-southern-new-mexico"]
  },
  {
    slug: "the-21-day-cure",
    title: "What lives inside a 21-day cure",
    description:
      "The cure is where harvest becomes flower. Don Verde Farms cures every batch for a 21-day minimum — here's what's actually happening inside the jars during those three weeks.",
    category: "Cultivation",
    publishedAt: "2026-05-02",
    readMinutes: 4,
    pullQuote:
      "A short cure produces flower that smells like grass and tastes like nothing. A long cure produces flower that smells like itself.",
    body: [
      "When a cannabis plant comes off the wall, it's not flower yet. It's wet plant material, full of chlorophyll, residual sugars, and water that hasn't yet found its way out of the calyx. If you smoke it in that state, it tastes like green hay and burns black. The cure is what turns the harvest into the product — and the cure is also where most commercial cultivators cut corners, because it's the one part of the process that doesn't produce visible work.",
      "Don Verde Farms cures every batch for a 21-day minimum. Some cultivars get more. Nothing gets less. Here's why.",
      "**Days one through five — the dry-down.** After harvest, the plants hang in a dark room held at 60°F and 60% relative humidity. The exterior of the bud loses moisture; the interior is still wet. If you skip past this and jar early, you trap that interior moisture and you get mold within a week. The dry-down has to be slow. We watch it daily.",
      "**Days six through fourteen — the burp.** Once the buds are jarred, the cure is a controlled gas exchange. We open every jar daily for the first week and every other day for the second. Each opening releases the trapped humidity that has migrated out of the buds and lets fresh air in. This is when chlorophyll breaks down. The grassy, vegetal smell that defines uncured flower is essentially chlorophyll exhaling. By day fourteen, that smell is gone and the actual strain expression starts to come up underneath.",
      "**Days fifteen through twenty-one — the bloom.** This is the part most cultivators don't bother with. Once the chlorophyll is gone, the secondary terpene esters start to volatilize and recombine. The smell of the jar gets *louder*, not quieter. A strain that smelled like generic 'kush' on day fourteen will smell like specifically itself by day twenty-one. The smoke gets smoother, the flavor gets more layered, the high gets more nuanced. None of that happens without the time.",
      "We hold to a 21-day minimum because we have to. Anything shorter and we're not putting our name on it. Some of our cultivars — Mesilla Mintz, in particular — get a 28-day cure because the menthol terpenes need more time to settle. The shop that sells you a 14-day-cured 30% THC jar isn't selling you better flower. They're selling you flower that's still becoming flower. The wait is the work."
    ],
    related: ["indoor-cannabis-southern-new-mexico", "reading-terpenes-budtenders"]
  }
];

export function getJournalPost(slug: string) {
  return journalPosts.find((p) => p.slug === slug);
}

export function getRecentJournalPosts(limit = 3) {
  return [...journalPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit);
}
