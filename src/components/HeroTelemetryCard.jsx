import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, Terminal, Radio, Zap, Globe, Sparkles } from 'lucide-react';

const LIVE_FEEDS = [
  { text: "git: commit #533e7b5 pushed to main", tag: "GIT", color: "text-energy-teal" },
  { text: "supabase: RLS verified on 16 relational tables", tag: "DB", color: "text-secondary-violet" },
  { text: "cluster: 12,400 distributed requests/sec nominal", tag: "CLOUD", color: "text-cyan-400" },
  { text: "remotion: deterministic 30.0 fps clock sync", tag: "RENDER", color: "text-emerald-400" },
  { text: "security: zero-trust RBAC token validated", tag: "AUTH", color: "text-amber-400" },
  { text: "network: CDN cache hit ratio 99.2%", tag: "EDGE", color: "text-energy-cyan" },
];

export const HeroTelemetryCard = () => {
  const [feedIndex, setFeedIndex] = useState(0);
  const [latency, setLatency] = useState(14);
  const [cpuUsage, setCpuUsage] = useState(28);

  useEffect(() => {
    const feedInterval = setInterval(() => {
      setFeedIndex((prev) => (prev + 1) % LIVE_FEEDS.length);
      setLatency(Math.floor(12 + Math.random() * 6));
      setCpuUsage(Math.floor(24 + Math.random() * 12));
    }, 2800);

    return () => clearInterval(feedInterval);
  }, []);

  return (
    <div className="relative w-full max-w-lg rounded-3xl bg-space-900/85 border border-energy-teal/30 p-6 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(0,242,254,0.12)] hover:border-energy-teal/60 transition-all group">
      {/* Top Holographic Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-2.5">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-energy-teal" />
          </div>
          <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
            ORBIT_TELEMETRY.SYS
          </span>
        </div>

        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400 bg-space-950 px-2.5 py-1 rounded-lg border border-slate-800">
          <Radio className="w-3 h-3 text-energy-teal animate-pulse" />
          <span>LEO: 300 KM</span>
        </div>
      </div>

      {/* Grid of Live Telemetry Gauges */}
      <div className="grid grid-cols-3 gap-3 my-4">
        {/* Gauge 1: Cluster Uptime */}
        <div className="p-3 rounded-2xl bg-space-950/80 border border-slate-800/80 text-left">
          <div className="flex items-center space-x-1 text-slate-500 font-mono text-[10px] mb-1">
            <Zap className="w-3 h-3 text-energy-teal" />
            <span>UPTIME</span>
          </div>
          <div className="text-xl font-black text-white font-mono tracking-tight">99.99%</div>
          <div className="text-[10px] text-emerald-400 font-mono">NOMINAL</div>
        </div>

        {/* Gauge 2: Response Latency */}
        <div className="p-3 rounded-2xl bg-space-950/80 border border-slate-800/80 text-left">
          <div className="flex items-center space-x-1 text-slate-500 font-mono text-[10px] mb-1">
            <Activity className="w-3 h-3 text-secondary-violet" />
            <span>LATENCY</span>
          </div>
          <div className="text-xl font-black text-secondary-violet font-mono tracking-tight">{latency} ms</div>
          <div className="text-[10px] text-slate-400 font-mono">EDGE CACHE</div>
        </div>

        {/* Gauge 3: CPU Load */}
        <div className="p-3 rounded-2xl bg-space-950/80 border border-slate-800/80 text-left">
          <div className="flex items-center space-x-1 text-slate-500 font-mono text-[10px] mb-1">
            <Cpu className="w-3 h-3 text-cyan-400" />
            <span>LOAD</span>
          </div>
          <div className="text-xl font-black text-cyan-300 font-mono tracking-tight">{cpuUsage}%</div>
          <div className="text-[10px] text-slate-400 font-mono">8 CORES</div>
        </div>
      </div>

      {/* Realtime Terminal Telemetry Stream */}
      <div className="p-3.5 rounded-2xl bg-space-950 border border-slate-800/90 font-mono text-xs text-left overflow-hidden">
        <div className="flex items-center justify-between text-[10px] text-slate-500 pb-2 mb-2 border-b border-slate-850">
          <span className="flex items-center space-x-1">
            <Terminal className="w-3 h-3 text-energy-teal" />
            <span>LIVE SYSTEM TELEMETRY FEED</span>
          </span>
          <span className="text-energy-teal animate-pulse">STREAMING</span>
        </div>

        {/* Animated Rotating Ticker */}
        <div className="flex items-center space-x-2 py-1">
          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-space-850 text-energy-cyan border border-energy-teal/30 shrink-0">
            {LIVE_FEEDS[feedIndex].tag}
          </span>
          <span className="text-slate-200 text-xs truncate transition-all duration-300">
            {LIVE_FEEDS[feedIndex].text}
          </span>
        </div>
      </div>

      {/* Verified Security Architecture Footnote */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between font-mono text-[11px] text-slate-400">
        <div className="flex items-center space-x-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ZERO-TRUST ARCHITECTURE</span>
        </div>
        <span className="text-slate-500">SAMEER // DEV-75</span>
      </div>
    </div>
  );
};
