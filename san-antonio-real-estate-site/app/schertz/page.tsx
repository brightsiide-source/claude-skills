import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses Schertz TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your Schertz, TX house fast for cash. Local buyers serving Guadalupe County — Randolph AFB area. Military relocations, close in 7-30 days.",
  alternates: { canonical: "/schertz" },
  openGraph: {
    title: "We Buy Houses Schertz TX | Cash Offer in 24 Hours",
    description: "Local cash buyers serving Schertz. Randolph AFB-aware closings.",
    url: "https://sacashhomebuyers.co/schertz",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in Schertz, TX.",
  url: "https://sacashhomebuyers.co/schertz",
  telephone: "+1-830-590-1105",
  areaServed: { "@type": "City", name: "Schertz", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function SchertzPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Schertz" }]}
        title="We buy houses in Schertz, TX — for cash."
        intro="Schertz is a Guadalupe County (with portions in Bexar and Comal) suburb northeast of San Antonio, adjacent to Randolph Air Force Base. Working families, military households, master-planned subdivisions. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why Schertz homeowners sell to us</h2>
        <ul>
          <li><strong>Military PCS relocations</strong> &mdash; Randolph AFB drives constant turnover. We close on the timeline a PCS demands, including remote closings with a mobile notary at the new duty station.</li>
          <li><strong>Tired landlords</strong> with Schertz rentals near Randolph who are done managing turnover.</li>
          <li><strong>Out-of-state inheritances</strong> from retired military households.</li>
          <li><strong>Estate sales</strong> of older Schertz homes.</li>
          <li><strong>Pre-foreclosure</strong> in Guadalupe or Bexar County.</li>
          <li><strong>Foundation issues</strong> on expansive clay slabs &mdash; common in 80s/90s Schertz construction.</li>
        </ul>

        <h2>Military and PCS-aware closings</h2>
        <p>We close PCS-driven sales constantly. We can:</p>
        <ul>
          <li>Sign contracts before you ship out</li>
          <li>Close remotely via mobile notary at any base CONUS or OCONUS</li>
          <li>Coordinate with your moving timeline (TMO, HHG pickup, base housing report dates)</li>
          <li>Work directly with VA loan payoffs and assumable scenarios</li>
        </ul>

        <h2>Schertz areas we buy in</h2>
        <ul>
          <li>Older Schertz (FM 78 / Main Street area)</li>
          <li>Northcliffe</li>
          <li>Belmont Park</li>
          <li>The Crossvine</li>
          <li>Schertz Parkway corridor</li>
          <li>Randolph border / Live Oak adjacent</li>
          <li>FM 3009 corridor</li>
        </ul>

        <h2>How it works in Schertz</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull Schertz comps.</strong></li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Guadalupe or Bexar County title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/new-braunfels">New Braunfels</a></li>
          <li><a href="/converse">Converse</a></li>
          <li><a href="/seguin">Seguin</a></li>
          <li><a href="/boerne">Boerne</a></li>
          <li><a href="/helotes">Helotes</a></li>
        </ul>
      </PageShell>
    </>
  );
}
