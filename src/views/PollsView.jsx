import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Vote,
  CheckCircle2,
  Lock,
  Calendar,
  Users,
  Eye,
  EyeOff,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function PollsView() {
  const {
    polls,
    accountState,
    user,
    votePoll,
    setIsAuthModalOpen
  } = useApp();

  const [selectedOptions, setSelectedOptions] = useState({});
  const [anonymousPreferences, setAnonymousPreferences] = useState({});

  const handleSelectOption = (pollId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [pollId]: optionId
    }));
  };

  const handleCastVote = (pollId) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    const optionId = selectedOptions[pollId];
    if (!optionId) {
      alert('Please select an option to vote.');
      return;
    }
    const isAnonymous = anonymousPreferences[pollId] || false;
    votePoll(pollId, optionId, isAnonymous);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 mb-2">
            <Vote className="w-3.5 h-3.5" />
            <span>PRD SECTION 14 • SOCIETY POLLS</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Society Democratic Polls
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
            Direct student democracy for Tesseract. Cast your verified vote on upcoming game titles, event timings, and community rules.
          </p>
        </div>

        {accountState === 'guest' && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200 shadow-lg">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold block font-mono-code">IITM Student Vote Requirement</span>
              <span>1 vote per verified student limit strictly enforced.</span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-heading font-bold text-xs uppercase shrink-0"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Polls List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {polls.map((poll) => {
          const userVotedOptionId = user?.pollVotes ? user.pollVotes[poll.id] : null;
          const hasVoted = Boolean(userVotedOptionId);
          const totalVotes = poll.totalVotes || 0;

          return (
            <div
              key={poll.id}
              className="group rounded-3xl glass-card p-7 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    Active Society Vote
                  </span>
                  <span className="text-xs font-mono-code text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Ends: {poll.endDate}</span>
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {poll.question}
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  {poll.description}
                </p>

                {/* Poll Options */}
                <div className="space-y-3 pt-2">
                  {poll.options.map((option) => {
                    const isSelected = selectedOptions[poll.id] === option.id;
                    const isVoted = userVotedOptionId === option.id;
                    const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;

                    return (
                      <div
                        key={option.id}
                        onClick={() => !hasVoted && handleSelectOption(poll.id, option.id)}
                        className={`relative overflow-hidden p-4 rounded-2xl border transition-all ${
                          hasVoted
                            ? isVoted
                              ? 'bg-emerald-950/40 border-emerald-500/60 text-white shadow-md'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300'
                            : isSelected
                            ? 'bg-cyan-950/50 border-cyan-400 text-white cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer'
                        }`}
                      >
                        {/* Progress bar background for results */}
                        {(hasVoted || poll.showResultsLive) && (
                          <div
                            className={`absolute top-0 bottom-0 left-0 transition-all duration-700 ${
                              isVoted
                                ? 'bg-emerald-500/25 border-r-2 border-emerald-400'
                                : 'bg-slate-800/40'
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        )}

                        <div className="relative z-10 flex items-center justify-between gap-3 text-sm">
                          <div className="flex items-center gap-3">
                            {!hasVoted && (
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black"></div>}
                              </div>
                            )}

                            {hasVoted && isVoted && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}

                            <span className="font-medium">{option.label}</span>
                          </div>

                          {(hasVoted || poll.showResultsLive) && (
                            <div className="text-right shrink-0 font-mono-code text-xs">
                              <span className="font-bold text-white text-sm">{percentage}%</span>
                              <span className="text-slate-500 ml-1.5">({option.votes} votes)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Poll Footer & Vote Button */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                {poll.allowAnonymous && !hasVoted && (
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <label className="flex items-center gap-2 cursor-pointer font-mono-code">
                      <input
                        type="checkbox"
                        checked={anonymousPreferences[poll.id] || false}
                        onChange={(e) => setAnonymousPreferences(prev => ({
                          ...prev,
                          [poll.id]: e.target.checked
                        }))}
                        className="rounded border-slate-700 bg-slate-900 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span>Vote Anonymously (Hide Gamer Tag)</span>
                    </label>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono-code flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{totalVotes} total verified student votes</span>
                  </div>

                  {hasVoted ? (
                    <div className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono-code font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Vote Logged (1-Vote Limit)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCastVote(poll.id)}
                      className="px-6 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-1.5 active:scale-95"
                    >
                      <span>Submit My Vote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
