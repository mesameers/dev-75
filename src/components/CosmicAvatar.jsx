import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Film,
  Layers,
  Code2,
  Cpu,
  Terminal,
  Mail,
  Activity,
  Compass,
  ArrowRight,
  Radio,
  Sparkles
} from 'lucide-react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 220, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 240, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 215, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 235, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 220, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 245, color: '#EC4899' },
];

// Pure Pakistani Urdu Voice Navigation Targets with Full Phonetic Matching
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: ['film', 'flim', 'filam', 'video', 'vedio', 'movie', 'cinema', 'watch', 'remotion', 'film dikhao', 'video dikhao', 'movie dikhao', 'film chalao', 'فلم', 'ویڈیو', 'سینما'],
    voiceConfirm: "چلیے! سمیر کی 'بلٹ ان اوربٹ' فلم سنیما پر چلتے ہیں۔",
    romanConfirm: "Chaliye! Sameer ki 'Built in Orbit' film cinema per chaltay hain.",
  },
  {
    id: 'projects',
    alias: 'systems',
    label: 'Systems',
    icon: Layers,
    color: '#10B981',
    keywords: [
      'system', 'systems', 'sistem', 'sistems', 'sustam', 'sustams', 'sistim',
      'system please', 'assistant', 'assistance',
      'project', 'projects', 'projeck', 'projekts', 'featured', 'platform', 'work', 'kaam', 'kam', 'portfolio',
      'system dikhao', 'systems dikhao', 'system per jao', 'systems per jao',
      'system per lekar ja', 'systems per lekar ja', 'system dikha do', 'systems dikha do',
      'سسٹم', 'سسٹمز', 'پروجیکٹ', 'پروجیکٹس', 'کام'
    ],
    voiceConfirm: "جی ضرور! چلیے میں آپ کو سمیر کے سسٹمز اور پروجیکٹس پر لے چلتی ہوں۔",
    romanConfirm: "Jee zaroor! Chaliye main aap ko Sameer ke systems aur projects par le kar chalti hoon.",
  },
  {
    id: 'architecture',
    label: 'Topology',
    icon: Activity,
    color: '#8B5CF6',
    keywords: ['architecture', 'arkitecture', 'topology', 'toplogy', 'mesh', 'microservices', 'microservice', 'cloud', 'cluster', 'node', 'nodes', 'spike', 'architecture dikhao', 'topology dikhao', 'آرکیٹیکچر', 'ٹوپولوجی', 'کلاؤڈ'],
    voiceConfirm: "چلیے! مائیکروسروسز میش ٹوپولوجی پر لے چلتی ہوں۔",
    romanConfirm: "Chaliye! Microservices Mesh Topology par le chalti hoon.",
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: ['code', 'core', 'kood', 'coding', 'codes', 'kord', 'inspector', 'algorithms', 'algorithm', 'typescript', 'sql', 'physics', 'code dikhao', 'coding dikhao', 'core per', 'code per', 'core per lekar ja', 'code per lekar ja', 'کوڈ', 'الگورتھم', 'کوڈنگ'],
    voiceConfirm: "جی بالکل! چلیے میں آپ کو پروڈکشن کوڈ انسپیکٹر اور الگورتھمز دکھاتی ہوں۔",
    romanConfirm: "Jee bilkul! Chaliye main aap ko production code inspector aur algorithms dikhati hoon.",
  },
  {
    id: 'api-playground',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: ['api', 'epi', 'a p i', 'playground', 'endpoint', 'endpoints', 'test', 'suite', 'request', 'rest', 'api dikhao', 'api chalao', 'api test', 'اے پی آئی', 'اے پی ائی', 'ٹیسٹ', 'سویٹ'],
    voiceConfirm: "جی ہاں! لائیو پروڈکشن API سویٹ حاضر ہے۔",
    romanConfirm: "Jee haan! Live production API suite hazir hai.",
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Cpu,
    color: '#06B6D4',
    keywords: ['skills', 'skill', 'tech', 'stack', 'technology', 'technologies', 'skills dikhao', 'skills per jao', 'stack dikhao', 'اسکلز', 'ٹیکنالوجی'],
    voiceConfirm: "جی! سمیر کے تمام ٹیکنیکل اسکلز کی لسٹ حاضر ہے۔",
    romanConfirm: "Jee! Sameer ke tamam technical skills ki list hazir hai.",
  },
  {
    id: 'tech-sphere',
    label: '3D Matrix',
    icon: Compass,
    color: '#F59E0B',
    keywords: ['matrix', 'sphere', '3d', 'globe', 'interactive', '3d dikhao', 'matrix dikhao', 'تھری ڈی', 'میٹرکس'],
    voiceConfirm: "چلیے! تھری ڈی انٹرایکٹو میٹرکس دکھاتی ہوں۔",
    romanConfirm: "Chaliye! 3D Interactive Matrix dikhati hoon.",
  },
  {
    id: 'terminal',
    label: 'CLI Terminal',
    icon: Terminal,
    color: '#A855F7',
    keywords: ['terminal', 'tarminus', 'cli', 'shell', 'bash', 'console', 'command', 'terminal dikhao', 'terminal kholo', 'cli dikhao', 'ٹرمینل', 'سی ایل آئی', 'شیل'],
    voiceConfirm: "جی! ڈویلپر سی ایل آئی ٹرمینل اوپن کر دیا ہے۔",
    romanConfirm: "Jee! Developer CLI terminal open kar diya hai.",
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#00FFE0',
    keywords: ['contact', 'kontact', 'hire', 'talk', 'email', 'mail', 'connect', 'message', 'baat', 'rabta', 'contact dikhao', 'rabta karna hai', 'email dikhao', 'رابطہ', 'ای میل', 'بات'],
    voiceConfirm: "سمیر سے رابطہ کرنا ہے؟ چلیے میں آپ کو کانٹیکٹ فارم پر لے چلتی ہوں۔",
    romanConfirm: "Sameer se rabta karna hai? Chaliye main aap ko contact form par le chalti hoon.",
  },
  {
    id: 'hero',
    label: 'Top',
    icon: ArrowRight,
    color: '#00F2FE',
    keywords: ['upar', 'top', 'hero', 'home', 'shuru', 'start', 'wapas', 'upar jao', 'main', 'اوپر', 'ہیرو', 'شروع'],
    voiceConfirm: "واپس اوپر ہیرو سیکشن پر آ گئے ہیں۔",
    romanConfirm: "Wapas upar hero section par aa gaye hain.",
  },
];

// Required Initial Greeting in Pakistani Urdu
const INITIAL_GREETING_URDU = "خوش آمدید! میں سمیر حسین کی اسسٹنٹ ہوں۔ آپ کو اس پورٹ فولیو کے کون سے حصے پر لے کر جاؤں؟";
const INITIAL_GREETING_ROMAN = "Khushamdeed! Main Sameer Hussain ki assistant hoon. Aap ko is portfolio ke kon se hisse per le kar jaaun?";

// Comprehensive Portfolio Information in Pakistani Urdu
const PORTFOLIO_INFO_URDU = "سمیر حسین ایک سینئر فل اسٹیک اور کلاؤڈ سسٹمز آرکیٹیکٹ ہیں۔ اس پورٹ فولیو میں سمیر کی بلٹ ان اوربٹ فلم، فلیگ شپ کلاؤڈ سسٹمز، مائیکروسروسز ٹوپولوجی، لائیو کوڈ انسپیکٹر، پروڈکشن API سوٹ، اور انٹرایکٹو ٹرمینل شامل ہیں۔ آپ جس حصے کا کہیں گے میں آپ کو فوراً وہاں لے چلوں گی۔";
const PORTFOLIO_INFO_ROMAN = "Sameer Hussain aik senior full-stack aur cloud systems architect hain. Is portfolio mein Sameer ki 'Built in Orbit' film, flagship cloud systems, microservices topology, code inspector, API suite, aur interactive terminal shamil hain. Aap jis hisse ka kahein ge main aap ko foran wahan le chalu gi.";

export const CosmicAvatar = ({ size = 480, className = "" }) => {
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasSpokenWelcomeRef = useRef(false);
  const isListeningRef = useRef(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [audioJitter, setAudioJitter] = useState([12, 24, 18, 30, 16]);

  // Mouse tracking for realistic 3D parallax tilt
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

  // Equalizer animation for microphone in studio
  useEffect(() => {
    const interval = setInterval(() => {
      const multiplier = isSpeaking ? 1.8 : isListening ? 1.3 : 0.8;
      setAudioJitter([
        Math.floor((8 + Math.random() * 16) * multiplier),
        Math.floor((14 + Math.random() * 20) * multiplier),
        Math.floor((18 + Math.random() * 22) * multiplier),
        Math.floor((12 + Math.random() * 18) * multiplier),
        Math.floor((6 + Math.random() * 14) * multiplier),
      ]);
    }, isSpeaking ? 90 : 200);
    return () => clearInterval(interval);
  }, [isSpeaking, isListening]);

  // Natural Pakistani Urdu Speech Synthesis Engine (Normal Clear Speed)
  const speak = useCallback((urduText, romanText = '') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4000);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(romanText || urduText);
      const voices = window.speechSynthesis.getVoices();

      // Look for natural female / Pakistani Urdu voices
      const preferredVoice =
        voices.find((v) => (v.lang.includes('ur') || v.lang.includes('hi')) && !v.name.includes('Hemant')) ||
        voices.find((v) => (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Natural'))) ||
        voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.18; // Warm, polite, feminine Pakistani Urdu presenter voice
      utterance.rate = 0.88; // Normal, crystal-clear understandable cadence

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3500);
    }
  }, []);

  // Multi-Strategy Teleport Navigation Function (100% Reliable Scrolling)
  const teleportTo = useCallback(
    (targetId, voiceConfirmText, romanConfirmText = '') => {
      // 1. Announce verbally in Pakistani Urdu
      speak(voiceConfirmText, romanConfirmText);

      // 2. Perform direct scroll with navbar offset
      const executeScroll = () => {
        let el = document.getElementById(targetId);

        if (!el && (targetId === 'systems' || targetId === 'projects')) {
          el = document.getElementById('systems') || document.getElementById('projects');
        }
        if (!el && (targetId === 'skills' || targetId === 'tech-sphere')) {
          el = document.getElementById('skills') || document.getElementById('tech-sphere');
        }
        if (!el) {
          el = document.querySelector(`[data-section="${targetId}"]`);
        }

        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const targetOffset = Math.max(0, rect.top + scrollTop - 85);

        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth',
        });

        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (e) {}

        try {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `#${targetId}`);
          }
        } catch (e) {}

        try {
          el.style.transition = 'box-shadow 0.6s ease, outline 0.6s ease';
          el.style.outline = '2px solid rgba(0, 242, 254, 0.9)';
          el.style.boxShadow = '0 0 50px rgba(0, 242, 254, 0.5)';
          setTimeout(() => {
            el.style.outline = '';
            el.style.boxShadow = '';
          }, 2500);
        } catch (e) {}
      };

      executeScroll();
      setTimeout(executeScroll, 320);
    },
    [speak]
  );

  // Automatic Speech Recognition (Listens Automatically without any Button)
  const initAutoVoiceRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'en-US';
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
      };

      recognition.onresult = (event) => {
        const lastIndex = event.results.length - 1;
        const rawTranscript = event.results[lastIndex][0].transcript.toLowerCase();
        const cleanTranscript = rawTranscript.replace(/[.,?!]/g, '').trim();

        // Check 1: User asking for All Portfolio Information
        const isInfoQuery =
          cleanTranscript.includes('information') ||
          cleanTranscript.includes('informashan') ||
          cleanTranscript.includes('detail') ||
          cleanTranscript.includes('kya kya hai') ||
          cleanTranscript.includes('baray mein batao') ||
          cleanTranscript.includes('bare me batao') ||
          cleanTranscript.includes('batao') ||
          cleanTranscript.includes('sameer kaun hai') ||
          cleanTranscript.includes('about');

        if (isInfoQuery) {
          speak(PORTFOLIO_INFO_URDU, PORTFOLIO_INFO_ROMAN);
          return;
        }

        // Check 2: User asking for Systems / Projects
        const isSystemsQuery =
          cleanTranscript.includes('system') ||
          cleanTranscript.includes('sistem') ||
          cleanTranscript.includes('sustam') ||
          cleanTranscript.includes('sistim') ||
          cleanTranscript.includes('assistant') ||
          cleanTranscript.includes('assistance') ||
          cleanTranscript.includes('project') ||
          cleanTranscript.includes('kam') ||
          cleanTranscript.includes('kaam') ||
          cleanTranscript.includes('platform');

        if (isSystemsQuery) {
          const sysTarget = NAV_TARGETS.find((t) => t.id === 'projects');
          if (sysTarget) {
            teleportTo(sysTarget.id, sysTarget.voiceConfirm, sysTarget.romanConfirm);
            return;
          }
        }

        // Check 3: Check all keywords in NAV_TARGETS
        const matched = NAV_TARGETS.find((target) =>
          target.keywords.some((kw) => cleanTranscript.includes(kw.toLowerCase()))
        );

        if (matched) {
          teleportTo(matched.id, matched.voiceConfirm, matched.romanConfirm);
          return;
        }

        // Check 4: General navigation intention -> Teleport to systems
        const generalNavWords = ['lekar ja', 'le kar ja', 'le jao', 'dikhao', 'chalo', 'kholo', 'jana hai', 'go to', 'take me', 'show'];
        if (generalNavWords.some((word) => cleanTranscript.includes(word))) {
          const sysTarget = NAV_TARGETS.find((t) => t.id === 'projects');
          if (sysTarget) {
            teleportTo(sysTarget.id, sysTarget.voiceConfirm, sysTarget.romanConfirm);
          }
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        isListeningRef.current = false;
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
        setTimeout(() => {
          try {
            if (recognitionRef.current && !isListeningRef.current) {
              recognitionRef.current.start();
            }
          } catch (e) {}
        }, 1200);
      };

      recognition.start();
    } catch (err) {}
  }, [speak, teleportTo]);

  // Automatic Welcome Greeting on Page Load / First User Gesture (Autoplay Policy Safe)
  useEffect(() => {
    const triggerWelcome = () => {
      if (hasSpokenWelcomeRef.current) return;
      hasSpokenWelcomeRef.current = true;
      speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN);
      initAutoVoiceRecognition();
    };

    try {
      triggerWelcome();
    } catch (e) {}

    const interactionEvents = ['click', 'touchstart', 'keydown', 'scroll'];
    const handleFirstInteraction = () => {
      triggerWelcome();
      interactionEvents.forEach((evt) => window.removeEventListener(evt, handleFirstInteraction));
    };

    interactionEvents.forEach((evt) => window.addEventListener(evt, handleFirstInteraction, { passive: true }));
    return () => {
      interactionEvents.forEach((evt) => window.removeEventListener(evt, handleFirstInteraction));
    };
  }, [speak, initAutoVoiceRecognition]);

  // User can click on Anchor to hear greeting / guidance
  const handleAvatarClick = () => {
    speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN);
    initAutoVoiceRecognition();
  };

  const tiltX = mousePos.y * -9;
  const tiltY = mousePos.x * 12;

  return (
    <div className="flex flex-col items-center relative w-full select-none">
      {/* Main 3D Pixar News Presenter Studio Canvas */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        className={`relative flex items-center justify-center cursor-pointer group ${className}`}
        style={{
          width: size,
          height: Math.round(size * 1.15),
          perspective: '1200px',
        }}
        title="میں سمیر حسین کی اسسٹنٹ ہوں۔ مجھے کلک کریں یا بتائیں کہاں جانا ہے!"
      >
        {/* 1. Deep Core Ambient Studio Spotlight Nebula */}
        <div
          className={`absolute rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
            isSpeaking || isListening
              ? 'scale-135 opacity-95'
              : isHovered
              ? 'scale-120 opacity-85'
              : 'opacity-70'
          }`}
          style={{
            width: size * 0.85,
            height: size * 0.85,
            background: 'radial-gradient(circle, #00F2FE 0%, #7928CA 40%, rgba(0, 242, 254, 0) 75%)',
            animation: 'pulseSlow 4s infinite ease-in-out',
          }}
        />

        {/* 2. Orbiting Floating Tech Badges */}
        {ORBITING_TECH.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const xOffset = Math.cos(rad) * (tech.radius * 0.95);
          const yOffset = Math.sin(rad) * (tech.radius * 0.78);

          return (
            <div
              key={i}
              className="absolute z-20 pointer-events-none sm:pointer-events-auto transition-transform hover:scale-125"
              style={{
                transform: `translate(${xOffset}px, ${yOffset}px)`,
                animation: `orbitFloat 3.8s ease-in-out infinite ${i * 0.6}s`,
              }}
            >
              <div
                className="px-3 py-1 rounded-full font-mono text-[10px] font-bold tracking-wider bg-space-950/95 border backdrop-blur-xl shadow-lg flex items-center space-x-1.5 transition-all"
                style={{
                  borderColor: `${tech.color}70`,
                  color: tech.color,
                  boxShadow: `0 0 15px ${tech.color}35`,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                <span>{tech.label}</span>
              </div>
            </div>
          );
        })}

        {/* 3. 3D Pixar News Presenter Character Card Stage */}
        <div
          className="relative z-10 w-full max-w-[420px] rounded-3xl overflow-hidden border border-energy-teal/35 bg-space-900/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,242,254,0.2)] transition-transform duration-200 ease-out group-hover:border-energy-teal/70"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(25px)`,
            animation: 'avatarLevitate 4.5s ease-in-out infinite',
          }}
        >
          {/* Top Holographic Broadcast Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-space-950/80 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <span className="font-mono text-[10px] font-black text-white tracking-widest uppercase">
                LIVE BROADCAST // DEV-75 STUDIO
              </span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-[10px] text-slate-400">
              <Radio className="w-3 h-3 text-energy-teal animate-pulse" />
              <span>AYLA // SAMEER'S AI PRESENTER</span>
            </div>
          </div>

          {/* High-Resolution 3D Pixar News Anchor Character Image */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-space-950">
            <img
              src="/media/news_anchor.jpg"
              alt="3D Pixar Style Female News Anchor"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Ambient Studio Lighting Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Dynamic Soundwave Equalizer Rings on Studio Microphone */}
            {(isSpeaking || isListening) && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-end justify-center space-x-1 pointer-events-none z-10 px-4 py-1.5 rounded-full bg-space-950/80 border border-energy-teal/40 backdrop-blur-md shadow-lg">
                <span className="font-mono text-[10px] font-bold text-energy-teal mr-1">
                  {isSpeaking ? '🔊 BOL RAHI HOON' : '🎙️ SUN RAHI HOON'}
                </span>
                {audioJitter.map((h, idx) => (
                  <span
                    key={idx}
                    className="w-1 bg-energy-cyan rounded-full transition-all duration-75"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Broadcast Desk Footer with Title Plate */}
          <div className="px-5 py-3 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-sans text-xs font-bold text-white tracking-wide">
                آئیلا (Ayla) — خودمختار AI معاون
              </p>
              <p className="font-mono text-[10px] text-energy-cyan/90">
                Senior Systems & Full-Stack Architect Dispatcher
              </p>
            </div>

            <div className="flex items-center space-x-1 text-energy-teal">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="font-mono text-[10px] font-semibold">100% ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Teleportation Horizontal Strip (All Bulky Boxes, Modes & Speak Buttons Permanently Removed!) */}
      <div className="flex flex-col items-center gap-2 mt-4 z-20 w-full max-w-xl">
        {/* Subtle Live Audio Status indicator */}
        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300 font-semibold">
            {isListening ? '🎙️ خودکار سن رہی ہوں (کوئی بٹن دبانے کی ضرورت نہیں)' : isSpeaking ? '🔊 بول رہی ہوں...' : '🌸 آئیلا آن لائن ہے — بس بولیں یا نیچے کلک کریں'}
          </span>
        </div>

        {/* 1-Click Teleportation Horizontal Pills */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-2 max-w-full">
            {NAV_TARGETS.map((tgt) => {
              const Icon = tgt.icon;
              return (
                <button
                  key={tgt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    teleportTo(tgt.id, tgt.voiceConfirm, tgt.romanConfirm);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-space-950/90 border border-slate-800/80 hover:border-energy-teal font-mono text-[11px] font-semibold text-slate-300 hover:text-white flex items-center space-x-1.5 transition-all whitespace-nowrap active:scale-95 shadow-sm hover:scale-105"
                  style={{
                    borderColor: `${tgt.color}35`,
                  }}
                  title={`Teleport to ${tgt.label}`}
                >
                  <Icon className="w-3 h-3" style={{ color: tgt.color }} />
                  <span>{tgt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes avatarLevitate {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(-1deg);
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