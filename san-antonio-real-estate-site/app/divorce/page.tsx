import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Sell Your House During Divorce in Texas | Cash, Both Parties Walk Away | SA Cash Home Buyers",
  description:
    "Selling your San Antonio house during divorce. Texas community property, homestead protections, both spouses sign. Neutral process, fast close, equity split at title.",
  alternates: { canonical: "/divorce" },
  openGraph: {
    title: "Sell Your TX House During Divorce | Cash",
    description: "Texas community property and homestead rules handled. Neutral, fast, both parties walk away.",
    url: "https://sacashhomebuyers.co/divorce",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Divorce house sale — Texas",
  provider: { "@type": "LocalBusiness", name: "SA Cash Home Buyers", telephone: "+1-830-590-1105" },
  areaServed: { "@type": "State", name: "Texas" },
  description: "Cash purchase of marital homes during Texas divorce. We handle community property and homestead protections.",
};

export default function DivorcePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Divorce sale" }]}
        title="Sell your house during a Texas divorce — for cash."
        intro="A neutral, fast, confidential way out of the marital home. We work with both parties (and your family law attorneys) to structure a clean closing under Texas community property and homestead law."
      >
        <h2>Why divorcing couples sell to us</h2>
        <ul>
          <li><strong>Fast close</strong> &mdash; you can get the house off the marital balance sheet in 14-30 days, not 90+.</li>
          <li><strong>Neutral third party</strong> &mdash; we don&rsquo;t pick sides. Equity is split at the title company per your divorce decree or MSA.</li>
          <li><strong>Confidentiality</strong> &mdash; no MLS listing, no sign in the yard, no neighbors asking questions.</li>
          <li><strong>No showings or staging</strong> &mdash; you don&rsquo;t have to coordinate access between two parties living separately.</li>
          <li><strong>No repairs</strong> &mdash; we buy as-is, so neither spouse has to manage or pay for fix-ups.</li>
          <li><strong>Out-of-state spouse</strong> &mdash; we close remotely via mobile notary.</li>
        </ul>

        <h2>Texas community property &mdash; the basics</h2>
        <p><strong>Texas is a community property state</strong> under Texas Family Code &sect; 3.001-3.003. The relevant rules for selling the marital home:</p>
        <ul>
          <li><strong>Community property:</strong> Property acquired by either spouse during marriage is presumed community property &mdash; both have equal undivided interest.</li>
          <li><strong>Separate property:</strong> Property owned before marriage, or acquired during marriage by gift or inheritance, is separate property of that spouse.</li>
          <li><strong>Both spouses must sign:</strong> To convey community real property, both spouses must execute the deed &mdash; regardless of whose name is on title.</li>
          <li><strong>Tracing:</strong> Mixed-character property (e.g., a house bought with separate-property down payment and community mortgage payments) may have both community and separate property components &mdash; an issue for the divorce decree, not for us.</li>
        </ul>

        <h2>Texas homestead rules add another layer</h2>
        <p>If the property is the family homestead, Texas adds constitutional homestead protections (Texas Constitution Article XVI, &sect; 50-52). The big one for divorce: <strong>both spouses must sign to convey homestead property, even if only one is on the deed and even if the property is the separate property of one spouse</strong>. This is one of the strongest protections of its kind in the country.</p>
        <p>What this means in practice: we&rsquo;ll need both spouses&rsquo; signatures on the closing documents, and we&rsquo;ll need spouses to acknowledge their homestead status (or non-status) in writing. Standard Texas closing practice.</p>

        <h2>Timing relative to the divorce</h2>
        <p>Texas has a <strong>60-day waiting period</strong> after filing a divorce petition before a final decree can be entered (Texas Family Code &sect; 6.702). The house can typically be sold at any time during this period if both parties consent, or after the final decree is signed. We can close:</p>
        <ul>
          <li><strong>Pre-decree</strong> if both parties sign the purchase contract and proceeds are escrowed pending the final order</li>
          <li><strong>Post-decree</strong> with proceeds disbursed per the decree</li>
          <li><strong>One-spouse buyouts</strong> where one party is awarded the house and refinances or sells &mdash; we&rsquo;re sometimes a cleaner path than refinancing on one income</li>
        </ul>

        <h2>How equity gets split</h2>
        <p>Title company collects all signed authorizations from both spouses (and from attorneys if applicable). At closing, the proceeds (after mortgage payoff and any liens) are split according to your decree or MSA. Common splits:</p>
        <ul>
          <li>50/50 (default community property assumption)</li>
          <li>Per a Mediated Settlement Agreement (MSA)</li>
          <li>Per the final divorce decree</li>
          <li>Per a Partition and Exchange Agreement converting community to separate</li>
        </ul>
        <p>We don&rsquo;t get involved in how you split &mdash; we just send our funds to the title company per the divorce documents.</p>

        <h2>What we need from you</h2>
        <ul>
          <li>Both spouses&rsquo; willingness to sell (or court order)</li>
          <li>Any existing divorce decree, MSA, partition agreement, or temporary orders</li>
          <li>Contact info for both family law attorneys (if represented)</li>
          <li>Property details and condition</li>
        </ul>
        <p>We&rsquo;ll coordinate with your attorneys throughout. We won&rsquo;t communicate with one spouse without the other if you&rsquo;d prefer all communication go through counsel.</p>

        <h2>Want a confidential conversation?</h2>
        <p>Call <a href="tel:+18305901105">(830) 590-1105</a> or use the contact form. We can talk with one or both spouses, or directly with your attorney. No-obligation cash offer in 24 hours.</p>
      </PageShell>
    </>
  );
}
