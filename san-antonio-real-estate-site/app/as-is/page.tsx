import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Sell Your House As-Is in Texas — Cash, Any Condition | SA Cash Home Buyers",
  description:
    "Sell your San Antonio or Texas house as-is. Foundation problems, post-tension slab issues, fire damage, mold, hoarder, code violations. Cash offer in 24 hours.",
  alternates: { canonical: "/as-is" },
  openGraph: {
    title: "Sell Your TX House As-Is — Cash, Any Condition",
    description: "Foundation, slab, fire, mold, hoarder, code violations. We buy TX houses as-is for cash.",
    url: "https://sacashhomebuyers.co/as-is",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "As-is cash home purchase — Texas",
  provider: { "@type": "LocalBusiness", name: "SA Cash Home Buyers", telephone: "+1-210-555-0100" },
  areaServed: { "@type": "State", name: "Texas" },
  description: "We buy Texas houses as-is for cash. No repairs, no cleaning, no inspections required.",
};

export default function AsIsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Sell as-is" }]}
        title="Sell your Texas house as-is — for cash."
        intro="Don't fix anything. Don't clean anything. Don't paint, don't haul, don't stage. We buy Texas houses in any condition — for cash, with all closing costs covered, and we close in 7-30 days."
      >
        <h2>What &ldquo;as-is&rdquo; actually means with us</h2>
        <p>Most &ldquo;as-is&rdquo; buyers say it but back out at inspection. We mean it literally. Our written offer accounts for the property&rsquo;s actual condition up front &mdash; not a verbal range we renegotiate the day before closing. If you tell us the truth about what&rsquo;s wrong with the house, the number we send is the number we close at.</p>

        <h2>San Antonio &amp; Texas distressed-property situations we buy</h2>

        <h3>Foundation problems &mdash; the Texas signature issue</h3>
        <p>San Antonio sits on expansive clay (vertisol) soils that swell and shrink with moisture. The result: foundation movement is the most common major repair issue across SA. Common variants we buy through:</p>
        <ul>
          <li><strong>Pier-and-beam settling</strong> &mdash; common in older central SA homes (Beacon Hill, Monte Vista, Mahncke Park)</li>
          <li><strong>Slab cracks and post-tension cable failures</strong> &mdash; common in 80s/90s construction (Stone Oak, Northwest Side, far West)</li>
          <li><strong>Drainage issues</strong> compounding slab movement &mdash; downspouts dumping next to the foundation</li>
          <li><strong>Sheetrock cracking, doors that won&rsquo;t close, brick veneer separation</strong></li>
          <li><strong>Plumbing leaks under slab</strong> &mdash; expensive to fix retail, we&rsquo;ll handle it</li>
        </ul>

        <h3>Fire and smoke damage</h3>
        <p>Kitchen fires, electrical fires, garage fires. We buy fire-damaged homes regardless of insurance status. If you have an insurance claim payout in hand and just want to be done, that&rsquo;s often the simplest path &mdash; we&rsquo;ll buy the property and you keep the claim proceeds.</p>

        <h3>Hail and storm damage</h3>
        <p>South Texas gets hit. Hail, wind, and occasional tornado damage create properties that need full re-roofs or extensive exterior repairs. Insurance disputes and underinsured properties are common &mdash; we buy these even when claims are unresolved.</p>

        <h3>Water damage and mold</h3>
        <p>Burst pipes (especially after the February 2021 freeze), roof failure, AC condensate floods, plumbing leaks under slab. South Texas mold remediation is expensive and slow &mdash; we&rsquo;ll handle it.</p>

        <h3>Hoarder and severe-clutter properties</h3>
        <p>Take what you want. Leave everything else. We mean it &mdash; furniture, appliances, paperwork, vehicles, decades of accumulated stuff. We handle the cleanout. No judgment, full confidentiality.</p>

        <h3>Code violations and city citations</h3>
        <p>San Antonio Code Enforcement citations, unpermitted additions, illegal conversions, junk-vehicle complaints, vacant building registration issues. We close even with active citations on file.</p>

        <h3>Septic and well issues on rural acreage</h3>
        <p>Hill Country properties outside Boerne or Helotes, ranchettes in Wilson County, properties along the Bandera-Boerne corridor. Failed septic, well capacity problems, off-grid setups. We buy them all.</p>

        <h3>Major structural issues</h3>
        <ul>
          <li>Termite damage (TX is high-risk)</li>
          <li>Foundation cracks and settling beyond cosmetic</li>
          <li>Roof failure</li>
          <li>Asbestos / lead paint in pre-1978 homes</li>
        </ul>

        <h3>Vacant, boarded, or condemned properties</h3>
        <p>Long-vacant Texas properties accumulate problems &mdash; copper theft, vandalism, squatters, frozen pipes (yes, even in SA, the 2021 freeze taught everyone). We buy them all.</p>

        <h2>How we determine an as-is offer</h2>
        <ol>
          <li><strong>Recent comps</strong> for properties of similar size, neighborhood, and condition</li>
          <li><strong>Estimated repair budget</strong> to bring the property to market-ready condition</li>
          <li><strong>Our holding and transaction costs</strong></li>
          <li><strong>= Cash offer</strong></li>
        </ol>
        <p>This is the same math any honest cash buyer uses. The difference is we show you our number in writing within 24 hours and we don&rsquo;t move it after.</p>

        <h2>What you absolutely don&rsquo;t need to do</h2>
        <ul>
          <li>Don&rsquo;t get repair estimates</li>
          <li>Don&rsquo;t get a pre-listing inspection</li>
          <li>Don&rsquo;t paint, deep-clean, or stage</li>
          <li>Don&rsquo;t haul anything</li>
          <li>Don&rsquo;t pull permits or close out old ones</li>
          <li>Don&rsquo;t pay outstanding HOA dues, water bills, or property tax &mdash; we settle them at closing from the proceeds</li>
        </ul>

        <h2>Texas seller&rsquo;s disclosure</h2>
        <p>Texas requires a Seller&rsquo;s Disclosure Notice under Property Code &sect; 5.008 for most residential sales. We provide our own short-form disclosure of known issues, but the formal disclosure obligation is waivable by mutual agreement in an as-is sale to a non-occupying buyer. We&rsquo;ll work with the title company to document this properly.</p>

        <h2>Honest disclosure on price</h2>
        <p>An as-is cash offer is almost always less than full retail. If you have time and the property is in reasonable shape, an MLS listing &mdash; even a quick-flip-style listing &mdash; will typically net more. Our offers are most compelling when:</p>
        <ul>
          <li>Repairs are extensive enough that financing buyers will walk</li>
          <li>You can&rsquo;t or don&rsquo;t want to manage repairs/showings</li>
          <li>Timeline matters more than maximum price</li>
          <li>The property has issues a retail buyer&rsquo;s inspector would flag (foundation, roof, plumbing under slab, electrical)</li>
        </ul>
        <p>We&rsquo;ll tell you honestly which situation you&rsquo;re in. If a traditional sale would serve you better, we&rsquo;ll say so.</p>

        <h2>Get an as-is offer</h2>
        <p>Call <a href="tel:+12105550100">(210) 555-0100</a> or use the contact form. Tell us what&rsquo;s wrong with the house &mdash; the worse it is, the more value we add by handling it.</p>
      </PageShell>
    </>
  );
}
