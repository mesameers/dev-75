import React from 'react';
import { Code, Server, Wrench, Shield, Check } from 'lucide-react';

const SKILLS_DATA = [
  {
    category: 'Frontend & Reactive UI',
    icon: Code,
    color: '#00F2FE',
    skills: [
      { name: 'React 18 / Next.js', level: 'Advanced' },
      { name: 'TypeScript / JavaScript (ESNext)', level: 'Advanced' },
      { name: 'Tailwind CSS / PostCSS', level: 'Expert' },
      { name: 'Vite / Microfrontends', level: 'Advanced' },
      { name: 'Remotion (Video as Code)', level: 'Specialist' },
    ],
  },
  {
    category: 'Backend & Cloud Systems',
    icon: Server,
    color: '#8B5CF6',
    skills: [
      { name: 'Node.js & Express.js', level: 'Advanced' },
      { name: 'Supabase & PostgreSQL', level: 'Advanced' },
      { name: 'RESTful API Engineering', level: 'Advanced' },
      { name: 'Role-Based Access Control (RBAC)', level: 'Specialist' },
      { name: 'Docker Containerization', level: 'Proficient' },
    ],
  },
  {
    category: 'Engineering & Delivery',
    icon: Wrench,
    color: '#38BDF8',
    skills: [
      { name: 'Git Workflows & LFS', level: 'Advanced' },
      { name: 'Vercel Edge Deployments', level: 'Advanced' },
      { name: 'Performance Optimization', level: 'Advanced' },
      { name: 'Deterministic Animation Algorithms', level: 'Specialist' },
      { name: 'Accessibility (WCAG 2.1 AA)', level: 'Proficient' },
    ],
  },
];

export const SkillsGrid = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-space-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3.5 py-1.5 rounded-full mb-3">
            <span>CORE STACK // REPOSITORY MATRIX</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Technical Stack & Capabilities
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Disciplines honed across real production applications and deterministic motion engineering.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS_DATA.map((col, idx) => {
            const Icon = col.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-space-900/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl transition-all shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      backgroundColor: `${col.color}15`,
                      border: `1px solid ${col.color}35`,
                      color: col.color,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{col.category}</h3>
                </div>

                <div className="space-y-4">
                  {col.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-space-850 border border-slate-800/90 flex items-center justify-between font-mono text-xs"
                    >
                      <span className="text-slate-200 font-medium">{skill.name}</span>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{
                          backgroundColor: `${col.color}15`,
                          color: col.color,
                        }}
                      >
                        {skill.level}
                      </span>
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
