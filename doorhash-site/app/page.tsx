import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { FeaturedDrops } from "@/components/sections/FeaturedDrops";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FarmStory } from "@/components/sections/FarmStory";
import { Coverage } from "@/components/sections/Coverage";
import { Reviews } from "@/components/sections/Reviews";
import { RewardsCTA } from "@/components/sections/RewardsCTA";
import { FaqTeaser } from "@/components/sections/FaqTeaser";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedDrops />
      <HowItWorks />
      <FarmStory />
      <Coverage />
      <Reviews />
      <RewardsCTA />
      <FaqTeaser />
    </>
  );
}
