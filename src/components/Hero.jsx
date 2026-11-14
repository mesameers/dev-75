import React from 'react';
import { Film, ArrowDown, Code2, Database, Layers, Sparkles } from 'lucide-react';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-energy-teal/15 via-secondary-violet/10 to-transparent blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-space-900/90 border border-energy-teal/30 text-energy-cyan font-mono text-xs tracking-wider mb-8 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
          <span>PORTFOLIO 2026 // BUILT IN ORBIT</span>
        </div>

        {/* Main Kinetic Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white leading-[0.95] mb-6">
          SAMEER{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet">
            HUSSAIN
          </span>
        </h1>

        {/* Role & Mission Statement */}
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300 max-w-3xl leading-relaxed mb-10">
          Full-Stack Developer & Creative Engineer architecting resilient enterprise web applications and deterministic motion systems.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href="#film"
            className="flex items-center space-x-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-energy-teal to-secondary-violet text-space-950 font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:scale-105 transition-all"
          >
            <Film className="w-4 h-4 text-space-950" />
            <span>Watch the Code-Rendered Film</span>
          </a>
          <a
            href="#projects"
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-space-900/80 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-sm transition-all hover:bg-space-850"
          >
            <span>Explore Flagship EIMS</span>
          </a>
        </div>

        {/* Floating Capability Pills (Subtle Anti-Gravity) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl text-left">
          <div className="p-4 rounded-xl bg-space-900/70 border border-slate-800 backdrop-blur-md hover:border-energy-teal/40 transition-colors">
            <div className="flex items-center space-x-2 text-energy-teal mb-1">
              <Code2 className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">React / Next.js</span>
            </div>
            <p className="text-xs text-slate-400">High-performance reactive interfaces</p>
          </div>

          <div className="p-4 rounded-xl bg-space-900/70 border border-slate-800 backdrop-blur-md hover:border-secondary-violet/40 transition-colors">
            <div className="flex items-center space-x-2 text-secondary-violet mb-1">
              <Database className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">Supabase / Node</span>
            </div>
            <p className="text-xs text-slate-400">PostgreSQL 16 schemas & REST APIs</p>
          </div>

          <div className="p-4 rounded-xl bg-space-900/70 border border-slate-800 backdrop-blur-md hover:border-cyan-400/40 transition-colors">
            <div className="flex items-center space-x-2 text-cyan-400 mb-1">
              <Layers className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">Enterprise EIMS</span>
            </div>
            <p className="text-xs text-slate-400">2,341 active multi-campus sessions</p>
          </div>

          <div className="p-4 rounded-xl bg-space-900/70 border border-slate-800 backdrop-blur-md hover:border-energy-teal/40 transition-colors">
            <div className="flex items-center space-x-2 text-energy-teal mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">Video as Code</span>
            </div>
            <p className="text-xs text-slate-400">Frame-locked Remotion composition</p>
          </div>
        </div>
      </div>
    </section>
  );
};
