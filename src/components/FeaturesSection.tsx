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
    <section
      className="relative py-32 px-6"
      style={{ background: "hsl(0 0% 5%)" }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "hsl(0 0% 12%)" }}>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="p-10 transition-colors duration-300"
              style={{ background: "hsl(0 0% 5%)" }}
              whileHover={{ backgroundColor: "hsl(0 0% 7%)" }}
            >
              <p
                className="text-[10px] tracking-widest uppercase mb-6"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "hsl(0 0% 40%)" }}
              >
                {f.label}
              </p>
              <h3
                className="text-2xl md:text-3xl tracking-tight mb-4"
                style={{ color: "hsl(0 0% 93%)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-[1.7]" style={{ color: "hsl(0 0% 50%)" }}>
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