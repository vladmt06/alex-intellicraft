import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ShieldCheck, Lock, Plug, Cloud } from "lucide-react";
import InsightsNav from "@/components/InsightsNav";

const products = [
  {
    name: "Corpus",
    tagline: "The live source of truth for biopharma.",
    description:
      "A continuously refreshed corpus spanning 100M+ research papers, 900K+ clinical trials, 1M+ pharma patents, FDA and EMA records, biomarkers, protein pathways, conference abstracts, and live deal comps. Every field is source-traced and refresh-dated.",
  },
  {
    name: "Workspace",
    tagline: "Ask, explore, decide.",
    description:
      "A dynamic interface that reshapes around your intent. Dig into a target, indication, or competitive set, ask follow-ups, run scenarios, and get to a decision-ready answer in minutes — with a citation on every claim.",
  },
  {
    name: "Workflow Agents",
    tagline: "Run diligence work on autopilot.",
    description:
      "Prebuilt or custom agents for the work your team runs every week — asset screens, competitor pulls, rNPV refreshes, KOL maps, indication landscapes. Build once, run on a schedule, and free senior bandwidth for judgment.",
  },
  {
    name: "Valuation Studio",
    tagline: "rNPV and Monte Carlo, live.",
    description:
      "Risk-adjusted NPV models and Monte Carlo simulations built from live trial, regulatory, and comparable-deal data. Every input traces to its source; every assumption can be swapped and rerun in seconds.",
  },
  {
    name: "Monitor",
    tagline: "Know the moment a deal moves.",
    description:
      "Custom watchers on the assets, competitors, and indications you care about. Get alerted the moment a trial readout, SEC filing, patent, label change, or deal headline drops — with context, not clutter.",
  },
  {
    name: "Deliverable Studio",
    tagline: "Ships in your team's format.",
    description:
      "Submit a past memo, model, or IC deck once. Every future output — diligence pack, valuation model, indicator summary — comes back in that exact format, ready to export and send.",
  },
];

const standards = [
  {
    icon: ShieldCheck,
    title: "Secure and compliant",
    body: "SOC 2 aligned controls across infrastructure, access, and change management.",
  },
  {
    icon: Lock,
    title: "Data privacy",
    body: "We do not train our models on your data. Confidential deal material stays confidential.",
  },
  {
    icon: Plug,
    title: "Integrates with your stack",
    body: "Connects to SharePoint, Google Drive, Box, Zotero, internal data rooms, and more.",
  },
  {
    icon: Cloud,
    title: "Deployable to your cloud",
    body: "Run Alexandria inside your own VPC. Sensitive documents never leave your network.",
  },
];

const Platform = () => {
  return (
    <>
      <Helmet>
        <title>Platform — Alexandria | AI-native biopharma diligence</title>
        <meta
          name="description"
          content="Alexandria is the AI-native diligence platform for biopharma licensing and M&A — six purpose-built products across corpus, workspace, agents, valuation, monitoring, and deliverables."
        />
        <link rel="canonical" href="https://www.alexandrialabs.uk/platform" />
        <meta property="og:title" content="Platform — Alexandria" />
        <meta
          property="og:description"
          content="Six purpose-built products for biopharma diligence — corpus, workspace, agents, valuation, monitoring, deliverables."
        />
        <meta property="og:url" content="https://www.alexandrialabs.uk/platform" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.alexandrialabs.uk/" },
              { "@type": "ListItem", position: 2, name: "Platform", item: "https://www.alexandrialabs.uk/platform" },
            ],
          })}
        </script>
      </Helmet>

      <InsightsNav />

      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-40 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-10">
              Platform Overview
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.02]">
                  Engineered for every biopharma decision.
                </h1>
              </div>
              <div className="lg:col-span-5 lg:pb-3">
                <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-md">
                  Six purpose-built products spanning corpus, workspace, agents, valuation, monitoring, and deliverables — one platform for the modern deal team.
                </p>
                <Link
                  to="/#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
                >
                  Request a demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="border-t border-border">
          <div className="max-w-6xl mx-auto px-6 pt-24 pb-4">
            <h2 className="text-3xl md:text-5xl tracking-tight max-w-3xl">
              One platform. Six concrete products.
            </h2>
            <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mt-6">
              Every module is purpose-built for biopharma licensing and M&amp;A workflows. Use them independently or as a stack.
            </p>
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-20 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-border">
              {products.map((p) => (
                <article
                  key={p.name}
                  className="p-10 md:p-12 border-b border-r border-border"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/45 mb-6">
                    {p.name}
                  </p>
                  <h3 className="text-2xl md:text-3xl tracking-tight mb-5 leading-tight">
                    {p.tagline}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/65 leading-relaxed max-w-md">
                    {p.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Standards */}
        <section className="py-32 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl tracking-tight mb-16 max-w-2xl">
              Built to pharma software standards from day one.
            </h2>
            <div className="max-w-3xl space-y-12">
              {standards.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-5">
                  <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lg tracking-tight mb-3">{title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="py-40 px-6 border-t border-border bg-foreground text-background">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl tracking-tight mb-8 text-background">
              What could your team do with 10,000 analysts?
            </h2>
            <p className="text-lg text-background/70 mb-10 max-w-2xl mx-auto">
              Get in touch and see how Alexandria scales the work of a biopharma diligence team.
            </p>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-background hover:bg-background/90 transition-colors"
            >
              Contact us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Platform;
