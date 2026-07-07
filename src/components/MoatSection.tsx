const MoatSection = () => {
  return (
    <section className="relative bg-background border-t border-border">
      <div className="max-w-6xl mx-auto pt-32 pb-24 px-6">
        <h2 className="text-4xl md:text-6xl tracking-tight mb-16 max-w-3xl text-foreground">
          Full data coverage
        </h2>

        <div className="max-w-3xl border-t border-border pt-10">
          <h3 className="text-2xl md:text-3xl tracking-tight mb-6 text-foreground">
            Your data room, our live corpus
          </h3>
          <p className="text-lg text-foreground/65 leading-relaxed">
            Use your own data room locally and securely. Alexandria cross-references everything — your data room, trials, patents, regulatory filings, and deal comps — then runs the analysis other tools leave to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MoatSection;
