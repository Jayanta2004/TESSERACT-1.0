import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);


export default function TeamView() {
  const { teamMembers } = useApp();
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Leadership', 'Council / Core Team'];

  const filteredTeam = teamMembers.filter(m => {
    if (filterCategory === 'All') return true;
    return m.category.toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code bg-purple-950/60 text-purple-300 border border-purple-500/30">
          <Users className="w-3.5 h-3.5" />
          <span>PRD SECTION 16 • SOCIETY ARCHITECTS</span>
        </div>
        <h1 className="font-heading text-3xl sm:text-5xl font-black text-white">
          Meet the Tesseract Team
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          The passionate students behind Tesseract Esports Society — managing competitive tournaments, engineering platform web operations, broadcasting streams, and growing the community.
        </p>

        {/* Category Pills */}
        <div className="pt-2 flex justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filterCategory === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTeam.map((member) => (
          <div
            key={member.id}
            className="group rounded-3xl bg-[#0d121d] border border-slate-800 hover:border-purple-500/50 p-6 flex flex-col justify-between space-y-5 shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all"
          >
            <div className="space-y-4">
              {/* Photo & Badge */}
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-56 object-cover rounded-2xl group-hover:scale-102 transition-transform duration-300 filter grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase bg-black/70 text-purple-300 border border-purple-500/40 backdrop-blur-md">
                    {member.category}
                  </span>
                </div>
              </div>

              {/* Name & Position */}
              <div>
                <h3 className="font-heading text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  {member.name}
                </h3>
                <div className="text-xs font-mono-code text-cyan-400 font-semibold mt-0.5">
                  {member.role}
                </div>
                <div className="text-[11px] text-slate-500 font-mono-code mt-0.5">
                  {member.program}
                </div>
              </div>

              {/* Short Bio */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {member.bio}
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-slate-400 text-xs">
              <span className="font-mono-code text-[11px]">Connect:</span>
              <div className="flex items-center gap-2">
                {member.socials?.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                    title="LinkedIn"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials?.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-white transition-colors"
                    title="GitHub"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
                {member.socials?.discord && (
                  <span
                    className="px-2 py-1 rounded-lg bg-slate-900 font-mono-code text-[10px] text-indigo-300 border border-slate-800"
                    title="Discord Handle"
                  >
                    {member.socials.discord}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
