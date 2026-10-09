import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Trophy,
  ShieldCheck,
  ExternalLink,
  ArrowRight,
  X,
  CheckCircle2,
  AlertCircle,
  Lock,
  Search,
  Filter,
  Users,
  Sparkles,
  FileText
} from 'lucide-react';

export default function EventsView() {
  const {
    events,
    accountState,
    user,
    setIsAuthModalOpen,
    registerForEvent,
    selectedEventForModal,
    setSelectedEventForModal
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [registrationModalEvent, setRegistrationModalEvent] = useState(null);
  const [hasConfirmedRegistration, setHasConfirmedRegistration] = useState(false);

  const categories = ['All', 'Tournament', 'Gaming Event', 'Workshop', 'Community'];

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeFilter === 'All' || event.eventType.toLowerCase().includes(activeFilter.toLowerCase());
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.game.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleStartRegistration = (event) => {
    if (accountState === 'guest') {
      setIsAuthModalOpen(true);
      return;
    }
    if (accountState === 'unverified') {
      alert('Your IITM email is unverified. Please verify your student email first.');
      return;
    }
    setRegistrationModalEvent(event);
    setHasConfirmedRegistration(false);
  };

  const handleProceedToGoogleForm = () => {
    if (!registrationModalEvent) return;
    registerForEvent(registrationModalEvent.id);
    setHasConfirmedRegistration(true);
    // In production opens Google Form in a new tab:
    if (registrationModalEvent.googleFormUrl) {
      window.open(registrationModalEvent.googleFormUrl, '_blank');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>PRD SECTIONS 10 & 11 • TOURNAMENTS & ACTIVITIES</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
            Tesseract Events & Tournaments
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
            Register for inter-house cups, esports invitationals, live casting workshops, and gaming festivals.
          </p>
        </div>

        {/* Guest prompt */}
        {accountState === 'guest' && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-semibold block">Verified Student Access Required</span>
              <span>Sign in with your IITM student email to register for events.</span>
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
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === cat
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search events, games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredEvents.map((event) => {
          const isUserRegistered = user?.registeredEvents?.includes(event.id);

          return (
            <div
              key={event.id}
              className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-cyan-500/50 overflow-hidden transition-all duration-300 flex flex-col shadow-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
            >
              {/* Event Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                <img
                  src={event.banner}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-black/20 to-transparent"></div>

                <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase bg-cyan-500 text-black shadow">
                    {event.eventType}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono-code bg-black/70 text-slate-200 backdrop-blur-md border border-white/10">
                    {event.game}
                  </span>
                </div>

                <div className="absolute bottom-3 right-4 px-3.5 py-1.5 rounded-xl bg-amber-400 text-black font-heading font-black text-xs shadow-lg flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-black" />
                  <span>Pool: {event.prizePool}</span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{event.date} • {event.time}</span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400 font-mono-code">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                      Format: <strong className="text-slate-200">{event.format}</strong>
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                      Reg Deadline: <strong className="text-amber-300">{event.registrationDeadline}</strong>
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedEventForModal(event)}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
                  >
                    Event Details & Rules
                  </button>

                  {isUserRegistered ? (
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold font-heading bg-emerald-950/70 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Registered</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleStartRegistration(event)}
                      className="px-5 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 to-sky-300 hover:opacity-95 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-1.5"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EVENT DETAIL MODAL (PRD Section 10: Event detail pages should contain overview, schedule, eligibility, rules, prize pool and registration CTA) */}
      {selectedEventForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0d121d] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="relative h-56 w-full overflow-hidden shrink-0">
              <img
                src={selectedEventForModal.banner}
                alt={selectedEventForModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d121d] via-[#0d121d]/60 to-transparent"></div>

              <button
                onClick={() => setSelectedEventForModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-slate-300 hover:text-white border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase bg-cyan-400 text-black">
                      {selectedEventForModal.eventType}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono-code bg-black/70 text-slate-300">
                      {selectedEventForModal.game}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                    {selectedEventForModal.title}
                  </h2>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="text-xs font-mono-code text-slate-400 uppercase">Prize Pool</div>
                  <div className="font-heading text-xl font-black text-amber-400">
                    {selectedEventForModal.prizePool}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable details */}
            <div className="p-6 space-y-6 overflow-y-auto">
              <div>
                <h4 className="text-xs font-mono-code uppercase text-cyan-400 tracking-wider mb-1">
                  Event Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedEventForModal.description}
                </p>
              </div>

              {/* Prize Pool Breakdown */}
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-xs font-heading font-bold text-white uppercase block">
                      Prize Distribution
                    </span>
                    <span className="text-xs text-amber-200">
                      {selectedEventForModal.prizeBreakdown || selectedEventForModal.prizePool}
                    </span>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                <h4 className="text-xs font-heading font-bold text-white tracking-wider uppercase flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Tournament Schedule</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedEventForModal.schedule?.map((step, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility & Rules */}
              <div className="space-y-2">
                <h4 className="text-xs font-heading font-bold text-white tracking-wider uppercase flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Eligibility & Rules</span>
                </h4>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-slate-200">
                    Eligibility: {selectedEventForModal.eligibility}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 text-slate-400">
                    {selectedEventForModal.rules?.map((rule, idx) => (
                      <li key={idx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Registration CTA */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    const ev = selectedEventForModal;
                    setSelectedEventForModal(null);
                    handleStartRegistration(ev);
                  }}
                  className="flex-1 py-3 px-5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Register via Official Google Form</span>
                </button>
                <button
                  onClick={() => setSelectedEventForModal(null)}
                  className="py-3 px-6 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900 hover:bg-slate-800 border border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GOOGLE FORM REGISTRATION SIMULATOR MODAL (PRD Section 11:
          Flow: Event -> Login check -> Verified student -> Register Now -> Google Form) */}
      {registrationModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0d121d] border border-cyan-500/50 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-7 space-y-5 animate-in zoom-in-95">
            <button
              onClick={() => setRegistrationModalEvent(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono-code text-cyan-400 uppercase tracking-wider block">
                  PRD Section 11 Google Form Gateway
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  Event Registration Verification
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="text-slate-400">Target Event:</div>
              <div className="font-heading text-base font-bold text-white">
                {registrationModalEvent.title}
              </div>
              <div className="text-slate-400 flex items-center gap-2">
                <span>Date: {registrationModalEvent.date}</span>
                <span>•</span>
                <span>Prize: {registrationModalEvent.prizePool}</span>
              </div>
            </div>

            {/* Verified Student pre-fill preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono-code">
                <span className="text-slate-400">Verified Student Credentials:</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> IITM Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono-code">
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">NAME</span>
                  <span className="text-white font-medium">{user?.name}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">IITM EMAIL</span>
                  <span className="text-cyan-300 font-medium truncate block">{user?.email}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-xs text-blue-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Per PRD Section 11, registration is routed to the configured Google Form for roster logging. Your student status has been validated.
                </span>
              </div>
            </div>

            {hasConfirmedRegistration ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-heading text-base font-bold text-white">
                  Registration Form Opened!
                </h4>
                <p className="text-xs text-emerald-200">
                  The event has also been pinned to your student profile under "My Registered Events".
                </p>
                <button
                  onClick={() => setRegistrationModalEvent(null)}
                  className="mt-2 px-5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-white hover:bg-slate-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleProceedToGoogleForm}
                  className="flex-1 py-3 px-5 rounded-xl font-heading text-xs font-bold uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow flex items-center justify-center gap-2"
                >
                  <span>Proceed to Google Form</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRegistrationModalEvent(null)}
                  className="py-3 px-5 rounded-xl text-xs font-semibold text-slate-400 bg-slate-900 hover:bg-slate-800"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
