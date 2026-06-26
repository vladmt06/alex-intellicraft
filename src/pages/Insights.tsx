import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import InsightsNav from "@/components/InsightsNav";
import { posts } from "@/content/posts";

const Insights = () => {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Helmet>
        <title>Insights — Alexandria | Biopharma diligence, valuation & deal strategy</title>
        <meta
          name="description"
          content="Working notes on biopharma licensing and M&A diligence — rNPV modeling, Monte Carlo simulation, deal structuring, and how BD&L teams evaluate assets in practice."
        />
        <link rel="canonical" href="https://www.alexandrialabs.uk/insights" />
        <meta property="og:title" content="Insights — Alexandria" />
        <meta
          property="og:description"
          content="Working notes on biopharma licensing and M&A diligence — rNPV, Monte Carlo, and deal strategy."
        />
        <meta property="og:url" content="https://www.alexandrialabs.uk/insights" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Alexandria Insights",
            url: "https://www.alexandrialabs.uk/insights",
            blogPost: sorted.map((p) => ({
              "@type": "BlogPosting",
              headline: p.title,
              url: `https://www.alexandrialabs.uk/insights/${p.slug}`,
              datePublished: p.date,
              description: p.description,
            })),
          })}
        </script>
      </Helmet>

      <InsightsNav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-6">
            Insights
          </p>
          <h1 className="text-5xl md:text-6xl tracking-tight mb-6">
            Notes from the diligence floor.
          </h1>
          <p className="text-lg text-foreground/60 max-w-2xl mb-16">
            Working notes on biopharma licensing and M&amp;A — valuation methods, diligence
            frameworks, and deal structuring drawn from how BD&amp;L teams actually run the work.
          </p>

          <div className="border-t border-border">
            {sorted.map((post) => (
              <Link
                key={post.slug}
                to={`/insights/${post.slug}`}
                className="group block border-b border-border py-8 transition-colors hover:bg-foreground/[0.02]"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="text-xs font-mono uppercase tracking-[0.15em] text-foreground/40">
                    {post.category}
                  </span>
                  <span className="text-xs text-foreground/30">{post.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl tracking-tight mb-3 group-hover:text-foreground/70 transition-colors">
                  {post.title}
                </h2>
                <p className="text-foreground/50 max-w-2xl">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Insights;