import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Stop Foreclosure in Texas — Sell Your House for Cash | SA Cash Home Buyers",
  description:
    "Facing foreclosure in San Antonio or anywhere in Texas? TX is a non-judicial state — only 21 days notice. We can sometimes close fast enough to stop the trustee's sale.",
  alternates: { canonical: "/foreclosure" },
  openGraph: {
    title: "Stop Foreclosure in Texas — Sell for Cash",
    description: "Texas 21-day non-judicial foreclosure timeline. We can sometimes close in time. Cash offer in 24 hours.",
    url: "https://sacashhomebuyers.co/foreclosure",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Stop foreclosure cash home purchase — Texas",
  provider: { "@type": "LocalBusiness", name: "SA Cash Home Buyers", telephone: "+1-210-555-0100" },
  areaServed: { "@type": "State", name: "Texas" },
  description: "Cash purchase of homes facing non-judicial trustee sale foreclosure in Texas.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Can you actually stop a Texas foreclosure?", acceptedAnswer: { "@type": "Answer", text: "Sometimes, yes — but Texas moves fast. Under Texas Property Code 51.002, a lender can post a Notice of Trustee Sale and complete the sale in as little as 21 days. We can sometimes close a cash purchase and pay off the mortgage in time, but you have to call early." } },
    { "@type": "Question", name: "How fast can you close on a pre-foreclosure house?", acceptedAnswer: { "@type": "Answer", text: "As fast as 5-7 days if title is clean and the seller is responsive. We've closed pre-foreclosure deals 48 hours before scheduled trustee sales." } },
    { "@type": "Question", name: "Will selling damage my credit?", acceptedAnswer: { "@type": "Answer", text: "Selling for cash and paying off your mortgage in full does not damage your credit. A foreclosure on your record will. The earlier you act, the better the outcome." } },
  ],
};

export default function ForeclosurePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Stop foreclosure" }]}
        title="Stop foreclosure in Texas. Sell your house for cash."
        intro="If you're behind on your mortgage in San Antonio or anywhere in Texas, time is short. Texas is a non-judicial foreclosure state — the fastest in the country. We can sometimes close fast enough to pay off the bank and stop the trustee's sale."
      >
        <div className="bg-gold/20 border-l-4 border-gold p-4 rounded-md not-prose mb-6">
          <p className="text-adobe text-sm">
            <strong>Time matters &mdash; especially in Texas.</strong> Under Texas Property Code &sect; 51.002, a Notice of Trustee Sale can result in a sale of your home in as little as 21 days. Call us today, even if you&rsquo;re not sure what to do.
          </p>
        </div>

        <h2>How Texas foreclosure actually works</h2>
        <p><strong>Texas is a non-judicial foreclosure state</strong>. That&rsquo;s the bad news. Unlike judicial foreclosure states (Iowa, Indiana, New Mexico, where the lender must file a lawsuit and win in court), a Texas lender can foreclose by posting a Notice of Trustee Sale on the courthouse door, recording the notice with the county clerk, and mailing certified notice to the homeowner.</p>
        <p>The minimum notice period is <strong>21 days before the first Tuesday of the sale month</strong>. Many sellers don&rsquo;t realize the clock is that short until it&rsquo;s already running.</p>

        <h2>The Texas pre-foreclosure timeline</h2>
        <ul>
          <li><strong>1-30 days late:</strong> Late notices, calls. Best time to sell &mdash; you have full negotiating leverage.</li>
          <li><strong>30-120 days late:</strong> Default notice and demand letter. Most lenders begin acceleration around day 90.</li>
          <li><strong>Notice of Default and Intent to Accelerate:</strong> Lender sends formal demand. You typically have 20 days to cure under the deed of trust.</li>
          <li><strong>Notice of Trustee Sale posted and recorded:</strong> Clock starts. Sale will happen on the first Tuesday of the next month that&rsquo;s at least 21 days away.</li>
          <li><strong>Sale day:</strong> First Tuesday of the month, 10am-4pm at the county courthouse. Cash sale to highest bidder.</li>
        </ul>
        <p>If you call us between Notice of Default and the trustee sale date, we usually have time to close. Once the sale happens, it&rsquo;s over &mdash; Texas does not have a statutory right of redemption for residential property after a trustee sale (unlike some judicial states).</p>

        <h2>What you&rsquo;ll keep when you sell to us</h2>
        <p>Many Texas homeowners assume they&rsquo;re underwater and have nothing to walk away with. That&rsquo;s often wrong. The math:</p>
        <ul>
          <li><strong>Sale price</strong> (our cash offer)</li>
          <li><strong>Minus mortgage payoff</strong> (including missed payments, late fees, and lender legal costs)</li>
          <li><strong>Minus any other liens</strong> (HOA dues, judgments, tax liens)</li>
          <li><strong>= Cash to you at closing</strong></li>
        </ul>
        <p>If your home appreciated since you bought it &mdash; and most Texas homes have, especially since 2020 &mdash; there&rsquo;s often meaningful equity left over. We&rsquo;ve cut checks to sellers ranging from $5,000 to $80,000+ at the closing table. You walk away with cash, no foreclosure on your credit, and a fresh start.</p>

        <h2>Will I get a fair offer in this situation?</h2>
        <p>Yes. We don&rsquo;t penalize sellers for being in foreclosure &mdash; that would be predatory and bad business. Our offer is based on the property&rsquo;s value and condition, not your circumstances. The only thing the foreclosure timeline changes is the speed at which we move.</p>

        <h2>Bexar County specifics</h2>
        <p>Bexar County trustee sales happen the first Tuesday of each month on the courthouse steps. Sales typically run 10am-4pm. The Notice of Trustee Sale must be recorded with the Bexar County Clerk at least 21 days before the sale date. You can verify whether a sale has been posted on your property by checking with the Clerk&rsquo;s office or pulling the recorded notice.</p>

        <h2>What about a short sale?</h2>
        <p>If you owe more than the house is worth, we can also work directly with your lender on a short sale &mdash; though those take longer (60-120 days) and require lender approval. Call us and we&rsquo;ll evaluate which path makes sense.</p>

        <h2>Get out from under it</h2>
        <p>Call <a href="tel:+12105550100">(210) 555-0100</a> or use the contact form. Conversations are confidential and there&rsquo;s no cost or obligation. The earlier you call, the more options you have &mdash; especially in Texas, where the foreclosure clock is the shortest in the country.</p>
      </PageShell>
    </>
  );
}
