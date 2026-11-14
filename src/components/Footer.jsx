import React from 'react';
import { GitBranch, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-space-950 border-t border-slate-900/80 text-xs font-mono text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-energy-teal" />
          <span className="text-slate-400 font-semibold">Sameer Hussain</span>
          <span className="text-slate-700">|</span>
          <span>dev-75 repository</span>
          <span className="text-slate-700">|</span>
          <span>commit #7f9a1c</span>
        </div>

        <div className="flex items-center space-x-6 text-slate-400">
          <a href="#hero" className="hover:text-energy-teal transition-colors">Orbit</a>
          <a href="#film" className="hover:text-energy-teal transition-colors">The Film</a>
          <a href="#projects" className="hover:text-energy-teal transition-colors">EIMS</a>
          <a href="#skills" className="hover:text-energy-teal transition-colors">Stack</a>
          <a href="#contact" className="hover:text-energy-teal transition-colors">Contact</a>
        </div>

        <div className="flex items-center space-x-2 text-slate-500">
          <span>Deterministic Motion via Remotion</span>
          <span className="text-slate-700">â€¢</span>
          <span>Â© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
