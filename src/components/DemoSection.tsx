import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import DemoOutput from "@/components/DemoOutput";

const DemoSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      id="solutions"
      ref={ref}
      className="relative py-32 px-6 bg-background border-t border-border"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-16 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-mono text-[10px] tracking-widest uppercase mb-4 text-foreground/50">
            Live Example
          </p>
          <h2 className="text-4xl md:text-5xl tracking-tight text-foreground">
            Insights that move the needle.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="overflow-hidden border border-border bg-card"
        >
          <DemoOutput darkMode />
        </motion.div>
      </div>
    </section>
  );
};

export default DemoSection;
