import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Updated to match your React Router paths
  const navLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Workouts', path: '/workouts' },
    { name: 'Tracker', path: '/tracker' },
  ];

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-[#0d0d0d] border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- Brand Logo --- */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">
                Fitness<span className="text-cyan-400 italic">Keys.</span>
              </span>
            </Link>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`${
                  isActive(link.path) ? 'text-cyan-400' : 'text-gray-400'
                } hover:text-cyan-400 text-sm font-bold tracking-[0.15em] uppercase transition-colors`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Profile/Settings Button */}
            <Link 
              to="/profile"
              className="bg-cyan-400 hover:bg-cyan-300 text-black px-5 py-2.5 rounded-sm text-xs font-bold tracking-[0.1em] uppercase transition-colors ml-4 inline-block"
            >
              Profile
            </Link>
          </div>

          {/* --- Mobile Hamburger Button --- */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-cyan-400 focus:outline-none p-2 transition-colors"
              aria-label="Toggle menu"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  // "X" Close Icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  // Hamburger Menu Icon
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-[#141414] border-b border-white/10 absolute w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`${
                  isActive(link.path) ? 'text-cyan-400 bg-white/5' : 'text-gray-300'
                } block hover:text-cyan-400 hover:bg-white/5 px-3 py-3 rounded-sm text-sm font-bold tracking-[0.15em] uppercase transition-all`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/5">
              <Link 
                to="/profile"
                onClick={() => setIsOpen(false)} // Close menu on click
                className="block w-full text-center bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400 hover:text-black border border-cyan-400/20 px-3 py-3 rounded-sm text-sm font-bold tracking-[0.1em] uppercase transition-colors"
              >
                Profile Settings
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}