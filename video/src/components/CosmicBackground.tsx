import React, { useMemo } from 'react';
import { useCurrentFrame } from 'remotion';
import { createRNG } from '../utils/seededRandom';

interface CosmicBackgroundProps {
  particleCount?: number;
  cameraSpeed?: number;
}

export const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  particleCount = 45,
  cameraSpeed = 1,
}) => {
  const frame = useCurrentFrame();

  // Generate deterministic particles
  const particles = useMemo(() => {
    const rng = createRNG(777);
    const list = [];
    for (let i = 0; i < particleCount; i++) {
      list.push({
        id: i,
        x: rng() * 100, // 0 - 100%
        baseY: rng() * 100, // 0 - 100%
        speed: 0.04 + rng() * 0.08, // upward drift
        size: 1.5 + rng() * 2.5,
        opacity: 0.2 + rng() * 0.6,
        color: rng() > 0.4 ? '#00F2FE' : '#8B5CF6',
        depthLayer: 1 + rng() * 2, // for parallax
      });
    }
    return list;
  }, [particleCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#05070B]">
      {/* Cosmic Nebula Gradients */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[160px] opacity-25"
        style={{
          top: '-15%',
          left: '10%',
          background: 'radial-gradient(circle, #00F2FE 0%, rgba(0, 242, 254, 0) 70%)',
          transform: `translate(${Math.sin(frame * 0.01) * 20}px, ${Math.cos(frame * 0.008) * 15}px)`,
        }}
      />

      <div
        className="absolute w-[900px] h-[900px] rounded-full blur-[180px] opacity-20"
        style={{
          bottom: '-20%',
          right: '5%',
          background: 'radial-gradient(circle, #7928CA 0%, rgba(121, 40, 202, 0) 70%)',
          transform: `translate(${Math.cos(frame * 0.012) * 25}px, ${Math.sin(frame * 0.01) * 20}px)`,
        }}
      />

      {/* Grid Mesh Subtle Horizon */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #00F2FE 1px, transparent 1px), linear-gradient(to bottom, #8B5CF6 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 85%)',
        }}
      />

      {/* Upward Drifting Cosmic Particles with Parallax */}
      {particles.map((p) => {
        // Subtle upward drift wrapping around screen
        const yPos = (100 + p.baseY - (frame * p.speed * cameraSpeed * p.depthLayer) * 0.3) % 100;
        const xOffset = Math.sin((frame * 0.02) + p.id) * (2 * p.depthLayer);

        return (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${(p.x + xOffset).toFixed(2)}%`,
              top: `${yPos.toFixed(2)}%`,
              width: `${p.size.toFixed(1)}px`,
              height: `${p.size.toFixed(1)}px`,
              backgroundColor: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              opacity: p.opacity,
              willChange: 'transform',
            }}
          />
        );
      })}
    </div>
  );
};
