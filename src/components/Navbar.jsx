import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    currentView,
    setCurrentView,
    accountState,
    switchRole,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (viewId) => {
    setCurrentView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col font-body">
      {/* 1. TOP BROADCAST TELEMETRY BAR (Stitch Design System) */}
      <div className="h-[36px] w-full bg-[#0c0e14]/95 backdrop-blur-md border-b border-[#1E2638] px-4 sm:px-6 flex items-center justify-between font-mono-code text-[11px] select-none">
        {/* Left Telemetry Status */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse-ring"></div>
          <span className="text-[#00E676] tracking-wider font-bold uppercase text-[10px]">
            SYSTEM ACTIVE
          </span>
          <span className="text-[#3b494b]">•</span>
          <span className="text-[#8A99AD] hidden xl:inline text-[11px]">
            IIT MADRAS BS ESPORTS INFRASTRUCTURE
          </span>
          <span className="text-[#3b494b] hidden xl:inline">•</span>
          <span className="text-[#00f0ff] font-bold text-[10px]">SEASON 03</span>
        </div>

        {/* Center Marquee Ticker */}
        <div className="hidden md:flex flex-1 overflow-hidden mx-6 items-center">
          <div className="animate-ticker items-center gap-4 text-[11px]">
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] text-[10px] uppercase font-bold">
              🚨 Qualifiers
            </span>
            <span className="text-[#F4F7FB]">Valorant Inter-House Qualifiers — Registration Open</span>
            <span className="text-[#3b494b]">•</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#00f0ff]/20 border border-[#00f0ff] text-[#00f0ff] text-[10px] uppercase font-bold">
              Scrims
            </span>
            <span className="text-[#F4F7FB]">BGMI Squad Scrim Lobbies Live</span>
            <span className="text-[#3b494b]">•</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#34f885]/20 border border-[#34f885] text-[#00E676] text-[10px] uppercase font-bold">
              Quiz Arena
            </span>
            <span className="text-[#F4F7FB]">IITM Pop-Culture Trivia Live Now</span>
            <span className="text-[#3b494b]">•</span>
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#FF3366]/20 border border-[#FF3366] text-[#FF3366] text-[10px] uppercase font-bold">
              🚨 Qualifiers
            </span>
            <span className="text-[#F4F7FB]">Valorant Inter-House Qualifiers — Registration Open</span>
          </div>
        </div>

        {/* Right Identity Simulator Switcher */}
        <div className="flex items-center shrink-0">
          <div className="bg-[#191b22] border border-[#1E2638] rounded-xl p-0.5 flex items-center gap-0.5">
            <button
              onClick={() => switchRole('guest')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all flex items-center gap-1 ${
                accountState === 'guest'
                  ? 'bg-[#282a31] text-[#00f0ff] font-bold shadow-sm'
                  : 'text-[#8A99AD] hover:text-[#e2e2eb]'
              }`}
            >
              Guest <span className="material-symbols-outlined text-[11px]">person</span>
            </button>
            <button
              onClick={() => switchRole('unverified')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all flex items-center gap-1 ${
                accountState === 'unverified'
                  ? 'bg-[#282a31] text-[#FFB800] font-bold shadow-sm'
                  : 'text-[#8A99AD] hover:text-[#e2e2eb]'
              }`}
            >
              Unverified <span className="material-symbols-outlined text-[11px]">hourglass_empty</span>
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all flex items-center gap-1 ${
                accountState === 'student'
                  ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/50 font-bold shadow-[0_0_8px_rgba(0,240,255,0.25)]'
                  : 'text-[#8A99AD] hover:text-[#e2e2eb]'
              }`}
            >
              Student <span className="material-symbols-outlined text-[11px]">school</span>
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2 py-0.5 rounded text-[10px] transition-all flex items-center gap-1 ${
                accountState === 'admin'
                  ? 'bg-[#6807ba]/30 text-[#d0a6ff] border border-[#6807ba] font-bold'
                  : 'text-[#FFB800] hover:bg-[#1d1f26]'
              }`}
            >
              Admin <span className="material-symbols-outlined text-[11px]">bolt</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN APPLICATION NAVIGATION (Stitch Design System) */}
      <div className="h-[68px] w-full bg-[#080a10]/85 backdrop-blur-[24px] border-b border-[#1E2638] px-4 sm:px-6 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {/* Brand Emblem & Identity */}
        <div className="flex items-center gap-4 shrink-0">
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/tesseract-logo.webp"
              alt="Tesseract Emblem"
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-wider text-[#F4F7FB] group-hover:text-[#00f0ff] transition-colors leading-none uppercase">
                TESSERACT
              </span>
              <span className="font-mono-code text-[9px] tracking-widest text-[#00f0ff] leading-none uppercase mt-1">
                IITM BS COMMUNITY
              </span>
            </div>
          </div>
        </div>

        {/* Primary Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] uppercase tracking-wider font-medium">
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 transition-all ${
              currentView === 'home'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            Home
          </button>

          <div className="relative flex items-center">
            <button
              onClick={() => handleNavClick('events')}
              className={`py-1 transition-all ${
                currentView === 'events'
                  ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                  : 'text-[#b9cacb] hover:text-[#e2e2eb]'
              }`}
            >
              Tournaments
            </button>
            <span className="ml-1.5 px-1.5 py-0.2 rounded-full border border-[#FF3366] bg-[#FF3366]/15 text-[#FF3366] font-mono-code text-[9px] font-bold animate-pulse">
              3 LIVE
            </span>
          </div>

          <button
            onClick={() => handleNavClick('games')}
            className={`py-1 transition-all ${
              currentView === 'games'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            Games Hub
          </button>

          <div className="relative flex items-center">
            <button
              onClick={() => handleNavClick('quizzes')}
              className={`py-1 transition-all ${
                currentView === 'quizzes'
                  ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                  : 'text-[#b9cacb] hover:text-[#e2e2eb]'
              }`}
            >
              Quiz Arena
            </button>
            <span className="ml-1.5 px-1.5 py-0.2 rounded border border-[#00f0ff]/40 bg-[#00f0ff]/10 text-[#00f0ff] font-mono-code text-[9px] font-bold">
              IN-HOUSE
            </span>
          </div>

          <button
            onClick={() => handleNavClick('leaderboard')}
            className={`py-1 transition-all ${
              currentView === 'leaderboard'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            Standings
          </button>

          <button
            onClick={() => handleNavClick('polls')}
            className={`py-1 transition-all ${
              currentView === 'polls'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            Society Polls
          </button>

          <button
            onClick={() => handleNavClick('team')}
            className={`py-1 transition-all ${
              currentView === 'team'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            Council
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`py-1 transition-all ${
              currentView === 'about'
                ? 'text-[#00f0ff] font-bold relative after:content-[\'\'] after:absolute after:bottom-[-22px] after:left-0 after:right-0 after:h-[2px] after:bg-[#00f0ff] after:shadow-[0_2px_10px_rgba(0,240,255,0.6)]'
                : 'text-[#b9cacb] hover:text-[#e2e2eb]'
            }`}
          >
            About
          </button>

          {accountState === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className={`py-1 px-2.5 rounded border border-[#6807ba] text-[#d0a6ff] hover:bg-[#6807ba]/20 transition-all font-mono-code text-[11px] font-bold flex items-center gap-1 ${
                currentView === 'admin' ? 'bg-[#6807ba]/30 text-white' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">bolt</span>
              ADMIN CMS
            </button>
          )}
        </nav>

        {/* Right Corner / Player Passport Badge */}
        <div className="flex items-center gap-3 shrink-0">
          {accountState === 'guest' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-lg border border-[#1E2638] text-xs font-mono-code text-[#e2e2eb] hover:bg-[#1d1f26] transition-all"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('signup');
                  setIsAuthModalOpen(true);
                }}
                className="stitch-btn-primary px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1"
              >
                <span>Join Society</span>
                <span className="text-[9px] opacity-80 font-mono-code">[IITM]</span>
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="hidden sm:flex items-center gap-2.5 bg-[#191b22] border border-[#1E2638] hover:border-[#00f0ff]/50 rounded-xl p-1.5 pl-3 transition-all"
              >
                <div className="flex flex-col text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="font-mono-code text-xs text-[#F4F7FB] uppercase font-bold tracking-tight">
                      {user?.gamerTag || 'MEMBER_IITM'}
                    </span>
                    {user?.verified && (
                      <span className="material-symbols-outlined text-[#00E676] text-[14px]">
                        verified
                      </span>
                    )}
                  </div>
                  <span className="font-mono-code text-[9px] text-[#8A99AD] truncate max-w-[140px]">
                    {user?.email}
                  </span>
                </div>

                <div className="relative">
                  <img
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-[#1E2638]"
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00E676] border border-[#191b22]"></div>
                </div>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#111319] border border-[#1E2638] rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in duration-150 backdrop-blur-xl">
                  <div className="px-3 py-2 border-b border-[#1E2638]">
                    <div className="font-semibold text-white text-sm">{user?.name}</div>
                    <div className="text-xs text-[#8A99AD] font-mono-code truncate">{user?.email}</div>
                    <div className="mt-1.5 flex items-center gap-1 text-[11px] font-mono-code">
                      <span className="text-[#00E676] font-bold">● Active Passport</span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#e2e2eb] hover:bg-[#1d1f26] rounded-xl transition-colors font-mono-code"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#00f0ff]">badge</span>
                      Student Esports Passport
                    </button>
                    {accountState === 'admin' && (
                      <button
                        onClick={() => {
                          handleNavClick('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#d0a6ff] hover:bg-[#1d1f26] rounded-xl transition-colors font-mono-code"
                      >
                        <span className="material-symbols-outlined text-[16px]">bolt</span>
                        WebOps Command Center
                      </button>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-[#FF3366] hover:bg-[#FF3366]/10 rounded-xl transition-colors font-mono-code mt-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-[#1d1f26] border border-[#1E2638] text-white"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0e14] border-b border-[#1E2638] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'home', label: 'Home' },
              { id: 'events', label: 'Tournaments' },
              { id: 'games', label: 'Games Hub' },
              { id: 'quizzes', label: 'Quiz Arena' },
              { id: 'leaderboard', label: 'Standings' },
              { id: 'polls', label: 'Polls' },
              { id: 'team', label: 'Council' },
              { id: 'about', label: 'About' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleNavClick(tab.id)}
                className={`py-2 px-3 rounded-lg text-xs font-mono-code uppercase text-left transition-colors ${
                  currentView === tab.id
                    ? 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/50 font-bold'
                    : 'text-[#e2e2eb] hover:bg-[#1d1f26]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {accountState === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2.5 rounded-lg bg-[#6807ba]/30 border border-[#6807ba] text-[#d0a6ff] text-xs font-mono-code font-bold uppercase text-center"
            >
              Open WebOps Command Center
            </button>
          )}
        </div>
      )}
    </header>
  );
}
