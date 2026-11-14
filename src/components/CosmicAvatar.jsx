import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Mic,
  Zap,
  Film,
  Layers,
  Code2,
  Cpu,
  Terminal,
  Mail,
  Activity,
  Heart,
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

const MODES = [
  {
    id: 'defense',
    label: 'SHIELD',
    color: '#00F2FE',
    hairColor: '#00FFE0',
    dressAccent: '#00F2FE',
    eyeColor: '#00F2FE',
    tag: 'SWEET SHIELD',
    voiceLine: 'Ji! Main ne protective cyber shield on kar di hai. Ab tamam systems bilkul safe aur secure hain!',
    urduSubtitle: 'جی! میں نے پروٹیکٹو سائبر شیلڈ آن کر دی ہے۔ اب تمام سسٹمز بالکل محفوظ ہیں!',
  },
  {
    id: 'overdrive',
    label: 'HYPER',
    color: '#FF007A',
    hairColor: '#FF2A85',
    dressAccent: '#FF007A',
    eyeColor: '#FFD700',
    tag: 'HYPER MODE',
    voiceLine: 'Yay! Hyperdrive mode on ho gaya! Ab humari speed super fast hai!',
    urduSubtitle: 'زبردست! ہائپر ڈرائیو موڈ آن ہو گیا۔ اب ہماری اسپیڈ سپر فاسٹ ہے!',
  },
  {
    id: 'quantum',
    label: 'QUANTUM',
    color: '#8B5CF6',
    hairColor: '#A855F7',
    dressAccent: '#8B5CF6',
    eyeColor: '#C084FC',
    tag: 'QUANTUM GLOW',
    voiceLine: 'Quantum mode active hai! Sub-15 millisecond latency ke sath sab kuch ready hai!',
    urduSubtitle: 'کوانٹم موڈ آن ہے! سب کچھ سپر فاسٹ اور ریڈی ہے!',
  },
];

// Sweet, Polite & Feminine Urdu Dialogues for Ayla
const AYLA_GIRL_SPEECHES = [
  {
    urdu: "السلام علیکم! میں ہوں آئیلا، سمیر حسین کی AI ساتھی۔ سمیر کے پورٹ فولیو میں آپ کا دل سے خیرمقدم ہے! چلیے میں آپ کو سمیر کے زبردست سسٹمز اور پروجیکٹس دکھاتی ہوں۔",
    roman: "Assalam-o-Alaikum! Main hoon Ayla, Sameer Hussain ki AI companion. Sameer ke portfolio mein aap ka dil se welcome hai! Chaliye main aap ko Sameer ke zabardast systems aur projects dikhati hoon.",
  },
  {
    urdu: "سمیر حسین ایک بہت باصلاحیت سینئر فل اسٹیک ڈویلپر ہیں جو جدید کلاؤڈ سسٹمز اور تھری ڈی ویب ڈیزائن کرتے ہیں۔ کیا آپ ان کے سسٹمز دیکھنا چاہیں گے؟",
    roman: "Sameer Hussain aik buhat talented Senior Full-Stack Developer hain jo advanced cloud systems aur 3D web design karte hain. Kya aap unke systems dekhna chahenge?",
  },
  {
    urdu: "آپ مجھ سے مائیک پر بات کر سکتی ہیں! بس پیار سے کہیے 'سسٹمز پر لے جاؤ' یا 'کوڈ دکھاؤ'، اور میں فوراً آپ کو وہاں لے چلوں گی۔",
    roman: "Aap mujh se mic per baat kar sakte hain! Bas mujhe kahiye 'Systems per le jao' ya 'Code dikhao', aur main foran aap ko wahan le chalti hoon.",
  },
  {
    urdu: "سمیر کے تمام کلاؤڈ سسٹمز 99.99 فیصد اپ ٹائم پر چلتے ہیں۔ چلیے آئیے میں آپ کو لائیو API سویٹ ٹیسٹ کرواتی ہوں!",
    roman: "Sameer ke tamam cloud systems 99.99 percent uptime per chaltay hain. Chaliye aaiye main aap ko live API suite test karwati hoon!",
  },
];

// Complete Voice & Teleport Navigation Targets with Full Phonetic Matching
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: ['film', 'flim', 'filam', 'video', 'vedio', 'movie', 'cinema', 'watch', 'remotion', 'film dikhao', 'video dikhao', 'movie dikhao', 'film chalao', 'فلم', 'ویڈیو', 'سینما'],
    voiceConfirm: "Aray waah! 'Built in Orbit' film bohot pyaari hai, chaliye mil kar dekhtay hain!",
    subtitleUrdu: "ارے واہ! 'Built in Orbit' فلم بہت پیاری ہے، چلیے مل کر دیکھتے ہیں!",
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
    voiceConfirm: "Ji zaroor! Chaliye main aap ko Sameer ke Featured Systems aur projects par le kar chalti hoon!",
    subtitleUrdu: "جی ضرور! چلیے میں آپ کو سمیر کے سسٹمز اور پروجیکٹس پر لے چلتی ہوں!",
  },
  {
    id: 'architecture',
    label: 'Topology',
    icon: Activity,
    color: '#8B5CF6',
    keywords: ['architecture', 'arkitecture', 'topology', 'toplogy', 'mesh', 'microservices', 'microservice', 'cloud', 'cluster', 'node', 'nodes', 'spike', 'architecture dikhao', 'topology dikhao', 'آرکیٹیکچر', 'ٹوپولوجی', 'کلاؤڈ'],
    voiceConfirm: "Chaliye! Microservices Mesh Topology aur cloud flow dekhte hain!",
    subtitleUrdu: "چلیے! Microservices Mesh Topology اور کلاؤڈ فلو دیکھتے ہیں!",
  },
  {
    id: 'code',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: ['code', 'core', 'kood', 'coding', 'codes', 'kord', 'inspector', 'algorithms', 'algorithm', 'typescript', 'sql', 'physics', 'code dikhao', 'coding dikhao', 'core per', 'code per', 'core per lekar ja', 'code per lekar ja', 'کوڈ', 'الگورتھم', 'کوڈنگ'],
    voiceConfirm: "Aap ko code dekhna hai? Zaroor, chaliye main aap ko Code Inspector per le chalti hoon!",
    subtitleUrdu: "آپ کو کوڈ دیکھنا ہے؟ ضرور، چلیے میں آپ کو کوڈ انسپیکٹر پر لے چلتی ہوں!",
  },
  {
    id: 'api-playground',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: ['api', 'epi', 'a p i', 'playground', 'endpoint', 'endpoints', 'test', 'suite', 'request', 'rest', 'api dikhao', 'api chalao', 'api test', 'اے پی آئی', 'اے پی ائی', 'ٹیسٹ', 'سویٹ'],
    voiceConfirm: "Ji haan! Live API Playground open kar rahi hoon, aap test karein!",
    subtitleUrdu: "جی ہاں! لائیو API Playground کھول رہی ہوں، آپ ٹیسٹ کریں!",
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Cpu,
    color: '#06B6D4',
    keywords: ['skills', 'skill', 'tech', 'stack', 'technology', 'technologies', 'skills dikhao', 'skills per jao', 'stack dikhao', 'اسکلز', 'ٹیکنالوجی'],
    voiceConfirm: "Ji! Sameer ke technical skills aur languages ki list حاضر hai!",
    subtitleUrdu: "جی! سمیر کے تمام ٹیکنیکل اسکلز کی لسٹ حاضر ہے!",
  },
  {
    id: 'tech-sphere',
    label: '3D Matrix',
    icon: Compass,
    color: '#F59E0B',
    keywords: ['matrix', 'sphere', '3d', 'globe', 'interactive', '3d dikhao', 'matrix dikhao', 'تھری ڈی', 'میٹرکس'],
    voiceConfirm: "Chaliye! 3D Interactive Matrix khol rahi hoon, aap ko bohot maza aayega!",
    subtitleUrdu: "چلیے! 3D Interactive Matrix کھول رہی ہوں، آپ کو بہت مزہ آئے گا!",
  },
  {
    id: 'terminal',
    label: 'CLI Terminal',
    icon: Terminal,
    color: '#A855F7',
    keywords: ['terminal', 'tarminus', 'cli', 'shell', 'bash', 'console', 'command', 'terminal dikhao', 'terminal kholo', 'cli dikhao', 'ٹرمینل', 'سی ایل آئی', 'شیل'],
    voiceConfirm: "Ji bilkul! Developer Terminal open kar rahi hoon!",
    subtitleUrdu: "جی بالکل! ڈویلپر ٹرمینل اوپن کر رہی ہوں!",
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#00FFE0',
    keywords: ['contact', 'kontact', 'hire', 'talk', 'email', 'mail', 'connect', 'message', 'baat', 'rabta', 'contact dikhao', 'rabta karna hai', 'email dikhao', 'رابطہ', 'ای میل', 'بات'],
    voiceConfirm: "Aap Sameer se baat karna chahte hain? Main foran aap ko Contact form per le chalti hoon!",
    subtitleUrdu: "آپ سمیر سے بات کرنا چاہتے ہیں؟ میں فوراً آپ کو رابطہ فارم پر لے چلتی ہوں!",
  },
  {
    id: 'hero',
    label: 'Top',
    icon: ArrowRight,
    color: '#00F2FE',
    keywords: ['upar', 'top', 'hero', 'home', 'shuru', 'start', 'wapas', 'upar jao', 'main', 'اوپر', 'ہیرو', 'شروع'],
    voiceConfirm: "Wapas upar Command Bridge per aa gaye hain!",
    subtitleUrdu: "واپس اوپر ہیرو سیکشن پر آ گئے ہیں!",
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

  // Animated Girl Facial Expressions
  const [isBlinking, setIsBlinking] = useState(false);
  const [mouthShape, setMouthShape] = useState(0); // 0: cute smile, 1: small talk, 2: wide expression

  // Speech State (Sweet & Feminine)
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechTextUrdu, setSpeechTextUrdu] = useState("السلام علیکم! میں آئیلا ہوں، سمیر کی AI ساتھی۔ مجھے بتائیں کہ کہاں چلنا ہے!");
  const [speechTextRoman, setSpeechTextRoman] = useState("Assalam-o-Alaikum! Main Ayla hoon, Sameer ki AI companion. Mujhe batayein kahan chalna hai!");
  const [speechIndex, setSpeechIndex] = useState(0);

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

  // Sweet Feminine Voice Synthesis Engine
  const speak = useCallback((textToSpeak, urduDisplay = '', romanDisplay = '') => {
    setSpeechTextUrdu(urduDisplay || textToSpeak);
    setSpeechTextRoman(romanDisplay || textToSpeak);

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3600);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      const voices = window.speechSynthesis.getVoices();

      // Look for smooth, sweet feminine voices
      const preferredVoice =
        voices.find((v) => (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Natural'))) ||
        voices.find((v) => (v.lang.includes('ur') || v.lang.includes('hi')) && !v.name.includes('Hemant')) ||
        voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.35; // Sweet, charming feminine pitch
      utterance.rate = 0.98; // Gentle, clear cadence

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(true);
      setTimeout(() => setIsSpeaking(false), 3200);
    }
  }, []);

  // Multi-Strategy Teleport Navigation Function (100% Reliable Scrolling)
  const teleportTo = useCallback(
    (targetId, voiceConfirmText, subtitleUrduText = '') => {
      // 1. Announce verbally in sweet feminine voice
      speak(voiceConfirmText, subtitleUrduText, voiceConfirmText);

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

        if (!el) {
          console.warn(`Target section #${targetId} not found`);
          return;
        }

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

  // Web Speech Recognition with Intelligent Systems & Phonetic Matching
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
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechTextUrdu("🎙️ سن رہی ہوں... بتائیں: 'Systems dikhao', 'Code per lekar ja', یا 'Film'!");
        setSpeechTextRoman("🎙️ Sun rahi hoon... Batayein: 'Systems dikhao', 'Code per lekar ja', ya 'Film'!");
      };

      recognition.onresult = (event) => {
        const rawTranscript = event.results[0][0].transcript.toLowerCase();
        const cleanTranscript = rawTranscript.replace(/[.,?!]/g, '').trim();
        setIsListening(false);
        setSpeechTextRoman(`Sun liya: "${cleanTranscript}"`);

        // Heuristic 1: Dedicated Check for "Systems" / "Projects"
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

        let matched = null;
        if (isSystemsQuery) {
          matched = NAV_TARGETS.find((t) => t.id === 'projects');
        }

        // Heuristic 2: Check all keywords in NAV_TARGETS
        if (!matched) {
          matched = NAV_TARGETS.find((target) =>
            target.keywords.some((kw) => cleanTranscript.includes(kw.toLowerCase()))
          );
        }

        // Heuristic 3: Extra Phonetics
        if (!matched) {
          if (cleanTranscript.includes('core') || cleanTranscript.includes('kood') || cleanTranscript.includes('cod')) {
            matched = NAV_TARGETS.find((t) => t.id === 'code');
          } else if (cleanTranscript.includes('flim') || cleanTranscript.includes('filam') || cleanTranscript.includes('vedio')) {
            matched = NAV_TARGETS.find((t) => t.id === 'film');
          } else if (cleanTranscript.includes('epi') || cleanTranscript.includes('play')) {
            matched = NAV_TARGETS.find((t) => t.id === 'api-playground');
          } else if (cleanTranscript.includes('sphere') || cleanTranscript.includes('matrix')) {
            matched = NAV_TARGETS.find((t) => t.id === 'tech-sphere');
          }
        }

        // Heuristic 4: General Navigation Intent -> Default to Systems
        if (!matched) {
          const generalNavWords = ['lekar ja', 'le kar ja', 'le jao', 'dikhao', 'chalo', 'kholo', 'jana hai', 'go to', 'take me', 'show'];
          if (generalNavWords.some((word) => cleanTranscript.includes(word))) {
            matched = NAV_TARGETS.find((t) => t.id === 'projects');
          }
        }

        if (matched) {
          teleportTo(matched.id, matched.voiceConfirm, matched.subtitleUrdu);
        } else {
          speak(
            `Main ne suna "${cleanTranscript}". Aap keh sakti hain 'Systems dikhao', 'Code per lekar ja', ya 'Film'!`,
            `سنا: "${cleanTranscript}". آپ کہہ سکتے ہیں 'Systems dikhao' یا 'Code per lekar ja'!`
          );
        }
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  }, [speak, teleportTo]);

  // Click on Avatar: Sweet welcome greeting in feminine Urdu!
  const triggerNextSpeech = (e) => {
    if (e) e.stopPropagation();

    if (!hasSpokenFirstRef.current) {
      hasSpokenFirstRef.current = true;
      setSpeechIndex(0);
      speak(AYLA_GIRL_SPEECHES[0].roman, AYLA_GIRL_SPEECHES[0].urdu, AYLA_GIRL_SPEECHES[0].roman);
      return;
    }

    const nextIndex = (speechIndex + 1) % AYLA_GIRL_SPEECHES.length;
    setSpeechIndex(nextIndex);
    speak(AYLA_GIRL_SPEECHES[nextIndex].roman, AYLA_GIRL_SPEECHES[nextIndex].urdu, AYLA_GIRL_SPEECHES[nextIndex].roman);
  };

  const switchMode = (mode) => {
    setActiveMode(mode);
    setPulseRing(true);
    setTimeout(() => setPulseRing(false), 1200);
    speak(mode.voiceLine, mode.urduSubtitle, mode.voiceLine);
  };

  const tiltX = mousePos.y * -12;
  const tiltY = mousePos.x * 16;
  const pupilX = mousePos.x * 3.5;
  const pupilY = mousePos.y * 2.5;

  return (
    <div className="flex flex-col items-center relative w-full select-none">
      {/* 0. Sleek Floating Holographic Subtitle Pill (Replaces the bulky dark card box!) */}
      {(isSpeaking || isListening || isHovered) ? (
        <div
          className="mb-4 w-full max-w-md px-5 py-2.5 rounded-2xl bg-space-950/85 border backdrop-blur-xl shadow-2xl transition-all duration-300 z-30 flex flex-col space-y-1 text-center animate-fade-in"
          style={{
            borderColor: `${activeMode.color}80`,
            boxShadow: `0 0 25px ${activeMode.color}35`,
          }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] text-slate-400 pb-1 border-b border-slate-800/80">
            <span className="font-bold flex items-center space-x-1.5" style={{ color: activeMode.color }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: activeMode.color }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: activeMode.color }} />
              </span>
              <span>🌸 AYLA // AI COMPANION</span>
            </span>
            <span className="text-energy-cyan flex items-center space-x-1 font-semibold">
              <Volume2 className="w-3 h-3 animate-pulse" />
              <span>{isListening ? '🎙️ SUN RAHI HOON...' : isSpeaking ? 'BOL RAHI HOON...' : 'ONLINE'}</span>
            </span>
          </div>

          <p className="font-sans text-xs sm:text-sm text-white font-medium leading-relaxed tracking-wide text-right" dir="rtl">
            {speechTextUrdu}
          </p>
          <p className="font-mono text-[11px] text-energy-cyan/90 leading-tight">
            "{speechTextRoman}"
          </p>
        </div>
      ) : (
        /* Subtle Idle Pill Badge */
        <div
          onClick={triggerNextSpeech}
          className="mb-3 px-4 py-1.5 rounded-full bg-space-950/70 border border-slate-800 hover:border-energy-teal/60 backdrop-blur-md font-mono text-[11px] text-slate-300 flex items-center space-x-2 cursor-pointer hover:scale-105 transition-all shadow-md group"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-cyan opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-energy-teal" />
          </span>
          <span className="group-hover:text-energy-cyan transition-colors">🌸 AYLA SE BAAT KAREIN (CLICK ME)</span>
        </div>
      )}

      {/* Main 3D Animated Cyber AI Girl Avatar Canvas with Complete Figure & Dress */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={triggerNextSpeech}
        className={`relative flex items-center justify-center cursor-pointer group ${className}`}
        style={{
          width: size,
          height: Math.round(size * 1.18),
          perspective: '1200px',
        }}
        title="Main Ayla hoon! Mujhe click karein ya mic se batayein kahan jana hai!"
      >
        {/* 1. Deep Core Gravitational Quantum Nebula */}
        <div
          className={`absolute rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
            pulseRing || isSpeaking || isListening
              ? 'scale-140 opacity-95'
              : isHovered
              ? 'scale-120 opacity-85'
              : 'opacity-70'
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

        {/* 2. Interactive Soundwave Ripple Rings When Speaking / Listening */}
        {(isSpeaking || isListening) && (
          <>
            <div
              className="absolute rounded-full border-2 pointer-events-none animate-soundwave"
              style={{
                width: size * 0.7,
                height: size * 0.7,
                borderColor: `${activeMode.color}80`,
              }}
            />
            <div
              className="absolute rounded-full border pointer-events-none animate-soundwave-delayed"
              style={{
                width: size * 0.9,
                height: size * 0.9,
                borderColor: `${activeMode.color}40`,
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
            borderColor: `${activeMode.color}30`,
            boxShadow: `0 0 30px ${activeMode.color}20`,
            animation: 'spinClockwise 24s linear infinite',
          }}
        />
        <div
          className="absolute rounded-full border pointer-events-none transition-all duration-500"
          style={{
            width: size * 0.88,
            height: size * 0.88,
            borderColor: `${activeMode.color}40`,
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

        {/* 5. Complete 3D Animated Cyber Anime Girl with Beautiful Dress */}
        <div
          className="relative z-10 flex flex-col items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(35px)`,
            animation: 'avatarLevitate 4.5s ease-in-out infinite',
          }}
        >
          {/* Complete Girl Full Figure Vector SVG */}
          <svg
            width={size * 0.86}
            height={Math.round(size * 1.15)}
            viewBox="0 0 280 430"
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
                <stop offset="0%" stopColor={activeMode.hairColor} />
                <stop offset="45%" stopColor={activeMode.color} />
                <stop offset="100%" stopColor="#7928CA" />
              </linearGradient>

              {/* Eye Iris Gradient */}
              <radialGradient id="girlEyeGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor={activeMode.eyeColor} />
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
                <stop offset="0%" stopColor={activeMode.color} />
                <stop offset="50%" stopColor="#7928CA" />
                <stop offset="100%" stopColor={activeMode.dressAccent} />
              </linearGradient>

              {/* Translucent Ruffle Sleeves Gradient */}
              <linearGradient id="ruffleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={activeMode.color} stopOpacity="0.75" />
                <stop offset="60%" stopColor="#7928CA" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00FFE0" stopOpacity="0.15" />
              </linearGradient>

              {/* Glow Filter */}
              <filter id="aylaGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Back Flowing Hair Locks (Cascading down the shoulders and waist) */}
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

            {/* ----------------- BEAUTIFUL DRESS SKIRT & GOWN (Expanded Flowing Silhouette) ----------------- */}
            {/* 1. Deep Space Underskirt Layer */}
            <path
              d="M105 240 C90 270 60 320 40 395 C80 410 200 410 240 395 C220 320 190 270 175 240 Z"
              fill="url(#dressMainGrad)"
              stroke={activeMode.color}
              strokeWidth="1.5"
            />

            {/* 2. Flowing Pleated Dress Folds & Shimmer Panels */}
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
              stroke={`${activeMode.color}40`}
              strokeWidth="1"
            />

            {/* 3. Glowing Cyber Circuit Trims & Hemline on the Skirt */}
            <path
              d="M40 395 Q140 425 240 395"
              stroke={activeMode.color}
              strokeWidth="3"
              fill="none"
              filter="url(#aylaGlow)"
            />
            <path
              d="M50 402 Q140 430 230 402"
              stroke={activeMode.dressAccent}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="4 4"
            />

            {/* Glowing Fiber-Optic Vertical Neon Pinstripes down the Dress */}
            <path d="M120 250 Q105 320 85 390" stroke={activeMode.color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <path d="M160 250 Q175 320 195 390" stroke={activeMode.color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
            <path d="M140 250 L140 400" stroke={activeMode.color} strokeWidth="1.5" opacity="0.9" filter="url(#aylaGlow)" />

            {/* 4. Elegant Cyber Corset Bodice (Feminine Cinched Waist & Sweetheart Cut) */}
            <path
              d="M100 178 C95 200 102 235 106 242 C115 246 165 246 174 242 C178 235 185 200 180 178 C165 185 150 185 140 180 C130 185 115 185 100 178 Z"
              fill="url(#dressMainGrad)"
              stroke={activeMode.color}
              strokeWidth="2"
            />

            {/* Corset Vertical Rib Boning Lines */}
            <path d="M122 184 L124 243" stroke={`${activeMode.color}90`} strokeWidth="1.5" />
            <path d="M158 184 L156 243" stroke={`${activeMode.color}90`} strokeWidth="1.5" />

            {/* Glowing Center Quantum Heart / Power Brooch on Bodice */}
            <circle cx="140" cy="205" r="5.5" fill={activeMode.color} filter="url(#aylaGlow)">
              <animate attributeName="r" values="4.5;6.5;4.5" dur="1.3s" repeatCount="indefinite" />
            </circle>

            {/* Cute Waist Ribbon & Bow */}
            <path
              d="M104 238 C120 243 160 243 176 238 L176 245 C160 249 120 249 104 245 Z"
              fill={activeMode.color}
              filter="url(#aylaGlow)"
            />
            {/* Center Ribbon Knot */}
            <circle cx="140" cy="242" r="4" fill="#FFFFFF" />

            {/* ----------------- FEMININE SHOULDERS, ARMS & TRANSLUCENT RUFFLES ----------------- */}
            {/* Slender Arms */}
            <path
              d="M98 182 C85 210 82 245 92 275 C97 274 102 268 100 260 C92 235 96 205 106 186 Z"
              fill="url(#girlSkinGrad)"
            />
            <path
              d="M182 182 C195 210 198 245 188 275 C183 274 178 268 180 260 C188 235 184 205 174 186 Z"
              fill="url(#girlSkinGrad)"
            />

            {/* Translucent Off-Shoulder Cyber Ruffles */}
            <path
              d="M85 180 C80 195 95 205 106 195 C115 188 105 175 92 175 Z"
              fill="url(#ruffleGrad)"
              stroke={activeMode.color}
              strokeWidth="1.5"
            />
            <path
              d="M195 180 C200 195 185 205 174 195 C165 188 175 175 188 175 Z"
              fill="url(#ruffleGrad)"
              stroke={activeMode.color}
              strokeWidth="1.5"
            />

            {/* Delicate Feminine Neck & Velvet Choker */}
            <path
              d="M125 142 L125 170 C132 174 148 174 155 170 L155 142 Z"
              fill="url(#girlSkinGrad)"
            />
            {/* Velvet Cyber Choker */}
            <path
              d="M123 158 C130 162 150 162 157 158 L157 165 C150 168 130 168 123 165 Z"
              fill="#060913"
              stroke={activeMode.color}
              strokeWidth="1.5"
            />
            <circle cx="140" cy="162" r="3.5" fill={activeMode.color} filter="url(#aylaGlow)" />

            {/* ----------------- CUTE ANIME FACE & EXPRESSIONS ----------------- */}
            {/* Soft Feminine Jaw & Face */}
            <path
              d="M95 95 C95 138 115 156 140 158 C165 156 185 138 185 95 C185 58 165 52 140 52 C115 52 95 58 95 95 Z"
              fill="url(#girlSkinGrad)"
            />

            {/* Soft Rosy Kawaii Cheek Blush */}
            <ellipse cx="108" cy="118" rx="9" ry="5" fill="#FF4D8D" opacity="0.45" filter="url(#aylaGlow)" />
            <ellipse cx="172" cy="118" rx="9" ry="5" fill="#FF4D8D" opacity="0.45" filter="url(#aylaGlow)" />
            {/* Cyber Cheek Heart Marks */}
            <circle cx="104" cy="122" r="2" fill={activeMode.color} opacity="0.8" />
            <circle cx="176" cy="122" r="2" fill={activeMode.color} opacity="0.8" />

            {/* Expressive Anime Eyes with Gaze Tracking & Blinking */}
            {!isBlinking ? (
              <g>
                {/* Left Eye Whites */}
                <ellipse cx="114" cy="104" rx="14" ry="16" fill="#FFFFFF" />
                {/* Left Pupil with dynamic mouse gaze */}
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="114" cy="104" rx="9.5" ry="12.5" fill="url(#girlEyeGrad)" filter="url(#aylaGlow)" />
                  <ellipse cx="114" cy="104" rx="4.5" ry="6.5" fill="#02040A" />
                  {/* Glossy Catchlights */}
                  <circle cx="111" cy="100" r="3.5" fill="#FFFFFF" />
                  <circle cx="116" cy="107" r="1.8" fill="#FFFFFF" />
                </g>
                {/* Left Eyelashes & Eyeliner */}
                <path d="M98 96 C106 88 122 88 130 96" stroke="#0B132B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M98 96 L94 91" stroke="#0B132B" strokeWidth="2.2" strokeLinecap="round" />

                {/* Right Eye Whites */}
                <ellipse cx="166" cy="104" rx="14" ry="16" fill="#FFFFFF" />
                {/* Right Pupil with dynamic mouse gaze */}
                <g transform={`translate(${pupilX}, ${pupilY})`}>
                  <ellipse cx="166" cy="104" rx="9.5" ry="12.5" fill="url(#girlEyeGrad)" filter="url(#aylaGlow)" />
                  <ellipse cx="166" cy="104" rx="4.5" ry="6.5" fill="#02040A" />
                  {/* Glossy Catchlights */}
                  <circle cx="163" cy="100" r="3.5" fill="#FFFFFF" />
                  <circle cx="168" cy="107" r="1.8" fill="#FFFFFF" />
                </g>
                {/* Right Eyelashes & Eyeliner */}
                <path d="M150 96 C158 88 174 88 182 96" stroke="#0B132B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M182 96 L186 91" stroke="#0B132B" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            ) : (
              /* Closed Blinking Eyes */
              <g>
                <path d="M100 104 Q114 112 128 104" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M152 104 Q166 112 180 104" stroke="#0B132B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </g>
            )}

            {/* Delicate Anime Nose */}
            <circle cx="140" cy="120" r="1.6" fill="#E59877" />

            {/* Dynamic Lip-Sync Mouth with Soft Pink Lips */}
            {mouthShape === 0 ? (
              /* Sweet Gentle Smile */
              <path d="M132 136 Q140 142 148 136" stroke="#FF4D8D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
            ) : mouthShape === 1 ? (
              /* Small Open (Speaking sweetly) */
              <ellipse cx="140" cy="138" rx="6" ry="4" fill="#FF4D8D" />
            ) : (
              /* Expressive Open Talking Mouth */
              <path d="M132 135 Q140 146 148 135 Q140 140 132 135 Z" fill="#D15672" stroke="#FF4D8D" strokeWidth="1" />
            )}

            {/* ----------------- FRONT ANIME HAIR BANGS & CYBER HEADSET ----------------- */}
            {/* Front Bangs (Side parting with glossy cyber styling) */}
            <path
              d="M96 68 C115 50 165 50 184 68 C185 85 180 105 178 115 C170 95 160 85 150 82 C145 95 135 110 130 115 C125 100 118 85 105 85 C100 95 98 108 96 115 Z"
              fill="url(#girlHairGrad)"
            />

            {/* Headset Headband */}
            <path
              d="M80 82 C90 40 190 40 200 82"
              stroke="#0E1624"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M80 82 C90 40 190 40 200 82"
              stroke={activeMode.color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              filter="url(#aylaGlow)"
            />

            {/* Left Headset Cat-Ear Audio Node with Equalizer Bars */}
            <ellipse cx="78" cy="85" rx="10" ry="16" fill="#04060A" stroke={activeMode.color} strokeWidth="2.5" />
            <g transform="translate(73, 76)">
              <rect x="0" y="4" width="2" height="10" rx="1" fill={activeMode.color} />
              <rect x="3" y="1" width="2" height="14" rx="1" fill={activeMode.color} />
              <rect x="6" y="3" width="2" height="11" rx="1" fill={activeMode.color} />
            </g>

            {/* Right Headset Cat-Ear Audio Node & Antenna Boom Mic */}
            <ellipse cx="202" cy="85" rx="10" ry="16" fill="#04060A" stroke={activeMode.color} strokeWidth="2.5" />
            {/* Boom Mic curving toward sweet lips */}
            <path
              d="M202 92 C196 115 175 135 156 138"
              stroke={activeMode.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="154" cy="138" r="3.5" fill={activeMode.color} filter="url(#aylaGlow)">
              <animate attributeName="r" values="3;4.8;3" dur="1.1s" repeatCount="indefinite" />
            </circle>

            {/* Floating Sparkles around Dress */}
            <polygon points="65,290 68,298 76,301 68,304 65,312 62,304 54,301 62,298" fill={activeMode.color} opacity="0.8" filter="url(#aylaGlow)" />
            <polygon points="215,280 218,286 224,289 218,292 215,298 212,292 206,289 212,286" fill={activeMode.dressAccent} opacity="0.8" filter="url(#aylaGlow)" />
          </svg>

          {/* Dynamic Grounding Contact Shadow */}
          <div
            className="w-56 h-6 rounded-full pointer-events-none mt-1"
            style={{
              background: `radial-gradient(ellipse at center, ${activeMode.color}80 0%, rgba(121, 40, 202, 0.25) 50%, transparent 75%)`,
              filter: 'blur(8px)',
              animation: 'shadowPulse 4.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Sleek Floating Action Deck (Modes, Voice Mic & 1-Click Teleportation Chips) */}
      <div className="flex flex-col items-center gap-3 mt-4 z-20 w-full max-w-xl">
        {/* Top Controls: Mode Switchers & Urdu Mic Trigger */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Mode Chips */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-space-950/80 border border-slate-800">
            {MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={(e) => {
                  e.stopPropagation();
                  switchMode(mode);
                }}
                className={`px-3 py-1 rounded-lg font-mono text-[11px] font-bold transition-all flex items-center space-x-1 ${
                  activeMode.id === mode.id
                    ? 'bg-space-900 border text-white shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{
                  borderColor: activeMode.id === mode.id ? mode.color : 'transparent',
                  color: activeMode.id === mode.id ? mode.color : undefined,
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: mode.color }} />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>

          {/* Main Urdu Voice Mic Button */}
          <button
            onClick={startVoiceCommand}
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl font-mono text-xs font-black border transition-all shadow-lg active:scale-95 ${
              isListening
                ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.7)] animate-pulse scale-105'
                : 'bg-space-900/90 hover:bg-space-850 border-slate-700 text-slate-200 hover:border-energy-teal hover:text-energy-cyan'
            }`}
            title="Click to speak (e.g. 'Systems dikhao', 'Code per lekar ja')"
          >
            <Mic className={`w-3.5 h-3.5 ${isListening ? 'animate-bounce text-white' : 'text-energy-teal'}`} />
            <span>{isListening ? '🎙️ SUN RAHI HOON...' : '🎙️ AYLA SE BAAT KAREIN'}</span>
          </button>

          {/* Audio Dialogue Button */}
          <button
            onClick={triggerNextSpeech}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all active:scale-95 ${
              isSpeaking
                ? 'bg-energy-teal text-space-950 border-energy-cyan shadow-[0_0_20px_rgba(0,242,254,0.4)] animate-pulse'
                : 'bg-space-950/80 border-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Click to hear Ayla's sweet greeting"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isSpeaking ? 'BOL RAHI HOON...' : 'GREETING'}</span>
          </button>
        </div>

        {/* 1-Click Teleportation Horizontal Pills Strip */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-2 max-w-full">
            {NAV_TARGETS.map((tgt) => {
              const Icon = tgt.icon;
              return (
                <button
                  key={tgt.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    teleportTo(tgt.id, tgt.voiceConfirm, tgt.subtitleUrdu);
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