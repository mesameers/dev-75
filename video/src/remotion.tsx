import React, { createContext, useContext } from 'react';

export interface VideoConfig {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
}

export interface VideoContextValue {
  currentFrame: number;
  config: VideoConfig;
}

export const VideoContext = createContext<VideoContextValue>({
  currentFrame: 0,
  config: {
    fps: 30,
    width: 1920,
    height: 1080,
    durationInFrames: 1800,
  },
});

export function useCurrentFrame(): number {
  const ctx = useContext(VideoContext);
  return ctx.currentFrame;
}

export function useVideoConfig(): VideoConfig {
  const ctx = useContext(VideoContext);
  return ctx.config;
}

export interface InterpolateOptions {
  extrapolateLeft?: 'clamp' | 'extend';
  extrapolateRight?: 'clamp' | 'extend';
  easing?: (t: number) => number;
}

export function interpolate(
  input: number,
  inputRange: [number, number, ...number[]],
  outputRange: [number, number, ...number[]],
  options: InterpolateOptions = {}
): number {
  const { extrapolateLeft = 'extend', extrapolateRight = 'extend', easing } = options;

  if (inputRange.length !== outputRange.length || inputRange.length < 2) {
    throw new Error('inputRange and outputRange must have at least 2 points and the same length');
  }

  // Handle extrapolation left
  if (input <= inputRange[0]) {
    if (extrapolateLeft === 'clamp') return outputRange[0];
  }

  // Handle extrapolation right
  const lastIdx = inputRange.length - 1;
  if (input >= inputRange[lastIdx]) {
    if (extrapolateRight === 'clamp') return outputRange[lastIdx];
  }

  // Find segment
  let seg = 0;
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (input >= inputRange[i] && input <= inputRange[i + 1]) {
      seg = i;
      break;
    }
  }

  const inMin = inputRange[seg];
  const inMax = inputRange[seg + 1];
  const outMin = outputRange[seg];
  const outMax = outputRange[seg + 1];

  let progress = inMax === inMin ? 0 : (input - inMin) / (inMax - inMin);
  if (easing) progress = easing(progress);

  return outMin + progress * (outMax - outMin);
}

export interface SpringConfig {
  damping?: number;
  stiffness?: number;
  mass?: number;
  overshootClamping?: boolean;
}

export interface SpringOptions {
  frame: number;
  fps: number;
  config?: SpringConfig;
  from?: number;
  to?: number;
}

/**
 * Analytical Damped Harmonic Oscillator (remotion spring matching algorithm)
 */
export function spring(options: SpringOptions): number {
  const { frame, fps, config = {}, from = 0, to = 1 } = options;
  if (frame <= 0) return from;

  const m = config.mass ?? 1;
  const k = config.stiffness ?? 100;
  const c = config.damping ?? 10;
  const t = frame / fps;

  const omega0 = Math.sqrt(k / m);
  const zeta = c / (2 * Math.sqrt(m * k));

  let x = 0;
  if (zeta < 1) {
    // Underdamped
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const envelope = Math.exp(-zeta * omega0 * t);
    x = 1 - envelope * (Math.cos(omegaD * t) + (zeta * omega0 / omegaD) * Math.sin(omegaD * t));
  } else if (Math.abs(zeta - 1) < 0.001) {
    // Critically damped
    x = 1 - Math.exp(-omega0 * t) * (1 + omega0 * t);
  } else {
    // Overdamped
    const s1 = -omega0 * (zeta - Math.sqrt(zeta * zeta - 1));
    const s2 = -omega0 * (zeta + Math.sqrt(zeta * zeta - 1));
    x = 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
  }

  if (config.overshootClamping && x > 1) {
    x = 1;
  }

  return from + x * (to - from);
}

export interface SequenceProps {
  from: number;
  durationInFrames: number;
  children: React.ReactNode;
}

export const Sequence: React.FC<SequenceProps> = ({ from, durationInFrames, children }) => {
  const parent = useContext(VideoContext);
  const localFrame = parent.currentFrame - from;

  if (localFrame < 0 || localFrame >= durationInFrames) {
    return null;
  }

  const childValue: VideoContextValue = {
    ...parent,
    currentFrame: localFrame,
  };

  return (
    <VideoContext.Provider value={childValue}>
      {children}
    </VideoContext.Provider>
  );
};

export interface CompositionProps {
  id: string;
  component: React.ComponentType<any>;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
}

export const Composition: React.FC<CompositionProps> = () => null;

export function registerRoot(_root: React.ComponentType<any>) {
  // Remotion registration hook
}
