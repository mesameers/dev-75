import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Sparkles, CornerDownLeft } from 'lucide-react';

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

export const InteractiveTerminal = () => {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to Sameer Hussain Interactive Terminal CLI v2.4' },
    { type: 'output', text: 'Type "help" to view all available commands.' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const response = COMMANDS[cmd] || `Command not found: "${cmd}". Type "help" for a list of commands.`;

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: inputVal },
      { type: 'output', text: response },
    ]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="py-20 px-6 bg-space-950 relative border-t border-slate-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-violet-400 bg-secondary-violet/10 border border-secondary-violet/30 px-3.5 py-1.5 rounded-full mb-3 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEVELOPER SHELL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            Orbit Command Line Interface
          </h2>
          <p className="text-slate-400 text-sm">
            Execute direct terminal commands to query telemetry, tech stack, and project facts.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-2xl bg-space-900/90 border border-slate-800 shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-xs sm:text-sm cursor-text backdrop-blur-xl"
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
              <span>BASH</span>
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="p-6 space-y-3 max-h-[340px] overflow-y-auto">
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
      </div>
    </section>
  );
};
