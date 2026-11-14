import React, { useState, useRef, useEffect } from 'react';
import {
  Terminal,
  Send,
  Sparkles,
  CornerDownLeft,
  Activity,
  Cpu,
  Layers,
  Radio,
  Server,
  Zap,
  RotateCcw
} from 'lucide-react';

const COMMANDS = {
  help: 'Available commands: about, skills, projects, arch, stack, contact, clear, matrix, orbit',
  about: 'Sameer Hussain: Senior Full-Stack Developer & Systems Architect. Specializing in high-performance cloud architectures, reactive frontends, and deterministic 3D motion systems.',
  skills: 'React 18 (95%), TypeScript (92%), Tailwind (96%), Node.js Express (94%), PostgreSQL 16 (92%), Redis (90%), Docker (86%), Remotion (94%).',
  projects: '1. NexusCloud Distributed Platform (12,400 req/s, 99.99% uptime, sub-15ms p99)\n2. OrbitMotion 30.0 fps Remotion Engine\n3. CyberAuth Zero-Trust RBAC Gateway',
  arch: 'Architecture: Event-driven microservices | Multi-tenant PostgreSQL RLS | Redis distributed caching | Zero-trust token rotation | Sub-15ms p99 latency.',
  stack: 'Core Stack: React 18, Next.js, TypeScript, Node.js, PostgreSQL 16, Redis, Docker, Kubernetes, Remotion, Tailwind CSS, Vercel Edge.',
  contact: 'Email: mesameer762@gmail.com | GitHub: https://github.com/mesameers',
  matrix: '🕶️ Wake up, Neo... The Matrix has you. Welcome to Sameer Hussain\'s Orbit Repository.',
  orbit: '🛰️ Orbit altitude: 300km LEO | Speed: 7.8 km/s | Telemetry: 100% nominal | 0 unhandled exceptions.',
};

const QUICK_COMMANDS = ['help', 'projects', 'stack', 'arch', 'orbit', 'matrix', 'clear'];

export const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Sameer Hussain Interactive Terminal CLI v2.4' },
    { type: 'output', text: 'Type "help" or click quick-run chips to explore.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [cpuJitter, setCpuJitter] = useState(38);
  const [packetRate, setPacketRate] = useState(1420);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Live telemetry jitter
  useEffect(() => {
    const tInterval = setInterval(() => {
      setCpuJitter(Math.floor(32 + Math.random() * 14));
      setPacketRate(Math.floor(1380 + Math.random() * 80));
    }, 2200);
    return () => clearInterval(tInterval);
  }, []);

  const runCommand = (cmdText) => {
    const cmd = cmdText.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const response = COMMANDS[cmd] || `Command not found: "${cmd}". Type "help" for a list of commands.`;

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: cmdText },
      { type: 'output', text: response },
    ]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(inputVal);
  };

  return (
    <section id="terminal" className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-violet-400 bg-secondary-violet/10 border border-secondary-violet/30 px-3.5 py-1.5 rounded-full mb-3 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEVELOPER SHELL // CLOUD CONSOLE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
            Orbit Command Line Interface
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Execute direct terminal commands to query telemetry, tech stack, and project benchmarks in real-time.
          </p>
        </div>

        {/* 3-Column Full-Width Command Center Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Live Cluster Telemetry HUD (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-4 pb-2 border-b border-slate-800">
                <span className="flex items-center space-x-1.5 text-energy-teal">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>CLUSTER NODE</span>
                </span>
                <span className="text-emerald-400 font-bold">ONLINE</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>CPU LOAD</span>
                    <span className="text-white font-bold">{cpuJitter}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-space-950 overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-energy-teal transition-all duration-500"
                      style={{ width: `${cpuJitter}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>INGRESS PACKETS</span>
                    <span className="text-cyan-400 font-bold">{packetRate} pk/s</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-space-950 overflow-hidden border border-slate-800">
                    <div className="h-full bg-cyan-400 w-3/4 animate-pulse" />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                  <span>HOST_OS</span>
                  <span className="text-slate-300 font-semibold">Linux x86_64</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>SSL_CIPHER</span>
                  <span className="text-energy-teal font-semibold">TLS 1.3 / AES</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-lg">
              <span className="text-xs font-mono text-slate-400 block mb-2 font-bold">// EDGE LATENCY</span>
              <div className="font-mono text-2xl font-black text-energy-cyan">14.2 ms</div>
              <span className="text-[10px] font-mono text-slate-500">Global median p99 to Vercel CDN</span>
            </div>
          </div>

          {/* Center Column: Interactive Terminal Console (6 cols) */}
          <div
            onClick={() => inputRef.current?.focus()}
            className="lg:col-span-6 rounded-2xl bg-space-900/90 border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-xs sm:text-sm cursor-text backdrop-blur-2xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-space-850 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-400 text-xs">sameer@orbit-shell: ~/portfolio</span>
              <div className="flex items-center space-x-1 text-energy-teal text-xs">
                <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
                <span>BASH 5.2</span>
              </div>
            </div>

            {/* Terminal Logs */}
            <div className="p-6 space-y-3 min-h-[300px] max-h-[360px] overflow-y-auto">
              {history.map((item, idx) => (
                <div key={idx} className="leading-relaxed">
                  {item.type === 'input' ? (
                    <div className="flex items-center space-x-2 text-energy-teal">
                      <span className="text-secondary-violet">guest@orbit:~$</span>
                      <span className="text-white font-semibold">{item.text}</span>
                    </div>
                  ) : (
                    <div className="text-slate-300 whitespace-pre-line pl-4 border-l border-slate-800">
                      {item.text}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Prompt Form */}
            <form onSubmit={handleSubmit} className="flex items-center border-t border-slate-800 px-4 py-3 bg-space-950/80">
              <span className="text-secondary-violet mr-2">guest@orbit:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="type 'help', 'skills', 'projects'..."
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm placeholder-slate-600"
              />
              <button
                type="submit"
                className="p-1.5 rounded-lg bg-energy-teal/20 text-energy-cyan hover:bg-energy-teal/30 transition-colors"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right Column: Quick Commands & Status Matrix (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
                <span className="text-violet-400 font-bold">// QUICK EXECUTE</span>
                <span className="text-slate-500">1-CLICK</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 mb-3">
                Tap any command to run it in the shell:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={() => runCommand(cmd)}
                    className="px-3 py-1.5 rounded-xl bg-space-950 hover:bg-space-800 border border-slate-800 hover:border-energy-teal/50 font-mono text-xs text-energy-cyan hover:text-white transition-all shadow-sm hover:scale-105"
                  >
                    ${cmd}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-lg font-mono text-xs space-y-2">
              <span className="text-slate-400 block font-bold">// ENVIRONMENT</span>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>SESSION_ROLE</span>
                <span className="text-emerald-400">AUTHENTICATED</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>ACTIVE_STREAMS</span>
                <span className="text-cyan-400 font-bold">12 LIVE</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>COMPILATION</span>
                <span className="text-energy-teal font-bold">ZERO ERRORS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
