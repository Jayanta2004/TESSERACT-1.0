import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function GamesView() {
  const {
    games,
    accountState,
    setIsAuthModalOpen,
    events,
    selectedGameForModal,
    setSelectedGameForModal,
    setCurrentView,
    setSelectedEventForModal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDrawerGame, setActiveDrawerGame] = useState(null);
  const [botLobbyRequested, setBotLobbyRequested] = useState(false);

  // If AppContext has selectedGameForModal, show in drawer
  const currentDrawerGame = activeDrawerGame || selectedGameForModal;

  const filteredGames = games.filter(game => {
    let matchesCategory = true;
    if (activeCategory === 'fps') matchesCategory = game.category.toLowerCase().includes('tactical') || game.category.toLowerCase().includes('fps') || game.title.toLowerCase().includes('val') || game.title.toLowerCase().includes('cs');
    else if (activeCategory === 'br') matchesCategory = game.category.toLowerCase().includes('battle royale') || game.title.toLowerCase().includes('bgmi');
    else if (activeCategory === 'mind') matchesCategory = game.category.toLowerCase().includes('mind') || game.title.toLowerCase().includes('chess');
    else if (activeCategory === 'party') matchesCategory = game.category.toLowerCase().includes('casual') || game.category.toLowerCase().includes('party') || game.title.toLowerCase().includes('among');

    let matchesPlatform = true;
    if (platformFilter === 'pc') matchesPlatform = game.platform.toLowerCase().includes('pc');
    else if (platformFilter === 'mobile') matchesPlatform = game.platform.toLowerCase().includes('mobile');
    else if (platformFilter === 'crossplay') matchesPlatform = game.platform.toLowerCase().includes('cross') || game.platform.toLowerCase().includes('web') || game.platform.toLowerCase().includes('pc & mobile');

    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPlatform && matchesSearch;
  });

  const handleRequestBotLobby = () => {
    setBotLobbyRequested(true);
    setTimeout(() => setBotLobbyRequested(false), 4000);
  };

  return (
    <div className="w-full flex flex-col pb-16 relative">
      {/* SECTION 1: RADAR COMMAND HEADER */}
      <section className="w-full pt-8 pb-6 px-margin bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]"></span>
              <span className="text-cyan-400 font-bold">
                TESSERACT SANCTIONED TITLES
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">
                18 ACTIVE ROSTERS
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-code">
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                SCRIM RADAR ONLINE
              </span>
            </div>
          </div>

          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg mt-1">
            <div className="max-w-3xl">
              <h1 className="font-headline-xl text-3xl sm:text-headline-xl tracking-tight text-text-bright uppercase">
                IITM BS GAMES DIRECTORY &amp; SCRIM RADAR
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                Sanctioned competitive esports titles, official collegiate rulebooks, active student scrim channels, and inter-house schedule matrix for IIT Madras BS students.
              </p>
            </div>

            {/* Telemetry Key Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container-low p-2 rounded-xl border border-carbon-border">
              <div className="bg-surface-container p-3 rounded-lg flex flex-col border border-carbon-border">
                <span className="font-headline-md text-headline-md text-primary-container leading-none font-bold">06</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-text-dim mt-1">Sanctioned Titles</span>
              </div>
              <div className="bg-surface-container p-3 rounded-lg flex flex-col border border-carbon-border">
                <div className="flex items-center gap-1">
                  <span className="font-headline-md text-headline-md text-verified-emerald leading-none font-bold">184</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-ping"></span>
                </div>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-text-dim mt-1">Active Scrimmers</span>
              </div>
              <div className="bg-surface-container p-3 rounded-lg flex flex-col border border-carbon-border">
                <span className="font-headline-md text-headline-md text-text-bright leading-none font-bold">0%</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-alert-crimson mt-1">Emulators Permitted</span>
              </div>
              <div className="bg-surface-container p-3 rounded-lg flex flex-col border border-carbon-border">
                <span className="font-headline-md text-headline-md text-primary leading-none font-bold">100%</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-text-dim mt-1">Anti-Cheat Audited</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Tactical Filter HUD */}
      <div className="sticky top-[104px] z-30 w-full bg-surface-glass backdrop-blur-xl shadow-lg border-y border-carbon-border">
        <div className="max-w-7xl mx-auto px-margin py-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          {/* Chips Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {[
              { id: 'all', label: `All Titles [${games.length}]` },
              { id: 'fps', label: 'Tactical FPS' },
              { id: 'br', label: 'Battle Royale' },
              { id: 'mind', label: 'Mind Games / Chess' },
              { id: 'party', label: 'Party & Casual' }
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setActiveCategory(chip.id)}
                className={`filter-chip px-3 py-1.5 rounded-lg font-label-sm text-label-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === chip.id
                    ? 'bg-primary-container text-on-primary-container shadow-[0_0_10px_rgba(0,240,255,0.4)] font-bold'
                    : 'bg-surface-container text-text-dim hover:text-text-bright hover:bg-surface-container-high border border-carbon-border'
                }`}
              >
                {chip.label}
              </button>
            ))}

            <div className="h-4 w-px bg-surface-variant mx-1 hidden sm:block"></div>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="bg-surface-container text-text-bright font-label-sm text-label-sm px-2.5 py-1.5 rounded-lg outline-none cursor-pointer border border-carbon-border"
            >
              <option value="all">Platform: All</option>
              <option value="pc">Platform: PC</option>
              <option value="mobile">Platform: Mobile</option>
              <option value="crossplay">Platform: Crossplay</option>
            </select>
          </div>

          {/* Live Search */}
          <div className="flex items-center gap-space-md shrink-0">
            <div className="relative flex-1 sm:w-64">
              <span className="material-symbols-outlined text-outline-variant absolute left-2.5 top-2 text-[18px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-lowest text-text-bright placeholder-outline pl-9 pr-4 py-1.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:bg-surface-container border border-carbon-border"
                placeholder="Search game or rules..."
                type="text"
              />
            </div>
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest font-label-sm text-[11px] text-text-dim border border-carbon-border">
              <span className="inline-block w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></span>
              <span>Matchmaking Active [Mumbai]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Games Directory Grid */}
      <main className="w-full max-w-7xl mx-auto px-margin py-space-xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="flex items-center gap-2">
            <span className="font-label-md text-label-md text-primary-container uppercase font-bold tracking-wider">// MATRIX OVERVIEW</span>
            <span className="text-outline-variant">•</span>
            <span className="font-label-sm text-label-sm text-text-dim uppercase">
              Showing {filteredGames.length} Sanctioned Titles
            </span>
          </div>
          <div className="font-label-sm text-[11px] text-text-dim hidden md:flex items-center gap-2">
            <span className="material-symbols-outlined text-verified-emerald text-[14px]">gavel</span>
            <span>All Titles Audited for IITM Inter-House Season 03</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="game-card group bg-surface-container-low rounded-xl overflow-hidden flex flex-col justify-between hover:bg-surface-container transition-all duration-300 shadow-md hover:shadow-2xl border border-carbon-border"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative h-48 w-full overflow-hidden bg-surface-container-lowest">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={game.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600"}
                    alt={game.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 font-label-sm text-[10px] text-text-bright tracking-wider uppercase font-bold border border-carbon-border">
                      {game.platform}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-sm text-[10px] tracking-wider uppercase font-bold border border-primary-container/30">
                      {game.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/90 font-label-sm text-[10px] text-verified-emerald border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
                    {game.activePlayers || '40+'} Scrimmers
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-headline-lg text-headline-lg text-text-bright tracking-wide uppercase font-bold">
                      {game.title}
                    </span>
                    <span className="font-label-sm text-[11px] text-primary-container uppercase font-mono">
                      {game.teamSize}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 flex flex-col gap-3">
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {game.description}
                  </p>

                  {/* Telemetry Matrix Box */}
                  <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col gap-1.5 font-label-sm text-[11px] border border-carbon-border">
                    <div className="flex justify-between items-center text-text-dim">
                      <span className="uppercase tracking-wider">Format:</span>
                      <span className="text-text-bright font-medium">{game.teamSize} Bracket</span>
                    </div>
                    <div className="flex justify-between items-center text-text-dim">
                      <span className="uppercase tracking-wider">Server:</span>
                      <span className="text-text-bright font-medium">Mumbai AWS (Low Ping)</span>
                    </div>
                    <div className="flex justify-between items-center text-text-dim">
                      <span className="uppercase tracking-wider">Rank Cap:</span>
                      <span className="text-primary-container font-medium">Open House (All Ranks)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="p-4 pt-0 flex items-center gap-2 mt-2">
                <button
                  onClick={() => setActiveDrawerGame(game)}
                  className="flex-1 py-2 px-3 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase font-bold text-center hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.25)] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">menu_book</span>
                  Game Specs &amp; Rules
                </button>
                <a
                  className="p-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary-container transition-all flex items-center justify-center border border-carbon-border"
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  title="Join Discord Scrims"
                >
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Interactive Scrim Scheduler Radar Matrix */}
      <section className="w-full bg-surface-container-lowest border-t border-carbon-border px-margin py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-container font-bold">
                  LIVE RADAR MATRIX
                </span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-text-bright uppercase">
                TONIGHT'S SANCTIONED SCRIM SCHEDULE
              </h2>
              <p className="font-body-sm text-body-sm text-text-dim mt-1">
                Real-time inter-house queue status, server allocations, and automated lobby generation.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleRequestBotLobby}
                className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary-container font-label-sm text-label-sm uppercase tracking-wider font-bold transition-all flex items-center gap-2 border border-carbon-border hover:border-primary-container/40 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">smart_toy</span>
                {botLobbyRequested ? 'Bot Lobby Dispatched!' : 'Request Scrim Bot Lobby'}
              </button>
              <button
                onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
                className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm uppercase tracking-wider font-bold hover:bg-primary transition-all flex items-center gap-2 shadow-[0_0_12px_rgba(0,240,255,0.3)] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                Book Inter-House Slot
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-surface-container-low rounded-xl overflow-hidden border border-carbon-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container font-label-sm text-label-sm uppercase text-text-dim border-b border-carbon-border select-none">
                  <tr>
                    <th className="py-3 px-4">Time (IST)</th>
                    <th className="py-3 px-4">Discipline</th>
                    <th className="py-3 px-4">Houses / Competitors</th>
                    <th className="py-3 px-4">Lobby Mode</th>
                    <th className="py-3 px-4">Node / Relay</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-carbon-border/50 text-text-bright font-label-md text-label-md">
                  <tr className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary-container">21:00 IST</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson"></span>
                      VALORANT 5v5
                    </td>
                    <td className="py-3.5 px-4 text-on-surface">House Archimedes <span className="text-text-dim font-normal">vs</span> House Turing</td>
                    <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-text-dim border border-carbon-border">BO3 Custom Lobby</span></td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-text-dim">AWS-MAA-14</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-alert-crimson/15 text-alert-crimson font-label-sm text-[10px] uppercase font-bold animate-pulse">
                        ● LOBBY OPEN
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary-container">21:30 IST</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
                      CHESS BLITZ
                    </td>
                    <td className="py-3.5 px-4 text-on-surface">Open Arena (Swiss 7 Rounds)</td>
                    <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-text-dim border border-carbon-border">3+2 Blitz</span></td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-text-dim">Lichess API Gateway</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-verified-emerald/15 text-verified-emerald font-label-sm text-[10px] uppercase font-bold">
                        CONFIRMED (38 SQ)
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary-container">22:15 IST</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-admin-amber"></span>
                      BGMI SQUAD
                    </td>
                    <td className="py-3.5 px-4 text-on-surface">Inter-Batch Showdown (Foundational vs Diploma)</td>
                    <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-text-dim border border-carbon-border">Custom Room (Erangel)</span></td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-text-dim">MOS-IN-02</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-[10px] uppercase font-bold">
                        PRE-FLIGHT AUDIT
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-primary-container">23:00 IST</td>
                    <td className="py-3.5 px-4 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                      CS2 5v5
                    </td>
                    <td className="py-3.5 px-4 text-on-surface">House Ramanujan <span className="text-text-dim font-normal">vs</span> House Aryabhata</td>
                    <td className="py-3.5 px-4"><span className="px-2 py-0.5 rounded bg-surface-container font-label-sm text-[10px] text-text-dim border border-carbon-border">De_Mirage / MR12</span></td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-text-dim">IITM-DEDICATED-01</td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-text-dim font-label-sm text-[10px] uppercase border border-carbon-border">
                        SCHEDULED
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Slide-Over Drawer: Flagship Game Specs & Rulebook */}
      {currentDrawerGame && (
        <aside
          aria-label="Game Specifications and Rulebook"
          className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-surface-glass backdrop-blur-2xl border-l border-carbon-border shadow-2xl flex flex-col"
        >
          {/* Drawer Header with Game Art Banner */}
          <div className="relative shrink-0 h-44 w-full bg-surface-container-lowest overflow-hidden">
            <img
              src={currentDrawerGame.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800"}
              alt={currentDrawerGame.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-glass via-surface-glass/60 to-transparent"></div>

            {/* Close Action */}
            <button
              onClick={() => {
                setActiveDrawerGame(null);
                setSelectedGameForModal(null);
              }}
              className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-surface-container-lowest/80 text-text-dim hover:text-text-bright hover:bg-surface-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1.5 transition-all border border-carbon-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
              Close Specs [Esc]
            </button>

            <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-[10px] font-bold uppercase tracking-wider">
                  {currentDrawerGame.platform}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-highest/80 text-text-bright font-label-sm text-[10px] uppercase tracking-wider">
                  {currentDrawerGame.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-alert-crimson/20 border border-alert-crimson/40 text-alert-crimson font-label-sm text-[10px] font-bold uppercase tracking-wider">
                  SANCTIONED IITM S03
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-text-bright tracking-tight uppercase font-bold">
                {currentDrawerGame.title} — OFFICIAL SPECIFICATIONS &amp; RULEBOOK
              </h2>
            </div>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
            {/* Section 1: Overview */}
            <div className="flex flex-col gap-2">
              <h3 className="font-label-md text-label-md text-primary-container uppercase font-bold tracking-wider">
                // GAME OVERVIEW &amp; SYNOPSIS
              </h3>
              <p className="font-body-md text-body-md text-text-bright leading-relaxed">
                {currentDrawerGame.description}
              </p>
            </div>

            {/* Section 2: Rulebook Clauses */}
            <div className="flex flex-col gap-3">
              <h3 className="font-label-md text-label-md text-text-bright uppercase font-bold tracking-wider flex items-center gap-1.5">
                <span className="material-symbols-outlined text-admin-amber text-[18px]">gavel</span>
                IITM BS SANCTIONED RULESET
              </h3>
              <div className="bg-surface-container p-4 rounded-xl flex flex-col gap-3 text-body-sm text-text-dim border border-carbon-border">
                {currentDrawerGame.rules?.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-text-bright">
                    <span className="material-symbols-outlined text-verified-emerald text-[16px] shrink-0 mt-0.5">check_circle</span>
                    <span>{rule}</span>
                  </div>
                )) || (
                  <>
                    <div className="flex items-start gap-2 text-text-bright">
                      <span className="material-symbols-outlined text-verified-emerald text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>All players must verify with institutional @study.iitm.ac.in credentials.</span>
                    </div>
                    <div className="flex items-start gap-2 text-text-bright">
                      <span className="material-symbols-outlined text-verified-emerald text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>No emulators, third-party macros, or network throttling allowed.</span>
                    </div>
                    <div className="flex items-start gap-2 text-text-bright">
                      <span className="material-symbols-outlined text-verified-emerald text-[16px] shrink-0 mt-0.5">check_circle</span>
                      <span>Matches are officiated by appointed student council marshals.</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Section 3: Telemetry Benchmarks */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container p-3 rounded-lg border border-carbon-border">
                <span className="font-label-sm text-[10px] text-text-dim uppercase">Server Region</span>
                <span className="font-headline-md text-body-lg text-text-bright font-bold block mt-0.5">Mumbai AWS [14ms]</span>
              </div>
              <div className="bg-surface-container p-3 rounded-lg border border-carbon-border">
                <span className="font-label-sm text-[10px] text-text-dim uppercase">Eligibility</span>
                <span className="font-headline-md text-body-lg text-verified-emerald font-bold block mt-0.5">All Degrees / Diplomas</span>
              </div>
            </div>

            {/* Section 4: Action Footer */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setActiveDrawerGame(null);
                  setSelectedGameForModal(null);
                  setCurrentView('events');
                  window.scrollTo(0, 0);
                }}
                className="flex-1 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Find Associated Tournaments</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </aside>
      )}
    </div>
  );
}
