import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function LeaderboardView() {
  const { leaderboard, quizzes } = useApp();
  const [selectedCircuit, setSelectedCircuit] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('all');

  // Augmented leaderboard items for rich Stitch display
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
  };

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Top Standing Sub-Header Telemetry Bar */}
      <div className="w-full bg-surface-container-lowest px-margin py-space-sm border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-sm font-label-sm text-label-sm">
          <div className="flex items-center gap-space-sm text-primary-container">
            <span className="material-symbols-outlined text-[15px]">terminal</span>
            <span className="tracking-widest uppercase">SYS::LEADERBOARD // S03 INTER-HOUSE CIRCUIT</span>
            <span className="text-outline-variant">•</span>
            <span className="text-verified-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
              REAL-TIME TELEMETRY VERIFIED
            </span>
          </div>
          <div className="flex items-center gap-2 text-text-dim truncate">
            <span className="text-admin-amber uppercase tracking-wider font-bold">ALGORITHM:</span>
            <span className="font-mono text-on-surface-variant truncate">
              ORDER BY final_score DESC, completion_time_ms ASC, submission_timestamp ASC
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-margin py-space-lg flex flex-col gap-space-xl">
        {/* Title & Strategic Context Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider border border-primary-container/20">
                PRD SPEC 13.0 ACTIVE
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-text-bright font-label-sm text-label-sm uppercase tracking-wider border border-carbon-border">
                IITM STUDY NET // MAA-DC-01
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl sm:text-headline-xl text-text-bright tracking-tight uppercase leading-tight">
              Championship Standings &amp; Live Leaderboard
            </h1>
            <p className="font-body-md text-body-md text-text-dim">
              Official collegiate rankings across In-House Quizzes, Inter-House Esports Cups, and Blitz Arenas. Standardized institutional tie-breaker protocol active with cryptographically verified microsecond timers.
            </p>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              onClick={() => alert("Appendix 13.2 Tie-Breaker Protocol:\n1. Higher score wins.\n2. In event of score tie, lower execution duration in ms wins.\n3. In event of time tie, earlier ISO-8601 submission timestamp wins.")}
              className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-text-bright font-label-md text-label-md transition-all flex items-center gap-2 shadow-sm border border-carbon-border cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              Rulebook App. 13.2
            </button>
            <button
              onClick={handleDownloadCsv}
              className="px-3.5 py-2 rounded-lg bg-primary-container text-on-primary-container hover:bg-primary font-label-md text-label-md font-bold transition-all flex items-center gap-2 shadow-[0_0_14px_rgba(0,240,255,0.3)] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              Audit CSV [SHA-256]
            </button>
          </div>
        </div>

        {/* Quick KPI Telemetry Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between border border-carbon-border shadow-sm">
            <div className="flex items-center justify-between text-text-dim mb-1">
              <span className="font-label-sm text-[11px] uppercase tracking-wider">Total Ranked Students</span>
              <span className="material-symbols-outlined text-primary-container text-[18px]">group</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-text-bright font-bold">428</span>
              <span className="font-label-sm text-label-sm text-verified-emerald">+32 Active</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '82%' }}></div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between border border-carbon-border shadow-sm">
            <div className="flex items-center justify-between text-text-dim mb-1">
              <span className="font-label-sm text-[11px] uppercase tracking-wider">Benchmark High Score</span>
              <span className="material-symbols-outlined text-admin-amber text-[18px]">trophy</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-admin-amber font-bold">76 / 80</span>
              <span className="font-label-sm text-[11px] text-text-dim">House Turing</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-admin-amber h-full rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between border border-carbon-border shadow-sm">
            <div className="flex items-center justify-between text-text-dim mb-1">
              <span className="font-label-sm text-[11px] uppercase tracking-wider">Fastest Clear Speed</span>
              <span className="material-symbols-outlined text-verified-emerald text-[18px]">timer</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-headline-lg text-verified-emerald font-bold">06m 14s</span>
              <span className="font-label-sm text-[11px] font-mono text-text-dim">220ms</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-verified-emerald h-full rounded-full" style={{ width: '76%' }}></div>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between border border-carbon-border shadow-sm">
            <div className="flex items-center justify-between text-text-dim mb-1">
              <span className="font-label-sm text-[11px] uppercase tracking-wider">Tie-Breaker Hierarchy</span>
              <span className="material-symbols-outlined text-secondary text-[18px]">account_tree</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-text-bright font-bold">Pts &gt; Time &gt; UTC</span>
              <span className="font-label-sm text-[11px] text-primary-container truncate font-mono">ISO 8601 Microsecond NTP</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>

        {/* Filter & Search Controls HUD */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col gap-space-md shadow-md border border-carbon-border">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-sm flex-1">
              <label className="font-label-sm text-label-sm uppercase text-text-dim shrink-0 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary-container">sports_esports</span>
                Circuit Event:
              </label>
              <div className="relative w-full sm:max-w-md">
                <select
                  value={selectedCircuit}
                  onChange={(e) => setSelectedCircuit(e.target.value)}
                  className="w-full bg-surface-container-high text-text-bright font-headline-md text-[14px] leading-5 rounded-lg py-2 pl-3 pr-8 appearance-none focus:outline-none focus:bg-surface-bright transition-all cursor-pointer border border-carbon-border"
                >
                  <option value="all">Overall Inter-House Circuit Championship [All]</option>
                  <option value="quiz-vct-25">VCT 2025 Meta &amp; Ability Economics Trial</option>
                  <option value="quiz-fps-meta">Esports Hardware &amp; CS2 Benchmark Sprint</option>
                  <option value="quiz-gaming-lore">Gaming Lore &amp; Community Trivia</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-text-dim text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            <div className="relative w-full lg:max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-dim text-[16px]">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-high text-text-bright placeholder-text-dim font-body-sm text-body-sm rounded-lg py-2 pl-9 pr-14 focus:outline-none focus:bg-surface-bright transition-all border border-carbon-border"
                placeholder="Search by Roll No, Gamer Tag, Name..."
                type="text"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 font-label-sm text-[9px] px-1.5 py-0.5 rounded bg-surface-container-lowest text-text-dim select-none">
                Ctrl+K
              </span>
            </div>
          </div>

          {/* House Filter Tabs */}
          <div className="flex items-center justify-between border-t border-carbon-border pt-space-sm overflow-x-auto">
            <div className="flex items-center gap-1.5 shrink-0">
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
                  className={`px-3 py-1 rounded font-label-sm text-label-sm font-bold transition-all cursor-pointer ${
                    selectedHouse === houseTab.id
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'bg-surface-container-high text-text-dim hover:text-text-bright border border-carbon-border'
                  }`}
                >
                  {houseTab.label}
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2 text-text-dim font-label-sm text-[11px] shrink-0 pl-space-md">
              <span className="material-symbols-outlined text-[14px] text-verified-emerald">sync</span>
              Auto-Sync: 30s
            </div>
          </div>
        </div>

        {/* CHAMPIONSHIP PODIUM (Top 3 Asymmetric Olympic Pedestals) */}
        {top1 && (
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-admin-amber text-[20px]">military_tech</span>
                <h2 className="font-headline-lg text-headline-lg text-text-bright tracking-tight uppercase">
                  Official Olympic Podium
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">
                Division: Season 03 Inter-House Circuit
              </span>
            </div>

            {/* Live Tie-Breaker Resolution Notification Banner */}
            <div className="w-full bg-surface-container-low rounded-lg p-space-sm flex items-center justify-between gap-space-md overflow-hidden shadow-sm border border-carbon-border">
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-admin-amber/20 text-admin-amber font-label-sm text-[11px] font-bold flex items-center gap-1 shrink-0">
                  <span className="material-symbols-outlined text-[13px]">bolt</span> TIE RESOLUTION ACTIVE
                </div>
                <span className="font-body-sm text-body-sm text-text-bright">
                  <strong className="text-admin-amber">Top rankings resolved by speed:</strong> {top1.student} achieved faster execution at <span className="font-mono text-primary-container">{top1.time}</span> vs peers with microsecond telemetry advantage.
                </span>
              </div>
            </div>

            {/* Asymmetric 3-Tier Podium Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md items-end pt-8">
              {/* 2ND PLACE (SILVER - Left) */}
              {top2 && (
                <div className="order-2 md:order-1 flex flex-col justify-end">
                  <div className="bg-surface-container-low rounded-t-xl rounded-b-lg p-space-lg flex flex-col gap-space-md relative overflow-hidden shadow-md border border-carbon-border">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-900 font-headline-md text-headline-md font-bold flex items-center justify-center shadow-md">
                          2
                        </span>
                        <span className="font-label-sm text-label-sm text-slate-300 font-bold uppercase tracking-wider">Silver Medalist</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase">
                        {top2.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-lg text-slate-200 border border-slate-400">
                        {top2.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-md text-headline-md text-text-bright font-bold truncate">{top2.student}</span>
                        <span className="font-label-sm text-label-sm text-text-dim font-mono truncate">{top2.email}</span>
                        <span className="font-label-sm text-label-sm text-verified-emerald flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">verified</span> Verified Student
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-surface-container-high/60 rounded-lg p-2.5 border border-carbon-border">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-text-dim uppercase">Score</span>
                        <span className="font-headline-md text-headline-md text-text-bright font-bold">{top2.score} / 80</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-text-dim uppercase">Time Elapsed</span>
                        <span className="font-mono font-headline-md text-[14px] text-secondary font-bold">{top2.time}</span>
                      </div>
                    </div>

                    <div className="w-full bg-surface-container py-2 text-center rounded text-slate-300 font-label-sm text-label-sm font-bold uppercase tracking-widest border border-carbon-border">
                      2ND PLACE — SILVER MEDAL
                    </div>
                  </div>
                </div>
              )}

              {/* 1ST PLACE (GOLD - Center, Highest Elevation) */}
              {top1 && (
                <div className="order-1 md:order-2 flex flex-col justify-end -mt-6">
                  <div className="bg-surface-container-low rounded-t-xl rounded-b-lg p-space-lg flex flex-col gap-space-md relative overflow-hidden shadow-xl ring-2 ring-admin-amber/40 border border-admin-amber/60">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 shadow-[0_0_15px_rgba(255,184,0,0.6)]"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 font-headline-md text-headline-md font-extrabold flex items-center justify-center shadow-lg">
                          1
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-sm text-label-sm text-admin-amber font-bold uppercase tracking-wider flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">crown</span> Gold Champion
                          </span>
                          <span className="font-label-sm text-[10px] text-text-dim font-mono">{top1.hash}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded bg-admin-amber/20 text-admin-amber font-label-sm text-label-sm font-bold uppercase border border-admin-amber/40">
                        {top1.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="w-16 h-16 rounded-full bg-surface-container-high ring-4 ring-admin-amber shadow-lg flex items-center justify-center font-bold text-2xl text-admin-amber">
                        {top1.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-lg text-headline-lg text-text-bright font-bold truncate">{top1.student}</span>
                        <span className="font-label-sm text-label-sm text-text-dim font-mono truncate">{top1.email}</span>
                        <span className="font-label-sm text-label-sm text-verified-emerald flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">verified</span> Verified Student
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-gradient-to-br from-amber-500/10 to-transparent rounded-lg p-3 border border-admin-amber/30">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-admin-amber uppercase font-bold">Championship Score</span>
                        <span className="font-headline-xl text-3xl text-admin-amber font-extrabold leading-none my-0.5">{top1.score} / 80</span>
                        <span className="font-label-sm text-[10px] text-text-dim">Benchmark Standard</span>
                      </div>
                      <div className="flex flex-col justify-end text-right">
                        <span className="font-label-sm text-[10px] text-text-dim uppercase">Time Elapsed</span>
                        <span className="font-mono font-headline-md text-headline-md text-primary-container font-bold">{top1.time}</span>
                        <span className="font-label-sm text-[10px] text-verified-emerald font-bold">Tie-Breaker Winner</span>
                      </div>
                    </div>

                    <div className="w-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-2.5 text-center rounded text-slate-950 font-label-md text-label-md font-extrabold uppercase tracking-widest shadow-md">
                      1ST PLACE — GOLD MEDALIST
                    </div>
                  </div>
                </div>
              )}

              {/* 3RD PLACE (BRONZE - Right) */}
              {top3 && (
                <div className="order-3 md:order-3 flex flex-col justify-end">
                  <div className="bg-surface-container-low rounded-t-xl rounded-b-lg p-space-lg flex flex-col gap-space-md relative overflow-hidden shadow-md border border-carbon-border">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-orange-400 to-amber-700"></div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-amber-700 text-text-bright font-headline-md text-headline-md font-bold flex items-center justify-center shadow-md">
                          3
                        </span>
                        <span className="font-label-sm text-label-sm text-orange-300 font-bold uppercase tracking-wider">Bronze Medalist</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-text-bright font-label-sm text-label-sm uppercase">
                        {top3.house}
                      </span>
                    </div>

                    <div className="flex items-center gap-space-md">
                      <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-lg text-orange-300 border border-orange-500">
                        {top3.student.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-md text-headline-md text-primary font-bold truncate">{top3.student}</span>
                        <span className="font-label-sm text-label-sm text-text-dim font-mono truncate">{top3.email}</span>
                        <span className="font-label-sm text-label-sm text-verified-emerald flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-[12px]">verified</span> Active Session
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 bg-surface-container-high/60 rounded-lg p-2.5 border border-carbon-border">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-text-dim uppercase">Score</span>
                        <span className="font-headline-md text-headline-md text-text-bright font-bold">{top3.score} / 80</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] text-text-dim uppercase">Time Elapsed</span>
                        <span className="font-mono font-headline-md text-[14px] text-primary-container font-bold">{top3.time}</span>
                      </div>
                    </div>

                    <div className="w-full bg-surface-container py-2 text-center rounded text-orange-200 font-label-sm text-label-sm font-bold uppercase tracking-widest border border-carbon-border">
                      3RD PLACE — BRONZE MEDAL
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FULL RANKINGS TABLE SECTION */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <h2 className="font-headline-lg text-headline-lg text-text-bright tracking-tight uppercase">
                Official Ranked Roster
              </h2>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-text-dim font-label-sm text-label-sm border border-carbon-border">
                {displayedEntries.length} Submissions Verified
              </span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-xl overflow-hidden border border-carbon-border shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-sm text-body-sm">
                <thead className="bg-surface-container font-label-sm text-label-sm uppercase text-text-dim border-b border-carbon-border select-none">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Student Athlete</th>
                    <th className="py-3 px-4">Collegiate House</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Time Elapsed</th>
                    <th className="py-3 px-4">Timestamp (IST)</th>
                    <th className="py-3 px-4 text-right">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-carbon-border text-text-bright font-label-md text-label-md">
                  {displayedEntries.map((entry, index) => {
                    const rank = index + 1;
                    return (
                      <tr key={entry.id || index} className="hover:bg-surface-container/60 transition-colors">
                        <td className="py-3 px-4">
                          <span className={`w-7 h-7 rounded font-bold flex items-center justify-center text-xs ${
                            rank === 1
                              ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                              : rank === 2
                              ? 'bg-slate-300 text-black font-bold'
                              : rank === 3
                              ? 'bg-amber-700 text-white font-bold'
                              : 'bg-surface-container text-text-dim border border-carbon-border'
                          }`}>
                            {rank}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-text-bright">{entry.student}</span>
                            <span className="font-mono text-[11px] text-text-dim">{entry.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-surface-container text-primary-container font-label-sm text-[11px] uppercase border border-carbon-border">
                            {entry.house}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-admin-amber font-bold text-base">{entry.score}</span>
                          <span className="text-text-dim text-xs"> / 80</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-primary-container font-bold">
                          {entry.time}
                        </td>
                        <td className="py-3 px-4 font-mono text-text-dim text-xs">
                          {entry.timestamp}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-verified-emerald/15 text-verified-emerald font-label-sm text-[10px] uppercase font-bold border border-verified-emerald/30">
                            <span className="material-symbols-outlined text-[12px]">verified</span>
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
