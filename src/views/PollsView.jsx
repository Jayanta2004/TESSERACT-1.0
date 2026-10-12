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
      <div className="w-full bg-surface-container-lowest px-margin py-space-xl border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center justify-between gap-space-sm text-label-sm font-label-sm">
            <div className="flex items-center gap-space-sm bg-surface-container-low px-3 py-1.5 rounded-lg text-primary-container border border-carbon-border">
              <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
              <span className="tracking-widest uppercase">SYS::DEMOCRACY // S03 REFERENDUM PORTAL</span>
              <span className="text-outline-variant">/</span>
              <span className="text-text-bright tracking-wider">ANTI-SYBIL CONSENSUS ENGINE ACTIVE</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg text-text-dim border border-carbon-border">
              <span className="material-symbols-outlined text-[14px] text-verified-emerald">gavel</span>
              <span>QUORUM CONSENSUS: STRICT 50% THRESHOLD</span>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <h1 className="text-3xl sm:text-headline-xl font-headline-xl text-text-bright uppercase tracking-wide">
              SOCIETY REFERENDUMS &amp; DEMOCRATIC STUDENT POLLS
            </h1>
            <p className="text-body-lg font-body-lg text-text-dim max-w-4xl">
              Direct collegiate democracy powered by IIT Madras student email verification. Vote on upcoming sanctioned tournaments, new games added to the official scrim directory, and society rulebook amendments.
            </p>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md pt-space-xs">
            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-xs shadow-md border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim">
                <span className="text-label-sm font-label-sm uppercase tracking-wider">Eligible BS Voters</span>
                <span className="material-symbols-outlined text-primary-container text-[18px]">how_to_reg</span>
              </div>
              <div className="text-headline-lg font-headline-lg text-text-bright font-bold">1,420</div>
              <span className="text-label-sm font-label-sm text-verified-emerald flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald"></span> Verified Students (@study.iitm)
              </span>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-xs shadow-md border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim">
                <span className="text-label-sm font-label-sm uppercase tracking-wider">Total Ballots Cast</span>
                <span className="material-symbols-outlined text-primary-container text-[18px]">ballot</span>
              </div>
              <div className="text-headline-lg font-headline-lg text-text-bright font-bold">892 <span className="text-body-sm text-text-dim font-normal">Votes</span></div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '62.8%' }}></div>
              </div>
              <span className="text-label-sm font-label-sm text-text-dim mt-0.5">62.8% Turnout Rate (Valid Quorum)</span>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-xs shadow-md border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim">
                <span className="text-label-sm font-label-sm uppercase tracking-wider">Active Referendums</span>
                <span className="material-symbols-outlined text-admin-amber text-[18px]">pending_actions</span>
              </div>
              <div className="text-headline-lg font-headline-lg text-text-bright font-bold">
                {polls.filter(p => !p.hasVoted).length} <span className="text-body-sm text-admin-amber font-normal">Open Polls</span>
              </div>
              <span className="text-label-sm font-label-sm text-text-dim">1 Closing &lt; 36 Hours</span>
            </div>

            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col gap-space-xs shadow-md border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim">
                <span className="text-label-sm font-label-sm uppercase tracking-wider">Consensus Standard</span>
                <span className="material-symbols-outlined text-verified-emerald text-[18px]">fingerprint</span>
              </div>
              <div className="text-headline-md font-headline-md text-text-bright leading-tight font-bold">1-Student-1-Vote</div>
              <span className="text-label-sm font-label-sm text-text-dim truncate">SHA-256 Roll Tokenized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Voter Status Bar */}
      <div className="w-full px-margin py-space-lg bg-surface border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-space-xs">
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
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm uppercase font-bold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-primary-container text-on-primary-container shadow-md'
                    : 'bg-surface-container-low text-text-dim hover:text-text-bright border border-carbon-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-2 rounded-xl shrink-0 shadow-sm border border-carbon-border">
            <div className="w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></div>
            <div className="flex flex-col">
              <span className="text-label-sm font-label-sm text-text-bright font-bold">Voter: {user.name}</span>
              <span className="text-label-sm font-label-sm text-text-dim">{user.email} • 1 Ballot Token Assigned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Polls Container */}
      <div className="w-full px-margin py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          {filteredPolls.map((poll) => {
            const hasVoted = poll.hasVoted;
            const currentSelected = selectedOptions[poll.id];

            return (
              <div
                key={poll.id}
                className="bg-surface-container p-space-xl rounded-xl shadow-xl flex flex-col gap-space-lg border border-carbon-border"
              >
                <div className="flex flex-wrap items-center justify-between gap-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="px-2.5 py-1 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm uppercase font-bold tracking-wider border border-primary-container/20">
                      {poll.category || 'REFERENDUM'}
                    </span>
                  </div>
                  {hasVoted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-verified-emerald font-label-sm text-label-sm font-bold border border-carbon-border">
                      <span className="material-symbols-outlined text-[14px]">lock</span>
                      BALLOT RECORDED &amp; SEALED
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-alert-crimson/15 text-alert-crimson font-label-sm text-label-sm font-bold animate-pulse border border-alert-crimson/30">
                      <span className="w-2 h-2 rounded-full bg-alert-crimson"></span>
                      LIVE REFERENDUM • CLOSES IN 36H
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-space-xs">
                  <h2 className="text-xl sm:text-headline-lg font-headline-lg text-text-bright uppercase">
                    {poll.question}
                  </h2>
                  <p className="text-body-md font-body-md text-text-dim max-w-4xl">
                    Cast your vote to determine official policy and resource allocation. Only verified @study.iitm.ac.in accounts may vote once.
                  </p>
                </div>

                {/* If user has voted, show locked status and full breakdown bars */}
                {hasVoted ? (
                  <div className="flex flex-col gap-space-md">
                    <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm shadow-sm border border-carbon-border">
                      <div className="flex items-center gap-space-sm">
                        <span className="material-symbols-outlined text-verified-emerald text-[20px]">task_alt</span>
                        <div className="flex flex-col">
                          <span className="text-body-sm font-body-sm text-text-bright font-semibold">YOUR BALLOT IS LOCKED</span>
                          <span className="text-label-sm font-label-sm text-text-dim">
                            Voted on institutional ledger. Quorum weight: 1.0
                          </span>
                        </div>
                      </div>
                      <div className="text-label-sm font-label-sm text-primary-container px-2 py-1 rounded bg-surface-container-highest border border-carbon-border font-mono">
                        Tx: #0x8F92A...IITM
                      </div>
                    </div>

                    {/* Progress bars for each option */}
                    <div className="space-y-4 pt-2">
                      {poll.options.map((opt) => (
                        <div key={opt.id} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between text-body-md font-body-md">
                            <span className="text-text-bright font-medium flex items-center gap-2">
                              <span className="material-symbols-outlined text-verified-emerald text-[16px]">check_circle</span>
                              {opt.text}
                            </span>
                            <span className="text-primary-container font-label-md text-label-md font-bold">
                              {opt.percent}% ({opt.votes} Votes)
                            </span>
                          </div>
                          <div className="w-full bg-surface-container-lowest h-2.5 rounded-full overflow-hidden border border-carbon-border">
                            <div
                              className="bg-primary-container h-full rounded-full transition-all duration-700"
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
                    className="flex flex-col gap-space-md"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                      {poll.options.map((opt, idx) => {
                        const letter = String.fromCharCode(65 + idx);
                        const isChosen = currentSelected === opt.id;

                        return (
                          <label
                            key={opt.id}
                            onClick={() => setSelectedOptions(prev => ({ ...prev, [poll.id]: opt.id }))}
                            className={`cursor-pointer group flex flex-col justify-between p-space-lg rounded-xl transition-all shadow-md relative overflow-hidden border ${
                              isChosen
                                ? 'border-2 border-primary-container bg-primary-container/10 shadow-[0_0_16px_rgba(0,240,255,0.2)]'
                                : 'bg-surface-container-low hover:bg-surface-container-high border-carbon-border'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-space-md">
                              <div className="flex flex-col gap-1">
                                <span className="text-label-sm font-label-sm text-primary-container uppercase font-bold tracking-wider">
                                  Option {letter}
                                </span>
                                <span className="text-body-lg font-body-lg text-text-bright font-semibold group-hover:text-primary transition-colors">
                                  {opt.text}
                                </span>
                                <span className="text-body-sm font-body-sm text-text-dim mt-1">
                                  Current standing: {opt.votes} votes ({opt.percent}%)
                                </span>
                              </div>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                                isChosen ? 'bg-primary-container' : 'bg-surface-container-highest border border-carbon-border'
                              }`}>
                                <span className={`material-symbols-outlined text-[16px] text-surface font-bold ${
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

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pt-space-xs border-t border-carbon-border pt-4">
                      <label className="flex items-center gap-space-sm cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="w-4 h-4 rounded bg-surface-container-highest accent-primary-container text-on-primary-container cursor-pointer"
                        />
                        <span className="text-body-sm font-body-sm text-text-dim">
                          <strong className="text-text-bright">Cast Ballot Anonymously:</strong> Hide student username from public ledger, recording only roll token hash.
                        </span>
                      </label>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-lg hover:shadow-primary-container/20 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                        SUBMIT BALLOT (1-VOTE LOCK)
                      </button>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-container-lowest text-label-sm font-label-sm text-text-dim flex items-center gap-2 border border-carbon-border">
                      <span className="material-symbols-outlined text-admin-amber text-[16px] shrink-0">lock</span>
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
