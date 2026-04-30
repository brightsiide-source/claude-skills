import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-leaf-mesh" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-ink-950" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {eyebrow && (
            <span className="inline-block text-leaf-400 text-sm font-bold uppercase tracking-widest mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-1 font-display text-cream max-w-4xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-xl text-ink-200 max-w-2xl text-pretty">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
