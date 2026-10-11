import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

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
    <div className="w-full flex flex-col">
      {/* SECTION 1: HERO VIEWPORT & ASYMMETRIC GRID */}
      <section className="relative w-full pt-8 pb-16 px-margin overflow-hidden">
        {/* Cyber Grid & Ambient Glow Background */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-container filter blur-[100px]"></div>
          <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-secondary-container filter blur-[120px]"></div>
          <svg className="w-full h-full stroke-surface-container-highest/40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" height="100%" width="100%">
            <defs>
              <pattern height="40" id="cyber-grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="0.8"></path>
              </pattern>
            </defs>
            <rect fill="url(#cyber-grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left Column (Cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg z-10">
            {/* Monospace Tag & Announcement Trigger */}
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary-container font-label-sm text-label-sm tracking-wider uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                [ OFFICIAL SOCIETY • IIT MADRAS BS DEGREE • EST. 2022 ]
              </span>
              <button
                onClick={() => setIsAnnouncementOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-alert-crimson/15 text-alert-crimson font-label-sm text-label-sm uppercase hover:bg-alert-crimson/25 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson animate-ping"></span>
                <span>Dispatch Broadcast</span>
                <span className="material-symbols-outlined text-[14px]">notifications_active</span>
              </button>
            </div>

            {/* Brutalist Headline */}
            <div className="flex flex-col">
              <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-headline-xl tracking-tight uppercase text-text-bright leading-tight sm:leading-none">
                WHERE IITM STUDENTS<br />
                <span className="bg-gradient-to-r from-text-bright via-primary-container to-surface-tint bg-clip-text text-transparent">
                  PLAY, COMPETE &amp; CONNECT.
                </span>
              </h1>
            </div>

            {/* Editorial Subtitle */}
            <p className="font-body-lg text-base sm:text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              The premier collegiate battleground engineered exclusively for the IIT Madras BS in Data Science &amp; Electronic Systems community. Direct student governance, verified collegiate tournaments, and in-house competitive arenas.
            </p>

            {/* Primary Action Cluster */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-2 px-space-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider transition-all duration-200 hover:bg-primary hover:shadow-[0_0_24px_rgba(0,240,255,0.45)] hover:-translate-y-0.5 font-bold cursor-pointer"
              >
                <span>EXPLORE TOURNAMENTS</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </button>
              <button
                onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-2 px-space-lg py-3 rounded-lg bg-surface-container text-primary-container font-label-lg text-label-lg uppercase tracking-wider transition-all duration-200 hover:bg-surface-container-high hover:text-text-bright hover:-translate-y-0.5 border border-carbon-border cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                <span>GAMES DIRECTORY</span>
              </button>
            </div>

            {/* Community Channel Pills */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs">
              <a
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-text-bright font-label-sm text-label-sm hover:bg-surface-container-high transition-colors border border-carbon-border"
                href="https://discord.gg"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-secondary">👾</span>
                <span>Discord</span>
                <span className="text-verified-emerald font-label-sm text-label-sm">• 1,840 Online</span>
              </a>
              <a
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-text-bright font-label-sm text-label-sm hover:bg-surface-container-high transition-colors border border-carbon-border"
                href="https://chat.whatsapp.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="text-verified-emerald">💬</span>
                <span>WhatsApp Community</span>
                <span className="text-text-dim font-label-sm text-label-sm">(12 Batches)</span>
              </a>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low text-text-dim font-label-sm text-label-sm border border-carbon-border">
                <span className="material-symbols-outlined text-verified-emerald text-[14px]">security</span>
                <span>@study.iitm.ac.in Required</span>
              </span>
            </div>
          </div>

          {/* Right Column (Cols 8-12) Interactive Tournament Hologram Ticket */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-xl overflow-hidden bg-surface-container-low shadow-2xl border border-carbon-border">
              {/* Ambient Glow Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-primary-container via-surface-tint to-secondary"></div>

              {/* Top Header Strip */}
              <div className="px-space-md py-space-sm bg-surface-container flex items-center justify-between border-b border-carbon-border">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-alert-crimson animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-text-bright tracking-widest uppercase">FLAGSHIP EVENT • SEASON 3</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm uppercase font-bold border border-primary-container/20">
                  LIVE CIRCUIT
                </span>
              </div>

              {/* Countdown Sub-Ribbon */}
              <div className="px-space-md py-2 bg-surface-container-highest/60 flex items-center justify-between font-label-sm text-label-sm text-text-dim border-b border-carbon-border">
                <span className="uppercase tracking-wider">REGISTRATION ENDS IN:</span>
                <div className="font-label-md text-label-md text-primary-container tracking-widest flex items-center gap-1" id="hero-countdown">
                  <span className="text-text-bright font-bold">{timeLeft.days}</span><span className="text-primary-container">D :</span>
                  <span className="text-text-bright font-bold">{timeLeft.hours}</span><span className="text-primary-container">H :</span>
                  <span className="text-text-bright font-bold">{timeLeft.mins}</span><span className="text-primary-container">M :</span>
                  <span className="text-primary-container font-bold">{timeLeft.secs}</span><span className="text-primary-container">S</span>
                </div>
              </div>

              {/* Media Graphic Frame */}
              <div className="relative w-full h-44 overflow-hidden bg-surface-container-highest">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  src={flagshipEvent?.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                  alt={flagshipEvent?.title || "Flagship Tournament"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-alert-crimson/90 text-text-bright font-label-sm text-label-sm uppercase font-bold">
                      MAJOR TOURNAMENT
                    </span>
                    <h3 className="font-headline-md text-headline-md text-text-bright tracking-tight uppercase mt-1">
                      {flagshipEvent?.title || "VALORANT INTER-HOUSE CUP"}
                    </h3>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary-container font-bold">
                    {flagshipEvent?.prizePool || "₹15,000"}
                  </span>
                </div>
              </div>

              {/* Telemetry Badges Grid */}
              <div className="p-space-md grid grid-cols-3 gap-2 bg-surface-container-low">
                <div className="p-2 rounded bg-surface-container flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[11px] text-text-dim uppercase">FORMAT</span>
                  <span className="font-label-md text-label-md text-text-bright uppercase mt-0.5">{flagshipEvent?.format || "5v5 DOUBLE ELIM"}</span>
                </div>
                <div className="p-2 rounded bg-surface-container flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[11px] text-text-dim uppercase">SERVER REALM</span>
                  <span className="font-label-md text-label-md text-verified-emerald uppercase mt-0.5">MUMBAI AWS [14ms]</span>
                </div>
                <div className="p-2 rounded bg-surface-container flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[11px] text-text-dim uppercase">PRIZE POOL</span>
                  <span className="font-label-md text-label-md text-primary-container uppercase mt-0.5">{flagshipEvent?.prizePool || "₹15,000 INR"}</span>
                </div>
              </div>

              {/* Slot Capacity Meter */}
              <div className="px-space-md py-2 bg-surface-container-low flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-text-dim">SLOTS CAPACITY</span>
                  <span className="text-text-bright font-bold">
                    {flagshipEvent?.registeredTeams || 32} / {flagshipEvent?.maxTeams || 40} SQUADS FILLED{' '}
                    <span className="text-alert-crimson">
                      [{(flagshipEvent?.maxTeams || 40) - (flagshipEvent?.registeredTeams || 32)} REMAINING]
                    </span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-highest overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-container to-verified-emerald transition-all duration-700"
                    style={{
                      width: `${Math.round(((flagshipEvent?.registeredTeams || 32) / (flagshipEvent?.maxTeams || 40)) * 100)}%`
                    }}
                  ></div>
                </div>
              </div>

              {/* 1-Click Action Footer */}
              <div className="p-space-md bg-surface-container flex flex-col gap-2 border-t border-carbon-border">
                <button
                  onClick={() => {
                    setSelectedEventForModal(flagshipEvent);
                  }}
                  className="w-full py-3 px-space-md rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md tracking-wider uppercase font-bold text-center flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <span>REGISTER SQUAD VIA GOOGLE FORM</span>
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </button>
                <p className="text-center font-label-sm text-label-sm text-text-dim flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-verified-emerald">verified</span>
                  Captain must authenticate with registered @study.iitm.ac.in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE STATS TELEMETRY BAR (Full-Width HUD Ribbon) */}
      <section className="w-full bg-surface-container-low border-y border-carbon-border">
        <div className="max-w-7xl mx-auto px-margin py-space-md grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {/* Metric 1 */}
          <div className="flex flex-col p-space-sm rounded bg-surface-container border border-carbon-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-verified-emerald"></span>
              <span className="font-headline-lg text-headline-lg text-text-bright">1,250+</span>
            </div>
            <span className="font-label-md text-label-md text-primary-container uppercase mt-0.5">VERIFIED BS UNDERGRADS</span>
            <span className="font-body-sm text-body-sm text-text-dim mt-0.5">Active tournament roster size</span>
          </div>

          {/* Metric 2 */}
          <div className="flex flex-col p-space-sm rounded bg-surface-container border border-carbon-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              <span className="font-headline-lg text-headline-lg text-text-bright">24+</span>
            </div>
            <span className="font-label-md text-label-md text-primary-container uppercase mt-0.5">TOURNAMENTS &amp; SCRIMS</span>
            <span className="font-body-sm text-body-sm text-text-dim mt-0.5">Across 8 verified gaming titles</span>
          </div>

          {/* Metric 3 */}
          <div className="flex flex-col p-space-sm rounded bg-surface-container border border-carbon-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-admin-amber"></span>
              <span className="font-headline-lg text-headline-lg text-text-bright">₹75,000+</span>
            </div>
            <span className="font-label-md text-label-md text-primary-container uppercase mt-0.5">PRIZE POOLS AWARDED</span>
            <span className="font-body-sm text-body-sm text-text-dim mt-0.5">Direct UPI disbursements to winners</span>
          </div>

          {/* Metric 4 */}
          <div className="flex flex-col p-space-sm rounded bg-surface-container border border-carbon-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-headline-lg text-headline-lg text-text-bright">100%</span>
            </div>
            <span className="font-label-md text-label-md text-primary-container uppercase mt-0.5">STUDENT DEMOCRACY</span>
            <span className="font-body-sm text-body-sm text-text-dim mt-0.5">Elected council &amp; stewards</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: TOURNAMENT CALENDAR SPOTLIGHT */}
      <section className="w-full px-margin py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest">[ 02 // SCHEDULED CONTESTS ]</span>
              <h2 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright uppercase">ACTIVE &amp; UPCOMING COMPETITIVE CIRCUIT</h2>
            </div>
            <button
              onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
              className="inline-flex items-center gap-1 font-label-md text-label-md text-primary-container hover:text-text-bright transition-colors uppercase tracking-wider cursor-pointer"
            >
              <span>VIEW FULL CIRCUIT SCHEDULE</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          {/* 2 Side-by-Side Featured Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="relative rounded-xl overflow-hidden bg-surface-container flex flex-col shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-carbon-border"
              >
                <div className="relative h-48 w-full bg-surface-container-highest overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={evt.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                    alt={evt.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/50 to-transparent"></div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-verified-emerald/20 text-verified-emerald font-label-sm text-label-sm uppercase font-bold shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
                      {evt.status === 'Live' ? 'LIVE NOW' : 'REGISTRATION OPEN'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/80 text-text-bright font-label-sm text-label-sm uppercase">
                      {evt.game}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded bg-surface-container-lowest/90 text-primary-container font-headline-md text-headline-md font-bold">
                    {evt.prizePool}
                  </div>
                </div>

                <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                  <div className="flex flex-col gap-space-xs">
                    <h3 className="font-headline-lg text-xl sm:text-headline-lg text-text-bright uppercase">
                      {evt.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {evt.description}
                    </p>
                  </div>

                  {/* Mini Specs Data Strip */}
                  <div className="grid grid-cols-2 gap-2 p-space-sm rounded bg-surface-container-low border border-carbon-border">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] text-text-dim uppercase">FORMAT</span>
                      <span className="font-label-md text-label-md text-text-bright uppercase mt-0.5">{evt.format}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] text-text-dim uppercase">DATE &amp; TIME</span>
                      <span className="font-label-md text-label-md text-text-bright uppercase mt-0.5">{evt.date} • {evt.time}</span>
                    </div>
                  </div>

                  {/* Action Controls */}
                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-verified-emerald">
                      <span className="material-symbols-outlined text-[14px]">school</span>
                      <span>BS Verified Only</span>
                    </span>
                    <button
                      onClick={() => setSelectedEventForModal(evt)}
                      className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary transition-colors cursor-pointer"
                    >
                      ENTER SQUAD ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: NATIVE QUIZ ARENA CALLOUT (Anti-Unstop Tech Banner) */}
      <section className="w-full px-margin py-space-xl bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto rounded-2xl bg-surface-container-low p-space-lg md:p-space-xl relative overflow-hidden shadow-2xl border border-carbon-border">
          {/* Ambient Corner Accent */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-container opacity-10 filter blur-[90px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Content Block */}
            <div className="lg:col-span-8 flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider">
                  <span className="material-symbols-outlined text-[14px]">terminal</span>
                  PROPRIETARY TESSERACT TECH • ANTI-UNSTOP
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container text-text-dim font-label-sm text-label-sm uppercase border border-carbon-border">
                  ZERO THIRD-PARTY LATENCY
                </span>
              </div>

              <h2 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright uppercase tracking-tight">
                IN-HOUSE TIMED MCQ QUIZ ARENA
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Why rely on clunky third-party forms? Tesseract hosts proprietary low-latency quiz showdowns directly on-platform with instantaneous tie-breaker resolution, anti-cheat detection, and live screen leaderboards for gaming lore, anime, and tech trivia.
              </p>

              <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
                <button
                  onClick={() => { setCurrentView('quiz'); window.scrollTo(0, 0); }}
                  className="px-space-lg py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md tracking-wider uppercase font-bold hover:bg-primary transition-all flex items-center gap-2 cursor-pointer shadow-md hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                >
                  <span>ENTER ACTIVE TRIAL QUIZ</span>
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                </button>
                <button
                  onClick={() => { setCurrentView('leaderboard'); window.scrollTo(0, 0); }}
                  className="px-space-lg py-3 rounded-lg bg-surface-container text-text-bright font-label-md text-label-md tracking-wider uppercase hover:bg-surface-container-high transition-colors flex items-center gap-2 border border-carbon-border cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">leaderboard</span>
                  <span>VIEW HALL OF FAME</span>
                </button>
              </div>
            </div>

            {/* Telemetry Data Display Visual */}
            <div className="lg:col-span-4 p-space-md rounded-xl bg-surface-container flex flex-col gap-space-sm shadow-md border border-carbon-border">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-dim uppercase">TELEMETRY BENCHMARK</span>
                <span className="font-label-sm text-label-sm text-verified-emerald font-bold">100% OPERATIONAL</span>
              </div>

              {/* Mini Inline Latency Visual */}
              <div className="flex flex-col gap-2 py-space-xs">
                <div className="flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Tesseract WebSocket Sync</span>
                  <span className="text-primary-container font-bold">&lt; 18ms</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-primary-container" style={{ width: '95%' }}></div>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm mt-1">
                  <span className="text-on-surface-variant">Legacy Platform Response</span>
                  <span className="text-alert-crimson font-bold">&gt; 1,400ms</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                  <div className="h-full bg-alert-crimson" style={{ width: '25%' }}></div>
                </div>
              </div>

              {/* Feature Bullets */}
              <div className="pt-space-xs flex flex-col gap-1.5 text-text-dim font-label-sm text-label-sm">
                <div className="flex items-center gap-2 text-text-bright">
                  <span className="material-symbols-outlined text-[14px] text-verified-emerald">check_circle</span>
                  <span>Instantaneous milliseconds tie-breaking engine</span>
                </div>
                <div className="flex items-center gap-2 text-text-bright">
                  <span className="material-symbols-outlined text-[14px] text-verified-emerald">check_circle</span>
                  <span>Direct student roll-number authentication</span>
                </div>
                <div className="flex items-center gap-2 text-text-bright">
                  <span className="material-symbols-outlined text-[14px] text-verified-emerald">check_circle</span>
                  <span>Interactive real-time live audience HUD</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE 4 SOCIETY PILLARS (Modular Swiss-Style Grid) */}
      <section className="w-full px-margin py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest">[ 03 // CORE TENETS ]</span>
            <h2 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright uppercase">THE FOUR PILLARS OF TESSERACT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {/* Pillar 01 */}
            <div
              onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
              className="p-space-lg rounded-xl bg-surface-container flex flex-col justify-between gap-space-lg transition-transform duration-200 hover:-translate-y-1 border border-carbon-border cursor-pointer group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-primary-container font-bold">[ 01 ]</span>
                  <span className="material-symbols-outlined text-primary-container text-[24px]">swords</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase group-hover:text-primary-container transition-colors">
                  COMPETITIVE ESPORTS
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  High-stakes inter-house and inter-college tier-1 scrims and official tournaments across Valorant, BGMI, Rocket League, and CS2 with professional casters.
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider">Tier-1 Tournaments →</span>
            </div>

            {/* Pillar 02 */}
            <div
              onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
              className="p-space-lg rounded-xl bg-surface-container flex flex-col justify-between gap-space-lg transition-transform duration-200 hover:-translate-y-1 border border-carbon-border cursor-pointer group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-secondary font-bold">[ 02 ]</span>
                  <span className="material-symbols-outlined text-secondary text-[24px]">psychology</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase group-hover:text-secondary transition-colors">
                  MIND GAMES &amp; CHESS
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Tactical blitz chess arenas, competitive Geoguessr showdowns, mathematical card battles, and analytical strategy championships tailored for BS problem solvers.
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Cognitive Arenas →</span>
            </div>

            {/* Pillar 03 */}
            <div
              onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
              className="p-space-lg rounded-xl bg-surface-container flex flex-col justify-between gap-space-lg transition-transform duration-200 hover:-translate-y-1 border border-carbon-border cursor-pointer group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-verified-emerald font-bold">[ 03 ]</span>
                  <span className="material-symbols-outlined text-verified-emerald text-[24px]">group</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase group-hover:text-verified-emerald transition-colors">
                  CASUAL SCRIMS &amp; SOCIAL
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Weekend party games, Among Us sessions, self-hosted Minecraft realms, and live major esports championship watch parties with thousands of peers online.
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-verified-emerald uppercase tracking-wider">Community Lounges →</span>
            </div>

            {/* Pillar 04 */}
            <div
              onClick={() => { setCurrentView('polls'); window.scrollTo(0, 0); }}
              className="p-space-lg rounded-xl bg-surface-container flex flex-col justify-between gap-space-lg transition-transform duration-200 hover:-translate-y-1 border border-carbon-border cursor-pointer group"
            >
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-lg text-label-lg text-admin-amber font-bold">[ 04 ]</span>
                  <span className="material-symbols-outlined text-admin-amber text-[24px]">how_to_vote</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase group-hover:text-admin-amber transition-colors">
                  DIRECT STUDENT DEMOCRACY
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Transparent community polls for game choice selections, open financial prize distributions, and an elected student executive council answerable to the BS student body.
                </p>
              </div>
              <span className="font-label-sm text-label-sm text-admin-amber uppercase tracking-wider">Open Governance →</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRO COLLEGIATE ESPORTS FOOTER EXTENSION */}
      <section className="w-full px-margin py-space-xl bg-surface-container-low border-t border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg">
            {/* Col 1: Academic Identity Notice */}
            <div className="md:col-span-5 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-text-bright tracking-wider uppercase font-bold">
                ACADEMIC CHARTER &amp; GOVERNANCE
              </span>
              <p className="font-body-sm text-body-sm text-text-dim leading-relaxed">
                Tesseract is the official student-led gaming and esports society of the IIT Madras BS Degree program (Data Science &amp; Electronic Systems). Designed to cultivate collegiate athletic rigor, team synchronization, and computational recreation. Not officially affiliated with Riot Games, Krafton, or Valve Corporation.
              </p>
            </div>

            {/* Col 2: Fast Portals */}
            <div className="md:col-span-4 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-text-bright tracking-wider uppercase font-bold">
                INTERNAL REGISTRY &amp; POLICIES
              </span>
              <div className="grid grid-cols-2 gap-2 font-label-sm text-label-sm text-text-dim">
                <button onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Tournament Matrix</button>
                <button onClick={() => { setCurrentView('quiz'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Quiz Arena Code</button>
                <button onClick={() => { setCurrentView('team'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Council Roster</button>
                <button onClick={() => { setCurrentView('polls'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Society Ballot</button>
                <button onClick={() => { setCurrentView('about'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Code of Conduct</button>
                <button onClick={() => { setCurrentView('about'); window.scrollTo(0, 0); }} className="hover:text-primary-container transition-colors uppercase text-left">Fairplay Grievance</button>
              </div>
            </div>

            {/* Col 3: WebOps Node Status */}
            <div className="md:col-span-3 flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-text-bright tracking-wider uppercase font-bold">
                COMMUNITY &amp; DISPATCH
              </span>
              <div className="flex items-center gap-space-sm">
                <a className="p-2 rounded bg-surface-container text-text-bright hover:text-primary-container transition-colors border border-carbon-border" href="https://discord.gg" target="_blank" rel="noreferrer" title="Discord">
                  <span className="material-symbols-outlined text-[20px]">forum</span>
                </a>
                <a className="p-2 rounded bg-surface-container text-text-bright hover:text-primary-container transition-colors border border-carbon-border" href="https://youtube.com" target="_blank" rel="noreferrer" title="YouTube Live">
                  <span className="material-symbols-outlined text-[20px]">smart_display</span>
                </a>
                <a className="p-2 rounded bg-surface-container text-text-bright hover:text-primary-container transition-colors border border-carbon-border" href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram">
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                </a>
                <a className="p-2 rounded bg-surface-container text-text-bright hover:text-primary-container transition-colors border border-carbon-border" href="https://linkedin.com" target="_blank" rel="noreferrer" title="LinkedIn">
                  <span className="material-symbols-outlined text-[20px]">work</span>
                </a>
              </div>
              <span className="font-label-sm text-label-sm text-text-dim mt-2">
                Crafted by IITM BS WebOps &amp; Esports Society Sub-Council.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
