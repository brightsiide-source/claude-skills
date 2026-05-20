import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses Seguin TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your Seguin, TX house fast for cash. Local Guadalupe County buyers. Historic downtown, working families, BNSF rail, Caterpillar plant. Close in 7-30 days.",
  alternates: { canonical: "/seguin" },
  openGraph: {
    title: "We Buy Houses Seguin TX — Cash Offer in 24 Hours",
    description: "Local cash buyers serving Seguin and Guadalupe County.",
    url: "https://sacashhomebuyers.co/seguin",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in Seguin, TX.",
  url: "https://sacashhomebuyers.co/seguin",
  telephone: "+1-210-555-0100",
  areaServed: { "@type": "City", name: "Seguin", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function SeguinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Seguin" }]}
        title="We buy houses in Seguin, TX — for cash."
        intro="Seguin is the Guadalupe County seat — a historic small city east of San Antonio along I-10. Caterpillar plant, BNSF rail, Texas Lutheran University, working-family demographics. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why Seguin homeowners sell to us</h2>
        <ul>
          <li><strong>Caterpillar workforce relocations</strong> &mdash; the Seguin plant brings transfers in and out.</li>
          <li><strong>Estate sales</strong> of older Seguin homes &mdash; significant inventory built 1900s-1960s.</li>
          <li><strong>Pre-foreclosure</strong> in Guadalupe County.</li>
          <li><strong>Tired landlords</strong> with Seguin rentals.</li>
          <li><strong>Out-of-state owners</strong> who inherited Seguin property and want a remote close.</li>
          <li><strong>Distressed properties</strong> &mdash; foundation issues, deferred maintenance.</li>
        </ul>

        <h2>Seguin areas we buy in</h2>
        <ul>
          <li>Historic downtown Seguin</li>
          <li>North Seguin</li>
          <li>South Seguin / Guadalupe River corridor</li>
          <li>Texas Lutheran University area</li>
          <li>FM 725 corridor</li>
          <li>Walnut Springs</li>
          <li>Mill Creek area</li>
        </ul>

        <h2>How it works in Seguin</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull Seguin comps.</strong></li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Guadalupe County title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/schertz">Schertz</a></li>
          <li><a href="/new-braunfels">New Braunfels</a></li>
          <li><a href="/converse">Converse</a></li>
          <li><a href="/helotes">Helotes</a></li>
          <li><a href="/boerne">Boerne</a></li>
        </ul>
      </PageShell>
    </>
  );
}
