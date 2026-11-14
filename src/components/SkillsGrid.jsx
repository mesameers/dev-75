import React, { useState } from 'react';
import { Code, Server, Wrench, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SKILLS_DATA = [
  {
    id: 'frontend',
    category: 'Frontend & Reactive UI',
    icon: Code,
    color: '#00F2FE',
    tag: 'CLIENT_ENGINEERING',
    skills: [
      { name: 'React 18 / Next.js', percent: 95 },
      { name: 'TypeScript & ESNext', percent: 92 },
      { name: 'Tailwind CSS & PostCSS', percent: 96 },
      { name: 'Vite & Webpack Build Pipelines', percent: 90 },
      { name: 'Remotion (Deterministic Video as Code)', percent: 94 },
    ],
  },
  {
    id: 'backend',
    category: 'Backend & Cloud Systems',
    icon: Server,
    color: '#8B5CF6',
    tag: 'CORE_INFRASTRUCTURE',
    skills: [
      { name: 'Node.js & Express.js APIs', percent: 94 },
      { name: 'Supabase PostgreSQL 16', percent: 92 },
      { name: 'Role-Based Access Control (RBAC)', percent: 95 },
      { name: 'REST & GraphQL Architecture', percent: 90 },
      { name: 'Docker Containerization', percent: 86 },
    ],
  },
  {
    id: 'architecture',
    category: 'Architecture & Delivery',
    icon: Wrench,
    color: '#38BDF8',
    tag: 'SYSTEM_OPERATIONS',
    skills: [
      { name: 'Multi-Tenant SaaS Isolation', percent: 94 },
      { name: 'Git Workflows, Branching & LFS', percent: 95 },
      { name: 'Vercel Edge Global Deployments', percent: 96 },
      { name: 'Deterministic Animation Algorithms', percent: 92 },
      { name: 'Web Accessibility (WCAG 2.1 AA)', percent: 89 },
    ],
  },
];

export const SkillsGrid = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? SKILLS_DATA 
    : SKILLS_DATA.filter((item) => item.id === filter);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-28 px-6 bg-space-950 relative border-t border-slate-900 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-energy-teal/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CORE STACK // REPOSITORY MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Technical Stack & Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg mb-8">
            Mastered across enterprise production applications, relational data modeling, and high-fidelity motion.
          </p>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-space-900/90 border border-slate-800 backdrop-blur-md">
            {[
              { id: 'all', label: 'All Disciplines' },
              { id: 'frontend', label: 'Frontend' },
              { id: 'backend', label: 'Backend' },
              { id: 'architecture', label: 'Architecture' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                  filter === tab.id
                    ? 'bg-energy-teal text-space-950 shadow-[0_0_15px_rgba(0,242,254,0.4)] scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-space-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Interactive Cards with Glowing Animated Bars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredData.map((col, idx) => {
            const Icon = col.icon;
            return (
              <div
                key={col.id}
                className={`p-8 rounded-3xl bg-space-900/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] group ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                  boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 25px ${col.color}10`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${col.color}15`,
                      border: `1px solid ${col.color}40`,
                      color: col.color,
                      boxShadow: `0 0 20px ${col.color}20`,
                    }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <span
                    className="font-mono text-[11px] font-bold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: `${col.color}15`,
                      color: col.color,
                      border: `1px solid ${col.color}30`,
                    }}
                  >
                    {col.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-6">{col.category}</h3>

                <div className="space-y-5">
                  {col.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex justify-between items-center font-mono text-xs">
                        <span className="text-slate-300 font-semibold">{skill.name}</span>
                        <span className="text-slate-400 font-bold">{skill.percent}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-space-950 overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: isInView ? `${skill.percent}%` : '0%',
                            transitionDelay: `${(idx * 5 + sIdx) * 100}ms`,
                            background: `linear-gradient(90deg, ${col.color}80, ${col.color})`,
                            boxShadow: `0 0 10px ${col.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
