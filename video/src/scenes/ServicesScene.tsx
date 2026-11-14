import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { Levitate } from '../components/Levitate';
import { LiftOffTransition } from '../components/LiftOffTransition';

interface SceneProps {
  durationFrames: number;
}

const SERVICES = [
  {
    title: 'Full-Stack Web Systems',
    desc: 'Production-ready web applications, responsive multi-role dashboards, and clean REST APIs.',
    badge: 'ENTERPRISE APPS',
    border: 'border-energy-teal/40',
    color: '#00F2FE',
  },
  {
    title: 'Cloud & Database Architecture',
    desc: 'Relational data modeling, Supabase PostgreSQL clustering, RBAC security, and Docker deployments.',
    badge: 'CLOUD INFRA',
    border: 'border-secondary-violet/40',
    color: '#8B5CF6',
  },
  {
    title: 'Creative Code & Motion',
    desc: 'Deterministic Remotion video rendering, weightless anti-gravity UI components, and 3D experiences.',
    badge: 'MOTION DESIGN',
    border: 'border-cyan-400/40',
    color: '#38BDF8',
  },
];

export const ServicesScene: React.FC<SceneProps> = ({ durationFrames }) => {
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
            className="inline-block font-mono text-xs tracking-widest uppercase text-violet-400 bg-secondary-violet/10 border border-secondary-violet/30 px-3 py-1 rounded"
            style={{ opacity: titleSpring }}
          >
            // 04 CORE CAPABILITIES
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
            Engineering Disciplines.
          </h2>
        </div>

        {/* Supporting Line (>= 36px) */}
        <p
          className="text-[36px] font-normal text-slate-400 max-w-4xl leading-snug mb-12"
          style={{ opacity: titleSpring }}
        >
          Building reliable web infrastructure and high-fidelity motion from the ground up.
        </p>

        {/* 3 Levitation Cards (Max 3 on screen) */}
        <div className="grid grid-cols-3 gap-8">
          {SERVICES.map((s, idx) => {
            const cardSpring = spring({
              frame: Math.max(0, frame - (14 + idx * 8)),
              fps,
              config: { damping: 13, stiffness: 100 },
            });

            return (
              <div
                key={idx}
                style={{
                  transform: `translateY(${interpolate(cardSpring, [0, 1], [50, 0])}px)`,
                  opacity: cardSpring,
                }}
              >
                <Levitate
                  seed={`service-card-${idx}`}
                  amplitude={7 + idx * 1.5}
                  periodFrames={140 + idx * 20}
                  rollAmplitude={1.0}
                >
                  <div
                    className={`p-8 rounded-2xl bg-space-900/90 border ${s.border} backdrop-blur-xl shadow-[0_20px_45px_rgba(0,0,0,0.7)] h-[280px] flex flex-col justify-between`}
                  >
                    <div>
                      <span
                        className="inline-block font-mono text-[11px] font-bold px-2.5 py-1 rounded mb-4"
                        style={{
                          backgroundColor: `${s.color}15`,
                          color: s.color,
                          border: `1px solid ${s.color}30`,
                        }}
                      >
                        {s.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-white mb-3">{s.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>STATUS</span>
                      <span className="text-emerald-400">READY_FOR_DEPLOY</span>
                    </div>
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
