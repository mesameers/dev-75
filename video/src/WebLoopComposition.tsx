import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CosmicBackground } from './components/CosmicBackground';
import { HeroOrb } from './components/HeroOrb';
import { Levitate } from './components/Levitate';

export const WebLoopComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div className="relative w-[1280px] h-[720px] bg-space-950 overflow-hidden font-sans text-white select-none flex items-center justify-between px-20">
      <CosmicBackground particleCount={30} cameraSpeed={1.2} />

      <div className="z-20 max-w-lg">
        <div className="inline-block font-mono text-xs tracking-widest uppercase text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3 py-1 rounded mb-4">
          // SAMEER HUSSAIN // ORBIT
        </div>
        <h1 className="text-6xl font-black tracking-tight leading-none mb-3">
          BUILT IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal to-secondary-violet">ORBIT.</span>
        </h1>
        <p className="text-xl text-slate-300 font-medium">
          Full-Stack Engineering & Subtle Anti-Gravity Systems.
        </p>
      </div>

      <div className="relative z-10">
        <Levitate seed="loop-orb" amplitude={8} periodFrames={90} rollAmplitude={1.0}>
          <HeroOrb size={340} beatFrame={45} />
        </Levitate>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)] z-30"
      />
    </div>
  );
};
