import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        title="Build the best cannabis brand in New Mexico."
        description="We're hiring drivers, budtenders, growers, and operators who care as much about the plant as we do."
      />
      <section className="relative pb-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Reveal>
            <div className="rounded-3xl glass p-10 text-center">
              <p className="text-ink-200 text-pretty mb-6">
                No open roles posted yet — we&apos;ll be hiring across cultivation, retail, and
                delivery as we approach our flagship opening. Drop your email and we&apos;ll
                reach out when roles match your skills.
              </p>
              <a
                href="mailto:careers@doorhash.com"
                className="inline-flex items-center gap-2 rounded-full bg-leaf-500 hover:bg-leaf-400 text-ink-950 font-bold px-7 py-3 transition-colors"
              >
                careers@doorhash.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
