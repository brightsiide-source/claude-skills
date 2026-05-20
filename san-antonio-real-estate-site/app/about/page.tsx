import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "About SA Cash Home Buyers | Local San Antonio Cash Buyer",
  description:
    "SA Cash Home Buyers is a locally owned, family operated cash home buying company in San Antonio, TX. Buying houses across Bexar County and surrounding areas.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SA Cash Home Buyers",
    description: "Locally owned, family operated SA cash home buyer.",
    url: "https://sacashhomebuyers.co/about",
    type: "website",
  },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://sacashhomebuyers.co/about",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "SA Cash Home Buyers",
    telephone: "+1-210-555-0100",
    email: "washburn.david01@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Antonio",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        title="About SA Cash Home Buyers"
        intro="A locally owned, family operated home buying company headquartered in San Antonio, Texas. We've been buying houses across the greater Bexar County area and the I-35 corridor for years."
      >
        <h2>Who we are</h2>
        <p>
          We&rsquo;re a small team of San Antonio investors who buy houses for cash. Not a national hedge-fund iBuyer, not a franchise, not a marketing brand that hands your information to whoever pays the highest referral fee. The same people who answer the phone are the ones who sign at closing.
        </p>
        <p>
          We live in San Antonio. We know the difference between an Alamo Heights tear-down and a Stone Oak production build. We know that Boerne has different comps than Helotes, and that a Schertz property near Randolph AFB prices differently than a Converse property a few miles south. We know which 78XXX ZIPs have post-tension slab foundation issues and which don&rsquo;t.
        </p>

        <h2>What we do, plainly</h2>
        <p>
          We make cash offers on residential properties in San Antonio, Bexar County, and surrounding Texas counties. We close at reputable Texas title companies on your timeline &mdash; from 7 days to 30. We pay all standard seller closing costs. The number on the offer is the number that hits your account at closing, minus your existing mortgage payoff and any other recorded liens.
        </p>
        <p>
          We buy properties in any condition. Sometimes we keep them as long-term rentals. Sometimes we renovate and resell. Sometimes we wholesale to a vetted partner buyer. Either way, you sign one contract and close once.
        </p>

        <h2>Who actually benefits from a cash sale</h2>
        <p>Most San Antonio sellers, in most situations, are better served by a traditional agent listing. We tell people this routinely. The sellers who genuinely benefit from working with us share one of these patterns:</p>
        <ul>
          <li><strong>Speed matters more than maximum price.</strong> Relocation, divorce, pre-foreclosure (Texas non-judicial foreclosure moves fast &mdash; 21 days notice), medical situation.</li>
          <li><strong>Property condition would scare off financing buyers.</strong> Foundation issues, fire damage, hoarder situations, code violations, failed septic, post-tension slab problems.</li>
          <li><strong>Out-of-state owners</strong> who inherited or own remotely and don&rsquo;t want to manage repairs, showings, and an in-person closing.</li>
          <li><strong>Privacy matters.</strong> Divorce, family disputes, financial distress.</li>
          <li><strong>Certainty matters.</strong> A signed cash contract with no inspection or financing contingency means the deal actually closes.</li>
        </ul>

        <h2>Why local matters in Texas</h2>
        <p>
          Texas is a top target for national cash-buying operations &mdash; the population growth and lack of state income tax draw out-of-state investors who&rsquo;ve never set foot in San Antonio. They run algorithms, send mass mail, and rely on local wholesalers to do the actual work. Working with a true local cuts out a layer of cost and friction.
        </p>
        <p>
          Texas also has unique legal mechanics that out-of-state buyers often miss: non-judicial foreclosure with very short notice periods, community property rules, homestead protections, and a strong title insurance regime under TDI oversight. We close cleanly through all of it.
        </p>

        <h2>Our honest pricing approach</h2>
        <p>
          Cash offers from any honest buyer follow the same math: after-repair market value, minus repair budget, minus holding and transaction costs. The variables are how accurately the buyer estimates market value (San Antonio has neighborhood-specific comps), how realistic the repair budget is, and how thin a margin the buyer will accept.
        </p>
        <p>
          We tell sellers the number in writing within 24 hours. We don&rsquo;t move it after. We don&rsquo;t show up the day before closing and &ldquo;discover&rdquo; issues we missed. If we got our estimate wrong, that&rsquo;s our problem to absorb &mdash; not yours.
        </p>

        <h2>Service area</h2>
        <p>
          San Antonio (all sides and neighborhoods), the Bexar County suburbs (Schertz, Converse, Helotes, Leon Valley, Live Oak, Universal City, Windcrest, Kirby, Castle Hills, Shavano Park), and the surrounding hill-country and I-35 corridor cities: Boerne, New Braunfels, Seguin, Floresville, Pleasanton, Stockdale.
        </p>

        <h2>How to reach us</h2>
        <p>
          Phone: <a href="tel:+12105550100">(210) 555-0100</a><br />
          Email: <a href="mailto:washburn.david01@gmail.com">washburn.david01@gmail.com</a><br />
          Hours: Mon&ndash;Fri 8am&ndash;6pm, Sat 9am&ndash;2pm CT. After-hours voicemails returned same day.
        </p>
      </PageShell>
    </>
  );
}
