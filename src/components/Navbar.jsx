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
  Settings
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
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Sparkles, requiresAuth: false },
    { id: 'games', label: 'Games', icon: Gamepad2, requiresAuth: true },
    { id: 'events', label: 'Events', icon: Calendar, requiresAuth: true },
    { id: 'quizzes', label: 'Quizzes', icon: Award, requiresAuth: true },
    { id: 'polls', label: 'Polls', icon: Vote, requiresAuth: true },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, requiresAuth: false },
    { id: 'team', label: 'Team', icon: Users, requiresAuth: false },
    { id: 'about', label: 'About', icon: Info, requiresAuth: false },
  ];

  const handleNavClick = (linkId, requiresAuth) => {
    if (requiresAuth && accountState === 'guest') {
      // Prompt user or still let them see public preview with a banner
      setCurrentView(linkId);
    } else {
      setCurrentView(linkId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#07090ec7] backdrop-blur-xl border-b border-cyan-500/20 transition-all duration-300">
      {/* Top Demo State Switcher Bar */}
      <div className="bg-[#0b101a] border-b border-slate-800/80 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-mono-code text-[11px] text-cyan-400 font-semibold tracking-wider uppercase">
            IIT Madras BS • Official Esports Society
          </span>
        </div>

        {/* Quick Role Simulator (For Testing PRD Permissions) */}
        <div className="flex items-center gap-2 my-0.5">
          <span className="text-[11px] text-slate-400 hidden sm:inline">Role View:</span>
          <div className="inline-flex rounded-lg bg-slate-900/90 p-0.5 border border-slate-700/60 shadow-inner">
            <button
              onClick={() => switchRole('guest')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                accountState === 'guest'
                  ? 'bg-slate-700 text-cyan-300 shadow font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Guest
            </button>
            <button
              onClick={() => switchRole('unverified')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                accountState === 'unverified'
                  ? 'bg-amber-600/60 text-amber-200 shadow font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Unverified
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                accountState === 'student'
                  ? 'bg-emerald-600/70 text-emerald-200 shadow font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Verified Student
            </button>
            <button
              onClick={() => switchRole('admin')}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-all ${
                accountState === 'admin'
                  ? 'bg-purple-600/70 text-purple-200 shadow font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin / Team
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-3.5 cursor-pointer group select-none"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="/tesseract-logo.webp"
                alt="Tesseract Logo"
                className="relative h-11 w-11 object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.6)] group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading text-xl sm:text-2xl font-black tracking-widest text-white group-hover:text-cyan-400 transition-colors">
                  TESSERACT
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono-code font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase font-mono-code">
                IIT Madras BS Esports
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              const isLockedForGuest = link.requiresAuth && accountState === 'guest';

              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.requiresAuth)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 group ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'}`} />
                  <span>{link.label}</span>
                  {isLockedForGuest && (
                    <Lock className="w-3 h-3 text-slate-500 ml-0.5" />
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full"></span>
                  )}
                </button>
              );
            })}

            {/* Admin Portal Tab (shown for admin role) */}
            {accountState === 'admin' && (
              <button
                onClick={() => setCurrentView('admin')}
                className={`relative px-3 py-1.5 ml-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 border ${
                  currentView === 'admin'
                    ? 'bg-purple-600/30 text-purple-200 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                    : 'text-purple-300 bg-purple-950/40 border-purple-500/40 hover:bg-purple-900/40'
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setIsAuthModalOpen(true);
                  }}
                  className="relative group px-5 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden shadow-lg shadow-cyan-950/50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 transition-all duration-300 group-hover:opacity-90"></div>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="relative flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-cyan-200" />
                    <span>Sign Up</span>
                  </span>
                </button>
              </div>
            ) : (
              /* User logged in (Verified Student or Admin) */
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-cyan-500/50 transition-all duration-200"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-500/40"
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-semibold text-white flex items-center gap-1">
                      <span>{user?.name?.split(' ')[0]}</span>
                      {user?.verified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="Verified IITM Student" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-code truncate max-w-[110px]">
                      {user?.gamerTag || 'Player'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#0d121d] border border-cyan-500/30 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <div className="font-semibold text-white text-sm">{user?.name}</div>
                      <div className="text-xs text-slate-400 font-mono-code truncate">{user?.email}</div>
                      <div className="mt-1.5 flex items-center gap-1 text-[11px]">
                        {user?.verified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                            <ShieldCheck className="w-3 h-3" /> Verified IITM BS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-medium bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
                            <Shield className="w-3 h-3" /> Unverified
                          </span>
                        )}
                        {accountState === 'admin' && (
                          <span className="text-purple-400 font-medium bg-purple-950/40 px-1.5 py-0.5 rounded border border-purple-500/30">
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
              className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0e17] border-b border-cyan-500/20 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id, link.requiresAuth)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/40'
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
              onClick={() => {
                setCurrentView('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-purple-950/60 text-purple-200 border border-purple-500/40"
            >
              <Settings className="w-4 h-4" />
              <span>Open Admin Dashboard</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            {accountState === 'guest' ? (
              <div className="w-full flex gap-2">
                <button
                  onClick={() => {
                    setAuthModalTab('login');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-center text-sm font-medium bg-slate-800 rounded-xl text-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthModalTab('signup');
                    setIsAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-center text-sm font-semibold bg-cyan-600 rounded-xl text-white shadow"
                >
                  Sign Up (IITM)
                </button>
              </div>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div
                  onClick={() => {
                    setCurrentView('profile');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">{user?.name}</div>
                    <div className="text-[10px] text-cyan-400">{user?.gamerTag}</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs text-rose-400 bg-rose-950/30 rounded-lg border border-rose-800/40"
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
