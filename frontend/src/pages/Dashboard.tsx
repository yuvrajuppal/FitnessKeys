import React from 'react';

export default function Dashboard() {
  // --- Mock Data for Weight Tracking ---
  const stats = {
    startWeight: 95.0,
    currentWeight: 82.4,
    goalWeight: 75.0,
    weeklyChange: -0.8,
    activeDays: 5,
    adherence: 92,
  };

  const totalLost = (stats.startWeight - stats.currentWeight).toFixed(1);
  const progressPercent = Math.min(
    ((stats.startWeight - stats.currentWeight) / (stats.startWeight - stats.goalWeight)) * 100, 
    100
  );

  // Mock data points for the SVG chart (representing weeks/months)
  const chartPoints = "0,150 100,130 200,110 300,115 400,90 500,80 600,60 700,45 800,20";

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Header --- */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              Body Composition
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Progress <span className="text-cyan-400 italic">Tracker.</span>
            </h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">Total Mass Dropped</p>
            <p className="text-3xl font-black text-cyan-400 tracking-widest">
              -{totalLost} <span className="text-sm text-gray-500">KG</span>
            </p>
          </div>
        </header>

        {/* --- Weekly Stats Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#141414] border-t-2 border-cyan-400 p-6 rounded-sm shadow-xl">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-3">Current Mass</div>
            <div className="text-3xl font-black text-white">
              {stats.currentWeight} <span className="text-[10px] text-cyan-400 tracking-widest ml-1">KG</span>
            </div>
          </div>
          <div className="bg-[#141414] border-t-2 border-orange-500 p-6 rounded-sm shadow-xl">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-3">7-Day Trend</div>
            <div className="text-3xl font-black text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
              {Math.abs(stats.weeklyChange)} <span className="text-[10px] text-orange-500 tracking-widest ml-1">KG</span>
            </div>
          </div>
          <div className="bg-[#141414] border-t-2 border-white/10 p-6 rounded-sm shadow-xl">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-3">Active Days</div>
            <div className="text-3xl font-black text-white">
              {stats.activeDays} <span className="text-[10px] text-gray-500 tracking-widest ml-1">/ 7</span>
            </div>
          </div>
          <div className="bg-[#141414] border-t-2 border-white/10 p-6 rounded-sm shadow-xl">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-3">Plan Adherence</div>
            <div className="text-3xl font-black text-white">
              {stats.adherence}<span className="text-[10px] text-gray-500 tracking-widest ml-1">%</span>
            </div>
          </div>
        </div>

        {/* --- Main Chart & Goal Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Weight Graph (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 bg-[#141414] border border-white/5 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="flex justify-between items-start mb-8">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3">
                <span className="w-8 h-[2px] bg-cyan-400 inline-block"></span>
                Deficit Timeline
              </h2>
              <select className="bg-[#1a1a1a] border border-white/10 text-xs font-bold text-gray-400 tracking-widest uppercase p-2 rounded-sm focus:outline-none focus:border-cyan-400">
                <option>Past 3 Months</option>
                <option>Past 6 Months</option>
                <option>All Time</option>
              </select>
            </div>

            {/* Custom SVG Line Chart */}
            <div className="relative w-full h-[250px] sm:h-[300px] border-b border-l border-white/10">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pb-1 opacity-20">
                <div className="w-full h-[1px] bg-gray-500"></div>
                <div className="w-full h-[1px] bg-gray-500"></div>
                <div className="w-full h-[1px] bg-gray-500"></div>
                <div className="w-full h-[1px] bg-gray-500"></div>
              </div>
              
              <svg 
                viewBox="0 0 800 200" 
                className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                preserveAspectRatio="none"
              >
                {/* Gradient Fill under the line */}
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon 
                  points={`0,200 ${chartPoints} 800,200`} 
                  fill="url(#chartGradient)"
                />
                {/* The Line */}
                <polyline 
                  points={chartPoints}
                  fill="none" 
                  stroke="#22d3ee" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                />
              </svg>
            </div>
            
            {/* X-Axis Labels */}
            <div className="flex justify-between text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-4">
              <span>Week 1</span>
              <span>Week 4</span>
              <span>Week 8</span>
              <span>Current</span>
            </div>
          </div>

          {/* --- Goal Target Card --- */}
          <div className="bg-[#141414] border border-white/5 rounded-sm p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>

            <div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3 mb-8">
                Target Protocol
              </h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-2">
                    <span>Starting</span>
                    <span>{stats.startWeight} kg</span>
                  </div>
                  <div className="w-full h-[2px] bg-gray-800"></div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-cyan-400 font-bold tracking-[0.2em] uppercase mb-2">
                    <span>Current</span>
                    <span>{stats.currentWeight} kg</span>
                  </div>
                  <div className="w-full h-[2px] bg-cyan-400/30">
                    <div className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-orange-500 font-bold tracking-[0.2em] uppercase mb-2">
                    <span>Goal</span>
                    <span>{stats.goalWeight} kg</span>
                  </div>
                  <div className="w-full h-[2px] bg-orange-500/30"></div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-4 text-center">
                Overall Journey
              </div>
              <div className="flex items-center justify-center relative">
                {/* Circular Progress Indicator Mockup */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="#222" strokeWidth="8" fill="none" />
                  <circle 
                    cx="64" cy="64" r="60" 
                    stroke="#22d3ee" 
                    strokeWidth="8" 
                    fill="none" 
                    strokeDasharray="377" 
                    strokeDashoffset={377 - (377 * progressPercent) / 100} 
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-white">{Math.round(progressPercent)}%</span>
                  <span className="text-[8px] text-cyan-400 tracking-[0.2em] uppercase">Complete</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1a1a1a] border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-4 rounded-sm uppercase tracking-[0.15em] text-xs transition-colors mt-8">
              Log New Weigh-In
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}