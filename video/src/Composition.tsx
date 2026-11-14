import React from 'react';
import { Sequence, useCurrentFrame } from 'remotion';
import { CosmicBackground } from './components/CosmicBackground';
import { GitLayer } from './components/GitLayer';
import { HeroScene } from './scenes/HeroScene';
import { PhilosophyScene } from './scenes/PhilosophyScene';
import { SkillsScene } from './scenes/SkillsScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { ServicesScene } from './scenes/ServicesScene';
import { FinaleScene } from './scenes/FinaleScene';

export const SCENE_DURATIONS = {
  hero: 270, // 0 - 270 (9s)
  philosophy: 300, // 270 - 570 (10s)
  skills: 300, // 570 - 870 (10s)
  projects: 330, // 870 - 1200 (11s)
  services: 300, // 1200 - 1500 (10s)
  finale: 300, // 1500 - 1800 (10s)
};

export const BuiltInOrbitComposition: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div className="relative w-[1920px] h-[1080px] bg-space-950 overflow-hidden font-sans text-white select-none">
      {/* 1. Universal Cosmic Particle Horizon */}
      <CosmicBackground particleCount={50} cameraSpeed={1.0} />

      {/* 2. Git Storytelling Ambient HUD */}
      <GitLayer mode="ambient" />

      {/* 3. Deterministic Sequential Scenes */}
      <Sequence from={0} durationInFrames={SCENE_DURATIONS.hero}>
        <HeroScene durationFrames={SCENE_DURATIONS.hero} />
      </Sequence>

      <Sequence from={SCENE_DURATIONS.hero} durationInFrames={SCENE_DURATIONS.philosophy}>
        <PhilosophyScene durationFrames={SCENE_DURATIONS.philosophy} />
      </Sequence>

      <Sequence
        from={SCENE_DURATIONS.hero + SCENE_DURATIONS.philosophy}
        durationInFrames={SCENE_DURATIONS.skills}
      >
        <SkillsScene durationFrames={SCENE_DURATIONS.skills} />
      </Sequence>

      <Sequence
        from={SCENE_DURATIONS.hero + SCENE_DURATIONS.philosophy + SCENE_DURATIONS.skills}
        durationInFrames={SCENE_DURATIONS.projects}
      >
        <ProjectsScene durationFrames={SCENE_DURATIONS.projects} />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.hero +
          SCENE_DURATIONS.philosophy +
          SCENE_DURATIONS.skills +
          SCENE_DURATIONS.projects
        }
        durationInFrames={SCENE_DURATIONS.services}
      >
        <ServicesScene durationFrames={SCENE_DURATIONS.services} />
      </Sequence>

      <Sequence
        from={
          SCENE_DURATIONS.hero +
          SCENE_DURATIONS.philosophy +
          SCENE_DURATIONS.skills +
          SCENE_DURATIONS.projects +
          SCENE_DURATIONS.services
        }
        durationInFrames={SCENE_DURATIONS.finale}
      >
        <FinaleScene durationFrames={SCENE_DURATIONS.finale} />
      </Sequence>

      {/* 4. Film Grain / Subtle Vignette for Cinema Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] z-40"
      />
    </div>
  );
};
