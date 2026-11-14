import React, { useEffect, useRef, useState } from 'react';

export const CosmicAvatar = ({ size = 420, className = "" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 18;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        perspective: '1200px',
      }}
    >
      {/* 1. Deep Core Gravitational Glow */}
      <div
        className="absolute rounded-full blur-[70px] opacity-60 animate-pulse pointer-events-none"
        style={{
          width: size * 0.75,
          height: size * 0.75,
          background: 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
          animationDuration: '4s',
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

      {/* 3. The 3D Cyber-Astronaut / Developer Avatar Vessel */}
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
          <circle cx="100" cy="90" r="62" stroke="url(#neonRim)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" className="animate-spin-slow" />

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
