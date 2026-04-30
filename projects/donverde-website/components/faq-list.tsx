export interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
}

export function FaqList({ items }: Props) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((it) => (
        <details key={it.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
            <h3 className="font-display text-2xl tracking-tightest text-ink md:text-3xl">{it.q}</h3>
            <span
              aria-hidden
              className="mt-2 text-2xl font-light text-gold transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-4 max-w-3xl text-base leading-relaxed text-ink/75">{it.a}</div>
        </details>
      ))}
    </div>
  );
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a }
    }))
  };
}
