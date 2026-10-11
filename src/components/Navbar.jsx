import React, { useState } from 'react';
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

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/events', label: 'Tournaments', badge: '3 LIVE', badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40' },
    { to: '/games', label: 'Games Hub' },
    { to: '/quizzes', label: 'Quiz Arena', badge: 'LIVE', badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' },
    { to: '/leaderboard', label: 'Standings' },
    { to: '/polls', label: 'Polls' },
    { to: '/team', label: 'Council' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-[#090b10]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all">
      {/* 1. Brand Logo & IITM Identifier */}
      <div className="flex items-center gap-3 shrink-0">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="relative flex items-center justify-center">
            <img
              src="/tesseract-logo.webp"
              alt="Tesseract Emblem"
              className="h-9 w-9 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,240,255,0.5)]"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-black tracking-wider text-white group-hover:text-cyan-400 transition-colors uppercase">
                TESSERACT
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                IIT MADRAS BS
              </span>
            </div>
            <span className="font-mono-code text-[9px] tracking-widest text-slate-400 uppercase -mt-0.5">
              ESPORTS SOCIETY
            </span>
          </div>
        </Link>
      </div>

      {/* 2. Desktop Navigation Links (Clean, Centered, Elegant) */}
      <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `relative px-3 py-1.5 rounded-lg text-[13px] font-medium tracking-wide transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'text-cyan-400 bg-cyan-500/10 font-semibold shadow-[inset_0_0_12px_rgba(0,240,255,0.15)] border border-cyan-500/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`
            }
          >
            <span>{link.label}</span>
            {link.badge && (
              <span className={`text-[9px] font-mono-code font-bold px-1.5 py-0.2 rounded border ${link.badgeColor}`}>
                {link.badge}
              </span>
            )}
          </NavLink>
        ))}

        {accountState === 'admin' && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `px-2.5 py-1.5 rounded-lg text-[12px] font-mono-code font-bold tracking-wide transition-all flex items-center gap-1 border ${
                isActive
                  ? 'bg-purple-600/30 text-purple-200 border-purple-400'
                  : 'text-purple-300 border-purple-500/40 bg-purple-950/30 hover:bg-purple-900/40'
              }`
            }
          >
            <span className="material-symbols-outlined text-[14px]">bolt</span>
            ADMIN
          </NavLink>
        )}
      </nav>

      {/* 3. Action Section: Role Selector & Profile */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Role Simulator Pill */}
        <div className="hidden md:flex items-center bg-slate-900/90 border border-slate-800 rounded-xl p-1 gap-1 text-[11px] font-mono-code">
          <button
            onClick={() => switchRole('guest')}
            title="Simulate Guest role"
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
              accountState === 'guest'
                ? 'bg-slate-800 text-cyan-400 font-bold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Guest
          </button>
          <button
            onClick={() => switchRole('student')}
            title="Simulate IITM Verified Student"
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
              accountState === 'student'
                ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/50 shadow-[0_0_8px_rgba(0,240,255,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Student
          </button>
          <button
            onClick={() => switchRole('admin')}
            title="Simulate Society Admin"
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 ${
              accountState === 'admin'
                ? 'bg-purple-500/20 text-purple-300 font-bold border border-purple-400/50 shadow-[0_0_8px_rgba(168,85,247,0.2)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Admin
          </button>
        </div>

        {/* User Account / Login State */}
        {accountState === 'guest' ? (
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAuthModalTab('login');
                setIsAuthModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs font-mono-code text-slate-300 hover:bg-slate-800 transition-all"
            >
              Log In
            </button>
            <button
              onClick={() => {
                setAuthModalTab('signup');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-1"
            >
              <span>Join Society</span>
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-xl p-1.5 pl-3 transition-all cursor-pointer"
            >
              <div className="flex flex-col text-right">
                <div className="flex items-center justify-end gap-1">
                  <span className="font-mono-code text-xs text-white uppercase font-bold tracking-tight">
                    {user?.gamerTag || 'STUDENT_IITM'}
                  </span>
                  <span className="material-symbols-outlined text-emerald-400 text-[14px]">
                    verified
                  </span>
                </div>
                <span className="font-mono-code text-[10px] text-cyan-400/90 font-medium">
                  {user?.house || 'CAUVERY'} HOUSE
                </span>
              </div>

              <div className="relative">
                <img
                  alt={user?.name || 'User Avatar'}
                  className="w-8 h-8 rounded-lg object-cover border border-cyan-500/30"
                  src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"}
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></div>
              </div>
            </button>

            {/* Profile Menu Dropdown */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-slate-900/95 border border-slate-800 rounded-xl shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in duration-150">
                <div className="px-3 py-2 border-b border-slate-800">
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
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 rounded-lg transition-colors font-mono-code"
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
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-purple-300 hover:bg-slate-800 rounded-lg transition-colors font-mono-code"
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
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors font-mono-code mt-1"
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
          className="xl:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-white"
          aria-label="Toggle navigation"
        >
          <span className="material-symbols-outlined text-[20px]">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed top-[70px] left-0 right-0 bg-slate-950/95 border-b border-slate-800 px-4 py-4 space-y-2 backdrop-blur-2xl animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 px-3 rounded-lg text-xs font-mono-code uppercase transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className={`text-[8px] px-1 py-0.2 rounded border ${link.badgeColor}`}>
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Role selector in mobile drawer */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono-code">Test Role:</span>
            <div className="flex items-center gap-1">
              {['guest', 'student', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => switchRole(role)}
                  className={`px-2 py-1 rounded text-[11px] font-mono-code capitalize ${
                    accountState === role
                      ? 'bg-cyan-400 text-black font-bold'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {accountState === 'admin' && (
            <button
              onClick={() => {
                navigate('/admin');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 py-2.5 rounded-lg bg-purple-600/30 border border-purple-500 text-purple-200 text-xs font-mono-code font-bold uppercase text-center"
            >
              Open WebOps Command Center
            </button>
          )}
        </div>
      )}
    </header>
  );
}
