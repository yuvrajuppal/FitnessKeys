import React, { useState } from 'react';

// --- Workout Data ---
const workoutCategories = [
  {
    id: 'chest',
    title: 'Chest',
    subtitle: 'Push Day Focus',
    img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=2070',
    span: 'md:col-span-2',
    height: 'h-[300px] md:h-[400px]',
  },
  {
    id: 'shoulders',
    title: 'Shoulders',
    subtitle: 'Deltoid Isolation',
    img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=2070',
    span: 'md:col-span-1',
    height: 'h-[300px] md:h-[400px]',
  },
  {
    id: 'back',
    title: 'Back',
    subtitle: 'Pull Day Focus',
    img: 'https://images.unsplash.com/photo-1603287681836-b174ce5074c2?auto=format&fit=crop&q=80&w=2071',
    span: 'md:col-span-1',
    height: 'h-[300px]',
  },
  {
    id: 'triceps',
    title: 'Triceps',
    subtitle: '12 Isolation Circuits',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070',
    span: 'md:col-span-1',
    height: 'h-[300px]',
  },
  {
    id: 'biceps',
    title: 'Biceps',
    subtitle: '15 Hypertrophy Sets',
    img: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=2070',
    span: 'md:col-span-1',
    height: 'h-[300px]',
  },
  {
    id: 'legs',
    title: 'Legs',
    subtitle: 'Lower Body Protocols',
    img: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&q=80&w=2074',
    span: 'md:col-span-2',
    height: 'h-[300px] md:h-[400px]',
  },
  {
    id: 'core',
    title: 'Core',
    subtitle: 'Stability & Strength',
    img: 'https://images.unsplash.com/photo-1574680093668-296ba12fa0b5?auto=format&fit=crop&q=80&w=2069',
    span: 'md:col-span-1',
    height: 'h-[300px] md:h-[400px]',
    accentColor: 'text-orange-500',
    titleColor: 'text-orange-500',
  },
];

export default function Workouts() {

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Header --- */}
        <header className="mb-12">
          <p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2">
            Personal Dashboard
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
            Fitness<span className="text-cyan-400 italic">Keys.</span>
          </h1>
        </header>

        {/* --- Workout Library Section --- */}
        <section>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-3">
            <span className="w-8 h-[2px] bg-white/20 inline-block"></span>
            Workout Library
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workoutCategories.map((category) => (
              <div 
                key={category.id} 
                className={`relative group overflow-hidden bg-[#141414] rounded-sm cursor-pointer ${category.span} ${category.height}`}
              >
                {/* Background Image */}
                <img 
                  src={category.img} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-60 transition-all duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 flex justify-between items-end">
                  <div>
                    <h3 className={`text-3xl sm:text-4xl font-black uppercase tracking-wide mb-1 ${category.titleColor || 'text-white'}`}>
                      {category.title}
                    </h3>
                    <p className={`text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase ${category.accentColor || 'text-cyan-400'}`}>
                      {category.subtitle}
                    </p>
                  </div>
                  
                  {/* Enter Button */}
                  <div className="bg-white/10 backdrop-blur-sm text-white p-3 rounded-sm group-hover:bg-cyan-400 group-hover:text-black transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
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