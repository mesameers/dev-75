import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { hashString, createRNG } from '../utils/seededRandom';

interface LevitateProps {
  children: React.ReactNode;
  seed?: string | number;
  amplitude?: number; // default 6 - 10px
  periodFrames?: number; // default 120 - 180 frames (4 - 6s @ 30fps)
  rollAmplitude?: number; // default ~1 deg
  showShadow?: boolean;
  shadowWidth?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const Levitate: React.FC<LevitateProps> = ({
  children,
  seed = 'levitate-default',
  amplitude = 8,
  periodFrames = 150, // 5s at 30fps
  rollAmplitude = 1.0,
  showShadow = true,
  shadowWidth = '80%',
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Deterministic seed params
  const { phaseY, phaseRoll, effectiveAmplitude, effectivePeriod } = useMemo(() => {
    const s = typeof seed === 'number' ? seed : hashString(seed);
    const rng = createRNG(s);
    return {
      phaseY: rng() * Math.PI * 2,
      phaseRoll: rng() * Math.PI * 2,
      effectiveAmplitude: amplitude * (0.85 + rng() * 0.3),
      effectivePeriod: periodFrames * (0.9 + rng() * 0.2),
    };
  }, [seed, amplitude, periodFrames]);

  // Sinusoidal drift: y is negative when floating higher
  const time = (frame / fps) * ((2 * Math.PI) / (effectivePeriod / fps));
  const translateY = Math.sin(time + phaseY) * effectiveAmplitude;
  const roll = Math.cos(time + phaseRoll) * rollAmplitude;

  // Contact shadow:
  // When card rises (translateY is negative, high altitude):
  // shadow softens (blur increases) and shrinks (scale decreases), opacity drops
  const normalizedElevation = (-translateY + effectiveAmplitude) / (2 * effectiveAmplitude); // 0 (lowest) to 1 (highest)
  const shadowScale = 1.0 - normalizedElevation * 0.22; // shrinks by up to 22%
  const shadowBlur = 8 + normalizedElevation * 16; // 8px -> 24px
  const shadowOpacity = 0.5 - normalizedElevation * 0.25; // 0.5 -> 0.25

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{
        transform: `translateY(${translateY.toFixed(2)}px) rotate(${roll.toFixed(2)}deg)`,
        willChange: 'transform',
        ...style,
      }}
    >
      {children}

      {showShadow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -bottom-4 -translate-x-1/2 rounded-full"
          style={{
            width: shadowWidth,
            height: '14px',
            backgroundColor: 'rgba(0, 242, 254, 0.25)',
            boxShadow: `0 0 ${shadowBlur}px rgba(0, 0, 0, 0.8), 0 0 ${shadowBlur * 1.5}px rgba(0, 242, 254, ${shadowOpacity * 0.5})`,
            filter: `blur(${shadowBlur * 0.5}px)`,
            opacity: shadowOpacity,
            transform: `scale(${shadowScale.toFixed(3)})`,
            zIndex: -1,
            transition: 'none',
          }}
        />
      )}
    </div>
  );
};
