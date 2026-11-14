import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Film,
  Layers,
  Code2,
  Cpu,
  Zap,
  Terminal,
  Mail,
  Activity,
  Compass,
  ArrowRight,
  Radio,
  Sparkles
} from 'lucide-react';

// Navigation Targets for Direct Click & Voice Dispatch
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: ['film', 'flim', 'filam', 'video', 'movie', 'cinema', 'built in orbit', 'film dikhao', 'video dikhao'],
    voiceConfirm: "چلیے! سمیر کی 'بلٹ ان اوربٹ' فلم سنیما پر چلتے ہیں۔",
    romanConfirm: "Chaliye! Sameer ki 'Built in Orbit' film cinema per chaltay hain.",
  },
  {
    id: 'projects',
    alias: 'systems',
    label: 'Systems',
    icon: Layers,
    color: '#10B981',
    // STRICT keywords: Excluded 'assistant' to prevent self-voice echo loop
    keywords: [
      'system', 'systems', 'sistem', 'sistems', 'sustam',
      'project', 'projects', 'projeck', 'projekts', 'featured',
      'platform', 'platforms', 'kam', 'kaam', 'system dikhao',
      'systems dikhao', 'projects dikhao', 'kam dikhao'
    ],
    voiceConfirm: "جی ضرور! چلیے میں آپ کو سمیر کے سسٹمز اور پروجیکٹس پر لے چلتی ہوں۔",
    romanConfirm: "Jee zaroor! Chaliye main aap ko Sameer ke systems aur projects par le kar chalti hoon.",
  },
  {
    id: 'architecture',
    label: 'Topology',
    icon: Activity,
    color: '#8B5CF6',
    keywords: ['architecture', 'topology', 'toplogy', 'mesh', 'microservices', 'microservice', 'cloud', 'cluster', 'topology dikhao'],
    voiceConfirm: "چلیے! مائیکروسروسز میش ٹوپولوجی پر لے چلتی ہوں۔",
    romanConfirm: "Chaliye! Microservices Mesh Topology par le chalti hoon.",
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: ['code', 'coding', 'inspector', 'algorithm', 'algorithms', 'typescript', 'sql', 'code dikhao', 'coding dikhao'],
    voiceConfirm: "جی بالکل! چلیے میں آپ کو پروڈکشن کوڈ انسپیکٹر دکھاتی ہوں۔",
    romanConfirm: "Jee bilkul! Chaliye main aap ko production code inspector dikhati hoon.",
  },
  {
    id: 'api-playground',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: ['api', 'api suite', 'playground', 'endpoint', 'endpoints', 'api test', 'api dikhao'],
    voiceConfirm: "جی ہاں! لائیو پروڈکشن API سویٹ حاضر ہے۔",
    romanConfirm: "Jee haan! Live production API suite hazir hai.",
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Cpu,
    color: '#06B6D4',
    keywords: ['skills', 'skill', 'tech stack', 'technologies', 'technology', 'tools', 'kya aata hai', 'skills dikhao'],
    voiceConfirm: "جی! سمیر کے تمام ٹیکنیکل اسکلز کی لسٹ حاضر ہے۔",
    romanConfirm: "Jee! Sameer ke tamam technical skills ki list hazir hai.",
  },
  {
    id: 'tech-sphere',
    label: '3D Matrix',
    icon: Compass,
    color: '#F59E0B',
    keywords: ['matrix', 'sphere', '3d', 'globe', '3d dikhao', 'matrix dikhao'],
    voiceConfirm: "چلیے! تھری ڈی انٹرایکٹو میٹرکس دکھاتی ہوں۔",
    romanConfirm: "Chaliye! 3D Interactive Matrix dikhati hoon.",
  },
  {
    id: 'terminal',
    label: 'CLI Terminal',
    icon: Terminal,
    color: '#A855F7',
    keywords: ['terminal', 'cli', 'shell', 'bash', 'console', 'command', 'terminal dikhao', 'terminal kholo'],
    voiceConfirm: "جی! ڈویلپر سی ایل آئی ٹرمینل اوپن کر دیا ہے۔",
    romanConfirm: "Jee! Developer CLI terminal open kar diya hai.",
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#00FFE0',
    keywords: ['contact', 'hire', 'email', 'mail', 'connect', 'message', 'rabta', 'baat karni hai', 'contact dikhao'],
    voiceConfirm: "سمیر سے رابطہ کرنا ہے؟ چلیے میں آپ کو کانٹیکٹ فارم پر لے چلتی ہوں۔",
    romanConfirm: "Sameer se rabta karna hai? Chaliye main aap ko contact form par le chalti hoon.",
  },
  {
    id: 'hero',
    label: 'Top',
    icon: ArrowRight,
    color: '#00F2FE',
    keywords: ['upar', 'top', 'hero', 'home', 'shuru', 'start', 'wapas', 'upar jao'],
    voiceConfirm: "ہم واپس اوپر ہیرو سیکشن پر آ گئے ہیں۔",
    romanConfirm: "Hum wapas upar hero section par aa gaye hain.",
  },
];

// Required Initial Greeting in Pakistani Urdu
const INITIAL_GREETING_URDU = "خوش آمدید! میں سمیر حسین کی اسسٹنٹ ہوں۔ آپ کو اس پورٹ فولیو کے کون سے حصے پر لے کر جاؤں؟";
const INITIAL_GREETING_ROMAN = "Khushamdeed! Main Sameer Hussain ki assistant hoon. Aap ko is portfolio ke kon se hisse per le kar jaaun?";

// Comprehensive Knowledge Base for Conversational AI Intelligence
const AI_KNOWLEDGE_BASE = [
  {
    intent: 'about_sameer',
    triggers: ['sameer', 'kaun hai', 'kon hai', 'who is', 'about sameer', 'developer', 'creator', 'sameer hussain'],
    urdu: "سمیر حسین ایک سینئر فل اسٹیک ڈویلپر اور کلاؤڈ سسٹمز آرکیٹیکٹ ہیں۔ وہ اسکیل ایبل کلاؤڈ پلیٹ فارمز، ہائی پرفارمنس APIs اور 3D ویب سسٹمز بناتے ہیں۔",
    roman: "Sameer Hussain aik senior full-stack developer aur cloud systems architect hain. Woh scalable cloud platforms, high-performance APIs aur 3D web systems banate hain.",
  },
  {
    intent: 'experience',
    triggers: ['experience', 'tajurba', 'kitna experience', 'career', 'background', 'work history'],
    urdu: "سمیر کو انٹرپرائز فل اسٹیک ڈویلپمنٹ، کلاؤڈ مائیکروسروسز اور ننانوے اعشاریہ نو نو فیصد اپ ٹائم سسٹمز کا وسیع تجربہ ہے۔",
    roman: "Sameer ko enterprise full-stack development, cloud microservices aur 99.99 percent uptime systems ka waseeh tajurba hai.",
  },
  {
    intent: 'identity',
    triggers: ['tum kaun ho', 'tum kon ho', 'aap kaun', 'who are you', 'what is your name', 'naam kya'],
    urdu: "میں آئیلا ہوں، سمیر حسین کی خودمختار AI اسسٹنٹ۔ میں آپ کو پورٹ فولیو کے ہر سیکشن اور پروجیکٹ کی معلومات دے سکتی ہوں۔",
    roman: "Main Ayla hoon, Sameer Hussain ki autonomous AI assistant. Main aap ko portfolio ke har section aur project ki maloomat de sakti hoon.",
  },
  {
    intent: 'greeting',
    triggers: ['salam', 'assalam', 'asalam', 'hello', 'hi', 'hey', 'adaab'],
    urdu: "وعلیکم السلام! میں آئیلا ہوں۔ فرمائیے میں سمیر کے پورٹ فولیو میں آپ کی کیا رہنمائی کروں؟",
    roman: "Walaikum Assalam! Main Ayla hoon. Farmaiye main Sameer ke portfolio mein aap ki kya rehnumai karoon?",
  },
  {
    intent: 'how_are_you',
    triggers: ['kaise ho', 'kaisi ho', 'kya haal', 'how are you', 'haal chal'],
    urdu: "الحمدللہ میں بالکل ٹھیک ہوں۔ آپ بتائیے، سمیر کا کون سا پروجیکٹ یا سسٹم دیکھنا پسند کریں گے؟",
    roman: "Alhamdulillah main bilkul theek hoon. Aap bataiye, Sameer ka kon sa project ya system dekhna pasand karein ge?",
  },
  {
    intent: 'thanks',
    triggers: ['shukriya', 'shukria', 'thanks', 'thank you', 'bohot shukriya', 'meherbani'],
    urdu: "آپ کا بہت شکریہ! اگر مزید کچھ پوچھنا ہو تو میں یہیں موجود ہوں۔",
    roman: "Aap ka bohot shukriya! Agar mazeed kuch poochna ho to main yaheen maujood hoon.",
  },
  {
    intent: 'goodbye',
    triggers: ['allah hafiz', 'khuda hafiz', 'bye', 'goodbye', 'alvida'],
    urdu: "اللہ حافظ! اپنا خیال رکھیے گا اور سمیر کے کام کا جائزہ ضرور لیجیے گا۔",
    roman: "Allah Hafiz! Apna khayal rakhiye ga aur Sameer ke kaam ka jaiza zaroor lijiye ga.",
  },
  {
    intent: 'portfolio_overview',
    triggers: ['information', 'informashan', 'detail', 'kya kya hai', 'portfolio kya hai', 'batao', 'overview', 'sab batao'],
    urdu: "سمیر حسین ایک سینئر فل اسٹیک اور کلاؤڈ سسٹمز آرکیٹیکٹ ہیں۔ اس پورٹ فولیو میں سمیر کی بلٹ ان اوربٹ فلم، فلیگ شپ کلاؤڈ سسٹمز، مائیکروسروسز ٹوپولوجی، لائیو کوڈ انسپیکٹر، پروڈکشن API سوٹ، اور انٹرایکٹو ٹرمینل شامل ہیں۔ آپ جس کا کہیں گے میں آپ کو وہاں لے چلوں گی۔",
    roman: "Sameer Hussain aik senior full-stack aur cloud systems architect hain. Is portfolio mein Sameer ki 'Built in Orbit' film, flagship cloud systems, microservices topology, code inspector, API suite, aur interactive terminal shamil hain. Aap jis ka kahein ge main aap ko wahan le chalu gi.",
  },
];

export const CosmicAvatar = ({ size = 480, className = "" }) => {
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const hasSpokenWelcomeRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const speechCooldownUntilRef = useRef(0);
  const isListeningRef = useRef(false);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

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

  // Natural Pakistani Urdu Speech Synthesis Engine with Rock-Solid Echo Protection
  const speak = useCallback((urduText, romanText = '', onComplete) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      speechCooldownUntilRef.current = Date.now() + 3000;
      setTimeout(() => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        if (onComplete) onComplete();
      }, 3000);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      // PAUSE recognition while speaking to prevent self-voice echo loop
      isSpeakingRef.current = true;
      setIsSpeaking(true);
      speechCooldownUntilRef.current = Date.now() + 15000; // temporary high guard

      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }

      const utterance = new SpeechSynthesisUtterance(romanText || urduText);
      const voices = window.speechSynthesis.getVoices();

      // Natural female voice search
      const preferredVoice =
        voices.find((v) => (v.lang.includes('ur') || v.lang.includes('hi')) && !v.name.includes('Hemant')) ||
        voices.find((v) => (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Natural'))) ||
        voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.18; // Warm, polite feminine presenter tone
      utterance.rate = 0.88; // Normal, crystal-clear understandable speed

      const handleSpeechFinish = () => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        // 1.8 second grace period after speaking before mic listens again
        speechCooldownUntilRef.current = Date.now() + 1800;

        if (onComplete) onComplete();

        // Safely restart recognition after grace period
        setTimeout(() => {
          if (!isSpeakingRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {}
          }
        }, 1900);
      };

      utterance.onend = handleSpeechFinish;
      utterance.onerror = handleSpeechFinish;

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      if (onComplete) onComplete();
    }
  }, []);

  // Multi-Strategy Teleport Navigation Function (100% Reliable Scrolling)
  const teleportTo = useCallback(
    (targetId, voiceConfirmText, romanConfirmText = '') => {
      // 1. Announce verbally in Pakistani Urdu
      speak(voiceConfirmText, romanConfirmText);

      // 2. Perform smooth scroll with navbar offset
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

  // Automatic Speech Recognition (Zero Buttons, Pure Autonomous AI)
  const initAutoVoiceRecognition = useCallback(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
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
        // STRICT ECHO FILTER: Never process mic audio if Ayla is speaking or within cooldown
        if (isSpeakingRef.current || Date.now() < speechCooldownUntilRef.current) {
          return;
        }

        const lastIndex = event.results.length - 1;
        const rawTranscript = event.results[lastIndex][0].transcript.toLowerCase();
        const cleanTranscript = rawTranscript.replace(/[.,?!]/g, '').trim();

        if (!cleanTranscript || cleanTranscript.length < 2) return;

        // 1. Check Specific Navigation Section Targets
        const matchedNav = NAV_TARGETS.find((target) =>
          target.keywords.some((kw) => cleanTranscript.includes(kw.toLowerCase()))
        );

        if (matchedNav) {
          teleportTo(matchedNav.id, matchedNav.voiceConfirm, matchedNav.romanConfirm);
          return;
        }

        // 2. Check Conversational AI Knowledge Engine
        const matchedKnowledge = AI_KNOWLEDGE_BASE.find((entry) =>
          entry.triggers.some((trig) => cleanTranscript.includes(trig.toLowerCase()))
        );

        if (matchedKnowledge) {
          speak(matchedKnowledge.urdu, matchedKnowledge.roman);
          return;
        }

        // 3. Gentle Fallback without Random Auto-Jumps
        if (cleanTranscript.length > 3) {
          speak(
            "معاف کیجیے گا، کیا آپ دوبارہ کہیں گے؟ آپ فلم، سسٹمز، کوڈ، ٹوپولوجی یا کانٹیکٹ کے بارے میں پوچھ سکتے ہیں۔",
            "Maaf kijiye ga, kya aap dobara kahein ge? Aap film, systems, code, topology ya contact ke baray mein pooch sakte hain."
          );
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        isListeningRef.current = false;
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
        // Only restart if not speaking and cooldown passed
        setTimeout(() => {
          if (!isSpeakingRef.current && Date.now() >= speechCooldownUntilRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {}
          }
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
      // Start voice recognition ONLY AFTER greeting has completely finished playing!
      speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN, () => {
        initAutoVoiceRecognition();
      });
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

  // Avatar Click Handler
  const handleAvatarClick = () => {
    speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN, () => {
      initAutoVoiceRecognition();
    });
  };

  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 10;

  return (
    <div className="flex flex-col items-center relative w-full select-none">
      {/* Main 3D Pixar News Presenter Studio Stage */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleAvatarClick}
        className={`relative flex items-center justify-center cursor-pointer group ${className}`}
        style={{
          width: '100%',
          maxWidth: size,
          aspectRatio: '16/14',
          perspective: '1200px',
        }}
        title="AYLA // DEV-75 AI CO-PILOT — Speak or click to navigate"
      >
        {/* Deep Core Ambient Studio Spotlight Glow */}
        <div
          className={`absolute rounded-full blur-[80px] pointer-events-none transition-all duration-700 ${
            isSpeaking
              ? 'scale-125 opacity-90'
              : isHovered
              ? 'scale-110 opacity-75'
              : 'opacity-55'
          }`}
          style={{
            width: '80%',
            height: '80%',
            background: 'radial-gradient(circle, #00F2FE 0%, #7928CA 45%, rgba(0, 242, 254, 0) 75%)',
          }}
        />

        {/* 3D Pixar News Presenter Studio Stage Card (Zero clunky clutter) */}
        <div
          className="relative z-10 w-full rounded-3xl overflow-hidden border border-energy-teal/35 bg-space-900/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(0,242,254,0.2)] transition-transform duration-200 ease-out group-hover:border-energy-teal/70"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(20px)`,
            animation: 'avatarLevitate 5s ease-in-out infinite',
          }}
        >
          {/* Top Holographic Broadcast Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-space-950/85 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
              </span>
              <span className="font-mono text-[10px] font-black text-white tracking-widest uppercase">
                LIVE BROADCAST // DEV-75 STUDIO
              </span>
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-[10px] text-slate-400">
              <Radio className="w-3 h-3 text-energy-teal animate-pulse" />
              <span>AYLA // CO-PILOT</span>
            </div>
          </div>

          {/* High-Resolution 3D Pixar News Anchor Character Image (Clean & Unobscured) */}
          <div className="relative w-full aspect-[16/10] overflow-hidden bg-space-950">
            <img
              src="/media/news_anchor.jpg"
              alt="3D Pixar Style Female News Anchor"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />

            {/* Ambient Studio Lighting Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-transparent opacity-75 pointer-events-none" />
          </div>

          {/* Broadcast Desk Footer with Title Plate (Clean English branding - Urdu removed per Pick 3) */}
          <div className="px-5 py-3 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                AYLA // DEV-75 CO-PILOT
              </p>
              <p className="font-mono text-[10px] text-energy-teal font-medium">
                Autonomous AI & Systems Navigator
              </p>
            </div>

            <div className="flex items-center space-x-1.5 text-energy-cyan">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="font-mono text-[10px] font-semibold tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Teleportation Horizontal Strip */}
      <div className="flex flex-col items-center gap-2 mt-4 z-20 w-full max-w-xl px-2">
        {/* Subtle Live Audio Status indicator */}
        <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-slate-300 font-medium">
            {isSpeaking
              ? 'Ayla Speaking...'
              : isListening
              ? 'Listening Hands-Free (Speak anytime)'
              : 'Ayla Online — Speak or click below'}
          </span>
        </div>

        {/* 1-Click Teleportation Horizontal Pills */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1 max-w-full">
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
            transform: translateY(-8px) rotate(-0.5deg);
          }
        }
      `}</style>
    </div>
  );
};
