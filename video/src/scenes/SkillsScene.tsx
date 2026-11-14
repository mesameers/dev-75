import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Levitate } from '../components/Levitate';
import { LiftOffTransition } from '../components/LiftOffTransition';

interface SceneProps {
  durationFrames: number;
}

const SKILL_GROUPS = [
  {
    title: 'Frontend & Creative UI',
    accentColor: '#00F2FE',
    items: ['React 18 / Next.js', 'Vite & Tailwind CSS', 'Remotion & Frame Motion', 'Interactive 3D / R3F'],
    tag: 'CLIENT_LAYER',
  },
  {
    title: 'Backend & Cloud Systems',
    accentColor: '#8B5CF6',
    items: ['Node.js & Express API', 'Supabase & PostgreSQL', 'Docker Containers', 'REST / RBAC Security'],
    tag: 'CORE_ENGINE',
  },
  {
    title: 'Architecture & DevOps',
    accentColor: '#38BDF8',
    items: ['Multi-Tenant Tenancy', 'Deterministic Rendering', 'Git Workflows & LFS', 'Edge Vercel Deploy'],
    tag: 'INFRASTRUCTURE',
  },
];

export const SkillsScene: React.FC<SceneProps> = ({ durationFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <LiftOffTransition sceneDurationFrames={durationFrames}>
      <div className="w-full h-full flex flex-col justify-center px-24 z-20">
        {/* Monospace Indicator */}
        <div className="overflow-hidden mb-4">
          <span
            className="inline-block font-mono text-xs tracking-widest uppercase text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3 py-1 rounded"
            style={{ opacity: titleSpring }}
          >
            // 02 CAPABILITY MATRIX
          </span>
        </div>

        {/* Big Headline (>= 96px) */}
        <div className="overflow-hidden pb-4">
          <h2
            className="text-[92px] font-black tracking-[-0.035em] leading-[0.95] text-white"
            style={{
              transform: `translateY(${interpolate(titleSpring, [0, 1], [90, 0])}px)`,
            }}
          >
            The Stack in Orbit.
          </h2>
        </div>

        {/* Supporting Line (>= 36px) */}
        <p
          className="text-[36px] font-normal text-slate-400 max-w-4xl leading-snug mb-12"
          style={{ opacity: titleSpring }}
        >
          Specialized in modern full-stack engineering and high-fidelity motion graphics.
        </p>

        {/* 3 Levitating Tech Stack Cards (Max 3 on screen as per guideline) */}
        <div className="grid grid-cols-3 gap-8">
          {SKILL_GROUPS.map((group, idx) => {
            const cardSpring = spring({
              frame: Math.max(0, frame - (15 + idx * 8)),
              fps,
              config: { damping: 13, stiffness: 110 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${interpolate(cardSpring, [0, 1], [60, 0])}px)`,
                  opacity: cardSpring,
                }}
              >
                <Levitate
                  seed={`skill-card-${idx}`}
                  amplitude={8 + idx * 1.5}
                  periodFrames={135 + idx * 25}
                  rollAmplitude={1.0}
                  className="w-full"
                >
                  <div
                    className="p-8 rounded-2xl bg-space-900/90 border backdrop-blur-xl relative overflow-hidden"
                    style={{
                      borderColor: `${group.accentColor}40`,
                      boxShadow: `0 20px 40px rgba(0,0,0,0.6), 0 0 30px ${group.accentColor}15`,
                    }}
                  >
                    {/* Top Tag */}
                    <div className="flex items-center justify-between font-mono text-xs mb-6">
                      <span className="text-slate-500">{`0${idx + 1}`}</span>
                      <span
                        className="px-2.5 py-0.5 rounded text-[11px] font-semibold"
                        style={{
                          backgroundColor: `${group.accentColor}15`,
                          color: group.accentColor,
                          border: `1px solid ${group.accentColor}30`,
                        }}
                      >
                        {group.tag}
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 className="text-2xl font-bold text-white mb-6">
                      {group.title}
                    </h3>

                    {/* Items List */}
                    <ul className="space-y-3 font-mono text-sm text-slate-300">
                      {group.items.map((item, i) => (
                        <li key={i} className="flex items-center space-x-2.5">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: group.accentColor }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Levitate>
              </div>
            );
          })}
        </div>
      </div>
    </LiftOffTransition>
  );
};
