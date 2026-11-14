import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface HeroOrbProps {
  size?: number;
  beatFrame?: number; // frame where outer shell separates
}

export const HeroOrb: React.FC<HeroOrbProps> = ({ size = 380, beatFrame = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Continuous subtle 3D rotational drift
  const rotX = (frame * 0.4) % 360;
  const rotY = (frame * 0.6) % 360;
  const rotZ = (frame * 0.25) % 360;

  // Signature moment: outer shell separation on beat (under 1 second settle)
  const isSeparating = frame >= beatFrame;
  const separationSpring = spring({
    frame: isSeparating ? frame - beatFrame : 0,
    fps,
    config: {
      damping: 10,
      stiffness: 90,
      mass: 0.6,
    },
  });

  // Shell expands outward ~12% on beat, then relaxes back to ~4% floating shell offset
  const settleProgress = interpolate(frame, [beatFrame + 18, beatFrame + 30], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const shellExpansion = isSeparating
    ? (separationSpring * 0.12 * settleProgress) + 0.04
    : 0.0;

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none"
      style={{
        width: size,
        height: size,
        perspective: '1000px',
      }}
    >
      {/* Soft Ambient Core Glow */}
      <div
        className="absolute rounded-full blur-[40px] opacity-40"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          background: 'radial-gradient(circle, #00F2FE 0%, rgba(121,40,202,0.4) 60%, transparent 80%)',
        }}
      />

      {/* Inner Dense Wireframe Sphere (less saturated so it doesn't fight text) */}
      <div
        className="absolute rounded-full border border-slate-700/60 shadow-[inset_0_0_40px_rgba(0,242,254,0.15)]"
        style={{
          width: size * 0.76,
          height: size * 0.76,
          transform: `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Longitudinal rings */}
        {[0, 45, 90, 135].map((deg) => (
          <div
            key={deg}
            className="absolute inset-0 rounded-full border border-cyan-400/20"
            style={{
              transform: `rotateY(${deg}deg)`,
            }}
          />
        ))}
        {/* Latitudinal rings */}
        <div
          className="absolute inset-0 rounded-full border border-violet-400/25"
          style={{ transform: 'rotateX(90deg)' }}
        />
        <div
          className="absolute inset-[15%] rounded-full border border-teal-300/20"
          style={{ transform: 'rotateX(90deg)' }}
        />
      </div>

      {/* Outer Geometric Shell (Separates on beat) */}
      <div
        className="absolute rounded-full border border-energy-teal/40"
        style={{
          width: size * (1.0 + shellExpansion),
          height: size * (1.0 + shellExpansion),
          transform: `rotateX(${(rotX * 0.7).toFixed(1)}deg) rotateY(${(-rotY * 0.5).toFixed(1)}deg) rotateZ(${rotZ.toFixed(1)}deg)`,
          boxShadow: `0 0 ${15 + shellExpansion * 80}px rgba(0, 242, 254, ${0.15 + shellExpansion * 0.4})`,
          transition: 'none',
        }}
      >
        {/* Orbital Node Beads */}
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-energy-cyan shadow-[0_0_12px_#00FFE0]"
        />
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-secondary-violet shadow-[0_0_10px_#8B5CF6]"
        />
        <div
          className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-energy-teal shadow-[0_0_10px_#00F2FE]"
        />
      </div>

      {/* Equator Outer Ring */}
      <div
        className="absolute rounded-full border border-secondary-purple/35 pointer-events-none"
        style={{
          width: size * (1.18 + shellExpansion * 0.6),
          height: size * (1.18 + shellExpansion * 0.6),
          transform: `rotateX(72deg) rotateZ(${(rotZ * 1.5).toFixed(1)}deg)`,
        }}
      />
    </div>
  );
};
