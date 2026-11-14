import React, { useState } from 'react';
import {
  Layers,
  ExternalLink,
  Code2,
  Terminal,
  Database,
  Shield,
  Film,
  Zap,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Server
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { useInView } from '../hooks/useInView';

const PROJECTS = [
  {
    id: 'nexus-cloud',
    badge: 'FLAGSHIP ENTERPRISE SAAS',
    title: 'NexusCloud Distributed Platform',
    subtitle: 'High-throughput multi-tenant SaaS architecture with PostgreSQL 16 row-level security isolation and sub-15ms p99 query latency.',
    role: 'Lead Architect & Full-Stack Engineer',
    color: '#00F2FE',
    tags: ['React 18', 'Node.js', 'PostgreSQL 16', 'Redis', 'Docker'],
    metrics: [
      { label: 'THROUGHPUT', val: '12,400 req/s' },
      { label: 'P99 LATENCY', val: '14.2 ms' },
      { label: 'UPTIME SLA', val: '99.99%' },
      { label: 'SECURITY', val: 'Zero-Trust RBAC' },
    ],
    highlights: [
      'Engineered multi-tenant relational schemas with Row-Level Security (RLS) guaranteeing strict data segregation.',
      'Implemented distributed Redis caching tier reducing database query pressure by 74%.',
      'Configured automated CI/CD pipeline delivering zero-downtime rolling updates.',
    ],
    github: 'https://github.com/mesameers',
  },
  {
    id: 'orbit-motion',
    badge: 'DETERMINISTIC 3D VIDEO ENGINE',
    title: 'OrbitMotion Code-to-Film Pipeline',
    subtitle: 'Frame-accurate 30.0 fps analytical motion engine compiling mathematical spring physics into deterministic video streams.',
    role: 'Creative Motion & WebGL Engineer',
    color: '#8B5CF6',
    tags: ['Remotion', 'TypeScript', 'Tailwind CSS', 'Vite', 'Web Audio API'],
    metrics: [
      { label: 'FRAME RATE', val: '30.00 fps' },
      { label: 'DETERMINISM', val: '100% Bit-Exact' },
      { label: 'RESOLUTION', val: '1920x1080 60p' },
      { label: 'AUDIO SYNT', val: 'Dual Oscillator' },
    ],
    highlights: [
      'Built analytical damped harmonic spring oscillator replacing non-deterministic JavaScript timers.',
      'Implemented Web Audio API harmonic sound synthesizer generating dynamic ambient drones.',
      'Designed responsive cinema player with ResizeObserver viewport scaling.',
    ],
    github: 'https://github.com/mesameers',
  },
  {
    id: 'cyber-auth',
    badge: 'SECURITY & IDENTITY GATEWAY',
    title: 'CyberAuth Cryptographic RBAC Gateway',
    subtitle: 'Zero-trust authentication proxy with tokenized session invalidation, automated rate limiting, and audited access controls.',
    role: 'Security Engineer & Backend Developer',
    color: '#10B981',
    tags: ['Node.js', 'Express', 'JWT / OAuth2', 'Supabase Auth', 'Crypto'],
    metrics: [
      { label: 'ENCRYPTION', val: 'AES-256-GCM' },
      { label: 'SESSION REVOCATION', val: 'Immediate' },
      { label: 'AUDIT LOGS', val: 'Immutable WAL' },
      { label: 'DDOS SHIELD', val: 'Token Bucket' },
    ],
    highlights: [
      'Implemented dual-token rotation protocol with cryptographic replay prevention.',
      'Designed granular role-based policy matrix with dynamic permission resolution.',
      'Engineered brute-force mitigation algorithm with exponential IP backoff.',
    ],
    github: 'https://github.com/mesameers',
  },
];

export const FeaturedProjects = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-28 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden"
    >
      {/* Background Neon Spotlights */}
      <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-energy-teal/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary-violet/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Layers className="w-3.5 h-3.5" />
            <span>PRODUCTION REPOSITORIES // FLAGSHIP ARCHITECTURES</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Featured Engineering Systems
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Production-grade distributed platforms, deterministic motion pipelines, and hardened cloud security systems.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {PROJECTS.map((proj, idx) => {
            const isCurrent = activeProject.id === proj.id;
            return (
              <div
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`p-8 rounded-3xl bg-space-900/80 border transition-all duration-500 cursor-pointer flex flex-col justify-between group relative overflow-hidden backdrop-blur-xl ${
                  isCurrent
                    ? 'border-energy-teal shadow-[0_0_40px_rgba(0,242,254,0.2)] scale-[1.02]'
                    : 'border-slate-800/80 hover:border-slate-700 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]'
                } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{
                  transitionDelay: `${idx * 150}ms`,
                }}
              >
                {/* Top Glowing Edge on Active Card */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${proj.color}, transparent)`,
                    opacity: isCurrent ? 1 : 0,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded"
                      style={{
                        backgroundColor: `${proj.color}15`,
                        color: proj.color,
                        border: `1px solid ${proj.color}35`,
                      }}
                    >
                      {proj.badge}
                    </span>
                    <span className="font-mono text-xs text-slate-500">0{idx + 1} // SYS</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-energy-cyan transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-4">{proj.role}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">{proj.subtitle}</p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-800">
                    {proj.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-energy-teal shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-space-950 border border-slate-800 font-mono text-[11px] text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Metric Chips */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-800/80">
                    {proj.metrics.slice(0, 2).map((m, mIdx) => (
                      <div key={mIdx} className="bg-space-950/70 p-2 rounded-xl border border-slate-800/80">
                        <span className="text-[10px] font-mono text-slate-500 block">{m.label}</span>
                        <span className="text-xs font-mono font-bold text-white">{m.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Architecture Inspection Terminal for Selected Project */}
        <div className="w-full rounded-3xl bg-space-900/90 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-8 sm:p-10 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-energy-teal mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>SYSTEM_TELEMETRY // ARCHITECTURAL BENCHMARKS</span>
              </div>
              <h3 className="text-3xl font-black text-white">{activeProject.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{activeProject.subtitle}</p>
            </div>

            <div className="flex items-center space-x-3">
              <a
                href={activeProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-space-850 hover:bg-space-800 border border-slate-700 text-slate-200 font-mono text-xs font-bold transition-all shadow-md"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
              </a>
              <a
                href="#contact"
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-energy-teal hover:bg-energy-cyan text-space-950 font-mono text-xs font-extrabold transition-all shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105"
              >
                <span>Discuss System</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Real Metrics 4-Col Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {activeProject.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-space-950 border border-slate-800/80 flex flex-col justify-between"
              >
                <span className="font-mono text-xs text-slate-400 font-medium mb-1">{metric.label}</span>
                <span
                  className="font-mono text-xl sm:text-2xl font-black tracking-tight"
                  style={{ color: activeProject.color }}
                >
                  {metric.val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
