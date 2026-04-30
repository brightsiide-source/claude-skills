import type { Metadata } from "next";
import Link from "next/link";
import { journalPosts } from "@/content/journal";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: "Journal — Cultivation, Terpenes & New Mexico Cannabis",
  description:
    "Notes from the farm. Cultivation methodology, terpene primers, NM cannabis market analysis, and budtender education from Don Verde Farms.",
  alternates: { canonical: "https://donverdefarms.com/journal" }
};

export default function JournalIndexPage() {
  const posts = [...journalPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );

  return (
    <>
      <section className="bg-ink text-bone">
        <div className="mx-auto max-w-8xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
          <Breadcrumbs
            tone="dark"
            trail={[{ label: "Home", href: "/" }, { label: "Journal" }]}
          />
          <p className="eyebrow mt-10 text-gold-glow">From the farm</p>
          <h1 className="mt-6 max-w-5xl font-display text-7xl leading-[0.95] tracking-tightest md:text-9xl">
            Journal.
          </h1>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-bone/80">
            Cultivation notes, terpene primers, the occasional unsentimental view of the NM
            cannabis market. Written for budtenders, buyers, and anyone who actually wants to
            understand the flower they&rsquo;re smoking or selling.
          </p>
        </div>
      </section>

      <section className="bg-bone py-24 lg:py-32">
        <div className="mx-auto max-w-8xl px-6 lg:px-12">
          <div className="space-y-px border-y border-ink/10">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/journal/${post.slug}`}
                className="group relative grid gap-6 border-b border-ink/10 py-10 transition-colors last:border-b-0 hover:bg-bone-warm md:grid-cols-12 md:items-baseline md:gap-10"
              >
                <div className="md:col-span-2">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-gold">
                    {post.category}
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-ink/40">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <h2 className="font-display text-4xl tracking-tightest text-ink transition-colors group-hover:text-gold-deep md:text-5xl">
                    {post.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/70">
                    {post.description}
                  </p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-ink/50">
                    {post.readMinutes} min read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
