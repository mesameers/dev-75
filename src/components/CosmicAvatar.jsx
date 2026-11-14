import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  MessageSquare,
  Sparkles,
  Mic,
  Radio,
  Shield,
  Zap,
  Compass,
  ArrowRight,
  Film,
  Layers,
  Code2,
  Cpu,
  Terminal,
  Mail,
  Activity,
  Heart
} from 'lucide-react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 210, tilt: 65, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 230, tilt: -45, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 200, tilt: 55, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 225, tilt: -60, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 205, tilt: 40, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 235, tilt: -50, color: '#EC4899' },
];

const MODES = [
  {
    id: 'defense',
    label: 'SHIELD',
    color: '#00F2FE',
    hairColor: '#00FFE0',
    eyeColor: '#00F2FE',
    tag: 'TACTICAL',
    voiceLine: 'Tactical Shield active ho chuka hai! Tamam systems zero-trust security per verified hain.',
  },
  {
    id: 'overdrive',
    label: 'OVERDRIVE',
    color: '#FF007A',
    hairColor: '#FF2A85',
    eyeColor: '#FFD700',
    tag: 'HYPERDRIVE',
    voiceLine: 'Overdrive mode on! Cloud cluster ab 50,000 requests per second handle kar raha hai.',
  },
  {
    id: 'quantum',
    label: 'QUANTUM',
    color: '#8B5CF6',
    hairColor: '#A855F7',
    eyeColor: '#C084FC',
    tag: 'STEALTH',
    voiceLine: 'Quantum mode active! Global edge network par sub-15 millisecond latency locked hai.',
  },
];

// Urdu Dialogues for clicks
const URDU_SPEECHES = [
  {
    urdu: "خوش آمدید! میں DEV-75 ہوں، سمیر حسین کی autonomous AI companion۔ سمیر کے portfolio میں آپ کا خیرمقدم ہے! نیچے ان کے architecture systems اور live API suite ضرور دیکھیں۔",
    roman: "Khushamdeed! Main DEV-75 hoon, Sameer Hussain ki autonomous AI companion. Sameer ke portfolio mein aap ka swagat hai! Neechay unke architecture systems, live API suite, aur projects zaroor dekhein.",
  },
  {
    urdu: "سمیر حسین ایک Senior Full-Stack Developer اور Systems Architect ہیں جو hardened multi-tenant platforms اور 3D motion systems ڈیزائن کرتے ہیں۔",
    roman: "Sameer Hussain aik Senior Full-Stack Developer aur Systems Architect hain jo hardened multi-tenant platforms aur 3D motion systems design karte hain.",
  },
  {
    urdu: "آپ مجھ سے مائیک کے ذریعے بات کر سکتے ہیں! بس مجھے کہیں کہ 'Projects دکھاؤ' یا 'API پر لے جاؤ' اور میں فوراً آپ کو وہاں لے جاؤں گی۔",
    roman: "Aap mujh se mic ke zariye baat kar sakte hain! Bas mujhe kahein 'Projects dikhao' ya 'API per le jao' aur main foran aap ko wahan le jaungi.",
  },
  {
    urdu: "سمیر کے تمام سسٹمز 99.99 فیصد کلاؤڈ اپ ٹائم اور sub-15ms p99 latency پر چلتے ہیں۔ آپ لائیو API سوٹ کو ٹیسٹ بھی کر سکتے ہیں!",
    roman: "Sameer ke tamam systems 99.99 percent cloud uptime aur sub-15ms latency per chaltay hain. Aap live API suite ko test bhi kar sakte hain!",
  },
];

// Complete Voice Navigation Map (Trained on Urdu, Roman Urdu & English)
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: ['film', 'video', 'watch', 'movie', 'cinema', 'remotion', 'film dikhao', 'video dikhao', 'movie dikhao', 'film chalao'],
    voiceConfirm: "Theek hai! Aap ko 'Built in Orbit' film cinema per le kar ja rahi hoon.",
    subtitleUrdu: "چلیے! 'Built in Orbit' فلم سنیما پر چلتے ہیں۔",
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: Layers,
    color: '#10B981',
    keywords: ['projects', 'systems', 'featured', 'platform', 'work', 'project', 'projects dikhao', 'systems dikhao', 'project dikhao', 'kam dikhao'],
    voiceConfirm: "Jee bilkul! Sameer ke Featured Engineering Systems open ho rahe hain.",
    subtitleUrdu: "جی بالکل! سمیر کے Featured Engineering Systems پر پہنچ گئے ہیں۔",
  },
  {
    id: 'architecture',
    label: 'Topology',
    icon: Activity,
    color: '#8B5CF6',
    keywords: ['architecture', 'topology', 'microservices', 'cloud', 'cluster', 'nodes', 'spike', 'architecture dikhao', 'topology dikhao'],
    voiceConfirm: "Theek hai! Microservices Mesh Topology aur live data flow par chalte hain.",
    subtitleUrdu: "ٹھیک ہے! Microservices Mesh Topology لوڈ ہو رہی ہے۔",
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: ['code', 'inspector', 'algorithms', 'typescript', 'sql', 'physics', 'code dikhao', 'coding dikhao', 'algorithm'],
    voiceConfirm: "Zaroor! Production Code Inspector aur core algorithms par chaltay hain.",
    subtitleUrdu: "ضرور! Production Code Inspector اور الگورتھمز حاضر ہیں۔",
  },
  {
    id: 'api-playground',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: ['api', 'playground', 'endpoint', 'test', 'suite', 'request', 'api dikhao', 'api chalao', 'api test'],
    voiceConfirm: "Jee haan! Live Production API Playground khul raha hai.",
    subtitleUrdu: "جی ہاں! لائیو Production API Playground کھل رہا ہے۔",
  },
  {
    id: 'tech-sphere',
    label: '3D Matrix',
    icon: Compass,
    color: '#F59E0B',
    keywords: ['skills', 'tech', 'stack', 'matrix', 'sphere', '3d', 'skills dikhao', 'technologies', 'skills per jao', 'stack dikhao'],
    voiceConfirm: "Chaliye! 3D Interactive Technology Matrix open kar rahi hoon.",
    subtitleUrdu: "چلیے! 3D Interactive Technology Matrix کھل رہی ہے۔",
  },
  {
    id: 'terminal',
    label: 'CLI Terminal',
    icon: Terminal,
    color: '#A855F7',
    keywords: ['terminal', 'cli', 'shell', 'bash', 'command', 'terminal dikhao', 'terminal kholo', 'cli dikhao'],
    voiceConfirm: "Affirmative! Orbit CLI Developer Terminal launch kar rahi hoon.",
    subtitleUrdu: "آرڈر قبول! Orbit CLI ڈویلپر ٹرمینل لانچ کر رہی ہوں۔",
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#00FFE0',
    keywords: ['contact', 'hire', 'talk', 'email', 'connect', 'message', 'rabta', 'contact dikhao', 'rabta karna hai', 'email dikhao'],
    voiceConfirm: "Bilkul! Sameer Hussain ke Direct Contact Dispatch link par chalte hain.",
    subtitleUrdu: "بالکل! سمیر حسین کے Direct Contact لنک پر پہنچ گئے ہیں۔",
  },
  {
    id: 'hero',
    label: 'Top / Hero',
    icon: ArrowRight,
    color: '#00F2FE',
    keywords: ['upar', 'top', 'hero', 'home', 'shuru', 'wapas', 'upar jao', 'start'],
    voiceConfirm: "Wapas Orbit Command Bridge par le ja rahi hoon.",
    subtitleUrdu: "واپس اوپر Orbit Command Bridge پر آ گئے۔",
  },
];

export const CosmicAvatar = ({ size = 480, className = "" }) => {
  const containerRef = useRef(null);
  const hasSpokenFirstRef = useRef(false);
  const recognitionRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeMode, setActiveMode] = useState(MODES[0]);
  const [pulseRing, setPulseRing] = useState(false);
  const [audioBars, setAudioBars] = useState([8, 14, 22, 16, 9]);

  // Animated Girl Facial Expressions
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthShape, setMouthShape] = useState(0); // 0: closed smile, 1: small open, 2: wide open

  // Speech State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechTextUrdu, setSpeechTextUrdu] = useState("خوش آمدید! مجھے کلک کریں یا بتائیں کہ کہاں جانا ہے (جیسے 'API دکھاؤ' یا 'فلم چلاؤ')۔");
  const [speechTextRoman, setSpeechTextRoman] = useState("Khushamdeed! Mujhe click karein ya batayein kahan jana hai (jaise 'API dikhao' ya 'Film dikhao')!");
  const [speechIndex, setSpeechIndex] = useState(0);

  // Natural Blinking Interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 160);
    }, 3600);
    return () => clearInterval(blinkInterval);
  }, []);

  // Lip-Sync talking animation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthShape(0);
      return;
    }
    const mouthInterval = setInterval(() => {
      setMouthShape((prev) => (prev === 0 ? 1 : prev === 1 ? 2 : 0));
    }, 130);
    return () => clearInterval(mouthInterval);
  }, [isSpeaking]);

  // Mouse tracking for head tilt and eye gaze
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

  // Audio equalizer bars
  useEffect(() => {
    const eqInterval = setInterval(() => {
      const multiplier = isSpeaking ? 1.8 : isListening ? 1.4 : 1.0;
      setAudioBars([
        Math.floor((6 + Math.random() * 18) * multiplier),
        Math.floor((10 + Math.random() * 20) * multiplier),
        Math.floor((14 + Math.random() * 22) * multiplier),
        Math.floor((8 + Math.random() * 19) * multiplier),
        Math.floor((5 + Math.random() * 16) * multiplier),
      ]);
    }, isSpeaking ? 80 : 180);
    return () => clearInterval(eqInterval);
  }, [isSpeaking, isListening]);

  // Speech Synthesis Core Function supporting Urdu / Roman Urdu / English
  const speak = useCallback((textToSpeak, urduDisplay = '', romanDisplay = '') => {
    setSpeechTextUrdu(urduDisplay || textToSpeak);
    setSpeechTextRoman(romanDisplay || textToSpeak);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3800);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const voices = window.speechSynthesis.getVoices();

      // Look for Urdu, Hindi, or natural smooth female voice
      const preferredVoice =
        voices.find((v) => v.lang.includes('ur') || v.lang.includes('hi')) ||
        voices.find((v) => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira'))) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.15; // Pleasant, friendly AI female tone
      utterance.rate = 1.02;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3200);
    }
  }, []);

  // Teleport Navigation Function
  const teleportTo = useCallback(
    (targetId, voiceConfirmText, subtitleUrduText = '') => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      // 1. Announce verbally in Urdu
      speak(voiceConfirmText, subtitleUrduText, voiceConfirmText);

      // 2. Smoothly scroll into view
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    },
    [speak]
  );

  // Web Speech Recognition for Urdu & English Voice Commands
  const startVoiceCommand = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      speak("Voice recognition is not supported in this browser. Please click the chips below!");
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'ur-PK'; // Primary Urdu recognition, falls back gracefully
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechTextUrdu("🎙️ سن رہی ہوں... مجھے بتائیں: 'API دکھاؤ'، 'فلم چلاؤ'، 'پروجیکٹس دکھاؤ'، یا 'ٹرمینل کھولو'!");
        setSpeechTextRoman("🎙️ Sun rahi hoon... Batayein: 'API dikhao', 'Film dikhao', 'Projects dikhao', ya 'Terminal kholo'!");
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        setIsListening(false);
        setSpeechTextRoman(`Sun liya: "${transcript}"`);

        // Find match in NAV_TARGETS
        const matched = NAV_TARGETS.find((target) =>
          target.keywords.some((kw) => transcript.includes(kw))
        );

        if (matched) {
          teleportTo(matched.id, matched.voiceConfirm, matched.subtitleUrdu);
        } else {
          speak(
            `Main ne suna "${transcript}". Aap keh sakte hain 'Projects dikhao' ya 'API suite per le jao'!`,
            `سنا: "${transcript}". آپ کہہ سکتے ہیں 'پروجیکٹس دکھاؤ' یا 'API دکھاؤ'!`
          );
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  }, [speak, teleportTo]);

  // Click on Avatar: Always speak Welcome & Tour first in Urdu!
  const triggerNextSpeech = (e) => {
    if (e) e.stopPropagation();

    if (!hasSpokenFirstRef.current) {
      hasSpokenFirstRef.current = true;
      setSpeechIndex(0);
      speak(URDU_SPEECHES[0].roman, URDU_SPEECHES[0].urdu, URDU_SPEECHES[0].roman);
      return;
    }

    const nextIndex = (speechIndex + 1) % URDU_SPEECHES.length;
    setSpeechIndex(nextIndex);
    speak(URDU_SPEECHES[nextIndex].roman, URDU_SPEECHES[nextIndex].urdu, URDU_SPEECHES[nextIndex].roman);
  };

  const switchMode = (mode) => {
    setActiveMode(mode);
    setPulseRing(true);
    setTimeout(() => setPulseRing(false), 1200);
    speak(mode.voiceLine, mode.voiceLine, mode.voiceLine);
  };

  const handleAvatarClick = () => {
    triggerNextSpeech();
  };

  const tiltX = mousePos.y * -14;
  const tiltY = mousePos.x * 18;
  const pupilX = mousePos.x * 3.5;
  const pupilY = mousePos.y * 2.5;

  return (
    <div className="flex flex-col items-center relative w-full">
      {/* 0. Holographic Bilingual Urdu & English Speech Bubble */}
      <div
        className={`mb-5 w-full max-w-lg px-5 py-3.5 rounded-3xl bg-space-900/95 border backdrop-blur-2xl shadow-2xl transition-all duration-300 z-30 flex flex-col space-y-2 text-left ${
          isSpeaking || isListening
            ? 'scale-[1.02] border-energy-teal shadow-[0_0_35px_rgba(0,242,254,0.4)]'
            : 'border-slate-800/90 opacity-95 hover:opacity-100'
        }`}
        style={{
          borderColor: isSpeaking || isListening ? activeMode.color : undefined,
        }}
      >
        {/* Top Status Header */}
        <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 pb-2 border-b border-slate-800/80">
          <span className="font-bold flex items-center space-x-2" style={{ color: activeMode.color }}>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeMode.color }} />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: activeMode.color }} />
            </span>
            <span>AYLA // DEV-75 AI COMPANION</span>
          </span>
          <span className="font-semibold text-energy-cyan flex items-center space-x-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isListening ? '🎙️ SUN RAHI HOON...' : isSpeaking ? '🔊 BOL RAHI HOON' : 'URDU / ENG VOICE'}</span>
          </span>
        </div>

        {/* Dynamic Spoken Text in Urdu Script & Roman Urdu */}
        <div className="space-y-1">
          <p className="font-sans text-sm sm:text-base text-white font-semibold leading-relaxed tracking-wide text-right" dir="rtl">
            {speechTextUrdu}
          </p>
          <p className="font-mono text-xs text-energy-cyan/90 leading-snug">
            "{speechTextRoman}"
          </p>
        </div>

        {/* Quick Teleportation Command Chips (Trained on Portfolio Sections) */}
        <div className="pt-2.5 border-t border-slate-800/80">
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 mb-1.5">
            <span className="flex items-center space-x-1 text-energy-teal font-bold">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>KAHAN JANA HAI? (CLICK TO TELEPORT):</span>
            </span>
            <span className="text-slate-500 font-semibold">1-CLICK JUMP</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {NAV_TARGETS.map((tgt) => {
              const Icon = tgt.icon;
              return (
                <button
                  key={tgt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    teleportTo(tgt.id, tgt.voiceConfirm, tgt.subtitleUrdu);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-space-950 border border-slate-800 hover:border-energy-teal font-mono text-xs font-bold text-slate-200 hover:text-white flex items-center space-x-1.5 transition-all whitespace-nowrap active:scale-95 shadow-sm hover:scale-105"
                  style={{
                    borderColor: `${tgt.color}40`,
                  }}
                  title={`Teleport to ${tgt.label}`}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: tgt.color }} />
                  <span>{tgt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main 3D Animated Cyber AI Girl Avatar Canvas */}
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
        title="Mujhe click karein ya mic se batayein kahan jana hai!"
      >
        {/* 1. Deep Core Gravitational Quantum Nebula */}
        <div
          className={`absolute rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
            pulseRing || isSpeaking || isListening
              ? 'scale-145 opacity-95'
              : isHovered
              ? 'scale-125 opacity-85'
              : 'opacity-70'
          }`}
          style={{
            width: size * 0.9,
            height: size * 0.9,
            background:
              activeMode.id === 'overdrive'
                ? 'radial-gradient(circle, #FF007A 0%, #FFD700 40%, #7928CA 70%, transparent 85%)'
                : activeMode.id === 'quantum'
                ? 'radial-gradient(circle, #8B5CF6 0%, #00F2FE 45%, #10B981 75%, transparent 85%)'
                : 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
            animation: 'pulseSlow 3.5s infinite ease-in-out',
          }}
        />

        {/* 2. Interactive Soundwave Ripple Rings When Speaking / Listening */}
        {(isSpeaking || isListening) && (
          <>
            <div
              className="absolute rounded-full border-2 pointer-events-none animate-soundwave"
              style={{
                width: size * 0.65,
                height: size * 0.65,
                borderColor: `${activeMode.color}80`,
              }}
            />
            <div
              className="absolute rounded-full border pointer-events-none animate-soundwave-delayed"
              style={{
                width: size * 0.85,
                height: size * 0.85,
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
            width: size * 1.15,
            height: size * 1.15,
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
            width: size * 1.25,
            height: size * 1.25,
            transform: `rotateX(-52deg) rotateY(38deg)`,
            animation: 'spinCounterClockwise 20s linear infinite',
            boxShadow: '0 0 35px rgba(139, 92, 246, 0.35)',
          }}
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-secondary-violet shadow-[0_0_20px_#8B5CF6]" />
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_15px_#EC4899]" />
        </div>

        {/* 4. Orbiting 3D Glass Tech Satellites */}
        {ORBITING_TECH.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const xOffset = Math.cos(rad) * (tech.radius * (size / 480));
          const yOffset = Math.sin(rad) * (tech.radius * (size / 480) * 0.44);

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
                className="px-3.5 py-1.5 rounded-full font-mono text-[11px] font-black tracking-wider bg-space-950/95 border backdrop-blur-xl shadow-xl flex items-center space-x-1.5 transition-all"
                style={{
                  borderColor: `${tech.color}80`,
                  color: tech.color,
                  boxShadow: `0 0 25px ${tech.color}45`,
                }}
              >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                <span>{tech.label}</span>
              </div>
            </div>
          );
        })}

        {/* 5. The 3D High-Fidelity Cyber AI Girl Character */}
        <div
          className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(40px)`,
            animation: 'avatarLevitate 4.5s ease-in-out infinite',
          }}
        >
          {/* SVG Vector Cyber Anime Girl Vessel */}
          <svg
            width={size * 0.88}
            height={size * 0.88}
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
          >
            <defs>
              {/* Skin Tone Gradient */}
              <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2E8" />
                <stop offset="70%" stopColor="#FFE0CE" />
                <stop offset="100%" stopColor="#F5C4AB" />
              </linearGradient>

              {/* Glowing Hair Gradient */}
              <linearGradient id="cyberHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeMode.hairColor} />
                <stop offset="45%" stopColor={activeMode.color} />
                <stop offset="100%" stopColor="#7928CA" />
              </linearGradient>

              {/* Eye Iris Gradient */}
              <radialGradient id="eyeIrisGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor={activeMode.eyeColor} />
                <stop offset="85%" stopColor="#0B132B" />
                <stop offset="100%" stopColor="#02040A" />
              </radialGradient>

              {/* Cyber Jacket & Collar Gradient */}
              <linearGradient id="jacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1C2433" />
                <stop offset="50%" stopColor="#0E1624" />
                <stop offset="100%" stopColor="#050811" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="girlGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Back Hair Strands (Flowing behind shoulders) */}
            <path
              d="M65 85 C45 130 50 185 75 220 C90 195 95 160 88 120 Z"
              fill="url(#cyberHairGrad)"
              opacity="0.9"
            />
            <path
              d="M175 85 C195 130 190 185 165 220 C150 195 145 160 152 120 Z"
              fill="url(#cyberHairGrad)"
              opacity="0.9"
            />

            {/* Cyber Suit Torso & Collar */}
            <path
              d="M55 200 C55 170, 75 160, 120 160 C165 160, 185 170, 185 200 L195 240 C195 245, 45 245, 45 240 Z"
              fill="url(#jacketGrad)"
              stroke={activeMode.color}
              strokeWidth="2.5"
            />

            {/* High-Tech Neon Collar Choker */}
            <path
              d="M95 152 C105 158 135 158 145 152 L148 165 C135 172 105 172 92 165 Z"
              fill="#060913"
              stroke={activeMode.color}
              strokeWidth="2"
            />
            {/* Glowing Heart/Crystal Center on Choker */}
            <circle cx="120" cy="162" r="5" fill={activeMode.color} filter="url(#girlGlow)">
              <animate attributeName="r" values="4;6;4" dur="1.4s" repeatCount="indefinite" />
            </circle>

            {/* Slender Cyber Neck */}
            <path
              d="M102 125 L102 155 C110 160 130 160 138 155 L138 125 Z"
              fill="url(#skinGrad)"
            />

            {/* Delicate Anime Girl Face Shape */}
            <path
              d="M75 85 C75 130, 95 148, 120 150 C145 148, 165 130, 165 85 C165 48, 145 42, 120 42 C95 42, 75 48, 75 85 Z"
              fill="url(#skinGrad)"
            />

            {/* Soft Cheeks Cyber Blush */}
            <ellipse cx="88" cy="108" rx="8" ry="4" fill="#FF4D8D" opacity="0.4" filter="url(#girlGlow)" />
            <ellipse cx="152" cy="108" rx="8" ry="4" fill="#FF4D8D" opacity="0.4" filter="url(#girlGlow)" />

            {/* Cyber Cheek Telemetry Circuit Marks */}
            <path d="M80 115 L88 115 L92 120" stroke={activeMode.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
            <path d="M160 115 L152 115 L148 120" stroke={activeMode.color} strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

            {/* Anime Eyes with Cursor Tracking and Blinking */}
            {!isBlinking ? (
              <g>
                {/* Left Eye Whites */}
                <ellipse cx="94" cy="94" rx="14" ry="16" fill="#FFFFFF" />
                {/* Left Iris & Pupil following mouse cursor */}
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="94" cy="94" rx="9" ry="12" fill="url(#eyeIrisGrad)" filter="url(#girlGlow)" />
                  <ellipse cx="94" cy="94" rx="4.5" ry="6.5" fill="#02040A" />
                  {/* Catchlight Highlights */}
                  <circle cx="91" cy="90" r="3" fill="#FFFFFF" />
                  <circle cx="96" cy="97" r="1.5" fill="#FFFFFF" />
                </g>
                {/* Left Eyelashes */}
                <path d="M78 86 C86 78 102 78 110 86" stroke="#0B132B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M78 86 L74 81" stroke="#0B132B" strokeWidth="2" strokeLinecap="round" />

                {/* Right Eye Whites */}
                <ellipse cx="146" cy="94" rx="14" ry="16" fill="#FFFFFF" />
                {/* Right Iris & Pupil following mouse cursor */}
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="146" cy="94" rx="9" ry="12" fill="url(#eyeIrisGrad)" filter="url(#girlGlow)" />
                  <ellipse cx="146" cy="94" rx="4.5" ry="6.5" fill="#02040A" />
                  {/* Catchlight Highlights */}
                  <circle cx="143" cy="90" r="3" fill="#FFFFFF" />
                  <circle cx="148" cy="97" r="1.5" fill="#FFFFFF" />
                </g>
                {/* Right Eyelashes */}
                <path d="M130 86 C138 78 154 78 162 86" stroke="#0B132B" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M162 86 L166 81" stroke="#0B132B" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              /* Closed Blinking Eyes */
              <g>
                <path d="M80 94 Q94 102 108 94" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M132 94 Q146 102 160 94" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Cute Anime Nose */}
            <circle cx="120" cy="112" r="1.5" fill="#E59877" />

            {/* Animated Lip-Sync Mouth */}
            {mouthShape === 0 ? (
              /* Soft Friendly Smile */
              <path d="M112 128 Q120 134 128 128" stroke="#D15672" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            ) : mouthShape === 1 ? (
              /* Small Open (Talking) */
              <ellipse cx="120" cy="130" rx="6" ry="4" fill="#D15672" />
            ) : (
              /* Wide Open (Singing / Emphasizing) */
              <path d="M112 127 Q120 138 128 127 Q120 132 112 127 Z" fill="#D15672" stroke="#FF4D8D" strokeWidth="1" />
            )}

            {/* Front Flowing Cyber Hair Bangs & Twin Tails */}
            <path
              d="M70 65 C85 45 155 45 170 65 C160 85 150 95 142 98 C140 85 130 82 120 85 C110 82 100 85 98 98 C90 95 80 85 70 65 Z"
              fill="url(#cyberHairGrad)"
            />
            {/* Left Side Hair Strand */}
            <path
              d="M74 72 C68 100 70 130 82 145 C78 125 76 95 82 75 Z"
              fill="url(#cyberHairGrad)"
            />
            {/* Right Side Hair Strand */}
            <path
              d="M166 72 C172 100 170 130 158 145 C162 125 164 95 158 75 Z"
              fill="url(#cyberHairGrad)"
            />
            {/* Shiny Hair Highlights */}
            <path
              d="M85 58 C98 52 142 52 155 58"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Cybernetic Audio Headset with Glowing Equalizer */}
            {/* Headset Arc Band */}
            <path
              d="M62 82 C62 40 178 40 178 82"
              stroke="#0B132B"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M66 82 C66 45 174 45 174 82"
              stroke={activeMode.color}
              strokeWidth="2"
              fill="none"
              filter="url(#girlGlow)"
            />

            {/* Left Headset Earpiece */}
            <ellipse cx="64" cy="94" rx="10" ry="16" fill="#04060A" stroke={activeMode.color} strokeWidth="2.5" />
            {/* Headset Visualizer Bars (Bouncing to voice!) */}
            <g transform="translate(58, 88)">
              {audioBars.slice(0, 3).map((bar, idx) => (
                <rect
                  key={idx}
                  x={idx * 4}
                  y={12 - bar * 0.4}
                  width="2.5"
                  height={bar * 0.4}
                  rx="1"
                  fill={activeMode.color}
                />
              ))}
            </g>

            {/* Right Headset Earpiece & Antenna Mic */}
            <ellipse cx="176" cy="94" rx="10" ry="16" fill="#04060A" stroke={activeMode.color} strokeWidth="2.5" />
            {/* Antenna Boom Mic extending toward mouth */}
            <path
              d="M176 102 C170 120 150 132 134 130"
              stroke={activeMode.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="132" cy="130" r="3.5" fill={activeMode.color} filter="url(#girlGlow)">
              <animate attributeName="r" values="3;4.5;3" dur="1.1s" repeatCount="indefinite" />
            </circle>
          </svg>

          {/* Dynamic Softening Contact Shadow */}
          <div
            className="w-56 h-7 rounded-full pointer-events-none mt-2"
            style={{
              background: `radial-gradient(ellipse at center, ${activeMode.color}75 0%, rgba(121, 40, 202, 0.3) 45%, transparent 75%)`,
              filter: 'blur(10px)',
              animation: 'shadowPulse 4.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Cyber AI Girl Mode Chips & Urdu Voice Trigger Deck */}
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
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 ${
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

        {/* Live Voice Navigation Trigger Button */}
        <button
          onClick={startVoiceCommand}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-mono text-xs font-black border transition-all shadow-lg active:scale-95 ${
            isListening
              ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)] animate-pulse scale-105'
              : 'bg-space-900/90 hover:bg-space-850 border-slate-700 text-slate-200 hover:border-energy-teal hover:text-energy-cyan'
          }`}
          title="Click to speak (e.g. 'Projects dikhao', 'API suite per le jao')"
        >
          <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce text-white' : 'text-energy-teal'}`} />
          <span>{isListening ? '🎙️ SUN RAHI HOON (BOLIYE)...' : '🎙️ URDU VOICE COMMAND'}</span>
        </button>

        {/* Speak Dialogue Button */}
        <button
          onClick={triggerNextSpeech}
          className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-mono text-xs font-bold border transition-all shadow-sm active:scale-95 ${
            isSpeaking
              ? 'bg-energy-teal text-space-950 border-energy-cyan shadow-[0_0_20px_rgba(0,242,254,0.4)] animate-pulse'
              : 'bg-space-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
          title="Click to hear welcome and tour speech"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>{isSpeaking ? 'BOL RAHI HOON...' : 'AYLA SE BAAT KAREIN'}</span>
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
