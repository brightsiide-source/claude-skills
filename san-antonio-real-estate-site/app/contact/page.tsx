import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Contact SA Cash Home Buyers | Get a Cash Offer on Your TX House",
  description:
    "Get a written cash offer on your San Antonio house in 24 hours. Call (210) 555-0100 or fill out the form. Locally owned, no obligation, no fees.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SA Cash Home Buyers",
    description: "Cash offer in 24 hours. Call (210) 555-0100.",
    url: "https://sacashhomebuyers.co/contact",
    type: "website",
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: "https://sacashhomebuyers.co/contact",
  mainEntity: {
    "@type": "LocalBusiness",
    name: "SA Cash Home Buyers",
    telephone: "+1-210-555-0100",
    email: "info@sacashhomebuyers.co",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Antonio",
      addressRegion: "TX",
      addressCountry: "US",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        title="Get your cash offer."
        intro="Written offer in 24 hours. No obligation, no fees, no spam. Or call (210) 555-0100 right now."
      >
        <h2>By phone</h2>
        <p>
          <a href="tel:+12105550100" className="text-2xl font-bold">(210) 555-0100</a><br />
          Monday&ndash;Friday 8am&ndash;6pm CT, Saturday 9am&ndash;2pm CT.<br />
          After-hours voicemails returned the same day.
        </p>

        <h2>By email</h2>
        <p>
          <a href="mailto:info@sacashhomebuyers.co">info@sacashhomebuyers.co</a><br />
          Replies within one business day.
        </p>

        <h2>By form</h2>
        <form
          name="contact-form"
          method="POST"
          data-netlify="true"
          action="/contact?submitted=true"
          className="bg-white rounded-xl p-6 space-y-4 border border-limestone-dark not-prose"
        >
          <input type="hidden" name="form-name" value="contact-form" />
          <div>
            <label className="block text-sm font-medium text-adobe mb-1">Property address</label>
            <input
              type="text"
              name="address"
              required
              placeholder="123 Main St, San Antonio, TX 78201"
              className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-adobe mb-1">Your name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-adobe mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-adobe mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-adobe mb-1">Property condition (optional)</label>
            <select
              name="condition"
              className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
            >
              <option value="">Select...</option>
              <option>Move-in ready</option>
              <option>Needs minor work</option>
              <option>Needs major repairs</option>
              <option>Vacant / boarded</option>
              <option>Not sure</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-adobe mb-1">Tell us about your situation (optional)</label>
            <textarea
              name="notes"
              rows={4}
              placeholder="Inherited, divorce, foreclosure, tired landlord — whatever it is."
              className="w-full px-4 py-3 border border-limestone-dark rounded-md focus:outline-none focus:ring-2 focus:ring-terra"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-terra hover:bg-terra-dark text-white py-4 rounded-md font-bold transition-colors"
          >
            Get my cash offer →
          </button>
          <p className="text-xs text-sand-dark text-center">Confidential. No obligation. We never share your info.</p>
        </form>

        <h2>Service hours</h2>
        <p>Monday&ndash;Friday 8am&ndash;6pm CT, Saturday 9am&ndash;2pm CT. We answer the phone in person whenever someone&rsquo;s around. If we miss you, we return calls the same day.</p>

        <h2>Where we work</h2>
        <p>San Antonio, Bexar County, New Braunfels, Boerne, Schertz, Converse, Seguin, Helotes, and the surrounding South Texas counties. <a href="/service-areas">Full service area list</a>.</p>

        <h2>What happens after you contact us</h2>
        <ol>
          <li>We call or text within one business day to confirm the basics.</li>
          <li>You get a written cash offer within 24 hours.</li>
          <li>If you accept, we open title at a Texas title company and pick a closing date together.</li>
          <li>You sign at closing &mdash; in person, or remotely with a mobile notary if you&rsquo;re out of state.</li>
          <li>Funds wire to you, typically same-day or next business day after recording.</li>
        </ol>
      </PageShell>
    </>
  );
}
