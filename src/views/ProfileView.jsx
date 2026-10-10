import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShieldCheck,
  Mail,
  Gamepad2,
  Calendar,
  Award,
  Vote,
  Edit3,
  CheckCircle2,
  Trophy,
  Sparkles,
  ExternalLink,
  X,
  Target,
  Flame,
  Zap
} from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState('events');
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user?.name || '');
  const [editGamerTag, setEditGamerTag] = useState(user?.gamerTag || '');
  const [editBio, setEditBio] = useState(user?.bio || '');
  const [editAvatar, setEditAvatar] = useState(user?.avatar || '');

  if (!user || accountState === 'guest') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 mx-auto flex items-center justify-center text-slate-500 shadow-xl">
          <User className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          Sign In to Access Student Profile
        </h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Sign in with your verified IIT Madras BS student email to view your tournament registrations, quiz scores, and poll history.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-xl btn-cyber-primary text-xs uppercase tracking-wider shadow"
        >
          Sign In Now
        </button>
      </div>
    );
  }

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

  const userEvents = events.filter(e => user?.registeredEvents?.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header Card */}
      <div className="relative p-7 sm:p-10 rounded-3xl glass-panel border-cyan-500/35 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-cyan-500/40 shadow-2xl"
              />
              {user.verified && (
                <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-cyan-400 text-black shadow-lg" title="Verified IITM BS Student">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono-code font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {user.gamerTag || 'PLAYER'}
                </span>
                {user.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-xs font-mono-code bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified IITM BS
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{user.email}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-xl pt-1 leading-relaxed">
                {user.bio || 'IIT Madras BS Degree student. Esports and tactical gaming enthusiast.'}
              </p>

              {/* Gaming Interests & Favorite Games */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {user.favoriteGames?.map((g, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-code bg-purple-950/80 text-purple-300 border border-purple-500/30">
                    🎮 {g}
                  </span>
                ))}
                {user.gamingInterests?.map((tag, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md text-[11px] font-mono-code bg-slate-900 text-slate-300 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setEditName(user.name);
              setEditGamerTag(user.gamerTag || '');
              setEditBio(user.bio || '');
              setEditAvatar(user.avatar || '');
              setIsEditing(true);
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-2 self-start md:self-auto shrink-0 shadow"
          >
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4">
        {[
          { id: 'events', label: 'My Registered Events', icon: Calendar, count: userEvents.length },
          { id: 'quizzes', label: 'My Quiz Attempts', icon: Award, count: user.quizAttempts?.length || 0 },
          { id: 'polls', label: 'My Poll Votes', icon: Vote, count: Object.keys(user.pollVotes || {}).length },
          { id: 'badges', label: 'Badges & Achievements', icon: Trophy, count: 4 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono-code ${
                isActive ? 'bg-black/20 text-black' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {/* 1. My Events */}
      {activeTab === 'events' && (
        <div className="space-y-4">
          {userEvents.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-card text-slate-400 space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-slate-600" />
              <p>You haven't registered for any tournaments yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {userEvents.map(event => (
                <div key={event.id} className="p-6 rounded-3xl glass-card space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono-code font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {event.eventType} • {event.game}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono-code text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Form Logged
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {event.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono-code">
                    Date: {event.date} • Prize: {event.prizePool}
                  </div>
                  <div className="pt-2 flex items-center justify-between text-xs font-mono-code">
                    <span className="text-slate-500">Google Form Connected</span>
                    <a
                      href={event.googleFormUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Open Form Slip</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. My Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="space-y-4">
          {(!user.quizAttempts || user.quizAttempts.length === 0) ? (
            <div className="p-12 text-center rounded-3xl glass-card text-slate-400 space-y-2">
              <Award className="w-8 h-8 mx-auto text-slate-600" />
              <p>No quiz attempts recorded yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.quizAttempts.map((attempt, idx) => (
                <div key={idx} className="p-6 rounded-3xl glass-card space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono-code">
                    <span className="text-slate-400">Attempted: {attempt.completedAt}</span>
                    <span className="text-amber-400 font-bold">Rank #{attempt.rank || 2}</span>
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">
                    {attempt.quizTitle}
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono-code pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">SCORE EARNED</span>
                      <span className="text-white font-bold">{attempt.score} / {attempt.totalPossible} pts</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-slate-500 block text-[10px]">TIME TAKEN</span>
                      <span className="text-cyan-400 font-bold">{attempt.timeTaken}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. My Poll Votes */}
      {activeTab === 'polls' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(user.pollVotes || {}).map(([pollId, optId]) => {
              const pollObj = polls.find(p => p.id === pollId);
              const optObj = pollObj?.options?.find(o => o.id === optId);

              return (
                <div key={pollId} className="p-6 rounded-3xl glass-card space-y-2">
                  <span className="text-[10px] font-mono-code text-emerald-400 uppercase tracking-wider block font-bold">
                    Verified Vote Cast
                  </span>
                  <h4 className="font-heading text-sm font-bold text-white">
                    {pollObj?.question || 'Society Poll'}
                  </h4>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300 font-medium font-mono-code">
                    Your choice: {optObj?.label || 'Option selected'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Badges & Achievements */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          <div className="p-5 rounded-3xl glass-card border-cyan-500/30 text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
              🛡️
            </div>
            <h4 className="font-heading text-xs font-bold text-white uppercase">IITM BS Verified</h4>
            <p className="text-[11px] text-slate-400">Authenticated student domain credentials.</p>
          </div>

          <div className="p-5 rounded-3xl glass-card border-purple-500/30 text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 text-purple-400 mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
              🧠
            </div>
            <h4 className="font-heading text-xs font-bold text-white uppercase">Quiz Master</h4>
            <p className="text-[11px] text-slate-400">Top 3 podium ranking on timed MCQ quiz.</p>
          </div>

          <div className="p-5 rounded-3xl glass-card border-amber-500/30 text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
              ⚔️
            </div>
            <h4 className="font-heading text-xs font-bold text-white uppercase">Esports Contender</h4>
            <p className="text-[11px] text-slate-400">Enrolled in inter-house championship.</p>
          </div>

          <div className="p-5 rounded-3xl glass-card border-emerald-500/30 text-center space-y-2.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center font-bold text-2xl shadow-inner">
              🗳️
            </div>
            <h4 className="font-heading text-xs font-bold text-white uppercase">Society Voter</h4>
            <p className="text-[11px] text-slate-400">Participated in democratic community polls.</p>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md bg-[#0a0f1d] border border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-heading text-lg font-bold text-white">
              Edit Student Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Gamer Tag / Username</label>
                <input
                  type="text"
                  value={editGamerTag}
                  onChange={(e) => setEditGamerTag(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono-code"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Short Bio</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Avatar Image URL</label>
                <input
                  type="url"
                  value={editAvatar}
                  onChange={(e) => setEditAvatar(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono-code text-[11px]"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl btn-cyber-primary text-xs uppercase"
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
