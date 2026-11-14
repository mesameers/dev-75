import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface LiftOffTransitionProps {
  children: React.ReactNode;
  sceneDurationFrames: number;
  entranceDurationFrames?: number;
  exitDurationFrames?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const LiftOffTransition: React.FC<LiftOffTransitionProps> = ({
  children,
  sceneDurationFrames,
  entranceDurationFrames = 25, // ~0.8s @ 30fps
  exitDurationFrames = 22, // ~0.7s @ 30fps
  className = '',
  style = {},
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Incoming: Arrives from depth with a tiny spring overshoot
  const entranceSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
      mass: 0.8,
    },
  });

  const entranceOpacity = interpolate(frame, [0, entranceDurationFrames * 0.6], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const entranceScale = interpolate(entranceSpring, [0, 1], [0.86, 1]);
  const entranceZTranslate = interpolate(entranceSpring, [0, 1], [60, 0]);

  // 2. Outgoing: "Lift-Off" - elements accelerate upward and blur away
  const exitStartFrame = sceneDurationFrames - exitDurationFrames;
  const isExiting = frame >= exitStartFrame;
  const exitProgress = isExiting
    ? interpolate(frame, [exitStartFrame, sceneDurationFrames], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  // Cubic acceleration upward
  const exitTranslateY = -Math.pow(exitProgress, 2.2) * 140;
  const exitBlur = exitProgress * 12;
  const exitOpacity = 1 - Math.pow(exitProgress, 1.8);

  const finalScale = isExiting ? 1 + exitProgress * 0.08 : entranceScale;
  const finalOpacity = isExiting ? exitOpacity : entranceOpacity;
  const finalTranslateY = isExiting ? exitTranslateY : entranceZTranslate;

  return (
    <div
      className={`w-full h-full ${className}`}
      style={{
        transform: `translateY(${finalTranslateY.toFixed(1)}px) scale(${finalScale.toFixed(3)})`,
        opacity: Math.max(0, Math.min(1, finalOpacity)),
        filter: exitBlur > 0.5 ? `blur(${exitBlur.toFixed(1)}px)` : 'none',
        willChange: 'transform, opacity, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
