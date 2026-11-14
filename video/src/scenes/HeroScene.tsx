import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { HeroOrb } from '../components/HeroOrb';
import { Levitate } from '../components/Levitate';
import { LiftOffTransition } from '../components/LiftOffTransition';

interface SceneProps {
  durationFrames: number;
}

export const HeroScene: React.FC<SceneProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for line 1 (Name)
  const nameSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  // Entrance spring for line 2 (Role)
  const roleSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const nameTranslateY = interpolate(nameSpring, [0, 1], [110, 0]);
  const roleTranslateY = interpolate(roleSpring, [0, 1], [50, 0]);
  const roleOpacity = interpolate(roleSpring, [0, 1], [0, 1]);

  return (
    <LiftOffTransition sceneDurationFrames={durationFrames}>
      <div className="relative w-full h-full flex items-center justify-between px-24">
        {/* Left Column: Kinetic Typography & Role */}
        <div className="z-20 max-w-2xl">
          {/* System Monospace Tag */}
          <div className="overflow-hidden mb-4">
            <span
              className="inline-block font-mono text-sm tracking-widest uppercase px-3 py-1 rounded bg-energy-teal/10 border border-energy-teal/30 text-energy-cyan"
              style={{
                transform: `translateY(${interpolate(nameSpring, [0, 1], [30, 0])}px)`,
                opacity: nameSpring,
              }}
            >
              // PORTFOLIO REPOSITORY v2026.1
            </span>
          </div>

          {/* Headline: SAMEER HUSSAIN (Line mask reveal, >= 96px) */}
          <div className="overflow-hidden pb-3">
            <h1
              className="text-[104px] font-black tracking-[-0.04em] leading-[0.92] text-white"
              style={{
                transform: `translateY(${nameTranslateY.toFixed(1)}px)`,
                willChange: 'transform',
              }}
            >
              SAMEER
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet">
                HUSSAIN
              </span>
            </h1>
          </div>

          {/* Subtitle / Role (>= 36px at 1080p) */}
          <div className="overflow-hidden pt-3">
            <p
              className="text-[38px] font-medium text-slate-300 leading-tight tracking-tight"
              style={{
                transform: `translateY(${roleTranslateY.toFixed(1)}px)`,
                opacity: roleOpacity,
                willChange: 'transform, opacity',
              }}
            >
              Full-Stack Developer &
              <br />
              <span className="text-energy-cyan font-semibold">Creative Engineer</span>
            </p>
          </div>

          {/* Compact Monospace Capability Badges */}
          <div
            className="mt-8 flex items-center gap-3 font-mono text-xs text-slate-400"
            style={{ opacity: roleOpacity }}
          >
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
              React + Node.js
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
              Supabase Architecture
            </span>
            <span className="px-2.5 py-1 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
              Deterministic Motion
            </span>
          </div>
        </div>

        {/* Right Column: Hero 3D Orb with Anti-Gravity Levitation */}
        <div className="relative z-10 flex items-center justify-center">
          <Levitate seed="hero-orb-3d" amplitude={9} periodFrames={140} rollAmplitude={1.2}>
            <HeroOrb size={460} beatFrame={90} />
          </Levitate>
        </div>

        {/* Dark gradient scrim behind text over 3D hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-2/3 bg-gradient-to-r from-space-950 via-space-950/90 to-transparent z-15"
        />
      </div>
    </LiftOffTransition>
  );
};
