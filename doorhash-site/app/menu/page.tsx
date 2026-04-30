import { PageHeader } from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <>
      <PageHeader
        eyebrow="Live menu"
        title="Shop the full menu"
        description={`Real-time inventory, powered by Dutchie. Same-day delivery across ${site.region}.`}
      />
      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="rounded-3xl glass overflow-hidden border-leaf-500/10">
            <iframe
              src={site.dutchie.embedUrl}
              title="doorhash menu"
              className="w-full h-[1400px] border-0"
              loading="lazy"
            />
          </div>
          <p className="mt-8 text-center text-ink-400 text-sm">
            Trouble loading the menu? <a href={site.dutchie.embedUrl} className="text-leaf-300 hover:underline">Open it in a new tab.</a>
          </p>
        </div>
      </section>
    </>
  );
}
