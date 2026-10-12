import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ROLES, getRoleInfo } from '../utils/rbac';

export default function AdminView() {
  const {
    accountState,
    switchRole,
    announcement,
    setAnnouncement,
    events,
    addEvent,
    deleteEvent,
    games,
    addGame,
    deleteGame,
    quizzes,
    addQuiz,
    deleteQuiz,
    polls,
    createPoll,
    allowedDomains,
    addAllowedDomain,
    removeAllowedDomain,
    setCurrentView,
    showToast
  } = useApp();

  const navigate = useNavigate();

  // Defense-in-depth: Enforce Admin Role at component level
  if (accountState !== ROLES.ADMIN) {
    const roleInfo = getRoleInfo(accountState);
    return (
      <div className="w-full min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-16">
        <div className="max-w-xl w-full glass-card p-8 sm:p-10 rounded-2xl border border-red-500/30 shadow-[0_0_50px_rgba(244,63,94,0.15)] relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08] mb-6">
            <div className="flex items-center gap-2 text-xs font-mono-code text-red-400 font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              SECURITY PROTOCOL // 403 FORBIDDEN
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-red-500/10 text-red-400 border border-red-500/20">
              GATEWAY ENFORCED
            </span>
          </div>

          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(244,63,94,0.3)]">
              <span className="material-symbols-outlined text-[34px]">lock_person</span>
            </div>

            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                WebOps Clearance Required
              </h1>
              <p className="text-sm font-body text-slate-300 mt-2 leading-relaxed">
                The Tesseract Admin Operations Center is strictly restricted to Society Executive Council governors, Tournament Marshals, and WebOps Leads.
              </p>
            </div>

            <div className="bg-slate-950/60 p-4 rounded-xl border border-white/10 text-left font-mono-code text-xs space-y-2 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Role Identity:</span>
                <span className={`px-2 py-0.5 rounded border font-semibold ${roleInfo.badgeClass}`}>
                  {roleInfo.label} (Level {roleInfo.clearanceLevel})
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Required Clearance:</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  WebOps Admin (Level 3)
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => switchRole(ROLES.ADMIN)}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">bolt</span>
                Switch to Admin (Demo)
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono-code text-xs border border-white/10 transition-colors cursor-pointer"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('telemetry');

  // Announcement state
  const [annTitle, setAnnTitle] = useState(announcement?.title || '');
  const [annDesc, setAnnDesc] = useState(announcement?.description || '');
  const [annImg, setAnnImg] = useState(announcement?.image || '');
  const [annCtaText, setAnnCtaText] = useState(announcement?.ctaText || '');
  const [annCtaUrl, setAnnCtaUrl] = useState(announcement?.ctaUrl || '');
  const [annEnabled, setAnnEnabled] = useState(announcement?.enabled || false);

  // New Event Form State
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventGame, setNewEventGame] = useState('Valorant');
  const [newEventFormat, setNewEventFormat] = useState('5v5 Double Elimination');
  const [newEventPrize, setNewEventPrize] = useState('₹15,000');
  const [newEventDate, setNewEventDate] = useState('Nov 15, 2025');
  const [newEventTime, setNewEventTime] = useState('19:00 IST');
  const [newEventFormUrl, setNewEventFormUrl] = useState('https://forms.gle/sample');

  // New Game State
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameCategory, setNewGameCategory] = useState('Tactical FPS');
  const [newGamePlatform, setNewGamePlatform] = useState('PC');
  const [newGameTeamSize, setNewGameTeamSize] = useState('5v5');

  // Domain State
  const [newDomain, setNewDomain] = useState('');

  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncement({
      title: annTitle,
      description: annDesc,
      image: annImg,
      ctaText: annCtaText,
      ctaUrl: annCtaUrl,
      enabled: annEnabled
    });
    showToast('Announcement broadcast updated successfully!', 'success');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;
    addEvent({
      id: `evt-${Date.now()}`,
      title: newEventTitle,
      game: newEventGame,
      format: newEventFormat,
      prizePool: newEventPrize,
      date: newEventDate,
      time: newEventTime,
      googleFormUrl: newEventFormUrl,
      status: 'Upcoming',
      registeredTeams: 0,
      maxTeams: 32,
      description: `Official ${newEventGame} competition hosted by Tesseract.`
    });
    setNewEventTitle('');
    showToast('Tournament event deployed to registry!', 'success');
  };

  const handleCreateGame = (e) => {
    e.preventDefault();
    if (!newGameTitle) return;
    addGame({
      id: `game-${Date.now()}`,
      title: newGameTitle,
      category: newGameCategory,
      platform: newGamePlatform,
      teamSize: newGameTeamSize,
      description: `Sanctioned competitive ${newGameTitle} discipline on Tesseract telemetry.`,
      activePlayers: 32,
      rules: ['Institutional email verification required.', 'Officiated by Tesseract marshals.']
    });
    setNewGameTitle('');
    showToast('Game discipline added to catalog!', 'success');
  };

  const handleAddDomain = (e) => {
    e.preventDefault();
    if (!newDomain) return;
    addAllowedDomain(newDomain);
    setNewDomain('');
  };

  const handleExportAuditJson = () => {
    const auditData = {
      timestamp: new Date().toISOString(),
      version: 'v3.4.2',
      announcement,
      eventsCount: events.length,
      gamesCount: games.length,
      quizzesCount: quizzes.length,
      pollsCount: polls.length,
      allowedDomains
    };
    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tesseract_audit_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Top Command & Control Executive Bar */}
      <div className="w-full bg-surface-container-lowest px-margin py-space-md shadow-md border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex flex-wrap items-center gap-space-sm">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-verified-emerald/15 text-verified-emerald font-label-sm text-label-sm uppercase border border-verified-emerald/30">
                <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
                ROOT_ADMIN // PRIVILEGED ACCESS
              </div>
              <span className="text-text-dim font-label-sm text-label-sm">•</span>
              <div className="flex items-center gap-1 text-text-bright font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px] text-primary-container">shield_person</span>
                Aarav Sharma (President / WebOps Lead)
              </div>
              <span className="text-text-dim font-label-sm text-label-sm">•</span>
              <span className="text-outline font-label-sm text-label-sm font-mono truncate max-w-[200px]">
                SIG: e8f4c2eb3a91...b72
              </span>
            </div>
            <h1 className="font-headline-lg text-2xl sm:text-headline-lg text-text-bright tracking-tight uppercase font-bold">
              WEBOPS COMMAND CENTER &amp; CMS
            </h1>
            <p className="font-body-sm text-body-sm text-text-dim">
              Administrative control plane for tournament operations, telemetry pipelines, quiz architecture, and institutional access control.
            </p>
          </div>

          {/* Action Cluster */}
          <div className="flex flex-wrap items-center gap-space-sm shrink-0">
            <button
              onClick={() => { setCurrentView('home'); window.scrollTo(0, 0); }}
              className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-text-bright font-label-md text-label-md flex items-center gap-1.5 transition-all border border-carbon-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-primary-container">visibility</span>
              Live Preview
            </button>
            <button
              onClick={handleExportAuditJson}
              className="px-3 py-1.5 rounded bg-surface-container-high hover:bg-surface-bright text-text-bright font-label-md text-label-md flex items-center gap-1.5 transition-all border border-carbon-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-admin-amber">download</span>
              Export Audit [JSON]
            </button>
            <button
              onClick={() => showToast("CMS state synced across edge cache and recorded to local session!", "success")}
              className="px-3 py-1.5 rounded bg-primary-container hover:bg-primary text-on-primary-container font-label-md text-label-md font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">sync_saved_locally</span>
              Commit CMS State <span className="opacity-70 text-[10px]">[v3.4.2]</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Sub-Navigation & Tab Switcher Bar */}
      <div className="w-full bg-surface-container-low px-margin shadow-sm border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar gap-space-xs py-1">
          {[
            { id: 'telemetry', label: 'Telemetry Overview', icon: 'speed' },
            { id: 'announcements', label: 'Announcements & Pop-ups', icon: 'campaign', count: announcement?.enabled ? '1 Active' : '0 Active' },
            { id: 'tournaments', label: 'Tournament Ops', icon: 'sports_esports', count: `${events.length} Live` },
            { id: 'games', label: 'Games Directory', icon: 'apps', count: `${games.length} Titles` },
            { id: 'quizzes', label: 'MCQ Quiz Builder', icon: 'quiz', count: `${quizzes.length} Quizzes` },
            { id: 'polls', label: 'Community Polls', icon: 'how_to_vote', count: `${polls.length} Polls` },
            { id: 'whitelist', label: 'Institutional Domain Access', icon: 'admin_panel_settings', count: `${allowedDomains.length} Rules` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded font-label-md text-label-md flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-surface-container text-primary-container shadow-sm border border-carbon-border font-bold'
                  : 'text-text-dim hover:text-text-bright hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.count && (
                <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary-container text-[9px] font-bold border border-carbon-border">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Viewport Stage */}
      <div className="w-full px-margin py-space-lg">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          {/* TAB 1: TELEMETRY OVERVIEW */}
          {activeTab === 'telemetry' && (
            <div className="flex flex-col gap-space-lg">
              {/* 5 Telemetry Metrics HUD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-space-sm">
                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between text-text-dim mb-space-sm">
                    <span className="font-label-sm text-[11px] uppercase">Matched Users</span>
                    <span className="material-symbols-outlined text-[18px] text-primary-container">group</span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-text-bright font-bold">1,420</div>
                    <div className="font-label-sm text-[10px] text-verified-emerald mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">trending_up</span>
                      +18 today • 100% BS enrolled
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between text-text-dim mb-space-sm">
                    <span className="font-label-sm text-[11px] uppercase">Verified Passports</span>
                    <span className="material-symbols-outlined text-[18px] text-verified-emerald">verified</span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-text-bright font-bold">1,388</div>
                    <div className="font-label-sm text-[10px] text-verified-emerald mt-1.5 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald"></span>
                      97.7% verification rate
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between text-text-dim mb-space-sm">
                    <span className="font-label-sm text-[11px] uppercase">Tournaments Live</span>
                    <span className="material-symbols-outlined text-[18px] text-alert-crimson">stadium</span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-text-bright font-bold">{events.length} Active</div>
                    <div className="font-label-sm text-[10px] text-text-dim mt-1.5 truncate">
                      Val S03, BGMI, Chess Blitz
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between text-text-dim mb-space-sm">
                    <span className="font-label-sm text-[11px] uppercase">Quizzes Created</span>
                    <span className="material-symbols-outlined text-[18px] text-secondary">psychology</span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-text-bright font-bold">{quizzes.length} Executed</div>
                    <div className="font-label-sm text-[10px] text-text-dim mt-1.5">
                      2,490 submissions logged
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between text-text-dim mb-space-sm">
                    <span className="font-label-sm text-[11px] uppercase">Democratic Ballots</span>
                    <span className="material-symbols-outlined text-[18px] text-admin-amber">ballot</span>
                  </div>
                  <div>
                    <div className="font-headline-lg text-headline-lg text-text-bright font-bold">892 Votes</div>
                    <div className="font-label-sm text-[10px] text-admin-amber mt-1.5">
                      62.8% quorum achieved
                    </div>
                  </div>
                </div>
              </div>

              {/* Telemetry Visuals & PRD Audit */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
                <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">Live Scrim &amp; Quiz Ingestion Telemetry</h3>
                      <p className="font-body-sm text-body-sm text-text-dim">Throughput of realtime anti-cheat pings and millisecond response time logs</p>
                    </div>
                    <div className="flex items-center gap-space-xs font-label-sm text-label-sm bg-surface-container px-2 py-1 rounded border border-carbon-border">
                      <span className="w-2 h-2 rounded-full bg-verified-emerald"></span>
                      <span>Edge Latency: 14.2ms</span>
                    </div>
                  </div>

                  <div className="w-full h-44 bg-surface-container-lowest rounded-lg p-space-sm flex flex-col justify-between relative overflow-hidden border border-carbon-border">
                    <div className="flex justify-between font-label-sm text-[9px] text-outline">
                      <span>00:00 UTC</span>
                      <span>06:00 UTC</span>
                      <span>12:00 UTC</span>
                      <span>18:00 UTC</span>
                      <span>NOW [LIVE]</span>
                    </div>
                    <svg className="w-full h-28 text-primary-container" fill="none" preserveAspectRatio="none" viewBox="0 0 500 100">
                      <defs>
                        <linearGradient id="cyberGrad" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35"></stop>
                          <stop offset="100%" stopColor="currentColor" stopOpacity="0.0"></stop>
                        </linearGradient>
                      </defs>
                      <path d="M0,80 Q30,65 60,75 T120,40 T180,60 T240,25 T300,50 T360,20 T420,35 T480,10 L500,8 L500,100 L0,100 Z" fill="url(#cyberGrad)"></path>
                      <path d="M0,80 Q30,65 60,75 T120,40 T180,60 T240,25 T300,50 T360,20 T420,35 T480,10 L500,8" fill="none" stroke="currentColor" strokeWidth="2.5"></path>
                      <circle className="fill-verified-emerald" cx="500" cy="8" r="4"></circle>
                    </svg>
                    <div className="flex items-center justify-between font-label-sm text-[10px] text-text-dim border-t-0 pt-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-primary-container"></span> Concurrent Scrim Relay Sockets: 412
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm bg-verified-emerald"></span> Database Read/Write: 99.98%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col gap-space-md shadow-sm border border-carbon-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">PRD Architecture Audit</h3>
                    <span className="px-2 py-0.5 rounded bg-verified-emerald/20 text-verified-emerald font-label-sm text-[10px] font-bold border border-verified-emerald/30">
                      5/5 PASS
                    </span>
                  </div>
                  <div className="flex flex-col gap-space-sm">
                    {[
                      { title: 'PRD §6: Domain Whitelist', desc: 'Strict Regex enforcement of @*.study.iitm.ac.in handles on login.' },
                      { title: 'PRD §10: Verification Gateway', desc: 'Google Forms webhook & student registry passport sync online.' },
                      { title: 'PRD §12: In-House MCQ Engine', desc: 'Active timeout auto-submit, negative marking, and tie-breakers.' },
                      { title: 'PRD §14: Democratic Polls', desc: '1-vote-per-student tokenized quorum enforcement.' },
                      { title: 'PRD §16: Open WebOps', desc: 'All state commits validated against local JSON schema.' }
                    ].map((rule, idx) => (
                      <div key={idx} className="p-space-sm rounded bg-surface-container flex items-start gap-space-sm border border-carbon-border">
                        <span className="material-symbols-outlined text-verified-emerald text-[18px] shrink-0 mt-0.5">check_circle</span>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-text-bright font-bold">{rule.title}</span>
                          <span className="font-body-sm text-[11px] text-text-dim">{rule.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS & POP-UPS */}
          {activeTab === 'announcements' && (
            <div className="bg-surface-container-low rounded-xl p-space-xl border border-carbon-border space-y-6 shadow-xl">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-text-bright uppercase font-bold">
                  Announcement Dispatch System
                </h2>
                <p className="font-body-md text-body-md text-text-dim">
                  Manage the site-wide announcement modal and top broadcast marquee ticker shown to all visiting students.
                </p>
              </div>

              <form onSubmit={handleSaveAnnouncement} className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-surface-container border border-carbon-border">
                  <input
                    type="checkbox"
                    id="annEnabled"
                    checked={annEnabled}
                    onChange={(e) => setAnnEnabled(e.target.checked)}
                    className="w-5 h-5 rounded bg-surface-container-highest accent-primary-container cursor-pointer"
                  />
                  <label htmlFor="annEnabled" className="font-label-md text-label-md text-text-bright uppercase font-bold cursor-pointer">
                    Enable Active Pop-up &amp; Broadcast Announcement
                  </label>
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Announcement Headline</label>
                  <input
                    type="text"
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container"
                  />
                </div>

                <div>
                  <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Announcement Body</label>
                  <textarea
                    rows="3"
                    value={annDesc}
                    onChange={(e) => setAnnDesc(e.target.value)}
                    className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">CTA Button Label</label>
                    <input
                      type="text"
                      value={annCtaText}
                      onChange={(e) => setAnnCtaText(e.target.value)}
                      className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">CTA Destination</label>
                    <input
                      type="text"
                      value={annCtaUrl}
                      onChange={(e) => setAnnCtaUrl(e.target.value)}
                      className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold uppercase hover:bg-primary transition-all shadow-md cursor-pointer"
                >
                  Save &amp; Broadcast Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: TOURNAMENT OPS */}
          {activeTab === 'tournaments' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl">
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold mb-4">
                  Create Sanctioned Tournament
                </h3>
                <form onSubmit={handleCreateEvent} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Game (e.g. Valorant, BGMI)"
                    value={newEventGame}
                    onChange={(e) => setNewEventGame(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <input
                    type="text"
                    placeholder="Prize Pool (e.g. ₹15,000)"
                    value={newEventPrize}
                    onChange={(e) => setNewEventPrize(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <input
                    type="text"
                    placeholder="Format (e.g. 5v5 Single Elim)"
                    value={newEventFormat}
                    onChange={(e) => setNewEventFormat(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <input
                    type="text"
                    placeholder="Date & Time"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <button
                    type="submit"
                    className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold uppercase rounded-lg px-4 py-2 hover:bg-primary transition-all cursor-pointer"
                  >
                    Deploy Event
                  </button>
                </form>
              </div>

              {/* Tournament List */}
              <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl">
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold mb-4">
                  Existing Tournaments ({events.length})
                </h3>
                <div className="space-y-3">
                  {events.map((evt) => (
                    <div key={evt.id} className="p-3 rounded-lg bg-surface-container border border-carbon-border flex items-center justify-between">
                      <div>
                        <span className="font-bold text-text-bright block">{evt.title}</span>
                        <span className="text-text-dim text-xs">{evt.game} • {evt.prizePool} • {evt.format}</span>
                      </div>
                      <button
                        onClick={() => deleteEvent(evt.id)}
                        className="px-3 py-1 rounded bg-alert-crimson/20 text-alert-crimson hover:bg-alert-crimson hover:text-white font-label-sm text-xs font-bold transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GAMES DIRECTORY */}
          {activeTab === 'games' && (
            <div className="space-y-6">
              <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl">
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold mb-4">
                  Add Sanctioned Game
                </h3>
                <form onSubmit={handleCreateGame} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <input
                    type="text"
                    placeholder="Game Name"
                    value={newGameTitle}
                    onChange={(e) => setNewGameTitle(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={newGameCategory}
                    onChange={(e) => setNewGameCategory(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <input
                    type="text"
                    placeholder="Platform"
                    value={newGamePlatform}
                    onChange={(e) => setNewGamePlatform(e.target.value)}
                    className="bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border"
                  />
                  <button
                    type="submit"
                    className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold uppercase rounded-lg px-4 py-2 hover:bg-primary transition-all cursor-pointer"
                  >
                    Add Title
                  </button>
                </form>
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl">
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold mb-4">
                  Active Directory Titles ({games.length})
                </h3>
                <div className="space-y-3">
                  {games.map((g) => (
                    <div key={g.id} className="p-3 rounded-lg bg-surface-container border border-carbon-border flex items-center justify-between">
                      <div>
                        <span className="font-bold text-text-bright block">{g.title}</span>
                        <span className="text-text-dim text-xs">{g.category} • {g.platform} • {g.teamSize}</span>
                      </div>
                      <button
                        onClick={() => deleteGame(g.id)}
                        className="px-3 py-1 rounded bg-alert-crimson/20 text-alert-crimson hover:bg-alert-crimson hover:text-white font-label-sm text-xs font-bold transition-colors cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: QUIZZES */}
          {activeTab === 'quizzes' && (
            <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl space-y-4">
              <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">
                In-House Quizzes ({quizzes.length})
              </h3>
              <div className="space-y-3">
                {quizzes.map((q) => (
                  <div key={q.id} className="p-3 rounded-lg bg-surface-container border border-carbon-border flex items-center justify-between">
                    <div>
                      <span className="font-bold text-text-bright block">{q.title}</span>
                      <span className="text-text-dim text-xs">{q.durationMinutes} Mins • {q.questions?.length} Questions</span>
                    </div>
                    <button
                      onClick={() => deleteQuiz(q.id)}
                      className="px-3 py-1 rounded bg-alert-crimson/20 text-alert-crimson hover:bg-alert-crimson hover:text-white font-label-sm text-xs font-bold transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: POLLS */}
          {activeTab === 'polls' && (
            <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl space-y-4">
              <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">
                Society Referendums ({polls.length})
              </h3>
              <div className="space-y-3">
                {polls.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg bg-surface-container border border-carbon-border flex items-center justify-between">
                    <div>
                      <span className="font-bold text-text-bright block">{p.question}</span>
                      <span className="text-text-dim text-xs">{p.options?.length} Options • Total Votes: {p.options?.reduce((acc, o) => acc + o.votes, 0)}</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-surface-container-high text-primary-container font-mono text-xs">
                      {p.hasVoted ? 'Voted' : 'Active'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: WHITELIST RULES */}
          {activeTab === 'whitelist' && (
            <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border shadow-xl space-y-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">
                  Institutional Student Domain Whitelist (PRD §6)
                </h3>
                <p className="font-body-sm text-text-dim">
                  Configured regex domain suffixes accepted by Google SSO and Student Authentication.
                </p>
              </div>

              <form onSubmit={handleAddDomain} className="flex gap-3 max-w-md">
                <input
                  type="text"
                  placeholder="@study.iitm.ac.in"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="flex-1 bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border font-mono text-sm"
                />
                <button
                  type="submit"
                  className="bg-primary-container text-on-primary-container font-label-md text-label-md font-bold uppercase rounded-lg px-4 py-2 hover:bg-primary transition-all cursor-pointer"
                >
                  Add Rule
                </button>
              </form>

              <div className="space-y-2">
                {allowedDomains.map((dom, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-surface-container border border-carbon-border flex items-center justify-between max-w-md">
                    <span className="font-mono text-sm text-text-bright">{dom}</span>
                    <button
                      onClick={() => removeAllowedDomain(dom)}
                      className="text-alert-crimson hover:underline font-label-sm text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
