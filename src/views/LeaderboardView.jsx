import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Trophy,
  Medal,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  Award,
  Crown,
  ChevronDown
} from 'lucide-react';

export default function LeaderboardView() {
  const { leaderboard, quizzes } = useApp();
  const [selectedQuizId, setSelectedQuizId] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEntries = leaderboard
    .filter(item => {
      const matchesQuiz = selectedQuizId === 'all' || item.quizId === selectedQuizId;
      const matchesSearch = item.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesQuiz && matchesSearch;
    })
    .sort((a, b) => {
      // PRD Section 13 Recommended tie-breaker: higher score first, then lower completion time.
      if (b.score !== a.score) return b.score - a.score;
      return a.time.localeCompare(b.time);
    });

  const top3 = filteredEntries.slice(0, 3);
  const remaining = filteredEntries.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-amber-950/60 text-amber-300 border border-amber-500/30 mb-2">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>PRD SECTION 13 • COMPETITIVE LEADERBOARD</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Society Rankings & Standings
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
            Official rankings of verified IIT Madras BS students. Tie-breakers are resolved by <strong className="text-amber-300 font-semibold">higher score first</strong>, followed by <strong className="text-cyan-300 font-semibold">lowest completion time</strong>.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="appearance-none w-full sm:w-64 pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs font-mono-code text-slate-200 focus:outline-none focus:border-amber-400 shadow-md"
            >
              <option value="all">All Quizzes & Challenges</option>
              {quizzes.map(q => (
                <option key={q.id} value={q.id}>{q.title}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search student or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-60 pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-md"
            />
          </div>
        </div>
      </div>

      {/* Top 3 Championship Podium */}
      {top3.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 max-w-5xl mx-auto">
          {/* 2nd Place Silver */}
          <div className="order-2 md:order-1 p-6 rounded-3xl glass-card border-slate-500/40 flex flex-col items-center text-center space-y-4 relative overflow-hidden shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-400 flex items-center justify-center font-heading font-black text-xl text-slate-200 shadow-lg">
              2nd
            </div>
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-slate-800 text-slate-300 border border-slate-600">
                🥈 Silver Runner-Up
              </span>
              <h3 className="font-heading text-lg font-bold text-white pt-1">
                {top3[1]?.student}
              </h3>
              <p className="text-xs text-slate-400 font-mono-code truncate max-w-[200px]">
                {top3[1]?.email}
              </p>
            </div>
            <div className="p-3.5 w-full rounded-2xl bg-black/50 border border-slate-800 flex justify-around font-mono-code text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">POINTS</span>
                <span className="text-white font-bold text-base">{top3[1]?.score}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TIME</span>
                <span className="text-cyan-300 font-bold text-base">{top3[1]?.time}</span>
              </div>
            </div>
          </div>

          {/* 1st Place Gold Champion (Elevated) */}
          <div className="order-1 md:order-2 p-8 rounded-3xl bg-gradient-to-b from-[#221c0b] via-[#151208] to-[#0a0d18] border-2 border-amber-400/80 flex flex-col items-center text-center space-y-5 relative overflow-hidden shadow-[0_0_45px_rgba(245,158,11,0.3)] md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500"></div>
            
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center font-heading font-black text-3xl text-amber-300 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                👑
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full text-[9px] font-mono-code font-bold bg-amber-400 text-black shadow">
                1st PLACE
              </span>
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-amber-400 text-black shadow">
                🥇 Champion
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-black text-white pt-1">
                {top3[0]?.student}
              </h3>
              <p className="text-xs text-slate-300 font-mono-code truncate max-w-[220px]">
                {top3[0]?.email}
              </p>
            </div>

            <div className="p-4 w-full rounded-2xl bg-amber-950/40 border border-amber-500/40 flex justify-around font-mono-code text-xs">
              <div>
                <span className="text-amber-400/80 block text-[10px]">TOTAL SCORE</span>
                <span className="text-amber-300 font-black text-xl">{top3[0]?.score} pts</span>
              </div>
              <div>
                <span className="text-amber-400/80 block text-[10px]">TIME TAKEN</span>
                <span className="text-cyan-300 font-black text-xl">{top3[0]?.time}</span>
              </div>
            </div>
          </div>

          {/* 3rd Place Bronze */}
          <div className="order-3 md:order-3 p-6 rounded-3xl glass-card border-amber-800/40 flex flex-col items-center text-center space-y-4 relative overflow-hidden shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-amber-950/50 border border-amber-700 flex items-center justify-center font-heading font-black text-xl text-amber-400 shadow-lg">
              3rd
            </div>
            <div className="space-y-1">
              <span className="px-3 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase bg-amber-950/80 text-amber-400 border border-amber-700/50">
                🥉 Bronze Medal
              </span>
              <h3 className="font-heading text-lg font-bold text-white pt-1">
                {top3[2]?.student}
              </h3>
              <p className="text-xs text-slate-400 font-mono-code truncate max-w-[200px]">
                {top3[2]?.email}
              </p>
            </div>
            <div className="p-3.5 w-full rounded-2xl bg-black/50 border border-slate-800 flex justify-around font-mono-code text-xs">
              <div>
                <span className="text-slate-500 block text-[10px]">POINTS</span>
                <span className="text-white font-bold text-base">{top3[2]?.score}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">TIME</span>
                <span className="text-cyan-300 font-bold text-base">{top3[2]?.time}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table (PRD Section 13) */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-400" />
            <span>Complete Contestant Standings</span>
          </h3>
          <span className="text-xs font-mono-code text-slate-400">
            Total records: <strong className="text-white">{filteredEntries.length}</strong>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono-code uppercase tracking-wider text-slate-400">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">IITM Email</th>
                <th className="py-3 px-4 text-right">Score</th>
                <th className="py-3 px-4 text-right">Time</th>
                <th className="py-3 px-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono-code text-xs">
              {filteredEntries.map((item, index) => {
                const rank = index + 1;
                return (
                  <tr
                    key={index}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      rank === 1
                        ? 'bg-amber-950/20 text-amber-200 font-semibold'
                        : rank === 2
                        ? 'bg-slate-800/20'
                        : rank === 3
                        ? 'bg-amber-950/10'
                        : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-heading font-bold text-sm">
                      {rank === 1 ? '🥇 #1' : rank === 2 ? '🥈 #2' : rank === 3 ? '🥉 #3' : `#${rank}`}
                    </td>
                    <td className="py-4 px-4 font-sans font-semibold text-white">
                      {item.student}
                    </td>
                    <td className="py-4 px-4 text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{item.email}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-white text-sm">
                      {item.score}
                    </td>
                    <td className="py-4 px-4 text-right text-cyan-300 font-semibold">
                      {item.time}
                    </td>
                    <td className="py-4 px-4 text-right text-slate-500">
                      {item.date || '2026-10-08'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Tie-breaker footnote */}
        <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-code text-center">
          PRD Section 13 Tie-Breaker Rule: Higher score first, then lower completion time. Verified with official IITM BS accounts.
        </div>
      </div>
    </div>
  );
}
