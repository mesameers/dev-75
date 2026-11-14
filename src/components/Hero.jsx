import React from 'react';
import { Film, ArrowRight, Code2, Database, Layers, Sparkles, Activity, Server, Cpu } from 'lucide-react';
import { CosmicAvatar } from './CosmicAvatar';
import { HeroTelemetryCard } from './HeroTelemetryCard';
import { CyberScramble } from './CyberScramble';

export const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Background Deep Cosmic Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] bg-energy-teal/10 blur-[190px] pointer-events-none rounded-full animate-pulse-slow" />
      <div className="absolute top-1/3 right-1/4 w-[750px] h-[750px] bg-secondary-violet/15 blur-[200px] pointer-events-none rounded-full animate-pulse-slow" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Top Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Kinetic Typography & Role (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            {/* Live Orbit Status Pill */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-space-900/90 border border-energy-teal/40 text-energy-cyan font-mono text-xs tracking-wider mb-6 shadow-[0_0_25px_rgba(0,242,254,0.25)] hover:border-energy-teal transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-energy-teal" />
              </span>
              <span className="font-semibold">// SAMEER HUSSAIN // REPO v2026</span>
              <span className="text-slate-600">|</span>
              <span className="text-violet-400">STATUS: ORBIT_READY</span>
            </div>

            {/* Kinetic Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-[-0.04em] text-white leading-[0.92] mb-4">
              SAMEER
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet animate-gradient-x">
                HUSSAIN
              </span>
            </h1>

            {/* Dynamic Cyber Scramble Rotating Title */}
            <CyberScramble />

            {/* Subtitle & Architecture Philosophy */}
            <p className="text-base sm:text-lg md:text-xl font-medium text-slate-300 max-w-xl leading-relaxed mb-8">
              Senior Full-Stack Developer & Creative Systems Architect engineering hardened multi-tenant platforms, high-throughput APIs, and deterministic 3D motion experiences.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#film"
                className="flex items-center space-x-3 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-energy-teal via-cyan-300 to-secondary-violet text-space-950 font-extrabold text-sm tracking-wide shadow-[0_0_35px_rgba(0,242,254,0.4)] hover:shadow-[0_0_50px_rgba(0,242,254,0.6)] hover:scale-105 transition-all group"
              >
                <Film className="w-4 h-4 text-space-950 group-hover:rotate-12 transition-transform" />
                <span>Watch "Built in Orbit" Film</span>
                <ArrowRight className="w-4 h-4 text-space-950 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-space-900/80 border border-slate-700/80 hover:border-energy-teal/50 text-slate-200 font-semibold text-sm transition-all hover:bg-space-850 hover:shadow-[0_0_20px_rgba(0,242,254,0.15)]"
              >
                <span>Explore Architecture Systems</span>
              </a>
            </div>

            {/* Monospace Quick Status */}
            <div className="flex items-center space-x-3 font-mono text-xs text-slate-400 bg-space-900/70 border border-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-energy-teal animate-pulse" />
              <span className="text-slate-300 font-semibold">&gt; 12,400 req/sec</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300">99.99% Cloud Uptime SLA</span>
            </div>
          </div>

          {/* Right Column: High-Tech Telemetry HUD & 3D Cosmic Avatar (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-4 relative">
            {/* Top Right: Holographic Telemetry HUD */}
            <div className="w-full flex justify-end">
              <HeroTelemetryCard />
            </div>

            {/* Bottom Floating Cyber Avatar with 3D Rings & Orbiting Tech Badges */}
            <div className="relative -mt-6">
              <CosmicAvatar size={340} />
            </div>
          </div>
        </div>

        {/* Floating Capability Cards (Subtle Levitation Grid) */}
        <div className="w-full mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-space-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-energy-teal/50 hover:shadow-[0_0_25px_rgba(0,242,254,0.2)] transition-all hover:-translate-y-1 group">
            <div className="flex items-center space-x-2 text-energy-teal mb-2 group-hover:scale-105 transition-transform">
              <Code2 className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">React 18 / Next.js</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Server components & reactive state</p>
          </div>

          <div className="p-5 rounded-2xl bg-space-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-secondary-violet/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)] transition-all hover:-translate-y-1 group">
            <div className="flex items-center space-x-2 text-secondary-violet mb-2 group-hover:scale-105 transition-transform">
              <Database className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">PostgreSQL 16 & Redis</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">ACID isolation & sub-15ms p99 cache</p>
          </div>

          <div className="p-5 rounded-2xl bg-space-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.2)] transition-all hover:-translate-y-1 group">
            <div className="flex items-center space-x-2 text-cyan-400 mb-2 group-hover:scale-105 transition-transform">
              <Server className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">Cloud Microservices</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Docker, Kubernetes & Node.js clusters</p>
          </div>

          <div className="p-5 rounded-2xl bg-space-900/70 border border-slate-800/80 backdrop-blur-xl hover:border-energy-teal/50 hover:shadow-[0_0_25px_rgba(0,242,254,0.2)] transition-all hover:-translate-y-1 group">
            <div className="flex items-center space-x-2 text-energy-teal mb-2 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-xs font-bold uppercase">Motion as Code</span>
            </div>
            <p className="text-xs text-slate-300 font-medium">Deterministic Remotion 30.0 fps</p>
          </div>
        </div>
      </div>
    </section>
  );
};
