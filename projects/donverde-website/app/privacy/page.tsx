import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Don Verde Farms privacy policy — what data we collect via the website, how it's used, and your rights as a visitor.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://donverdefarms.com/privacy" }
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-28 lg:px-12 lg:pb-16">
          <Breadcrumbs
            tone="dark"
            trail={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
          />
          <h1 className="mt-10 font-display text-6xl leading-[0.95] tracking-tightest md:text-7xl">
            Privacy policy.
          </h1>
          <p className="mt-6 text-sm uppercase tracking-[0.22em] text-bone/60">
            Last updated: April 30, 2026
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-6 text-base leading-relaxed text-ink/85 lg:px-12">
          <Section title="What this covers">
            <p>
              This privacy policy applies to information collected through donverdefarms.com (the
              &ldquo;Site&rdquo;), operated by Don Verde, LLC, a New Mexico-licensed cannabis
              cultivator (license CCD-VICE-2023-0010). It does not apply to information collected
              by retail partners, dispensaries, or third-party services that may carry our
              products.
            </p>
          </Section>

          <Section title="What we collect">
            <p>The Site collects only the information you choose to provide:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-ink">Wholesale inquiry form:</strong> name,
                title, email, phone, business name, NM license number, city, estimated volume,
                and any notes you include.
              </li>
              <li>
                <strong className="font-semibold text-ink">Contact form:</strong> name, email,
                and message.
              </li>
              <li>
                <strong className="font-semibold text-ink">Age gate:</strong> we store a single
                local verification flag in your browser&rsquo;s local storage (no personal data,
                no cookie).
              </li>
              <li>
                <strong className="font-semibold text-ink">Server logs:</strong> standard request
                logs (IP, user agent, timestamp) maintained by our hosting provider for security
                and reliability purposes.
              </li>
            </ul>
            <p className="mt-4">
              We do not use third-party advertising trackers. We do not run behavioral or
              cross-site tracking scripts.
            </p>
          </Section>

          <Section title="How we use it">
            <p>
              Information from the wholesale and contact forms is used solely to respond to your
              inquiry, verify your NM cannabis license status (for wholesale), and conduct the
              business of selling cannabis to NM-licensed dispensaries. We do not sell, rent, or
              share contact data with third parties for marketing purposes.
            </p>
          </Section>

          <Section title="How we store it">
            <p>
              Form submissions are stored by our forms service (Netlify Forms) and within our
              internal customer-relationship records. We retain wholesale inquiry data for as
              long as the relationship is active and for up to seven years after, consistent with
              NM commercial recordkeeping requirements.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You may at any time request that we delete your inquiry data, except where we are
              required by NM cannabis regulation or commercial-records law to retain it. Email{" "}
              <a href="mailto:info@donverdefarms.com" className="text-gold hover:text-gold-deep">
                info@donverdefarms.com
              </a>{" "}
              with the subject line &ldquo;Privacy request&rdquo; and we will respond within 30
              days.
            </p>
          </Section>

          <Section title="Age verification">
            <p>
              The Site requires age verification (21+) consistent with New Mexico cannabis law.
              The verification is stored client-side only. No age data is transmitted to or
              retained by Don Verde Farms.
            </p>
          </Section>

          <Section title="Updates">
            <p>
              We may update this policy when our practices change. The &ldquo;last updated&rdquo;
              date at the top reflects the current revision.
            </p>
          </Section>
        </div>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-3xl tracking-tightest text-ink md:text-4xl">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
