import { Link, Navigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import InsightsNav from "@/components/InsightsNav";
import FAQ from "@/components/FAQ";
import { posts, postBySlug, type Block } from "@/content/posts";

const renderBlock = (block: Block, i: number) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="text-3xl md:text-4xl tracking-tight mt-14 mb-5">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-xl md:text-2xl tracking-tight mt-10 mb-4">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-foreground/75 text-base md:text-lg leading-relaxed mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="list-disc pl-6 mb-6 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="text-foreground/75 text-base md:text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={i} className="list-decimal pl-6 mb-6 space-y-2">
          {block.items.map((item, j) => (
            <li key={j} className="text-foreground/75 text-base md:text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="border-l-2 border-foreground/30 pl-5 my-8 font-mono text-sm md:text-base text-foreground/70"
        >
          {block.text}
        </blockquote>
      );
  }
};

const InsightPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? postBySlug(slug) : undefined;

  if (!post) return <Navigate to="/404" replace />;

  const url = `https://www.alexandrialabs.uk/insights/${post.slug}`;
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Alexandria" },
    publisher: {
      "@type": "Organization",
      name: "Alexandria",
      logo: {
        "@type": "ImageObject",
        url: "https://www.alexandrialabs.uk/favicon.ico",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alexandrialabs.uk/" },
      { "@type": "ListItem", position: 2, name: "Insights", item: "https://www.alexandrialabs.uk/insights" },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Alexandria</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <InsightsNav />
      <main className="min-h-screen pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          <Link
            to="/insights"
            className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground transition-colors"
          >
            ← All insights
          </Link>

          <div className="mt-10 mb-8">
            <div className="flex items-baseline gap-4 mb-5">
              <span className="text-xs font-mono uppercase tracking-[0.15em] text-foreground/40">
                {post.category}
              </span>
              <span className="text-xs text-foreground/30">{post.readTime}</span>
              <span className="text-xs text-foreground/30">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl tracking-tight leading-[1.05]">
              {post.title}
            </h1>
          </div>

          <div className="border-t border-border pt-10">
            {post.blocks.map(renderBlock)}
          </div>
        </article>

        <div className="mt-8">
          <FAQ items={post.faqs} heading="Frequently asked" />
        </div>

        <section className="max-w-3xl mx-auto px-0 pt-16">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-6">
            Keep reading
          </p>
          <div className="border-t border-border">
            {related.map((p) => (
              <Link
                key={p.slug}
                to={`/insights/${p.slug}`}
                className="group block border-b border-border py-6"
              >
                <h3 className="text-xl tracking-tight group-hover:text-foreground/70 transition-colors">
                  {p.title}
                </h3>
                <p className="text-foreground/50 text-sm mt-1">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default InsightPost;