import React from 'react';
import { Globe, Server, Film, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { useInView } from '../hooks/useInView';

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
  const [sectionRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-cyan-400 bg-cyan-400/10 border border-cyan-400/30 px-3.5 py-1.5 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5" />
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
                className={`p-8 rounded-3xl bg-space-900/80 border border-slate-800/80 hover:border-slate-700 backdrop-blur-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.8)] group relative overflow-hidden ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                }}
              >
                {/* Subtle Hover Ambient Top Glow */}
                <div
                  className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-700 blur-[50px]"
                  style={{ backgroundColor: srv.color }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{
                        backgroundColor: `${srv.color}15`,
                        border: `1px solid ${srv.color}35`,
                        color: srv.color,
                        boxShadow: `0 0 20px ${srv.color}20`,
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

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-energy-cyan transition-colors">
                    {srv.title}
                  </h3>
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
                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-1 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                  >
                    <span>AVAILABLE</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
