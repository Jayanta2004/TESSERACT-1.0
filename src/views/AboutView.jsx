import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Info,
  ShieldCheck,
  Gamepad2,
  ChevronDown,
  Sparkles,
  Award,
  Globe,
  ExternalLink
} from 'lucide-react';

export default function AboutView() {
  const { setCurrentView } = useApp();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Who is eligible to participate in Tesseract tournaments and quizzes?",
      a: "All actively enrolled students in the IIT Madras BS in Data Science & Applications and BS in Electronic Systems degree programs with a valid '@study.iitm.ac.in', '@ds.study.iitm.ac.in', or '@es.study.iitm.ac.in' student email address are eligible."
    },
    {
      q: "How does event registration work with Google Forms?",
      a: "Under the v1.0 architecture outlined in PRD Section 11, tournament registration is initiated on the Tesseract platform after validating your student account. Clicking 'Register Now' routes you to the official pre-configured Google Form where team rosters, in-game IDs, and discord tags are officially recorded."
    },
    {
      q: "How does the in-house Quiz Engine work?",
      a: "Tesseract built its own native quiz engine to replace external dependency on third-party platforms like Unstop. Quizzes feature real-time server-side timers, automated timeout submission, configurable negative marking, and automated leaderboard rankings with tie-breaking rules."
    },
    {
      q: "Can I vote in society polls?",
      a: "Yes! Every verified student account is allocated exactly one vote per poll. Polls directly guide the society leadership on tournament choices, game additions, and community policies."
    },
    {
      q: "How do I join the WebOps or Design team?",
      a: "Tesseract conducts open recruitment drives each term for WebOps engineers, tournament referees, student shoutcasters, and graphics designers. Keep an eye on our announcements!"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
          <Info className="w-3.5 h-3.5" />
          <span>ABOUT TESSERACT ESPORTS SOCIETY</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
          The Digital Home of Esports at IITM BS
        </h1>
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Uniting online learners across India and the globe through friendly rivalry, competitive excellence, and vibrant student camaraderie.
        </p>
      </div>

      {/* Story & Manifesto */}
      <div className="p-8 sm:p-10 rounded-3xl glass-panel border-cyan-500/35 space-y-6 shadow-2xl">
        <div className="flex items-center gap-3">
          <img
            src="/tesseract-logo.webp"
            alt="Tesseract Logo"
            className="w-10 h-10 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <h2 className="font-heading text-2xl font-black text-white">
            Our Story & Manifesto
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Founded in 2024 by visionary students of the pioneering IIT Madras BS Degree program, Tesseract was born from a fundamental observation: while BS students are geographically dispersed across hundreds of cities, their shared enthusiasm for tactical gaming, strategy, and chess is boundless.
        </p>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Today, Tesseract has grown into the largest active gaming and digital society in the IIT Madras BS ecosystem — hosting collegiate tournaments with cash prize pools, hosting weekly casual scrims, broadcasting live matches with student casters, and fostering democratic governance.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono-code text-xs">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-cyan-400 font-bold block text-sm mb-1">🎮 Zero Gatekeeping</span>
            <span className="text-slate-400">Casual gamers, mobile battlers, and hardcore FPS pros all have a home.</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-purple-400 font-bold block text-sm mb-1">⚡ 100% Student-Run</span>
            <span className="text-slate-400">Built, maintained, and operated solely by enrolled IITM BS undergraduates.</span>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
            <span className="text-emerald-400 font-bold block text-sm mb-1">🛡️ Verified Integrity</span>
            <span className="text-slate-400">Restricted to authenticated students to maintain sportsmanship and fair play.</span>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Everything you need to know about Tesseract participation.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-[#0d121d] border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left font-heading text-sm sm:text-base font-semibold text-white flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
