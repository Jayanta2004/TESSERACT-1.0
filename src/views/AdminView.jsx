import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Settings,
  Bell,
  Calendar,
  Gamepad2,
  Award,
  Vote,
  Users,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Save,
  Clock,
  Sparkles,
  BarChart3,
  Layers
} from 'lucide-react';

export default function AdminView() {
  const {
    accountState,
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
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState('overview'); // overview, announcement, events, games, quizzes, polls, domains

  // Announcement state
  const [annTitle, setAnnTitle] = useState(announcement?.title || '');
  const [annDesc, setAnnDesc] = useState(announcement?.description || '');
  const [annImg, setAnnImg] = useState(announcement?.image || '');
  const [annCtaText, setAnnCtaText] = useState(announcement?.ctaText || '');
  const [annCtaUrl, setAnnCtaUrl] = useState(announcement?.ctaUrl || '');
  const [annEnabled, setAnnEnabled] = useState(announcement?.enabled || false);

  // New Event Form State
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventGame, setNewEventGame] = useState('Valorant');
  const [newEventType, setNewEventType] = useState('Tournament');
  const [newEventDate, setNewEventDate] = useState('November 15, 2026');
  const [newEventTime, setNewEventTime] = useState('7:00 PM IST');
  const [newEventPrize, setNewEventPrize] = useState('₹10,000');
  const [newEventGoogleForm, setNewEventGoogleForm] = useState('https://forms.gle/newCustomEventForm');
  const [newEventDesc, setNewEventDesc] = useState('');

  // New Game Form State
  const [showGameForm, setShowGameForm] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameCategory, setNewGameCategory] = useState('Esports');
  const [newGameMode, setNewGameMode] = useState('Multiplayer');
  const [newGameArtwork, setNewGameArtwork] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80');
  const [newGameDesc, setNewGameDesc] = useState('');

  // New Domain State
  const [newDomainInput, setNewDomainInput] = useState('');

  // Save Announcement
  const handleSaveAnnouncement = (e) => {
    e.preventDefault();
    setAnnouncement({
      ...announcement,
      title: annTitle,
      description: annDesc,
      image: annImg,
      ctaText: annCtaText,
      ctaUrl: annCtaUrl,
      enabled: annEnabled
    });
    showToast('Global announcement pop-up settings saved!', 'success');
  };

  // Submit New Event
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const eventObj = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      banner: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80',
      eventType: newEventType,
      game: newEventGame,
      date: newEventDate,
      time: newEventTime,
      status: 'Upcoming',
      registrationDeadline: 'Registration Open',
      prizePool: newEventPrize,
      prizeBreakdown: `1st: ${newEventPrize}`,
      format: 'Standard Tournament Rules',
      eligibility: 'Verified IITM BS Students',
      googleFormUrl: newEventGoogleForm,
      description: newEventDesc || 'Exciting competitive event hosted by Tesseract Esports Society.',
      rules: ['Adhere to Tesseract Fair Play guidelines.', 'Join Discord for match check-ins.'],
      schedule: ['Day 1: Qualifiers', 'Day 2: Grand Finals']
    };

    addEvent(eventObj);
    setShowEventForm(false);
    setNewEventTitle('');
    setNewEventDesc('');
  };

  // Submit New Game
  const handleCreateGame = (e) => {
    e.preventDefault();
    if (!newGameTitle) return;

    const gameObj = {
      id: `game-${Date.now()}`,
      title: newGameTitle,
      category: newGameCategory,
      mode: newGameMode,
      artwork: newGameArtwork,
      description: newGameDesc || 'Competitive gaming title hosted by Tesseract.',
      activePlayers: 120,
      rules: ['Standard competitive settings', 'Fair play integrity required']
    };

    addGame(gameObj);
    setShowGameForm(false);
    setNewGameTitle('');
    setNewGameDesc('');
  };

  // Add Domain
  const handleAddDomain = (e) => {
    e.preventDefault();
    if (!newDomainInput.trim()) return;
    addAllowedDomain(newDomainInput.trim());
    setNewDomainInput('');
  };

  if (accountState !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-rose-950/40 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
          <Settings className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white">
          Admin Access Restricted
        </h2>
        <p className="text-sm text-slate-400">
          This control center is reserved for Tesseract Council members and WebOps leads. Please use the top role switcher to toggle to <strong className="text-purple-300">Admin / Team</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-purple-500/30">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-purple-950/60 text-purple-300 border border-purple-500/30 mb-2">
            <Settings className="w-3.5 h-3.5" />
            <span>PRD SECTION 17 • ADMIN CONTROL CENTER</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Tesseract CMS & Ops Portal
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
            Empowering the society team to operate and manage the platform without developer involvement for routine content.
          </p>
        </div>
      </div>

      {/* Admin Module Tabs (PRD Section 17) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'overview', label: 'Dashboard KPI', icon: BarChart3 },
          { id: 'announcement', label: 'Announcements & Pop-up', icon: Bell },
          { id: 'events', label: 'Events Manager', icon: Calendar },
          { id: 'games', label: 'Games Catalog', icon: Gamepad2 },
          { id: 'quizzes', label: 'Quizzes Platform', icon: Award },
          { id: 'polls', label: 'Society Polls', icon: Vote },
          { id: 'domains', label: 'Email Domains Config', icon: ShieldCheck },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. OVERVIEW KPI TAB */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl glass-card border-cyan-500/30 space-y-2">
              <span className="text-xs font-mono-code text-cyan-400 uppercase">Registered Students</span>
              <div className="font-heading text-3xl font-black text-white">1,250+</div>
              <span className="text-[11px] text-slate-500 font-mono-code">100% Verified IITM BS</span>
            </div>

            <div className="p-6 rounded-3xl glass-card border-purple-500/30 space-y-2">
              <span className="text-xs font-mono-code text-purple-400 uppercase">Active Tournaments</span>
              <div className="font-heading text-3xl font-black text-white">{events.length}</div>
              <span className="text-[11px] text-slate-500 font-mono-code">Google Form Connected</span>
            </div>

            <div className="p-6 rounded-3xl glass-card border-amber-500/30 space-y-2">
              <span className="text-xs font-mono-code text-amber-400 uppercase">Live Quizzes</span>
              <div className="font-heading text-3xl font-black text-white">{quizzes.length}</div>
              <span className="text-[11px] text-slate-500 font-mono-code">Timed MCQ Engine</span>
            </div>

            <div className="p-6 rounded-3xl glass-card border-emerald-500/30 space-y-2">
              <span className="text-xs font-mono-code text-emerald-400 uppercase">Society Polls</span>
              <div className="font-heading text-3xl font-black text-white">{polls.length}</div>
              <span className="text-[11px] text-slate-500 font-mono-code">1-Vote Strict Enforcement</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl glass-panel space-y-4">
            <h3 className="font-heading text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>PRD Compliance Status Checklist</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono-code">
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Public Website (Home, Team, About, Pop-up)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Authentication with IITM email verification</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Games Catalog & Details View</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Events & Google Form Rerouting Gateway</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Minimal Student Profile</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P0 Timed MCQ Quizzes Native Platform</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P1 Society Polls (1-vote limit)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>P1 Quiz Leaderboard with Tie-Breaker Logic</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ANNOUNCEMENTS & POP-UP (PRD Section 8 & 17) */}
      {adminTab === 'announcement' && (
        <form onSubmit={handleSaveAnnouncement} className="p-8 rounded-3xl bg-[#0d121d] border border-slate-800 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <span>Configure Global Homepage Pop-up & Banner</span>
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono-code">
              <input
                type="checkbox"
                checked={annEnabled}
                onChange={(e) => setAnnEnabled(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-900 border-slate-700"
              />
              <span className={annEnabled ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {annEnabled ? 'Pop-up Active' : 'Pop-up Disabled'}
              </span>
            </label>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Pop-up Title</label>
              <input
                type="text"
                required
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-medium"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Description</label>
              <textarea
                rows={3}
                required
                value={annDesc}
                onChange={(e) => setAnnDesc(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Image Banner URL</label>
              <input
                type="url"
                value={annImg}
                onChange={(e) => setAnnImg(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono-code text-[11px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={annCtaText}
                  onChange={(e) => setAnnCtaText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">CTA URL / Anchor</label>
                <input
                  type="text"
                  value={annCtaUrl}
                  onChange={(e) => setAnnCtaUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono-code"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Publish Announcement Updates</span>
          </button>
        </form>
      )}

      {/* 3. EVENTS MANAGER (PRD Section 17) */}
      {adminTab === 'events' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">
              Events & Google Form Link Management ({events.length})
            </h3>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase bg-cyan-400 text-black hover:bg-cyan-300 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Event</span>
            </button>
          </div>

          {/* New Event Form */}
          {showEventForm && (
            <form onSubmit={handleCreateEvent} className="p-6 rounded-3xl bg-[#0d121d] border border-cyan-500/40 space-y-4 text-xs animate-in fade-in">
              <h4 className="font-heading text-sm font-bold text-white uppercase text-cyan-400">
                Create New Tournament / Activity
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Event Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Legends Trios Cup"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Game Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Valorant / Chess / BGMI"
                    value={newEventGame}
                    onChange={(e) => setNewEventGame(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Prize Pool</label>
                  <input
                    type="text"
                    value={newEventPrize}
                    onChange={(e) => setNewEventPrize(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Configurable Google Form URL (PRD Sec 11)</label>
                  <input
                    type="url"
                    required
                    value={newEventGoogleForm}
                    onChange={(e) => setNewEventGoogleForm(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-300 font-mono-code text-[11px]"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-heading font-bold text-xs uppercase"
                >
                  Create & Publish Event
                </button>
                <button
                  type="button"
                  onClick={() => setShowEventForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Events table */}
          <div className="p-6 rounded-3xl bg-[#0d121d] border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono-code">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">Title</th>
                  <th className="py-3 px-3">Game</th>
                  <th className="py-3 px-3">Prize</th>
                  <th className="py-3 px-3">Google Form URL</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {events.map((ev) => (
                  <tr key={ev.id} className="hover:bg-slate-800/40">
                    <td className="py-3 px-3 font-sans font-semibold text-white">{ev.title}</td>
                    <td className="py-3 px-3 text-cyan-300">{ev.game}</td>
                    <td className="py-3 px-3 text-amber-400 font-bold">{ev.prizePool}</td>
                    <td className="py-3 px-3 text-slate-400 truncate max-w-xs">{ev.googleFormUrl}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => deleteEvent(ev.id)}
                        className="p-1.5 text-rose-400 hover:bg-rose-950/60 rounded-lg transition-colors"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. GAMES CATALOG MANAGER (PRD Section 17) */}
      {adminTab === 'games' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">
              Games Directory Management ({games.length})
            </h3>
            <button
              onClick={() => setShowGameForm(!showGameForm)}
              className="px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase bg-purple-600 text-white hover:bg-purple-500 flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Game</span>
            </button>
          </div>

          {showGameForm && (
            <form onSubmit={handleCreateGame} className="p-6 rounded-3xl bg-[#0d121d] border border-purple-500/40 space-y-4 text-xs animate-in fade-in">
              <h4 className="font-heading text-sm font-bold text-white uppercase text-purple-400">
                Register New Game Title
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">Game Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Counter-Strike 2"
                    value={newGameTitle}
                    onChange={(e) => setNewGameTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Category</label>
                  <select
                    value={newGameCategory}
                    onChange={(e) => setNewGameCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  >
                    <option value="Esports">Esports</option>
                    <option value="Multiplayer Party">Multiplayer Party</option>
                    <option value="Mind Games">Mind Games</option>
                    <option value="Casual / Party">Casual / Party</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Game Mode</label>
                  <input
                    type="text"
                    placeholder="5v5 Competitive"
                    value={newGameMode}
                    onChange={(e) => setNewGameMode(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Artwork URL</label>
                  <input
                    type="url"
                    value={newGameArtwork}
                    onChange={(e) => setNewGameArtwork(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono-code text-[11px]"
                  />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-purple-600 text-white font-heading font-bold text-xs uppercase"
                >
                  Save Game to Catalog
                </button>
                <button
                  type="button"
                  onClick={() => setShowGameForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((g) => (
              <div key={g.id} className="p-4 rounded-2xl bg-[#0d121d] border border-slate-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={g.artwork} alt={g.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h5 className="font-heading text-sm font-bold text-white">{g.title}</h5>
                    <span className="text-[10px] text-purple-300 font-mono-code">{g.category}</span>
                  </div>
                </div>
                <button
                  onClick={() => deleteGame(g.id)}
                  className="p-1.5 text-rose-400 hover:bg-rose-950/60 rounded-lg"
                  title="Remove Game"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. QUIZZES MANAGER (PRD Section 12.3 & 17) */}
      {adminTab === 'quizzes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-bold text-white">
              In-House Quizzes ({quizzes.length})
            </h3>
          </div>

          <div className="space-y-4">
            {quizzes.map((q) => (
              <div key={q.id} className="p-5 rounded-3xl bg-[#0d121d] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-heading text-base font-bold text-white">{q.title}</h4>
                  <div className="flex flex-wrap gap-3 text-xs font-mono-code text-slate-400">
                    <span>Duration: {q.durationMinutes} mins</span>
                    <span>•</span>
                    <span>Questions: {q.questions.length}</span>
                    <span>•</span>
                    <span>Marking: +{q.marksPerQuestion} / -{q.negativeMarks}</span>
                    <span>•</span>
                    <span className="text-emerald-400">Leaderboard Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteQuiz(q.id)}
                    className="p-2 text-rose-400 hover:bg-rose-950/60 rounded-xl transition-colors"
                    title="Delete Quiz"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. SOCIETY POLLS MANAGER */}
      {adminTab === 'polls' && (
        <div className="space-y-6">
          <h3 className="font-heading text-lg font-bold text-white">
            Society Polls Management ({polls.length})
          </h3>

          <div className="space-y-4">
            {polls.map((p) => (
              <div key={p.id} className="p-5 rounded-3xl bg-[#0d121d] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code">
                  <span className="text-emerald-400">● {p.totalVotes} Votes Cast</span>
                  <span className="text-slate-400">Valid till {p.endDate}</span>
                </div>
                <h4 className="font-heading text-base font-bold text-white">{p.question}</h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono-code pt-1">
                  {p.options.map((opt) => (
                    <div key={opt.id} className="p-2 rounded-lg bg-slate-900 text-slate-300 flex justify-between">
                      <span>{opt.label}</span>
                      <strong className="text-white">{opt.votes}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. CONFIGURABLE EMAIL DOMAINS (PRD Section 6) */}
      {adminTab === 'domains' && (
        <div className="p-8 rounded-3xl bg-[#0d121d] border border-cyan-500/30 space-y-6 max-w-2xl">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span>Configurable IITM Student Email Domains</span>
            </h3>
            <p className="text-xs text-slate-400">
              Per PRD Section 6: "The accepted IITM email domain should be configurable from the admin system rather than permanently hard-coded."
            </p>
          </div>

          {/* Current Domains list */}
          <div className="space-y-2">
            <label className="text-xs font-mono-code text-slate-300">Active Allowed Domains:</label>
            <div className="flex flex-wrap gap-2">
              {allowedDomains.map((dom) => (
                <div
                  key={dom}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono-code text-xs flex items-center gap-2"
                >
                  <span>{dom}</span>
                  <button
                    onClick={() => removeAllowedDomain(dom)}
                    className="text-slate-500 hover:text-rose-400"
                    title="Remove Domain"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add domain form */}
          <form onSubmit={handleAddDomain} className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="@study.iitm.ac.in"
              value={newDomainInput}
              onChange={(e) => setNewDomainInput(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white font-mono-code"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 shadow"
            >
              Add Domain
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
