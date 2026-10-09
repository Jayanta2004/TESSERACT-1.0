import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ExternalLink, Calendar, Bell, Sparkles } from 'lucide-react';

export default function GlobalAnnouncementModal() {
  const {
    announcement,
    isAnnouncementOpen,
    setIsAnnouncementOpen,
    setCurrentView
  } = useApp();

  if (!isAnnouncementOpen || !announcement || !announcement.enabled) {
    return null;
  }

  const handleCtaClick = () => {
    setIsAnnouncementOpen(false);
    if (announcement.ctaUrl?.startsWith('#')) {
      const view = announcement.ctaUrl.replace('#', '');
      if (['events', 'games', 'quizzes', 'polls', 'team', 'about'].includes(view)) {
        setCurrentView(view);
      }
    } else if (announcement.ctaUrl?.startsWith('http')) {
      window.open(announcement.ctaUrl, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-[#0d121e] border border-cyan-500/40 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.25)] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Glow & Decorative Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
          {announcement.image ? (
            <img
              src={announcement.image}
              alt={announcement.title}
              className="w-full h-full object-cover brightness-75 hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-cyan-400 opacity-40 animate-pulse" />
            </div>
          )}

          {/* Close button */}
          <button
            onClick={() => setIsAnnouncementOpen(false)}
            className="absolute top-3.5 right-3.5 p-2 rounded-full bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white border border-white/20 transition-all duration-150 backdrop-blur-sm"
            aria-label="Close Announcement"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge */}
          <div className="absolute bottom-3 left-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase tracking-wider bg-rose-600/90 text-white shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              Official Society Notice
            </span>
            {announcement.endDate && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono-code bg-black/70 text-slate-300 border border-white/10 backdrop-blur-md">
                <Calendar className="w-3 h-3 text-cyan-400" />
                Valid till {announcement.endDate}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-4">
          <h3 className="font-heading text-xl sm:text-2xl font-black text-white tracking-wide leading-snug">
            {announcement.title}
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {announcement.description}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            {announcement.ctaText && (
              <button
                onClick={handleCtaClick}
                className="w-full sm:flex-1 py-3 px-5 rounded-2xl font-heading text-sm font-bold uppercase tracking-wider text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 hover:opacity-95 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>{announcement.ctaText}</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setIsAnnouncementOpen(false)}
              className="w-full sm:w-auto py-3 px-5 rounded-2xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
            >
              Dismiss
            </button>
          </div>

          <div className="pt-2 text-center">
            <span className="text-[11px] text-slate-500 font-mono-code">
              PRD Section 8 • Configurable in Admin Control Center
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
