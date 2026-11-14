import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Levitate } from '../components/Levitate';
import { LiftOffTransition } from '../components/LiftOffTransition';

interface SceneProps {
  durationFrames: number;
}

export const PhilosophyScene: React.FC<SceneProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const termSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 13, stiffness: 90 },
  });

  // Animated counters
  const uptimeCount = interpolate(frame, [15, 60], [95.0, 99.99], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const latencyCount = Math.round(
    interpolate(frame, [15, 60], [120, 24], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  return (
    <LiftOffTransition sceneDurationFrames={durationFrames}>
      <div className="w-full h-full flex flex-col justify-center px-24 z-20">
        {/* Monospace Indicator */}
        <div className="overflow-hidden mb-4">
          <span
            className="inline-block font-mono text-xs tracking-widest uppercase text-violet-400 bg-secondary-violet/10 border border-secondary-violet/30 px-3 py-1 rounded"
            style={{ opacity: titleSpring }}
          >
            // 01 ARCHITECTURAL PHILOSOPHY
          </span>
        </div>

        {/* Big Headline (>= 96px) */}
        <div className="overflow-hidden pb-4 max-w-4xl">
          <h2
            className="text-[86px] font-black tracking-[-0.035em] leading-[0.98] text-white"
            style={{
              transform: `translateY(${interpolate(titleSpring, [0, 1], [90, 0])}px)`,
            }}
          >
            Built for Scale.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-slate-100 to-energy-cyan">
              Engineered for Resilience.
            </span>
          </h2>
        </div>

        {/* Supporting Line (>= 36px) */}
        <p
          className="text-[36px] font-normal text-slate-400 max-w-3xl leading-snug mb-10"
          style={{ opacity: titleSpring }}
        >
          High-throughput multi-tenant systems designed to run continuously with zero drift.
        </p>

        {/* Technical Code Terminal & Real Stat Telemetry */}
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Terminal Window */}
          <div
            className="col-span-8 rounded-xl bg-space-900/90 border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden font-mono text-sm"
            style={{
              transform: `translateY(${interpolate(termSpring, [0, 1], [40, 0])}px)`,
              opacity: termSpring,
            }}
          >
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-space-850 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-slate-400">bash - sameer@orbit-node-01: ~/dev-75</span>
              <span className="text-xs text-energy-teal">LIVE</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 space-y-2.5 text-slate-300">
              <div className="flex items-center space-x-2 text-energy-teal">
                <span>&gt;</span>
                <span className="text-white font-semibold">init-system --profile=production</span>
              </div>
              <p className="text-slate-400 text-xs">
                [OK] PostgreSQL 16 cluster linked (zero-trust RLS active)
              </p>
              <p className="text-slate-400 text-xs">
                [OK] Express REST middleware authenticated via RBAC tokens
              </p>
              <p className="text-slate-400 text-xs">
                [OK] Frame-locked deterministic renderer initialized at 30.0 fps
              </p>
              <div className="flex items-center space-x-2 text-energy-cyan pt-2">
                <span>*</span>
                <span>Telemetry: 12,400 Distributed Requests/sec across 6 Cloud Nodes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Levitation Stat Counters */}
          <div className="col-span-4 flex flex-col gap-4">
            <Levitate seed="stat-uptime" amplitude={7} periodFrames={130} shadowWidth="70%">
              <div className="p-5 rounded-xl bg-space-900/80 border border-energy-teal/30 backdrop-blur-md">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  Target Availability
                </div>
                <div className="text-[44px] font-black text-energy-teal tracking-tight">
                  {uptimeCount.toFixed(2)}%
                </div>
                <div className="text-xs text-slate-500">Continuous operation</div>
              </div>
            </Levitate>

            <Levitate seed="stat-latency" amplitude={6} periodFrames={160} shadowWidth="70%">
              <div className="p-5 rounded-xl bg-space-900/80 border border-secondary-violet/30 backdrop-blur-md">
                <div className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  Edge Response Latency
                </div>
                <div className="text-[44px] font-black text-secondary-violet tracking-tight">
                  {latencyCount} ms
                </div>
                <div className="text-xs text-slate-500">Global CDN cache hit</div>
              </div>
            </Levitate>
          </div>
        </div>
      </div>
    </LiftOffTransition>
  );
};
