import alexandriaLogo from "@/assets/alexandria-logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 right-0 z-20">
      <nav className="border-b border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="relative flex items-center h-14 px-6 max-w-6xl mx-auto">
          <Link to="/" aria-label="Alexandria home" className="absolute left-6">
            <img src={alexandriaLogo} alt="Alexandria" className="h-7 [filter:invert(1)]" />
          </Link>
          <div className="flex items-center justify-center gap-10 w-full">
            <Link to="/platform" className="font-sans text-sm font-medium text-white hover:text-white/70 transition-colors">
              Platform
            </Link>
            <Link to="/insights" className="font-sans text-sm font-medium text-white hover:text-white/70 transition-colors">
              Insights
            </Link>
            <a href="#contact" className="font-sans text-sm font-medium text-white hover:text-white/70 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
