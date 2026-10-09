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
  Play
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
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION (PRD Section 7) */}
      <section className="relative pt-10 sm:pt-16 pb-12 overflow-hidden">
        {/* Glow & Mesh background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-tr from-cyan-600/20 via-purple-600/20 to-teal-500/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-mono-code mb-6 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>OFFICIAL ESPORTS SOCIETY • IIT MADRAS BS</span>
          </div>

          {/* Main Title & Slogan from PRD */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            WHERE IITM STUDENTS <br />
            <span className="cyber-gradient-text drop-shadow-[0_0_35px_rgba(56,189,248,0.4)]">
              PLAY, COMPETE & CONNECT.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The central digital home for esports at IIT Madras BS. Discover premier collegiate tournaments, take timed in-house quizzes, vote on society directives, and squad up with fellow students.
          </p>

          {/* Hero CTAs (PRD Section 7: Primary CTA: Explore Events | Secondary CTA: Explore Games) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2.5 active:scale-95 group"
            >
              <Calendar className="w-4 h-4 text-slate-900" />
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl font-heading text-sm font-bold uppercase tracking-wider text-white bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/40 hover:border-cyan-400 transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-lg"
            >
              <Gamepad2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Games</span>
            </button>
          </div>

          {/* Secondary Community CTAs */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400 font-mono-code">
            <a
              href="https://discord.gg"
              target="_blank"
              rel="noreferrer"
              className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Join Discord</span>
            </a>
            <span>•</span>
            <a
              href="https://chat.whatsapp.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>WhatsApp Hub</span>
            </a>
            <span>•</span>
            <button
              onClick={() => setIsAnnouncementOpen(true)}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>View Latest Notice</span>
            </button>
          </div>

          {/* Live Stats Row */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d121d]/70 border border-slate-800/80 backdrop-blur-md">
              <div className="font-heading text-2xl sm:text-3xl font-black text-cyan-400">1,250+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-mono-code">Verified Students</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d121d]/70 border border-slate-800/80 backdrop-blur-md">
              <div className="font-heading text-2xl sm:text-3xl font-black text-purple-400">24+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-mono-code">Tournaments Hosted</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d121d]/70 border border-slate-800/80 backdrop-blur-md">
              <div className="font-heading text-2xl sm:text-3xl font-black text-amber-400">₹75,000+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-mono-code">Prize Pools Given</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d121d]/70 border border-slate-800/80 backdrop-blur-md">
              <div className="font-heading text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase font-mono-code">Student Managed</div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ANNOUNCEMENT BANNER */}
      {announcement?.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-purple-950/50 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-purple-500"></div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-300">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-code font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  <span>Latest Announcement</span>
                  <span>•</span>
                  <span>Active Now</span>
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                  {announcement.title}
                </h3>
                <p className="text-sm text-slate-300 mt-1 line-clamp-2 max-w-3xl">
                  {announcement.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setIsAnnouncementOpen(true)}
                className="flex-1 md:flex-none px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow"
              >
                View Notice
              </button>
            </div>
          </div>
        </section>
      )}

      {/* UPCOMING EVENTS SPOTLIGHT (PRD Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-1 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              <span>Competitive Calendar</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Upcoming Tournaments & Events
            </h2>
          </div>
          <button
            onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group"
          >
            <span>View All ({events.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-transparent to-transparent"></div>
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase bg-cyan-500/90 text-black shadow">
                    {event.eventType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-code bg-black/60 text-slate-300 backdrop-blur-md border border-white/10">
                    {event.game}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-amber-500/90 text-black font-heading font-black text-xs shadow-lg">
                  Prize: {event.prizePool}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400 mb-2">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
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
                  <div className="text-xs text-slate-400">
                    Format: <span className="text-slate-200 font-medium">{event.format}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedEventForModal(event);
                      setCurrentView('events');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-cyan-300 hover:text-black bg-cyan-950/60 hover:bg-cyan-400 border border-cyan-500/40 transition-all flex items-center gap-1.5"
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

      {/* FEATURED GAMES (PRD Section 7 & 9) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-mono-code uppercase tracking-widest text-purple-400 mb-1 flex items-center gap-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Gaming Hub</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              Featured Titles & Scrims
            </h2>
          </div>
          <button
            onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
            className="text-xs sm:text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
          >
            <span>All Games ({games.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map((game) => (
            <div
              key={game.id}
              className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-purple-500/50 overflow-hidden transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={game.artwork}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-purple-600/90 text-white shadow">
                    {game.category}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 text-xs font-mono-code text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{game.activePlayers} active student players</span>
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
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-300 bg-purple-950/50 hover:bg-purple-600 hover:text-white border border-purple-500/30 transition-all"
                  >
                    View Game
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* IN-HOUSE QUIZ & LEADERBOARD TEASER BANNER (PRD Section 12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#0b101c] via-[#111827] to-[#1e1435] border border-cyan-500/30 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-mono-code">
                <Award className="w-3.5 h-3.5" />
                <span>PRD FEATURE • DIRECT IN-HOUSE QUIZZES</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black text-white leading-tight">
                No External Platforms. <br />
                <span className="cyber-gradient-text">Timed Quizzes Native to Tesseract.</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Tesseract now hosts live timed multiple-choice quizzes directly on the platform with instant server-side score calculation, negative marking, and real-time tie-breaker leaderboards.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => { setCurrentView('quizzes'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-black" />
                  <span>Take Active Quizzes</span>
                </button>
                <button
                  onClick={() => { setCurrentView('leaderboard'); window.scrollTo(0, 0); }}
                  className="px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>View Leaderboard</span>
                </button>
              </div>
            </div>

            {/* Teaser card */}
            <div className="p-5 rounded-2xl bg-black/50 border border-slate-700/80 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                <span>Featured Quiz</span>
                <span className="text-emerald-400">● LIVE</span>
              </div>
              <h4 className="font-heading text-base font-bold text-white">
                IITM BS Esports Trivia 2026
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code text-slate-300">
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TIME LIMIT</span>
                  <span>5 Minutes</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">MARKING</span>
                  <span>+4 / -1 Neg</span>
                </div>
              </div>
              <button
                onClick={() => { setCurrentView('quizzes'); window.scrollTo(0, 0); }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Launch Quiz Runner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SHORT ABOUT TESSERACT & 4 PILLARS (PRD Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-mono-code uppercase tracking-widest text-cyan-400 mb-2">
            The Tesseract Vision
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white">
            One Platform for Everything Esports at IITM BS
          </h2>
          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Founded by students of the IIT Madras BS Degree program, Tesseract connects thousands of learners across diverse cities through competitive spirit, teamwork, and community governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-black">
              01
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Competitive Esports</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official collegiate tournaments in Valorant, BGMI, and Rocket League with verified rosters and prize pools.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-purple-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-black">
              02
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Mind & Logic Games</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              FIDE-standard Swiss chess tournaments, speed typing battles, cipher solving, and analytical game trivia.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              03
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Community & Voice</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Friday night Scribbl parties, casual scrim lounges, shoutcasting workshops, and game developer talks.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-amber-500/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
              04
            </div>
            <h3 className="font-heading text-lg font-bold text-white">Direct Democracy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verified student polling system ensuring society initiatives and tournament choices are decided by you.
            </p>
          </div>
        </div>

        {/* Meet the Team CTA (PRD Section 7) */}
        <div className="mt-12 text-center">
          <button
            onClick={() => { setCurrentView('team'); window.scrollTo(0, 0); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-sm font-semibold text-slate-200 hover:text-white transition-all shadow"
          >
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Meet the People Behind Tesseract (Council & WebOps)</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </section>

      {/* COMMUNITY CTA BANNER (PRD Section 7) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-blue-950/40 via-indigo-950/60 to-purple-950/50 border border-indigo-500/30 text-center relative overflow-hidden">
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
