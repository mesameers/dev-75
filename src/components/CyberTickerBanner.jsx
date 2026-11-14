import React from 'react';
import { Sparkles, Cpu, Layers, ShieldCheck, Zap, Terminal, Activity } from 'lucide-react';

const TICKER_ITEMS = [
  'DISTRIBUTED CLUSTER 12.4K REQ/S',
  'REACT 18 & NEXT.JS 14',
  'DETERMINISTIC REMOTION 30.0 FPS',
  'SUPABASE POSTGRESQL 16 & REDIS',
  'DOCKER & K8S ORCHESTRATION',
  'ZERO-TRUST RBAC SECURITY',
  'SUB-15MS P99 LATENCY',
  'HIGH-FIDELITY 3D WEBGL MOTION',
  'GLOBAL VERCEL EDGE DISTRIBUTION',
];

export const CyberTickerBanner = () => {
  return (
    <div className="relative w-full py-4 overflow-hidden border-y border-energy-teal/30 bg-space-900/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,242,254,0.15)] select-none">
      {/* Background Soft Neon Ray */}
      <div className="absolute inset-0 bg-gradient-to-r from-energy-teal/10 via-secondary-violet/10 to-energy-teal/10 pointer-events-none" />

      {/* Infinite Scrolling Track */}
      <div className="flex items-center space-x-8 whitespace-nowrap animate-ticker">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
          <div key={idx} className="inline-flex items-center space-x-3 font-mono text-xs font-black tracking-widest text-slate-300">
            <span className="w-2 h-2 rounded-full bg-energy-cyan shadow-[0_0_10px_#00FFE0] animate-pulse" />
            <span className="hover:text-energy-cyan transition-colors">{item}</span>
            <span className="text-slate-600">//</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          display: flex;
          width: max-content;
          animation: tickerScroll 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
