import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Gamepad2,
  Calendar,
  Award,
  Vote,
  Trophy,
  Users,
  ShieldCheck,
  ExternalLink,
  Heart,
  MessageSquare,
  Globe
} from 'lucide-react';

export default function Footer() {
  const { setCurrentView } = useApp();

  return (
    <footer className="bg-[#05070c] border-t border-cyan-900/30 text-slate-400 mt-auto relative overflow-hidden">
      {/* Background glow subtle effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-900/10 to-transparent blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/tesseract-logo.webp"
                alt="Tesseract Logo"
                className="h-10 w-10 object-contain drop-shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <div>
                <span className="font-heading text-xl font-black tracking-widest text-white">
                  TESSERACT
                </span>
                <span className="block text-[10px] font-mono-code text-cyan-400 tracking-wider">
                  ESPORTS SOCIETY • IIT MADRAS BS
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The central digital esports and gaming hub of IIT Madras BS. Where students discover games, compete in campus championships, test knowledge via in-house quizzes, and shape society governance through polls.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-semibold bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                IITM BS Verified Hub
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono-code bg-slate-900 text-slate-400 border border-slate-800">
                PRD v1.0
              </span>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-semibold text-white tracking-widest uppercase text-cyan-400">
              Platform Hub
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setCurrentView('games'); window.scrollTo(0, 0); }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Featured Games</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('events'); window.scrollTo(0, 0); }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Tournaments & Events</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('quizzes'); window.scrollTo(0, 0); }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-cyan-500" />
                  <span>In-House Quizzes</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('polls'); window.scrollTo(0, 0); }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Vote className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Society Polls</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('leaderboard'); window.scrollTo(0, 0); }}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Rankings & Leaderboard</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Society & About */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-semibold text-white tracking-widest uppercase text-purple-400">
              Society & Team
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => { setCurrentView('team'); window.scrollTo(0, 0); }}
                  className="hover:text-purple-300 transition-colors flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-purple-400" />
                  <span>Leadership & Council</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('about'); window.scrollTo(0, 0); }}
                  className="hover:text-purple-300 transition-colors"
                >
                  About Tesseract
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('profile'); window.scrollTo(0, 0); }}
                  className="hover:text-purple-300 transition-colors"
                >
                  Student Profile
                </button>
              </li>
              <li>
                <a
                  href="https://tesseract.iitmbs.org"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-300 transition-colors flex items-center gap-1"
                >
                  <span>Live Legacy Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-heading font-semibold text-white tracking-widest uppercase text-emerald-400">
              Connect With Us
            </h4>
            <div className="space-y-2.5 text-sm">
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded bg-indigo-600/30 flex items-center justify-center text-indigo-400">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <span>Official Discord Server</span>
              </a>

              <a
                href="https://chat.whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded bg-emerald-600/30 flex items-center justify-center text-emerald-400">
                  <Globe className="w-3.5 h-3.5" />
                </div>
                <span>WhatsApp Community</span>
              </a>

              <div className="pt-2 text-xs text-slate-500 font-mono-code">
                Support: <span className="text-slate-400">esports@study.iitm.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright and disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Tesseract Esports Society • IIT Madras BS Program. All rights reserved.</p>
          <p className="flex items-center gap-1 text-slate-400">
            Engineered by <span className="text-cyan-400 font-medium">Tesseract WebOps</span> for the IITM BS community
          </p>
        </div>
      </div>
    </footer>
  );
}
