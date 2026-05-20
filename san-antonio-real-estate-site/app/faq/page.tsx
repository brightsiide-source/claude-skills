import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "FAQ | Cash Home Buying in Texas | SA Cash Home Buyers",
  description:
    "Common questions about selling your San Antonio house for cash. How fast we close, how offers work, Texas non-judicial foreclosure, probate, divorce, and as-is sales.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Cash Home Buying in San Antonio, TX",
    description: "Common questions answered straight.",
    url: "https://sacashhomebuyers.co/faq",
    type: "website",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "How fast can you actually close on my TX house?", acceptedAnswer: { "@type": "Answer", text: "As fast as 7 days for a clean-title cash close. Most San Antonio closings happen in 14-30 days. You set the date — we match it." } },
    { "@type": "Question", name: "How do you decide what to offer?", acceptedAnswer: { "@type": "Answer", text: "We pull recent comparable sales in your specific SA neighborhood, estimate repairs to bring the property to market-ready condition, and back out our holding and transaction costs. The number we send is the number we close at." } },
    { "@type": "Question", name: "Are there really no fees?", acceptedAnswer: { "@type": "Answer", text: "None. No commissions, no transaction fees. We pay all standard seller closing costs including title insurance, escrow, and recording. Texas has no state real estate transfer tax." } },
    { "@type": "Question", name: "Do I need to clean or fix anything?", acceptedAnswer: { "@type": "Answer", text: "No. Leave broken appliances, dated finishes, accumulated stuff. We buy as-is and handle everything." } },
    { "@type": "Question", name: "What if I'm in foreclosure?", acceptedAnswer: { "@type": "Answer", text: "Call immediately. Texas is a non-judicial foreclosure state — lenders can post a Notice of Trustee Sale and complete a sale in as little as 21 days under Texas Property Code 51.002. We can sometimes close fast enough to pay off the mortgage before the sale, but every day matters." } },
    { "@type": "Question", name: "What if I inherited the house and it's in probate?", acceptedAnswer: { "@type": "Answer", text: "We work with Texas probate routinely. Texas independent administration is faster than most states — Letters Testamentary typically issue in 30-60 days. For small estates with under $75,000 in non-real-estate assets, the Texas Small Estate Affidavit (Estates Code 205) can avoid full probate." } },
    { "@type": "Question", name: "How does Texas community property law affect divorce sales?", acceptedAnswer: { "@type": "Answer", text: "Texas is a community property state. Real property acquired during marriage is presumed community property and both spouses typically need to sign to convey title. Texas Family Code 3.001 presumes property acquired by either spouse during marriage is community." } },
    { "@type": "Question", name: "What about Texas homestead protections?", acceptedAnswer: { "@type": "Answer", text: "Texas has the strongest homestead protections in the country. If the property is the seller's homestead and they are married, both spouses must sign to sell — even if only one is on the deed. This is constitutional, not just statutory. We handle this routinely." } },
    { "@type": "Question", name: "What's the catch?", acceptedAnswer: { "@type": "Answer", text: "There isn't one — but our offer is almost always less than full retail. If you have time and a property in good shape, listing with an agent will likely net more. Our offers are most valuable when speed, certainty, or condition matter." } },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
        title="Frequently Asked Questions"
        intro="Straight answers about cash home sales in San Antonio and Texas. Don't see your question? Call (210) 555-0100."
      >
        <h2>Process &amp; timing</h2>

        <h3>How fast can you actually close?</h3>
        <p>As fast as 7 days for a clean-title cash close. Most of our San Antonio closings happen in 14-30 days. You set the date &mdash; we match it.</p>

        <h3>How do you decide what to offer?</h3>
        <p>We pull recent comparable sales in your specific SA neighborhood, estimate repairs to bring the property to market-ready condition, and back out our holding and transaction costs. The number we send is the number we close at &mdash; no last-minute renegotiation.</p>

        <h3>What&rsquo;s the timeline from first call to cash in hand?</h3>
        <p>Initial conversation, then written offer within 24 hours. If accepted, we open title at a Texas title company. Title typically clears in 5-10 business days. You pick a closing date anywhere from 7 to 30 days out. Funds wire same-day or next-business-day after recording.</p>

        <h2>Fees &amp; pricing</h2>

        <h3>Are there really no fees?</h3>
        <p>None. No commissions, no transaction fees, no junk fees. We pay all standard seller closing costs including title insurance, escrow, and recording. Texas has no state real estate transfer tax. The number on your offer is what you net, minus only your existing mortgage payoff and any other recorded liens.</p>

        <h3>What&rsquo;s the catch?</h3>
        <p>There isn&rsquo;t one &mdash; but our offer is almost always less than full retail. We make our money on the spread between what we pay and what the property sells for after repairs. If you have time and the property is in good shape, an MLS listing will likely net you more. Our offers are most valuable when speed, certainty, or condition matter.</p>

        <h3>How do you compare to an iBuyer (Opendoor, Offerpad)?</h3>
        <p>iBuyers charge a &ldquo;service fee&rdquo; of 5-9% on top of their offer. We charge nothing. iBuyers typically only buy properties in good condition in narrow ZIP code ranges. We buy across South Texas in any condition.</p>

        <h2>Property condition</h2>

        <h3>Do I need to clean or fix anything?</h3>
        <p>No. Leave broken appliances, accumulated stuff, dated finishes, the carpet you&rsquo;ve been meaning to replace. We buy as-is and handle everything.</p>

        <h3>Will you buy a house with major problems?</h3>
        <p>Yes &mdash; foundation issues (San Antonio&rsquo;s expansive clay soils are rough on slabs), post-tension slab problems, fire damage, mold, hoarder situations, code violations, failed septic, off-grid Hill Country properties. The worse the condition, the more value we add by handling it. <a href="/as-is">More on as-is sales</a>.</p>

        <h2>Tenant &amp; occupancy situations</h2>

        <h3>Will you buy a house with tenants in place?</h3>
        <p>Yes. Occupied, vacant, Section 8, behind on rent, month-to-month leases &mdash; we buy them all.</p>

        <h3>What if the house is vacant and I&rsquo;m out of state?</h3>
        <p>Most of our out-of-state owners never visit the property again. We coordinate utilities, locks, cleanout, and remote closing through a mobile notary.</p>

        <h2>Legal situations &mdash; Texas-specific</h2>

        <h3>What if I&rsquo;m in foreclosure?</h3>
        <p>Call immediately. <strong>Texas is a non-judicial foreclosure state</strong>. Lenders can post a Notice of Trustee Sale on the courthouse steps and complete the sale in as little as 21 days under Texas Property Code &sect; 51.002. The notice must be filed and served at least 21 days before the first Tuesday of the sale month. We can sometimes close fast enough to pay off the mortgage and stop the trustee&rsquo;s sale, but every day matters. <a href="/foreclosure">More on stopping Texas foreclosure</a>.</p>

        <h3>What if I inherited the house and it&rsquo;s in probate?</h3>
        <p>We work with Texas probate routinely. Texas has <strong>independent administration</strong> &mdash; one of the fastest probate processes in the country. Letters Testamentary or Letters of Administration typically issue in 30-60 days. For estates with under $75,000 in non-real-estate personal property, the Texas Small Estate Affidavit under Estates Code Chapter 205 can avoid full probate. <a href="/inherited">More on selling an inherited Texas house</a>.</p>

        <h3>How does Texas community property law affect selling during divorce?</h3>
        <p>Texas is a community property state under Family Code &sect; 3.001-3.003. Real property acquired during marriage is presumed community property and both spouses generally need to sign to convey title, even if only one is on the deed. Separate property (owned before marriage, or inherited) has different rules. <a href="/divorce">More on selling during a Texas divorce</a>.</p>

        <h3>What about Texas homestead protections?</h3>
        <p>Texas has the strongest homestead protections in the country. If the property is the seller&rsquo;s homestead and they are married, <strong>both spouses must sign</strong> to sell &mdash; even if only one is on the deed. This is in the Texas Constitution (Article XVI, &sect; 50-52), not just statute. The homestead also enjoys protection from most non-mortgage creditor judgments.</p>

        <h3>Do I need a Texas real estate attorney?</h3>
        <p>For most straightforward sales, no &mdash; the title company handles the documents and closing. For probate, complex divorce, or pre-foreclosure situations, talking to a Texas attorney is wise. We work alongside attorneys often and can refer you to one if needed.</p>

        <h2>About us</h2>

        <h3>Are you a wholesaler?</h3>
        <p>Sometimes, depending on the deal. Some properties we keep as rentals, some we renovate and resell, some we assign to vetted partner buyers. You sign one contract and you close once &mdash; that&rsquo;s all that changes for you.</p>

        <h3>Are you a licensed brokerage?</h3>
        <p>We are a private home-buying company, not a TREC-licensed real estate brokerage. We don&rsquo;t represent buyers or sellers in third-party transactions &mdash; we only buy properties for our own account. That means no commissions and no fiduciary representation; it also means we have skin in the game on every deal.</p>

        <h3>What if I just want to learn about my options?</h3>
        <p>Call us. The conversation is free, confidential, and no-obligation. We&rsquo;ll tell you honestly whether a cash sale or a traditional listing makes more sense for your situation. If a listing is right for you, we know reputable TX agents we&rsquo;ll refer you to with no kickback to us.</p>
      </PageShell>
    </>
  );
}
