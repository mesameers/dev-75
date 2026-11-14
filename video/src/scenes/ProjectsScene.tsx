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
  // Phase 1 (0-30f): Enters docked in grid
  // Phase 2 (30-80f): Detaches forward in 3D depth with individual z offsets
  // Phase 3 (80-110f): Re-docks cleanly into unified dashboard posture
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
            Multi-Campus EIMS.
          </h2>
        </div>

        {/* Supporting Line (>= 36px) */}
        <p
          className="text-[36px] font-normal text-slate-400 max-w-4xl leading-snug mb-10"
          style={{ opacity: titleSpring }}
        >
          Comprehensive educational administration handling 2,341 live sessions across 3 campuses.
        </p>

        {/* 3 Levitating Depth-Ordered Metric & Control Cards */}
        <div className="grid grid-cols-3 gap-8" style={{ perspective: '1200px' }}>
          {/* Card 1: Superadmin Executive Metrics */}
          <div
            style={{
              transform: `translateZ(${(detachProgress * 60).toFixed(1)}px) translateY(${(-detachProgress * 18).toFixed(1)}px)`,
              zIndex: 30,
              transition: 'none',
            }}
          >
            <Levitate seed="proj-superadmin" amplitude={9} periodFrames={140} shadowWidth="85%">
              <div className="p-7 rounded-2xl bg-space-900/95 border border-energy-teal/40 backdrop-blur-xl shadow-[0_25px_50px_rgba(0,0,0,0.8)]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
                  <span className="text-energy-teal">// PLATFORM METRICS</span>
                  <span className="text-emerald-400 font-semibold">+23.1%</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">2,341</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Active User Sessions</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Institutes Enrolled</span>
                    <span className="text-white font-semibold">3 Multi-Campus</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Growth</span>
                    <span className="text-energy-teal font-semibold">34.2%</span>
                  </div>
                </div>
              </div>
            </Levitate>
          </div>

          {/* Card 2: Institute Operations & Roster */}
          <div
            style={{
              transform: `translateZ(${(detachProgress * 110).toFixed(1)}px) translateY(${(-detachProgress * 32).toFixed(1)}px) scale(${1 + detachProgress * 0.04})`,
              zIndex: 40,
              transition: 'none',
            }}
          >
            <Levitate seed="proj-students" amplitude={7} periodFrames={160} shadowWidth="85%">
              <div className="p-7 rounded-2xl bg-space-900/95 border border-secondary-violet/50 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.9)]">
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4">
                  <span className="text-secondary-violet">// CAMPUS GOVERNANCE</span>
                  <span className="text-cyan-400 font-semibold">96.4% Att.</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">1,240</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Students Managed</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Teaching Faculty</span>
                    <span className="text-white font-semibold">68 Certified</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee Recovery Rate</span>
                    <span className="text-emerald-400 font-semibold">94.0%</span>
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
                  <span className="text-cyan-400">// CLUSTER TOPOLOGY</span>
                  <span className="text-energy-teal">ACTIVE</span>
                </div>
                <div className="text-4xl font-extrabold text-white mb-2">16</div>
                <div className="text-sm font-medium text-slate-300 mb-5">Relational Tables</div>
                <div className="space-y-2 pt-3 border-t border-slate-800 font-mono text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Database</span>
                    <span className="text-white font-semibold">Supabase PostgreSQL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Security Model</span>
                    <span className="text-energy-cyan font-semibold">Role-Based (RBAC)</span>
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
