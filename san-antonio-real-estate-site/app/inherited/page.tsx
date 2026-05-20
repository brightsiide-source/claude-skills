import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "Sell an Inherited House in Texas — Cash, Even During Probate | SA Cash Home Buyers",
  description:
    "Inherited a house in San Antonio or Texas? We work with TX probate (independent administration), Small Estate Affidavits, and out-of-state heirs. Cash offer in 24 hours.",
  alternates: { canonical: "/inherited" },
  openGraph: {
    title: "Sell an Inherited Texas House for Cash",
    description: "We work with Texas probate, independent administration, and remote heirs. Cash offer in 24 hours.",
    url: "https://sacashhomebuyers.co/inherited",
    type: "website",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Inherited house cash purchase — Texas",
  provider: { "@type": "LocalBusiness", name: "SA Cash Home Buyers", telephone: "+1-210-555-0100" },
  areaServed: { "@type": "State", name: "Texas" },
  description: "Cash purchase of inherited homes in Texas. We work with probate, independent administration, and out-of-state heirs.",
};

export default function InheritedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Inherited house" }]}
        title="Sell an inherited Texas house — for cash."
        intro="You inherited a property in San Antonio or somewhere in Texas. Maybe you live out of state, maybe the house is full of decades of stuff, maybe you're mid-probate and don't know what you can sign. We work through all of it."
      >
        <h2>Texas probate is actually one of the better systems</h2>
        <p>Most states have slow, expensive probate. Texas is different. The Texas Estates Code allows for <strong>independent administration</strong> &mdash; one of the fastest and most streamlined probate processes in the country.</p>
        <p>How it typically works:</p>
        <ul>
          <li><strong>File the will (if any) and an application</strong> with the appropriate probate court (Bexar County Probate Court 1 or 2 for SA properties, or the County Court at Law in smaller counties).</li>
          <li><strong>Hearing scheduled</strong> &mdash; typically 30-45 days out.</li>
          <li><strong>Letters Testamentary or Letters of Administration issued</strong> &mdash; this is what title companies and we need to see before closing.</li>
          <li><strong>From filing to Letters: typically 30-60 days</strong> in uncontested cases. That&rsquo;s much faster than judicial-state probate.</li>
        </ul>

        <h2>Small Estate Affidavit option</h2>
        <p>If the estate has under $75,000 in non-real-estate personal property and meets a few other criteria, Texas allows a <strong>Small Estate Affidavit</strong> under Texas Estates Code Chapter 205. Real property can be transferred this way only if it&rsquo;s the homestead and there&rsquo;s a surviving spouse or minor children. Talk to a Texas probate attorney to see if this applies.</p>

        <h2>Affidavit of Heirship for older deaths</h2>
        <p>For properties where the owner died 4+ years ago and no probate was opened, Texas allows an <strong>Affidavit of Heirship</strong> to be recorded establishing ownership. This is common for inherited properties that have been sitting for years. We&rsquo;ve closed many of these.</p>

        <h2>How we help</h2>
        <p>We&rsquo;re comfortable working with you and your Texas probate attorney through any of the above paths. We can:</p>
        <ul>
          <li>Sign a purchase contract during probate (subject to the personal representative receiving Letters)</li>
          <li>Coordinate the closing date around when Letters are expected to issue</li>
          <li>Work directly with your attorney to ensure title can convey cleanly</li>
          <li>Handle remote closings via mobile notary if you live out of state</li>
          <li>Take the property with all the contents &mdash; you don&rsquo;t need to clean it out</li>
        </ul>

        <h2>Common inherited-house situations we buy</h2>
        <ul>
          <li><strong>Out-of-state heir</strong> who inherited an SA property and doesn&rsquo;t want to fly down repeatedly</li>
          <li><strong>Multiple heirs</strong> who all want their share in cash with minimal back-and-forth</li>
          <li><strong>Properties full of stuff</strong> &mdash; furniture, paperwork, decades of accumulation. Leave it. We&rsquo;ll handle cleanout.</li>
          <li><strong>Older homes with deferred maintenance</strong> &mdash; foundation issues, dated electrical, roof past its life</li>
          <li><strong>Properties that have been vacant for months or years</strong></li>
          <li><strong>Estate situations with HOA arrears or back property taxes</strong> &mdash; we settle these at closing from the proceeds</li>
          <li><strong>Affidavit of Heirship situations</strong> where probate was never opened</li>
        </ul>

        <h2>Texas independent administration vs dependent</h2>
        <p>Most Texas wills name an executor and provide for <strong>independent administration</strong> &mdash; meaning the executor doesn&rsquo;t need court approval for every routine sale or transfer. This makes selling inherited Texas property fast. If the will doesn&rsquo;t provide for independent administration, or there&rsquo;s no will and the heirs don&rsquo;t all consent, you may be in <strong>dependent administration</strong>, which requires court approval for sales and takes longer. We work with either.</p>

        <h2>Tax considerations</h2>
        <p>Inherited property gets a <strong>stepped-up basis</strong> to fair market value at the date of death. That means if you sell soon after inheriting, capital gains exposure is usually minimal &mdash; you&rsquo;re only taxed on appreciation between the date of death and the sale date. This is general information, not tax advice; talk to a CPA.</p>

        <h2>Get a fair cash offer on the inherited property</h2>
        <p>Call <a href="tel:+12105550100">(210) 555-0100</a> or use the contact form. We&rsquo;ll work with you and your attorney to structure a clean Texas closing on a timeline that matches your probate process.</p>
      </PageShell>
    </>
  );
}
