import React, { useState } from 'react';

export default function ProfilePage() {
  // --- Mock User State ---
  const [profile, setProfile] = useState({
    name: 'Alex Mercer',
    email: 'alex.mercer@protocol.com',
    height: 182,
    startingWeight: 95.0,
    currentWeight: 82.4,
    goalWeight: 75.0,
    notifications: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] font-sans selection:bg-cyan-500/30 pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* --- Header --- */}
        <header className="mb-12">
          <p className="text-cyan-400 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            Operator Identity
          </p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter text-white">
            User <span className="text-cyan-400 italic">Profile.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- Left Column: Identity Card --- */}
          <div className="space-y-6">
            <div className="bg-[#141414] border-t-2 border-cyan-400 p-8 rounded-sm shadow-xl relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2070" 
                    alt="Profile Avatar" 
                    className="w-24 h-24 rounded-full object-cover grayscale border-2 border-cyan-400 p-1"
                  />
                  <div className="absolute bottom-0 right-0 bg-cyan-400 w-4 h-4 rounded-full border-2 border-[#141414]"></div>
                </div>
                <h2 className="text-2xl font-black uppercase tracking-wide text-white">{profile.name}</h2>
                <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Elite Member</p>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Member Since</span>
                  <span className="text-sm font-bold text-white tracking-widest">2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Total Workouts</span>
                  <span className="text-sm font-bold text-white tracking-widest">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold tracking-[0.2em] uppercase">Current Streak</span>
                  <span className="text-sm font-bold text-cyan-400 tracking-widest">12 Days</span>
                </div>
              </div>

              <button className="w-full bg-transparent border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-sm uppercase tracking-[0.15em] text-xs transition-colors mt-8">
                Log Out
              </button>
            </div>
          </div>

          {/* --- Right Column: Settings & Forms --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Account Settings */}
            <section className="bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-sm shadow-xl">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-white/20 inline-block"></span>
                Account Credentials
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </section>

            {/* Physiological Metrics */}
            <section className="bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-sm shadow-xl">
              <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-3 mb-6">
                <span className="w-6 h-[2px] bg-white/20 inline-block"></span>
                Physiological Baseline
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Height (CM)</label>
                  <input
                    type="number"
                    name="height"
                    value={profile.height}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors text-center font-black text-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Current Weight (KG)</label>
                  <input
                    type="number"
                    name="currentWeight"
                    value={profile.currentWeight}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-cyan-400 px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors text-center font-black text-xl"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-gray-500 font-bold tracking-[0.15em] uppercase mb-2">Target Weight (KG)</label>
                  <input
                    type="number"
                    name="goalWeight"
                    value={profile.goalWeight}
                    onChange={handleInputChange}
                    className="w-full bg-[#1a1a1a] border border-white/10 text-orange-500 px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors text-center font-black text-xl"
                  />
                </div>
              </div>
            </section>

            {/* System Preferences */}
            <section className="bg-[#141414] border border-white/5 p-6 sm:p-8 rounded-sm shadow-xl flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">System Notifications</h3>
                <p className="text-xs text-gray-500 tracking-wide">Receive daily protocol reminders and progress alerts.</p>
              </div>
              
              {/* Custom Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#1a1a1a] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-500 peer-checked:after:bg-cyan-400 after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border border-white/10 peer-checked:border-cyan-400/50"></div>
              </label>
            </section>

            {/* Action Bar */}
            <div className="flex justify-end pt-4">
              <button 
                className="bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-4 px-10 rounded-sm uppercase tracking-[0.15em] text-sm transition-colors shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]"
                onClick={() => console.log('Profile saved:', profile)}
              >
                Update Parameters
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}