import React, { useState } from 'react';

export default function Tracker() {
  // --- State & Goals ---
  const [metrics, setMetrics] = useState({
    steps: 0,
    carbs: 0,
    protein: 0,
  });

  // Example daily goals for visual progress bars
  const goals = {
    steps: 10000,
    carbs: 250,
    protein: 180,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMetrics((prev) => ({
      ...prev,
      [name]: Number(value) || 0,
    }));
  };

  const calculateProgress = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Header --- */}
        <header className="mb-12 flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2">
              Performance Logging
            </p>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
              Daily <span className="text-cyan-400 italic">Tracker.</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mb-1">Current Date</p>
            <p className="text-xl font-bold text-white tracking-widest">{new Date().toLocaleDateString()}</p>
          </div>
        </header>

        {/* --- Main Input Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Steps Tracker */}
          <div className="bg-[#141414] border-t-4 border-cyan-400 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-6 flex justify-between">
              <span>Footsteps</span>
              <span>Goal: {goals.steps}</span>
            </div>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-black text-white">{metrics.steps}</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[#222] mb-6 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-500" 
                style={{ width: `${calculateProgress(metrics.steps, goals.steps)}%` }}
              ></div>
            </div>

            <input
              type="number"
              name="steps"
              value={metrics.steps || ''}
              onChange={handleInputChange}
              placeholder="Update steps..."
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {/* Carbs Tracker */}
          <div className="bg-[#141414] border-t-4 border-orange-500 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-6 flex justify-between">
              <span>Carbohydrates</span>
              <span>Goal: {goals.carbs}g</span>
            </div>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-black text-white">{metrics.carbs}</span>
              <span className="text-sm text-gray-500 font-bold mb-2">g</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[#222] mb-6 rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500 transition-all duration-500" 
                style={{ width: `${calculateProgress(metrics.carbs, goals.carbs)}%` }}
              ></div>
            </div>

            <input
              type="number"
              name="carbs"
              value={metrics.carbs || ''}
              onChange={handleInputChange}
              placeholder="Update carbs (g)..."
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Protein Tracker */}
          <div className="bg-[#141414] border-t-4 border-cyan-400 p-8 rounded-sm shadow-2xl relative overflow-hidden">
            <div className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase mb-6 flex justify-between">
              <span>Protein Intake</span>
              <span>Goal: {goals.protein}g</span>
            </div>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-6xl font-black text-white">{metrics.protein}</span>
              <span className="text-sm text-gray-500 font-bold mb-2">g</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-[#222] mb-6 rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan-400 transition-all duration-500" 
                style={{ width: `${calculateProgress(metrics.protein, goals.protein)}%` }}
              ></div>
            </div>

            <input
              type="number"
              name="protein"
              value={metrics.protein || ''}
              onChange={handleInputChange}
              placeholder="Update protein (g)..."
              className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

        </div>

        {/* Save/Action Button */}
        <div className="flex justify-end">
           <button 
             className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 px-10 rounded-sm uppercase tracking-[0.15em] text-sm transition-colors"
             onClick={() => console.log('Data saved:', metrics)}
           >
             Save Daily Logs
           </button>
        </div>

      </main>
    </div>
  );
}