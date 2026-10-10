import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Gamepad2,
  Calendar,
  Award,
  Trophy,
  ArrowRight,
  ShieldCheck,
  Flame,
  Users,
  ChevronRight,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Globe,
  Clock,
  Play,
  Zap,
  Target,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';

export default function HomeView() {
  const {
    setCurrentView,
    events,
    games,
    announcement,
    setIsAnnouncementOpen,
    setSelectedEventForModal,
    setSelectedGameForModal
  } = useApp();

  const featuredGames = games.slice(0, 3);
  const upcomingEvents = events.filter(e => e.status === 'Upcoming').slice(0, 2);

  return (
    <div className="space-y-28 pb-24 overflow-hidden relative">
      {/* Background Decorative Mesh & Radial Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] cyber-grid-bg opacity-30 pointer-events-none -z-10"></div>
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-600/20 via-sky-500/10 to-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10"></div>

      {/* HERO SECTION (PRD Section 7) */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center relative z-10 max-w-5xl mx-auto space-y-6">
          {/* Top Live Status Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code shadow-[0_0_25px_rgba(6,182,212,0.25)] hover:border-cyan-400 transition-colors cursor-pointer"
               onClick={() => setIsAnnouncementOpen(true)}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold tracking-wider uppercase text-[11px]">
              TESSERACT LEAGUE SEASON 3 • REGISTRATIONS OPEN
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {/* Slogan Headline (PRD Section 7) */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] drop-shadow-2xl">
            WHERE IITM STUDENTS <br />
            <span className="cyan-gradient-text drop-shadow-[0_0_40px_rgba(0,240,255,0.45)]">
              PLAY, COMPETE & CONNECT.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            The unified collegiate esports platform of <strong className="text-white font-semibold">IIT Madras BS</strong>. Compete in verified inter-house tournaments, solve timed in-house quizzes, and vote directly on society governance.
          </p>

          {/* Primary Action Buttons (PRD Section 7: Primary CTA Explore Events | Secondary CTA Explore Games) */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-cyber-primary text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 group shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>Explore Tournaments</span>
              <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl btn-cyber-secondary text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span>Games Catalog</span>
            </button>
          </div>

          {/* Quick Social & In-house Features Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono-code">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>IITM Domain Verification</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>In-House Quiz Engine</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/60 border border-slate-800">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Real-Time Leaderboard</span>
            </span>
          </div>

          {/* Live Platform KPI Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-5 rounded-2xl glass-card text-left space-y-1">
              <div className="flex items-center justify-between text-cyan-400 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-mono-code uppercase text-slate-500">BS STUDENTS</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-white">1,250+</div>
              <div className="text-xs text-slate-400">Verified members</div>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left space-y-1">
              <div className="flex items-center justify-between text-purple-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-[10px] font-mono-code uppercase text-slate-500">COMPETITIONS</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-white">24+</div>
              <div className="text-xs text-slate-400">Championships hosted</div>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left space-y-1">
              <div className="flex items-center justify-between text-amber-400 mb-1">
                <Flame className="w-4 h-4" />
                <span className="text-[10px] font-mono-code uppercase text-slate-500">PRIZE POOL</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-white">₹75,000+</div>
              <div className="text-xs text-slate-400">Distributed to students</div>
            </div>

            <div className="p-5 rounded-2xl glass-card text-left space-y-1">
              <div className="flex items-center justify-between text-emerald-400 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-mono-code uppercase text-slate-500">GOVERNANCE</span>
              </div>
              <div className="font-heading text-2xl sm:text-3xl font-black text-white">100%</div>
              <div className="text-xs text-slate-400">Student operated</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOURNAMENT HERO SPOTLIGHT (PRD Section 7 & 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Banner preview */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-60 sm:h-72 group shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80"
                alt="Valorant Championship"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-transparent to-transparent"></div>
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-rose-600 text-white shadow">
                  ● REGISTRATIONS CLOSING SOON
                </span>
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono-code">
                <span className="text-white font-bold bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  Oct 24 - 26, 2026
                </span>
                <span className="text-amber-300 font-heading font-black bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                  Pool: ₹12,000
                </span>
              </div>
            </div>

            {/* Info and CTA */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-code font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  FLAGSHIP ESPORTS CUP
                </span>
                <span className="text-xs text-slate-400 font-mono-code">5v5 Tournament • Mumbai AWS Realm</span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                Valorant IITM BS Championship 2026
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                The premier tactical FPS tournament of the academic term. Form your 5-player roster with verified IITM BS students or sign up as a solo free-agent. Streamed live with student shoutcasters.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono-code">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">FORMAT</span>
                  <span className="text-white font-semibold">Single Elimination</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">FIRST PRIZE</span>
                  <span className="text-amber-400 font-semibold">₹7,000 + Trophy</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block text-[10px]">REGISTRATION</span>
                  <span className="text-emerald-400 font-semibold">Google Form Slip</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const valEvent = events.find(e => e.id === 'ev-01');
                    if (valEvent) setSelectedEventForModal(valEvent);
                    setCurrentView('events');
                  }}
                  className="px-6 py-3 rounded-xl btn-cyber-primary text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <span>Register Squad (Official Slip)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
                  className="px-5 py-3 rounded-xl btn-cyber-secondary text-xs uppercase tracking-wider text-center"
                >
                  View All Tournaments ({events.length})
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING COMPETITIVE CALENDAR (PRD Section 7 & 10) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>TOURNAMENT CALENDAR</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Upcoming IITM BS Tournaments
            </h2>
          </div>
          <button
            onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group font-mono-code"
          >
            <span>View All ({events.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group rounded-3xl glass-card overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent"></div>
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-cyan-400 text-black shadow">
                    {event.eventType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code bg-black/70 text-slate-200 backdrop-blur-md border border-white/10">
                    {event.game}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-amber-400 text-black font-heading font-black text-xs shadow-lg">
                  Prize: {event.prizePool}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 mb-2">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono-code">
                    Format: <span className="text-slate-200 font-semibold">{event.format}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEventForModal(event);
                      setCurrentView('events');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-cyan-300 hover:text-black bg-cyan-950/80 hover:bg-cyan-400 border border-cyan-500/40 transition-all flex items-center gap-1.5"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED GAMES DIRECTORY (PRD Section 7 & 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-purple-400 mb-1 flex items-center gap-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>GAMES HUB</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Official Titles & Community Scrims
            </h2>
          </div>
          <button
            onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
            className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group font-mono-code"
          >
            <span>All Titles ({games.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-3xl glass-card overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={game.artwork}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d18] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-purple-600/90 text-white shadow">
                    {game.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 text-xs font-mono-code text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{game.activePlayers} active student scrimmers</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-heading text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono-code">{game.mode}</span>
                  <button
                    onClick={() => {
                      setSelectedGameForModal(game);
                      setCurrentView('games');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300 bg-purple-950/60 hover:bg-purple-600 hover:text-white border border-purple-500/40 transition-all"
                  >
                    View Game Rules
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IN-HOUSE QUIZ & LEADERBOARD SPOTLIGHT (PRD Section 12 & 13) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#0a0f1d] via-[#10172c] to-[#1e1338] border border-cyan-500/35 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code">
                <Award className="w-3.5 h-3.5" />
                <span>PRD MILESTONE • NATIVE IN-HOUSE QUIZ ENGINE</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-white leading-tight">
                No External Third-Party Platforms. <br />
                <span className="cyan-gradient-text">Timed Quizzes Native to Tesseract.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Tesseract directly hosts live timed multiple-choice quizzes with strict countdown timers, server-side scoring (+4/-1 negative marking), timeout auto-submit, and automated tie-breaker leaderboards.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => { setCurrentView('quizzes'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 rounded-xl btn-cyber-primary text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-black" />
                  <span>Launch Quiz Arena</span>
                </button>
                <button
                  onClick={() => { setCurrentView('leaderboard'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 rounded-xl btn-cyber-secondary text-xs uppercase tracking-wider flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>View Leaderboard</span>
                </button>
              </div>
            </div>

            {/* Live Quiz HUD Widget */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-black/60 border border-slate-700/80 backdrop-blur-md space-y-3 shadow-xl">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Featured Quiz</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE NOW
                </span>
              </div>
              <h4 className="font-heading text-base font-bold text-white">
                IITM BS Esports Trivia 2026
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TIME LIMIT</span>
                  <span className="text-white font-bold">5 Minutes</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">MARKING</span>
                  <span className="text-amber-400 font-bold">+4 / -1 Neg</span>
                </div>
              </div>
              <button
                onClick={() => { setCurrentView('quizzes'); window.scrollTo(0, 0); }}
                className="w-full py-2.5 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Take Quiz Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT ABOUT & 4 PILLARS (PRD Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs font-mono-code uppercase tracking-widest text-cyan-400">
            THE TESSERACT VISION
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
            One Platform for Everything Esports at IITM BS
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded by students of the IIT Madras BS Degree program, Tesseract connects thousands of learners across diverse cities through competitive spirit, teamwork, and community governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-heading font-black text-lg">
              01
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Competitive Esports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official collegiate tournaments in Valorant, BGMI, and Rocket League with verified rosters and prize pools.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-heading font-black text-lg">
              02
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Mind & Logic Games</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              FIDE-standard Swiss chess tournaments, speed typing battles, cipher solving, and analytical game trivia.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-heading font-black text-lg">
              03
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Community & Voice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Friday night Scribbl parties, casual scrim lounges, shoutcasting workshops, and game developer talks.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-heading font-black text-lg">
              04
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Direct Democracy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified student polling system ensuring society initiatives and tournament choices are decided by you.
            </p>
          </div>
        </div>

        {/* Meet Team CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { setCurrentView('team'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl glass-card text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Meet the Leadership & WebOps Team Behind Tesseract</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </section>

      {/* COMMUNITY CTA BANNER (PRD Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/60 to-purple-950/50 border border-indigo-500/30 text-center relative overflow-hidden shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white">
              Ready to Squad Up?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Join the official Tesseract Discord and WhatsApp community to find teammates for tournaments, chat in voice lounges, and get match notifications.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Official Discord</span>
              </a>
              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span>Join WhatsApp Community</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
