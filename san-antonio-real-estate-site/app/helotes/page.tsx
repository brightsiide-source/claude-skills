import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses Helotes TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your Helotes, TX house fast for cash. Local Bexar County buyers in this Hill Country-edge suburb northwest of San Antonio. Custom homes, acreage. Close in 7-30 days.",
  alternates: { canonical: "/helotes" },
  openGraph: {
    title: "We Buy Houses Helotes TX | Cash Offer in 24 Hours",
    description: "Local cash buyers serving Helotes. Close in 30 days.",
    url: "https://sacashhomebuyers.co/helotes",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in Helotes, TX.",
  url: "https://sacashhomebuyers.co/helotes",
  telephone: "+1-830-590-1105",
  areaServed: { "@type": "City", name: "Helotes", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function HelotesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Helotes" }]}
        title="We buy houses in Helotes, TX — for cash."
        intro="Helotes is a Bexar County small city on the Hill Country edge — northwest of San Antonio along Bandera Road. Custom homes, acreage, master-planned subdivisions. Annual Cornyval and a strong sense of small-town identity within the SA metro. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why Helotes homeowners sell to us</h2>
        <ul>
          <li><strong>Long-term owners downsizing.</strong> Many Helotes owners are 50+ and ready for easier-to-maintain housing closer to SA proper.</li>
          <li><strong>Out-of-state inheritances</strong> from longtime Helotes residents.</li>
          <li><strong>Acreage owners exiting</strong> properties that took an MLS process months to sell.</li>
          <li><strong>Estate sales</strong> of older custom Hill Country-style homes.</li>
          <li><strong>Pre-foreclosure</strong> in Bexar County.</li>
          <li><strong>Septic/well issues</strong> on rural Helotes acreage outside the city limits.</li>
        </ul>

        <h2>Helotes areas we buy in</h2>
        <ul>
          <li>Old Town Helotes</li>
          <li>Falls of Helotes</li>
          <li>Iron Horse Canyon</li>
          <li>Wildhorse</li>
          <li>Hidden Forest</li>
          <li>Bandera Road corridor</li>
          <li>Scenic Loop Road acreage</li>
          <li>Government Canyon border properties</li>
        </ul>

        <h2>How it works in Helotes</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull Helotes comps.</strong> Custom-acreage comps vary; we use comparable lot size and finish level.</li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Bexar County title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/boerne">Boerne</a></li>
          <li><a href="/schertz">Schertz</a></li>
          <li><a href="/converse">Converse</a></li>
          <li><a href="/new-braunfels">New Braunfels</a></li>
          <li><a href="/seguin">Seguin</a></li>
        </ul>
      </PageShell>
    </>
  );
}
