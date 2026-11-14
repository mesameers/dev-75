import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CosmicBackground } from './components/CosmicBackground';
import { HeroOrb } from './components/HeroOrb';
import { Levitate } from './components/Levitate';

export const VerticalComposition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 100 },
  });

  // Burned-in caption progression
  let activeCaption = 'Sameer Hussain -- Full-Stack Developer & Creative Engineer';
  if (frame > 90 && frame <= 210) {
    activeCaption = 'Enterprise Multi-Campus Systems: 2,341 Active Sessions';
  } else if (frame > 210 && frame <= 330) {
    activeCaption = 'React, Node.js, Supabase & Deterministic Motion';
  } else if (frame > 330) {
    activeCaption = "Let's Talk: mesameer762@gmail.com";
  }

  return (
    <div className="relative w-[1080px] h-[1920px] bg-space-950 overflow-hidden font-sans text-white select-none flex flex-col justify-between p-20 items-center text-center">
      <CosmicBackground particleCount={40} cameraSpeed={1.2} />

      {/* Top Header */}
      <div className="z-20 pt-16">
        <span className="font-mono text-xl tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-5 py-2 rounded-full">
          // SAMEER HUSSAIN
        </span>
      </div>

      {/* Central 3D Levitation Hero */}
      <div className="z-20 my-auto flex flex-col items-center">
        <Levitate seed="vertical-hero-orb" amplitude={12} periodFrames={140} rollAmplitude={1.5}>
          <HeroOrb size={540} beatFrame={60} />
        </Levitate>

        <h1 className="text-7xl font-black tracking-tight mt-12 mb-4 leading-tight">
          BUILT IN
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet">
            ORBIT.
          </span>
        </h1>
        <p className="text-3xl text-slate-300 font-medium max-w-xl">
          Full-Stack Web Architectures & Interactive Experiences.
        </p>
      </div>

      {/* Bottom Burned-in Captions Banner */}
      <div className="z-20 pb-16 w-full">
        <div className="bg-space-900/90 border border-slate-700/80 px-8 py-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-md">
          <p className="font-mono text-2xl text-energy-cyan font-semibold">
            {activeCaption}
          </p>
        </div>
      </div>
    </div>
  );
};
