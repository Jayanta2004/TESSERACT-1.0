import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ProfileView() {
  const {
    user,
    accountState,
    updateUserProfile,
    events,
    quizzes,
    polls,
    setIsAuthModalOpen
  } = useApp();

  const [activeTab, setActiveTab] = useState('tournaments');
  const [isEditing, setIsEditing] = useState(false);
  const [copiedSha, setCopiedSha] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user?.name || 'Aarav Sharma');
  const [editGamerTag, setEditGamerTag] = useState(user?.gamerTag || 'VORTEX_IITM');
  const [editBio, setEditBio] = useState(user?.bio || 'Competitive Valorant Duelist (Initiator flex), CS2 rifler, and collegiate mind sports competitor.');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  if (!user || accountState === 'guest') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-surface-container border border-carbon-border mx-auto flex items-center justify-center text-primary-container shadow-xl">
          <span className="material-symbols-outlined text-[32px]">lock</span>
        </div>
        <h2 className="font-headline-xl text-2xl sm:text-headline-xl font-bold text-text-bright uppercase">
          Sign In to Access Student Passport
        </h2>
        <p className="text-body-md text-text-dim max-w-md mx-auto">
          Authenticate with your verified IIT Madras BS student institutional identity to view your collegiate esports passport, registered tournaments, and verification credentials.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold hover:bg-primary transition-all shadow-[0_0_16px_rgba(0,240,255,0.3)] cursor-pointer"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  const handleCopySha = () => {
    const sha = `SHA256:8f2a1b9c3e4d5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a [${user.email}]`;
    navigator.clipboard?.writeText(sha);
    setCopiedSha(true);
    setTimeout(() => setCopiedSha(false), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      gamerTag: editGamerTag,
      bio: editBio,
      avatar: editAvatar || user.avatar
    });
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Profile Ambient Cybernetic Grid Overlay */}
      <div className="relative w-full max-w-7xl mx-auto px-margin py-space-lg flex flex-col gap-space-lg">
        {/* Section 1: Top Profile Telemetry Context Bar */}
        <div className="w-full bg-surface-container-lowest/90 backdrop-blur-md rounded-xl p-space-md flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md shadow-xl border border-carbon-border">
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="flex items-center gap-2 bg-surface-container-high px-2.5 py-1 rounded border border-carbon-border">
              <div className="w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></div>
              <span className="font-label-sm text-label-sm text-primary-container tracking-wider uppercase font-semibold">
                SYS::IDENTITY // PASSPORT
              </span>
            </div>
            <span className="text-outline-variant font-label-sm">|</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm font-semibold border border-primary-container/20">
              <span className="material-symbols-outlined text-[14px]">shield</span>
              <span>HOUSE {user.house?.toUpperCase() || 'ARCHIMEDES'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm border border-carbon-border">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>TERM 4 — DIPLOMA LEVEL</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-verified-emerald/15 text-verified-emerald font-label-sm text-label-sm font-bold border border-verified-emerald/30">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              <span>INSTITUTIONAL KERNEL VERIFIED // CLEARED</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={() => alert(`Exporting Official Tesseract Passport PDF for ${user.name} (${user.rollNumber})`)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-all shadow-sm border border-carbon-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-text-dim">download</span>
              <span>Export Card (PDF)</span>
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert("Passport URL copied to clipboard!");
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container/20 hover:bg-primary-container/30 text-primary-container font-label-sm text-label-sm transition-all shadow-sm border border-primary-container/40 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">share</span>
              <span>Share Passport</span>
            </button>
          </div>
        </div>

        {/* Section 2: Player Identity Passport Card */}
        <div className="relative w-full bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-low rounded-xl p-space-lg md:p-space-xl shadow-xl overflow-hidden border border-carbon-border">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col xl:flex-row items-start justify-between gap-space-xl">
            {/* Left: Avatar Block */}
            <div className="flex flex-col sm:flex-row xl:flex-col items-center sm:items-start xl:items-center gap-space-md shrink-0 w-full sm:w-auto">
              <div className="relative group">
                <div className="w-36 h-36 rounded-xl overflow-hidden p-1 bg-gradient-to-tr from-primary-container via-surface-container-highest to-verified-emerald shadow-lg">
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={user.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                    alt={user.name}
                  />
                </div>
                <div className="absolute -bottom-2.5 -right-2 bg-surface-container-lowest px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md border border-carbon-border">
                  <span className="material-symbols-outlined text-verified-emerald text-[14px]">verified</span>
                  <span className="font-label-sm text-[9px] text-verified-emerald font-bold tracking-tight">IITM AUTH</span>
                </div>
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded-full border border-carbon-border">
                  <div className="w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></div>
                  <span className="font-label-sm text-[8px] text-on-surface">ONLINE</span>
                </div>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1 text-text-dim hover:text-primary-container font-label-sm text-label-sm transition-colors py-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">photo_camera</span>
                <span>Update Holo-Avatar</span>
              </button>

              {/* House Insignia Crest */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-high w-full justify-center border border-carbon-border">
                <span className="material-symbols-outlined text-admin-amber text-[18px]">workspace_premium</span>
                <div className="flex flex-col text-left">
                  <span className="font-label-sm text-[9px] text-text-dim tracking-wider uppercase">Inter-House Division</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{user.house || 'House Archimedes'}</span>
                </div>
              </div>
            </div>

            {/* Center: Detailed Institutional & Gaming Telemetry */}
            <div className="flex-1 flex flex-col gap-space-md min-w-0 w-full">
              <div className="flex flex-wrap items-baseline gap-space-sm">
                <h1 className="font-headline-xl text-3xl sm:text-headline-xl text-text-bright tracking-tight leading-none uppercase">
                  {user.gamerTag || 'VORTEX_IITM'}
                </h1>
                <span className="font-label-lg text-label-lg text-primary-container font-bold">#8842</span>
                <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-on-tertiary-container font-label-sm text-label-sm uppercase font-semibold border border-tertiary-container/40">
                  Tier-1 Varsity
                </span>
              </div>

              {/* Institutional Credentials */}
              <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 font-label-md text-label-md text-on-surface-variant bg-surface-container-lowest/60 px-3 py-2 rounded-lg border border-carbon-border">
                <span className="flex items-center gap-1.5 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-primary-container">badge</span>
                  <span>{user.name}</span>
                </span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-text-bright tracking-wider">ROLL: {user.rollNumber}</span>
                <span className="text-outline-variant">•</span>
                <span className="font-label-sm text-label-sm text-text-dim">{user.email}</span>
              </div>

              {/* Bio */}
              <p className="font-body-md text-body-md text-on-surface leading-relaxed max-w-2xl">
                {user.bio || 'Competitive collegiate esports competitor & student researcher at IIT Madras BS in Data Science & Applications.'}
              </p>

              {/* Gaming Handles pills */}
              <div className="flex flex-wrap items-center gap-space-xs pt-1">
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 border border-carbon-border">
                  <span className="material-symbols-outlined text-[12px]">sports_esports</span>
                  <span>Valorant: {user.gameHandles?.valorant || 'VORTEX#8842'}</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 border border-carbon-border">
                  <span className="material-symbols-outlined text-[12px]">forum</span>
                  <span>Discord: {user.gameHandles?.discord || 'vortex_bs#1337'}</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm flex items-center gap-1 border border-carbon-border">
                  <span className="material-symbols-outlined text-[12px]">chess</span>
                  <span>Chess: {user.gameHandles?.chess || 'vortex_iitm (1740)'}</span>
                </span>
                <span className="px-2.5 py-1 rounded bg-secondary-container/30 text-secondary-fixed font-label-sm text-label-sm font-medium border border-secondary/30">
                  Tactical IGL
                </span>
              </div>

              {/* Favorite Sanctioned Games */}
              <div className="flex items-center gap-space-sm pt-2">
                <span className="font-label-sm text-[10px] uppercase text-text-dim tracking-wider">Sanctioned Disciplines:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-label-sm font-label-sm text-text-bright border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson"></span>
                    <span>Valorant</span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-label-sm font-label-sm text-text-bright border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-admin-amber"></span>
                    <span>CS2</span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-label-sm font-label-sm text-text-bright border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                    <span>BGMI</span>
                  </div>
                  <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded text-label-sm font-label-sm text-text-bright border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald"></span>
                    <span>Chess Blitz</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Telemetry KPI Micro-Tiles & Quick Triggers */}
            <div className="flex flex-col gap-space-md w-full xl:w-72 shrink-0">
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex flex-col justify-between border border-carbon-border">
                  <span className="font-label-sm text-[9px] text-text-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Competitions</span>
                    <span className="material-symbols-outlined text-[13px] text-primary-container">trophy</span>
                  </span>
                  <div className="mt-1">
                    <span className="font-headline-md text-headline-md text-text-bright leading-none font-bold">
                      {user.registeredEvents?.length || 3}
                    </span>
                    <span className="font-label-sm text-label-sm text-text-dim ml-0.5">Events</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex flex-col justify-between border border-carbon-border">
                  <span className="font-label-sm text-[9px] text-text-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Quiz Standings</span>
                    <span className="material-symbols-outlined text-[13px] text-verified-emerald">quiz</span>
                  </span>
                  <div className="mt-1">
                    <span className="font-headline-md text-headline-md text-verified-emerald leading-none font-bold">#03</span>
                    <span className="font-label-sm text-label-sm text-text-dim ml-0.5">Overall</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex flex-col justify-between border border-carbon-border">
                  <span className="font-label-sm text-[9px] text-text-dim uppercase tracking-wider flex items-center justify-between">
                    <span>Democratic Polls</span>
                    <span className="material-symbols-outlined text-[13px] text-secondary">how_to_vote</span>
                  </span>
                  <div className="mt-1">
                    <span className="font-headline-md text-headline-md text-text-bright leading-none font-bold">
                      {polls.filter(p => p.hasVoted).length || 4}
                    </span>
                    <span className="font-label-sm text-[10px] text-primary-container ml-0.5">100% Cast</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest/80 p-space-sm rounded-lg flex flex-col justify-between border border-carbon-border">
                  <span className="font-label-sm text-[9px] text-text-dim uppercase tracking-wider flex items-center justify-between">
                    <span>House Delta</span>
                    <span className="material-symbols-outlined text-[13px] text-admin-amber">stars</span>
                  </span>
                  <div className="mt-1">
                    <span className="font-headline-md text-headline-md text-admin-amber leading-none font-bold">+255</span>
                    <span className="font-label-sm text-label-sm text-text-dim ml-0.5">PTS</span>
                  </div>
                </div>
              </div>

              {/* Passport Action Buttons */}
              <div className="flex flex-col gap-space-xs mt-1">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full py-2.5 px-3 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md font-bold uppercase tracking-wider hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">edit_square</span>
                  <span>Edit Identity Data</span>
                </button>
                <button
                  onClick={handleCopySha}
                  className="w-full py-2 px-3 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-text-dim hover:text-on-surface font-label-sm text-label-sm transition-all flex items-center justify-center gap-1.5 border border-carbon-border cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>{copiedSha ? 'Copied SHA Checksum!' : 'Copy SHA-256 Checksum'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Participation Tabs & Dashboard */}
        <div className="w-full flex flex-col gap-space-lg">
          {/* Tab Navigation Bar */}
          <div className="w-full bg-surface-container-low rounded-xl p-1.5 flex flex-wrap items-center justify-start gap-1 shadow-md border border-carbon-border">
            {[
              { id: 'tournaments', label: 'My Tournaments', count: user.registeredEvents?.length || 3, icon: 'military_tech' },
              { id: 'quizzes', label: 'Quiz Arena History', count: 4, icon: 'psychology' },
              { id: 'polls', label: 'Democratic Referendums', count: polls.filter(p => p.hasVoted).length || 4, icon: 'ballot' },
              { id: 'badges', label: 'Achievements & Badges', count: 8, icon: 'award_star' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button flex items-center gap-2 px-4 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-md'
                    : 'text-text-dim hover:text-on-surface hover:bg-surface-container font-medium'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full font-label-sm text-[10px] ${
                  activeTab === tab.id
                    ? 'bg-on-primary-container/20 text-on-primary-container'
                    : 'bg-surface-container-highest text-text-bright'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* TAB 1: MY TOURNAMENTS */}
          {activeTab === 'tournaments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
              {events.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  className="bg-surface-container rounded-xl p-space-lg flex flex-col justify-between shadow-xl relative overflow-hidden border border-carbon-border"
                >
                  <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-alert-crimson via-primary-container to-verified-emerald"></div>
                  <div className="flex flex-col gap-space-md">
                    <div className="flex items-start justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-alert-crimson/20 text-alert-crimson font-label-sm text-label-sm font-bold flex items-center gap-1 border border-alert-crimson/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson animate-pulse"></span>
                        <span>ACTIVE REGISTRATION</span>
                      </span>
                      <span className="font-label-sm text-label-sm text-text-dim">SEASON 03</span>
                    </div>
                    <div>
                      <h3 className="font-headline-md text-headline-md text-text-bright leading-tight uppercase font-bold">
                        {evt.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-text-dim mt-1">{evt.game} • {evt.format}</p>
                    </div>
                    <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-1.5 font-label-sm text-label-sm border border-carbon-border">
                      <div className="flex items-center justify-between text-text-dim">
                        <span>Squad / Role:</span>
                        <span className="text-text-bright font-bold">Archimedes Apex (Starter / IGL)</span>
                      </div>
                      <div className="flex items-center justify-between text-text-dim">
                        <span>Schedule:</span>
                        <span className="text-on-surface">{evt.date} • {evt.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: QUIZ HISTORY */}
          {activeTab === 'quizzes' && (
            <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border space-y-4 shadow-xl">
              <h3 className="font-headline-md text-headline-md text-text-bright uppercase">Verified Assessment Ledger</h3>
              <div className="divide-y divide-carbon-border text-body-sm">
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-text-bright block">VCT 2025 Meta &amp; Ability Economics Trial</span>
                    <span className="text-text-dim text-xs font-mono">Oct 28, 2025 • 08m 42s elapsed</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-verified-emerald text-base block">64 / 80 Marks</span>
                    <span className="text-primary-container text-xs font-mono">Rank #03 Overall</span>
                  </div>
                </div>
                <div className="py-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-text-bright block">IITM BS Computing &amp; Algo Logic Arena: Sprint 01</span>
                    <span className="text-text-dim text-xs font-mono">Oct 20, 2025 • 06m 14s elapsed</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-verified-emerald text-base block">72 / 100 Marks</span>
                    <span className="text-primary-container text-xs font-mono">Rank #04 Overall</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DEMOCRATIC REFERENDUMS */}
          {activeTab === 'polls' && (
            <div className="bg-surface-container-low rounded-xl p-space-lg border border-carbon-border space-y-4 shadow-xl">
              <h3 className="font-headline-md text-headline-md text-text-bright uppercase">Sealed Ballot History</h3>
              <div className="divide-y divide-carbon-border text-body-sm">
                {polls.map((poll) => (
                  <div key={poll.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-text-bright block">{poll.question}</span>
                      <span className="text-text-dim text-xs font-mono">SHA-256 Receipt: 0x9e12...b4f</span>
                    </div>
                    <span className="px-2 py-1 rounded bg-verified-emerald/20 text-verified-emerald font-label-sm text-xs font-bold border border-verified-emerald/30">
                      BALLOT ANCHORED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: BADGES */}
          {activeTab === 'badges' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
              {[
                { title: 'Podium Finisher', desc: 'Top 3 in Sanctioned Quiz Arena', icon: 'military_tech', color: 'text-admin-amber' },
                { title: 'Vanguard Inspected', desc: 'Hardware anti-cheat clean sheet', icon: 'verified_user', color: 'text-verified-emerald' },
                { title: 'Active Voter', desc: '100% Democratic Poll attendance', icon: 'how_to_vote', color: 'text-primary-container' },
                { title: 'Inter-House Starter', desc: 'Rostered 5v5 Tactical IGL', icon: 'swords', color: 'text-secondary' },
              ].map((badge, idx) => (
                <div key={idx} className="bg-surface-container p-space-md rounded-xl flex flex-col items-center text-center gap-2 border border-carbon-border">
                  <span className={`material-symbols-outlined text-[36px] ${badge.color}`}>{badge.icon}</span>
                  <span className="font-label-md text-label-md text-text-bright font-bold uppercase">{badge.title}</span>
                  <span className="font-body-sm text-[11px] text-text-dim">{badge.desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-space-md">
          <div className="max-w-md w-full rounded-xl bg-surface-container-low border border-carbon-border p-space-lg space-y-space-md shadow-2xl">
            <div className="flex items-center justify-between border-b border-carbon-border pb-space-sm">
              <h3 className="font-headline-md text-headline-md font-bold uppercase text-text-bright">
                Edit Identity Telemetry
              </h3>
              <button
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded bg-surface-container text-text-dim hover:text-text-bright flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Gamer Handle (Tag)</label>
                <input
                  type="text"
                  value={editGamerTag}
                  onChange={(e) => setEditGamerTag(e.target.value)}
                  className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Bio Synopsis</label>
                <textarea
                  rows="3"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container"
                ></textarea>
              </div>

              <div>
                <label className="block font-label-sm text-label-sm text-text-dim uppercase mb-1">Avatar Image URL</label>
                <input
                  type="text"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-surface-container text-text-bright px-3 py-2 rounded-lg border border-carbon-border focus:outline-none focus:border-primary-container text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-carbon-border">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-text-dim hover:text-text-bright font-label-md text-label-md uppercase cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold uppercase tracking-wider shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
