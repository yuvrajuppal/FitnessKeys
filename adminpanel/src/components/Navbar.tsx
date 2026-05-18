import { NavLink } from "react-router-dom";

const CategoriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);

const WorkoutsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h.01M10 4h.01M14 4h.01M18 4h.01"/><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h16"/><path d="M4 20h16"/></svg>
);

function Navbar() {
  return (
    <nav className="sticky top-0 z-40 bg-[#0d0d0b]/80 backdrop-blur-lg border-b border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo / Brand */}
        <NavLink
          to="/"
          className="flex items-center gap-2.5 text-white font-black text-lg tracking-tight"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#b4fe00] text-[#0d0d0b] font-bold text-sm">
            F
          </span>
          <span className="hidden sm:inline">Fitness Admin</span>
        </NavLink>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#b4fe00]/10 text-[#b4fe00]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <CategoriesIcon />
            <span className="hidden sm:inline">Categories</span>
          </NavLink>

          <NavLink
            to="/workouts"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#b4fe00]/10 text-[#b4fe00]"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`
            }
          >
            <WorkoutsIcon />
            <span className="hidden sm:inline">Workouts</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
