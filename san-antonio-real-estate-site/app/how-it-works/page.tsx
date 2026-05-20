import type { Metadata } from "next";
import PageShell from "../components/PageShell";

export const metadata: Metadata = {
  title: "How It Works | Sell Your San Antonio House for Cash in 3 Steps",
  description:
    "The 3-step process to sell your San Antonio house for cash. Submit details, get a written offer in 24 hours, close on your timeline at a Texas title company.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How It Works — Selling your TX house for cash",
    description: "Three steps. Cash offer in 24 hours, close 7-30 days.",
    url: "https://sacashhomebuyers.co/how-it-works",
    type: "website",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to sell your San Antonio house for cash",
  description:
    "Three-step process to sell a San Antonio home for cash with no fees and no repairs.",
  totalTime: "P30D",
  step: [
    { "@type": "HowToStep", position: 1, name: "Tell us about the property", text: "Submit the form or call. We need address, condition, and timeline." },
    { "@type": "HowToStep", position: 2, name: "Get a written cash offer in 24 hours", text: "We send a written cash offer based on recent SA comps and the property's actual condition." },
    { "@type": "HowToStep", position: 3, name: "Close on your date", text: "Close at a reputable Texas title company in 7-30 days. We pay closing costs." },
  ],
};

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <PageShell
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How it works" }]}
        title="How it works."
        intro="Three steps. No listings, no showings, no waiting on buyer financing. Here's exactly what happens between your first call and your check at closing."
      >
        <h2>Step 01 &mdash; Tell us about the property</h2>
        <p>Submit the contact form or call <a href="tel:+12105550100">(210) 555-0100</a>. We need three things:</p>
        <ul>
          <li><strong>Address</strong> of the property</li>
          <li><strong>General condition</strong> &mdash; rough age, anything broken or deferred, occupied vs vacant</li>
          <li><strong>Your timeline</strong> &mdash; week-fast, or you have time to figure it out</li>
        </ul>
        <p>We don&rsquo;t ask for income, credit, financial statements, or sob stories. We&rsquo;re buying a house, not running an application.</p>
        <p>The conversation is confidential and free. No obligation at this stage. Many sellers call just to understand what their property is worth as a cash sale &mdash; even if they ultimately list with an agent instead.</p>

        <h2>Step 02 &mdash; Get a written cash offer in 24 hours</h2>
        <p>Within one business day, you get a written cash offer by email or text. The offer includes:</p>
        <ul>
          <li>The cash purchase price</li>
          <li>Our timeline (typically 7-30 days, your call)</li>
          <li>Confirmation that we pay all standard seller closing costs</li>
          <li>Confirmation that we buy as-is &mdash; no inspection contingency, no financing contingency</li>
        </ul>
        <p>The number is based on three real inputs: recent comparable sales in your specific San Antonio neighborhood, an estimate of what it would cost to bring the property to market-ready condition, and our holding and transaction costs. The number we send is the number we close at &mdash; we don&rsquo;t renegotiate at closing.</p>

        <h2>Step 03 &mdash; Close on your date</h2>
        <ol>
          <li><strong>We sign a TREC purchase contract.</strong> Standard Texas residential contract with no contingencies on our side.</li>
          <li><strong>We open title</strong> at a reputable Texas title company &mdash; Independence Title, Texas National, Alamo Title, or whichever local company you prefer.</li>
          <li><strong>Title runs a clean title search.</strong> Typically 5-10 business days. They surface any liens, judgments, HOA arrears, or back taxes &mdash; we settle those from the proceeds at closing.</li>
          <li><strong>You pick a closing date.</strong> As fast as 7 days for a clean-title cash close, up to 30 days if you need time to coordinate.</li>
          <li><strong>You sign at the title company.</strong> Out-of-state sellers can sign remotely with a mobile notary &mdash; we do this routinely.</li>
          <li><strong>Funds wire</strong> typically the same day or next business day after recording.</li>
        </ol>

        <h2>What it costs you</h2>
        <p>$0. We pay:</p>
        <ul>
          <li>Title insurance (owner&rsquo;s policy)</li>
          <li>Escrow / settlement fees</li>
          <li>Recording fees</li>
          <li>HOA estoppel and transfer fees</li>
          <li>Your share of property taxes through the closing date</li>
        </ul>
        <p>Texas has no state real estate transfer tax. The number on your offer is what you receive, minus only your existing mortgage payoff and any other recorded liens.</p>

        <h2>What if you need to back out?</h2>
        <p>You can. The TREC contract has a short option period during which you can cancel for any reason. We&rsquo;re not in the business of pressuring sellers into closings they regret.</p>

        <h2>What if your situation is more complicated?</h2>
        <ul>
          <li><a href="/foreclosure">Stop foreclosure (Texas 21-day non-judicial process)</a></li>
          <li><a href="/inherited">Inherited house / Texas probate</a></li>
          <li><a href="/divorce">Divorce sale (Texas community property)</a></li>
          <li><a href="/as-is">Sell as-is / distressed property</a></li>
        </ul>
      </PageShell>
    </>
  );
}
