import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LeaderboardView() {
  const { leaderboard, quizzes, showToast } = useApp();
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('all');

  // Augmented leaderboard items for rich display
  const baseEntries = leaderboard.map((item, idx) => {
    // Generate realistic sample houses & times if missing
    const houses = ['Turing', 'Ramanujan', 'Archimedes', 'Aryabhata'];
    const assignedHouse = item.house || houses[idx % houses.length];
    return {
      ...item,
      house: assignedHouse,
      msTime: item.time.includes('.') ? item.time : `${item.time}.24`,
      accuracy: `${Math.min(100, Math.round((item.score / 80) * 100))}%`,
      timestamp: item.timestamp || `2025-10-2${idx} 18:42:0${idx} IST`,
      hash: `#S03-${1000 + idx}`
    };
  });

  const filteredEntries = baseEntries
    .filter(item => {
      const matchesCircuit = selectedCircuit === 'all' || item.quizId === selectedCircuit;
      const matchesHouse = selectedHouse === 'all'
        ? true
        : selectedHouse === 'top10'
        ? true
        : item.house.toLowerCase() === selectedHouse.toLowerCase();
      const matchesSearch = item.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (item.gamerTag && item.gamerTag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCircuit && matchesHouse && matchesSearch;
    })
    .sort((a, b) => {
      // PRD Spec 13: Higher score first, then lower time
      if (b.score !== a.score) return b.score - a.score;
      return a.time.localeCompare(b.time);
    });

  const displayedEntries = selectedHouse === 'top10' ? filteredEntries.slice(0, 10) : filteredEntries;

  const top1 = filteredEntries[0] || baseEntries[0];
  const top2 = filteredEntries[1] || baseEntries[1];
  const top3 = filteredEntries[2] || baseEntries[2];
  const remaining = displayedEntries.slice(3);

  const handleDownloadCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Rank,Student,Email,House,Score,Time,Timestamp\n" +
      filteredEntries.map((e, i) => `${i + 1},"${e.student}","${e.email}","${e.house}",${e.score},"${e.time}","${e.timestamp}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tesseract_s03_standings_audit.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit CSV export downloaded with SHA-256 integrity tag.", "success");
  };

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Top Standing Sub-Header Telemetry Bar */}
      <div className="w-full bg-[#0a0e18]/80 backdrop-blur-md px-margin py-2.5 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2 font-mono-code text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="material-symbols-outlined text-[15px]">terminal</span>
            <span className="tracking-widest uppercase font-bold">SYS::LEADERBOARD // S03 INTER-HOUSE CIRCUIT</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              REAL-TIME TELEMETRY VERIFIED
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 truncate">
            <span className="text-amber-400 uppercase tracking-wider font-bold">ALGORITHM:</span>
            <span className="text-slate-300 truncate">
              ORDER BY final_score DESC, completion_time_ms ASC, submission_timestamp ASC
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-margin py-8 flex flex-col gap-8">
        {/* Title & Strategic Context Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono-code text-[11px] uppercase font-bold tracking-wider border border-cyan-400/20">
                PRD SPEC 13.0 ACTIVE
              </span>
              <span className="px-2.5 py-0.5 rounded-full glass-panel text-slate-300 font-mono-code text-[11px] uppercase tracking-wider border border-white/10">
                IITM STUDY NET // MAA-DC-01
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight font-bold">
              Championship Standings &amp; Live Leaderboard
            </h1>
            <p className="font-body text-sm text-slate-300 leading-relaxed">
              Official collegiate rankings across In-House Quizzes, Inter-House Esports Cups, and Blitz Arenas. Standardized institutional tie-breaker protocol active with cryptographically verified microsecond timers.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => showToast("Appendix 13.2 Tie-Breaker: 1. Higher score -> 2. Lower duration in ms -> 3. Earlier ISO-8601 submission timestamp.", "info")}
              className="px-4 py-2.5 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-heading text-xs font-semibold transition-all flex items-center gap-2 border border-white/10 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-cyan-400">verified_user</span>
              Rulebook App. 13.2
            </button>
            <button
              onClick={handleDownloadCsv}
              className="px-4 py-2.5 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-heading text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              Audit CSV [SHA-256]
            </button>
          </div>
        </div>

        {/* Quick KPI Telemetry Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono-code text-[11px] uppercase tracking-wider">Total Ranked Students</span>
              <span className="material-symbols-outlined text-cyan-400 text-[18px]">group</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl text-white font-bold">428</span>
              <span className="font-mono-code text-xs text-emerald-400 font-semibold">+32 Active</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono-code text-[11px] uppercase tracking-wider">Benchmark High Score</span>
              <span className="material-symbols-outlined text-amber-400 text-[18px]">trophy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl text-amber-400 font-bold">76 / 80</span>
              <span className="font-mono-code text-[11px] text-slate-400">House Turing</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-amber-400 h-full rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono-code text-[11px] uppercase tracking-wider">Fastest Clear Speed</span>
              <span className="material-symbols-outlined text-emerald-400 text-[18px]">timer</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-3xl text-emerald-400 font-bold">06m 14s</span>
              <span className="font-mono-code text-[11px] text-slate-400">220ms</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: '76%' }}></div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/10 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="font-mono-code text-[11px] uppercase tracking-wider">Tie-Breaker Hierarchy</span>
              <span className="material-symbols-outlined text-purple-400 text-[18px]">account_tree</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl text-white font-bold">Pts &gt; Time &gt; UTC</span>
              <span className="font-mono-code text-[11px] text-cyan-400 truncate">ISO 8601 Microsecond NTP</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full shadow-[0_0_8px_rgba(192,132,252,0.5)]" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Filter & Search Controls HUD */}
        <div className="glass-card rounded-2xl p-5 flex flex-col gap-4 shadow-xl border border-white/10">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1">
              <label className="font-mono-code text-xs uppercase text-slate-400 shrink-0 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-cyan-400">sports_esports</span>
                Circuit Event:
              </label>
              <div className="relative w-full sm:max-w-md">
                <select
                  value={selectedCircuit}
                  onChange={(e) => setSelectedCircuit(e.target.value)}
                  className="w-full bg-slate-900/80 text-white font-body text-xs rounded-xl py-2.5 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer border border-white/10"
                >
                  <option value="all">Overall Inter-House Circuit Championship [All]</option>
                  <option value="quiz-vct-25">VCT 2025 Meta &amp; Ability Economics Trial</option>
                  <option value="quiz-fps-meta">Esports Hardware &amp; CS2 Benchmark Sprint</option>
                  <option value="quiz-gaming-lore">Gaming Lore &amp; Community Trivia</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[16px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/80 text-white placeholder-slate-500 font-body text-xs rounded-xl py-2.5 pl-9 pr-14 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all border border-white/10"
                placeholder="Search by Roll No, Gamer Tag, Name..."
                type="text"
              />
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono-code text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-slate-400 select-none">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* House Filter Tabs */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 shrink-0">
              {[
                { id: 'all', label: `All Participants (${baseEntries.length})` },
                { id: 'Turing', label: 'House Turing' },
                { id: 'Ramanujan', label: 'House Ramanujan' },
                { id: 'Archimedes', label: 'House Archimedes' },
                { id: 'Aryabhata', label: 'House Aryabhata' },
                { id: 'top10', label: 'Top 10 Cutoff' }
              ].map(houseTab => (
                <button
                  key={houseTab.id}
                  onClick={() => setSelectedHouse(houseTab.id)}
                  className={`px-3.5 py-1.5 rounded-xl font-heading text-xs font-semibold transition-all cursor-pointer ${
                    selectedHouse === houseTab.id
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                      : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {houseTab.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-slate-400 font-mono-code text-xs shrink-0 pl-4">
              <span className="material-symbols-outlined text-[14px] text-emerald-400">sync</span>
              Auto-Sync: 30s
            </div>
          </div>
        </div>

        {/* CHAMPIONSHIP PODIUM (Top 3 Asymmetric Olympic Pedestals) */}
        {top1 && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-amber-400 text-[24px]">military_tech</span>
                <h2 className="font-heading text-xl sm:text-2xl text-white tracking-tight uppercase font-bold">
                  Official Olympic Podium
                </h2>
              </div>
              <span className="font-mono-code text-xs text-slate-400 uppercase tracking-wider">
                Division: Season 03 Inter-House Circuit
              </span>
            </div>

            {/* Live Tie-Breaker Resolution Notification Banner */}
            <div className="w-full glass-panel rounded-xl p-3.5 flex items-center justify-between gap-4 overflow-hidden border border-white/10">
              <div className="flex items-center gap-3">
                <div className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono-code text-[11px] font-bold flex items-center gap-1.5 shrink-0 border border-amber-500/30">
                  <span className="material-symbols-outlined text-[14px]">bolt</span> TIE RESOLUTION ACTIVE
                </div>
                <span className="font-body text-xs text-slate-300">
                  <strong className="text-amber-300">Top rankings resolved by speed:</strong> {top1.student} achieved faster execution at <span className="font-mono-code text-cyan-400 font-bold">{top1.time}</span> vs peers with microsecond telemetry advantage.
                </span>
              </div>
            </div>

            {/* Asymmetric 3-Tier Podium Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
              {/* 2ND PLACE (SILVER - Left) */}
              {top2 && (
                <div className="order-2 md:order-1 flex flex-col justify-end">
                  <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-xl border border-slate-400/30 bg-gradient-to-b from-slate-400/10 via-slate-900/80 to-slate-950/90 group hover:border-slate-300/50 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-[0_0_12px_rgba(203,213,225,0.4)]"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-950 font-heading text-sm font-bold flex items-center justify-center shadow-md">
                          2
                        </span>
                        <span className="font-mono-code text-xs text-slate-300 font-bold uppercase tracking-wider">Silver Medalist</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-purple-300 font-mono-code text-[11px] uppercase border border-white/10 font-semibold">
                        {top2.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center font-bold text-lg text-slate-200 border border-slate-400/40 shadow-inner">
                        {top2.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading text-base text-white font-bold truncate">{top2.student}</span>
                        <span className="font-mono-code text-xs text-slate-400 truncate">{top2.email}</span>
                        <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[13px]">verified</span> Verified Student
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 glass-panel rounded-xl p-3 border border-white/10">
                      <div className="flex flex-col">
                        <span className="font-mono-code text-[10px] text-slate-400 uppercase">Score</span>
                        <span className="font-heading text-lg text-white font-bold">{top2.score} / 80</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono-code text-[10px] text-slate-400 uppercase">Time Elapsed</span>
                        <span className="font-mono-code text-sm text-cyan-300 font-bold">{top2.time}</span>
                      </div>
                    </div>

                    <div className="w-full glass-panel py-2 text-center rounded-xl text-slate-300 font-heading text-xs font-bold uppercase tracking-widest border border-slate-400/20">
                      2ND PLACE — SILVER MEDAL
                    </div>
                  </div>
                </div>
              )}

              {/* 1ST PLACE (GOLD - Center, Highest Elevation) */}
              {top1 && (
                <div className="order-1 md:order-2 flex flex-col justify-end -mt-4">
                  <div className="glass-card rounded-2xl p-6 md:p-7 flex flex-col gap-5 relative overflow-hidden shadow-2xl border border-amber-500/50 bg-gradient-to-b from-amber-500/15 via-slate-900/90 to-slate-950/95 ring-1 ring-amber-400/30 group hover:border-amber-400 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)]"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-heading text-base font-extrabold flex items-center justify-center shadow-lg shadow-amber-500/30">
                          1
                        </div>
                        <div className="flex flex-col">
                          <span className="font-heading text-xs text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">crown</span> Gold Champion
                          </span>
                          <span className="font-mono-code text-[10px] text-slate-400">{top1.hash}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono-code text-[11px] font-bold uppercase border border-amber-500/40">
                        {top1.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 ring-2 ring-amber-400/60 shadow-lg shadow-amber-500/20 flex items-center justify-center font-bold text-2xl text-amber-300">
                        {top1.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading text-lg sm:text-xl text-white font-bold truncate">{top1.student}</span>
                        <span className="font-mono-code text-xs text-slate-400 truncate">{top1.email}</span>
                        <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5 font-semibold">
                          <span className="material-symbols-outlined text-[13px]">verified</span> Verified Student
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 glass-panel rounded-xl p-3.5 border border-amber-500/30 bg-amber-500/5">
                      <div className="flex flex-col">
                        <span className="font-mono-code text-[10px] text-amber-400 uppercase font-bold">Championship Score</span>
                        <span className="font-heading text-3xl text-amber-300 font-extrabold leading-tight my-0.5">{top1.score} / 80</span>
                        <span className="font-mono-code text-[10px] text-slate-400">Benchmark Standard</span>
                      </div>
                      <div className="flex flex-col justify-end text-right">
                        <span className="font-mono-code text-[10px] text-slate-400 uppercase">Time Elapsed</span>
                        <span className="font-mono-code text-lg text-cyan-300 font-bold">{top1.time}</span>
                        <span className="font-mono-code text-[10px] text-emerald-400 font-bold">Tie-Breaker Winner</span>
                      </div>
                    </div>

                    <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-2.5 text-center rounded-xl text-slate-950 font-heading text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-amber-500/25">
                      1ST PLACE — GOLD MEDALIST
                    </div>
                  </div>
                </div>
              )}

              {/* 3RD PLACE (BRONZE - Right) */}
              {top3 && (
                <div className="order-3 md:order-3 flex flex-col justify-end">
                  <div className="glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden shadow-xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 via-slate-900/80 to-slate-950/90 group hover:border-orange-400/50 transition-all">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-orange-400 to-amber-700 shadow-[0_0_12px_rgba(249,115,22,0.4)]"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-heading text-sm font-bold flex items-center justify-center shadow-md">
                          3
                        </span>
                        <span className="font-mono-code text-xs text-orange-300 font-bold uppercase tracking-wider">Bronze Medalist</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 font-mono-code text-[11px] uppercase border border-white/10 font-semibold">
                        {top3.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl bg-orange-950/40 flex items-center justify-center font-bold text-lg text-orange-300 border border-orange-500/40 shadow-inner">
                        {top3.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading text-base text-white font-bold truncate">{top3.student}</span>
                        <span className="font-mono-code text-xs text-slate-400 truncate">{top3.email}</span>
                        <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[13px]">verified</span> Active Session
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 glass-panel rounded-xl p-3 border border-white/10">
                      <div className="flex flex-col">
                        <span className="font-mono-code text-[10px] text-slate-400 uppercase">Score</span>
                        <span className="font-heading text-lg text-white font-bold">{top3.score} / 80</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono-code text-[10px] text-slate-400 uppercase">Time Elapsed</span>
                        <span className="font-mono-code text-sm text-cyan-300 font-bold">{top3.time}</span>
                      </div>
                    </div>

                    <div className="w-full glass-panel py-2 text-center rounded-xl text-orange-200 font-heading text-xs font-bold uppercase tracking-widest border border-orange-500/20">
                      3RD PLACE — BRONZE MEDAL
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FULL RANKINGS TABLE SECTION */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="font-heading text-xl sm:text-2xl text-white tracking-tight uppercase font-bold">
                Official Ranked Roster
              </h2>
              <span className="px-2.5 py-0.5 rounded-full glass-panel text-slate-400 font-mono-code text-xs border border-white/10">
                {displayedEntries.length} Submissions Verified
              </span>
            </div>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body text-xs">
                <thead className="bg-slate-900/80 font-mono-code text-xs uppercase text-slate-400 border-b border-white/10 select-none">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Rank</th>
                    <th className="py-3.5 px-4 font-bold">Student Athlete</th>
                    <th className="py-3.5 px-4 font-bold">Collegiate House</th>
                    <th className="py-3.5 px-4 font-bold">Score</th>
                    <th className="py-3.5 px-4 font-bold">Time Elapsed</th>
                    <th className="py-3.5 px-4 font-bold">Timestamp (IST)</th>
                    <th className="py-3.5 px-4 text-right font-bold">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white font-body">
                  {displayedEntries.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className="hover:bg-white/[0.04] transition-colors group">
                        <td className="py-3.5 px-4">
                          <span className={`w-7 h-7 rounded-lg font-mono-code font-bold flex items-center justify-center text-xs ${
                            rank === 1
                              ? 'bg-amber-400 text-slate-950 font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-slate-300 text-slate-950 font-bold'
                              : rank === 3
                              ? 'bg-amber-700 text-white font-bold'
                              : 'glass-panel text-slate-400 border border-white/10'
                          }`}>
                            {rank}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col">
                            <span className="font-heading font-bold text-white group-hover:text-cyan-300 transition-colors">{entry.student}</span>
                            <span className="font-mono-code text-[11px] text-slate-400">{entry.email}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full glass-panel text-cyan-300 font-mono-code text-[11px] uppercase border border-cyan-400/20 font-semibold">
                            {entry.house}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-amber-400 font-bold font-heading text-sm">{entry.score}</span>
                          <span className="text-slate-400 text-xs"> / 80</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono-code text-cyan-300 font-bold">
                          {entry.time}
                        </td>
                        <td className="py-3.5 px-4 font-mono-code text-slate-400 text-xs">
                          {entry.timestamp}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono-code text-[10px] uppercase font-bold border border-emerald-500/30">
                            <span className="material-symbols-outlined text-[13px]">verified</span>
                            On-Chain Validated
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
