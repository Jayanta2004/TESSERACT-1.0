import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function PollsView() {
  const {
    polls,
    accountState,
    user,
    votePoll,
    setIsAuthModalOpen,
    showToast
  } = useApp();

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isAnonymous, setIsAnonymous] = useState(true);

  const handleCastVote = (pollId) => {
    if (accountState === 'guest') {
      showToast('Please sign in with your verified IIT Madras student email to vote.', 'info');
      setIsAuthModalOpen(true);
      return;
    }
    if (accountState === 'unverified') {
      showToast('Anti-Sybil Verification Required: Society voting is restricted to verified IIT Madras students (@study.iitm.ac.in).', 'error');
      setIsAuthModalOpen(true);
      return;
    }
    const optionId = selectedOptions[pollId];
    if (!optionId) {
      showToast('Please select an option before casting your ballot.', 'info');
      return;
    }
    votePoll(pollId, optionId, isAnonymous);
  };

  const filteredPolls = polls.filter(poll => {
    if (activeCategory === 'tournament') return poll.category?.toLowerCase().includes('tournament') || poll.question?.toLowerCase().includes('tournament');
    if (activeCategory === 'catalog') return poll.category?.toLowerCase().includes('catalog') || poll.question?.toLowerCase().includes('game') || poll.question?.toLowerCase().includes('sanction');
    if (activeCategory === 'rulebook') return poll.category?.toLowerCase().includes('rulebook') || poll.question?.toLowerCase().includes('rule');
    if (activeCategory === 'archive') return poll.hasVoted;
    return true;
  });

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Top Banner & KPI Strip */}
      <div className="w-full bg-[#0a0e18]/80 backdrop-blur-md px-margin py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
            <div className="flex items-center gap-2.5 glass-panel px-3.5 py-1.5 rounded-full text-cyan-400 border border-cyan-400/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="tracking-widest uppercase font-bold">SYS::DEMOCRACY // S03 REFERENDUM PORTAL</span>
              <span className="text-slate-600">/</span>
              <span className="text-white tracking-wider">ANTI-SYBIL CONSENSUS ENGINE ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 glass-panel px-3.5 py-1.5 rounded-full text-slate-300 border border-white/10">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">gavel</span>
              <span>QUORUM CONSENSUS: STRICT 50% THRESHOLD</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl font-heading text-white uppercase tracking-tight font-bold">
              Society Referendums &amp; Student Polls
            </h1>
            <p className="font-body text-sm text-slate-300 max-w-4xl leading-relaxed">
              Direct collegiate democracy powered by IIT Madras student email verification. Vote on upcoming sanctioned tournaments, new games added to the official scrim directory, and society rulebook amendments.
            </p>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="glass-card p-5 rounded-2xl flex flex-col gap-2 shadow-lg border border-white/10">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono-code text-[11px] uppercase tracking-wider">Eligible BS Voters</span>
                <span className="material-symbols-outlined text-cyan-400 text-[18px]">how_to_reg</span>
              </div>
              <div className="font-heading text-3xl text-white font-bold">1,420</div>
              <span className="font-mono-code text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Verified Students (@study.iitm)
              </span>
            </div>

            <div className="glass-card p-5 rounded-2xl flex flex-col gap-2 shadow-lg border border-white/10">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono-code text-[11px] uppercase tracking-wider">Total Ballots Cast</span>
                <span className="material-symbols-outlined text-cyan-400 text-[18px]">ballot</span>
              </div>
              <div className="font-heading text-3xl text-white font-bold">892 <span className="font-body text-xs text-slate-400 font-normal">Votes</span></div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: '62.8%' }}></div>
              </div>
              <span className="font-mono-code text-[11px] text-slate-400 mt-0.5">62.8% Turnout Rate (Valid Quorum)</span>
            </div>

            <div className="glass-card p-5 rounded-2xl flex flex-col gap-2 shadow-lg border border-white/10">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono-code text-[11px] uppercase tracking-wider">Active Referendums</span>
                <span className="material-symbols-outlined text-amber-400 text-[18px]">pending_actions</span>
              </div>
              <div className="font-heading text-3xl text-white font-bold">
                {polls.filter(p => !p.hasVoted).length} <span className="font-body text-xs text-amber-400 font-normal">Open Polls</span>
              </div>
              <span className="font-mono-code text-[11px] text-slate-400">1 Closing &lt; 36 Hours</span>
            </div>

            <div className="glass-card p-5 rounded-2xl flex flex-col gap-2 shadow-lg border border-white/10">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-mono-code text-[11px] uppercase tracking-wider">Consensus Standard</span>
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">fingerprint</span>
              </div>
              <div className="font-heading text-2xl text-white leading-tight font-bold">1-Student-1-Vote</div>
              <span className="font-mono-code text-[11px] text-slate-400 truncate">SHA-256 Roll Tokenized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Voter Status Bar */}
      <div className="w-full px-margin py-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Polls (${polls.length})` },
              { id: 'tournament', label: 'Tournament Selection' },
              { id: 'catalog', label: 'Game Catalog Additions' },
              { id: 'rulebook', label: 'Rulebook Amendments' },
              { id: 'archive', label: 'Concluded Archives' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl font-heading text-xs uppercase font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                    : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 glass-panel px-4 py-2 rounded-xl shrink-0 shadow-sm border border-white/10">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <div className="flex flex-col">
              <span className="font-heading text-xs text-white font-bold">Voter: {user?.name || 'Guest Student'}</span>
              <span className="font-mono-code text-[11px] text-slate-400">{user?.email || 'Public Visitor'} • {user ? '1 Ballot Token Assigned' : 'Read-Only Mode'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Polls Container */}
      <div className="w-full px-margin py-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          {filteredPolls.map((poll) => {
            const hasVoted = poll.hasVoted;
            const currentSelected = selectedOptions[poll.id];

            return (
              <div
                key={poll.id}
                className="glass-card p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-6 border border-white/10"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-mono-code text-[11px] uppercase font-bold tracking-wider border border-cyan-400/25">
                      {poll.category || 'REFERENDUM'}
                    </span>
                  </div>
                  {hasVoted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full glass-panel text-emerald-400 font-mono-code text-xs font-bold border border-emerald-500/30">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      BALLOT RECORDED &amp; SEALED
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 text-rose-300 font-mono-code text-xs font-bold border border-rose-500/30">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
                      LIVE REFERENDUM • CLOSES IN 36H
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-xl sm:text-2xl font-heading text-white uppercase font-bold">
                    {poll.question}
                  </h2>
                  <p className="font-body text-xs text-slate-300 max-w-4xl leading-relaxed">
                    Cast your vote to determine official policy and resource allocation. Only verified @study.iitm.ac.in accounts may vote once.
                  </p>
                </div>

                {/* If user has voted, show locked status and full breakdown bars */}
                {hasVoted ? (
                  <div className="flex flex-col gap-5">
                    <div className="p-4 rounded-xl glass-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-400 text-[22px]">task_alt</span>
                        <div className="flex flex-col">
                          <span className="font-heading text-xs text-white font-bold">YOUR BALLOT IS LOCKED</span>
                          <span className="font-mono-code text-[11px] text-slate-400">
                            Voted on institutional ledger. Quorum weight: 1.0
                          </span>
                        </div>
                      </div>
                      <div className="font-mono-code text-xs text-cyan-300 px-3 py-1 rounded-lg glass-panel border border-white/10">
                        Tx: #0x8F92A...IITM
                      </div>
                    </div>

                    {/* Progress bars for each option */}
                    <div className="space-y-4 pt-1">
                      {poll.options.map((opt) => (
                        <div key={opt.id} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between font-body text-xs">
                            <span className="text-white font-semibold flex items-center gap-2">
                              <span className="material-symbols-outlined text-emerald-400 text-[16px]">check_circle</span>
                              {opt.text}
                            </span>
                            <span className="text-cyan-400 font-mono-code font-bold">
                              {opt.percent}% ({opt.votes} Votes)
                            </span>
                          </div>
                          <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div
                              className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                              style={{ width: `${opt.percent}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* If user has NOT voted, show selectable options form */
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleCastVote(poll.id);
                    }}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {poll.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isChosen = currentSelected === opt.id;

                        return (
                          <label
                            key={opt.id}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [poll.id]: opt.id }))}
                            className={`cursor-pointer group flex flex-col justify-between p-5 rounded-2xl transition-all relative overflow-hidden border ${
                              isChosen
                                ? 'border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                                : 'glass-panel border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.04]'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex flex-col gap-1">
                                <span className="font-mono-code text-[11px] text-cyan-400 uppercase font-bold tracking-wider">
                                  Option {letter}
                                </span>
                                <span className="font-heading text-sm text-white font-bold group-hover:text-cyan-300 transition-colors">
                                  {opt.text}
                                </span>
                                <span className="font-mono-code text-[11px] text-slate-400 mt-1">
                                  Current standing: {opt.votes} votes ({opt.percent}%)
                                </span>
                              </div>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isChosen ? 'bg-cyan-400 text-slate-950' : 'glass-panel border border-white/20'
                              }`}>
                                <span className={`material-symbols-outlined text-[16px] font-bold ${
                                  isChosen ? 'opacity-100' : 'opacity-0'
                                }`}>
                                  check
                                </span>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                      <label className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded bg-slate-900 border-white/20 accent-cyan-400 text-cyan-400 cursor-pointer"
                        />
                        <span className="font-body text-xs text-slate-300">
                          <strong className="text-white">Cast Ballot Anonymously:</strong> Hide student username from public ledger, recording only roll token hash.
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-heading text-xs uppercase font-bold flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer shrink-0"
                      >
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        SUBMIT BALLOT (1-VOTE LOCK)
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl glass-panel font-mono-code text-xs text-slate-400 flex items-center gap-2.5 border border-white/10">
                      <span className="material-symbols-outlined text-amber-400 text-[18px] shrink-0">lock</span>
                      <span>Irreversible Ballot: Once submitted, your institutional roll number is cryptographically tokenized. Duplicate votes are rejected at consensus layer.</span>
                    </div>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
