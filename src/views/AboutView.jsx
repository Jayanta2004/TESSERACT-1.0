import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function AboutView() {
  const { setCurrentView } = useApp();
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
      <section className="w-full bg-surface-container-lowest px-margin py-space-md border-b border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-space-md">
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-label-sm uppercase font-semibold border border-primary-container/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              SYS::MANIFESTO
            </span>
            <span className="text-outline-variant font-label-sm text-label-sm">//</span>
            <span className="text-text-dim font-label-sm text-label-sm tracking-wider uppercase">
              INSTITUTIONAL CHARTER &amp; KNOWLEDGE BASE • CODIFIED S03
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-verified-emerald/10 text-verified-emerald font-label-sm text-label-sm border border-verified-emerald/20">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              RATIFIED BY STUDENT SENATE // REV 3.4.1
            </span>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <a
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface hover:text-text-bright font-label-sm text-label-sm transition-colors shadow-sm border border-carbon-border"
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
            >
              <span className="material-symbols-outlined text-[14px]">code</span>
              Verify On GitHub
            </a>
            <button
              onClick={() => alert("Downloading Official Tesseract Constitution & Academic Charter (PDF)...")}
              className="inline-flex items-center gap-1 px-3 py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm hover:bg-primary transition-colors shadow-[0_0_12px_rgba(0,240,255,0.25)] font-bold cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">download</span>
              Download Charter PDF
            </button>
          </div>
        </div>
      </section>

      {/* Hero & Charter Manifesto Intro */}
      <section className="w-full relative px-margin py-space-xl bg-gradient-to-b from-surface-dim via-surface to-surface-container-lowest overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-container/5 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-space-xl">
          <div className="flex flex-col gap-space-sm max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-primary-container tracking-widest uppercase">
                OFFICIAL IITM BS ESPORTS REGISTRY
              </span>
              <span className="text-outline-variant">•</span>
              <span className="font-label-sm text-label-sm text-admin-amber tracking-widest uppercase">
                CONSTITUTIONAL STATUTE
              </span>
            </div>
            <h1 className="font-headline-xl text-3xl sm:text-headline-xl text-text-bright tracking-tight uppercase leading-tight font-bold">
              THE TESSERACT MANIFESTO &amp; ACADEMIC CHARTER
            </h1>
            <p className="font-body-lg text-body-lg text-text-dim max-w-3xl leading-relaxed">
              Building a borderless, decentralized gaming home for IIT Madras BS scholars across 28 states and 4 timezones.
            </p>
          </div>

          {/* Founding Narrative & Interactive Blueprint */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
            {/* Story Column */}
            <div className="lg:col-span-7 flex flex-col justify-between bg-surface-container-low p-space-xl rounded-xl shadow-lg relative overflow-hidden border border-carbon-border">
              <div className="flex flex-col gap-space-md relative z-10">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">history_edu</span>
                  <span className="font-label-md text-label-md text-text-bright uppercase tracking-wider font-bold">The Genesis // Early 2024</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                  Founded in early 2024 by asynchronous remote students pursuing the <span className="text-text-bright font-semibold">BS in Data Science &amp; Applications</span> and <span className="text-text-bright font-semibold">BS in Electronic Systems</span>, Tesseract emerged from a shared frustration: the profound isolation of solitary screens, late-night code submissions, and disconnected living rooms across the subcontinent.
                </p>
                <p className="font-body-md text-body-md text-text-dim leading-relaxed">
                  What began as unstructured voice rooms and disparate Discord channels was swiftly forged into an official, sovereign collegiate powerhouse. We engineered custom tournament telemetries, proprietary low-latency quiz engines, hardware-audited bracket architectures, and a representative student government—proving that premier campus culture thrives wherever high bandwidth and collective passion meet.
                </p>
              </div>

              {/* Mission Quote Glass Panel */}
              <div className="mt-space-lg p-space-lg rounded-lg bg-surface-container/80 backdrop-blur-md relative border border-carbon-border">
                <div className="flex items-start gap-space-md">
                  <span className="material-symbols-outlined text-primary-container text-[28px] shrink-0">format_quote</span>
                  <div className="flex flex-col gap-1">
                    <blockquote className="font-headline-md text-headline-md text-text-bright italic font-normal leading-snug">
                      "To dismantle the physical boundaries of an asynchronous degree, engineering collegiate esports as a high-trust digital campus square where competitive grit, software engineering, and academic camaraderie collide."
                    </blockquote>
                    <span className="font-label-sm text-label-sm text-primary-container mt-1 uppercase tracking-wider">
                      — Ratified Preamble, Tesseract Collegiate Assembly
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic / Visual Telemetry Mosaic Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-surface-container-low p-space-xl rounded-xl shadow-lg relative overflow-hidden border border-carbon-border">
              <div className="flex flex-col gap-space-sm mb-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-text-bright uppercase font-bold">NODE DENSITY RADAR</span>
                  <span className="font-label-sm text-label-sm text-verified-emerald flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald"></span>
                    LIVE RELAY ACTIVE
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-text-dim">Real-time geographic dispersion across regional study clusters.</span>
              </div>

              {/* Inline Telemetry Radar Visualization */}
              <div className="w-full flex items-center justify-center p-space-md">
                <svg className="w-full max-w-[280px] aspect-square" fill="none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" stroke="#1E2638" strokeDasharray="3 3" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" r="65" stroke="#1E2638" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" r="40" stroke="#1E2638" strokeDasharray="2 2" strokeWidth="1"></circle>
                  <circle cx="100" cy="100" fill="#00f0ff" fillOpacity="0.2" r="15"></circle>
                  <line stroke="#1E2638" strokeWidth="1" x1="10" x2="190" y1="100" y2="100"></line>
                  <line stroke="#1E2638" strokeWidth="1" x1="100" x2="100" y1="10" y2="190"></line>
                  <polygon fill="#00f0ff" fillOpacity="0.12" points="100,28 165,75 142,160 55,145 40,80" stroke="#00f0ff" strokeWidth="1.5"></polygon>
                  <circle cx="100" cy="28" fill="#00E676" r="3.5"></circle>
                  <circle cx="165" cy="75" fill="#00f0ff" r="3.5"></circle>
                  <circle cx="142" cy="160" fill="#00f0ff" r="3.5"></circle>
                  <circle cx="55" cy="145" fill="#FFB800" r="3.5"></circle>
                  <circle cx="40" cy="80" fill="#00f0ff" r="3.5"></circle>
                  <circle cx="100" cy="100" fill="#F4F7FB" r="3"></circle>
                  <text fill="#8A99AD" fontFamily="JetBrains Mono" fontSize="7" x="105" y="112">IITM CHENNAI</text>
                </svg>
              </div>

              <div className="flex items-center justify-between pt-space-md bg-surface-container p-space-md rounded-lg border border-carbon-border">
                <div>
                  <span className="block font-label-sm text-[10px] text-text-dim uppercase">ENCRYPTION PROTOCOL</span>
                  <span className="font-label-md text-label-md text-text-bright font-bold">SHA-256 STUDENT TOKEN</span>
                </div>
                <div className="text-right">
                  <span className="block font-label-sm text-[10px] text-text-dim uppercase">AUTHENTICATION</span>
                  <span className="font-label-md text-label-md text-verified-emerald font-bold">OAUTH2 / GOOGLE SSO</span>
                </div>
              </div>
            </div>
          </div>

          {/* The 3 Core Tenets Grid */}
          <div className="flex flex-col gap-space-md mt-space-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-md text-label-md text-primary-container uppercase tracking-wider font-bold">CONSTITUTIONAL ARTICLES</span>
                <span className="text-outline-variant">//</span>
                <span className="font-label-md text-label-md text-text-dim uppercase">TRI-PILLAR SYSTEM</span>
              </div>
              <span className="font-label-sm text-label-sm text-text-dim hidden sm:inline">PERMANENT UNALTERABLE COVENANTS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {/* Tenet 01 */}
              <div className="bg-surface-container-low p-space-xl rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all shadow-md group border border-carbon-border">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary-container/15 text-primary-container font-label-sm text-label-sm font-bold tracking-wider uppercase border border-primary-container/30">
                      TENET 01
                    </span>
                    <span className="material-symbols-outlined text-primary-container text-[24px] group-hover:scale-110 transition-transform">lock_open_right</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">ZERO GATEKEEPING</h2>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    No rank elitism, no regional bias, and zero hardware barriers. Whether you are an unranked casual exploring chess blitz or a Faceit Level 10 CS2 rifler, every matriculated BS student has equal access to inter-house leagues, custom scrim lobbies, and talent development tracks.
                  </p>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-text-dim font-label-sm text-label-sm border-t border-carbon-border">
                  <span>ACCESS PRINCIPLE</span>
                  <span className="text-text-bright font-semibold">ALL TIERS QUALIFIED</span>
                </div>
              </div>

              {/* Tenet 02 */}
              <div className="bg-surface-container-low p-space-xl rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all shadow-md group border border-carbon-border">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-verified-emerald/15 text-verified-emerald font-label-sm text-label-sm font-bold tracking-wider uppercase border border-verified-emerald/30">
                      TENET 02
                    </span>
                    <span className="material-symbols-outlined text-verified-emerald text-[24px] group-hover:scale-110 transition-transform">terminal</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">100% STUDENT AUTONOMY</h2>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    From our millisecond tie-breaker quiz engines to automated Discord scrim bots, our entire infrastructure is built, maintained, and governed by students under an open-source charter. Zero commercial sponsorship dictate, zero bureaucratic delay.
                  </p>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-text-dim font-label-sm text-label-sm border-t border-carbon-border">
                  <span>INFRASTRUCTURE</span>
                  <span className="text-verified-emerald font-semibold">STUDENT-OPERATED</span>
                </div>
              </div>

              {/* Tenet 03 */}
              <div className="bg-surface-container-low p-space-xl rounded-xl flex flex-col justify-between hover:bg-surface-container transition-all shadow-md group border border-carbon-border">
                <div className="flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-admin-amber/15 text-admin-amber font-label-sm text-label-sm font-bold tracking-wider uppercase border border-admin-amber/30">
                      TENET 03
                    </span>
                    <span className="material-symbols-outlined text-admin-amber text-[24px] group-hover:scale-110 transition-transform">shield</span>
                  </div>
                  <h2 className="font-headline-md text-headline-md text-text-bright uppercase font-bold">GAMING INTEGRITY</h2>
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                    Competitive excellence anchored by strict anti-sybil student SSO authentication (@study.iitm.ac.in roll validation), ring-0 kernel anti-cheat audits, transparent referendums, and non-negotiable adherence to the IIT Madras Student Code of Conduct.
                  </p>
                </div>
                <div className="pt-space-md mt-space-md flex items-center justify-between text-text-dim font-label-sm text-label-sm border-t border-carbon-border">
                  <span>SECURITY LEVEL</span>
                  <span className="text-admin-amber font-semibold">SSO TOKENIZED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Impact Telemetry Stats Row */}
      <section className="w-full bg-surface-container px-margin py-space-xl border-y border-carbon-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-space-lg">
          <div className="flex flex-col gap-1 p-space-md bg-surface-container-low rounded-lg border border-carbon-border">
            <span className="font-label-sm text-[11px] text-primary-container uppercase tracking-wider font-semibold">ACTIVE ATHLETES</span>
            <span className="font-headline-xl text-headline-xl text-text-bright tracking-tight font-bold">1,420+</span>
            <span className="font-body-sm text-[12px] text-text-dim">Matriculated BS Competitors</span>
          </div>
          <div className="flex flex-col gap-1 p-space-md bg-surface-container-low rounded-lg border border-carbon-border">
            <span className="font-label-sm text-[11px] text-secondary uppercase tracking-wider font-semibold">HOUSE HOUSES</span>
            <span className="font-headline-xl text-headline-xl text-text-bright tracking-tight font-bold">4 HOUSES</span>
            <span className="font-body-sm text-[12px] text-text-dim">Turing, Ramanujan, Archimedes, Aryabhata</span>
          </div>
          <div className="flex flex-col gap-1 p-space-md bg-surface-container-low rounded-lg border border-carbon-border">
            <span className="font-label-sm text-[11px] text-verified-emerald uppercase tracking-wider font-semibold">TERRITORY DENSITY</span>
            <span className="font-headline-xl text-headline-xl text-text-bright tracking-tight font-bold">28 STATES</span>
            <span className="font-body-sm text-[12px] text-text-dim">&amp; Union Territories Enrolled</span>
          </div>
          <div className="flex flex-col gap-1 p-space-md bg-surface-container-low rounded-lg border border-carbon-border">
            <span className="font-label-sm text-[11px] text-admin-amber uppercase tracking-wider font-semibold">SOURCE CODE</span>
            <span className="font-headline-xl text-headline-xl text-text-bright tracking-tight font-bold">100% OSS</span>
            <span className="font-body-sm text-[12px] text-text-dim">Open Source WebOps Telemetry</span>
          </div>
        </div>
      </section>

      {/* Interactive Accordion FAQ Section */}
      <section className="w-full bg-surface-dim px-margin py-space-xl">
        <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span className="font-label-sm text-label-sm text-primary-container uppercase tracking-widest font-semibold">
                  INSTITUTIONAL KNOWLEDGE BASE
                </span>
              </div>
              <h2 className="font-headline-xl text-2xl sm:text-headline-xl text-text-bright uppercase tracking-tight font-bold">
                FREQUENTLY ASKED QUESTIONS
              </h2>
              <p className="font-body-md text-body-md text-text-dim">
                Operational guidelines, academic eligibility requirements, tournament architecture, and guild recruitment.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
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
                  className={`px-3 py-1 rounded text-label-sm font-label-sm font-semibold transition-all cursor-pointer ${
                    faqCategory === pill.id
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container text-text-dim hover:text-text-bright hover:bg-surface-container-high border border-carbon-border'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-dim text-[20px]">search</span>
            <input
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full bg-surface-container-low text-text-bright pl-10 pr-4 py-2.5 rounded-lg font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container transition-colors border border-carbon-border"
              placeholder="Search manifesto protocols, regulations, roll number SSO, or bracket systems..."
              type="text"
            />
          </div>

          {/* FAQ Accordion Stack */}
          <div className="flex flex-col gap-space-sm">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-surface-container-low rounded-xl overflow-hidden transition-all duration-200 border border-carbon-border"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-space-lg py-space-lg flex items-center justify-between text-left gap-space-md group cursor-pointer"
                  >
                    <div className="flex items-center gap-space-md">
                      <span className="inline-flex items-center px-2 py-0.5 rounded bg-primary-container/10 text-primary-container font-label-sm text-[10px] uppercase shrink-0 border border-primary-container/20">
                        {faq.label}
                      </span>
                      <span className="font-headline-md text-body-lg text-text-bright group-hover:text-primary transition-colors font-bold">
                        {faq.question}
                      </span>
                    </div>
                    <span className={`material-symbols-outlined text-text-dim group-hover:text-primary-container transition-transform duration-200 shrink-0 text-[24px] ${
                      isOpen ? 'rotate-180 text-primary-container' : ''
                    }`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-space-lg pb-space-lg pt-0">
                      <div className="p-space-md rounded-lg bg-surface-container text-on-surface font-body-md text-body-md leading-relaxed flex flex-col gap-2 border border-carbon-border">
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
