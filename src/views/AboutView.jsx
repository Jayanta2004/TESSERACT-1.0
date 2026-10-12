import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AboutView() {
  const { setCurrentView, showToast } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [faqCategory, setFaqCategory] = useState('all');
  const [faqSearch, setFaqSearch] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'eligibility',
      label: 'ELIGIBILITY',
      question: 'Who is eligible to participate in Tesseract leagues and tournaments?',
      answer: 'Every officially enrolled student in the IIT Madras BS in Data Science and Applications or BS in Electronic Systems program holding an active @study.iitm.ac.in webmail is fully eligible. This spans all academic terms: Foundation, Diploma in Programming, Diploma in Data Science, and BS Degree Level.'
    },
    {
      id: 2,
      category: 'brackets',
      label: 'BRACKETS',
      question: 'How do tournament brackets, house allocations, and match scheduling work for asynchronous students?',
      answer: 'We run custom Swiss-system and double-elimination brackets engineered specifically for distributed timezones. Students are programmatically routed into their respective Inter-House rosters (House Turing, Ramanujan, Archimedes, or Aryabhata). Matches occur during sanctioned evening windows (20:00–23:00 IST) with asynchronous marshal dispute tribunals.'
    },
    {
      id: 3,
      category: 'quiz',
      label: 'QUIZ ARENA',
      question: 'Why did Tesseract replace Unstop and external platforms with a native in-house quiz arena?',
      answer: "External commercial exam tools like Unstop or Google Forms suffer from severe latency leakage, lack sub-millisecond tie-breaker resolution, and fail to prevent tab-switching or multi-account abuse. Tesseract's proprietary In-House MCQ Arena features sub-18ms edge synchronization, automated negative marking calibration (+4 / -1), SHA-256 student roll tokenization, and anti-tamper hardware clock auditing."
    },
    {
      id: 4,
      category: 'guild',
      label: 'WEBOPS GUILD',
      question: 'How do I apply to join the WebOps, Systems Architecture, or Design Operations squads?',
      answer: 'WebOps recruitment opens each term prior to qualifiers. Any BS student with skills in Next.js, Rust/Wasm, Discord Bot development (Node.js/Go), Figma/Tailwind cybernetic design systems, or live OBS esports broadcasting can submit an application via our WebOps Guild portal. Contributors earn recognized Senate governance credits.'
    },
    {
      id: 5,
      category: 'awards',
      label: 'AWARDS',
      question: 'Are prizes cash rewards or academic scholarship points?',
      answer: 'Tournaments feature verified cash prize pools (disbursed directly via UPI to verified student bank accounts) alongside permanent Inter-House Championship Trophy points, verified PDF credentials cryptographically stamped into your Student Esports Passport, and Senate honor roll citations.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCat = faqCategory === 'all' || faq.category === faqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Telemetry Sub-Header & Metadata */}
      <section className="w-full bg-[#0a0e18]/80 backdrop-blur-md px-margin py-3 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 font-mono-code text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-bold uppercase border border-cyan-400/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              SYS::MANIFESTO
            </span>
            <span className="text-slate-600">//</span>
            <span className="text-slate-400 tracking-wider uppercase">
              INSTITUTIONAL CHARTER &amp; KNOWLEDGE BASE • CODIFIED S03
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              RATIFIED BY STUDENT SENATE // REV 3.4.1
            </span>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass-panel hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/10"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              Verify On GitHub
            </a>
            <button
              onClick={() => showToast("Downloading Official Tesseract Constitution & Academic Charter (PDF)...", "info")}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-heading text-xs hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(6,182,212,0.3)] font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">download</span>
              Download Charter PDF
            </button>
          </div>
        </div>
      </section>

      {/* Hero & Charter Manifesto Intro */}
      <section className="w-full relative px-margin py-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-8">
          <div className="flex flex-col gap-2 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="font-mono-code text-xs text-cyan-400 tracking-widest uppercase font-bold">
                OFFICIAL IITM BS ESPORTS REGISTRY
              </span>
              <span className="text-slate-600">•</span>
              <span className="font-mono-code text-xs text-amber-400 tracking-widest uppercase font-bold">
                CONSTITUTIONAL STATUTE
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl text-white tracking-tight uppercase leading-tight font-bold">
              THE TESSERACT MANIFESTO &amp; ACADEMIC CHARTER
            </h1>
            <p className="font-body text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              Building a borderless, decentralized gaming home for IIT Madras BS scholars across 28 states and 4 timezones.
            </p>
          </div>

          {/* Founding Narrative & Interactive Blueprint */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Story Column */}
            <div className="lg:col-span-7 flex flex-col justify-between glass-card p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden border border-white/10">
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-[20px]">history_edu</span>
                  <span className="font-heading text-sm text-white uppercase tracking-wider font-bold">The Genesis // Early 2024</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-slate-200 leading-relaxed">
                  Founded in early 2024 by asynchronous remote students pursuing the <span className="text-cyan-300 font-semibold">BS in Data Science &amp; Applications</span> and <span className="text-cyan-300 font-semibold">BS in Electronic Systems</span>, Tesseract emerged from a shared frustration: the profound isolation of solitary screens, late-night code submissions, and disconnected living rooms across the subcontinent.
                </p>
                <p className="font-body text-xs sm:text-sm text-slate-400 leading-relaxed">
                  What began as unstructured voice rooms and disparate Discord channels was swiftly forged into an official, sovereign collegiate powerhouse. We engineered custom tournament telemetries, proprietary low-latency quiz engines, hardware-audited bracket architectures, and a representative student government—proving that premier campus culture thrives wherever high bandwidth and collective passion meet.
                </p>
              </div>

              {/* Mission Quote Glass Panel */}
              <div className="mt-6 p-5 rounded-xl glass-panel relative border border-white/10">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-[26px] shrink-0">format_quote</span>
                  <div className="flex flex-col gap-1">
                    <blockquote className="font-body text-xs sm:text-sm text-slate-200 italic font-normal leading-relaxed">
                      "To dismantle the physical boundaries of an asynchronous degree, engineering collegiate esports as a high-trust digital campus square where competitive grit, software engineering, and academic camaraderie collide."
                    </blockquote>
                    <span className="font-mono-code text-[11px] text-cyan-400 mt-1 uppercase tracking-wider font-semibold">
                      — Ratified Preamble, Tesseract Collegiate Assembly
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic / Visual Telemetry Mosaic Card */}
            <div className="lg:col-span-5 flex flex-col justify-between glass-card p-6 md:p-8 rounded-2xl shadow-xl relative overflow-hidden border border-white/10">
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-sm text-white uppercase font-bold">NODE DENSITY RADAR</span>
                  <span className="font-mono-code text-[11px] text-emerald-400 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE RELAY ACTIVE
                  </span>
                </div>
                <span className="font-body text-xs text-slate-400">Real-time geographic dispersion across regional study clusters.</span>
              </div>

              {/* Inline Telemetry Radar Visualization */}
              <div className="w-full flex items-center justify-center p-4">
                <svg className="w-full max-w-[260px] aspect-square" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" r="65" stroke="rgba(255,255,255,0.12)" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" r="40" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" fill="#06b6d4" fillOpacity="0.15" r="15"></circle>
                  <line stroke="rgba(255,255,255,0.08)" strokeWidth="1" x1="10" x2="190" y1="100" y2="100"></line>
                  <line stroke="rgba(255,255,255,0.08)" strokeWidth="1" x1="100" x2="100" y1="10" y2="190"></line>
                  <polygon fill="#06b6d4" fillOpacity="0.12" points="100,28 165,75 142,160 55,145 40,80" stroke="#06b6d4" strokeWidth="1.5"></polygon>
                  <circle cx="100" cy="28" fill="#10b981" r="3.5"></circle>
                  <circle cx="165" cy="75" fill="#06b6d4" r="3.5"></circle>
                  <circle cx="142" cy="160" fill="#06b6d4" r="3.5"></circle>
                  <circle cx="55" cy="145" fill="#f59e0b" r="3.5"></circle>
                  <circle cx="40" cy="80" fill="#06b6d4" r="3.5"></circle>
                  <circle cx="100" cy="100" fill="#ffffff" r="3"></circle>
                  <text fill="#94a3b8" fontFamily="JetBrains Mono, monospace" fontSize="7" x="105" y="112">IITM CHENNAI</text>
                </svg>
              </div>

              <div className="flex items-center justify-between pt-3 glass-panel p-3.5 rounded-xl border border-white/10 font-mono-code text-xs">
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase">ENCRYPTION PROTOCOL</span>
                  <span className="text-white font-bold">SHA-256 STUDENT TOKEN</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase">AUTHENTICATION</span>
                  <span className="text-emerald-400 font-bold">OAUTH2 / GOOGLE SSO</span>
                </div>
              </div>
            </div>
          </div>

          {/* The 3 Core Tenets Grid */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-wider font-bold">CONSTITUTIONAL ARTICLES</span>
                <span className="text-slate-600">//</span>
                <span className="font-mono-code text-xs text-slate-400 uppercase">TRI-PILLAR SYSTEM</span>
              </div>
              <span className="font-mono-code text-[11px] text-slate-500 hidden sm:inline uppercase">PERMANENT UNALTERABLE COVENANTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tenet 01 */}
              <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-cyan-400/40 transition-all shadow-xl group border border-white/10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-mono-code text-[10px] font-bold tracking-wider uppercase border border-cyan-400/30">
                      TENET 01
                    </span>
                    <span className="material-symbols-outlined text-cyan-400 text-[24px] group-hover:scale-110 transition-transform">lock_open_right</span>
                  </div>
                  <h2 className="font-heading text-lg text-white uppercase font-bold group-hover:text-cyan-300 transition-colors">ZERO GATEKEEPING</h2>
                  <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                    No rank elitism, no regional bias, and zero hardware barriers. Whether you are an unranked casual exploring chess blitz or a Faceit Level 10 CS2 rifler, every matriculated BS student has equal access to inter-house leagues, custom scrim lobbies, and talent development tracks.
                  </p>
                </div>
                <div className="pt-4 mt-6 flex items-center justify-between text-slate-400 font-mono-code text-xs border-t border-white/10">
                  <span>ACCESS PRINCIPLE</span>
                  <span className="text-white font-semibold">ALL TIERS QUALIFIED</span>
                </div>
              </div>

              {/* Tenet 02 */}
              <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-emerald-400/40 transition-all shadow-xl group border border-white/10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono-code text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">
                      TENET 02
                    </span>
                    <span className="material-symbols-outlined text-emerald-400 text-[24px] group-hover:scale-110 transition-transform">terminal</span>
                  </div>
                  <h2 className="font-heading text-lg text-white uppercase font-bold group-hover:text-emerald-300 transition-colors">100% STUDENT AUTONOMY</h2>
                  <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                    From our millisecond tie-breaker quiz engines to automated Discord scrim bots, our entire infrastructure is built, maintained, and governed by students under an open-source charter. Zero commercial sponsorship dictate, zero bureaucratic delay.
                  </p>
                </div>
                <div className="pt-4 mt-6 flex items-center justify-between text-slate-400 font-mono-code text-xs border-t border-white/10">
                  <span>INFRASTRUCTURE</span>
                  <span className="text-emerald-400 font-semibold">STUDENT-OPERATED</span>
                </div>
              </div>

              {/* Tenet 03 */}
              <div className="glass-card p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:border-amber-400/40 transition-all shadow-xl group border border-white/10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-mono-code text-[10px] font-bold tracking-wider uppercase border border-amber-500/30">
                      TENET 03
                    </span>
                    <span className="material-symbols-outlined text-amber-400 text-[24px] group-hover:scale-110 transition-transform">shield</span>
                  </div>
                  <h2 className="font-heading text-lg text-white uppercase font-bold group-hover:text-amber-300 transition-colors">GAMING INTEGRITY</h2>
                  <p className="font-body text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Competitive excellence anchored by strict anti-sybil student SSO authentication (@study.iitm.ac.in roll validation), ring-0 kernel anti-cheat audits, transparent referendums, and non-negotiable adherence to the IIT Madras Student Code of Conduct.
                  </p>
                </div>
                <div className="pt-4 mt-6 flex items-center justify-between text-slate-400 font-mono-code text-xs border-t border-white/10">
                  <span>SECURITY LEVEL</span>
                  <span className="text-amber-400 font-semibold">SSO TOKENIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Telemetry Stats Row */}
      <section className="w-full px-margin py-10 border-y border-white/10 bg-[#0a0e18]/40">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col gap-1.5 p-5 glass-card rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono-code text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">ACTIVE ATHLETES</span>
            <span className="font-heading text-3xl sm:text-4xl text-white tracking-tight font-bold">1,420+</span>
            <span className="font-body text-xs text-slate-400">Matriculated BS Competitors</span>
          </div>
          <div className="flex flex-col gap-1.5 p-5 glass-card rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono-code text-[11px] text-purple-400 uppercase tracking-wider font-semibold">HOUSE HOUSES</span>
            <span className="font-heading text-3xl sm:text-4xl text-white tracking-tight font-bold">4 HOUSES</span>
            <span className="font-body text-xs text-slate-400">Turing, Ramanujan, Archimedes, Aryabhata</span>
          </div>
          <div className="flex flex-col gap-1.5 p-5 glass-card rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono-code text-[11px] text-emerald-400 uppercase tracking-wider font-semibold">TERRITORY DENSITY</span>
            <span className="font-heading text-3xl sm:text-4xl text-white tracking-tight font-bold">28 STATES</span>
            <span className="font-body text-xs text-slate-400">&amp; Union Territories Enrolled</span>
          </div>
          <div className="flex flex-col gap-1.5 p-5 glass-card rounded-2xl border border-white/10 shadow-lg">
            <span className="font-mono-code text-[11px] text-amber-400 uppercase tracking-wider font-semibold">SOURCE CODE</span>
            <span className="font-heading text-3xl sm:text-4xl text-white tracking-tight font-bold">100% OSS</span>
            <span className="font-body text-xs text-slate-400">Open Source WebOps Telemetry</span>
          </div>
        </div>
      </section>

      {/* Interactive Accordion FAQ Section */}
      <section className="w-full px-margin py-12">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="font-mono-code text-xs text-cyan-400 uppercase tracking-widest font-semibold">
                  INSTITUTIONAL KNOWLEDGE BASE
                </span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl text-white uppercase tracking-tight font-bold">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="font-body text-sm text-slate-300">
                Operational guidelines, academic eligibility requirements, tournament architecture, and guild recruitment.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: 'all', label: 'All Inquiries' },
                { id: 'eligibility', label: 'Eligibility' },
                { id: 'brackets', label: 'Tournaments' },
                { id: 'quiz', label: 'Quiz Arena' },
                { id: 'guild', label: 'WebOps' }
              ].map(pill => (
                <button
                  key={pill.id}
                  onClick={() => setFaqCategory(pill.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading uppercase font-semibold transition-all cursor-pointer ${
                    faqCategory === pill.id
                      ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                      : 'glass-panel text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-slate-900/80 text-white pl-11 pr-4 py-3 rounded-2xl font-body text-sm placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all border border-white/10"
              placeholder="Search manifesto protocols, regulations, roll number SSO, or bracket systems..."
              type="text"
            />
          </div>

          {/* FAQ Accordion Stack */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="glass-card rounded-2xl overflow-hidden transition-all duration-200 border border-white/10"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 font-mono-code text-[10px] uppercase shrink-0 border border-cyan-400/20 font-bold">
                        {faq.label}
                      </span>
                      <span className="font-heading text-sm sm:text-base text-white group-hover:text-cyan-300 transition-colors font-bold">
                        {faq.question}
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-slate-400 group-hover:text-cyan-400 transition-transform duration-200 shrink-0 text-[22px] ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="p-4 rounded-xl glass-panel text-slate-300 font-body text-xs sm:text-sm leading-relaxed flex flex-col gap-2 border border-white/10">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
