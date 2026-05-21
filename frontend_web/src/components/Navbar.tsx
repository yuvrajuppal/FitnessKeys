import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Dumbbell, LayoutGrid } from "lucide-react";
import applogo from '../assets/applogo.png'
const links = [
  { path: "/", label: "Home", icon: Dumbbell },
  { path: "/BodyCategories", label: "Categories", icon: LayoutGrid },
];

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0b]/80 backdrop-blur-lg border-b border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-white font-black text-lg tracking-tight"
        >
          <img src={applogo} alt="FitZone" className="w-8 h-8 object-contain" />
          FitnessKeys
        </Link>

        <div className="flex items-center gap-1">
          {links.map(({ path, label, icon: Icon }) => {
            const isActive =
              path === "/"
                ? pathname === "/"
                : pathname.startsWith(path);

            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-[#b4fe00] bg-[#b4fe00]/10"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
