import React from 'react';
import { Globe, Server, Film, Sparkles, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    icon: Globe,
    title: 'Full-Stack Web Applications',
    desc: 'End-to-end development of modern web applications. Responsive, fast-loading, accessible, and structured for real production operations.',
    features: ['React & Next.js architectures', 'Tailwind CSS design systems', 'Role-based dashboards & portals', 'High Lighthouse speed scores'],
    tag: 'DEVELOPMENT',
    color: '#00F2FE',
  },
  {
    icon: Server,
    title: 'Cloud & Database Architecture',
    desc: 'Relational data engineering on Supabase PostgreSQL, Express REST APIs, secure tokenized authentication, and cloud hosting setup.',
    features: ['PostgreSQL schema design', 'Node.js / Express microservices', 'Multi-tenant architecture', 'Automated backup & migration pipelines'],
    tag: 'BACKEND & DATA',
    color: '#8B5CF6',
  },
  {
    icon: Film,
    title: 'Creative Code & Motion Systems',
    desc: 'Deterministic video rendering with Remotion, subtle anti-gravity UI effects, interactive widgets, and weightless brand experiences.',
    features: ['Remotion video-as-code automation', 'Frame-accurate deterministic math', 'Subtle anti-gravity levitation', 'Accessible reduced-motion fallbacks'],
    tag: 'MOTION DESIGN',
    color: '#38BDF8',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-6 bg-space-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-3.5 py-1.5 rounded-full mb-3">
            <span>OFFERINGS // PRODUCTION SERVICES</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Services & Engineering Solutions
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Delivering clean logic, resilient architectures, and distinctive interactive design.
          </p>
        </div>

        {/* 3 Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-space-900/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${srv.color}15`,
                        border: `1px solid ${srv.color}35`,
                        color: srv.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className="font-mono text-[11px] font-bold px-2.5 py-1 rounded"
                      style={{
                        backgroundColor: `${srv.color}15`,
                        color: srv.color,
                        border: `1px solid ${srv.color}30`,
                      }}
                    >
                      {srv.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{srv.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{srv.desc}</p>

                  <div className="space-y-2.5 pt-4 border-t border-slate-800">
                    {srv.features.map((f, fIdx) => (
                      <div key={fIdx} className="flex items-center space-x-2 text-xs font-mono text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-energy-teal shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs text-slate-500">
                  <span>DISPATCH_RATE</span>
                  <span className="text-emerald-400 font-semibold">AVAILABLE</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
