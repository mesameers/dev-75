import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GitLayer } from '../components/GitLayer';
import { Levitate } from '../components/Levitate';

interface SceneProps {
  durationFrames: number;
}

export const FinaleScene: React.FC<SceneProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for the closing call to action lockup after git merge (frame 60+)
  const ctaSpring = spring({
    frame: Math.max(0, frame - 65),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const ctaTranslateY = interpolate(ctaSpring, [0, 1], [60, 0]);
  const ctaOpacity = interpolate(ctaSpring, [0, 1], [0, 1]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-12 z-20">
      {/* Active Git Merge Gravitational Animation Layer */}
      <GitLayer mode="merge" />

      {/* Main Closing Call To Action Moment */}
      <div
        className="z-30 flex flex-col items-center"
        style={{
          transform: `translateY(${ctaTranslateY.toFixed(1)}px)`,
          opacity: ctaOpacity,
          willChange: 'transform, opacity',
        }}
      >
        <Levitate seed="finale-cta" amplitude={7} periodFrames={140} rollAmplitude={0.8} showShadow={false}>
          {/* Monospace Commit Complete Pill */}
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-energy-cyan bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
            <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
            <span>git merge origin/main --ff-only // READY TO COLLABORATE</span>
          </div>

          {/* Bold Closing "LET'S TALK" Moment (>= 96px) */}
          <h2 className="text-[112px] font-black tracking-[-0.04em] leading-[0.92] text-white mb-4">
            LET'S{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet">
              TALK.
            </span>
          </h2>

          {/* Supporting Line (>= 36px) */}
          <p className="text-[36px] font-medium text-slate-300 max-w-3xl leading-snug mb-8">
            Available for high-impact web and creative engineering projects.
          </p>

          {/* Contact & GitHub Coordinates Card */}
          <div className="flex items-center gap-6 font-mono text-lg text-slate-300 bg-space-900/90 border border-slate-700/80 px-8 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="flex items-center space-x-2.5">
              <span className="text-energy-teal">✉</span>
              <span className="text-white font-semibold">mesameer762@gmail.com</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-2.5">
              <span className="text-secondary-violet">⌘</span>
              <span className="text-white font-semibold">github.com/mesameers</span>
            </div>
          </div>
        </Levitate>
      </div>
    </div>
  );
};
