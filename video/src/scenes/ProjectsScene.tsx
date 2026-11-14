import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Levitate } from '../components/Levitate';
import { LiftOffTransition } from '../components/LiftOffTransition';

interface SceneProps {
  durationFrames: number;
}

export const ProjectsScene: React.FC<SceneProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Detach from grid, hover in depth order, then re-dock motion:
  const detachProgress = interpolate(frame, [25, 55, 80, 105], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <LiftOffTransition sceneDurationFrames={durationFrames}>
      <div className="w-full h-full flex flex-col justify-center px-24 z-20">
        {/* Monospace Indicator */}
        <div className="overflow-hidden mb-4">
          <span
            className="inline-block font-mono text-xs tracking-widest uppercase text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3 py-1 rounded"
            style={{ opacity: titleSpring }}
          >
            // 03 FEATURED ENTERPRISE SYSTEM
          </span>
        </div>

        {/* Big Headline (>= 96px) */}
        <div className="overflow-hidden pb-4">
          <h2
            className="text-[90px] font-black tracking-[-0.035em] leading-[0.95] text-white"
            style={{
              transform: `translateY(${interpolate(titleSpring, [0, 1], [90, 0])}px)`,
            }}
          >
            NexusCloud Architecture.
          </h2>
        </div>

        {/* Supporting Line (>= 36px) */}
        <p
          className="text-[36px] font-normal text-slate-400 max-w-4xl leading-snug mb-10"
          style={{ opacity: titleSpring }}
        >
          Distributed multi-tenant platform processing 12,400 req/sec with sub-15ms p99 query latency.
        </p>

        {/* 3 Levitating Depth-Ordered Metric & Control Cards */}
        <div className="grid grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {/* Card 1: High-Throughput Metrics */}
          <div
            style={{
              transform: `translateZ(${(detachProgress * 60).toFixed(1)}px) translateY(${(-detachProgress * 18).toFixed(1)}px)`,
              zIndex: 30,
              transition: 'none',
            }}
          >
            <Levitate seed="proj-throughput" amplitude={9} periodFrames={140} shadowWidth="85%">
              <div className="p-7 rounded-2xl bg-space-900/95 border border-energy-teal/40 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
                  <span className="text-energy-teal">// THROUGHPUT & INGESTION</span>
                  <span className="text-emerald-400 font-semibold">+48.5%</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">12.4k</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Requests Per Second</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>P99 Query Latency</span>
                    <span className="text-white font-semibold">14.2 ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cache Hit Ratio</span>
                    <span className="text-energy-teal font-semibold">99.2%</span>
                  </div>
                </div>
              </div>
            </Levitate>
          </div>

          {/* Card 2: High Availability & Scaling */}
          <div
            style={{
              transform: `translateZ(${(detachProgress * 110).toFixed(1)}px) translateY(${(-detachProgress * 32).toFixed(1)}px) scale(${1 + detachProgress * 0.04})`,
              zIndex: 40,
              transition: 'none',
            }}
          >
            <Levitate seed="proj-uptime" amplitude={7} periodFrames={160} shadowWidth="85%">
              <div className="p-7 rounded-2xl bg-space-900/95 border border-secondary-violet/50 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
                  <span className="text-secondary-violet">// CLUSTER AVAILABILITY</span>
                  <span className="text-cyan-400 font-semibold">GLOBAL SLA</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">99.99%</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Operational Uptime</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Container Clusters</span>
                    <span className="text-white font-semibold">Docker & K8s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disaster Recovery</span>
                    <span className="text-emerald-400 font-semibold">&lt; 30s RTO</span>
                  </div>
                </div>
              </div>
            </Levitate>
          </div>

          {/* Card 3: Database & Security Architecture */}
          <div
            style={{
              transform: `translateZ(${(detachProgress * 40).toFixed(1)}px) translateY(${(-detachProgress * 12).toFixed(1)}px)`,
              zIndex: 20,
              transition: 'none',
            }}
          >
            <Levitate seed="proj-database" amplitude={8} periodFrames={150} shadowWidth="85%">
              <div className="p-7 rounded-2xl bg-space-900/95 border border-cyan-400/35 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
                  <span className="text-cyan-400">// SECURITY MATRIX</span>
                  <span className="text-energy-teal">HARDENED</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">RLS</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Row-Level Segregation</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Database</span>
                    <span className="text-white font-semibold">PostgreSQL 16 & Redis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Identity Protocol</span>
                    <span className="text-energy-cyan font-semibold">Zero-Trust JWT</span>
                  </div>
                </div>
              </div>
            </Levitate>
          </div>
        </div>
      </div>
    </LiftOffTransition>
  );
};
