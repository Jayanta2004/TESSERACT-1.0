import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function HomeView() {
  const {
    events,
    setIsAnnouncementOpen,
    setSelectedEventForModal
  } = useApp();

  // Interactive Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: '02',
    hours: '14',
    mins: '38',
    secs: '12'
  });

  useEffect(() => {
    let totalSeconds = 2 * 86400 + 14 * 3600 + 38 * 60 + 12;
    const interval = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(interval);
        return;
      }
      totalSeconds--;
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        mins: m < 10 ? `0${m}` : `${m}`,
        secs: s < 10 ? `0${s}` : `${s}`
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const flagshipEvent = events.find(e => e.id === 'val-spring-25') || events[0];
  const upcomingEvents = events.filter(e => e.status === 'Upcoming' || e.status === 'Live').slice(0, 2);

  return (
    <div className="w-full flex flex-col space-y-16 py-8">
      {/* SECTION 1: HERO VIEWPORT */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column (Hero Content) */}
          <div className="lg:col-span-7 flex flex-col gap-6 z-10">
            {/* Announcement & Institutional Badge */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="glass-pill px-4 py-1.5 text-cyan-400 font-mono-code text-xs tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                OFFICIAL ESPORTS SOCIETY • IIT MADRAS BS
              </span>
              <button
                onClick={() => setIsAnnouncementOpen(true)}
                className="glass-pill px-3.5 py-1.5 text-rose-400 font-mono-code text-xs uppercase hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Active Broadcast</span>
                <span className="material-symbols-outlined text-[14px]">campaign</span>
              </button>
            </div>

            {/* Bold Headline */}
            <div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase text-white leading-tight">
                WHERE CODE MEETS <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  COMPETITION.
                </span>
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              The premier collegiate gaming hub for IIT Madras BS students. Sanctioned scrims, inter-house championships, and verified competitive gaming on low-latency servers.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:bg-cyan-300 hover:shadow-[0_0_24px_rgba(0,240,255,0.4)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE TOURNAMENTS</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
              <Link
                to="/games"
                className="glass-card inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-cyan-300 hover:text-white font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:border-cyan-400/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                <span>GAMES DIRECTORY</span>
              </Link>
            </div>

            {/* Verified Community Links */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono-code">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="glass-pill px-3.5 py-1.5 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors flex items-center gap-2"
              >
                <span className="text-cyan-400">👾</span>
                <span>Discord Community</span>
                <span className="text-emerald-400">• 1,840 Online</span>
              </a>
              <span className="glass-pill px-3.5 py-1.5 text-slate-400 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-emerald-400 text-[14px]">verified</span>
                <span>@study.iitm.ac.in Verified</span>
              </span>
            </div>
          </div>

          {/* Right Column: Holographic Tournament Glass Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="glass-card glass-card-hover rounded-2xl overflow-hidden p-6 flex flex-col gap-5 border border-white/10 shadow-2xl">
              {/* Header Badge & Countdown */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="text-xs font-mono-code font-bold uppercase tracking-wider text-rose-400">
                    FLAGSHIP TOURNAMENT
                  </span>
                </div>
                <span className="glass-pill px-2.5 py-1 text-[11px] font-mono-code text-cyan-400 font-bold">
                  SEASON 03
                </span>
              </div>

              {/* Countdown Bar */}
              <div className="glass-panel p-3.5 rounded-xl flex items-center justify-between">
                <span className="text-xs font-mono-code text-slate-400 uppercase">Closes In:</span>
                <div className="flex items-center gap-2 font-mono-code text-sm font-bold text-cyan-400">
                  <span className="glass-card px-2 py-1 rounded-lg text-white">{timeLeft.days}d</span>
                  <span>:</span>
                  <span className="glass-card px-2 py-1 rounded-lg text-white">{timeLeft.hours}h</span>
                  <span>:</span>
                  <span className="glass-card px-2 py-1 rounded-lg text-white">{timeLeft.mins}m</span>
                  <span>:</span>
                  <span className="glass-card px-2 py-1 rounded-lg text-cyan-400">{timeLeft.secs}s</span>
                </div>
              </div>

              {/* Tournament Image Banner */}
              <div className="relative h-44 rounded-xl overflow-hidden">
                <img
                  src={flagshipEvent?.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                  alt={flagshipEvent?.title || "Valorant Championship"}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-mono-code font-bold uppercase tracking-widest text-cyan-400">
                      5V5 TACTICAL FPS
                    </span>
                    <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                      {flagshipEvent?.title || "VALORANT IITM BS CHAMPIONSHIP"}
                    </h3>
                  </div>
                  <span className="text-base font-mono-code font-bold text-emerald-400">
                    {flagshipEvent?.prizePool || "₹12,000"}
                  </span>
                </div>
              </div>

              {/* Metadata Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono-code">
                <div className="glass-panel p-2.5 rounded-xl flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase">Format</span>
                  <span className="text-white font-bold mt-0.5">5v5 Knockout</span>
                </div>
                <div className="glass-panel p-2.5 rounded-xl flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase">Server</span>
                  <span className="text-emerald-400 font-bold mt-0.5">Mumbai (14ms)</span>
                </div>
                <div className="glass-panel p-2.5 rounded-xl flex flex-col">
                  <span className="text-slate-400 text-[10px] uppercase">Prize</span>
                  <span className="text-cyan-400 font-bold mt-0.5">{flagshipEvent?.prizePool || "₹12,000"}</span>
                </div>
              </div>

              {/* Slot Progress */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-slate-400">Squad Slots:</span>
                  <span className="text-white font-bold">
                    {flagshipEvent?.registeredTeams || 32} / {flagshipEvent?.maxTeams || 40} Filled
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full"
                    style={{ width: `${Math.round(((flagshipEvent?.registeredTeams || 32) / (flagshipEvent?.maxTeams || 40)) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setSelectedEventForModal(flagshipEvent)}
                className="w-full py-3 px-4 rounded-xl bg-cyan-400 text-slate-950 font-bold font-heading uppercase tracking-wider text-sm hover:bg-cyan-300 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REGISTER SQUAD VIA GOOGLE FORM</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: TELEMETRY KPI METRICS RIBBON */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: '1,250+', label: 'Verified Undergrads', sub: 'Across 4 student Houses', icon: 'groups', color: 'text-cyan-400' },
            { value: '24+', label: 'Tournaments & Scrims', sub: 'Across 8 gaming titles', icon: 'trophy', color: 'text-emerald-400' },
            { value: '₹75,000+', label: 'Prize Pool Awarded', sub: 'Direct UPI disbursements', icon: 'payments', color: 'text-amber-400' },
            { value: '100%', label: 'Student Democracy', sub: 'Elected executive council', icon: 'how_to_vote', color: 'text-purple-400' }
          ].map((metric, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl sm:text-4xl font-heading font-black text-white">{metric.value}</span>
                <span className={`material-symbols-outlined text-2xl ${metric.color}`}>{metric.icon}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200 tracking-wide uppercase font-heading">{metric.label}</h4>
                <p className="text-xs text-slate-400 mt-0.5">{metric.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FEATURED TOURNAMENTS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest font-bold">COMPETITIVE CIRCUIT</span>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase mt-1">FEATURED TOURNAMENTS</h2>
          </div>
          <Link
            to="/events"
            className="glass-pill px-4 py-2 text-xs font-mono-code text-cyan-400 hover:text-white transition-colors uppercase font-bold flex items-center gap-1.5"
          >
            <span>VIEW FULL CALENDAR</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={evt.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                  alt={evt.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="glass-pill px-2.5 py-1 text-[11px] font-mono-code text-emerald-400 font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    {evt.status === 'Live' ? 'LIVE NOW' : 'REGISTRATION OPEN'}
                  </span>
                  <span className="glass-pill px-2.5 py-1 text-[11px] font-mono-code text-slate-300 font-bold uppercase">
                    {evt.game}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <h3 className="font-heading font-black text-lg text-white uppercase">{evt.title}</h3>
                  <span className="text-base font-mono-code font-bold text-emerald-400">{evt.prizePool}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono-code">
                  <div className="glass-panel p-2.5 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase block">Schedule</span>
                    <span className="text-white font-semibold mt-0.5 block truncate">{evt.schedule}</span>
                  </div>
                  <div className="glass-panel p-2.5 rounded-xl">
                    <span className="text-slate-400 text-[10px] uppercase block">Format</span>
                    <span className="text-white font-semibold mt-0.5 block truncate">{evt.format}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <span className="text-xs font-mono-code text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-emerald-400 text-[16px]">verified</span>
                    IITM BS Verified Only
                  </span>
                  <button
                    onClick={() => setSelectedEventForModal(evt)}
                    className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>ENTER SQUAD</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: IN-HOUSE TIMED MCQ QUIZ ARENA */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="glass-pill px-3 py-1 text-xs font-mono-code text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px]">bolt</span>
                  ANTI-UNSTOP PROPRIETARY ARENA
                </span>
                <span className="glass-pill px-3 py-1 text-xs font-mono-code text-emerald-400 font-bold uppercase">
                  ZERO LATENCY
                </span>
              </div>

              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight">
                IN-HOUSE TIMED MCQ QUIZ ARENA
              </h2>

              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                Experience low-latency gaming and lore showdowns built right into Tesseract. Instant tie-breaker calculations, anti-cheat detection, and live leaderboard rankings for gaming lore, anime, and tech trivia.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/quizzes"
                  className="px-6 py-3.5 rounded-xl bg-cyan-400 text-slate-950 font-bold font-heading uppercase tracking-wider text-sm hover:bg-cyan-300 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] flex items-center gap-2"
                >
                  <span>ENTER QUIZ ARENA</span>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </Link>
                <Link
                  to="/leaderboard"
                  className="glass-card px-6 py-3.5 rounded-xl text-white font-bold font-heading uppercase tracking-wider text-sm hover:border-cyan-400/50 transition-all flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">leaderboard</span>
                  <span>VIEW STANDINGS</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card p-6 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono-code pb-2 border-b border-white/10">
                <span className="text-slate-400 uppercase">Quiz Engine Telemetry</span>
                <span className="text-emerald-400 font-bold">100% OPERATIONAL</span>
              </div>
              <div className="space-y-2 text-xs font-mono-code">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Response Latency</span>
                  <span className="text-cyan-400 font-bold">&lt; 18ms</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[95%]"></div>
                </div>
              </div>
              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Sub-second tie-breaking precision</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Direct IITM roll-number authentication</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                  <span>Automatic House Points accumulation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 4 SOCIETY PILLARS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-widest font-bold">CORE TENETS</span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase mt-1">THE FOUR PILLARS OF TESSERACT</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to="/events"
            className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code font-bold text-cyan-400">01</span>
                <span className="material-symbols-outlined text-2xl text-cyan-400">swords</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">COMPETITIVE ESPORTS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tier-1 inter-house tournaments across Valorant, BGMI, Rocket League, and CS2 with professional student casters.
              </p>
            </div>
            <span className="text-xs font-mono-code text-cyan-400 font-bold uppercase flex items-center gap-1">
              Tournaments →
            </span>
          </Link>

          <Link
            to="/games"
            className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code font-bold text-purple-400">02</span>
                <span className="material-symbols-outlined text-2xl text-purple-400">psychology</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">MIND GAMES &amp; CHESS</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tactical blitz chess arenas, Geoguessr showdowns, and analytical strategy championships tailored for BS problem solvers.
              </p>
            </div>
            <span className="text-xs font-mono-code text-purple-400 font-bold uppercase flex items-center gap-1">
              Mind Games →
            </span>
          </Link>

          <Link
            to="/games"
            className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code font-bold text-emerald-400">03</span>
                <span className="material-symbols-outlined text-2xl text-emerald-400">group</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">CASUAL SCRIMS &amp; SOCIAL</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Weekend party games, Minecraft realms, and major esports championship watch parties with fellow collegiate peers.
              </p>
            </div>
            <span className="text-xs font-mono-code text-emerald-400 font-bold uppercase flex items-center gap-1">
              Community Lounges →
            </span>
          </Link>

          <Link
            to="/polls"
            className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between gap-6"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-code font-bold text-amber-400">04</span>
                <span className="material-symbols-outlined text-2xl text-amber-400">how_to_vote</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-white uppercase mb-2">STUDENT DEMOCRACY</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Transparent community polls for tournament game choices, open prize disbursements, and an elected student executive council.
              </p>
            </div>
            <span className="text-xs font-mono-code text-amber-400 font-bold uppercase flex items-center gap-1">
              Open Governance →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
