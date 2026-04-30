import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a human."
        description="Order issues, partnership, press, or just want to say hi — we read everything."
      />
      <section className="relative pb-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 grid md:grid-cols-3 gap-6">
          <Reveal>
            <a
              href={`mailto:${site.email}`}
              className="group rounded-3xl glass p-8 block hover:border-leaf-500/30 transition-colors"
            >
              <Mail className="w-6 h-6 text-leaf-300 mb-6" />
              <div className="text-ink-300 text-sm uppercase tracking-widest mb-2">Email</div>
              <div className="text-cream font-display text-xl font-bold">{site.email}</div>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <a
              href={`tel:${site.phone}`}
              className="group rounded-3xl glass p-8 block hover:border-leaf-500/30 transition-colors"
            >
              <Phone className="w-6 h-6 text-leaf-300 mb-6" />
              <div className="text-ink-300 text-sm uppercase tracking-widest mb-2">Phone</div>
              <div className="text-cream font-display text-xl font-bold">{site.phone}</div>
            </a>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="rounded-3xl glass p-8">
              <MapPin className="w-6 h-6 text-leaf-300 mb-6" />
              <div className="text-ink-300 text-sm uppercase tracking-widest mb-2">HQ</div>
              <div className="text-cream font-display text-xl font-bold">{site.hq}</div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
