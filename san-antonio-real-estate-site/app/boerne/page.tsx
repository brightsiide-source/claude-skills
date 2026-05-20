import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses Boerne TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your Boerne, TX house fast for cash. Local Kendall County buyers — Hill Country, premium custom homes, acreage. Close in 7-30 days, no fees.",
  alternates: { canonical: "/boerne" },
  openGraph: {
    title: "We Buy Houses Boerne TX — Cash Offer in 24 Hours",
    description: "Local cash buyers serving Boerne and Kendall County Hill Country.",
    url: "https://sacashhomebuyers.co/boerne",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in Boerne, TX.",
  url: "https://sacashhomebuyers.co/boerne",
  telephone: "+1-210-555-0100",
  areaServed: { "@type": "City", name: "Boerne", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function BoernePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Boerne" }]}
        title="We buy houses in Boerne, TX — for cash."
        intro="Boerne is the Kendall County seat — a Texas Hill Country town northwest of San Antonio along I-10. Premium custom homes, ranch acreage, historic downtown. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why Boerne homeowners sell to us</h2>
        <ul>
          <li><strong>Long-term owners downsizing.</strong> Many Boerne owners are 60+ and ready to move closer to family or into easier-to-maintain housing.</li>
          <li><strong>Out-of-state inheritances.</strong> Boerne attracts retirees from across the country; their adult children typically live elsewhere.</li>
          <li><strong>Hill Country acreage owners exiting</strong> properties that took an MLS listing months to sell.</li>
          <li><strong>Estate sales</strong> of older custom Hill Country homes with maintenance complications.</li>
          <li><strong>Pre-foreclosure</strong> in Kendall County.</li>
          <li><strong>Properties with septic/well issues</strong> on rural acreage.</li>
        </ul>
        <p>Honest note: Boerne is a premium market with low inventory. If your property is in good shape and you have time, an MLS listing will typically fetch more. Our offers are most compelling when speed, certainty, or condition matter.</p>

        <h2>Boerne areas we buy in</h2>
        <ul>
          <li>Downtown Boerne / Main Street historic district</li>
          <li>Cordillera Ranch</li>
          <li>Tapatio Springs</li>
          <li>Esperanza</li>
          <li>FM 1376 corridor</li>
          <li>Cibolo Creek / Boerne Lake area</li>
          <li>FM 3351 / FM 474 acreage</li>
          <li>Sisterdale Road area</li>
          <li>I-10 corridor / Fair Oaks border</li>
        </ul>

        <h2>How it works in Boerne</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull Boerne comps.</strong> Custom-acreage comps vary widely; we use comparable lot size and finish level.</li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Kendall County title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/new-braunfels">New Braunfels</a></li>
          <li><a href="/helotes">Helotes</a></li>
          <li><a href="/schertz">Schertz</a></li>
          <li><a href="/converse">Converse</a></li>
          <li><a href="/seguin">Seguin</a></li>
        </ul>
      </PageShell>
    </>
  );
}
