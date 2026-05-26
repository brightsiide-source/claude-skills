import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses Converse TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your Converse, TX house fast for cash. Local Bexar County buyers in this NE San Antonio suburb. Older housing, working families. Close in 7-30 days.",
  alternates: { canonical: "/converse" },
  openGraph: {
    title: "We Buy Houses Converse TX | Cash Offer in 24 Hours",
    description: "Local cash buyers serving Converse. Close in 30 days.",
    url: "https://sacashhomebuyers.co/converse",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in Converse, TX.",
  url: "https://sacashhomebuyers.co/converse",
  telephone: "+1-830-590-1105",
  areaServed: { "@type": "City", name: "Converse", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function ConversePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Converse" }]}
        title="We buy houses in Converse, TX — for cash."
        intro="Converse is a working-family Bexar County suburb just northeast of San Antonio along FM 78 and I-410. Older neighborhoods, affordable starter homes, military-adjacent. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why Converse homeowners sell to us</h2>
        <ul>
          <li><strong>Tired landlords</strong> with Converse rentals &mdash; many SA investors bought Converse properties cheap in the 2010s and are now done managing them.</li>
          <li><strong>Estate sales</strong> &mdash; significant inventory of 1960s-1980s tract housing with deferred maintenance.</li>
          <li><strong>Pre-foreclosure</strong> in Bexar County.</li>
          <li><strong>Out-of-state inheritances</strong> from longtime Converse residents.</li>
          <li><strong>Foundation issues</strong> on expansive clay slabs &mdash; very common in Converse&rsquo;s older subdivisions.</li>
          <li><strong>Distressed properties</strong> &mdash; deferred maintenance, code citations from Converse city or Bexar County.</li>
        </ul>

        <h2>Converse areas we buy in</h2>
        <ul>
          <li>FM 78 / Old Converse corridor</li>
          <li>Old Towne East</li>
          <li>Converse Estates</li>
          <li>Hickory Hill</li>
          <li>Camelot II</li>
          <li>Crestview</li>
          <li>Near-Randolph properties</li>
          <li>NE Loop 1604 corridor</li>
        </ul>

        <h2>How it works in Converse</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull Converse comps.</strong></li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Bexar County title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/schertz">Schertz</a></li>
          <li><a href="/seguin">Seguin</a></li>
          <li><a href="/new-braunfels">New Braunfels</a></li>
          <li><a href="/helotes">Helotes</a></li>
          <li><a href="/boerne">Boerne</a></li>
        </ul>
      </PageShell>
    </>
  );
}
