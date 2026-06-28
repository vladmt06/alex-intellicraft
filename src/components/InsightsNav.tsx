import { Link } from "react-router-dom";
import alexandriaLogo from "@/assets/alexandria-logo.svg";

const InsightsNav = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="bg-foreground text-background text-center py-1.5 text-xs font-medium tracking-wide">
        Coming Soon
      </div>
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="relative flex items-center h-14 px-6 max-w-6xl mx-auto">
          <Link to="/" aria-label="Alexandria home" className="absolute left-6">
            <img
              src={alexandriaLogo}
              alt="Alexandria"
              className="h-8 [filter:invert(1)]"
            />
          </Link>
          <div className="flex items-center justify-center gap-10 w-full">
            <Link
              to="/platform"
              className="font-sans text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Platform
            </Link>
            <Link
              to="/insights"
              className="font-sans text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Insights
            </Link>
            <Link
              to="/#contact"
              className="font-sans text-sm font-medium text-foreground hover:text-foreground/70 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default InsightsNav;