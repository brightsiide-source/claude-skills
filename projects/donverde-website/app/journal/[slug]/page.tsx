import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { journalPosts, getJournalPost } from "@/content/journal";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getJournalPost(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://donverdefarms.com/journal/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt
    }
  };
}

export default function JournalPostPage({ params }: Props) {
  const post = getJournalPost(params.slug);
  if (!post) notFound();

  const related = (post.related ?? [])
    .map((s) => journalPosts.find((p) => p.slug === s))
    .filter(Boolean);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: { "@id": "https://donverdefarms.com/#organization" },
    publisher: { "@id": "https://donverdefarms.com/#organization" },
    mainEntityOfPage: `https://donverdefarms.com/journal/${post.slug}`,
    articleSection: post.category,
    inLanguage: "en-US"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <header className="bg-ink text-bone">
          <div className="mx-auto max-w-4xl px-6 pb-16 pt-28 lg:px-12 lg:pb-24">
            <Breadcrumbs
              tone="dark"
              trail={[
                { label: "Home", href: "/" },
                { label: "Journal", href: "/journal" },
                { label: post.title }
              ]}
            />
            <p className="eyebrow mt-10 text-gold-glow">
              {post.category} · {post.readMinutes} min read
            </p>
            <h1 className="mt-6 font-display text-5xl leading-[1] tracking-tightest md:text-7xl">
              {post.title}
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-bone/80">{post.description}</p>
            <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-bone/50">
              Published {formatDate(post.publishedAt)}
            </p>
          </div>
        </header>

        <div className="bg-bone py-20 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 lg:px-12">
            <div className="space-y-7 text-lg leading-[1.7] text-ink/85">
              {post.body.map((para, i) => (
                <Paragraph key={i} text={para} />
              ))}
            </div>

            {post.pullQuote && (
              <blockquote className="my-16 border-l-2 border-gold pl-6">
                <p className="font-display text-3xl italic leading-snug tracking-tightest text-ink md:text-4xl">
                  &ldquo;{post.pullQuote}&rdquo;
                </p>
              </blockquote>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-bone-warm py-24 lg:py-32">
          <div className="mx-auto max-w-8xl px-6 lg:px-12">
            <p className="eyebrow">Keep reading</p>
            <div className="mt-8 grid gap-px border-y border-ink/10 md:grid-cols-2">
              {related.map((p) =>
                p ? (
                  <Link
                    key={p.slug}
                    href={`/journal/${p.slug}`}
                    className="group block bg-bone-warm p-8 transition-colors hover:bg-bone"
                  >
                    <p className="text-[10px] uppercase tracking-[0.22em] text-gold">{p.category}</p>
                    <h3 className="mt-3 font-display text-2xl tracking-tightest text-ink group-hover:text-gold-deep md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/70">{p.description}</p>
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Paragraph({ text }: { text: string }) {
  // Render simple **bold** markdown
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p>
      {parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}
