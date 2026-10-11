import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function EventsView() {
  const {
    events,
    accountState,
    user,
    setIsAuthModalOpen,
    registerForEvent,
    selectedEventForModal,
    setSelectedEventForModal
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('closing');
  const [activeDetailsModal, setActiveDetailsModal] = useState(null);
  const [activeGatewayModal, setActiveGatewayModal] = useState(null);
  const [hasCopiedSlip, setHasCopiedSlip] = useState(false);

  // If AppContext has a selectedEventForModal (from Home page or elsewhere), show it
  const currentDetailsEvent = activeDetailsModal || selectedEventForModal;

  const filteredEvents = events.filter(event => {
    let matchesCategory = true;
    if (activeCategory === 'interhouse') matchesCategory = event.game.toLowerCase().includes('valorant') || event.title.toLowerCase().includes('inter-house');
    else if (activeCategory === 'mindgames') matchesCategory = event.game.toLowerCase().includes('chess') || event.title.toLowerCase().includes('blitz');
    else if (activeCategory === 'freshers') matchesCategory = event.title.toLowerCase().includes('fresher') || event.eventType.toLowerCase().includes('workshop');
    else if (activeCategory === 'scrims') matchesCategory = event.game.toLowerCase().includes('bgmi') || event.title.toLowerCase().includes('scrim') || event.title.toLowerCase().includes('showdown');

    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenGateway = (event) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    if (accountState === 'unverified') {
      alert('Your IITM institutional email is unverified. Please switch to student identity or verify.');
      return;
    }
    setActiveDetailsModal(null);
    setSelectedEventForModal(null);
    setActiveGatewayModal(event);
    setHasCopiedSlip(false);
  };

  const handleLaunchGoogleForm = (event) => {
    registerForEvent(event.id);
    if (event.googleFormUrl) {
      window.open(event.googleFormUrl, '_blank');
    }
  };

  const handleCopySlip = (event) => {
    const payload = `TESSERACT_VERIFIED_REGISTRATION\nEvent: ${event.title}\nStudent: ${user.name}\nRoll: ${user.rollNumber}\nEmail: ${user.email}\nHouse: ${user.house}\nRiot ID: ${user.gameHandles?.valorant || 'VORTEX#8842'}\nTimestamp: ${new Date().toISOString()}`;
    navigator.clipboard?.writeText(payload);
    setHasCopiedSlip(true);
    setTimeout(() => setHasCopiedSlip(false), 3000);
  };

  return (
    <div className="w-full flex flex-col relative pb-16">
      {/* Telemetry Ambient Grid Canvas */}
      <div className="relative w-full overflow-hidden">
        {/* Ambient glowing backdrop blobs */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-container/10 blur-[120px] pointer-events-none"></div>
        <div className="absolute top-80 right-10 w-[500px] h-[500px] rounded-full bg-secondary-container/15 blur-[140px] pointer-events-none"></div>

        {/* MAIN SECTION: Tournament Command Telemetry Header */}
        <div className="max-w-7xl mx-auto px-margin pt-space-lg pb-space-xl">
          {/* Top Header & Live Relay Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 text-xs font-mono-code tracking-widest uppercase">
              <span className="text-cyan-400 font-bold">COMPETITIVE CIRCUIT</span>
              <span className="text-slate-600">/</span>
              <span className="text-white font-bold">SEASON 03</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">IIT MADRAS BS</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-900/90 px-3.5 py-1.5 rounded-full shadow-sm border border-slate-800 text-xs font-mono-code">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-200 uppercase tracking-wider font-semibold">2 Open Registration</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span className="text-rose-400 uppercase tracking-wider font-semibold">1 Live Now</span>
              </div>
            </div>
          </div>

          {/* Hero Header Title & Narrative */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm uppercase tracking-widest mb-space-sm border border-primary-container/20">
                <span className="material-symbols-outlined text-[14px]">sports_esports</span>
                OFFICIAL SANCTIONED TOURNAMENTS // IITM BS S03
              </div>
              <h1 className="font-headline-xl text-3xl sm:text-headline-xl text-text-bright tracking-tight uppercase leading-none mb-space-sm">
                CHAMPIONSHIP ARENA &amp; QUALIFIERS
              </h1>
              <p className="font-body-lg text-body-lg text-text-dim max-w-2xl">
                Official inter-house championships, open campus showdowns, and semester qualifiers. Verified registration gateway powered by institutional IITM Student Identity.
              </p>
            </div>

            {/* Metric HUD Chips */}
            <div className="grid grid-cols-3 gap-space-sm sm:gap-space-md shrink-0">
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm min-w-[100px] text-center border border-carbon-border">
                <span className="block font-label-sm text-label-sm text-text-dim uppercase tracking-wider">Prize Total</span>
                <span className="font-headline-md text-headline-md text-admin-amber tracking-tight font-bold">₹37,500</span>
              </div>
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm min-w-[100px] text-center border border-carbon-border">
                <span className="block font-label-sm text-label-sm text-text-dim uppercase tracking-wider">Houses</span>
                <span className="font-headline-md text-headline-md text-primary-container tracking-tight font-bold">04 RIVALS</span>
              </div>
              <div className="bg-surface-container-low p-space-md rounded-xl shadow-sm min-w-[100px] text-center border border-carbon-border">
                <span className="block font-label-sm text-label-sm text-text-dim uppercase tracking-wider">Active Teams</span>
                <span className="font-headline-md text-headline-md text-verified-emerald tracking-tight font-bold">118 SQD</span>
              </div>
            </div>
          </div>

          {/* Tactical Filtering & Control Switcher Bar */}
          <div className="bg-surface-container-low rounded-xl p-space-sm shadow-md mb-space-lg flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md border border-carbon-border">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: 'all', label: `All Events (${events.length})` },
                { id: 'interhouse', label: 'Flagship Inter-House' },
                { id: 'mindgames', label: 'Mind Games & Chess' },
                { id: 'freshers', label: 'Intra-Batch Freshers' },
                { id: 'scrims', label: 'Scrim Showdowns' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`filter-pill whitespace-nowrap px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'text-text-dim hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search & Sorters */}
            <div className="flex items-center gap-space-sm shrink-0">
              <div className="relative flex-1 md:w-56">
                <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-text-dim text-[16px]">search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-container text-on-surface placeholder:text-text-dim text-body-sm font-body-sm pl-8 pr-3 py-1.5 rounded-lg focus:outline-none focus:bg-surface-container-high transition-colors border border-carbon-border"
                  placeholder="Search tournaments..."
                  type="text"
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container text-on-surface font-label-sm text-label-sm px-3 py-1.5 rounded-lg appearance-none pr-8 cursor-pointer focus:outline-none border border-carbon-border"
                >
                  <option value="closing">Closing Soonest</option>
                  <option value="prize">Prize Pool: High to Low</option>
                  <option value="date">Earliest Start Date</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-dim text-[16px] pointer-events-none">expand_more</span>
              </div>
            </div>
          </div>

          {/* TOURNAMENT EVENT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg mb-space-xl">
            {filteredEvents.map((evt) => {
              const capacityPercent = Math.min(100, Math.round((evt.registeredTeams / evt.maxTeams) * 100));
              const isClosed = evt.status === 'Completed';

              return (
                <div
                  key={evt.id}
                  className="tournament-card group flex flex-col bg-surface-container-low rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:translate-y-[-2px] hover:shadow-2xl border border-carbon-border"
                >
                  {/* Card Image Banner & Badges */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={evt.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                      alt={evt.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/40 to-transparent"></div>

                    {/* Top Floating Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm ${
                        evt.status === 'Live'
                          ? 'bg-verified-emerald text-on-tertiary-fixed'
                          : isClosed
                          ? 'bg-surface-container text-text-dim'
                          : 'bg-alert-crimson text-on-error'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {evt.status === 'Live' ? 'LIVE NOW' : isClosed ? 'CONCLUDED' : 'Closing Soon'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-sm text-primary-container font-label-sm text-label-sm uppercase tracking-wider border border-primary-container/20">
                        {evt.game}
                      </span>
                    </div>

                    {/* Prize Pool Callout Ribbon */}
                    <div className="absolute top-3 right-3 bg-admin-amber text-on-tertiary-fixed font-label-md text-label-md px-3 py-1 rounded shadow-md flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[16px]">emoji_events</span>
                      {evt.prizePool} PRIZE POOL
                    </div>

                    {/* Bottom Banner Metas */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-label-sm font-label-sm">
                      <span className="text-text-bright font-bold uppercase tracking-wide bg-surface-glass px-2 py-0.5 rounded backdrop-blur-md border border-carbon-border">
                        {evt.format}
                      </span>
                      <span className="text-verified-emerald font-bold uppercase tracking-wider bg-surface-glass px-2 py-0.5 rounded backdrop-blur-md flex items-center gap-1 border border-carbon-border">
                        <span className="material-symbols-outlined text-[12px]">verified_user</span> Institutional Verified
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-space-sm mb-space-xs">
                        <h2 className="font-headline-lg text-headline-lg text-text-bright tracking-tight uppercase group-hover:text-primary-container transition-colors">
                          {evt.title}
                        </h2>
                      </div>
                      <p className="font-body-md text-body-md text-text-dim mb-space-md">
                        {evt.description}
                      </p>

                      {/* Tournament Telemetry Data Grid */}
                      <div className="grid grid-cols-2 gap-space-sm bg-surface-container rounded-lg p-space-md mb-space-md border border-carbon-border">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-text-dim text-[18px]">calendar_month</span>
                          <div>
                            <span className="block font-label-sm text-[11px] text-text-dim uppercase leading-none">Schedule</span>
                            <span className="font-label-md text-label-md text-text-bright">{evt.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-text-dim text-[18px]">schedule</span>
                          <div>
                            <span className="block font-label-sm text-[11px] text-text-dim uppercase leading-none">Match Time</span>
                            <span className="font-label-md text-label-md text-text-bright">{evt.time}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-text-dim text-[18px]">account_tree</span>
                          <div>
                            <span className="block font-label-sm text-[11px] text-text-dim uppercase leading-none">Format</span>
                            <span className="font-label-md text-label-md text-text-bright">{evt.format}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-text-dim text-[18px]">payments</span>
                          <div>
                            <span className="block font-label-sm text-[11px] text-text-dim uppercase leading-none">Prize</span>
                            <span className="font-label-md text-label-md text-admin-amber font-bold">{evt.prizePool}</span>
                          </div>
                        </div>
                      </div>

                      {/* Slots Registration Gauge Progress */}
                      <div className="mb-space-lg">
                        <div className="flex justify-between items-center text-label-sm font-label-sm mb-1.5">
                          <span className="text-text-dim uppercase">Slots Filled (Max {evt.maxTeams})</span>
                          <span className="text-text-bright font-bold">
                            {evt.registeredTeams} / {evt.maxTeams} Squads{' '}
                            <span className="text-primary-container">({capacityPercent}%)</span>
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary-container to-surface-tint transition-all"
                            style={{ width: `${capacityPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Dual CTA Action Block */}
                    <div className="flex items-center gap-space-sm pt-space-xs">
                      <button
                        onClick={() => setActiveDetailsModal(evt)}
                        className="flex-1 px-3 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md text-center flex items-center justify-center gap-1.5 border border-carbon-border cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[16px]">menu_book</span>
                        View Rules &amp; Schedule
                      </button>

                      {isClosed ? (
                        <button
                          disabled
                          className="flex-1 px-4 py-2 rounded-lg bg-surface-container text-text-dim font-label-md text-label-md text-center cursor-not-allowed opacity-60"
                        >
                          Concluded
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenGateway(evt)}
                          className="flex-1 px-4 py-2 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md font-bold text-center flex items-center justify-center gap-1.5 shadow-md shadow-primary-container/20 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                          Register Squad [IITM]
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOTTOM TELEMETRY FOOTNOTE: Rules & Fair Play Assurance */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-carbon-border">
            <div className="flex items-center gap-space-md">
              <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0 border border-carbon-border">
                <span className="material-symbols-outlined text-[24px]">policy</span>
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-text-bright uppercase font-bold tracking-wider">
                  IITM BS Esports Integrity Protocol &amp; Vanguard Monitoring
                </h3>
                <p className="font-body-sm text-body-sm text-text-dim">
                  All tournaments are officially governed under the Student Affairs Esports Code. Smurfing, multi-accounting, and anti-cheat tampering result in automatic degree suspension review.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <a
                className="px-3 py-1.5 rounded-lg bg-surface-container text-text-dim hover:text-on-surface transition-colors font-label-sm text-label-sm uppercase tracking-wider border border-carbon-border"
                href="#download-rulebook"
                onClick={(e) => { e.preventDefault(); alert("Official Tesseract S03 Rulebook PDF downloaded to local storage."); }}
              >
                Download S03 Rulebook
              </a>
              <a
                className="px-3 py-1.5 rounded-lg bg-surface-container text-text-dim hover:text-on-surface transition-colors font-label-sm text-label-sm uppercase tracking-wider border border-carbon-border"
                href="#dispute-tribunal"
                onClick={(e) => { e.preventDefault(); alert("Dispute tribunal grievance desk is live at webops@tesseract.iitmbs.org"); }}
              >
                Dispute Tribunal
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: INTERACTIVE EVENT DETAILS MODAL / DRAWER              */}
      {/* ============================================================== */}
      {currentDetailsEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-surface-container-lowest/85 backdrop-blur-md transition-opacity"
            onClick={() => {
              setActiveDetailsModal(null);
              setSelectedEventForModal(null);
            }}
          ></div>

          {/* Modal Content Card */}
          <div className="relative w-full max-w-4xl bg-surface-container-low rounded-xl shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col border border-carbon-border">
            {/* Modal Header Banner */}
            <div className="relative h-44 sm:h-56 w-full shrink-0 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={currentDetailsEvent.banner || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"}
                alt={currentDetailsEvent.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/60 to-transparent"></div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container-lowest/80 text-text-bright hover:bg-alert-crimson transition-colors flex items-center justify-center backdrop-blur-sm cursor-pointer"
                onClick={() => {
                  setActiveDetailsModal(null);
                  setSelectedEventForModal(null);
                }}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              {/* Header Titles on Banner */}
              <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-space-md">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider mb-1">
                    {currentDetailsEvent.game} • {currentDetailsEvent.format}
                  </span>
                  <h2 className="font-headline-xl text-xl sm:text-headline-xl text-text-bright tracking-tight uppercase leading-none">
                    {currentDetailsEvent.title}
                  </h2>
                </div>
                <div className="bg-admin-amber text-on-tertiary-fixed font-label-md text-label-md px-3 py-1.5 rounded-lg shadow-md font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">trophy</span>
                  {currentDetailsEvent.prizePool} TOTAL REWARDS
                </div>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-space-lg overflow-y-auto space-y-space-lg flex-1">
              {/* Overview Narrative */}
              <div>
                <h3 className="font-label-md text-label-md text-primary-container uppercase tracking-wider font-bold mb-2">
                  // TOURNAMENT OVERVIEW &amp; INTER-HOUSE CONTEXT
                </h3>
                <p className="font-body-md text-body-md text-text-dim">
                  {currentDetailsEvent.description} Cumulative match victories contribute points directly toward the coveted Annual Inter-House Esports Shield.
                </p>
              </div>

              {/* Prize Pool Table */}
              <div className="bg-surface-container rounded-xl p-space-md border border-carbon-border">
                <h3 className="font-label-md text-label-md text-text-bright uppercase tracking-wider font-bold mb-space-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-admin-amber text-[18px]">military_tech</span>
                  PRIZE POOL DISTRIBUTION &amp; RECOGNITION
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-space-sm">
                  <div className="bg-surface-container-low p-space-sm rounded-lg border border-carbon-border">
                    <span className="block font-label-sm text-[11px] text-admin-amber uppercase font-bold">1st Place (Champions)</span>
                    <span className="font-headline-md text-headline-md text-text-bright font-bold">₹8,000</span>
                    <span className="block font-body-sm text-[11px] text-text-dim mt-0.5">+ Gold House Trophy</span>
                  </div>
                  <div className="bg-surface-container-low p-space-sm rounded-lg border border-carbon-border">
                    <span className="block font-label-sm text-[11px] text-text-dim uppercase font-bold">2nd Place (Runner-up)</span>
                    <span className="font-headline-md text-headline-md text-text-bright font-bold">₹4,000</span>
                    <span className="block font-body-sm text-[11px] text-text-dim mt-0.5">+ Silver Commendation</span>
                  </div>
                  <div className="bg-surface-container-low p-space-sm rounded-lg border border-carbon-border">
                    <span className="block font-label-sm text-[11px] text-text-dim uppercase font-bold">3rd Place</span>
                    <span className="font-headline-md text-headline-md text-text-bright font-bold">₹2,000</span>
                    <span className="block font-body-sm text-[11px] text-text-dim mt-0.5">+ Bronze Certificate</span>
                  </div>
                  <div className="bg-surface-container-low p-space-sm rounded-lg border border-carbon-border">
                    <span className="block font-label-sm text-[11px] text-primary-container uppercase font-bold">Finals MVP</span>
                    <span className="font-headline-md text-headline-md text-text-bright font-bold">₹1,000</span>
                    <span className="block font-body-sm text-[11px] text-text-dim mt-0.5">+ Custom Tesseract Jersey</span>
                  </div>
                </div>
              </div>

              {/* Match Stages & Broadcast Schedule */}
              <div>
                <h3 className="font-label-md text-label-md text-text-bright uppercase tracking-wider font-bold mb-space-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[18px]">calendar_view_week</span>
                  MATCH STAGES &amp; BROADCAST SCHEDULE
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-space-sm">
                  <div className="bg-surface-container p-space-sm rounded-lg border border-carbon-border">
                    <span className="font-label-sm text-[11px] text-primary-container font-bold uppercase">ROUND OF 32</span>
                    <h4 className="font-headline-md text-body-lg text-text-bright font-bold mt-1">Single Elim</h4>
                    <p className="font-body-sm text-[12px] text-text-dim">BO1 match lobbies across custom servers.</p>
                  </div>
                  <div className="bg-surface-container p-space-sm rounded-lg border border-carbon-border">
                    <span className="font-label-sm text-[11px] text-primary-container font-bold uppercase">QUARTERFINALS</span>
                    <h4 className="font-headline-md text-body-lg text-text-bright font-bold mt-1">High Stakes</h4>
                    <p className="font-body-sm text-[12px] text-text-dim">Top 8 inter-house squads clash.</p>
                  </div>
                  <div className="bg-surface-container p-space-sm rounded-lg border border-carbon-border">
                    <span className="font-label-sm text-[11px] text-primary-container font-bold uppercase">SEMIFINALS</span>
                    <h4 className="font-headline-md text-body-lg text-text-bright font-bold mt-1">BO3 Series</h4>
                    <p className="font-body-sm text-[12px] text-text-dim">Streamed live on Tesseract YouTube.</p>
                  </div>
                  <div className="bg-surface-container p-space-sm rounded-lg border border-carbon-border">
                    <span className="font-label-sm text-[11px] text-alert-crimson font-bold uppercase">GRAND FINALS</span>
                    <h4 className="font-headline-md text-body-lg text-text-bright font-bold mt-1">BO5 Series</h4>
                    <p className="font-body-sm text-[12px] text-text-dim">Championship match with live casters.</p>
                  </div>
                </div>
              </div>

              {/* Sanctioned Eligibility Gates */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs border border-carbon-border">
                <h3 className="font-label-md text-label-md text-text-bright uppercase tracking-wider font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-verified-emerald text-[18px]">shield</span>
                  SANCTIONED ELIGIBILITY GATES
                </h3>
                <ul className="text-body-sm font-body-sm text-text-dim space-y-1.5 list-disc list-inside">
                  <li>Squad Captain and all 5 active roster members must possess a valid <span className="text-text-bright font-mono">@study.iitm.ac.in</span> institutional email address.</li>
                  <li>Roster players must belong to the declared House roster or qualify as institutional wildcards according to Council Bylaw 4.2.</li>
                  <li>Anti-Cheat Integrity: All accounts must run active anti-cheat kernel verification without hardware spoofing flags.</li>
                  <li>In compliance with PRD Section 11, registration must be verified through the Pre-Flight Gateway before proceeding to the Official Google Form.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer Action Bar */}
            <div className="p-space-md bg-surface-container-lowest flex items-center justify-between gap-space-sm border-t border-carbon-border">
              <button
                className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors cursor-pointer border border-carbon-border"
                onClick={() => {
                  setActiveDetailsModal(null);
                  setSelectedEventForModal(null);
                }}
              >
                Dismiss Window
              </button>
              <button
                className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                onClick={() => handleOpenGateway(currentDetailsEvent)}
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                Proceed to Verification Gateway
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: GOOGLE FORM PRE-FLIGHT VERIFICATION GATEWAY (PRD 11)   */}
      {/* ============================================================== */}
      {activeGatewayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-surface-container-lowest/90 backdrop-blur-lg transition-opacity"
            onClick={() => setActiveGatewayModal(null)}
          ></div>

          {/* Gateway Command Center Container */}
          <div className="relative w-full max-w-2xl bg-surface-container-low rounded-xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col border border-carbon-border">
            {/* Top Telemetry Header */}
            <div className="bg-surface-container-lowest px-space-lg py-space-md flex items-center justify-between border-b border-carbon-border">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-full bg-primary-container animate-pulse"></div>
                <div>
                  <span className="block font-label-sm text-label-sm text-primary-container uppercase tracking-widest font-bold">
                    PRE-FLIGHT REGISTRATION GATEWAY
                  </span>
                  <span className="font-headline-md text-body-lg text-text-bright font-bold uppercase">
                    {activeGatewayModal.title}
                  </span>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-surface-container text-text-dim hover:text-text-bright flex items-center justify-center transition-colors cursor-pointer border border-carbon-border"
                onClick={() => setActiveGatewayModal(null)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Gateway Body Content */}
            <div className="p-space-lg space-y-space-md overflow-y-auto max-h-[80vh]">
              {/* Auto-detected Verified Student Identity Card */}
              <div className="bg-surface-container rounded-xl p-space-md border border-carbon-border">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">Active Verified Session (Tesseract Auth)</span>
                  <span className="px-2 py-0.5 rounded bg-verified-emerald/20 text-verified-emerald font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">verified</span> Identity Confirmed
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md">
                  <div className="relative">
                    <img
                      className="w-16 h-16 rounded-xl object-cover border border-carbon-border"
                      src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"}
                      alt={user.name}
                    />
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-verified-emerald flex items-center justify-center text-[10px] text-surface-container-lowest font-bold">✓</span>
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-md text-headline-md text-text-bright font-bold">{user.name}</span>
                      <span className="font-label-sm text-[11px] text-text-dim bg-surface-container-low px-1.5 py-0.5 rounded uppercase border border-carbon-border">
                        Roll: {user.rollNumber}
                      </span>
                    </div>
                    <div className="font-label-sm text-label-sm text-primary-container font-mono">
                      {user.email}
                    </div>
                    <div className="flex flex-wrap items-center gap-space-sm pt-1 text-label-sm text-text-dim">
                      <span>Riot ID: <strong className="text-text-bright font-mono">{user.gameHandles?.valorant || 'VORTEX#8842'}</strong></span>
                      <span>•</span>
                      <span>Discord: <strong className="text-text-bright font-mono">{user.gameHandles?.discord || 'vortex_bs#1337'}</strong></span>
                      <span>•</span>
                      <span className="text-secondary font-bold">{user.house}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pre-Flight Checklist */}
              <div className="bg-surface-container-low rounded-xl p-space-md space-y-space-sm border border-carbon-border">
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-wider font-bold block">
                  INSTITUTIONAL PRE-FLIGHT CHECKLIST
                </span>
                <div className="space-y-2 text-body-sm text-text-bright">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-verified-emerald text-[18px]">check_circle</span>
                    <span>Institutional domain verified (<span className="text-verified-emerald font-mono">@study.iitm.ac.in</span>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-verified-emerald text-[18px]">check_circle</span>
                    <span>Inter-House assignment active (<strong className="text-secondary">{user.house}</strong>)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-verified-emerald text-[18px]">check_circle</span>
                    <span>Zero active fair-play strikes or disciplinary infractions</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Copy Slip & Open Google Form */}
              <div className="flex flex-col sm:flex-row gap-space-sm pt-2">
                <button
                  onClick={() => handleCopySlip(activeGatewayModal)}
                  className="flex-1 py-3 px-4 rounded-lg bg-surface-container text-text-bright hover:bg-surface-container-high transition-colors font-label-md text-label-md uppercase font-bold flex items-center justify-center gap-2 border border-carbon-border cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {hasCopiedSlip ? 'done_all' : 'content_copy'}
                  </span>
                  <span>{hasCopiedSlip ? 'Verification Slip Copied!' : 'Copy Verification Slip'}</span>
                </button>

                <button
                  onClick={() => handleLaunchGoogleForm(activeGatewayModal)}
                  className="flex-1 py-3 px-4 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary transition-all font-label-md text-label-md uppercase font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary-container/25 cursor-pointer"
                >
                  <span>Launch Official Google Form</span>
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </button>
              </div>

              <p className="text-center font-label-sm text-[11px] text-text-dim">
                Proceeding marks your squad as registered in Tesseract telemetry. Submission timestamp will be recorded.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
