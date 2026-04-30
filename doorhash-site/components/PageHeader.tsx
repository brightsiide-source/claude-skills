import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative surface-paper pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-leaf-mesh-light pointer-events-none" />
      <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-leaf-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-leaf-700/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {eyebrow && (
            <span className="inline-block text-leaf-700 text-sm font-bold uppercase tracking-widest mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-1 font-display text-ink-950 max-w-4xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-xl text-paper-muted max-w-2xl text-pretty">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
