import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileStickyBar from "./MobileStickyBar";

type Crumb = { label: string; href?: string };

export default function PageShell({
  children,
  breadcrumbs,
  title,
  intro,
}: {
  children: React.ReactNode;
  breadcrumbs: Crumb[];
  title: string;
  intro?: string;
}) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-28 lg:pb-16 bg-limestone min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-sand-dark mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              {breadcrumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-2">
                  {c.href ? (
                    <a href={c.href} className="hover:text-terra transition-colors">
                      {c.label}
                    </a>
                  ) : (
                    <span className="text-adobe">{c.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && <span>/</span>}
                </li>
              ))}
            </ol>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-adobe mb-4">{title}</h1>
          {intro && (
            <p className="text-lg text-sand-dark mb-8 leading-relaxed">{intro}</p>
          )}

          <article className="prose-content text-adobe space-y-6">{children}</article>

          <div className="mt-12 flex flex-wrap gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-terra hover:bg-terra-dark text-white px-6 py-3 rounded-md font-bold transition-colors"
            >
              Get my cash offer
            </a>
            <a
              href="tel:+18305901105"
              className="inline-flex items-center gap-2 bg-adobe hover:bg-adobe-light text-white px-6 py-3 rounded-md font-bold transition-colors"
            >
              Call (830) 590-1105
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <MobileStickyBar />
    </>
  );
}
