import alexandriaLogo from "@/assets/alexandria-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <div className="bg-foreground text-background text-center py-1.5 text-xs font-medium tracking-wide">
        Coming Soon
      </div>
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="relative flex items-center h-14 px-6 max-w-6xl mx-auto">
          <Link to="/" aria-label="Alexandria home" className="absolute left-6">
            <img src={alexandriaLogo} alt="Alexandria" className="h-7" />
          </Link>
          <div className="flex items-center justify-center gap-10 w-full">
            <Link to="/platform" className="font-sans text-sm font-medium text-foreground hover:text-foreground/60 transition-colors">
              Platform
            </Link>
            <Link to="/insights" className="font-sans text-sm font-medium text-foreground hover:text-foreground/60 transition-colors">
              Insights
            </Link>
            <a href="#contact" className="font-sans text-sm font-medium text-foreground hover:text-foreground/60 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
