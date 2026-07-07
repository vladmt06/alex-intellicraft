import Navbar from "@/components/Navbar";
import logo1 from "@/assets/logo_white_4k_fixed.png";
import logo2 from "@/assets/hcm-big-d.png";
import logo3 from "@/assets/bank-of-america.png";

const logos = [
  { src: logo1, alt: "Immuno Cure", height: 26, offsetY: 0 },
  { src: logo2, alt: "HutchMed", height: 20, offsetY: -4 },
  { src: logo3, alt: "Bank of America", height: 34, offsetY: 0 },
];

const HeroSection = () => {
  return (
    <section className="relative w-full bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 pt-40 pb-24">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/50 mb-10">
          Platform Overview
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-tight text-foreground">
              The future of biopharma decision-making.
            </h1>
          </div>

          <div className="lg:col-span-5 lg:pb-3">
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-md">
              An autonomous workforce for deal diligence and live screening.
            </p>
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-3 text-sm font-medium text-background bg-foreground hover:bg-foreground/90 transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </div>

      {/* Video block, Harvey-style */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          <iframe
            src="https://www.youtube.com/embed/ALgyYN3beWw?autoplay=1&mute=1&loop=1&playlist=ALgyYN3beWw&controls=0&showinfo=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&playsinline=1"
            className="absolute inset-0 w-full h-full pointer-events-none"
            allow="autoplay; encrypted-media"
            frameBorder="0"
            title="Background video"
          />
        </div>
      </div>

      {/* Accredited-by bar */}
      <div className="border-y border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-center gap-8">
          <span className="text-foreground/50 text-xs font-mono uppercase tracking-[0.2em]">
            Accredited by executives from
          </span>
          {logos.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.alt}
              className="object-contain opacity-70 [filter:invert(1)]"
              style={{ height: logo.height, transform: `translateY(${logo.offsetY}px)` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
