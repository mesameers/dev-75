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
  ArrowRight
} from 'lucide-react';

const ORBITING_TECH = [
  { label: 'React 18', angle: 0, radius: 215, tilt: 65, color: '#00F2FE' },
  { label: 'Supabase', angle: 60, radius: 235, tilt: -45, color: '#10B981' },
  { label: 'PostgreSQL', angle: 120, radius: 210, tilt: 55, color: '#38BDF8' },
  { label: 'Node.js', angle: 180, radius: 230, tilt: -60, color: '#8B5CF6' },
  { label: 'TypeScript', angle: 240, radius: 215, tilt: 40, color: '#00FFE0' },
  { label: 'Remotion', angle: 300, radius: 240, tilt: -50, color: '#EC4899' },
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

  // Animated Girl Facial Expressions
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthShape, setMouthShape] = useState(0); // 0: closed smile, 1: talking, 2: open
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Natural Blinking Interval
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 170);
    }, 3800);
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
    }, 140);
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

  // Natural Pakistani Urdu Speech Synthesis Engine (Normal Clear Speed)
  const speak = useCallback((urduText, romanText = '') => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 4000);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // Utterance with Pakistani Urdu text
      const utterance = new SpeechSynthesisUtterance(romanText || urduText);
      const voices = window.speechSynthesis.getVoices();

      // Look for natural female / Urdu voice
      const preferredVoice =
        voices.find((v) => (v.lang.includes('ur') || v.lang.includes('hi')) && !v.name.includes('Hemant')) ||
        voices.find((v) => (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Natural'))) ||
        voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.2; // Natural, polite, feminine Pakistani Urdu tone
      utterance.rate = 0.88; // Normal, crystal-clear understandable speed

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

        // Aliases fallback (e.g. systems <-> projects, skills <-> tech-sphere)
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

        // A. Primary Window Scroll
        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth',
        });

        // B. Secondary Element scrollIntoView fallback
        try {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (e) {}

        // C. Update URL hash
        try {
          if (window.history && window.history.pushState) {
            window.history.pushState(null, '', `#${targetId}`);
          }
        } catch (e) {}

        // D. Visual Cyber Highlight Pulse on Arrival
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
      recognition.lang = 'en-US'; // Multilingual phonetic engine for Roman Urdu & Pakistani pronunciation
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
        // Automatically restart listening continuously in the background
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

    // Attempt automatic speech immediately
    try {
      triggerWelcome();
    } catch (e) {}

    // Fallback on first browser interaction (for browsers requiring user gesture)
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

  // User can also click on Ayla to trigger her speech / info
  const handleAvatarClick = () => {
    speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN);
    initAutoVoiceRecognition();
  };

  const tiltX = mousePos.y * -12;
  const tiltY = mousePos.x * 16;
  const pupilX = mousePos.x * 3.5;
  const pupilY = mousePos.y * 2.5;

  return (
    <div className="flex flex-col items-center relative w-full select-none">
      {/* Main 3D Animated Cyber AI Girl Avatar Canvas with Complete Figure, Beautiful Dress, Hands & Feet */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        className={`relative flex items-center justify-center cursor-pointer group ${className}`}
        style={{
          width: size,
          height: Math.round(size * 1.25),
          perspective: '1200px',
        }}
        title="میں سمیر حسین کی اسسٹنٹ ہوں۔ مجھے کلک کریں یا بتائیں کہاں جانا ہے!"
      >
        {/* 1. Deep Core Gravitational Quantum Nebula */}
        <div
          className={`absolute rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
            isSpeaking || isListening
              ? 'scale-140 opacity-95'
              : isHovered
              ? 'scale-120 opacity-85'
              : 'opacity-70'
          }`}
          style={{
            width: size * 0.85,
            height: size * 0.85,
            background: 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
            animation: 'pulseSlow 3.5s infinite ease-in-out',
          }}
        />

        {/* 2. Interactive Soundwave Ripple Rings When Speaking / Listening */}
        {(isSpeaking || isListening) && (
          <>
            <div
              className="absolute rounded-full border-2 pointer-events-none animate-soundwave"
              style={{
                width: size * 0.7,
                height: size * 0.7,
                borderColor: '#00F2FE80',
              }}
            />
            <div
              className="absolute rounded-full border pointer-events-none animate-soundwave-delayed"
              style={{
                width: size * 0.9,
                height: size * 0.9,
                borderColor: '#00F2FE40',
              }}
            />
          </>
        )}

        {/* 3. Outer 3D Gyroscopic Gimbal Orbit Rings */}
        <div
          className="absolute rounded-full border pointer-events-none transition-all duration-500"
          style={{
            width: size * 0.98,
            height: size * 0.98,
            borderColor: '#00F2FE30',
            boxShadow: '0 0 30px #00F2FE20',
            animation: 'spinClockwise 24s linear infinite',
          }}
        />
        <div
          className="absolute rounded-full border pointer-events-none transition-all duration-500"
          style={{
            width: size * 0.88,
            height: size * 0.88,
            borderColor: '#00F2FE40',
            borderStyle: 'dashed',
            animation: 'spinCounterClockwise 18s linear infinite',
          }}
        />

        {/* 4. Orbiting Floating Tech Badges */}
        {ORBITING_TECH.map((tech, i) => {
          const rad = (tech.angle * Math.PI) / 180;
          const xOffset = Math.cos(rad) * (tech.radius * 0.95);
          const yOffset = Math.sin(rad) * (tech.radius * 0.82);

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

        {/* 5. Complete 3D Animated Cyber Anime Girl with Beautiful Dress, Hands & Feet */}
        <div
          className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(35px)`,
            animation: 'avatarLevitate 4.5s ease-in-out infinite',
          }}
        >
          {/* Complete Girl Full Figure Vector SVG with Hands & Feet */}
          <svg
            width={size * 0.88}
            height={Math.round(size * 1.22)}
            viewBox="0 0 280 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
          >
            <defs>
              {/* Skin Tone Gradient */}
              <linearGradient id="girlSkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF4ED" />
                <stop offset="65%" stopColor="#FFE3D3" />
                <stop offset="100%" stopColor="#F7C6B0" />
              </linearGradient>

              {/* Glowing Hair Gradient */}
              <linearGradient id="girlHairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00FFE0" />
                <stop offset="45%" stopColor="#00F2FE" />
                <stop offset="100%" stopColor="#7928CA" />
              </linearGradient>

              {/* Eye Iris Gradient */}
              <radialGradient id="girlEyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#00F2FE" />
                <stop offset="85%" stopColor="#0B132B" />
                <stop offset="100%" stopColor="#02040A" />
              </radialGradient>

              {/* Beautiful Dress Main Gradient (Deep Space Silk) */}
              <linearGradient id="dressMainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1B2234" />
                <stop offset="40%" stopColor="#0E1424" />
                <stop offset="80%" stopColor="#070B14" />
                <stop offset="100%" stopColor="#02040A" />
              </linearGradient>

              {/* Dress Glowing Accent Gradient */}
              <linearGradient id="dressAccentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" />
                <stop offset="50%" stopColor="#7928CA" />
                <stop offset="100%" stopColor="#00FFE0" />
              </linearGradient>

              {/* Translucent Ruffle Sleeves Gradient */}
              <linearGradient id="ruffleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.75" />
                <stop offset="60%" stopColor="#7928CA" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00FFE0" stopOpacity="0.15" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="aylaGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Back Flowing Hair Locks */}
            <path
              d="M75 90 C35 150 40 240 65 310 C85 270 90 200 92 135 Z"
              fill="url(#girlHairGrad)"
              opacity="0.95"
            />
            <path
              d="M205 90 C245 150 240 240 215 310 C195 270 190 200 188 135 Z"
              fill="url(#girlHairGrad)"
              opacity="0.95"
            />

            {/* Back Floating Anime Ribbon Bow Tails */}
            <path
              d="M125 240 C110 270 95 330 85 365 C100 355 118 310 130 260 Z"
              fill="url(#dressAccentGrad)"
              opacity="0.8"
            />
            <path
              d="M155 240 C170 270 185 330 195 365 C180 355 162 310 150 260 Z"
              fill="url(#dressAccentGrad)"
              opacity="0.8"
            />

            {/* ----------------- FEET & LEGS (Visible beneath the gown hem) ----------------- */}
            {/* Left Leg in Cyber Stocking */}
            <path
              d="M118 385 L116 438 L126 438 L128 385 Z"
              fill="#080C16"
              stroke="#00F2FE40"
              strokeWidth="1"
            />
            {/* Left High-Heel Cyber Boot / Foot */}
            <path
              d="M112 438 L114 456 L128 456 L128 438 Z"
              fill="#0E1626"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />
            {/* Left Glowing Boot Sole */}
            <path d="M112 456 L128 456" stroke="#00F2FE" strokeWidth="2.5" filter="url(#aylaGlow)" />

            {/* Right Leg in Cyber Stocking */}
            <path
              d="M152 385 L154 438 L164 438 L162 385 Z"
              fill="#080C16"
              stroke="#00F2FE40"
              strokeWidth="1"
            />
            {/* Right High-Heel Cyber Boot / Foot */}
            <path
              d="M152 438 L152 456 L166 456 L168 438 Z"
              fill="#0E1626"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />
            {/* Right Glowing Boot Sole */}
            <path d="M152 456 L168 456" stroke="#00F2FE" strokeWidth="2.5" filter="url(#aylaGlow)" />

            {/* ----------------- BEAUTIFUL DRESS SKIRT & GOWN ----------------- */}
            {/* Underskirt Layer */}
            <path
              d="M105 240 C90 270 60 320 40 395 C80 410 200 410 240 395 C220 320 190 270 175 240 Z"
              fill="url(#dressMainGrad)"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />

            {/* Flowing Pleated Dress Folds */}
            <path
              d="M115 245 C95 290 70 345 55 400 C75 408 105 410 120 405 C115 350 118 290 125 245 Z"
              fill="#121A2D"
              opacity="0.8"
            />
            <path
              d="M165 245 C185 290 210 345 225 400 C205 408 175 410 160 405 C165 350 162 290 155 245 Z"
              fill="#121A2D"
              opacity="0.8"
            />
            <path
              d="M130 245 C125 300 120 360 115 408 C130 412 150 412 165 408 C160 360 155 300 150 245 Z"
              fill="#19233C"
              stroke="#00F2FE40"
              strokeWidth="1"
            />

            {/* Glowing Cyber Circuit Trims & Scalloped Hemline */}
            <path
              d="M40 395 Q140 425 240 395"
              stroke="#00F2FE"
              strokeWidth="3"
              fill="none"
              filter="url(#aylaGlow)"
            />
            <path
              d="M50 402 Q140 430 230 402"
              stroke="#00FFE0"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />

            {/* Vertical Fiber-Optic Pinstripes */}
            <path d="M120 250 Q105 320 85 390" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <path d="M160 250 Q175 320 195 390" stroke="#00F2FE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <path d="M140 250 L140 400" stroke="#00F2FE" strokeWidth="1.5" opacity="0.9" filter="url(#aylaGlow)" />

            {/* Elegant Cyber Corset Bodice */}
            <path
              d="M100 178 C95 200 102 235 106 242 C115 246 165 246 174 242 C178 235 185 200 180 178 C165 185 150 185 140 180 C130 185 115 185 100 178 Z"
              fill="url(#dressMainGrad)"
              stroke="#00F2FE"
              strokeWidth="2"
            />
            <path d="M122 184 L124 243" stroke="#00F2FE90" strokeWidth="1.5" />
            <path d="M158 184 L156 243" stroke="#00F2FE90" strokeWidth="1.5" />

            {/* Glowing Center Quantum Heart on Bodice */}
            <circle cx="140" cy="205" r="5.5" fill="#00F2FE" filter="url(#aylaGlow)">
              <animate attributeName="r" values="4.5;6.5;4.5" dur="1.3s" repeatCount="indefinite" />
            </circle>

            {/* Waist Ribbon & Bow */}
            <path
              d="M104 238 C120 243 160 243 176 238 L176 245 C160 249 120 249 104 245 Z"
              fill="#00F2FE"
              filter="url(#aylaGlow)"
            />
            <circle cx="140" cy="242" r="4" fill="#FFFFFF" />

            {/* ----------------- HANDS & ARMS (Slender & Graceful) ----------------- */}
            {/* Left Arm & Forearm */}
            <path
              d="M98 182 C85 210 82 245 92 270 C97 274 102 268 100 260 C92 235 96 205 106 186 Z"
              fill="url(#girlSkinGrad)"
            />
            {/* Left Hand & Fingers (Resting gracefully on waist/dress) */}
            <path
              d="M92 270 C94 282 104 285 108 278 C108 274 104 270 98 268 Z"
              fill="url(#girlSkinGrad)"
              stroke="#F7C6B0"
              strokeWidth="1"
            />
            {/* Left Cyber Wrist Bracelet */}
            <ellipse cx="94" cy="268" rx="5" ry="2.5" fill="#0E1424" stroke="#00F2FE" strokeWidth="1.5" />

            {/* Right Arm & Forearm */}
            <path
              d="M182 182 C195 210 198 245 188 270 C183 274 178 268 180 260 C188 235 184 205 174 186 Z"
              fill="url(#girlSkinGrad)"
            />
            {/* Right Hand & Fingers (Resting gracefully on waist/dress) */}
            <path
              d="M188 270 C186 282 176 285 172 278 C172 274 176 270 182 268 Z"
              fill="url(#girlSkinGrad)"
              stroke="#F7C6B0"
              strokeWidth="1"
            />
            {/* Right Cyber Wrist Bracelet */}
            <ellipse cx="186" cy="268" rx="5" ry="2.5" fill="#0E1424" stroke="#00F2FE" strokeWidth="1.5" />

            {/* Translucent Off-Shoulder Cyber Ruffles */}
            <path
              d="M85 180 C80 195 95 205 106 195 C115 188 105 175 92 175 Z"
              fill="url(#ruffleGrad)"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />
            <path
              d="M195 180 C200 195 185 205 174 195 C165 188 175 175 188 175 Z"
              fill="url(#ruffleGrad)"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />

            {/* Slender Neck & Velvet Choker */}
            <path
              d="M125 142 L125 170 C132 174 148 174 155 170 L155 142 Z"
              fill="url(#girlSkinGrad)"
            />
            <path
              d="M123 158 C130 162 150 162 157 158 L157 165 C150 168 130 168 123 165 Z"
              fill="#060913"
              stroke="#00F2FE"
              strokeWidth="1.5"
            />
            <circle cx="140" cy="162" r="3.5" fill="#00F2FE" filter="url(#aylaGlow)" />

            {/* ----------------- CUTE ANIME FACE & EXPRESSIONS ----------------- */}
            <path
              d="M95 95 C95 138 115 156 140 158 C165 156 185 138 185 95 C185 58 165 52 140 52 C115 52 95 58 95 95 Z"
              fill="url(#girlSkinGrad)"
            />

            {/* Soft Rosy Kawaii Cheek Blush */}
            <ellipse cx="108" cy="118" rx="9" ry="5" fill="#FF4D8D" opacity="0.45" filter="url(#aylaGlow)" />
            <ellipse cx="172" cy="118" rx="9" ry="5" fill="#FF4D8D" opacity="0.45" filter="url(#aylaGlow)" />
            <circle cx="104" cy="122" r="2" fill="#00F2FE" opacity="0.8" />
            <circle cx="176" cy="122" r="2" fill="#00F2FE" opacity="0.8" />

            {/* Expressive Anime Eyes with Gaze Tracking & Blinking */}
            {!isBlinking ? (
              <g>
                <ellipse cx="114" cy="104" rx="14" ry="16" fill="#FFFFFF" />
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="114" cy="104" rx="9.5" ry="12.5" fill="url(#girlEyeGrad)" filter="url(#aylaGlow)" />
                  <ellipse cx="114" cy="104" rx="4.5" ry="6.5" fill="#02040A" />
                  <circle cx="111" cy="100" r="3.5" fill="#FFFFFF" />
                  <circle cx="116" cy="107" r="1.8" fill="#FFFFFF" />
                </g>
                <path d="M98 96 C106 88 122 88 130 96" stroke="#0B132B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M98 96 L94 91" stroke="#0B132B" strokeWidth="2.2" strokeLinecap="round" />

                <ellipse cx="166" cy="104" rx="14" ry="16" fill="#FFFFFF" />
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="166" cy="104" rx="9.5" ry="12.5" fill="url(#girlEyeGrad)" filter="url(#aylaGlow)" />
                  <ellipse cx="166" cy="104" rx="4.5" ry="6.5" fill="#02040A" />
                  <circle cx="163" cy="100" r="3.5" fill="#FFFFFF" />
                  <circle cx="168" cy="107" r="1.8" fill="#FFFFFF" />
                </g>
                <path d="M150 96 C158 88 174 88 182 96" stroke="#0B132B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M182 96 L186 91" stroke="#0B132B" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ) : (
              <g>
                <path d="M100 104 Q114 112 128 104" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M152 104 Q166 112 180 104" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            <circle cx="140" cy="120" r="1.6" fill="#E59877" />

            {/* Dynamic Lip-Sync Mouth with Soft Pink Lips */}
            {mouthShape === 0 ? (
              <path d="M132 136 Q140 142 148 136" stroke="#FF4D8D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            ) : mouthShape === 1 ? (
              <ellipse cx="140" cy="138" rx="6" ry="4" fill="#FF4D8D" />
            ) : (
              <path d="M132 135 Q140 146 148 135 Q140 140 132 135 Z" fill="#D15672" stroke="#FF4D8D" strokeWidth="1" />
            )}

            {/* Front Bangs & Cyber Headset */}
            <path
              d="M96 68 C115 50 165 50 184 68 C185 85 180 105 178 115 C170 95 160 85 150 82 C145 95 135 110 130 115 C125 100 118 85 105 85 C100 95 98 108 96 115 Z"
              fill="url(#girlHairGrad)"
            />

            <path
              d="M80 82 C90 40 190 40 200 82"
              stroke="#0E1624"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M80 82 C90 40 190 40 200 82"
              stroke="#00F2FE"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#aylaGlow)"
            />

            {/* Left Cat-Ear Equalizer */}
            <ellipse cx="78" cy="85" rx="10" ry="16" fill="#04060A" stroke="#00F2FE" strokeWidth="2.5" />
            <g transform="translate(73, 76)">
              <rect x="0" y="4" width="2" height="10" rx="1" fill="#00F2FE" />
              <rect x="3" y="1" width="2" height="14" rx="1" fill="#00F2FE" />
              <rect x="6" y="3" width="2" height="11" rx="1" fill="#00F2FE" />
            </g>

            {/* Right Cat-Ear Equalizer & Boom Mic */}
            <ellipse cx="202" cy="85" rx="10" ry="16" fill="#04060A" stroke="#00F2FE" strokeWidth="2.5" />
            <path
              d="M202 92 C196 115 175 135 156 138"
              stroke="#00F2FE"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="154" cy="138" r="3.5" fill="#00F2FE" filter="url(#aylaGlow)">
              <animate attributeName="r" values="3;4.8;3" dur="1.1s" repeatCount="indefinite" />
            </circle>

            {/* Sparkles around Dress */}
            <polygon points="65,290 68,298 76,301 68,304 65,312 62,304 54,301 62,298" fill="#00F2FE" opacity="0.8" filter="url(#aylaGlow)" />
            <polygon points="215,280 218,286 224,289 218,292 215,298 212,292 206,289 212,286" fill="#00FFE0" opacity="0.8" filter="url(#aylaGlow)" />
          </svg>

          {/* Dynamic Grounding Contact Shadow */}
          <div
            className="w-56 h-6 rounded-full pointer-events-none mt-1"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(0, 242, 254, 0.8) 0%, rgba(121, 40, 202, 0.25) 50%, transparent 75%)',
              filter: 'blur(8px)',
              animation: 'shadowPulse 4.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Clean Teleportation Horizontal Strip (All Bulky Boxes, Modes & Speak Buttons Permanently Removed!) */}
      <div className="flex flex-col items-center gap-2 mt-2 z-20 w-full max-w-xl">
        {/* Subtle Live Audio Status indicator */}
        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300 font-semibold">
            {isListening ? '🎙️ آٹومیٹک مائیک سن رہا ہے...' : isSpeaking ? '🔊 بول رہی ہوں...' : '🌸 آئیلا لائیو اسسٹنٹ (خودکار)'}
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
            transform: translateY(-16px) rotate(-1.5deg);
          }
        }
        @keyframes shadowPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(0.8);
            opacity: 0.35;
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