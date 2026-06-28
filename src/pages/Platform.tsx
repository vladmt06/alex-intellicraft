import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ShieldCheck, Lock, Plug, Cloud } from "lucide-react";
import InsightsNav from "@/components/InsightsNav";

const capabilities = [
  {
    eyebrow: "Ingest & structure",
    title: "Transform scattered data into decision-ready intelligence",
    body: "Alexandria ingests and structures your full diligence landscape — internal data rooms, clinical trial registries, SEC filings, scientific literature, patent records, and live deal comps. Every output traces back to its source.",
  },
  {
    eyebrow: "Automate",
    title: "Build and deploy custom diligence agents",
    body: "Design repeatable workflows for the work your team does every week — asset screens, comp pulls, rNPV refreshes, KOL maps. Build once, run at deal speed, free senior bandwidth for judgment.",
  },
  {
    eyebrow: "Generate",
    title: "Generate the deliverables that drive deals",
    body: "Produce first-draft IC memos, valuation models, target landscapes, and Monte Carlo simulations in your team's existing format. Keep them live with autonomous updates as new data lands.",
  },
];

const workflows = [
  {
    tag: "Competitive intelligence",
    title: "Track competitors in real time",
    body: "Stand up trackers and automatic alerts for new trial starts, data readouts, label changes, and deal activity — so your team stops digging and starts moving.",
  },
  {
    tag: "Portfolio strategy",
    title: "Evaluate more opportunities in parallel",
    body: "Run agents across programs, targets, and indications simultaneously. Surface the highest-conviction opportunities before the rest of the market sees them.",
  },
  {
    tag: "Business development",
    title: "Accelerate early-stage diligence",
    body: "Build workflows that flag risks and opportunities across dozens of assets at once — reducing SME burden and getting your team to conviction faster.",
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
          content="Alexandria is the AI-native diligence platform for biopharma licensing and M&A — ingest, automate, and generate decision-ready deliverables over a live pharma corpus and your data room."
        />
        <link rel="canonical" href="https://www.alexandrialabs.uk/platform" />
        <meta property="og:title" content="Platform — Alexandria" />
        <meta
          property="og:description"
          content="Ingest, automate, and generate biopharma diligence — built for BD&L, banking healthcare, and life-sciences consulting teams."
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
            <div className="max-w-3xl">
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-6">
                Platform
              </p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.95] mb-8">
                A platform built for experts, by experts.
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed max-w-xl mb-10">
                Our team has supported some of the most significant biopharma deals of the past
                decade, built production AI systems at scale, and shipped software inside the
                world's largest life-sciences enterprises. Alexandria is the diligence platform
                we wished existed.
              </p>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-background bg-foreground rounded-full hover:bg-foreground/90 transition-colors"
              >
                Contact us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="mt-20 aspect-[4/3] rounded-2xl border border-border bg-card p-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-40" />
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-foreground/50">
                  <span>Scatter · Overall Survival vs PFS</span>
                  <span>n = 218</span>
                </div>
                <div className="relative flex-1 mt-6">
                  <svg viewBox="0 0 400 240" className="w-full h-full">
                    {Array.from({ length: 80 }).map((_, i) => {
                      const x = 20 + (i * 37) % 360;
                      const y = 20 + (i * 53) % 200;
                      return (
                        <circle
                          key={i}
                          cx={x}
                          cy={y}
                          r={2.5}
                          className="fill-primary/40"
                        />
                      );
                    })}
                    <circle cx={210} cy={70} r={6} className="fill-primary" />
                  </svg>
                  <div className="absolute top-12 left-1/2 bg-primary text-primary-foreground rounded-lg p-3 text-xs font-mono shadow-lg">
                    <div className="font-semibold mb-1">Erlotinib</div>
                    <div>PFS: 11 mo</div>
                    <div>OS: 32 mo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-24 px-6 border-t border-border">
          <div className="max-w-6xl mx-auto space-y-24">
            {capabilities.map((cap) => (
              <div key={cap.eyebrow} className="max-w-3xl">
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                  {cap.eyebrow}
                </p>
                <h2 className="text-3xl md:text-4xl tracking-tight mb-6 leading-tight">
                  {cap.title}
                </h2>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  {cap.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Workflows */}
        <section className="py-32 px-6 border-t border-border bg-secondary/40">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl tracking-tight mb-16 max-w-3xl">
              Tailored workflows for biopharma deal teams.
            </h2>
            <div className="max-w-3xl space-y-16">
              {workflows.map((w) => (
                <div key={w.tag}>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-primary mb-4">
                    {w.tag}
                  </p>
                  <h3 className="text-2xl tracking-tight mb-4">{w.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{w.body}</p>
                </div>
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
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
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
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-foreground bg-background rounded-full hover:bg-background/90 transition-colors"
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