import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Database, Server, Zap, Globe, GitBranch, Layers, Shield } from 'lucide-react';

export const HeroSystemMatrix = () => {
  const [pulseData, setPulseData] = useState([45, 62, 58, 80, 72, 90, 68, 85, 95, 78, 64, 88, 92]);
  const [activeThread, setActiveThread] = useState(4);
  const [memMb, setMemMb] = useState(148);

  useEffect(() => {
    const pInterval = setInterval(() => {
      setPulseData((prev) => {
        const next = [...prev.slice(1), Math.floor(45 + Math.random() * 50)];
        return next;
      });
      setActiveThread(Math.floor(2 + Math.random() * 6));
      setMemMb(Math.floor(142 + Math.random() * 18));
    }, 1400);

    return () => clearInterval(pInterval);
  }, []);

  return (
    <div className="w-full mt-8 p-4 sm:p-5 rounded-2xl bg-space-900/60 border border-slate-800/80 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Thread & Runtime Telemetry */}
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <div className="flex items-center space-x-2 font-mono text-xs text-energy-teal">
          <Activity className="w-4 h-4 text-energy-cyan animate-pulse" />
          <span className="font-bold">RUNTIME_STATUS:</span>
          <span className="text-emerald-400 font-black">HIGH_PERF_STABLE</span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 font-mono text-xs text-slate-400">
          <Cpu className="w-3.5 h-3.5 text-secondary-violet" />
          <span>THREADS: <strong className="text-white">{activeThread} ACTIVE</strong></span>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 font-mono text-xs text-slate-400">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>HEAP: <strong className="text-white">{memMb} MB</strong></span>
        </div>
      </div>

      {/* Mini Real-Time Activity Pulse Chart */}
      <div className="flex items-center space-x-1 h-6">
        {pulseData.map((val, idx) => (
          <div
            key={idx}
            className="w-1.5 rounded-full bg-gradient-to-t from-energy-teal via-cyan-400 to-secondary-violet transition-all duration-300"
            style={{
              height: `${Math.max(20, (val / 100) * 24)}px`,
              opacity: 0.35 + (idx / pulseData.length) * 0.65,
            }}
          />
        ))}
      </div>

      {/* Cloud Node Region SLA */}
      <div className="flex items-center space-x-3 font-mono text-xs text-slate-400">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-slate-300 font-semibold">GLOBAL EDGE POOL</span>
        </div>
        <span className="text-slate-600">|</span>
        <span className="text-energy-teal font-bold">&lt; 14ms p99</span>
      </div>
    </div>
  );
};
