import { motion } from "framer-motion";

const features = [
  {
    label: "Valuation",
    title: "rNPV Calculator",
    description:
      "Risk-adjusted net present value built from live trial, regulatory, and comparable-deal data — every assumption traceable to its source.",
  },
  {
    label: "Risk",
    title: "Monte Carlo Simulation",
    description:
      "Run thousands of probabilistic scenarios across clinical, regulatory, and commercial outcomes to stress-test any thesis.",
  },
  {
    label: "Output",
    title: "Deliverable Studio",
    description:
      "Submit a past memo, model, or IC deck once. Every future output comes back in that exact format, ready to export and ship.",
  },
  {
    label: "Interface",
    title: "Dynamic Workspace",
    description:
      "The interface reshapes around your intent. No 200-row tables, no exports — just the exact output your next prompt needs.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-32 px-6 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
              className={`p-10 md:p-12 border-border ${i % 2 === 0 ? "md:border-r" : ""} ${i < 2 ? "border-b" : ""}`}
            >
              <p className="text-[10px] tracking-widest uppercase mb-6 font-mono text-foreground/45">
                {f.label}
              </p>
              <h3 className="text-2xl md:text-3xl tracking-tight mb-4 text-foreground">
                {f.title}
              </h3>
              <p className="text-sm leading-[1.7] text-foreground/60 max-w-md">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
