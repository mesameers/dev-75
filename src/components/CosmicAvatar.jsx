import React, { useEffect, useRef, useState } from 'react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 195, tilt: 65, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 215, tilt: -45, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 185, tilt: 55, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 210, tilt: -60, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 190, tilt: 40, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 220, tilt: -50, color: '#EC4899' },
];

export const CosmicAvatar = ({ size = 420, className = "" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [pulseShield, setPulseShield] = useState(false);

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

  const triggerShieldBurst = () => {
    setPulseShield(true);
    setTimeout(() => setPulseShield(false), 900);
  };

  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 18;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerShieldBurst}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1200px',
      }}
      title="Click to trigger quantum shield aura"
    >
      {/* 1. Deep Core Gravitational Glow */}
      <div
        className={`absolute rounded-full blur-[70px] pointer-events-none transition-all duration-700 ${
          pulseShield ? 'scale-125 opacity-90' : isHovered ? 'scale-110 opacity-75' : 'opacity-60'
        }`}
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: pulseShield
            ? 'radial-gradient(circle, #00FFE0 0%, #00F2FE 40%, #7928CA 70%, transparent 85%)'
            : 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
          animation: 'pulseSlow 4s infinite ease-in-out',
        }}
      />

      {/* 2. Outer Orbital Gyroscope Rings (Continuous 3D Rotation) */}
      {/* Ring 1 - Teal Horizon */}
      <div
        className="absolute rounded-full border-2 border-energy-teal/40 pointer-events-none"
        style={{
          width: size * 1.15,
          height: size * 1.15,
          transform: `rotateX(68deg) rotateY(${tiltY * 0.4}deg) rotateZ(0deg)`,
          animation: 'spinClockwise 16s linear infinite',
          boxShadow: '0 0 25px rgba(0, 242, 254, 0.25), inset 0 0 25px rgba(0, 242, 254, 0.25)',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-energy-cyan shadow-[0_0_15px_#00FFE0]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-energy-teal shadow-[0_0_12px_#00F2FE]" />
      </div>

      {/* Ring 2 - Violet Tilt Ring */}
      <div
        className="absolute rounded-full border border-secondary-violet/50 pointer-events-none"
        style={{
          width: size * 1.25,
          height: size * 1.25,
          transform: `rotateX(-52deg) rotateY(35deg)`,
          animation: 'spinCounterClockwise 22s linear infinite',
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
        }}
      >
        <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-secondary-violet shadow-[0_0_15px_#8B5CF6]" />
      </div>

      {/* Ring 3 - Equatorial Micro-Nodes Ring */}
      <div
        className="absolute rounded-full border border-dashed border-cyan-400/30 pointer-events-none"
        style={{
          width: size * 0.95,
          height: size * 0.95,
          transform: 'rotateX(82deg)',
          animation: 'spinClockwise 10s linear infinite',
        }}
      />

      {/* 3. Orbiting Interactive Floating Tech Badges */}
      {ORBITING_TECH.map((tech, i) => {
        // Compute position based on angle
        const rad = (tech.angle * Math.PI) / 180;
        const xOffset = Math.cos(rad) * (tech.radius * (size / 420));
        const yOffset = Math.sin(rad) * (tech.radius * (size / 420) * 0.42);

        return (
          <div
            key={i}
            className="absolute z-20 pointer-events-none sm:pointer-events-auto transition-transform hover:scale-125"
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`,
              animation: `orbitFloat 4s ease-in-out infinite ${i * 0.65}s`,
            }}
          >
            <div
              className="px-2.5 py-1 rounded-full font-mono text-[10px] font-extrabold tracking-wider bg-space-950/90 border backdrop-blur-md shadow-lg transition-all"
              style={{
                borderColor: `${tech.color}60`,
                color: tech.color,
                boxShadow: `0 0 15px ${tech.color}35`,
              }}
            >
              {tech.label}
            </div>
          </div>
        );
      })}

      {/* 4. The 3D Cyber-Astronaut / Developer Avatar Vessel */}
      <div
        className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(30px)`,
          animation: 'avatarLevitate 5s ease-in-out infinite',
        }}
      >
        {/* SVG High-Fidelity Cyber Astronaut / Hologram Avatar */}
        <svg
          width={size * 0.72}
          height={size * 0.72}
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        >
          <defs>
            {/* Gradients */}
            <radialGradient id="helmetGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="70%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#05070B" />
            </radialGradient>

            <linearGradient id="visorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="50%" stopColor="#00FFE0" />
              <stop offset="100%" stopColor="#7928CA" />
            </linearGradient>

            <linearGradient id="armorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#090D16" />
            </linearGradient>

            <linearGradient id="neonRim" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>

            <filter id="neonBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Halo Energy Behind Avatar */}
          <circle
            cx="100"
            cy="90"
            r="62"
            stroke="url(#neonRim)"
            strokeWidth="1.5"
            strokeDasharray="6 4"
            opacity="0.6"
            className="animate-spin-slow"
          />

          {/* Shoulder Armor Plates */}
          <path
            d="M50 148 C50 128 75 125 100 125 C125 125 150 128 150 148 L158 178 C158 186 142 192 100 192 C58 192 42 186 42 178 Z"
            fill="url(#armorGrad)"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Cyber Neck Ring */}
          <ellipse cx="100" cy="126" rx="34" ry="10" fill="#0A0F1D" stroke="#00F2FE" strokeWidth="1.5" />

          {/* Torso Tech Core Badge */}
          <circle cx="100" cy="155" r="12" fill="#05070B" stroke="#00F2FE" strokeWidth="2" />
          <circle cx="100" cy="155" r="6" fill="#00FFE0" filter="url(#neonBlur)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* Chest Light Trails */}
          <line x1="78" y1="146" x2="68" y2="168" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />
          <line x1="122" y1="146" x2="132" y2="168" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />

          {/* Main Helmet Dome */}
          <ellipse cx="100" cy="85" rx="46" ry="50" fill="url(#helmetGrad)" stroke="#334155" strokeWidth="2.5" />

          {/* External Helmet Frame Accents */}
          <path d="M56 82 C56 58 76 42 100 42 C124 42 144 58 144 82" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <circle cx="56" cy="88" r="4.5" fill="#0F172A" stroke="#00F2FE" strokeWidth="1.5" />
          <circle cx="144" cy="88" r="4.5" fill="#0F172A" stroke="#8B5CF6" strokeWidth="1.5" />

          {/* Cyber Visor (Reflective Metallic Shield) */}
          <path
            d="M65 72 C65 62 80 54 100 54 C120 54 135 62 135 72 C135 94 124 108 100 108 C76 108 65 94 65 72 Z"
            fill="url(#visorGlow)"
            filter="url(#neonBlur)"
            opacity="0.95"
          />

          {/* Animated Scanning Laser Sweep Line on Visor */}
          <line
            x1="68"
            y1="75"
            x2="132"
            y2="75"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            opacity="0.8"
            filter="url(#neonBlur)"
          >
            <animate
              attributeName="y1"
              values="62;102;62"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="62;102;62"
              dur="3s"
              repeatCount="indefinite"
            />
          </line>

          {/* Visor Reflection Streak */}
          <path
            d="M72 65 C80 59 95 56 104 56 C96 68 85 86 78 98 C73 95 71 88 72 65 Z"
            fill="white"
            opacity="0.35"
          />

          {/* Holographic Code Overlay on Visor */}
          <text x="86" y="80" fill="#05070B" fontSize="6.5" fontFamily="monospace" fontWeight="900" letterSpacing="0.8">
            &lt;DEV-75/&gt;
          </text>
          <text x="84" y="90" fill="#05070B" fontSize="5.5" fontFamily="monospace" fontWeight="700" letterSpacing="0.5">
            ORBIT:LIVE
          </text>

          {/* Antenna / Communication Beacon */}
          <line x1="100" y1="42" x2="100" y2="28" stroke="#00F2FE" strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="26" r="3.5" fill="#00FFE0" filter="url(#neonBlur)">
            <animate attributeName="r" values="3;4.5;3" dur="1.5s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Dynamic Softening Contact Shadow */}
        <div
          className="w-44 h-5 rounded-full pointer-events-none mt-2"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.45) 0%, rgba(121, 40, 202, 0.2) 40%, transparent 75%)',
            filter: 'blur(8px)',
            animation: 'shadowPulse 5s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes avatarLevitate {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(-1.5deg);
          }
        }
        @keyframes shadowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(0.82);
            opacity: 0.28;
          }
        }
        @keyframes orbitFloat {
          0%, 100% {
            transform: translate(var(--tx, 0), var(--ty, 0)) translateY(0px);
          }
          50% {
            transform: translate(var(--tx, 0), var(--ty, 0)) translateY(-8px);
          }
        }
        @keyframes spinClockwise {
          from { transform: rotateX(68deg) rotateZ(0deg); }
          to { transform: rotateX(68deg) rotateZ(360deg); }
        }
        @keyframes spinCounterClockwise {
          from { transform: rotateX(-52deg) rotateY(35deg) rotateZ(360deg); }
          to { transform: rotateX(-52deg) rotateY(35deg) rotateZ(0deg); }
        }
      `}</style>
    </div>
  );
};
