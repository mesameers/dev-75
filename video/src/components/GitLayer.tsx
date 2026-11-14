import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

interface GitLayerProps {
  mode?: 'ambient' | 'merge';
}

export const GitLayer: React.FC<GitLayerProps> = ({ mode = 'ambient' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (mode === 'merge') {
    // Gravitational Pull & Merge Animation for Scene 6
    const pullProgress = interpolate(frame, [0, 60], [0, 1], {
      extrapolateRight: 'clamp',
    });
    const mergeSpring = spring({
      frame: Math.max(0, frame - 55),
      fps,
      config: { damping: 12, stiffness: 120 },
    });

    const mergeFlash = interpolate(frame, [58, 66, 85], [0, 0.9, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Converging Light Trail 1 (feature/school-mgmt) */}
        <div
          className="absolute h-0.5 rounded-full"
          style={{
            width: `${100 - pullProgress * 50}%`,
            background: 'linear-gradient(90deg, transparent, #00F2FE 80%, white)',
            transform: `rotate(${interpolate(pullProgress, [0, 1], [-25, 0])}deg) translateX(${interpolate(pullProgress, [0, 1], [-200, 0])}px)`,
            opacity: 1 - pullProgress * 0.4,
            filter: 'drop-shadow(0 0 8px #00F2FE)',
          }}
        />

        {/* Converging Light Trail 2 (feature/motion-r3f) */}
        <div
          className="absolute h-0.5 rounded-full"
          style={{
            width: `${100 - pullProgress * 50}%`,
            background: 'linear-gradient(90deg, transparent, #8B5CF6 80%, white)',
            transform: `rotate(${interpolate(pullProgress, [0, 1], [30, 0])}deg) translateX(${interpolate(pullProgress, [0, 1], [200, 0])}px)`,
            opacity: 1 - pullProgress * 0.4,
            filter: 'drop-shadow(0 0 8px #8B5CF6)',
          }}
        />

        {/* Converging Commit Nodes */}
        {[-300, -150, 150, 300].map((dist, idx) => {
          const currentX = interpolate(pullProgress, [0, 1], [dist, 0]);
          return (
            <div
              key={idx}
              className="absolute w-4 h-4 rounded-full bg-energy-cyan border-2 border-white shadow-[0_0_15px_#00FFE0]"
              style={{
                transform: `translateX(${currentX}px)`,
                opacity: 1 - pullProgress * 0.7,
              }}
            />
          );
        })}

        {/* Central Merge Event Flash */}
        <div
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: `${mergeFlash * 700}px`,
            height: `${mergeFlash * 700}px`,
            opacity: mergeFlash,
            filter: 'blur(30px)',
            boxShadow: '0 0 100px #00F2FE, 0 0 150px #8B5CF6',
          }}
        />

        {/* Merged Master Node Ring */}
        <div
          className="absolute rounded-full border-2 border-energy-cyan shadow-[0_0_30px_#00FFE0]"
          style={{
            width: `${interpolate(mergeSpring, [0, 1], [0, 120])}px`,
            height: `${interpolate(mergeSpring, [0, 1], [0, 120])}px`,
            opacity: interpolate(mergeSpring, [0, 1], [0, 1]),
          }}
        />
      </div>
    );
  }

  // Ambient Mode: Floating commit pills and telemetry coordinates
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Top Left Monospace Technical HUD */}
      <div className="absolute top-10 left-12 flex items-center space-x-3 font-mono text-[13px] tracking-wider text-slate-400/80 bg-space-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/80">
        <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
        <span className="text-energy-teal">git:</span>
        <span className="text-slate-300">branch:main</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">commit #7f9a1c</span>
        <span className="text-slate-600">|</span>
        <span className="text-violet-400/90">orbit:300km</span>
      </div>

      {/* Top Right Coordinate HUD */}
      <div className="absolute top-10 right-12 font-mono text-[12px] tracking-widest text-slate-500/80">
        [SYS_LAT: 33.7294Â° N // LON: 73.0931Â° E]
      </div>
    </div>
  );
};
