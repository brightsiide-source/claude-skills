import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function PageHeader({ eyebrow, title, description }: Props) {
  return (
    <section className="relative surface-leaf-dark pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-leaf-mesh pointer-events-none" />
      <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-leaf-500/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-leaf-700/40 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          {eyebrow && (
            <span className="inline-block text-leaf-300 text-sm font-bold uppercase tracking-widest mb-4">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-1 font-display text-white max-w-4xl text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-8 text-xl text-white/75 max-w-2xl text-pretty">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
