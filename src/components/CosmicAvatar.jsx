import React, { useEffect, useRef, useState } from 'react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 200, tilt: 65, color: '#00F2FE', speed: '3.6s' },
  { label: 'Supabase', angle: 60, radius: 220, tilt: -45, color: '#10B981', speed: '4.2s' },
  { label: 'PostgreSQL', angle: 120, radius: 190, tilt: 55, color: '#38BDF8', speed: '3.8s' },
  { label: 'Node.js', angle: 180, radius: 215, tilt: -60, color: '#8B5CF6', speed: '4.5s' },
  { label: 'TypeScript', angle: 240, radius: 195, tilt: 40, color: '#00FFE0', speed: '3.9s' },
  { label: 'Remotion', angle: 300, radius: 225, tilt: -50, color: '#EC4899', speed: '4.1s' },
];

export const CosmicAvatar = ({ size = 420, className = "" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [overdrive, setOverdrive] = useState(false);
  const [audioBars, setAudioBars] = useState([8, 14, 22, 16, 9]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);
      setMousePos({ x: Math.max(-1, Math.min(1, dx)), y: Math.max(-1, Math.min(1, dy)) });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Equalizer visualizer rhythm
  useEffect(() => {
    const eqInterval = setInterval(() => {
      setAudioBars([
        Math.floor(6 + Math.random() * 18),
        Math.floor(10 + Math.random() * 20),
        Math.floor(14 + Math.random() * 22),
        Math.floor(8 + Math.random() * 19),
        Math.floor(5 + Math.random() * 16),
      ]);
    }, 180);
    return () => clearInterval(eqInterval);
  }, []);

  const triggerOverdrive = () => {
    setOverdrive(true);
    setTimeout(() => setOverdrive(false), 2400);
  };

  const tiltX = mousePos.y * -16;
  const tiltY = mousePos.x * 20;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerOverdrive}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1200px',
      }}
      title="Click to trigger Quantum Overdrive State!"
    >
      {/* 1. Deep Core Gravitational Quantum Nebula */}
      <div
        className={`absolute rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
          overdrive
            ? 'scale-135 opacity-95'
            : isHovered
            ? 'scale-115 opacity-80'
            : 'opacity-60'
        }`}
        style={{
          width: size * 0.85,
          height: size * 0.85,
          background: overdrive
            ? 'radial-gradient(circle, #00FFE0 0%, #FF007A 40%, #7928CA 70%, transparent 85%)'
            : 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
          animation: 'pulseSlow 3.5s infinite ease-in-out',
        }}
      />

      {/* 2. Interactive Shockwave Ring on Click */}
      {overdrive && (
        <div
          className="absolute rounded-full border-2 border-energy-cyan pointer-events-none animate-shockwave"
          style={{ width: size * 0.7, height: size * 0.7 }}
        />
      )}

      {/* 3. Outer 3D Gyroscopic Gimbal Rings */}
      {/* Ring 1 - Neon Cyan Equatorial Horizon with Orbital Satellite */}
      <div
        className="absolute rounded-full border-2 border-energy-teal/50 pointer-events-none"
        style={{
          width: size * 1.18,
          height: size * 1.18,
          transform: `rotateX(68deg) rotateY(${tiltY * 0.4}deg) rotateZ(0deg)`,
          animation: 'spinClockwise 14s linear infinite',
          boxShadow: '0 0 30px rgba(0, 242, 254, 0.3), inset 0 0 25px rgba(0, 242, 254, 0.25)',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-energy-cyan shadow-[0_0_20px_#00FFE0] animate-ping" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#00F2FE]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full bg-energy-teal shadow-[0_0_12px_#00F2FE]" />
      </div>

      {/* Ring 2 - Electric Violet Orbital Ring */}
      <div
        className="absolute rounded-full border border-secondary-violet/60 pointer-events-none"
        style={{
          width: size * 1.28,
          height: size * 1.28,
          transform: `rotateX(-52deg) rotateY(38deg)`,
          animation: 'spinCounterClockwise 20s linear infinite',
          boxShadow: '0 0 35px rgba(139, 92, 246, 0.35)',
        }}
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary-violet shadow-[0_0_20px_#8B5CF6]" />
        <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_15px_#EC4899]" />
      </div>

      {/* Ring 3 - Dashed Particle Ring */}
      <div
        className="absolute rounded-full border-2 border-dashed border-cyan-400/40 pointer-events-none"
        style={{
          width: size * 1.02,
          height: size * 1.02,
          transform: 'rotateX(82deg)',
          animation: 'spinClockwise 9s linear infinite',
        }}
      />

      {/* 4. Orbiting 3D Glass Tech Satellites */}
      {ORBITING_TECH.map((tech, i) => {
        const rad = (tech.angle * Math.PI) / 180;
        const xOffset = Math.cos(rad) * (tech.radius * (size / 420));
        const yOffset = Math.sin(rad) * (tech.radius * (size / 420) * 0.44);

        return (
          <div
            key={i}
            className="absolute z-20 pointer-events-none sm:pointer-events-auto transition-transform hover:scale-130"
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`,
              animation: `orbitFloat 3.8s ease-in-out infinite ${i * 0.6}s`,
            }}
          >
            <div
              className="px-3 py-1.5 rounded-full font-mono text-[10px] font-black tracking-wider bg-space-950/95 border backdrop-blur-xl shadow-xl flex items-center space-x-1.5 transition-all"
              style={{
                borderColor: `${tech.color}70`,
                color: tech.color,
                boxShadow: `0 0 20px ${tech.color}40`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>{tech.label}</span>
            </div>
          </div>
        );
      })}

      {/* 5. The 3D High-Tech Cybernetic Hologram Vessel */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(35px)`,
          animation: 'avatarLevitate 4.5s ease-in-out infinite',
        }}
      >
        {/* SVG High-Fidelity Cyber Astronaut / Cybernetic Dev Master */}
        <svg
          width={size * 0.76}
          height={size * 0.76}
          viewBox="0 0 220 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="helmetGrad2" cx="50%" cy="38%" r="62%">
              <stop offset="0%" stopColor="#2A374A" />
              <stop offset="65%" stopColor="#101827" />
              <stop offset="100%" stopColor="#04060A" />
            </radialGradient>

            <linearGradient id="visorNormal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="45%" stopColor="#00FFE0" />
              <stop offset="100%" stopColor="#7928CA" />
            </linearGradient>

            <linearGradient id="visorOverdrive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF007A" />
              <stop offset="50%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#00F2FE" />
            </linearGradient>

            <linearGradient id="armorPlates" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#253043" />
              <stop offset="45%" stopColor="#131B2B" />
              <stop offset="100%" stopColor="#080C14" />
            </linearGradient>

            <linearGradient id="goldAccents" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFE0" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            <pattern id="hexPattern" width="10" height="17.32" patternUnits="userSpaceOnUse">
              <path
                d="M5 0 L10 2.89 L10 8.66 L5 11.55 L0 8.66 L0 2.89 Z M0 17.32 L5 14.43 L10 17.32"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="0.7"
                fill="none"
              />
            </pattern>

            <filter id="hyperGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Halo Cybernetic Compass Disk behind head */}
          <circle
            cx="110"
            cy="100"
            r="72"
            stroke="url(#goldAccents)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            opacity="0.5"
            className="animate-spin-slow"
          />

          {/* Shoulder Armor Plates with Reinforced Nanoweave */}
          <path
            d="M50 162 C50 138 80 132 110 132 C140 132 170 138 170 162 L180 196 C180 205 160 212 110 212 C60 212 40 205 40 196 Z"
            fill="url(#armorPlates)"
            stroke="#334155"
            strokeWidth="2.5"
          />

          {/* Pauldron Heavy Armor Wings */}
          <path d="M38 170 L24 188 L46 195 Z" fill="#131B2B" stroke="#00F2FE" strokeWidth="1.5" />
          <path d="M182 170 L196 188 L174 195 Z" fill="#131B2B" stroke="#8B5CF6" strokeWidth="1.5" />

          {/* Cyber Neck Ring with Glowing Nodes */}
          <ellipse cx="110" cy="138" rx="40" ry="12" fill="#060911" stroke="#00FFE0" strokeWidth="2" />

          {/* Chest Arc Reactor (Rotating Energy Turbine) */}
          <circle cx="110" cy="172" r="15" fill="#04060A" stroke="#00FFE0" strokeWidth="2" />
          <circle
            cx="110"
            cy="172"
            r="8"
            fill={overdrive ? "#FF007A" : "#00FFE0"}
            filter="url(#hyperGlow)"
          >
            <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
          </circle>

          {/* Chest Energy Discharge Lines */}
          <line x1="84" y1="162" x2="72" y2="188" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="136" y1="162" x2="148" y2="188" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />

          {/* Main Helmet Dome Shell */}
          <ellipse cx="110" cy="94" rx="52" ry="56" fill="url(#helmetGrad2)" stroke="#475569" strokeWidth="3" />

          {/* Cyber Ear Cups / Audio Equalizer Stations */}
          {/* Left Ear Cup */}
          <rect x="52" y="78" width="10" height="34" rx="4" fill="#090E17" stroke="#00F2FE" strokeWidth="1.5" />
          {/* Right Ear Cup */}
          <rect x="158" y="78" width="10" height="34" rx="4" fill="#090E17" stroke="#8B5CF6" strokeWidth="1.5" />

          {/* Left Audio Equalizer Mini-Bars */}
          {audioBars.map((h, idx) => (
            <rect
              key={`left-eq-${idx}`}
              x={55}
              y={95 - h / 2}
              width="4"
              height={h * 0.7}
              rx="1"
              fill="#00FFE0"
            />
          ))}

          {/* Cyber Visor Shield with Metallic Curve */}
          <path
            d="M68 80 C68 68 86 58 110 58 C134 58 152 68 152 80 C152 108 140 124 110 124 C80 124 68 108 68 80 Z"
            fill={overdrive ? "url(#visorOverdrive)" : "url(#visorNormal)"}
            filter="url(#hyperGlow)"
            opacity="0.96"
          />

          {/* Hexagonal HUD Texture Overlay on Visor */}
          <path
            d="M68 80 C68 68 86 58 110 58 C134 58 152 68 152 80 C152 108 140 124 110 124 C80 124 68 108 68 80 Z"
            fill="url(#hexPattern)"
            opacity="0.75"
          />

          {/* Animated Scanning Laser Sweep Line */}
          <line
            x1="74"
            y1="82"
            x2="146"
            y2="82"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            opacity="0.9"
            filter="url(#hyperGlow)"
          >
            <animate attributeName="y1" values="68;118;68" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="y2" values="68;118;68" dur="2.6s" repeatCount="indefinite" />
          </line>

          {/* Visor Realistic Specular Glint */}
          <path
            d="M78 72 C88 65 106 62 118 62 C108 76 96 98 88 112 C82 108 78 98 78 72 Z"
            fill="white"
            opacity="0.32"
          />

          {/* Targeting Crosshair on Visor */}
          <circle cx={110 + mousePos.x * 12} cy={88 + mousePos.y * 10} r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <circle cx={110 + mousePos.x * 12} cy={88 + mousePos.y * 10} r="2" fill="#FFFFFF" />

          {/* Holographic Visor Monospace Code Text */}
          <text x="94" y="90" fill="#04060A" fontSize="7.5" fontFamily="monospace" fontWeight="900" letterSpacing="0.9">
            {overdrive ? "OVERDRIVE" : "<DEV-75/>"}
          </text>
          <text x="92" y="102" fill="#04060A" fontSize="6.5" fontFamily="monospace" fontWeight="800" letterSpacing="0.6">
            {overdrive ? "100% ONLINE" : "ORBIT:LIVE"}
          </text>

          {/* Dual Communication Antenna Beacons */}
          <line x1="94" y1="46" x2="84" y2="28" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="83" cy="26" r="4" fill="#00FFE0" filter="url(#hyperGlow)">
            <animate attributeName="r" values="3.5;5;3.5" dur="1.2s" repeatCount="indefinite" />
          </circle>

          <line x1="126" y1="46" x2="136" y2="28" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="137" cy="26" r="4" fill="#A855F7" filter="url(#hyperGlow)">
            <animate attributeName="r" values="3.5;5;3.5" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Dynamic Softening Contact Shadow */}
        <div
          className="w-48 h-6 rounded-full pointer-events-none mt-2"
          style={{
            background: overdrive
              ? 'radial-gradient(ellipse at center, rgba(255, 0, 122, 0.6) 0%, rgba(0, 242, 254, 0.3) 40%, transparent 75%)'
              : 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.5) 0%, rgba(121, 40, 202, 0.25) 40%, transparent 75%)',
            filter: 'blur(9px)',
            animation: 'shadowPulse 4.5s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes avatarLevitate {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(-1.5deg);
          }
        }
        @keyframes shadowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.65;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
        @keyframes orbitFloat {
          0%, 100% {
            transform: translate(var(--tx, 0), var(--ty, 0)) translateY(0px);
          }
          50% {
            transform: translate(var(--tx, 0), var(--ty, 0)) translateY(-10px);
          }
        }
        @keyframes spinClockwise {
          from { transform: rotateX(68deg) rotateZ(0deg); }
          to { transform: rotateX(68deg) rotateZ(360deg); }
        }
        @keyframes spinCounterClockwise {
          from { transform: rotateX(-52deg) rotateY(38deg) rotateZ(360deg); }
          to { transform: rotateX(-52deg) rotateY(38deg) rotateZ(0deg); }
        }
        @keyframes shockwaveExpand {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        .animate-shockwave {
          animation: shockwaveExpand 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
