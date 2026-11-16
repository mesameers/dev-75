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
  Sparkles,
  Volume2
} from 'lucide-react';
import { fluteEngine } from '../utils/fluteEngine';
import alinaAvatarImg from '../assets/alina_entity.png';

// Navigation Targets for Direct Click & Voice Dispatch
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: [
      'film', 'flim', 'filam', 'video', 'movie', 'cinema', 'built in orbit',
      'film dikhao', 'video dikhao', 'film par le jao', 'film par chalo', 'film per le jao',
      'فلم', 'ویڈیو', 'سینما', 'فلم دکھاؤ', 'فلم پر لے جاؤ', 'فلم پر چلو'
    ],
  },
  {
    id: 'projects',
    alias: 'systems',
    label: 'Systems',
    icon: Layers,
    color: '#10B981',
    keywords: [
      'system', 'systems', 'sistem', 'sistems',
      'project', 'projects', 'projeck', 'projekts', 'featured',
      'platform', 'platforms', 'system dikhao',
      'systems dikhao', 'projects dikhao', 'projects par le jao', 'systems par le jao',
      'projects par chalo', 'systems par chalo', 'systems per le jao', 'projects per le jao',
      'systems pr', 'systems pr le jao', 'systems pr chalo', 'system pr le jao', 'system pr chalo',
      'projects pr', 'projects pr le jao', 'projects pr chalo', 'project pr le jao',
      'systems dekhna hai', 'projects dekhna hai',
      'سسٹم', 'سسٹمز', 'سیستم', 'سیستمز', 'پروجیکٹ', 'پروجیکٹس',
      'پروجیکٹ دکھاؤ', 'سسٹم دکھاؤ', 'سسٹمز دکھاؤ', 'سسٹمز پر لے جاؤ', 'سسٹم پر لے جاؤ',
      'پروجیکٹس پر لے جاؤ', 'پروجیکٹس دکھاؤ', 'سسٹمز پر چلو', 'سسٹم پر چلو', 'سسٹمز پر'
    ],
  },
  {
    id: 'architecture',
    alias: 'topology',
    label: 'Topology',
    icon: Activity,
    color: '#8B5CF6',
    keywords: [
      'architecture', 'topology', 'toplogy', 'mesh', 'microservices', 'microservice', 'cloud', 'cluster',
      'topology dikhao', 'architecture dikhao', 'topology par le jao', 'topology par chalo', 'topology per le jao', 'topology pr le jao', 'topology pr chalo',
      'آرکیٹیکچر', 'ٹوپولوجی', 'کلاؤڈ', 'ٹوپولوجی دکھاؤ', 'ٹوپولوجی پر لے جاؤ', 'ٹوپولوجی پر چلو'
    ],
  },
  {
    id: 'code',
    alias: 'code-inspector',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: [
      'code', 'coding', 'inspector', 'algorithm', 'algorithms', 'typescript', 'sql', 'production code', 'source code', 'kod', 'kood',
      'code dikhao', 'code dekhao', 'coding dikhao', 'code par le jao', 'code per le jao', 'code pe le jao',
      'code pr', 'code pr le jao', 'code pr chalo', 'coding pr', 'coding pr le jao',
      'code par chalo', 'code inspector', 'code batao', 'code dekho', 'code dekhna hai',
      'کوڈ', 'الگورتھم', 'کوڈنگ', 'کوڈ دکھاؤ', 'کوڈ دکھاو', 'کوڈ پر لے جاؤ', 'کوڈ پر چلو', 'کود', 'کوٹ', 'کووڈ', 'کوڈ بتاؤ', 'کوڈ پر', 'پروڈکشن کوڈ'
    ],
  },
  {
    id: 'api-playground',
    alias: 'api',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: [
      'api', 'apis', 'api suite', 'api-suite', 'playground', 'endpoint', 'endpoints', 'api test', 'test suite', 'api sweet', 'api suit',
      'api dikhao', 'api suite dikhao', 'api par le jao', 'api per le jao', 'api pe le jao',
      'api pr', 'api pr le jao', 'api pr chalo', 'api suite pr', 'api suite pr le jao', 'api suite pr chalo',
      'api suite par le jao', 'api suite per le jao', 'api suite pe le jao', 'api par chalo',
      'api batao', 'api suite batao', 'suite dikhao', 'suite pr le jao', 'suite par le jao', 'api dekhna hai',
      'اے پی آئی', 'اے پی ائی', 'ای پی آئی', 'ای پی ائی', 'ٹیسٹ', 'اے پی آئی سویٹ', 'سویٹ', 'سوئٹ', 'پلے گراؤنڈ',
      'اے پی آئی دکھاؤ', 'اے پی آئی سویٹ دکھاؤ', 'اے پی آئی پر لے جاؤ', 'اے پی آئی سویٹ پر لے جاؤ', 'ای پی آئی سویٹ', 'اے پی آئی بتاؤ', 'اے پی آئی پر چلو'
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: Cpu,
    color: '#06B6D4',
    keywords: [
      'skills', 'skill', 'tech stack', 'technologies', 'technology', 'tools', 'kya aata hai',
      'skills dikhao', 'skills par le jao', 'skills par chalo', 'skills per le jao',
      'اسکلز', 'ٹیکنالوجی', 'ہنر', 'اسکلز دکھاؤ', 'اسکلز پر لے جاؤ', 'اسکلز پر چلو'
    ],
  },
  {
    id: 'tech-sphere',
    alias: 'matrix',
    label: '3D Matrix',
    icon: Compass,
    color: '#F59E0B',
    keywords: [
      'matrix', 'sphere', '3d', 'globe', '3d dikhao', 'matrix dikhao',
      '3d par le jao', 'matrix par le jao', '3d matrix', 'matrix par chalo',
      'تھری ڈی', 'میٹرکس', 'تھری ڈی دکھاؤ', 'میٹرکس پر لے جاؤ'
    ],
  },
  {
    id: 'terminal',
    alias: 'cli',
    label: 'CLI Terminal',
    icon: Terminal,
    color: '#A855F7',
    keywords: [
      'terminal', 'cli', 'shell', 'bash', 'console', 'command',
      'terminal dikhao', 'terminal kholo', 'terminal par le jao', 'terminal par chalo',
      'ٹرمینل', 'سی ایل آئی', 'ٹرمینل دکھاؤ', 'ٹرمینل پر لے جاؤ', 'ٹرمینل پر چلو'
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: Mail,
    color: '#00FFE0',
    keywords: [
      'contact', 'hire', 'email', 'mail', 'connect', 'message', 'rabta', 'baat karni hai',
      'contact dikhao', 'contact par le jao', 'contact par chalo', 'rabta karna hai',
      'رابطہ', 'ای میل', 'رابطہ دکھاؤ', 'رابطہ پر لے جاؤ', 'رابطہ کرنا ہے'
    ],
  },
  {
    id: 'hero',
    alias: 'start',
    label: 'Top',
    icon: ArrowRight,
    color: '#00F2FE',
    keywords: [
      'upar', 'top', 'hero', 'home', 'shuru', 'start', 'wapas',
      'upar jao', 'wapas upar', 'wapas chalo', 'upar le jao', 'start par jao', 'start par le jao',
      'shuru mein jao', 'shuru par le jao', 'wapas start', 'wapas shuru',
      'اوپر', 'ہیرو', 'شروع', 'واپس', 'شروع پر لے جاؤ', 'اوپر لے چلو', 'آغاز'
    ],
  },
];

// In-Depth Concise Explanations for Each Section (Arrival announcement + What it does + Prompt next action)
const SECTION_EXPLANATIONS = {
  projects: {
    label: 'Systems & Projects',
    urdu: "جی! ہم سسٹمز اور پروجیکٹس پر آ گئے ہیں۔ یہاں سمیر کے کلاؤڈ سسٹمز اور اسکیل ایبل پلیٹ فارمز ہیں جو سب-15 ملی سیکنڈ ڈیٹا بیس اور 99.99 فیصد اپ ٹائم پر فعال ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum systems aur projects par aa gaye hain. Yahan Sameer ke cloud systems aur scalable platforms hain jo sub-15 millisecond database aur 99.99 percent uptime par faal hain. Farmaiye ab kahan chalein?",
  },
  film: {
    label: 'Built in Orbit Film',
    urdu: "جی! ہم فلم سیکشن پر آ گئے ہیں۔ بلٹ ان اوربٹ فلم سمیر کا فریم ایکوریٹ سنیما شوکیس ہے جو ری موشن پر 30 فریم فی سیکنڈ پر بنا ہے۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum film section par aa gaye hain. Built in Orbit film Sameer ka frame-accurate cinema showcase hai jo Remotion par 30 frames per second par bana hai. Farmaiye ab kahan chalein?",
  },
  architecture: {
    label: 'Microservices Topology',
    urdu: "جی! ہم مائیکروسروسز ٹوپولوجی پر آ گئے ہیں۔ یہ سمیر کے کلاؤڈ انفراسٹرکچر کا لائیو نیٹ ورک میش ہے جس میں گلوبل ایج روٹنگ اور زیرو ٹرسٹ سیکیورٹی فعال ہے۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum microservices topology par aa gaye hain. Yeh Sameer ke cloud infrastructure ka live network mesh hai jis mein global edge routing aur zero-trust security faal hai. Farmaiye ab kahan chalein?",
  },
  code: {
    label: 'Code Inspector',
    urdu: "جی! ہم پروڈکشن کوڈ انسپیکٹر پر آ گئے ہیں۔ یہاں سمیر کے ری ایکٹو الگورتھمز اور کلین ٹائپ اسکرپٹ کوڈ کے نمونے موجود ہیں جن کا آپ لائیو معائنہ کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum production code inspector par aa gaye hain. Yahan Sameer ke reactive algorithms aur clean TypeScript code ke namoone maujood hain jin ka aap live muayana kar sakte hain. Farmaiye ab kahan chalein?",
  },
  'api-playground': {
    label: 'API Suite',
    urdu: "جی! ہم لائیو API سویٹ پر آ گئے ہیں۔ یہاں آپ سمیر کے پروڈکشن مائیکروسروسز اینڈ پوائنٹس کو کال کر کے ریئل ٹائم رسپانس اور لیٹنسی چیک کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum live API suite par aa gaye hain. Yahan aap Sameer ke production microservices endpoints ko call kar ke real-time response aur latency check kar sakte hain. Farmaiye ab kahan chalein?",
  },
  skills: {
    label: 'Technical Skills',
    urdu: "جی! ہم ٹیکنیکل اسکلز سیکشن پر آ گئے ہیں۔ اس میں ری ایکٹ 18، نیکسٹ جے ایس، نوڈ، پوسٹگریس اور ڈاکر سمیت سمیر کی تمام کور ٹیکنالوجیز شامل ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum technical skills section par aa gaye hain. Is mein React 18, Next.js, Node, PostgreSQL aur Docker samet Sameer ki tamam core technologies shamil hain. Farmaiye ab kahan chalein?",
  },
  'tech-sphere': {
    label: '3D Matrix',
    urdu: "جی! ہم تھری ڈی انٹرایکٹو میٹرکس پر آ گئے ہیں۔ یہ ویب جی ایل پر مبنی پارٹیکل گلوب ہے جو سمیر کی 3D موشن اور گرافکس صلاحیتوں کو ظاہر کرتا ہے۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum 3D interactive matrix par aa gaye hain. Yeh WebGL par mabni particle globe hai jo Sameer ki 3D motion aur graphics salahiyaton ko zahir karta hai. Farmaiye ab kahan chalein?",
  },
  terminal: {
    label: 'Developer CLI Terminal',
    urdu: "جی! ہم ڈویلپر سی ایل آئی ٹرمینل پر آ گئے ہیں۔ یہاں آپ سمیر کے پورٹ فولیو کی تمام کسٹم کمانڈز اور سسٹم انفو لائیو رن کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum developer CLI terminal par aa gaye hain. Yahan aap Sameer ke portfolio ki tamam custom commands aur system info live run kar sakte hain. Farmaiye ab kahan chalein?",
  },
  contact: {
    label: 'Contact Suite',
    urdu: "جی! ہم کانٹیکٹ سیکشن پر آ گئے ہیں۔ یہاں سے آپ سمیر کو نئے پروجیکٹ کے لیے ہائر کر سکتے ہیں یا ای میل کے ذریعے فوری رابطہ کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum contact section par aa gaye hain. Yahan se aap Sameer ko naye project ke liye hire kar sakte hain ya email ke zariye fori rabta kar sakte hain. Farmaiye ab kahan chalein?",
  },
  hero: {
    label: 'Hero Section',
    urdu: "جی چلیے! ہم واپس شروع یعنی ہیرو سیکشن پر آ گئے ہیں۔ یہاں سمیر حسین کا تعارف اور لائیو سسٹم میٹرکس موجود ہیں۔ فرمائیے اب کس سیکشن پر لے کر چلوں؟",
    roman: "Jee chaliye! Hum wapas shuru yaani hero section par aa gaye hain. Yahan Sameer Hussain ka taaruf aur live system matrix maujood hain. Farmaiye ab kis section par le kar chaloon?",
  },
};

// Required Initial Greeting in Pakistani Urdu for Alina
const INITIAL_GREETING_URDU = "خوش آمدید! میں علینہ ہوں، سمیر حسین کی اسسٹنٹ۔ آپ کو اس پورٹ فولیو کے کون سے حصے پر لے کر جاؤں؟";
const INITIAL_GREETING_ROMAN = "Khushamdeed! Main Alina hoon, Sameer Hussain ki assistant. Aap ko is portfolio ke kon se hisse per le kar jaaun?";

// Comprehensive Conversational AI Knowledge Base for Alina
const AI_KNOWLEDGE_BASE = [
  // 1. Detailed Portfolio Introduction (when user asks what is here / what it does)
  {
    intent: 'portfolio_introduction',
    triggers: [
      'intro do', 'introduction', 'intro', 'taaruf', 'portfolio intro', 'is portfolio mein kya hai',
      'portfolio ke bare mein batao', 'kya kya cheezein hain', 'kya kaam karti hain', 'website mein kya hai',
      'portfolio explain karo', 'sab explain karo', 'portfolio ka introduction', 'overview do', 'website ka intro',
      'tell me about this portfolio', 'what is this website', 'features batao', 'kya kya hai yahan', 'تعارف'
    ],
    urdu: "سمیر حسین کے اس پورٹ فولیو میں آٹھ جدید ترین سسٹمز شامل ہیں۔ پہلا، بلٹ ان اوربٹ فلم جو ری موشن پر ویڈیو شوکیس ہے۔ دوسرا، فلیگ شپ کلاؤڈ سسٹمز اور پروجیکٹس۔ تیسرا، مائیکروسروسز میش ٹوپولوجی جس کی لیٹنسی بارہ ملی سیکنڈ ہے۔ چوتھا، لائیو کوڈ انسپیکٹر جس میں پروڈکشن الگورتھمز ہیں۔ پانچواں، لائیو API ٹیسٹنگ سوٹ۔ چھٹا، ٹیکنیکل اسکلز میٹرکس۔ ساتواں، انٹرایکٹو تھری ڈی میٹرکس۔ اور آٹھواں، لائیو ڈویلپر سی ایل آئی ٹرمینل۔ آپ جس سیکشن پر جانا چاہیں، بس فرمائیے میں لے چلوں گی۔",
    roman: "Sameer Hussain ke is portfolio mein aath jadeed systems shamil hain. Pehla, 'Built in Orbit' film jo Remotion 30 fps par video showcase hai. Doosra, flagship cloud systems aur platforms. Teesra, microservices mesh topology jis ki latency sirf 12 millisecond hai. Chautha, live code inspector jis mein production algorithms hain. Panchwa, live API testing suite. Chhata, technical skills matrix. Satwa, interactive 3D matrix globe. Aur aathwa, live developer CLI terminal. Aap jis section par jana chahein, bas mujhe batayein main aap ko wahan le chaloon gi.",
  },
  // 2. About Sameer
  {
    intent: 'about_sameer',
    triggers: ['sameer', 'kaun hai', 'kon hai', 'who is', 'about sameer', 'developer', 'creator', 'sameer hussain', 'سمیر کون ہے', 'سمیر'],
    urdu: "سمیر حسین ایک سینئر فل اسٹیک ڈویلپر اور کلاؤڈ سسٹمز آرکیٹیکٹ ہیں۔ وہ اسکیل ایبل کلاؤڈ پلیٹ فارمز، ہائی پرفارمنس APIs اور 3D ویب سسٹمز بناتے ہیں۔",
    roman: "Sameer Hussain aik senior full-stack developer aur cloud systems architect hain. Woh scalable cloud platforms, high-performance APIs aur 3D web systems banate hain.",
  },
  // 3. Experience & Background
  {
    intent: 'experience',
    triggers: ['experience', 'tajurba', 'kitna experience', 'career', 'background', 'work history', 'تجربہ'],
    urdu: "سمیر کو انٹرپرائز فل اسٹیک ڈویلپمنٹ، کلاؤڈ مائیکروسروسز اور ننانوے اعشاریہ نو نو فیصد اپ ٹائم سسٹمز کا وسیع تجربہ ہے۔",
    roman: "Sameer ko enterprise full-stack development, cloud microservices aur 99.99 percent uptime systems ka waseeh tajurba hai.",
  },
  // 4. Alina's Identity
  {
    intent: 'identity',
    triggers: ['tum kaun ho', 'tum kon ho', 'aap kaun', 'who are you', 'what is your name', 'naam kya', 'alina', 'علینہ', 'تم کون ہو'],
    urdu: "میں علینہ ہوں، سمیر حسین کی خودمختار AI اسسٹنٹ۔ میں آپ کو پورٹ فولیو کے ہر سیکشن اور پروجیکٹ کی معلومات دے سکتی ہوں۔",
    roman: "Main Alina hoon, Sameer Hussain ki autonomous AI assistant. Main aap ko portfolio ke har section aur project ki maloomat de sakti hoon.",
  },
  // 5. Greetings
  {
    intent: 'greeting',
    triggers: ['salam', 'assalam', 'asalam', 'hello', 'hi', 'hey', 'adaab', 'سلام'],
    urdu: "وعلیکم السلام! میں علینہ ہوں۔ فرمائیے میں سمیر کے پورٹ فولیو میں آپ کی کیا رہنمائی کروں؟",
    roman: "Walaikum Assalam! Main Alina hoon. Farmaiye main Sameer ke portfolio mein aap ki kya rehnumai karoon?",
  },
  // 6. How are you
  {
    intent: 'how_are_you',
    triggers: ['kaise ho', 'kaisi ho', 'kya haal', 'how are you', 'haal chal', 'کیسی ہو'],
    urdu: "الحمدللہ میں بالکل ٹھیک ہوں۔ آپ بتائیے، سمیر کا کون سا پروجیکٹ یا سسٹم دیکھنا پسند کریں گے؟",
    roman: "Alhamdulillah main bilkul theek hoon. Aap bataiye, Sameer ka kon sa project ya system dekhna pasand karein ge?",
  },
  // 7. Thanks
  {
    intent: 'thanks',
    triggers: ['shukriya', 'shukria', 'thanks', 'thank you', 'bohot shukriya', 'meherbani', 'شکریہ'],
    urdu: "آپ کا بہت شکریہ! اگر مزید کچھ پوچھنا ہو تو میں یہیں موجود ہوں۔",
    roman: "Aap ka bohot shukriya! Agar mazeed kuch poochna ho to main yaheen maujood hoon.",
  },
  // 8. Goodbye
  {
    intent: 'goodbye',
    triggers: ['allah hafiz', 'khuda hafiz', 'bye', 'goodbye', 'alvida', 'اللہ حافظ'],
    urdu: "اللہ حافظ! اپنا خیال رکھیے گا اور سمیر کے کام کا جائزہ ضرور لیجیے گا۔",
    roman: "Allah Hafiz! Apna khayal rakhiye ga aur Sameer ke kaam ka jaiza zaroor lijiye ga.",
  },
];

// Bulletproof Bilingual & Phonetic Matcher for Pakistani Urdu + Roman Urdu + English
const checkKeywordMatch = (transcript, keywords) => {
  if (!transcript || !keywords || !keywords.length) return false;
  const clean = transcript.trim().toLowerCase();

  for (const kw of keywords) {
    const target = kw.toLowerCase().trim();
    if (!target) continue;

    // 1. Direct equality
    if (clean === target) return true;

    // 2. Direct string inclusion (covers Urdu script phrases and multi-word English/Roman)
    if (clean.includes(target)) return true;

    // 3. Word boundary regex for single words
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[\\s.,!?؛،_])${escaped}([\\s.,!?؛،_]|$)`, 'i');
    if (regex.test(clean)) return true;
  }
  return false;
};

export const CosmicAvatar = ({ size = 480, className = "" }) => {
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const isSpeakingRef = useRef(false);
  const speechCooldownUntilRef = useRef(0);
  const isListeningRef = useRef(false);
  const lastActionTimestampRef = useRef(0);
  const activeUtteranceRef = useRef(null);
  const speechSafetyTimeoutRef = useRef(null);
  const recognitionLangRef = useRef('ur-PK'); // Primary: Pakistani Urdu (with fallback)

  // Active section tracking (Default: hero)
  const currentSectionRef = useRef('hero');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState('');

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

  // Natural Pakistani Urdu Speech Synthesis Engine with Rock-Solid Echo Protection & Auto-Ducking
  const speak = useCallback((urduText, romanText = '', onComplete) => {
    // 1. Immediately duck background flute music so user hears Alina clearly
    fluteEngine.duck();

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSpeaking(true);
      isSpeakingRef.current = true;
      speechCooldownUntilRef.current = Date.now() + 2500;
      setTimeout(() => {
        setIsSpeaking(false);
        isSpeakingRef.current = false;
        fluteEngine.unduck();
        if (onComplete) onComplete();
      }, 2500);
      return;
    }

    try {
      window.speechSynthesis.cancel();

      isSpeakingRef.current = true;
      setIsSpeaking(true);
      speechCooldownUntilRef.current = Date.now() + 5000;

      const utterance = new SpeechSynthesisUtterance(romanText || urduText);
      // Retain global and ref handle to prevent Chrome V8 garbage collection bug
      window.__alinaUtterance = utterance;
      activeUtteranceRef.current = utterance;

      const voices = window.speechSynthesis.getVoices();

      // Natural female voice search
      const preferredVoice =
        voices.find((v) => (v.lang.includes('ur') || v.lang.includes('hi')) && !v.name.includes('Hemant')) ||
        voices.find((v) => (v.name.includes('Zira') || v.name.includes('Jenny') || v.name.includes('Samantha') || v.name.includes('Victoria') || v.name.includes('Female') || v.name.includes('Natural'))) ||
        voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
        voices.find((v) => v.lang.startsWith('en'));

      if (preferredVoice) utterance.voice = preferredVoice;
      utterance.pitch = 1.18; // Warm, polite feminine presenter tone
      utterance.rate = 0.88; // Normal, crystal-clear understandable cadence

      let hasFinished = false;
      const handleSpeechFinish = () => {
        if (hasFinished) return;
        hasFinished = true;
        if (speechSafetyTimeoutRef.current) {
          clearTimeout(speechSafetyTimeoutRef.current);
          speechSafetyTimeoutRef.current = null;
        }

        setIsSpeaking(false);
        isSpeakingRef.current = false;
        // 250ms quick grace period so mic becomes hot and listening immediately
        speechCooldownUntilRef.current = Date.now() + 250;

        // Auto-restore background flute music when Alina finishes speaking
        fluteEngine.unduck();

        window.__alinaUtterance = null;
        activeUtteranceRef.current = null;

        if (onComplete) onComplete();

        // Safely restart hot mic recognition
        setTimeout(() => {
          if (!isSpeakingRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (e) {}
          }
        }, 200);
      };

      utterance.onend = handleSpeechFinish;
      utterance.onerror = handleSpeechFinish;

      // Watchdog Safety Timer: Force finish if browser SpeechSynthesis hangs or drops onend
      const maxSpeechDuration = Math.max(3000, (romanText || urduText).length * 85 + 2000);
      speechSafetyTimeoutRef.current = setTimeout(handleSpeechFinish, maxSpeechDuration);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      setIsSpeaking(false);
      isSpeakingRef.current = false;
      fluteEngine.unduck();
      if (onComplete) onComplete();
    }
  }, []);

  // Multi-Strategy Teleport Navigation Function (Navigates to Section AND Explains it immediately)
  const teleportTo = useCallback(
    (targetId) => {
      // 1. Immediately cancel any ongoing speech so Alina responds to the new section instantly
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch (e) {}
      }
      isSpeakingRef.current = false;
      setIsSpeaking(false);
      speechCooldownUntilRef.current = 0;

      // 2. Update active section tracker
      currentSectionRef.current = targetId;

      // 3. Retrieve concise, natural explanation
      const explanation = SECTION_EXPLANATIONS[targetId] || SECTION_EXPLANATIONS['projects'];
      const sectionName = explanation?.label || targetId;
      setLiveFeedback(`جا رہے ہیں: ${sectionName} ➜`);
      setTimeout(() => setLiveFeedback(''), 3500);

      const speechUrdu = explanation?.urdu || "جی! ہم پہنچ گئے ہیں۔ فرمائیے اب کہاں چلیں؟";
      const speechRoman = explanation?.roman || "Jee! Hum pohanch gaye hain. Farmaiye ab kahan chalein?";

      // 4. Speak arrival confirmation + in-depth explanation verbally in Pakistani Urdu
      speak(speechUrdu, speechRoman);

      // 5. Robust Section Element Finder
      const getTargetElement = (id) => {
        if (id === 'projects' || id === 'systems') {
          return document.getElementById('projects') || document.querySelector('section#projects') || document.getElementById('systems');
        }
        if (id === 'code' || id === 'code-inspector') {
          return document.getElementById('code') || document.querySelector('section#code') || document.getElementById('code-inspector');
        }
        if (id === 'api-playground' || id === 'api' || id === 'api-suite') {
          return document.getElementById('api-playground') || document.querySelector('section#api-playground') || document.getElementById('api');
        }
        if (id === 'architecture' || id === 'topology') {
          return document.getElementById('architecture') || document.querySelector('section#architecture') || document.getElementById('topology');
        }
        if (id === 'skills') {
          return document.getElementById('skills') || document.querySelector('section#skills');
        }
        if (id === 'tech-sphere' || id === 'matrix') {
          return document.getElementById('tech-sphere') || document.querySelector('section#tech-sphere');
        }
        if (id === 'terminal' || id === 'cli') {
          return document.getElementById('terminal') || document.querySelector('section#terminal');
        }
        if (id === 'contact') {
          return document.getElementById('contact') || document.querySelector('section#contact');
        }
        if (id === 'film') {
          return document.getElementById('film') || document.querySelector('section#film');
        }
        return document.getElementById(id) || document.querySelector(`[data-section="${id}"]`);
      };

      // 6. Perform smooth scroll with navbar offset
      const executeScroll = () => {
        // Return to start / top / hero
        if (targetId === 'hero' || targetId === 'start' || targetId === 'top') {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          try {
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', window.location.pathname);
            }
          } catch (e) {}
          return;
        }

        const el = getTargetElement(targetId);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const targetOffset = Math.max(0, rect.top + scrollTop - 85);

        window.scrollTo({
          top: targetOffset,
          behavior: 'smooth',
        });

        if (el.scrollIntoView) {
          try {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } catch (e) {}
        }

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
      setTimeout(executeScroll, 250);
    },
    [speak]
  );

  // High-Sensitivity Real-Time Speech Recognition (Triggers on 1st Time Instantly!)
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
      recognition.lang = recognitionLangRef.current || 'ur-PK';
      recognition.continuous = true;
      recognition.interimResults = true; // INSTANT LIVE RECOGNITION (Triggers on first syllable/word!)

      recognition.onstart = () => {
        setIsListening(true);
        isListeningRef.current = true;
      };

      recognition.onresult = (event) => {
        // Loop over recent results (both interim and final) for instant 1st-try recognition!
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const rawTranscript = event.results[i][0].transcript.toLowerCase();
          const cleanTranscript = rawTranscript.replace(/[.,?!]/g, '').trim();

          if (!cleanTranscript || cleanTranscript.length < 2) continue;

          // As soon as user speaks, duck background flute music immediately
          fluteEngine.duck();

          // 1. Check Return-to-Start / Top / Hero Requests (Highest Priority for returning!)
          const returnTopWords = [
            'wapas start', 'start par', 'start pe', 'shuru par', 'shuru pe', 'wapas shuru',
            'wapas upar', 'wapas chalo', 'upar le jao', 'upar chalo', 'back to top',
            'upar jao', 'wapas le jao', 'hero par jao', 'top par jao', 'home par jao',
            'start par le jao', 'shuru mein le jao', 'wapas chalen', 'shuru se',
            'start pr', 'start pr le jao', 'start pr chalo', 'wapas pr', 'wapas', 'upar', 'shuru',
            'واپس اوپر', 'اوپر لے جاؤ', 'واپس چلو', 'اوپر چلو', 'شروع پر', 'واپس شروع',
            'اسٹارٹ پر', 'واپس اسٹارٹ', 'اوپر جاؤ', 'شروع میں لے جاؤ', 'واپس لے جاؤ', 'شروع', 'واپس'
          ];
          if (checkKeywordMatch(cleanTranscript, returnTopWords)) {
            lastActionTimestampRef.current = Date.now();
            teleportTo('hero');
            return;
          }

          // 2. Direct Section Navigation (Highest Priority for navigating to any specific section!)
          const matchedNav = NAV_TARGETS.find((target) =>
            checkKeywordMatch(cleanTranscript, target.keywords)
          );

          if (matchedNav) {
            // Echo guard: if Alina is already speaking her explanation of THIS same section, ignore echo
            if (isSpeakingRef.current && currentSectionRef.current === matchedNav.id) {
              continue;
            }
            lastActionTimestampRef.current = Date.now();
            teleportTo(matchedNav.id);
            return;
          }

          // If Alina is speaking and input was not a navigation command, ignore ambient voice
          if (isSpeakingRef.current || Date.now() < speechCooldownUntilRef.current) {
            continue;
          }

          // Debounce guard for knowledge and conversational queries
          if (Date.now() - lastActionTimestampRef.current < 700) {
            continue;
          }

          // 3. Conversational AI Knowledge Engine (Portfolio Introduction, Sameer, Experience, Identity, etc.)
          const matchedKnowledge = AI_KNOWLEDGE_BASE.find((entry) =>
            checkKeywordMatch(cleanTranscript, entry.triggers)
          );

          if (matchedKnowledge) {
            lastActionTimestampRef.current = Date.now();
            speak(matchedKnowledge.urdu, matchedKnowledge.roman);
            return;
          }

          // 4. On-Demand Explanation of Current Section (when user says "explain karo", "ye kya hai", "batao")
          const explainWords = [
            'explain', 'explain karo', 'ye kya hai', 'is ke bare mein batao',
            'is section ko explain karo', 'ye kya kaam karta hai', 'detail batao',
            'details', 'tell me about this', 'what is this', 'batao', 'تفصیل', 'وضاحت', 'سمجھاؤ', 'بتاؤ', 'بتاو'
          ];
          if (checkKeywordMatch(cleanTranscript, explainWords)) {
            lastActionTimestampRef.current = Date.now();
            const currentSec = currentSectionRef.current || 'hero';
            const explanation = SECTION_EXPLANATIONS[currentSec] || SECTION_EXPLANATIONS['hero'];
            speak(explanation.urdu, explanation.roman);
            return;
          }
        }
      };

      recognition.onerror = (e) => {
        setIsListening(false);
        isListeningRef.current = false;
        if (!isSpeakingRef.current) fluteEngine.unduck();

        // If Urdu language model not found on local OS, automatically switch to en-US fallback
        if (e && e.error === 'language-not-supported' && recognitionLangRef.current !== 'en-US') {
          recognitionLangRef.current = 'en-US';
        }

        // Resilient restart after brief pause
        setTimeout(() => {
          if (!isSpeakingRef.current) {
            initAutoVoiceRecognition();
          }
        }, 300);
      };

      recognition.onend = () => {
        setIsListening(false);
        isListeningRef.current = false;
        if (!isSpeakingRef.current) fluteEngine.unduck();

        // Hot Mic auto-restart: keeps recognition hot and listening immediately
        setTimeout(() => {
          if (!isSpeakingRef.current) {
            initAutoVoiceRecognition();
          }
        }, 150);
      };

      recognition.start();
    } catch (err) {}
  }, [speak, teleportTo]);

  // Resilient Hot-Mic Supervisor (Heartbeat Engine): Guarantees microphone never dies
  useEffect(() => {
    const micSupervisor = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        !isSpeakingRef.current &&
        !isListeningRef.current
      ) {
        initAutoVoiceRecognition();
      }
    }, 800);

    return () => clearInterval(micSupervisor);
  }, [initAutoVoiceRecognition]);

  // Activate ambient music and hot mic on first user gesture (quiet & ready)
  useEffect(() => {
    const handleGesture = () => {
      fluteEngine.start();
      initAutoVoiceRecognition();
    };

    try {
      handleGesture();
    } catch (e) {}

    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, handleGesture, { passive: true }));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleGesture));
    };
  }, [initAutoVoiceRecognition]);

  // Avatar Click Handler
  const handleAvatarClick = () => {
    fluteEngine.start();
    initAutoVoiceRecognition();
    speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN);
  };

  // Dedicated Mic Toggle / Re-activate Handler
  const handleMicToggle = (e) => {
    if (e) e.stopPropagation();
    // 1. Immediately cancel any speaking so mic is 100% responsive
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {}
    }
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    speechCooldownUntilRef.current = 0;
    fluteEngine.start();

    // 2. Restart hot mic
    initAutoVoiceRecognition();
  };

  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 10;

  return (
    <div className="flex flex-col items-center relative w-full select-none">
      {/* Main Ethereal Cosmic AI Stage (Alina) */}
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
        title="ALINA // DEV-75 AI CO-PILOT — Speak or click to navigate"
      >
        {/* Deep Core Ambient Cyan Nebula Aurora Spotlight Glow */}
        <div
          className={`absolute rounded-full blur-[85px] pointer-events-none transition-all duration-700 ${
            isSpeaking
              ? 'scale-130 opacity-95'
              : isHovered
              ? 'scale-115 opacity-80'
              : 'opacity-65'
          }`}
          style={{
            width: '85%',
            height: '85%',
            background: 'radial-gradient(circle, #00F2FE 0%, #00FFE0 35%, #7928CA 65%, rgba(0, 242, 254, 0) 80%)',
          }}
        />

        {/* Ethereal Cosmic AI Stage Card (Alina) */}
        <div
          className="relative z-10 w-full rounded-3xl overflow-hidden border border-energy-teal/40 bg-space-900/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,242,254,0.3)] transition-transform duration-200 ease-out group-hover:border-energy-teal/80"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(20px)`,
            animation: 'avatarLevitate 5s ease-in-out infinite',
          }}
        >
          {/* Top Holographic Broadcast Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-space-950/85 border-b border-slate-800/80">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-energy-teal" />
              </span>
              <span className="font-mono text-[10px] font-black text-white tracking-widest uppercase">
                ETHEREAL AI CORE // DEV-75 STUDIO
              </span>
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-[10px] text-energy-teal">
              <Radio className="w-3 h-3 text-energy-cyan animate-pulse" />
              <span>ALINA // CO-PILOT</span>
            </div>
          </div>

          {/* High-Resolution Ethereal Celestial AI Character Image (Alina) */}
          <div className="relative w-full aspect-[16/11] overflow-hidden bg-space-950 flex items-center justify-center">
            {/* The Main Presenter Character Container with Subtle Ethereal Pulse */}
            <div
              className={`w-full h-full relative transition-transform duration-300 flex items-center justify-center ${
                isSpeaking ? 'animate-presenterSpeakingGesture' : ''
              }`}
            >
              <img
                src={alinaAvatarImg}
                alt="Alina - Ethereal Cosmic AI Co-Pilot"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cyan Cosmic Sheen Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-energy-cyan/15 pointer-events-none transition-opacity duration-500 ${
                  isSpeaking ? 'opacity-90' : 'opacity-40'
                }`}
              />
            </div>
          </div>

          {/* Broadcast Desk Footer with Title Plate */}
          <div className="px-5 py-3 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-t border-slate-800 flex items-center justify-between">
            <div>
              <p className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                ALINA // DEV-75 CO-PILOT
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
      <div className="flex flex-col items-center gap-2.5 mt-4 z-20 w-full max-w-xl px-2">
        {/* Interactive Live Audio & Listening Status HUD Button */}
        <button
          onClick={handleMicToggle}
          className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border font-mono text-[11px] transition-all cursor-pointer shadow-sm active:scale-95 ${
            isSpeaking
              ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
              : isListening
              ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-rose-500/15 border-rose-500/50 text-rose-300 hover:bg-rose-500/25'
          }`}
          title="Click to toggle or restart listening microphone"
        >
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
              isSpeaking ? 'bg-amber-400' : isListening ? 'bg-emerald-400' : 'bg-rose-400'
            } opacity-75`} />
            <span className={`relative inline-flex rounded-full h-2 w-2 ${
              isSpeaking ? 'bg-amber-500' : isListening ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />
          </span>
          <span className="font-semibold tracking-wide">
            {isSpeaking
              ? 'علینہ بول رہی ہے (Alina Speaking...)'
              : isListening
              ? 'علینہ سن رہی ہے — کچھ بھی بولیں (Mic Listening)'
              : 'مائیک فعال کریں (Click to Speak)'}
          </span>
        </button>

        {/* Live Recognized Navigation Feedback */}
        {liveFeedback && (
          <div className="px-3.5 py-1 rounded-full bg-energy-teal/20 border border-energy-teal/60 text-energy-cyan font-mono text-xs font-semibold animate-pulse shadow-[0_0_20px_rgba(0,242,254,0.4)]">
            {liveFeedback}
          </div>
        )}

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
                    teleportTo(tgt.id);
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
        @keyframes presenterSpeakingGesture {
          0%, 100% {
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          20% {
            transform: translateY(-2px) rotate(0.35deg) scale(1.006);
          }
          45% {
            transform: translateY(-1px) rotate(-0.25deg) scale(1.003);
          }
          70% {
            transform: translateY(-2.8px) rotate(0.45deg) scale(1.008);
          }
          90% {
            transform: translateY(-0.8px) rotate(-0.15deg) scale(1.002);
          }
        }
      `}</style>
    </div>
  );
};
