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
  ArrowUp,
  Radio,
  Sparkles,
  Briefcase,
  Calculator,
  Quote,
  Send,
  Mic,
  HelpCircle
} from 'lucide-react';
import { fluteEngine } from '../utils/fluteEngine';
import alinaAvatarImg from '../assets/alina_entity.png';

// Navigation Targets — voice + click + typed commands (two-way hopping)
const NAV_TARGETS = [
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#00F2FE',
    keywords: [
      'film', 'flim', 'filam', 'video', 'movie', 'cinema', 'built in orbit',
      'film dikhao', 'video dikhao', 'film par le jao', 'film par chalo', 'film per le jao',
      'film pr', 'film pr le jao', 'film pr chalo', 'film dekho', 'film dekhna hai',
      'back film', 'back to film', 'wapis film', 'wapas film', 'film par wapas', 'film pr wapis',
      'فلم', 'ویڈیو', 'سینما', 'فلم دکھاؤ', 'فلم پر لے جاؤ', 'فلم پر چلو', 'فلم پر واپس', 'واپس فلم'
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
      'platform', 'platforms', 'system dikhao', 'nexuscloud', 'nexus cloud',
      'systems dikhao', 'projects dikhao', 'projects par le jao', 'systems par le jao',
      'projects par chalo', 'systems par chalo', 'systems per le jao', 'projects per le jao',
      'systems pr', 'systems pr le jao', 'systems pr chalo', 'system pr le jao',
      'projects pr', 'projects pr le jao', 'projects pr chalo', 'project pr le jao',
      'systems dekhna hai', 'projects dekhna hai',
      'back systems', 'back to systems', 'back projects', 'back to projects',
      'wapis systems', 'wapas systems', 'wapis projects', 'systems par wapas', 'projects par wapas',
      'سسٹم', 'سسٹمز', 'پروجیکٹ', 'پروجیکٹس',
      'پروجیکٹ دکھاؤ', 'سسٹم دکھاؤ', 'سسٹمز پر لے جاؤ', 'پروجیکٹس پر لے جاؤ', 'سسٹمز پر واپس'
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
      'topology dikhao', 'architecture dikhao', 'topology par le jao', 'topology par chalo',
      'topology per le jao', 'topology pr le jao', 'topology pr chalo',
      'back topology', 'back to topology', 'back architecture', 'wapis topology', 'wapas topology',
      'آرکیٹیکچر', 'ٹوپولوجی', 'کلاؤڈ', 'ٹوپولوجی دکھاؤ', 'ٹوپولوجی پر لے جاؤ', 'ٹوپولوجی پر واپس'
    ],
  },
  {
    id: 'code',
    alias: 'code-inspector',
    label: 'Code',
    icon: Code2,
    color: '#38BDF8',
    keywords: [
      'code', 'coding', 'inspector', 'algorithm', 'algorithms', 'typescript', 'sql', 'production code',
      'source code', 'kod', 'kood', 'code dikhao', 'code dekhao', 'coding dikhao',
      'code par le jao', 'code per le jao', 'code pe le jao', 'code pr', 'code pr le jao', 'code pr chalo',
      'coding pr', 'coding pr le jao', 'code par chalo', 'code inspector', 'code batao', 'code dekho',
      'back code', 'back to code', 'wapis code', 'wapas code', 'code par wapas',
      'کوڈ', 'الگورتھم', 'کوڈنگ', 'کوڈ دکھاؤ', 'کوڈ پر لے جاؤ', 'کوڈ پر چلو', 'کوڈ پر واپس'
    ],
  },
  {
    id: 'api-playground',
    alias: 'api',
    label: 'API Suite',
    icon: Zap,
    color: '#EC4899',
    keywords: [
      'api', 'apis', 'api suite', 'api-suite', 'playground', 'endpoint', 'endpoints', 'api test',
      'test suite', 'api sweet', 'api suit', 'api dikhao', 'api suite dikhao',
      'api par le jao', 'api per le jao', 'api pe le jao', 'api pr', 'api pr le jao', 'api pr chalo',
      'api suite pr', 'api suite pr le jao', 'api suite par le jao', 'api batao', 'suite dikhao',
      'back api', 'back to api', 'back api suite', 'wapis api', 'wapas api suite',
      'اے پی آئی', 'اے پی ائی', 'اے پی آئی سویٹ', 'سویٹ', 'پلے گراؤنڈ',
      'اے پی آئی دکھاؤ', 'اے پی آئی پر لے جاؤ', 'اے پی آئی پر واپس'
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
      'skills pr', 'skills pr le jao', 'skills pr chalo', 'skills dekhna hai',
      'back skills', 'back to skills', 'wapis skills', 'wapas skills', 'skills par wapas',
      'اسکلز', 'ٹیکنالوجی', 'ہنر', 'اسکلز دکھاؤ', 'اسکلز پر لے جاؤ', 'اسکلز پر واپس'
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: Briefcase,
    color: '#F472B6',
    keywords: [
      'services', 'service', 'offerings', 'solutions', 'kya offer', 'services dikhao',
      'services par le jao', 'services pr', 'services pr le jao', 'services par chalo',
      'back services', 'wapis services', 'wapas services',
      'سروسز', 'سروس', 'خدمات', 'سروسز دکھاؤ', 'سروسز پر لے جاؤ', 'سروسز پر واپس'
    ],
  },
  {
    id: 'estimator',
    alias: 'scope',
    label: 'Estimator',
    icon: Calculator,
    color: '#22D3EE',
    keywords: [
      'estimator', 'estimate', 'scope', 'calculator', 'milestone', 'sprints', 'pricing',
      'estimator dikhao', 'scope dikhao', 'calculator dikhao', 'estimator par le jao',
      'scope pr le jao', 'estimator pr', 'cost batao', 'kitna time',
      'back estimator', 'wapis estimator', 'wapas scope',
      'ایسٹی میٹر', 'اسکوپ', 'کیلکولیٹر', 'ایسٹی میٹر پر لے جاؤ'
    ],
  },
  {
    id: 'testimonials',
    alias: 'reviews',
    label: 'Reviews',
    icon: Quote,
    color: '#34D399',
    keywords: [
      'testimonials', 'testimonial', 'reviews', 'review', 'feedback', 'client feedback',
      'testimonials dikhao', 'reviews dikhao', 'testimonials par le jao', 'reviews pr le jao',
      'back testimonials', 'wapis reviews',
      'ریویوز', 'ٹیسٹیمونیل', 'فیڈبیک', 'ریویوز دکھاؤ', 'ریویوز پر لے جاؤ'
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
      '3d par le jao', 'matrix par le jao', '3d matrix', 'matrix par chalo', 'matrix pr',
      'back matrix', 'back 3d', 'wapis matrix',
      'تھری ڈی', 'میٹرکس', 'تھری ڈی دکھاؤ', 'میٹرکس پر لے جاؤ'
    ],
  },
  {
    id: 'terminal',
    alias: 'cli',
    label: 'CLI',
    icon: Terminal,
    color: '#A855F7',
    keywords: [
      'terminal', 'cli', 'shell', 'bash', 'console', 'command line',
      'terminal dikhao', 'terminal kholo', 'terminal par le jao', 'terminal par chalo',
      'terminal pr', 'terminal pr le jao', 'back terminal', 'back cli', 'wapis terminal',
      'ٹرمینل', 'سی ایل آئی', 'ٹرمینل دکھاؤ', 'ٹرمینل پر لے جاؤ'
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
      'contact pr', 'contact pr le jao', 'hire karo', 'hire sameer',
      'back contact', 'wapis contact',
      'رابطہ', 'ای میل', 'رابطہ دکھاؤ', 'رابطہ پر لے جاؤ', 'ہائر'
    ],
  },
  {
    id: 'hero',
    alias: 'start',
    label: 'Top',
    icon: ArrowUp,
    color: '#00F2FE',
    keywords: [
      'back top', 'back to top', 'top', 'top pr', 'top par', 'top pe', 'wapis top', 'wapas top',
      'back to start', 'wapis start', 'wapas shuru', 'shuru pr le jao', 'shuru par le jao',
      'start pr le jao', 'start par le jao', 'upar le jao', 'sab se upar', 'sab se upar le jao',
      'top pr chalo', 'start pr chalo', 'hero pr le jao', 'hero par le jao', 'hero', 'home',
      'scroll top', 'go to top', 'jump to top',
      'اوپر لے جاؤ', 'سب سے اوپر', 'واپس ٹاپ', 'واپس اسٹارٹ', 'شروع پر لے جاؤ', 'آغاز پر'
    ],
  },
];

// In-depth bilingual explanations for every portfolio section
const SECTION_EXPLANATIONS = {
  projects: {
    label: 'Systems & Projects',
    urdu: "جی! ہم سسٹمز اور پروجیکٹس پر آ گئے ہیں۔ یہاں تین فلیگ شپ سسٹمز ہیں: نیکسس کلاؤڈ انٹرپرائز ساس، اوربٹ موشن کوڈ ٹو فلم پائپ لائن، اور سائبر آتھ زیرو ٹرسٹ سیکیورٹی گیٹ وے۔ سب 99.99 فیصد اپ ٹائم پر فعال ہیں۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum systems aur projects par aa gaye hain. Yahan teen flagship systems hain: NexusCloud enterprise SaaS, OrbitMotion code-to-film pipeline, aur CyberAuth zero-trust security gateway. Sab 99.99 percent uptime par faal hain. Farmaiye ab agay kahan chalein?",
  },
  film: {
    label: 'Built in Orbit Film',
    urdu: "جی! ہم بلٹ اِن اوربٹ فلم سیکشن پر آ گئے ہیں۔ یہ سمیر کا فریم ایکوریٹ سنیما شوکیس ہے جو ری موشن 30 فریم فی سیکنڈ پر کوڈ کے ذریعے بنا ہے۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum Built in Orbit film section par aa gaye hain. Yeh Sameer ka frame-accurate cinema showcase hai jo Remotion 30 frames per second par code ke zariye bana hai. Farmaiye ab agay kahan chalein?",
  },
  architecture: {
    label: 'Microservices Topology',
    urdu: "جی! ہم مائیکروسروسز ٹوپولوجی پر آ گئے ہیں۔ یہ سمیر کے کلاؤڈ انفراسٹرکچر کا لائیو نیٹ ورک میش ہے جس میں گلوبل ایج روٹنگ اور زیرو ٹرسٹ سیکیورٹی فعال ہے۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum microservices topology par aa gaye hain. Yeh Sameer ke cloud infrastructure ka live network mesh hai jis mein global edge routing aur zero-trust security faal hai. Farmaiye ab agay kahan chalein?",
  },
  code: {
    label: 'Code Inspector',
    urdu: "جی! ہم پروڈکشن کوڈ انسپیکٹر پر آ گئے ہیں۔ یہاں سمیر کے ری ایکٹو الگورتھمز اور کلین ٹائپ اسکرپٹ کوڈ کے اصل نمونے موجود ہیں جن کا آپ لائیو معائنہ کر سکتے ہیں۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum production code inspector par aa gaye hain. Yahan Sameer ke reactive algorithms aur clean TypeScript code ke asal namoone maujood hain jin ka aap live muayana kar sakte hain. Farmaiye ab agay kahan chalein?",
  },
  'api-playground': {
    label: 'API Suite',
    urdu: "جی! ہم ریئل ٹائم API سوٹ پر آ گئے ہیں۔ یہاں آپ سمیر کے پروڈکشن اینڈ پوائنٹس کو براہ راست کال کر کے لائیو ڈیٹا اور لیٹنسی ٹیسٹ کر سکتے ہیں۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum real-time API suite par aa gaye hain. Yahan aap Sameer ke production endpoints ko barahe-raast call kar ke live data aur latency test kar sakte hain. Farmaiye ab agay kahan chalein?",
  },
  skills: {
    label: 'Technical Skills',
    urdu: "جی! ہم ٹیکنیکل اسکلز میٹرکس پر آ گئے ہیں۔ اس میں ری ایکٹ 18، نیکسٹ جے ایس، نوڈ، پوسٹگریس، ڈاکر، سپابیس اور وی آر سی ایل سمیت سمیر کی تمام مہارتیں موجود ہیں۔ فرمائیے اب آگے کہاں چلیں؟",
    roman: "Jee! Hum technical skills matrix par aa gaye hain. Is mein React 18, Next.js, Node, PostgreSQL, Docker, Supabase aur Vercel samet Sameer ki tamam mahaaratein maujood hain. Farmaiye ab agay kahan chalein?",
  },
  services: {
    label: 'Services & Solutions',
    urdu: "جی! ہم سروسز سیکشن پر آ گئے ہیں۔ یہاں تین بنیادی آفرنگز ہیں: فل اسٹیک ویب ایپس، کلاؤڈ اینڈ ڈیٹا بیس آرکیٹیکچر، اور کریئیٹو کوڈ اینڈ موشن سسٹمز۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum services section par aa gaye hain. Yahan teen bunyaadi offerings hain: full-stack web apps, cloud and database architecture, aur creative code and motion systems. Farmaiye ab kahan chalein?",
  },
  estimator: {
    label: 'Scope Estimator',
    urdu: "جی! ہم سسٹم اسکوپ ایسٹی میٹر پر آ گئے ہیں۔ یہاں آپ ماڈیولز منتخب کر کے ڈیلیوری اسپرنٹس اور ہفتوں کا تخمینہ لائیو حساب کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum system scope estimator par aa gaye hain. Yahan aap modules select kar ke delivery sprints aur weeks ka takhmina live hisaab kar sakte hain. Farmaiye ab kahan chalein?",
  },
  testimonials: {
    label: 'Client Reviews',
    urdu: "جی! ہم کلائنٹ ریویوز پر آ گئے ہیں۔ یہاں انٹرپرائز ٹیم کی تصدیق ہے کہ سمیر کے پلیٹ فارمز بارہ ہزار سے زائد ریکویسٹ فی سیکنڈ اور زیرو ڈاؤن ٹائم پر چلتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum client reviews par aa gaye hain. Yahan enterprise team ki tasdeeq hai ke Sameer ke platforms barah hazar se zaida requests per second aur zero downtime par chalte hain. Farmaiye ab kahan chalein?",
  },
  'tech-sphere': {
    label: '3D Matrix',
    urdu: "جی! ہم تھری ڈی انٹرایکٹو میٹرکس پر آ گئے ہیں۔ یہ ویب جی ایل پارٹیکل گلوب ہے جو سمیر کی 3D موشن اور گرافکس صلاحیتوں کو ظاہر کرتا ہے۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum 3D interactive matrix par aa gaye hain. Yeh WebGL particle globe hai jo Sameer ki 3D motion aur graphics salahiyaton ko zahir karta hai. Farmaiye ab kahan chalein?",
  },
  terminal: {
    label: 'Developer CLI Terminal',
    urdu: "جی! ہم ڈویلپر سی ایل آئی ٹرمینل پر آ گئے ہیں۔ یہاں آپ پورٹ فولیو کی کسٹم کمانڈز اور سسٹم انفو لائیو رن کر سکتے ہیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum developer CLI terminal par aa gaye hain. Yahan aap portfolio ki custom commands aur system info live run kar sakte hain. Farmaiye ab kahan chalein?",
  },
  contact: {
    label: 'Contact Suite',
    urdu: "جی! ہم کانٹیکٹ سیکشن پر آ گئے ہیں۔ سمیر سے رابطہ: mesameer762 at gmail.com، یا فارم کے ذریعے میسج بھیجیں۔ فرمائیے اب کہاں چلیں؟",
    roman: "Jee! Hum contact section par aa gaye hain. Sameer se rabta: mesameer762 at gmail.com, ya form ke zariye message bhejein. Farmaiye ab kahan chalein?",
  },
  hero: {
    label: 'Hero Section',
    urdu: "جی چلیے! ہم واپس سب سے اوپر یعنی ہیرو سیکشن پر آ گئے ہیں۔ یہاں سمیر حسین کا تعارف اور لائیو پورٹ فولیو میٹرکس موجود ہیں۔ فرمائیے اب کس سیکشن پر لے کر چلوں؟",
    roman: "Jee chaliye! Hum wapas sab se upar yaani hero section par aa gaye hain. Yahan Sameer Hussain ka taaruf aur live portfolio matrix maujood hain. Farmaiye ab kis section par le kar chaloon?",
  },
};

const INITIAL_GREETING_URDU = "خوش آمدید! میں علینہ ہوں، سمیر حسین کی اسسٹنٹ۔ آپ کو اس پورٹ فولیو کے کون سے حصے پر لے کر جاؤں؟";
const INITIAL_GREETING_ROMAN = "Khushamdeed! Main Alina hoon, Sameer Hussain ki assistant. Aap ko is portfolio ke kon se hisse per le kar jaaun?";

const FALLBACK_URDU = "معذرت، میں سمجھ نہیں سکی۔ آپ تعارف، فلم، سسٹمز، ٹوپولوجی، کوڈ، اے پی آئی، اسکلز، سروسز، ایسٹی میٹر، ریویوز، ٹرمینل، رابطہ، یا اوپر کہہ سکتے ہیں۔ مدد کے لیے help بولیں۔";
const FALLBACK_ROMAN = "Maazrat, main samajh nahi saki. Aap taaruf, film, systems, topology, code, API, skills, services, estimator, reviews, terminal, contact, ya top keh sakte hain. Madad ke liye help bolen.";

// Full conversational knowledge base for portfolio Q&A
const AI_KNOWLEDGE_BASE = [
  {
    intent: 'portfolio_introduction',
    triggers: [
      'portfolio ka introduction', 'portfolio ka intro', 'portfolio intro', 'intro do',
      'introduction do', 'introduction', 'intro', 'taaruf karwao', 'taaruf do', 'taaruf',
      'portfolio taaruf', 'apna aur portfolio ka intro', 'apna aur portfolio ka intro do',
      'portfolio ke bare mein batao', 'portfolio explain karo', 'sab explain karo',
      'website ka intro', 'tell me about this portfolio', 'what is this website',
      'website ke bare mein batao', 'introduce portfolio', 'portfolio batao',
      'is portfolio mein kya hai', 'kya kya cheezein hain', 'features batao',
      'guide me', 'tour do', 'complete guide', 'complete tour',
      'پورٹ فولیو کا تعارف', 'تعارف کروائیں', 'تعارف', 'انٹروڈکشن', 'گائیڈ'
    ],
    urdu: "خوش آمدید! سمیر حسین کے اس پورٹ فولیو میں یہ سسٹمز شامل ہیں: بلٹ ان اوربٹ سنیما فلم، تھری ڈی میٹرکس، کلاؤڈ سسٹمز اور پروجیکٹس، مائیکروسروسز ٹوپولوجی، لائیو کوڈ انسپیکٹر، ریئل ٹائم API سوٹ، ٹیکنیکل اسکلز، سروسز، اسکوپ ایسٹی میٹر، کلائنٹ ریویوز، سی ایل آئی ٹرمینل، اور کانٹیکٹ۔ جس سیکشن پر جانا ہو یا واپس آنا ہو، بس فرمائیے — میں لے چلوں گی۔",
    roman: "Khush-aamdeed! Sameer Hussain ke is portfolio mein ye systems shaamil hain: Built in Orbit cinema film, 3D matrix, cloud systems aur projects, microservices topology, live code inspector, real-time API suite, technical skills, services, scope estimator, client reviews, CLI terminal, aur contact. Jis section par jaana ho ya wapas aana ho, bas farmaiye — main le chaloon gi.",
  },
  {
    intent: 'help',
    triggers: [
      'help', 'madad', 'commands', 'kya kar sakti ho', 'kya bolun', 'options',
      'menu', 'guide', 'how to use', 'kaise use', 'kya keh sakta hun',
      'مدد', 'ہیلپ', 'کمانڈز', 'کیا کر سکتی ہو'
    ],
    urdu: "میں علینہ ہوں۔ آپ بولیں یا لکھیں: تعارف، فلم، سسٹمز، ٹوپولوجی، کوڈ، اے پی آئی، اسکلز، سروسز، ایسٹی میٹر، ریویوز، میٹرکس، ٹرمینل، رابطہ، اوپر، واپس۔ سمیر، تجربہ، یا نیکسس کلاؤڈ کے بارے میں بھی پوچھ سکتے ہیں۔",
    roman: "Main Alina hoon. Aap bolen ya likhen: taaruf, film, systems, topology, code, API, skills, services, estimator, reviews, matrix, terminal, contact, top, wapas. Sameer, tajurba, ya NexusCloud ke bare mein bhi pooch sakte hain.",
  },
  {
    intent: 'about_sameer',
    triggers: [
      'sameer', 'kaun hai', 'kon hai', 'who is', 'about sameer', 'developer', 'creator',
      'sameer hussain', 'سمیر کون ہے', 'سمیر'
    ],
    urdu: "سمیر حسین ایک سینئر فل اسٹیک ڈویلپر اور کلاؤڈ سسٹمز آرکیٹیکٹ ہیں۔ وہ اسکیل ایبل کلاؤڈ پلیٹ فارمز، ہائی پرفارمنس APIs، زیرو ٹرسٹ سیکیورٹی اور 3D ویب سسٹمز بناتے ہیں۔",
    roman: "Sameer Hussain aik senior full-stack developer aur cloud systems architect hain. Woh scalable cloud platforms, high-performance APIs, zero-trust security aur 3D web systems banate hain.",
  },
  {
    intent: 'experience',
    triggers: ['experience', 'tajurba', 'kitna experience', 'career', 'background', 'work history', 'تجربہ'],
    urdu: "سمیر کو انٹرپرائز فل اسٹیک ڈویلپمنٹ، کلاؤڈ مائیکروسروسز، ملٹی ٹیننٹ ساس اور 99.99 فیصد اپ ٹائم سسٹمز کا وسیع تجربہ ہے۔",
    roman: "Sameer ko enterprise full-stack development, cloud microservices, multi-tenant SaaS aur 99.99 percent uptime systems ka waseeh tajurba hai.",
  },
  {
    intent: 'nexuscloud',
    triggers: [
      'nexus', 'nexuscloud', 'nexus cloud', 'flagship', 'saas', 'saas platform',
      'distributed platform', 'نیکسس', 'ساس'
    ],
    urdu: "نیکسس کلاؤڈ سمیر کا فلیگ شپ انٹرپرائز ساس پلیٹ فارم ہے۔ یہ بارہ ہزار چار سو ریکویسٹ فی سیکنڈ، چودہ اعشاریہ دو ملی سیکنڈ پی نائن نائن لیٹنسی، اور زیرو ٹرسٹ آر بی اے سی پر چلتا ہے۔ تفصیل کے لیے سسٹمز پر چلیں؟",
    roman: "NexusCloud Sameer ka flagship enterprise SaaS platform hai. Yeh 12,400 requests per second, 14.2 millisecond p99 latency, aur zero-trust RBAC par chalta hai. Tafseel ke liye systems par chalein?",
  },
  {
    intent: 'orbit_motion',
    triggers: ['orbit', 'orbitmotion', 'orbit motion', 'remotion', 'video engine', 'اوربٹ', 'ری موشن'],
    urdu: "اوربٹ موشن ایک ڈیٹر منسٹک کوڈ ٹو فلم پائپ لائن ہے جو ری موشن پر تیس فریم فی سیکنڈ کے ساتھ سنیما ویڈیو بناتی ہے۔ فلم سیکشن پر دیکھ سکتے ہیں۔",
    roman: "OrbitMotion aik deterministic code-to-film pipeline hai jo Remotion par 30 frames per second ke sath cinema video banati hai. Film section par dekh sakte hain.",
  },
  {
    intent: 'cyber_auth',
    triggers: ['cyberauth', 'cyber auth', 'rbac', 'security', 'authentication', 'سیکیورٹی', 'آاتھ'],
    urdu: "سائبر آتھ ایک زیرو ٹرسٹ کرپٹوگرافک آر بی اے سی گیٹ وے ہے جس میں اے ای ایس 256 انکرپشن، فوری سیشن ریووکیشن اور امیوٹیبل آڈٹ لاگز ہیں۔",
    roman: "CyberAuth aik zero-trust cryptographic RBAC gateway hai jis mein AES-256 encryption, fori session revocation aur immutable audit logs hain.",
  },
  {
    intent: 'hire_contact',
    triggers: [
      'email kya hai', 'email address', 'contact info', 'kaise contact', 'hire kaise',
      'gmail', 'phone', 'number', 'github', 'social', 'ای میل کیا ہے', 'گیتھب'
    ],
    urdu: "سمیر سے رابطہ: mesameer762 at gmail.com۔ گیتھب: github.com slash mesameers۔ میں آپ کو کانٹیکٹ سیکشن پر بھی لے جا سکتی ہوں۔",
    roman: "Sameer se rabta: mesameer762 at gmail.com. GitHub: github.com slash mesameers. Main aap ko contact section par bhi le ja sakti hoon.",
  },
  {
    intent: 'identity',
    triggers: [
      'tum kaun ho', 'tum kon ho', 'aap kaun', 'who are you', 'what is your name',
      'naam kya', 'alina', 'علینہ', 'تم کون ہو'
    ],
    urdu: "میں علینہ ہوں، سمیر حسین کی خودمختار AI اسسٹنٹ اور پورٹ فولیو گائیڈ۔ میں تعارف دے سکتی ہوں، ہر سیکشن پر لے جا سکتی ہوں، وضاحت کر سکتی ہوں، اور اوپر یا واپس بھی لا سکتی ہوں۔",
    roman: "Main Alina hoon, Sameer Hussain ki autonomous AI assistant aur portfolio guide. Main taaruf de sakti hoon, har section par le ja sakti hoon, wazahat kar sakti hoon, aur upar ya wapas bhi la sakti hoon.",
  },
  {
    intent: 'greeting',
    triggers: ['salam', 'assalam', 'asalam', 'hello', 'hi', 'hey', 'adaab', 'سلام'],
    urdu: "وعلیکم السلام! میں علینہ ہوں۔ فرمائیے میں سمیر کے پورٹ فولیو میں آپ کی کیا رہنمائی کروں؟",
    roman: "Walaikum Assalam! Main Alina hoon. Farmaiye main Sameer ke portfolio mein aap ki kya rehnumai karoon?",
  },
  {
    intent: 'how_are_you',
    triggers: ['kaise ho', 'kaisi ho', 'kya haal', 'how are you', 'haal chal', 'کیسی ہو'],
    urdu: "الحمدللہ میں بالکل ٹھیک ہوں۔ آپ بتائیے، سمیر کا کون سا پروجیکٹ یا سسٹم دیکھنا پسند کریں گے؟",
    roman: "Alhamdulillah main bilkul theek hoon. Aap bataiye, Sameer ka kon sa project ya system dekhna pasand karein ge?",
  },
  {
    intent: 'thanks',
    triggers: ['shukriya', 'shukria', 'thanks', 'thank you', 'bohot shukriya', 'meherbani', 'شکریہ'],
    urdu: "آپ کا بہت شکریہ! اگر مزید کچھ پوچھنا ہو تو میں یہیں موجود ہوں۔",
    roman: "Aap ka bohot shukriya! Agar mazeed kuch poochna ho to main yaheen maujood hoon.",
  },
  {
    intent: 'goodbye',
    triggers: ['allah hafiz', 'khuda hafiz', 'bye', 'goodbye', 'alvida', 'اللہ حافظ'],
    urdu: "اللہ حافظ! اپنا خیال رکھیے گا اور سمیر کے کام کا جائزہ ضرور لیجیے گا۔",
    roman: "Allah Hafiz! Apna khayal rakhiye ga aur Sameer ke kaam ka jaiza zaroor lijiye ga.",
  },
];

const INTRO_TRIGGERS = AI_KNOWLEDGE_BASE.find((k) => k.intent === 'portfolio_introduction').triggers;

const RETURN_TOP_WORDS = [
  'back top', 'back to top', 'top', 'top pr', 'top par', 'top pe', 'wapis top', 'wapas top',
  'back to start', 'wapis start', 'wapas shuru', 'shuru pr le jao', 'shuru par le jao',
  'start pr le jao', 'start par le jao', 'upar le jao', 'sab se upar', 'sab se upar le jao',
  'top pr chalo', 'start pr chalo', 'hero pr le jao', 'hero par le jao', 'hero', 'home',
  'scroll top', 'go to top', 'jump to top',
  'اوپر لے جاؤ', 'سب سے اوپر', 'واپس ٹاپ', 'واپس اسٹارٹ', 'شروع پر لے جاؤ', 'آغاز پر'
];

const GENERIC_BACK_WORDS = [
  'back', 'wapis', 'wapas', 'pichhe', 'go back', 'wapis jao', 'wapas jao', 'pichhe jao',
  'previous', 'previous section', 'pichhla section', 'واپس', 'پیچھے', 'پچھلا'
];

const EXPLAIN_WORDS = [
  'explain', 'explain karo', 'ye kya hai', 'is ke bare mein batao',
  'is section ko explain karo', 'ye kya kaam karta hai', 'detail batao',
  'details', 'tell me about this', 'what is this', 'batao', 'تفصیل', 'وضاحت', 'سمجھاؤ', 'بتاؤ', 'بتاو'
];

const checkKeywordMatch = (transcript, keywords) => {
  if (!transcript || !keywords || !keywords.length) return false;
  const clean = transcript.trim().toLowerCase();

  for (const kw of keywords) {
    const target = kw.toLowerCase().trim();
    if (!target) continue;
    if (clean === target) return true;
    if (target.includes(' ') || /[\u0600-\u06FF]/.test(target)) {
      if (clean.includes(target)) return true;
    }
    const escaped = target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[\\s.,!?؛،_])${escaped}([\\s.,!?؛،_]|$)`, 'i');
    if (regex.test(clean)) return true;
  }
  return false;
};

const resolveSectionElement = (id) => {
  const aliases = {
    projects: ['projects', 'systems'],
    systems: ['projects', 'systems'],
    code: ['code', 'code-inspector'],
    'code-inspector': ['code', 'code-inspector'],
    'api-playground': ['api-playground', 'api-suite', 'api'],
    api: ['api-playground', 'api-suite', 'api'],
    architecture: ['architecture', 'topology'],
    topology: ['architecture', 'topology'],
    estimator: ['estimator', 'scope'],
    scope: ['estimator', 'scope'],
    testimonials: ['testimonials', 'reviews'],
    reviews: ['testimonials', 'reviews'],
    'tech-sphere': ['tech-sphere', 'matrix'],
    matrix: ['tech-sphere'],
    terminal: ['terminal', 'cli'],
    cli: ['terminal'],
  };

  const ids = aliases[id] || [id];
  for (const sid of ids) {
    const el = document.getElementById(sid) || document.querySelector(`[data-section="${sid}"]`);
    if (el) return el;
  }
  return null;
};

export const CosmicAvatar = ({ size = 480, className = '' }) => {
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const startListeningRef = useRef(null);
  const isStartingRef = useRef(false);
  const isListeningRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const restartTimerRef = useRef(null);
  const lastSpeechEndTimeRef = useRef(0);
  const lastActionTimestampRef = useRef(0);
  const activeUtteranceRef = useRef(null);
  const speechSafetyTimeoutRef = useRef(null);
  const recognitionLangRef = useRef('ur-PK');
  const currentSectionRef = useRef('hero');
  const navHistoryRef = useRef([]);
  const processCommandRef = useRef(null);
  const commandInputRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [liveFeedback, setLiveFeedback] = useState('');
  const [commandText, setCommandText] = useState('');
  const [activeNavId, setActiveNavId] = useState('hero');
  const [showHelpHints, setShowHelpHints] = useState(false);

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

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        try {
          window.speechSynthesis.getVoices();
        } catch (e) {}
      };
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const getSureliVoice = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    const southAsianMelodious = voices.find(
      (v) =>
        v.name.includes('Neerja') ||
        v.name.includes('Swara') ||
        v.name.includes('Heera') ||
        ((v.lang === 'en-IN' || v.lang === 'hi-IN') &&
          (v.name.toLowerCase().includes('female') ||
            v.name.toLowerCase().includes('natural') ||
            !v.name.includes('Hemant')))
    );
    if (southAsianMelodious) return southAsianMelodious;

    const msNatural = voices.find(
      (v) =>
        (v.name.includes('Jenny') ||
          v.name.includes('Aria') ||
          v.name.includes('Sonia') ||
          v.name.includes('Libby')) &&
        v.name.includes('Natural')
    );
    if (msNatural) return msNatural;

    const googleNatural = voices.find(
      (v) =>
        v.name.includes('Google UK English Female') ||
        v.name.includes('Google US English Female') ||
        v.name.includes('Google हिन्दी')
    );
    if (googleNatural) return googleNatural;

    const appleFemale = voices.find((v) =>
      ['Samantha', 'Victoria', 'Karen', 'Tessa', 'Moira'].some((n) => v.name.includes(n))
    );
    if (appleFemale) return appleFemale;

    const urduVoice = voices.find((v) => v.lang.includes('ur'));
    if (urduVoice) return urduVoice;

    const generalFemale = voices.find(
      (v) =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('natural')
    );
    if (generalFemale) return generalFemale;

    return voices.find((v) => v.lang.startsWith('en')) || voices[0];
  }, []);

  const scheduleRestart = useCallback((delay = 250) => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    restartTimerRef.current = setTimeout(() => {
      if (startListeningRef.current) startListeningRef.current();
    }, delay);
  }, []);

  const speak = useCallback(
    (urduText, romanText = '', onComplete) => {
      fluteEngine.duck();

      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        setIsSpeaking(true);
        isSpeakingRef.current = true;
        setTimeout(() => {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          lastSpeechEndTimeRef.current = Date.now();
          fluteEngine.unduck();
          if (onComplete) onComplete();
        }, 2500);
        return;
      }

      if (speechSafetyTimeoutRef.current) {
        clearTimeout(speechSafetyTimeoutRef.current);
        speechSafetyTimeoutRef.current = null;
      }

      const doSpeak = () => {
        try {
          isSpeakingRef.current = true;
          setIsSpeaking(true);

          const utterance = new SpeechSynthesisUtterance(romanText || urduText);
          window.__alinaUtterance = utterance;
          activeUtteranceRef.current = utterance;

          const preferredVoice = getSureliVoice();
          if (preferredVoice) utterance.voice = preferredVoice;

          utterance.pitch = 1.08;
          utterance.rate = 0.94;
          utterance.volume = 1.0;

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
            lastSpeechEndTimeRef.current = Date.now();
            fluteEngine.unduck();
            window.__alinaUtterance = null;
            activeUtteranceRef.current = null;
            if (onComplete) onComplete();
            scheduleRestart(250);
          };

          utterance.onend = handleSpeechFinish;
          utterance.onerror = () => handleSpeechFinish();

          const maxSpeechDuration = Math.max(3000, (romanText || urduText).length * 85 + 2500);
          speechSafetyTimeoutRef.current = setTimeout(handleSpeechFinish, maxSpeechDuration);
          window.speechSynthesis.speak(utterance);
        } catch (e) {
          setIsSpeaking(false);
          isSpeakingRef.current = false;
          lastSpeechEndTimeRef.current = Date.now();
          fluteEngine.unduck();
          if (onComplete) onComplete();
        }
      };

      if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
        window.speechSynthesis.cancel();
        setTimeout(doSpeak, 60);
      } else {
        doSpeak();
      }
    },
    [getSureliVoice, scheduleRestart]
  );

  const teleportTo = useCallback(
    (targetId, addToHistory = true) => {
      if (addToHistory && currentSectionRef.current && currentSectionRef.current !== targetId) {
        navHistoryRef.current.push(currentSectionRef.current);
        if (navHistoryRef.current.length > 25) navHistoryRef.current.shift();
      }

      currentSectionRef.current = targetId;
      setActiveNavId(targetId);

      const explanation = SECTION_EXPLANATIONS[targetId] || SECTION_EXPLANATIONS.hero;
      const sectionName = explanation?.label || targetId;
      setLiveFeedback(`جا رہے ہیں: ${sectionName} ➜`);
      setTimeout(() => setLiveFeedback(''), 4000);

      speak(
        explanation?.urdu || 'جی! ہم پہنچ گئے ہیں۔ فرمائیے اب کہاں چلیں؟',
        explanation?.roman || 'Jee! Hum pohanch gaye hain. Farmaiye ab kahan chalein?'
      );

      if (targetId === 'hero' || targetId === 'start' || targetId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        try {
          if (window.history?.pushState) {
            window.history.pushState(null, '', window.location.pathname);
          }
        } catch (e) {}
        return;
      }

      const el = resolveSectionElement(targetId);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const targetOffset = Math.max(0, rect.top + scrollTop - 85);

      window.scrollTo({ top: targetOffset, behavior: 'smooth' });

      try {
        if (window.history?.pushState) {
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
    },
    [speak]
  );

  // Shared command processor for voice + typed input (Tasks 1–4)
  const processCommand = useCallback(
    (rawInput, { fromVoice = false } = {}) => {
      if (!rawInput) return false;
      const cleanTranscript = String(rawInput)
        .toLowerCase()
        .replace(/[.,?!]/g, '')
        .trim();
      if (!cleanTranscript || cleanTranscript.length < 2) return false;

      if (fromVoice) fluteEngine.duck();

      // Task 1 — Portfolio introduction
      if (checkKeywordMatch(cleanTranscript, INTRO_TRIGGERS)) {
        lastActionTimestampRef.current = Date.now();
        setLiveFeedback('پورٹ فولیو کا تعارف // Portfolio Introduction');
        setTimeout(() => setLiveFeedback(''), 4500);
        const introData = AI_KNOWLEDGE_BASE.find((k) => k.intent === 'portfolio_introduction');
        if (introData) speak(introData.urdu, introData.roman);
        return true;
      }

      // Task 4 — Scroll to top / hero
      if (checkKeywordMatch(cleanTranscript, RETURN_TOP_WORDS)) {
        lastActionTimestampRef.current = Date.now();
        teleportTo('hero');
        return true;
      }

      // Task 2 — Navigate to any section + explain on arrival
      const matchedNav = NAV_TARGETS.find((target) =>
        checkKeywordMatch(cleanTranscript, target.keywords)
      );
      if (matchedNav) {
        lastActionTimestampRef.current = Date.now();
        teleportTo(matchedNav.id);
        return true;
      }

      // Generic back / previous section
      if (checkKeywordMatch(cleanTranscript, GENERIC_BACK_WORDS)) {
        lastActionTimestampRef.current = Date.now();
        const prevSection = navHistoryRef.current.pop() || 'hero';
        teleportTo(prevSection, false);
        return true;
      }

      if (fromVoice && Date.now() - lastActionTimestampRef.current < 700) {
        return false;
      }

      // Task 3 — Portfolio Q&A knowledge
      const matchedKnowledge = AI_KNOWLEDGE_BASE.find((entry) =>
        checkKeywordMatch(cleanTranscript, entry.triggers)
      );
      if (matchedKnowledge) {
        lastActionTimestampRef.current = Date.now();
        speak(matchedKnowledge.urdu, matchedKnowledge.roman);
        if (matchedKnowledge.intent === 'help') setShowHelpHints(true);
        return true;
      }

      // Explain current section on demand
      if (checkKeywordMatch(cleanTranscript, EXPLAIN_WORDS)) {
        lastActionTimestampRef.current = Date.now();
        const currentSec = currentSectionRef.current || 'hero';
        const explanation = SECTION_EXPLANATIONS[currentSec] || SECTION_EXPLANATIONS.hero;
        speak(explanation.urdu, explanation.roman);
        return true;
      }

      // Typed commands always get a helpful fallback; voice ignores unmatched noise
      if (!fromVoice) {
        lastActionTimestampRef.current = Date.now();
        setLiveFeedback('مدد چاہیے؟ Help بولیں یا لکھیں');
        setTimeout(() => setLiveFeedback(''), 3500);
        speak(FALLBACK_URDU, FALLBACK_ROMAN);
        return true;
      }

      return false;
    },
    [speak, teleportTo]
  );

  useEffect(() => {
    processCommandRef.current = processCommand;
  }, [processCommand]);

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (isStartingRef.current || isListeningRef.current) return;

    try {
      if (!recognitionRef.current) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;
        recognition.lang = recognitionLangRef.current || 'ur-PK';

        recognition.onstart = () => {
          isStartingRef.current = false;
          isListeningRef.current = true;
          setIsListening(true);
        };

        recognition.onresult = (event) => {
          if (isSpeakingRef.current || Date.now() - lastSpeechEndTimeRef.current < 600) return;

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (!event.results[i].isFinal) continue;
            const rawTranscript = event.results[i][0].transcript;
            if (processCommandRef.current) {
              processCommandRef.current(rawTranscript, { fromVoice: true });
            }
          }
        };

        recognition.onerror = (e) => {
          isStartingRef.current = false;
          isListeningRef.current = false;
          setIsListening(false);
          if (!isSpeakingRef.current) fluteEngine.unduck();

          if (e && (e.error === 'language-not-supported' || e.error === 'network')) {
            if (recognitionLangRef.current !== 'en-US') {
              recognitionLangRef.current = 'en-US';
              if (recognitionRef.current) recognitionRef.current.lang = 'en-US';
            }
          }

          if (e && e.error !== 'aborted') scheduleRestart(400);
        };

        recognition.onend = () => {
          isStartingRef.current = false;
          isListeningRef.current = false;
          setIsListening(false);
          if (!isSpeakingRef.current) fluteEngine.unduck();
          scheduleRestart(250);
        };

        recognitionRef.current = recognition;
      }

      isStartingRef.current = true;
      recognitionRef.current.start();
    } catch (err) {
      isStartingRef.current = false;
      if (err && err.name === 'InvalidStateError') {
        isListeningRef.current = true;
        setIsListening(true);
      } else {
        isListeningRef.current = false;
        setIsListening(false);
        scheduleRestart(600);
      }
    }
  }, [scheduleRestart]);

  useEffect(() => {
    startListeningRef.current = startListening;
  }, [startListening]);

  useEffect(() => {
    const micSupervisor = setInterval(() => {
      if (
        typeof window !== 'undefined' &&
        !isSpeakingRef.current &&
        !isListeningRef.current &&
        !isStartingRef.current
      ) {
        startListening();
      }
    }, 4000);
    return () => clearInterval(micSupervisor);
  }, [startListening]);

  useEffect(() => {
    const handleGesture = () => {
      fluteEngine.start();
      startListening();
    };

    try {
      handleGesture();
    } catch (e) {}

    const events = ['click', 'touchstart', 'keydown', 'scroll'];
    events.forEach((evt) => window.addEventListener(evt, handleGesture, { passive: true }));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleGesture));
    };
  }, [startListening]);

  const handleAvatarClick = () => {
    fluteEngine.start();
    startListening();
    speak(INITIAL_GREETING_URDU, INITIAL_GREETING_ROMAN);
  };

  const handleMicToggle = (e) => {
    if (e) e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (err) {}
    }
    isSpeakingRef.current = false;
    setIsSpeaking(false);
    lastSpeechEndTimeRef.current = Date.now();
    fluteEngine.start();
    startListening();
  };

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const value = commandText.trim();
    if (!value) return;
    fluteEngine.start();
    processCommand(value, { fromVoice: false });
    setCommandText('');
  };

  const tiltX = mousePos.y * -8;
  const tiltY = mousePos.x * 10;

  const primaryPills = NAV_TARGETS.filter((t) =>
    ['film', 'projects', 'architecture', 'code', 'api-playground', 'skills', 'contact', 'hero'].includes(
      t.id
    )
  );
  const secondaryPills = NAV_TARGETS.filter(
    (t) => !primaryPills.find((p) => p.id === t.id)
  );

  return (
    <div className="flex flex-col items-center relative w-full select-none">
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
        title="ALINA // DEV-75 AI CO-PILOT — Speak, type, or click to navigate"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleAvatarClick();
          }
        }}
      >
        <div
          className={`absolute rounded-full blur-[85px] pointer-events-none transition-all duration-700 ${
            isSpeaking ? 'scale-130 opacity-95' : isHovered ? 'scale-115 opacity-80' : 'opacity-65'
          }`}
          style={{
            width: '85%',
            height: '85%',
            background:
              'radial-gradient(circle, #00F2FE 0%, #00FFE0 35%, #7928CA 65%, rgba(0, 242, 254, 0) 80%)',
          }}
        />

        <div
          className="relative z-10 w-full rounded-3xl overflow-hidden border border-energy-teal/40 bg-space-900/90 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(0,242,254,0.3)] transition-transform duration-200 ease-out group-hover:border-energy-teal/80"
          style={{
            transform: `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(20px)`,
            animation: 'avatarLevitate 5s ease-in-out infinite',
          }}
        >
          <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-space-950/85 border-b border-slate-800/80">
            <div className="flex items-center space-x-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-energy-cyan opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-energy-teal" />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] font-black text-white tracking-widest uppercase truncate">
                ETHEREAL AI CORE // DEV-75
              </span>
            </div>
            <div className="flex items-center space-x-1.5 font-mono text-[9px] sm:text-[10px] text-energy-teal shrink-0">
              <Radio className="w-3 h-3 text-energy-cyan animate-pulse" />
              <span>ALINA</span>
            </div>
          </div>

          <div className="relative w-full aspect-[16/11] overflow-hidden bg-space-950 flex items-center justify-center">
            <div
              className={`w-full h-full relative transition-transform duration-300 flex items-center justify-center ${
                isSpeaking ? 'animate-presenterSpeakingGesture' : ''
              }`}
            >
              <img
                src={alinaAvatarImg}
                alt="Alina - Ethereal Cosmic AI Co-Pilot"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-space-950 via-transparent to-energy-cyan/15 pointer-events-none transition-opacity duration-500 ${
                  isSpeaking ? 'opacity-90' : 'opacity-40'
                }`}
              />
            </div>
          </div>

          <div className="px-4 sm:px-5 py-3 bg-gradient-to-r from-space-950 via-space-900 to-space-950 border-t border-slate-800 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[11px] sm:text-xs font-bold text-white tracking-wider uppercase truncate">
                ALINA // DEV-75 CO-PILOT
              </p>
              <p className="font-mono text-[9px] sm:text-[10px] text-energy-teal font-medium truncate">
                Portfolio Guide · Navigator · Q&A
              </p>
            </div>
            <div className="flex items-center space-x-1.5 text-energy-cyan shrink-0">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span className="font-mono text-[10px] font-semibold tracking-wider">ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2.5 mt-4 z-20 w-full max-w-xl px-2">
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            type="button"
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
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                  isSpeaking ? 'bg-amber-400' : isListening ? 'bg-emerald-400' : 'bg-rose-400'
                } opacity-75`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isSpeaking ? 'bg-amber-500' : isListening ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
            </span>
            <Mic className="w-3 h-3" />
            <span className="font-semibold tracking-wide">
              {isSpeaking
                ? 'علینہ بول رہی ہے'
                : isListening
                ? 'سن رہی ہے — بولیں'
                : 'مائیک فعال کریں'}
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowHelpHints((v) => !v);
              if (!showHelpHints) {
                const help = AI_KNOWLEDGE_BASE.find((k) => k.intent === 'help');
                if (help) speak(help.urdu, help.roman);
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-slate-700/80 bg-space-950/90 font-mono text-[11px] text-slate-300 hover:text-white hover:border-energy-teal/50 transition-all active:scale-95"
            title="Show Alina help commands"
          >
            <HelpCircle className="w-3 h-3 text-energy-cyan" />
            <span>Help</span>
          </button>
        </div>

        {liveFeedback && (
          <div className="px-3.5 py-1 rounded-full bg-energy-teal/20 border border-energy-teal/60 text-energy-cyan font-mono text-xs font-semibold animate-pulse shadow-[0_0_20px_rgba(0,242,254,0.4)] text-center">
            {liveFeedback}
          </div>
        )}

        {showHelpHints && (
          <div className="w-full rounded-2xl border border-slate-800/80 bg-space-950/95 backdrop-blur-xl px-3.5 py-3 text-left shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
            <p className="font-mono text-[10px] text-energy-teal tracking-widest uppercase mb-2">
              Alina Commands · بولیں یا لکھیں
            </p>
            <div className="flex flex-wrap gap-1.5">
              {[
                'intro',
                'film',
                'systems',
                'topology',
                'code',
                'api',
                'skills',
                'services',
                'estimator',
                'reviews',
                'terminal',
                'contact',
                'top',
                'wapas',
                'explain',
              ].map((hint) => (
                <button
                  key={hint}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    processCommand(hint, { fromVoice: false });
                  }}
                  className="px-2 py-0.5 rounded-md bg-space-900 border border-slate-800 font-mono text-[10px] text-slate-300 hover:text-energy-cyan hover:border-energy-teal/40 transition-colors"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Typed command console — works without microphone */}
        <form
          onSubmit={handleCommandSubmit}
          onClick={(e) => e.stopPropagation()}
          className="w-full flex items-center gap-2 rounded-2xl border border-slate-800/90 bg-space-950/95 backdrop-blur-xl px-2.5 py-2 shadow-[0_12px_35px_rgba(0,0,0,0.55)] focus-within:border-energy-teal/50 transition-colors"
        >
          <Terminal className="w-3.5 h-3.5 text-energy-teal shrink-0 ml-1" />
          <input
            ref={commandInputRef}
            type="text"
            value={commandText}
            onChange={(e) => setCommandText(e.target.value)}
            placeholder="Type: intro · film · systems · top · help..."
            className="flex-1 min-w-0 bg-transparent border-0 outline-none font-mono text-[12px] sm:text-[13px] text-slate-100 placeholder:text-slate-500 py-1"
            aria-label="Alina command input"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!commandText.trim()}
            className="shrink-0 p-2 rounded-xl bg-energy-teal/15 border border-energy-teal/40 text-energy-cyan hover:bg-energy-teal/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            title="Send command to Alina"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Primary teleport pills */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-1 max-w-full snap-x">
            {primaryPills.map((tgt) => {
              const Icon = tgt.icon;
              const isActive = activeNavId === tgt.id;
              return (
                <button
                  key={tgt.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    teleportTo(tgt.id);
                  }}
                  className={`px-2.5 py-1 rounded-lg border font-mono text-[11px] font-semibold flex items-center space-x-1.5 transition-all whitespace-nowrap active:scale-95 shadow-sm hover:scale-105 snap-start ${
                    isActive
                      ? 'bg-energy-teal/15 text-white border-energy-teal/60'
                      : 'bg-space-950/90 text-slate-300 border-slate-800/80 hover:border-energy-teal hover:text-white'
                  }`}
                  style={{ borderColor: isActive ? tgt.color : `${tgt.color}35` }}
                  title={`Teleport to ${tgt.label}`}
                >
                  <Icon className="w-3 h-3" style={{ color: tgt.color }} />
                  <span>{tgt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary pills — services, estimator, reviews, matrix, cli */}
        <div className="w-full flex items-center justify-center">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5 px-1 max-w-full snap-x">
            {secondaryPills.map((tgt) => {
              const Icon = tgt.icon;
              const isActive = activeNavId === tgt.id;
              return (
                <button
                  key={tgt.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    teleportTo(tgt.id);
                  }}
                  className={`px-2 py-1 rounded-lg border font-mono text-[10px] font-semibold flex items-center space-x-1 transition-all whitespace-nowrap active:scale-95 snap-start ${
                    isActive
                      ? 'bg-space-900 text-white'
                      : 'bg-space-950/70 text-slate-400 border-slate-800/60 hover:text-white hover:border-slate-600'
                  }`}
                  style={{ borderColor: isActive ? tgt.color : `${tgt.color}28` }}
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(-0.5deg); }
        }
        @keyframes presenterSpeakingGesture {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          20% { transform: translateY(-2px) rotate(0.35deg) scale(1.006); }
          45% { transform: translateY(-1px) rotate(-0.25deg) scale(1.003); }
          70% { transform: translateY(-2.8px) rotate(0.45deg) scale(1.008); }
          90% { transform: translateY(-0.8px) rotate(-0.15deg) scale(1.002); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};
