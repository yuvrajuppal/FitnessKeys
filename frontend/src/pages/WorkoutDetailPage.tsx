import React from 'react';

// --- Mock Data for Shoulders Category ---
const shoulderWorkouts = [
  {
    id: 'sh-1',
    title: 'Overhead Dumbbell Press',
    duration: '12:00',
    target: 'Front & Medial Delts',
    sets: '4 Sets x 8-12 Reps',
    thumbnail: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070', // Placeholder
  },
  {
    id: 'sh-2',
    title: 'Dumbbell Lateral Raises',
    duration: '10:30',
    target: 'Medial Delts',
    sets: '4 Sets x 15 Reps',
    thumbnail: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2070',
  },
  {
    id: 'sh-3',
    title: 'Front Plate Raises',
    duration: '08:45',
    target: 'Front Delts',
    sets: '3 Sets x 12 Reps',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2070',
  },
  {
    id: 'sh-4',
    title: 'Cable Face Pulls',
    duration: '09:15',
    target: 'Rear Delts & Traps',
    sets: '4 Sets x 15 Reps',
    thumbnail: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&q=80&w=2071',
  },
  {
    id: 'sh-5',
    title: 'Reverse Pec Deck Fly',
    duration: '11:00',
    target: 'Rear Delts',
    sets: '3 Sets x 12-15 Reps',
    thumbnail: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=2070',
  },
];

export default function WorkoutDetailPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Navigation & Header --- */}
        <div className="mb-12">
          <button 
            className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 group"
            onClick={() => console.log("Navigate back to dashboard")}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            <span className="text-sm font-bold tracking-widest uppercase">Back to Dashboard</span>
          </button>

          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div>
              <p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2">
                Category
              </p>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Shoulders
              </h1>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-white">{shoulderWorkouts.length}</div>
              <div className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
                Active Routines
              </div>
            </div>
          </header>
        </div>

        {/* --- Video List Grid --- */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shoulderWorkouts.map((workout) => (
              <div 
                key={workout.id} 
                className="group bg-[#141414] rounded-sm overflow-hidden border border-white/5 hover:border-cyan-400/50 transition-colors cursor-pointer flex flex-col"
              >
                {/* Video Thumbnail Area */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black">
                  <img 
                    src={workout.thumbnail} 
                    alt={workout.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 ease-out"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-cyan-400/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
                    {workout.duration}
                  </div>
                </div>

                {/* Workout Details Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-cyan-400 transition-colors">
                      {workout.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Target: <span className="text-gray-300">{workout.target}</span>
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                    <span className="text-xs font-bold tracking-[0.1em] text-cyan-400 uppercase">
                      {workout.sets}
                    </span>
                    <button className="text-gray-500 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}