import React, { useEffect, useRef, useState } from 'react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 200, tilt: 65, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 220, tilt: -45, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 190, tilt: 55, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 215, tilt: -60, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 195, tilt: 40, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 225, tilt: -50, color: '#EC4899' },
];

const MODES = [
  { id: 'defense', label: 'SHIELD', color: '#00F2FE', visor: 'url(#visorNormal)', tag: 'TACTICAL' },
  { id: 'overdrive', label: 'OVERDRIVE', color: '#FF007A', visor: 'url(#visorOverdrive)', tag: 'HYPERDRIVE' },
  { id: 'quantum', label: 'QUANTUM', color: '#8B5CF6', visor: 'url(#visorQuantum)', tag: 'STEALTH' },
];

export const CosmicAvatar = ({ size = 420, className = "" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [pulseRing, setPulseRing] = useState(false);
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

  const switchMode = (mode) => {
    setActiveMode(mode);
    setPulseRing(true);
    setTimeout(() => setPulseRing(false), 1200);
  };

  const tiltX = mousePos.y * -16;
  const tiltY = mousePos.x * 20;

  return (
    <div className="flex flex-col items-center">
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => switchMode(activeMode.id === 'defense' ? MODES[1] : activeMode.id === 'overdrive' ? MODES[2] : MODES[0])}
        className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
        style={{
          width: size,
          height: size,
          perspective: '1200px',
        }}
        title="Click to cycle Cybernetic Combat Modes!"
      >
        {/* 1. Deep Core Gravitational Quantum Nebula */}
        <div
          className={`absolute rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
            pulseRing
              ? 'scale-140 opacity-95'
              : isHovered
              ? 'scale-120 opacity-85'
              : 'opacity-65'
          }`}
          style={{
            width: size * 0.85,
            height: size * 0.85,
            background:
              activeMode.id === 'overdrive'
                ? 'radial-gradient(circle, #FF007A 0%, #FFD700 40%, #7928CA 70%, transparent 85%)'
                : activeMode.id === 'quantum'
                ? 'radial-gradient(circle, #8B5CF6 0%, #00F2FE 45%, #10B981 75%, transparent 85%)'
                : 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
            animation: 'pulseSlow 3.5s infinite ease-in-out',
          }}
        />

        {/* 2. Interactive Shockwave Ring on Click */}
        {pulseRing && (
          <div
            className="absolute rounded-full border-2 pointer-events-none animate-shockwave"
            style={{
              width: size * 0.7,
              height: size * 0.7,
              borderColor: activeMode.color,
            }}
          />
        )}

        {/* 3. Outer 3D Gyroscopic Gimbal Rings with Satellites */}
        {/* Ring 1 - Neon Horizon */}
        <div
          className="absolute rounded-full border-2 pointer-events-none transition-colors duration-500"
          style={{
            width: size * 1.18,
            height: size * 1.18,
            borderColor: `${activeMode.color}70`,
            transform: `rotateX(68deg) rotateY(${tiltY * 0.4}deg) rotateZ(0deg)`,
            animation: 'spinClockwise 14s linear infinite',
            boxShadow: `0 0 30px ${activeMode.color}40, inset 0 0 25px ${activeMode.color}30`,
          }}
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg animate-ping"
            style={{ backgroundColor: activeMode.color }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white" />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: activeMode.color }}
          />
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
            width={size * 0.78}
            height={size * 0.78}
            viewBox="0 0 220 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          >
            <defs>
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

              <linearGradient id="visorQuantum" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#00FFE0" />
              </linearGradient>

              <linearGradient id="armorPlates" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#253043" />
                <stop offset="45%" stopColor="#131B2B" />
                <stop offset="100%" stopColor="#080C14" />
              </linearGradient>

              <pattern id="hexPattern" width="10" height="17.32" patternUnits="userSpaceOnUse">
                <path
                  d="M5 0 L10 2.89 L10 8.66 L5 11.55 L0 8.66 L0 2.89 Z M0 17.32 L5 14.43 L10 17.32"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="0.75"
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

            {/* Rotating Gear Teeth Behind Helmet */}
            <g className="animate-spin-slow" style={{ transformOrigin: '110px 100px' }}>
              <circle cx="110" cy="100" r="74" stroke={activeMode.color} strokeWidth="1.5" strokeDasharray="6 8" opacity="0.6" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, dIdx) => (
                <rect
                  key={dIdx}
                  x="108"
                  y="23"
                  width="4"
                  height="7"
                  fill={activeMode.color}
                  transform={`rotate(${deg} 110 100)`}
                  opacity="0.75"
                />
              ))}
            </g>

            {/* Shoulder Armor Plates */}
            <path
              d="M50 162 C50 138 80 132 110 132 C140 132 170 138 170 162 L180 196 C180 205 160 212 110 212 C60 212 40 205 40 196 Z"
              fill="url(#armorPlates)"
              stroke="#334155"
              strokeWidth="2.5"
            />

            {/* Dual Hologram Shoulder Thrusters with Plasma Plumes */}
            <g>
              <rect x="22" y="172" width="16" height="12" rx="3" fill="#0A0F1D" stroke={activeMode.color} strokeWidth="1.5" />
              <polygon points="24,184 30,206 36,184" fill={activeMode.color} opacity="0.85" filter="url(#hyperGlow)">
                <animate attributeName="points" values="24,184 30,206 36,184; 24,184 30,214 36,184; 24,184 30,206 36,184" dur="0.8s" repeatCount="indefinite" />
              </polygon>
            </g>
            <g>
              <rect x="182" y="172" width="16" height="12" rx="3" fill="#0A0F1D" stroke={activeMode.color} strokeWidth="1.5" />
              <polygon points="184,184 190,206 196,184" fill={activeMode.color} opacity="0.85" filter="url(#hyperGlow)">
                <animate attributeName="points" values="184,184 190,206 196,184; 184,184 190,214 196,184; 184,184 190,206 196,184" dur="0.8s" repeatCount="indefinite" />
              </polygon>
            </g>

            {/* Cyber Neck Ring */}
            <ellipse cx="110" cy="138" rx="40" ry="12" fill="#060911" stroke={activeMode.color} strokeWidth="2" />

            {/* Chest Arc Reactor Core */}
            <circle cx="110" cy="172" r="15" fill="#04060A" stroke={activeMode.color} strokeWidth="2" />
            <circle
              cx="110"
              cy="172"
              r="8"
              fill={activeMode.color}
              filter="url(#hyperGlow)"
            >
              <animate attributeName="opacity" values="0.6;1;0.6" dur="1.4s" repeatCount="indefinite" />
            </circle>

            {/* Chest Energy Discharge Lines */}
            <line x1="84" y1="162" x2="72" y2="188" stroke="#8B5CF6" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="136" y1="162" x2="148" y2="188" stroke={activeMode.color} strokeWidth="2.5" strokeLinecap="round" />

            {/* Main Helmet Dome Shell */}
            <ellipse cx="110" cy="94" rx="52" ry="56" fill="url(#helmetGrad2)" stroke="#475569" strokeWidth="3" />

            {/* Cyber Ear Cups / Audio Equalizer Stations */}
            <rect x="52" y="78" width="10" height="34" rx="4" fill="#090E17" stroke="#00F2FE" strokeWidth="1.5" />
            <rect x="158" y="78" width="10" height="34" rx="4" fill="#090E17" stroke="#8B5CF6" strokeWidth="1.5" />

            {/* Audio Equalizer Mini-Bars */}
            {audioBars.map((h, idx) => (
              <rect
                key={`left-eq-${idx}`}
                x={55}
                y={95 - h / 2}
                width="4"
                height={h * 0.7}
                rx="1"
                fill={activeMode.color}
              />
            ))}

            {/* Cyber Visor Shield with Metallic Curve */}
            <path
              d="M68 80 C68 68 86 58 110 58 C134 58 152 68 152 80 C152 108 140 124 110 124 C80 124 68 108 68 80 Z"
              fill={activeMode.visor}
              filter="url(#hyperGlow)"
              opacity="0.96"
            />

            {/* Hexagonal HUD Texture Overlay on Visor */}
            <path
              d="M68 80 C68 68 86 58 110 58 C134 58 152 68 152 80 C152 108 140 124 110 124 C80 124 68 108 68 80 Z"
              fill="url(#hexPattern)"
              opacity="0.8"
            />

            {/* Animated Scanning Laser Sweep Line */}
            <line
              x1="74"
              y1="82"
              x2="146"
              y2="82"
              stroke="#FFFFFF"
              strokeWidth="2"
              opacity="0.95"
              filter="url(#hyperGlow)"
            >
              <animate attributeName="y1" values="68;118;68" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="y2" values="68;118;68" dur="2.4s" repeatCount="indefinite" />
            </line>

            {/* Targeting Crosshair on Visor */}
            <circle cx={110 + mousePos.x * 14} cy={88 + mousePos.y * 12} r="10" stroke="rgba(255,255,255,0.75)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx={110 + mousePos.x * 14} cy={88 + mousePos.y * 12} r="2.5" fill="#FFFFFF" />

            {/* Holographic Visor Monospace Code Text */}
            <text x="94" y="90" fill="#04060A" fontSize="7.5" fontFamily="monospace" fontWeight="900" letterSpacing="0.9">
              {activeMode.id === 'overdrive' ? "OVERDRIVE" : activeMode.id === 'quantum' ? "QUANTUM" : "<DEV-75/>"}
            </text>
            <text x="90" y="102" fill="#04060A" fontSize="6.5" fontFamily="monospace" fontWeight="800" letterSpacing="0.6">
              {activeMode.id === 'overdrive' ? "100% ONLINE" : activeMode.id === 'quantum' ? "PHASE:ACTIVE" : "ORBIT:LIVE"}
            </text>

            {/* Dual Communication Antenna Beacons with Signal Rings */}
            <line x1="94" y1="46" x2="84" y2="28" stroke="#00F2FE" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="83" cy="26" r="4" fill="#00FFE0" filter="url(#hyperGlow)">
              <animate attributeName="r" values="3.5;5.5;3.5" dur="1.1s" repeatCount="indefinite" />
            </circle>

            <line x1="126" y1="46" x2="136" y2="28" stroke={activeMode.color} strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="137" cy="26" r="4" fill={activeMode.color} filter="url(#hyperGlow)">
              <animate attributeName="r" values="3.5;5.5;3.5" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Dynamic Softening Contact Shadow */}
          <div
            className="w-48 h-6 rounded-full pointer-events-none mt-2"
            style={{
              background: `radial-gradient(ellipse at center, ${activeMode.color}70 0%, rgba(121, 40, 202, 0.25) 45%, transparent 75%)`,
              filter: 'blur(9px)',
              animation: 'shadowPulse 4.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Cybernetic Mode Selector Chips (Directly under Avatar) */}
      <div className="flex items-center space-x-2 mt-4 z-20">
        {MODES.map((mode) => (
          <button
            key={mode.id}
            onClick={(e) => {
              e.stopPropagation();
              switchMode(mode);
            }}
            className={`px-3 py-1 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
              activeMode.id === mode.id
                ? 'bg-space-900 border text-white shadow-lg scale-105'
                : 'bg-space-950/80 border border-slate-800 text-slate-400 hover:text-white'
            }`}
            style={{
              borderColor: activeMode.id === mode.id ? mode.color : undefined,
              boxShadow: activeMode.id === mode.id ? `0 0 15px ${mode.color}40` : undefined,
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: mode.color }}
            />
            <span>{mode.label}</span>
          </button>
        ))}
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
