import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function TeamView() {
  const { teamMembers, setCurrentView, showToast } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [houseFilter, setHouseFilter] = useState('all');

  // Augmented members with Stitch metadata
  const councilMembers = [
    {
      id: 'sneha-rao',
      name: 'Sneha Rao',
      gamerTag: 'VALKYRIE',
      role: 'Vice President & Head of Community',
      degree: 'BS in Data Science • Degree Level',
      house: 'ramanujan',
      houseName: 'House Ramanujan',
      roll: '22F1000843',
      category: 'leadership',
      badge: 'FOUNDING VP',
      badgeColor: 'text-alert-crimson bg-alert-crimson/20',
      discord: 'valkyrie#0001',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Scaled Tesseract community from 40 initial members to 1,400+ verified collegiate gamers across 6 esports titles. Spearheaded the Inter-House Championship framework and female collegiate gaming initiatives.',
      skills: ['Valorant Radiant', 'Community Ops', 'Production Desk']
    },
    {
      id: 'kavya-deshmukh',
      name: 'Kavya Deshmukh',
      gamerTag: 'SYNAPSE',
      role: 'Lead WebOps Architect & DevOps Lead',
      degree: 'BS in Electronic Systems • Diploma Level',
      house: 'archimedes',
      houseName: 'House Archimedes',
      roll: '23F2001944',
      category: 'tech',
      badge: 'CHIEF ARCHITECT',
      badgeColor: 'text-primary-container bg-primary-container/20',
      discord: 'synapse_ops#2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: 'Engineered the In-House MCQ Quiz Arena sub-20ms telemetry engine and automated Riot Vanguard verification webhooks. Maintains Tesseract AWS Mumbai edge nodes.',
      skills: ['Go / Fiber', 'React / Tailwind', 'Docker Swarm', 'Redis Edge']
    },
    {
      id: 'rohit-patel',
      name: 'Rohit Patel',
      gamerTag: 'MAVERICK',
      role: 'Head of Tournaments & Esports Marshalling',
      degree: 'BS in Data Science • Diploma Level',
      house: 'aryabhata',
      houseName: 'House Aryabhata',
      roll: '22F3004812',
      category: 'marshal',
      badge: 'HEAD MARSHAL',
      badgeColor: 'text-admin-amber bg-admin-amber/20',
      discord: 'maverick_esports#9920',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      bio: 'Oversees fair-play arbitrations, anti-cheat inspections, tournament schedules, and live broadcast observer cameras across all seasonal major championships.',
      skills: ['Observer Camera', 'MOS Verification', 'Rulebook Arbiter']
    },
    {
      id: 'ananya-sen',
      name: 'Ananya Sen',
      gamerTag: 'ECHO',
      role: 'Broadcast & Media Production Lead',
      degree: 'BS in Data Science • Foundational Level',
      house: 'turing',
      houseName: 'House Turing',
      roll: '24F1000192',
      category: 'marshal',
      badge: 'PRODUCTION LEAD',
      badgeColor: 'text-secondary bg-secondary-container/40',
      discord: 'echo_cast#1010',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'Directs the official Tesseract YouTube esports streams, caster graphics overlays, and collegiate tournament highlight packages.',
      skills: ['OBS Studio Relay', 'Motion Graphics', 'Live Casting']
    },
    {
      id: 'dev-singh',
      name: 'Dev Singh',
      gamerTag: 'TITAN',
      role: 'Full Stack Engineer & Discord Bot Dev',
      degree: 'BS in Electronic Systems • Degree Level',
      house: 'archimedes',
      houseName: 'House Archimedes',
      roll: '21F3002911',
      category: 'tech',
      badge: 'BOT DEVELOPER',
      badgeColor: 'text-primary-container bg-primary-container/20',
      discord: 'titan_dev#4040',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
      bio: 'Author of Tesseract Discord Scrim bot generating automated custom room codes, role synchronization, and real-time roll verification.',
      skills: ['Discord.py', 'PostgreSQL', 'WebSockets']
    },
    {
      id: 'priya-sharma',
      name: 'Priya Sharma',
      gamerTag: 'AEGIS',
      role: 'House Council Governor & Discipline Arbiter',
      degree: 'BS in Data Science • Degree Level',
      house: 'ramanujan',
      houseName: 'House Ramanujan',
      roll: '21F1001209',
      category: 'leadership',
      badge: 'HOUSE GOVERNOR',
      badgeColor: 'text-verified-emerald bg-verified-emerald/20',
      discord: 'aegis_gov#7777',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bio: 'Represents House Ramanujan at the student parliament, regulating inter-house point transfers and democratic referendum quorums.',
      skills: ['Constitutional Law', 'Parliamentary Ops', 'Arbitration']
    }
  ];

  const filteredRoster = councilMembers.filter(m => {
    let matchesCategory = true;
    if (filterCategory === 'leadership') matchesCategory = m.category === 'leadership';
    else if (filterCategory === 'tech') matchesCategory = m.category === 'tech';
    else if (filterCategory === 'marshal') matchesCategory = m.category === 'marshal';

    let matchesHouse = true;
    if (houseFilter !== 'all') matchesHouse = m.house === houseFilter;

    let matchesSearch = true;
    if (searchQuery.trim()) {
      matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.gamerTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      m.roll.toLowerCase().includes(searchQuery.toLowerCase());
    }

    return matchesCategory && matchesHouse && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col pb-16">
      {/* Telemetry Header Strip & Hero Overview */}
      <section className="relative w-full overflow-hidden px-margin py-space-xl bg-surface">
        <div className="pointer-events-none absolute -top-24 -left-20 w-96 h-96 rounded-full bg-primary-container/10 blur-[120px]"></div>
        <div className="pointer-events-none absolute top-12 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/15 blur-[140px]"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col gap-space-lg">
          <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-label-sm tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container-high text-primary-container shadow-sm border border-carbon-border">
              <span className="material-symbols-outlined text-[13px] text-primary-container">terminal</span>
              SYS::COUNCIL
            </span>
            <span className="text-outline-variant">/</span>
            <span className="text-text-dim">ROSTER_DIRECTORY</span>
            <span className="text-outline-variant">•</span>
            <span className="text-verified-emerald flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-verified-emerald animate-pulse"></span>
              GOVERNANCE &amp; WEBOPS ARCHITECTURE
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl flex flex-col gap-space-xs">
              <h1 className="font-headline-xl text-3xl sm:text-headline-xl tracking-tight text-text-bright uppercase">
                Tesseract Executive Council &amp; Student WebOps
              </h1>
              <p className="font-body-lg text-body-lg text-text-dim">
                The distributed student founders, software architects, tournament marshals, and broadcast leads building competitive collegiate gaming infrastructure for the IIT Madras BS Degree community.
              </p>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <button
                onClick={() => showToast("WebOps Guild applications open! Contact webops@tesseract.iitmbs.org with your GitHub and roll number.", "info")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-text-bright font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm border border-carbon-border cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] text-admin-amber">code_blocks</span>
                Join WebOps Guild
              </button>
              <button
                onClick={() => { setCurrentView('about'); window.scrollTo(0, 0); }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-wider font-bold transition-all shadow-md hover:bg-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                Constitution (PRD §16)
              </button>
            </div>
          </div>

          {/* Quick KPI Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-xs">
            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-0.5 shadow-sm border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim font-label-sm text-[11px] uppercase">
                <span>Active Council</span>
                <span className="material-symbols-outlined text-[14px] text-primary-container">groups</span>
              </div>
              <span className="font-headline-md text-headline-md text-text-bright tracking-tight font-bold">14 Members</span>
              <span className="font-label-sm text-[11px] text-text-dim">Across 4 Houses &amp; 8 States</span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-0.5 shadow-sm border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim font-label-sm text-[11px] uppercase">
                <span>Governance Model</span>
                <span className="material-symbols-outlined text-[14px] text-verified-emerald">account_balance</span>
              </div>
              <span className="font-headline-md text-headline-md text-verified-emerald tracking-tight font-bold">100% Student-Led</span>
              <span className="font-label-sm text-[11px] text-text-dim">IITM BS Degree Autonomous</span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-0.5 shadow-sm border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim font-label-sm text-[11px] uppercase">
                <span>Tech Infrastructure</span>
                <span className="material-symbols-outlined text-[14px] text-primary-container">deployed_code</span>
              </div>
              <span className="font-headline-md text-headline-md text-text-bright tracking-tight font-bold">Open Source Ops</span>
              <span className="font-label-sm text-[11px] text-text-dim">GitHub Verified Commits</span>
            </div>

            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-0.5 shadow-sm border border-carbon-border">
              <div className="flex items-center justify-between text-text-dim font-label-sm text-[11px] uppercase">
                <span>Mandate Period</span>
                <span className="material-symbols-outlined text-[14px] text-admin-amber">history_toggle_off</span>
              </div>
              <span className="font-headline-md text-headline-md text-admin-amber tracking-tight font-bold">AY 2024–2025</span>
              <span className="font-label-sm text-[11px] text-text-dim">Tenure Season 03 Protocol</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Leadership Spotlight (Bento Hero Feature) */}
      <section className="w-full px-margin pb-space-lg">
        <div className="max-w-7xl mx-auto bg-surface-container-low rounded-xl p-space-lg shadow-xl relative overflow-hidden border border-carbon-border">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-container/10 blur-[100px] pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row items-center gap-space-xl relative z-10">
            {/* Visual Column */}
            <div className="relative w-full lg:w-2/5 shrink-0">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg bg-surface-container-highest border border-carbon-border">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600"
                  alt="Aarav Sharma"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/30 to-transparent"></div>
                <div className="absolute top-3 left-3 flex items-center gap-2 px-2.5 py-1 rounded bg-surface-glass backdrop-blur-md border border-carbon-border">
                  <span className="w-2 h-2 rounded-full bg-verified-emerald animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-verified-emerald uppercase font-bold">PRESIDENTIAL DESK</span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high/90 text-text-bright font-label-sm text-label-sm uppercase flex items-center gap-1.5 border border-carbon-border">
                    <span className="material-symbols-outlined text-[13px] text-primary-container">shield</span>
                    HOUSE TURING
                  </span>
                  <span className="font-label-sm text-label-sm text-primary-container font-mono bg-surface-glass px-1.5 py-0.5 rounded border border-carbon-border">
                    21F1004921
                  </span>
                </div>
              </div>
            </div>

            {/* Spotlight Content Column */}
            <div className="w-full lg:w-3/5 flex flex-col gap-space-md">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-sm text-label-sm font-bold uppercase tracking-wider border border-primary-container/30">
                  FOUNDING EXECUTIVE &amp; PRESIDENT
                </span>
                <span className="text-text-dim text-label-sm">•</span>
                <span className="text-text-dim text-label-sm font-label-sm">BS in Data Science &amp; Applications (Degree Level)</span>
              </div>
              <div className="flex flex-col">
                <h2 className="font-headline-lg text-2xl sm:text-headline-lg text-text-bright tracking-tight font-bold">
                  Aarav Sharma <span className="text-primary-container font-label-lg uppercase">// 'VORTEX'</span>
                </h2>
                <p className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">
                  Lead Software Architect • CS2 Collegiate Representative
                </p>
              </div>
              <blockquote className="bg-surface-container p-space-md rounded-xl text-text-bright font-body-md text-body-md italic shadow-inner border border-carbon-border">
                “Built by asynchronous remote students, for collegiate competitors worldwide. Tesseract represents decentralized campus sportsmanship anchored by IIT Madras academic rigor.”
              </blockquote>
              <div className="grid grid-cols-3 gap-space-sm py-1">
                <div className="bg-surface-container p-space-sm rounded-lg flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[10px] text-text-dim uppercase">COMMITS MERGED</span>
                  <span className="font-headline-md text-headline-md text-primary-container font-bold">412+</span>
                </div>
                <div className="bg-surface-container p-space-sm rounded-lg flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[10px] text-text-dim uppercase">TOURNEYS RUN</span>
                  <span className="font-headline-md text-headline-md text-verified-emerald font-bold">24 CUPS</span>
                </div>
                <div className="bg-surface-container p-space-sm rounded-lg flex flex-col border border-carbon-border">
                  <span className="font-label-sm text-[10px] text-text-dim uppercase">RATING TIER</span>
                  <span className="font-headline-md text-headline-md text-admin-amber font-bold">FACEIT LVL 9</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-2">
                <div className="flex items-center gap-space-xs">
                  <span className="px-2 py-0.5 rounded bg-surface-container text-text-dim font-label-sm text-label-sm border border-carbon-border">Rust / WebOps</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-text-dim font-label-sm text-label-sm border border-carbon-border">React Engine</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container text-text-dim font-label-sm text-label-sm border border-carbon-border">Swiss Brackets</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-surface-container text-text-bright font-label-sm text-label-sm font-mono flex items-center gap-1.5 border border-carbon-border">
                    <span className="material-symbols-outlined text-[13px] text-primary-container">chat</span>
                    vortex#1337
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter HUD & Control Bar */}
      <section className="w-full px-margin pb-space-lg sticky top-[104px] z-30 backdrop-blur-xl bg-background/90 py-2 border-y border-carbon-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-surface-container-low rounded-xl shadow-sm border border-carbon-border">
            {[
              { id: 'all', label: `All Members (${councilMembers.length})` },
              { id: 'leadership', label: 'Leadership & Founders' },
              { id: 'tech', label: 'WebOps & Tech Architects' },
              { id: 'marshal', label: 'Marshals & Ops' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-label-sm text-label-sm uppercase font-bold transition-all cursor-pointer ${
                  filterCategory === tab.id
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'text-text-dim hover:text-text-bright'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-space-xs">
            <div className="relative flex items-center min-w-[200px] lg:min-w-[240px]">
              <span className="material-symbols-outlined text-[16px] text-text-dim absolute left-3 pointer-events-none">search</span>
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-low text-text-bright font-body-sm text-body-sm pl-9 pr-4 py-1.5 rounded-xl shadow-sm focus:outline-none focus:bg-surface-container placeholder:text-text-dim/60 border border-carbon-border"
                placeholder="Search handle, name, roll..."
                type="text"
              />
            </div>
            <select
              value={houseFilter}
              onChange={(e) => setHouseFilter(e.target.value)}
              className="bg-surface-container-low text-text-bright font-label-sm text-label-sm uppercase py-2 px-3 rounded-xl shadow-sm focus:outline-none cursor-pointer border border-carbon-border"
            >
              <option value="all">All Houses</option>
              <option value="turing">House Turing</option>
              <option value="ramanujan">House Ramanujan</option>
              <option value="archimedes">House Archimedes</option>
              <option value="aryabhata">House Aryabhata</option>
            </select>
          </div>
        </div>
      </section>

      {/* Editorial Roster Grid */}
      <section className="w-full px-margin py-space-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredRoster.map((member) => (
            <article
              key={member.id}
              className="roster-card group bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between shadow-md hover:shadow-xl transition-all relative overflow-hidden border border-carbon-border"
            >
              <div className="flex flex-col gap-space-md">
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden bg-surface-container-highest">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={member.avatar}
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-glass backdrop-blur-md border border-carbon-border">
                    <span className="w-1.5 h-1.5 rounded-full bg-alert-crimson animate-pulse"></span>
                    <span className="font-label-sm text-[10px] font-bold uppercase">{member.badge}</span>
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-surface-container-high/90 text-text-bright font-label-sm text-[11px] uppercase border border-carbon-border">
                      {member.houseName}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 font-label-sm text-[11px] text-primary-container font-mono bg-surface-glass px-1.5 py-0.5 rounded border border-carbon-border">
                    {member.roll}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-headline-md text-text-bright tracking-tight font-bold">{member.name}</h3>
                    <span className="font-label-md text-label-md text-primary-container font-bold">'{member.gamerTag}'</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-text-dim uppercase tracking-wider">{member.role}</span>
                  <span className="font-body-sm text-body-sm text-outline mt-0.5">{member.degree}</span>
                </div>

                <p className="font-body-sm text-body-sm text-text-dim line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {member.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded bg-surface-container text-text-bright font-label-sm text-[11px] border border-carbon-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-space-md mt-space-md border-t border-carbon-border flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-text-dim font-mono">{member.discord}</span>
                <span className="text-primary-container font-label-sm text-[11px] uppercase font-semibold">IITM BS Official</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
