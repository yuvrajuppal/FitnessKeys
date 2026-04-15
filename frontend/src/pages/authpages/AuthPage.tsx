import React, { useState } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your authentication logic here later
    console.log(isLogin ? "Logging in..." : "Signing up...");
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 flex flex-col justify-center items-center p-4">
      
      {/* Background ambient glow (optional, adds depth) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* --- Auth Card --- */}
      <div className="w-full max-w-md bg-[#141414] border-t-4 border-cyan-400 p-8 sm:p-10 relative z-10 shadow-2xl">
        
        {/* Header / Branding */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">
            Fitness<span className="text-cyan-400 italic">Keys.</span>
          </h1>
          <p className="text-xs text-gray-400 font-bold tracking-[0.2em] uppercase">
            {isLogin ? 'Access Your Dashboard' : 'Initiate Your Protocol'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Only show Name field if signing up */}
          {!isLogin && (
            <div>
              <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-600"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-600"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase">
                Password
              </label>
              {isLogin && (
                <a href="#" className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold tracking-widest uppercase transition-colors">
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder-gray-600 tracking-[0.2em]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 rounded-sm uppercase tracking-[0.15em] text-sm transition-all mt-8"
          >
            {isLogin ? 'Enter System' : 'Create Account'}
          </button>
        </form>

        {/* Toggle State */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-400 tracking-wider">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-[0.1em] ml-1 transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}