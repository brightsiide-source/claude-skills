import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach Don Verde Farms — wholesale, press, and general inquiries. Operator-owned cannabis cultivation in Southern New Mexico."
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <p className="eyebrow text-verde-glow">Reach the farm</p>
          <h1 className="mt-8 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Get in touch.
          </h1>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Direct lines</p>

              <div className="mt-8 space-y-8">
                <ContactBlock
                  label="Wholesale"
                  body="Dispensary buyers — fastest path is the wholesale inquiry form."
                  ctaHref="/wholesale"
                  ctaLabel="Wholesale form →"
                />
                <ContactBlock
                  label="General"
                  body="Anything else — press, partnerships, brand questions."
                  ctaHref="mailto:info@donverdefarms.com"
                  ctaLabel="info@donverdefarms.com"
                />
                <ContactBlock
                  label="Social"
                  body="See current drops and the room."
                  ctaHref="https://www.instagram.com/donverdefarms/"
                  ctaLabel="@donverdefarms on Instagram"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-ink/15 bg-bone-warm p-10">
                <p className="eyebrow">Quick note</p>
                <h2 className="mt-4 font-display text-3xl tracking-tightest text-ink md:text-4xl">
                  Send a message.
                </h2>
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  className="mt-8 space-y-5"
                  action="/contact?sent=1"
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don&rsquo;t fill this out: <input name="bot-field" />
                    </label>
                  </p>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full border border-ink/20 bg-bone px-4 py-3 text-base text-ink outline-none placeholder:text-ink/40 focus:border-verde"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    className="w-full border border-ink/20 bg-bone px-4 py-3 text-base text-ink outline-none placeholder:text-ink/40 focus:border-verde"
                  />
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="What's the message?"
                    className="w-full border border-ink/20 bg-bone px-4 py-3 text-base text-ink outline-none placeholder:text-ink/40 focus:border-verde"
                  />
                  <button type="submit" className="btn-verde text-[11px]">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactBlock({
  label,
  body,
  ctaHref,
  ctaLabel
}: {
  label: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  const external = ctaHref.startsWith("http") || ctaHref.startsWith("mailto:");
  return (
    <div className="border-t border-ink/10 pt-6">
      <p className="text-[11px] uppercase tracking-[0.22em] text-verde">{label}</p>
      <p className="mt-3 text-base leading-relaxed text-ink/75">{body}</p>
      {external ? (
        <a
          href={ctaHref}
          target={ctaHref.startsWith("http") ? "_blank" : undefined}
          rel={ctaHref.startsWith("http") ? "noreferrer noopener" : undefined}
          className="mt-3 inline-block font-display text-2xl tracking-tightest text-ink hover:text-verde"
        >
          {ctaLabel}
        </a>
      ) : (
        <Link
          href={ctaHref}
          className="mt-3 inline-block font-display text-2xl tracking-tightest text-ink hover:text-verde"
        >
          {ctaLabel}
        </Link>
      )}
    </div>
  );
}
