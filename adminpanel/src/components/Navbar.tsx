import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { APIROUTE } from "../utils/APIROUTES";
import { setLoginState, setAdminName } from "../store/AdminSlice";

const CategoriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
);

const WorkoutsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h.01M10 4h.01M14 4h.01M18 4h.01"/><path d="M4 8h16"/><path d="M4 12h16"/><path d="M4 16h16"/><path d="M4 20h16"/></svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
);

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.get(`${APIROUTE}/admin/LogoutAdmin`, { withCredentials: true });
    } catch {}
    dispatch(setLoginState(false));
    dispatch(setAdminName(""));
    navigate("/login", { replace: true });
    setShowModal(false);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setShowModal(false);
  }, []);

  useEffect(() => {
    if (showModal) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [showModal, handleKeyDown]);

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

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer ml-2"
          >
            <LogoutIcon />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          style={{ animation: "fade-in 0.15s ease-out" }}
        >
          <div
            className="bg-[#12120f] border border-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden"
            style={{ animation: "scale-in 0.2s ease-out" }}
          >
            {/* Red top accent */}
            <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-600" />

            <div className="p-8">
              {/* Warning icon */}
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>

              <h3 className="text-lg font-bold text-white text-center mb-1.5">Confirm Logout</h3>
              <p className="text-zinc-400 text-sm text-center mb-7">
                Are you sure you want to sign out of your account?
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={loggingOut}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-700 text-zinc-300 font-medium text-sm hover:bg-zinc-800/50 disabled:opacity-40 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white font-medium text-sm hover:bg-red-600 disabled:opacity-40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  {loggingOut ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing out...
                    </>
                  ) : (
                    "Logout"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
