import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const {
    accountState,
    switchRole,
    user,
    logout,
    setIsAuthModalOpen,
    setAuthModalTab
  } = useApp();

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const roleMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setRoleDropdownOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { to: '/events', label: 'Tournaments' },
    { to: '/games', label: 'Games Hub' },
    { to: '/quizzes', label: 'Quiz Arena' },
    { to: '/leaderboard', label: 'Standings' },
    { to: '/polls', label: 'Polls' },
    { to: '/team', label: 'Council' },
    { to: '/about', label: 'About' },
  ];

  const roleConfigs = {
    guest: { label: 'Guest', icon: 'person', color: 'text-slate-400', badge: 'bg-slate-800 text-slate-300' },
    student: { label: 'Student', icon: 'school', color: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' },
    admin: { label: 'Admin', icon: 'bolt', color: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300 border-purple-400/30' }
  };

  const currentRole = roleConfigs[accountState] || roleConfigs.student;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[68px] bg-[#07090e]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* 1. Left: Brand Logo & Title */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/tesseract-logo.webp"
              alt="Tesseract"
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase">
                TESSERACT
              </span>
              <span className="text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                IITM BS
              </span>
            </div>
            <span className="font-mono-code text-[9px] tracking-widest text-slate-400 uppercase -mt-0.5">
              ESPORTS SOCIETY
            </span>
          </div>
        </Link>

        {/* 2. Center: Clean, Focused Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium tracking-wide transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-400/10 font-bold border border-cyan-400/25 shadow-[0_0_12px_rgba(0,240,255,0.15)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {accountState === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `px-2.5 py-1.5 rounded-xl text-xs font-mono-code font-bold tracking-wide transition-all flex items-center gap-1 border ${
                  isActive
                    ? 'bg-purple-600/30 text-purple-200 border-purple-400'
                    : 'text-purple-300 border-purple-500/30 bg-purple-950/20 hover:bg-purple-900/30'
                }`
              }
            >
              <span className="material-symbols-outlined text-[14px]">bolt</span>
              ADMIN
            </NavLink>
          )}
        </nav>

        {/* 3. Right: Sleek Role Switcher & User Avatar */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Compact Role Switcher Dropdown */}
          <div className="relative" ref={roleMenuRef}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="glass-pill px-2.5 py-1.5 text-xs font-mono-code flex items-center gap-1.5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all cursor-pointer"
              title="Switch role mode for PRD testing"
            >
              <span className={`material-symbols-outlined text-[15px] ${currentRole.color}`}>
                {currentRole.icon}
              </span>
              <span className="font-semibold">{currentRole.label}</span>
              <span className="material-symbols-outlined text-[14px] text-slate-400">expand_more</span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 glass-panel p-1.5 rounded-2xl shadow-2xl z-50 border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-mono-code text-slate-400 uppercase tracking-wider">
                  Test Identity Role:
                </div>
                {[
                  { role: 'student', label: 'Verified Student', icon: 'school', color: 'text-cyan-400' },
                  { role: 'guest', label: 'Guest (Public)', icon: 'person', color: 'text-slate-400' },
                  { role: 'admin', label: 'WebOps Admin', icon: 'bolt', color: 'text-purple-400' },
                ].map((item) => (
                  <button
                    key={item.role}
                    onClick={() => {
                      switchRole(item.role);
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-mono-code transition-colors cursor-pointer ${
                      accountState === item.role
                        ? 'bg-cyan-400/15 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <span className={`material-symbols-outlined text-[16px] ${item.color}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Account / Login State */}
          {accountState === 'guest' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setAuthModalTab('login');
                  setIsAuthModalOpen(true);
                }}
                className="hidden sm:inline-block px-3 py-1.5 rounded-xl text-xs font-mono-code text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setAuthModalTab('signup');
                  setIsAuthModalOpen(true);
                }}
                className="px-3.5 py-1.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                Join
              </button>
            </div>
          ) : (
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 glass-pill p-1 pl-2.5 hover:border-cyan-500/40 transition-all cursor-pointer"
              >
                <div className="hidden sm:flex flex-col text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="font-mono-code text-xs text-white uppercase font-bold tracking-tight">
                      {user?.gamerTag || 'STUDENT_IITM'}
                    </span>
                    <span className="material-symbols-outlined text-emerald-400 text-[13px]">
                      verified
                    </span>
                  </div>
                  <span className="font-mono-code text-[10px] text-cyan-400 font-medium">
                    {user?.house || 'CAUVERY'} HOUSE
                  </span>
                </div>

                <div className="relative">
                  <img
                    alt={user?.name || 'User Avatar'}
                    className="w-7 h-7 rounded-full object-cover border border-cyan-400/40"
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-slate-900"></div>
                </div>
              </button>

              {/* Profile Menu Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 glass-panel p-2 rounded-2xl shadow-2xl z-50 border border-white/10 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-white/[0.08]">
                    <div className="font-semibold text-white text-sm">{user?.name}</div>
                    <div className="text-xs text-slate-400 font-mono-code truncate">{user?.email}</div>
                    <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono-code">
                      <span className="text-emerald-400 font-bold">● Active Passport</span>
                      <span className="text-cyan-400 font-bold">{user?.points || 1280} PTS</span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-white/[0.06] rounded-xl transition-colors font-mono-code cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-cyan-400">badge</span>
                      Student Esports Passport
                    </button>
                    {accountState === 'admin' && (
                      <button
                        onClick={() => {
                          navigate('/admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-purple-300 hover:bg-white/[0.06] rounded-xl transition-colors font-mono-code cursor-pointer"
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
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors font-mono-code mt-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">logout</span>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl glass-card text-white hover:bg-white/[0.08] transition-colors"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[68px] left-0 right-0 glass-panel border-b border-white/10 px-4 py-4 space-y-3 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 px-3 rounded-xl text-xs font-mono-code uppercase transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 font-bold'
                      : 'text-slate-300 hover:bg-white/[0.06]'
                  }`
                }
              >
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {accountState === 'admin' && (
            <button
              onClick={() => {
                navigate('/admin');
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-mono-code font-bold uppercase text-center"
            >
              Open WebOps Command Center
            </button>
          )}
        </div>
      )}
    </header>
  );
}
