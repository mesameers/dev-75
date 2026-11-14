import React from 'react';
import { Composition } from 'remotion';
import { BuiltInOrbitComposition } from './Composition';
import { WebLoopComposition } from './WebLoopComposition';
import { VerticalComposition } from './VerticalComposition';
import '../tailwind.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 1. Main Master Presentation (60s, 1920x1080, 30fps) */}
      <Composition
        id="BuiltInOrbit"
        component={BuiltInOrbitComposition}
        durationInFrames={1800}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* 2. Web Hero Loop (6s, 1280x720, 30fps) */}
      <Composition
        id="WebLoop"
        component={WebLoopComposition}
        durationInFrames={180}
        fps={30}
        width={1280}
        height={720}
      />

      {/* 3. Vertical Social Cut (15s, 1080x1920, 30fps) */}
      <Composition
        id="VerticalSocial"
        component={VerticalComposition}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
