import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Layers, Database, Shield, Film, Sparkles } from 'lucide-react';

const MODULES = [
  { id: 'web', name: 'Enterprise React / Next.js SPA', sprints: 2, icon: Layers, desc: 'Responsive, accessible, high Lighthouse score' },
  { id: 'backend', name: 'Node.js Express REST API', sprints: 2, icon: Database, desc: 'Prepared statements, rate limiting, audit logging' },
  { id: 'supabase', name: 'Supabase PostgreSQL Cluster (16 Tables)', sprints: 1, icon: Database, desc: 'Row-Level Security, multi-tenant isolation' },
  { id: 'rbac', name: 'Zero-Trust RBAC & Auth Security', sprints: 1, icon: Shield, desc: 'Cryptographic tokens, tenant scoping' },
  { id: 'motion', name: 'Deterministic Remotion Video as Code', sprints: 1, icon: Film, desc: '30.0 fps frame-locked rendering pipeline' },
  { id: 'deploy', name: 'Vercel / Cloud CI/CD Automation', sprints: 1, icon: Sparkles, desc: 'Automated GitHub pull request previews' },
];

export const ScopeEstimator = () => {
  const [selected, setSelected] = useState(['web', 'backend', 'supabase', 'rbac']);

  const toggleModule = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const totalSprints = selected.reduce((sum, id) => {
    const mod = MODULES.find((m) => m.id === id);
    return sum + (mod ? mod.sprints : 0);
  }, 0);

  const estimatedWeeks = Math.max(2, Math.ceil(totalSprints * 1.5));

  return (
    <section className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
            <Calculator className="w-3.5 h-3.5" />
            <span>INTERACTIVE ARCHITECTURE ESTIMATOR</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            System Scope & Milestone Calculator
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Configure system modules to calculate architecture complexity, delivery sprints, and engineering milestones.
          </p>
        </div>

        {/* Interactive Modules Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {MODULES.map((mod) => {
            const isSelected = selected.includes(mod.id);
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={() => toggleModule(mod.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-space-900/90 border-energy-teal/50 shadow-[0_0_30px_rgba(0,242,254,0.18)] scale-[1.02]'
                    : 'bg-space-900/50 border-slate-800/80 hover:border-slate-700 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-energy-teal/20 text-energy-cyan' : 'bg-space-800 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${isSelected ? 'bg-energy-teal border-energy-teal text-space-950 font-bold' : 'border-slate-700 bg-space-850'}`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1.5">{mod.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{mod.desc}</p>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-500">
                  <span>EFFORT</span>
                  <span className={isSelected ? 'text-energy-teal font-semibold' : 'text-slate-500'}>
                    ~{mod.sprints} SPRINT{mod.sprints > 1 ? 'S' : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Calculation Output Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-energy-teal/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1">
                TOTAL ARCHITECTURE SCOPE
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono">
                {selected.length} <span className="text-xl text-energy-teal font-normal">MODULES</span>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-800 hidden sm:block" />

            <div>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-1">
                DELIVERY HORIZON
              </span>
              <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-energy-teal to-secondary-violet font-mono">
                ~{estimatedWeeks} <span className="text-xl text-secondary-violet font-normal">WEEKS</span>
              </div>
            </div>
          </div>

          <a
            href={`mailto:mesameer762@gmail.com?subject=Project%20Scope%20Inquiry%20(${selected.length}%20modules%20selected)`}
            className="flex items-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-energy-teal to-cyan-300 hover:from-cyan-300 hover:to-energy-teal text-space-950 font-black text-sm tracking-wide shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:scale-105 transition-all shrink-0"
          >
            <span>Book Architectural Consultation</span>
            <ArrowRight className="w-4 h-4 text-space-950" />
          </a>
        </div>
      </div>
    </section>
  );
};
