import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Gamepad2,
  Calendar,
  Award,
  Vote,
  Trophy,
  Users,
  Info,
  Shield,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Lock,
  Settings,
  Radio,
  Check
} from 'lucide-react';

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

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles, requiresAuth: false },
    { id: 'games', label: 'Games Hub', icon: Gamepad2, requiresAuth: true },
    { id: 'events', label: 'Tournaments', icon: Calendar, requiresAuth: true },
    { id: 'quizzes', label: 'Quiz Arena', icon: Award, requiresAuth: true },
    { id: 'polls', label: 'Polls', icon: Vote, requiresAuth: true },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, requiresAuth: false },
    { id: 'team', label: 'Team', icon: Users, requiresAuth: false },
    { id: 'about', label: 'About', icon: Info, requiresAuth: false },
  ];

  const handleNavClick = (linkId) => {
    setCurrentView(linkId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Demo State Switcher Bar */}
      <div className="bg-[#060a14]/95 border-b border-cyan-500/15 px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-mono-code text-[11px] text-cyan-300 font-semibold tracking-wider uppercase flex items-center gap-1.5">
            <span>IIT Madras BS</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-normal">Official Collegiate Esports Platform</span>
          </span>
        </div>

        {/* Quick Role Simulator (For Testing PRD Permissions) */}
        <div className="flex items-center gap-2 my-0.5">
          <span className="text-[11px] text-slate-400 hidden md:inline font-mono-code">
            Identity Simulator:
          </span>
          <div className="inline-flex rounded-xl bg-black/60 p-0.5 border border-slate-800 shadow-inner">
            <button
              onClick={() => switchRole('guest')}
              className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all ${
                accountState === 'guest'
                  ? 'bg-slate-800 text-cyan-300 shadow font-bold border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => switchRole('unverified')}
              className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all ${
                accountState === 'unverified'
                  ? 'bg-amber-950/80 text-amber-300 shadow font-bold border border-amber-600/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unverified
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all ${
                accountState === 'student'
                  ? 'bg-emerald-950/80 text-emerald-300 shadow font-bold border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verified Student
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2.5 py-1 text-[11px] font-mono-code rounded-lg transition-all ${
                accountState === 'admin'
                  ? 'bg-purple-950/80 text-purple-300 shadow font-bold border border-purple-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Lead
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <div className="bg-[#05070ff2] backdrop-blur-2xl border-b border-white/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand */}
            <div
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 cursor-pointer group select-none"
            >
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500/40 to-purple-600/40 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 group-hover:border-cyan-400/70 transition-colors">
                  <img
                    src="/tesseract-logo.webp"
                    alt="Tesseract Logo"
                    className="h-9 w-9 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-xl sm:text-2xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                    TESSERACT
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] font-mono-code font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded-md">
                    v1.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase font-mono-code">
                  Esports Society • IITM BS
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = currentView === link.id;
                const isLockedForGuest = link.requiresAuth && accountState === 'guest';

                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 group ${
                      isActive
                        ? 'text-cyan-300 bg-cyan-950/50 border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                    <span>{link.label}</span>
                    {isLockedForGuest && (
                      <Lock className="w-3 h-3 text-slate-500 ml-0.5 opacity-60" />
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full shadow-[0_0_8px_#38bdf8]"></span>
                    )}
                  </button>
                );
              })}

              {/* Admin Portal Tab (shown for admin role) */}
              {accountState === 'admin' && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className={`relative px-3.5 py-2 ml-1 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border ${
                    currentView === 'admin'
                      ? 'bg-purple-600/30 text-purple-200 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                      : 'text-purple-300 bg-purple-950/40 border-purple-500/40 hover:bg-purple-900/50'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
                  <span>Admin Panel</span>
                </button>
              )}
            </nav>

            {/* Right Action / Auth Controls */}
            <div className="hidden sm:flex items-center gap-3">
              {accountState === 'guest' ? (
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setAuthModalTab('login');
                      setIsAuthModalOpen(true);
                    }}
                    className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalTab('signup');
                      setIsAuthModalOpen(true);
                    }}
                    className="relative group px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>Join Society</span>
                  </button>
                </div>
              ) : (
                /* User logged in (Verified Student or Admin) */
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200 shadow-lg"
                  >
                    <div className="relative">
                      <img
                        src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                        alt={user?.name}
                        className="w-8 h-8 rounded-xl object-cover ring-2 ring-cyan-500/50"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-xs font-semibold text-white flex items-center gap-1">
                        <span>{user?.name?.split(' ')[0]}</span>
                        {user?.verified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="Verified IITM Student" />
                        )}
                      </div>
                      <div className="text-[10px] text-cyan-400 font-mono-code truncate max-w-[110px]">
                        {user?.gamerTag || 'Player'}
                      </div>
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#0a0f1d] border border-cyan-500/40 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-xl">
                      <div className="px-3 py-2.5 border-b border-slate-800">
                        <div className="font-semibold text-white text-sm">{user?.name}</div>
                        <div className="text-xs text-slate-400 font-mono-code truncate">{user?.email}</div>
                        <div className="mt-2 flex items-center gap-1 text-[11px]">
                          {user?.verified ? (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-500/30">
                              <ShieldCheck className="w-3 h-3" /> Verified Student
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-amber-400 font-medium bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-500/30">
                              <Shield className="w-3 h-3" /> Unverified
                            </span>
                          )}
                          {accountState === 'admin' && (
                            <span className="text-purple-300 font-medium bg-purple-950/60 px-1.5 py-0.5 rounded-md border border-purple-500/40 font-mono-code text-[10px]">
                              Admin
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => {
                            setCurrentView('profile');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-xl transition-colors"
                        >
                          <User className="w-4 h-4 text-cyan-400" />
                          <span>My Student Profile</span>
                        </button>

                        {accountState === 'admin' && (
                          <button
                            onClick={() => {
                              setCurrentView('admin');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-purple-300 hover:text-white hover:bg-purple-950/50 rounded-xl transition-colors"
                          >
                            <Settings className="w-4 h-4 text-purple-400" />
                            <span>Admin Control Center</span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            logout();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-xl transition-colors mt-1"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Log Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070b16] border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 py-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center gap-2 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          {accountState === 'admin' && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-purple-950/60 text-purple-200 border border-purple-500/40"
            >
              <Settings className="w-4 h-4" />
              <span>Open Admin Dashboard</span>
            </button>
          )}

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            {accountState === 'guest' ? (
              <div className="w-full flex gap-2">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-semibold bg-slate-900 border border-slate-700 rounded-xl text-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-heading font-bold uppercase tracking-wider bg-cyan-400 text-black rounded-xl shadow"
                >
                  Sign Up (IITM)
                </button>
              </div>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2.5 cursor-pointer"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-9 h-9 rounded-xl object-cover border border-cyan-400"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{user?.name}</div>
                    <div className="text-[10px] text-cyan-400 font-mono-code">{user?.gamerTag}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3.5 py-1.5 text-xs text-rose-400 bg-rose-950/40 rounded-lg border border-rose-800/40"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
