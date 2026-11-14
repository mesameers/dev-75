import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Volume2, VolumeX, MessageSquare, Sparkles, Mic, Radio, Shield, Zap } from 'lucide-react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 200, tilt: 65, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 220, tilt: -45, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 190, tilt: 55, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 215, tilt: -60, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 195, tilt: 40, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 225, tilt: -50, color: '#EC4899' },
];

const MODES = [
  {
    id: 'defense',
    label: 'SHIELD',
    color: '#00F2FE',
    visor: 'url(#visorNormal)',
    tag: 'TACTICAL',
    voiceLine: 'Tactical Shield engaged. All systems verified with zero-trust RBAC and multi-tenant isolation.',
  },
  {
    id: 'overdrive',
    label: 'OVERDRIVE',
    color: '#FF007A',
    visor: 'url(#visorOverdrive)',
    tag: 'HYPERDRIVE',
    voiceLine: 'Hyperdrive Overdrive online! Scaling distributed cluster to 50,000 requests per second.',
  },
  {
    id: 'quantum',
    label: 'QUANTUM',
    color: '#8B5CF6',
    visor: 'url(#visorQuantum)',
    tag: 'STEALTH',
    voiceLine: 'Quantum mode active. Sub-15 millisecond latency across global edge cache.',
  },
];

const EXTRA_SPEECHES = [
  "Greetings! I am DEV-75, Sameer Hussain's autonomous companion. Welcome to his engineering portfolio.",
  "Sameer specializes in hardened cloud architectures, high-performance APIs, and deterministic 3D motion.",
  "Every system here is engineered for zero-trust security, sub-15 millisecond p99 latency, and 99.99 percent cloud uptime.",
  "Explore the live API playground below to test production auth and sliding-window rate limiter algorithms.",
];

export const CosmicAvatar = ({ size = 420, className = "" }) => {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [pulseRing, setPulseRing] = useState(false);
  const [audioBars, setAudioBars] = useState([8, 14, 22, 16, 9]);

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState("Greetings! Click me or tap 'Hear DEV-75 Speak' to activate voice transmission.");
  const [speechIndex, setSpeechIndex] = useState(0);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Mouse tracking for 3D gyro tilt
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

  // Equalizer visualizer rhythm: bounce more intensely when speaking
  useEffect(() => {
    const eqInterval = setInterval(() => {
      const multiplier = isSpeaking ? 1.6 : 1.0;
      setAudioBars([
        Math.floor((6 + Math.random() * 18) * multiplier),
        Math.floor((10 + Math.random() * 20) * multiplier),
        Math.floor((14 + Math.random() * 22) * multiplier),
        Math.floor((8 + Math.random() * 19) * multiplier),
        Math.floor((5 + Math.random() * 16) * multiplier),
      ]);
    }, isSpeaking ? 90 : 180);
    return () => clearInterval(eqInterval);
  }, [isSpeaking]);

  // Speech Synthesis Core Function
  const speak = useCallback((text) => {
    setSpeechText(text);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Visual speech fallback
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3800);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = window.speechSynthesis.getVoices();

      // Find high quality English voice
      const preferred =
        voices.find((v) => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira'))) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferred) utterance.voice = preferred;
      utterance.pitch = 1.06;
      utterance.rate = 1.02;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3000);
    }
  }, []);

  const triggerNextSpeech = (e) => {
    if (e) e.stopPropagation();
    const nextIndex = (speechIndex + 1) % EXTRA_SPEECHES.length;
    setSpeechIndex(nextIndex);
    speak(EXTRA_SPEECHES[nextIndex]);
  };

  const switchMode = (mode) => {
    setActiveMode(mode);
    setPulseRing(true);
    setTimeout(() => setPulseRing(false), 1200);
    speak(mode.voiceLine);
  };

  const handleAvatarClick = () => {
    triggerNextSpeech();
  };

  const tiltX = mousePos.y * -16;
  const tiltY = mousePos.x * 20;

  return (
    <div className="flex flex-col items-center relative">
      {/* 0. Holographic Speech Subtitle Bubble (Renders above Avatar) */}
      <div
        className={`mb-4 max-w-sm sm:max-w-md px-4 py-2.5 rounded-2xl bg-space-900/95 border backdrop-blur-xl shadow-2xl transition-all duration-300 z-30 flex items-start space-x-3 text-left ${
          isSpeaking
            ? 'scale-105 border-energy-teal shadow-[0_0_30px_rgba(0,242,254,0.35)]'
            : 'border-slate-800/90 opacity-90 hover:opacity-100'
        }`}
        style={{
          borderColor: isSpeaking ? activeMode.color : undefined,
        }}
      >
        <div className="relative flex h-3 w-3 shrink-0 mt-1">
          {isSpeaking && (
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: activeMode.color }}
            />
          )}
          <span
            className="relative inline-flex rounded-full h-3 w-3"
            style={{ backgroundColor: isSpeaking ? activeMode.color : '#64748B' }}
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1">
            <span className="font-bold flex items-center space-x-1" style={{ color: activeMode.color }}>
              <Volume2 className="w-3 h-3 animate-pulse" />
              <span>DEV-75 // SYNTHESIZER</span>
            </span>
            <span className="text-slate-500 font-semibold">{isSpeaking ? 'TRANSMITTING' : 'LISTENING'}</span>
          </div>
          <p className="font-mono text-xs text-slate-200 leading-snug line-clamp-3">
            "{speechText}"
          </p>
        </div>
      </div>

      {/* Main Avatar Canvas Area */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
        style={{
          width: size,
          height: size,
          perspective: '1200px',
        }}
        title="Click to speak with DEV-75!"
      >
        {/* 1. Deep Core Gravitational Quantum Nebula */}
        <div
          className={`absolute rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
            pulseRing || isSpeaking
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

        {/* 2. Interactive Soundwave Ripple Rings When Speaking */}
        {isSpeaking && (
          <>
            <div
              className="absolute rounded-full border-2 pointer-events-none animate-soundwave"
              style={{
                width: size * 0.6,
                height: size * 0.6,
                borderColor: `${activeMode.color}80`,
              }}
            />
            <div
              className="absolute rounded-full border pointer-events-none animate-soundwave-delayed"
              style={{
                width: size * 0.75,
                height: size * 0.75,
                borderColor: `${activeMode.color}40`,
              }}
            />
          </>
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
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Rotating Cyber Halo Gear Teeth */}
            <g
              transform="translate(110, 85)"
              style={{
                animation: 'gearRotate 24s linear infinite',
                transformOrigin: '0px 0px',
              }}
            >
              {[...Array(12)].map((_, idx) => {
                const rot = idx * 30;
                return (
                  <rect
                    key={idx}
                    x="-3"
                    y="-64"
                    width="6"
                    height="8"
                    rx="1.5"
                    fill={activeMode.color}
                    opacity="0.75"
                    transform={`rotate(${rot})`}
                  />
                );
              })}
              <circle cx="0" cy="0" r="60" stroke={activeMode.color} strokeWidth="1" strokeDasharray="4 6" fill="none" opacity="0.4" />
            </g>

            {/* Thruster Plumes on Shoulders */}
            <g opacity="0.85">
              <ellipse cx="60" cy="188" rx="8" ry="16" fill={activeMode.color} filter="url(#hyperGlow)">
                <animate attributeName="ry" values="12;18;12" dur="0.8s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="160" cy="188" rx="8" ry="16" fill={activeMode.color} filter="url(#hyperGlow)">
                <animate attributeName="ry" values="12;18;12" dur="0.8s" repeatCount="indefinite" />
              </ellipse>
            </g>

            {/* Torso Suit Armor Plates */}
            <path
              d="M48 195 C48 162, 68 152, 110 152 C152 152, 172 162, 172 195 L180 215 C180 220, 40 220, 40 215 Z"
              fill="url(#armorPlates)"
              stroke={activeMode.color}
              strokeWidth="2.5"
            />

            {/* Chest Singularity Arc Reactor Core */}
            <circle cx="110" cy="185" r="16" fill="#04060A" stroke={activeMode.color} strokeWidth="3" filter="url(#hyperGlow)" />
            <circle cx="110" cy="185" r="11" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="110" cy="185" r="6" fill={activeMode.color}>
              <animate attributeName="r" values="5;7.5;5" dur="1.4s" repeatCount="indefinite" />
            </circle>

            {/* Suit Cyber Harness Neon Straps */}
            <line x1="72" y1="162" x2="96" y2="185" stroke={activeMode.color} strokeWidth="2.5" opacity="0.8" />
            <line x1="148" y1="162" x2="124" y2="185" stroke={activeMode.color} strokeWidth="2.5" opacity="0.8" />

            {/* Helmet Exterior Outer Armor Ring */}
            <circle
              cx="110"
              cy="85"
              r="58"
              fill="url(#helmetGrad2)"
              stroke={activeMode.color}
              strokeWidth="3.5"
              filter="url(#hyperGlow)"
            />

            {/* Outer Helmet Decorative Circuit Trim */}
            <circle cx="110" cy="85" r="54" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5 5" fill="none" />

            {/* Helmet Visor Shroud Inner Cut */}
            <ellipse cx="110" cy="86" rx="43" ry="33" fill="#020408" />

            {/* High-Tech Glowing Cybernetic Visor Screen */}
            <ellipse
              cx="110"
              cy="86"
              rx="40"
              ry="30"
              fill={activeMode.visor}
              className="transition-all duration-700"
              filter="url(#hyperGlow)"
            />

            {/* Visor Hexagonal Cyber Mesh Overlay */}
            <ellipse cx="110" cy="86" rx="40" ry="30" fill="url(#hexPattern)" opacity="0.45" />

            {/* Audio Equalizer Frequency Bars on Visor (Bouncing to voice rhythm!) */}
            <g transform="translate(94, 94)">
              {audioBars.map((barHeight, idx) => (
                <rect
                  key={idx}
                  x={idx * 7}
                  y={12 - barHeight * 0.5}
                  width="4"
                  height={barHeight * 0.5}
                  rx="2"
                  fill="#FFFFFF"
                  opacity={isSpeaking ? 0.95 : 0.65}
                />
              ))}
            </g>

            {/* Animated Scanning Laser Sweep Line across Visor */}
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
              <animate attributeName="y1" values="68;104;68" dur={isSpeaking ? "1.2s" : "2.6s"} repeatCount="indefinite" />
              <animate attributeName="y2" values="68;104;68" dur={isSpeaking ? "1.2s" : "2.6s"} repeatCount="indefinite" />
            </line>

            {/* Visor Realistic Specular Glint Reflection */}
            <path
              d="M78 72 C88 65 106 62 118 62 C108 76 96 98 88 112 C82 108 78 98 78 72 Z"
              fill="white"
              opacity="0.32"
            />

            {/* Targeting Crosshair on Visor */}
            <circle cx={110 + mousePos.x * 12} cy={82 + mousePos.y * 8} r="9" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
            <circle cx={110 + mousePos.x * 12} cy={82 + mousePos.y * 8} r="2" fill="#FFFFFF" />

            {/* Holographic Visor Monospace Code Text */}
            <text x="88" y="78" fill="#04060A" fontSize="7" fontFamily="monospace" fontWeight="900" letterSpacing="0.9">
              {isSpeaking ? "SPEAKING..." : activeMode.id === 'overdrive' ? "OVERDRIVE" : "<DEV-75/>"}
            </text>
            <text x="88" y="88" fill="#04060A" fontSize="6" fontFamily="monospace" fontWeight="800" letterSpacing="0.6">
              {isSpeaking ? "VOICE:ACTIVE" : "ORBIT:LIVE"}
            </text>

            {/* Dual Communication Antenna Beacons */}
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

      {/* Cybernetic Mode Selector Chips & Voice Trigger Deck */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-4 z-20">
        {/* Mode Chips */}
        <div className="flex items-center space-x-2">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={(e) => {
                e.stopPropagation();
                switchMode(mode);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center space-x-1.5 ${
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

        {/* Speak / Voice Assistant Action Button */}
        <button
          onClick={triggerNextSpeech}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-[11px] font-black border transition-all shadow-md active:scale-95 ${
            isSpeaking
              ? 'bg-energy-teal text-space-950 border-energy-cyan shadow-[0_0_20px_rgba(0,242,254,0.4)] animate-pulse'
              : 'bg-space-900/90 hover:bg-space-850 border-slate-700 text-slate-200 hover:border-energy-teal hover:text-energy-cyan'
          }`}
        >
          <Mic className={`w-3.5 h-3.5 ${isSpeaking ? 'text-space-950 fill-current' : 'text-energy-teal'}`} />
          <span>{isSpeaking ? 'SPEAKING...' : 'HEAR DEV-75 SPEAK'}</span>
        </button>
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
            opacity: 0.65;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.3;
          }
        }
        @keyframes gearRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        @keyframes soundwaveExpand {
          0% {
            transform: scale(0.4);
            opacity: 0.9;
          }
          100% {
            transform: scale(1.9);
            opacity: 0;
          }
        }
        .animate-soundwave {
          animation: soundwaveExpand 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .animate-soundwave-delayed {
          animation: soundwaveExpand 1.6s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 0.7s;
        }
      `}</style>
    </div>
  );
};
