import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Gamepad2,
  Users,
  User,
  Shield,
  Trophy,
  Calendar,
  Lock,
  ArrowRight,
  X,
  Play,
  CheckCircle2,
  Filter,
  Flame,
  Search
} from 'lucide-react';

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

  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Esports', 'Multiplayer Party', 'Mind Games', 'Casual / Party'];

  const filteredGames = games.filter(game => {
    const matchesCategory = filterCategory === 'All' || game.category.toLowerCase().includes(filterCategory.toLowerCase());
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-purple-950/60 text-purple-300 border border-purple-500/30 mb-2">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>PRD SECTION 9 • GAMING HUB</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Tesseract Games Hub
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
            Explore active competitive titles, weekly casual party scrims, and mind sports hosted across the IIT Madras BS community.
          </p>
        </div>

        {/* Guest Warning Pill if guest */}
        {accountState === 'guest' && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold block">Student Login Required</span>
              <span>Full game lobbies & competitions require an active IITM account.</span>
            </div>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-semibold shrink-0"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {['All', 'Esports', 'Casual / Party', 'Mind Games'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-purple-500/50 overflow-hidden transition-all duration-300 flex flex-col shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
          >
            {/* Card Artwork */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-900">
              <img
                src={game.artwork}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-black/20 to-transparent"></div>
              
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono-code font-bold uppercase bg-purple-600/90 text-white shadow">
                  {game.category}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono-code bg-black/60 text-slate-300 backdrop-blur-md border border-white/10">
                  {game.mode}
                </span>
              </div>

              <div className="absolute bottom-3 left-4 text-xs font-mono-code text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{game.activePlayers} Active BS Players</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {game.title}
                </h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Card Footer / View CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-mono-code text-slate-500">
                  {game.rules?.length || 3} Official Rules
                </span>
                <button
                  onClick={() => setSelectedGameForModal(game)}
                  className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider text-purple-300 hover:text-white bg-purple-950/60 hover:bg-purple-600 border border-purple-500/40 transition-all flex items-center gap-1.5 shadow"
                >
                  <span>View Game CTA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* GAME DETAIL MODAL (PRD Section 9: "A game detail page may include game information, rules and upcoming Tesseract competitions related to that game.") */}
      {selectedGameForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#0d121d] border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            {/* Header banner */}
            <div className="relative h-48 w-full overflow-hidden shrink-0">
              <img
                src={selectedGameForModal.artwork}
                alt={selectedGameForModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-[#0d121d]/60 to-transparent"></div>
              
              <button
                onClick={() => setSelectedGameForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-slate-300 hover:text-white border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase bg-purple-600 text-white shadow mb-2 inline-block">
                  {selectedGameForModal.category}
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  {selectedGameForModal.title}
                </h2>
              </div>
            </div>

            {/* Scrollable Modal Content */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono-code uppercase text-purple-400 tracking-wider mb-1">
                  About the Title
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedGameForModal.description}
                </p>
              </div>

              {/* Rules Section */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h4 className="text-xs font-heading font-bold text-white tracking-wider uppercase flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Official Tesseract Competition Rules</span>
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedGameForModal.rules?.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related upcoming event */}
              {selectedGameForModal.upcomingEventId && (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
                      Active Tournament Associated
                    </span>
                    <div className="text-sm font-semibold text-white mt-0.5">
                      {events.find(e => e.id === selectedGameForModal.upcomingEventId)?.title || 'Tournament Announced'}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const ev = events.find(e => e.id === selectedGameForModal.upcomingEventId);
                      if (ev) {
                        setSelectedGameForModal(null);
                        setSelectedEventForModal(ev);
                        setCurrentView('events');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-cyan-400 text-black hover:bg-cyan-300 transition-colors"
                  >
                    View Tournament
                  </button>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://discord.gg"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 text-center transition-all flex items-center justify-center gap-2 shadow"
                >
                  <Users className="w-4 h-4" />
                  <span>Join Discord Game Scrims</span>
                </a>
                <button
                  onClick={() => setSelectedGameForModal(null)}
                  className="py-3 px-6 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
