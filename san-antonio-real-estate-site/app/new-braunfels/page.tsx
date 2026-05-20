import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "We Buy Houses New Braunfels TX | Cash Home Buyer | SA Cash Home Buyers",
  description:
    "Sell your New Braunfels, TX house fast for cash. Local buyers serving Comal County — Schlitterbahn area, Gruene, Canyon Lake. Close in 7-30 days, no fees.",
  alternates: { canonical: "/new-braunfels" },
  openGraph: {
    title: "We Buy Houses New Braunfels TX — Cash Offer in 24 Hours",
    description: "Local cash buyers serving New Braunfels and Comal County. Close in 30 days.",
    url: "https://sacashhomebuyers.co/new-braunfels",
    type: "website",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "SA Cash Home Buyers",
  description: "We buy houses for cash in New Braunfels, TX.",
  url: "https://sacashhomebuyers.co/new-braunfels",
  telephone: "+1-210-555-0100",
  areaServed: { "@type": "City", name: "New Braunfels", containedInPlace: { "@type": "State", name: "Texas" } },
};

export default function NewBraunfelsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "New Braunfels" }]}
        title="We buy houses in New Braunfels, TX — for cash."
        intro="New Braunfels is the Comal County seat — a fast-growing Hill Country tourist town on the I-35 corridor between San Antonio and Austin. We pay cash, close in 7-30 days, and cover all closing costs."
      >
        <h2>Why New Braunfels homeowners sell to us</h2>
        <p>New Braunfels has been one of the fastest-growing cities in the country for over a decade. Common seller patterns:</p>
        <ul>
          <li><strong>Long-term owners cashing out.</strong> Owners who bought before the 2010s appreciation wave often sit on significant equity and want a clean exit.</li>
          <li><strong>Out-of-state inheritances.</strong> NB attracts retirees; their adult children typically live elsewhere.</li>
          <li><strong>Vacation-rental fatigue.</strong> Owners of Schlitterbahn-area or Guadalupe River STRs who are tired of management.</li>
          <li><strong>Austin/SA commuter relocations.</strong> NB residents commuting both directions; job change means moving on.</li>
          <li><strong>Estate sales</strong> of older Gruene-area and downtown NB homes.</li>
          <li><strong>Pre-foreclosure</strong> in Comal County.</li>
          <li><strong>Hill Country acreage owners</strong> exiting properties that need extensive MLS marketing.</li>
        </ul>

        <h2>New Braunfels areas we buy in</h2>
        <ul>
          <li>Downtown New Braunfels</li>
          <li>Gruene historic district</li>
          <li>Schlitterbahn / Landa Park area</li>
          <li>Guadalupe River and Comal River corridors</li>
          <li>Solms / Klein Branch area</li>
          <li>Comal Springs / Canyon Lake border</li>
          <li>Vintage Oaks</li>
          <li>Mission Hill Estates</li>
          <li>FM 1102 corridor</li>
          <li>FM 306 / Sattler area</li>
        </ul>

        <h2>How it works in New Braunfels</h2>
        <ol>
          <li><strong>Tell us about the property.</strong></li>
          <li><strong>We pull New Braunfels comps.</strong></li>
          <li><strong>Written cash offer in 24 hours.</strong></li>
          <li><strong>Close on your date.</strong> 7-30 days at a Comal County or shared NB title company.</li>
        </ol>

        <h2>Selling in another TX city?</h2>
        <ul>
          <li><a href="/">San Antonio</a></li>
          <li><a href="/boerne">Boerne</a></li>
          <li><a href="/schertz">Schertz</a></li>
          <li><a href="/seguin">Seguin</a></li>
          <li><a href="/converse">Converse</a></li>
          <li><a href="/helotes">Helotes</a></li>
        </ul>
      </PageShell>
    </>
  );
}
