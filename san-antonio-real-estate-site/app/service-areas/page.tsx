import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Service Areas | Where We Buy Houses in San Antonio & South Texas",
  description:
    "Cities, counties, neighborhoods, and ZIPs we buy houses in — San Antonio, Bexar County, New Braunfels, Boerne, Schertz, Converse, Seguin, Helotes, and surrounding South TX.",
  alternates: { canonical: "/service-areas" },
  openGraph: {
    title: "SA Service Areas",
    description: "Cities, counties, and ZIPs we buy houses in across South Texas.",
    url: "https://sacashhomebuyers.co/service-areas",
    type: "website",
  },
};

const lbSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "SA Cash Home Buyers",
  url: "https://sacashhomebuyers.co/",
  telephone: "+1-830-590-1105",
  areaServed: [
    { "@type": "City", name: "San Antonio" },
    { "@type": "City", name: "New Braunfels" },
    { "@type": "City", name: "Boerne" },
    { "@type": "City", name: "Schertz" },
    { "@type": "City", name: "Converse" },
    { "@type": "City", name: "Seguin" },
    { "@type": "City", name: "Helotes" },
  ],
};

export default function ServiceAreasPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lbSchema) }}
      />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Service areas" }]}
        title="Service Areas"
        intro="We buy houses across San Antonio, all of Bexar County, and the surrounding South Texas counties — from the Hill Country edge down to the Wilson/Atascosa line."
      >
        <h2>Cities with dedicated pages</h2>
        <ul>
          <li><a href="/new-braunfels"><strong>New Braunfels</strong></a> &mdash; Comal County, fast-growing I-35 corridor, Schlitterbahn area</li>
          <li><a href="/boerne"><strong>Boerne</strong></a> &mdash; Kendall County, Hill Country, premium custom homes</li>
          <li><a href="/schertz"><strong>Schertz</strong></a> &mdash; Guadalupe County, Randolph AFB area</li>
          <li><a href="/converse"><strong>Converse</strong></a> &mdash; Bexar County, working-family suburb NE of SA</li>
          <li><a href="/seguin"><strong>Seguin</strong></a> &mdash; Guadalupe County rail town</li>
          <li><a href="/helotes"><strong>Helotes</strong></a> &mdash; Bexar County, Hill Country edge NW of SA</li>
        </ul>

        <h2>Counties we work in</h2>
        <ul>
          <li><strong>Bexar County</strong> &mdash; San Antonio and all suburbs</li>
          <li><strong>Comal County</strong> &mdash; New Braunfels, Bulverde, Canyon Lake</li>
          <li><strong>Guadalupe County</strong> &mdash; Schertz, Seguin, Cibolo</li>
          <li><strong>Kendall County</strong> &mdash; Boerne, Comfort</li>
          <li><strong>Wilson County</strong> &mdash; Floresville, Stockdale, La Vernia</li>
          <li><strong>Atascosa County</strong> &mdash; Pleasanton, Jourdanton, Lytle</li>
        </ul>

        <h2>San Antonio neighborhoods we buy in</h2>
        <p>Every side of town. A few examples:</p>
        <ul>
          <li>Downtown / King William / Lavaca / Southtown</li>
          <li>Alamo Heights, Olmos Park, Terrell Hills</li>
          <li>Monte Vista, Tobin Hill, Mahncke Park</li>
          <li>Stone Oak, Encino Park, Hollywood Park</li>
          <li>Shavano Park, Castle Hills</li>
          <li>Northwest Side, Leon Valley, Helotes border</li>
          <li>South Side, Mission Reach, Highland Park</li>
          <li>East Side, Denver Heights, Dignowity Hill</li>
          <li>West Side, Edgewood, Las Palmas</li>
          <li>Far West / Government Canyon</li>
          <li>Windcrest, Kirby, Live Oak</li>
        </ul>

        <h2>Additional communities</h2>
        <p>We also buy in these areas without dedicated pages (yet):</p>
        <ul>
          <li>Universal City</li>
          <li>Live Oak</li>
          <li>Windcrest</li>
          <li>Kirby</li>
          <li>Leon Valley</li>
          <li>Balcones Heights</li>
          <li>Castle Hills</li>
          <li>Shavano Park</li>
          <li>Hollywood Park</li>
          <li>Garden Ridge</li>
          <li>Floresville</li>
          <li>Pleasanton</li>
          <li>Cibolo</li>
          <li>Bulverde</li>
          <li>Canyon Lake</li>
          <li>La Vernia</li>
        </ul>

        <h2>San Antonio ZIPs we cover</h2>
        <p>If your ZIP is on this list, we buy houses there. If it&rsquo;s not, call us anyway &mdash; many adjacent ZIPs work fine.</p>
        <p>
          <strong>San Antonio / Bexar County:</strong> 78201, 78202, 78203, 78204, 78205, 78207, 78208, 78209, 78210, 78211, 78212, 78213, 78214, 78215, 78216, 78217, 78218, 78219, 78220, 78221, 78222, 78223, 78224, 78225, 78226, 78227, 78228, 78229, 78230, 78231, 78232, 78233, 78237, 78238, 78239, 78240, 78242, 78244, 78245, 78247, 78248, 78249, 78250, 78251, 78252, 78253, 78254, 78255, 78256, 78257, 78258, 78259, 78260, 78261, 78263, 78264, 78266<br />
          <strong>Comal County:</strong> 78130, 78132, 78133, 78135<br />
          <strong>Guadalupe County:</strong> 78108 (Cibolo), 78154 (Schertz), 78155 (Seguin)<br />
          <strong>Kendall County:</strong> 78006 (Boerne), 78013 (Comfort)<br />
          <strong>Wilson County:</strong> 78114 (Floresville), 78121 (La Vernia)
        </p>

        <h2>Why local matters in Texas</h2>
        <p>Texas has highly neighborhood-specific pricing. Two identical homes on opposite sides of Loop 410 can differ by $100k+ in market value. Hill Country acreage outside Boerne prices differently than the same square footage in Stone Oak. Out-of-state cash buyers run algorithms that miss this; we don&rsquo;t.</p>
      </PageShell>
    </>
  );
}
