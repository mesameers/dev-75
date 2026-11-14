import React from 'react';
import { Film, Mail } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { SoundEngine } from './SoundEngine';

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl bg-space-900/80 border border-slate-800/80 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-energy-teal/20 via-space-850 to-secondary-violet/20 border border-energy-teal/40 flex items-center justify-center text-energy-cyan font-mono font-bold text-lg shadow-[0_0_15px_rgba(0,242,254,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all">
            SH
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-white tracking-tight leading-tight group-hover:text-energy-cyan transition-colors">
              Sameer Hussain
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Full-Stack & Creative Dev
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-300">
          <a href="#film" className="flex items-center space-x-1.5 hover:text-energy-teal transition-colors">
            <Film className="w-4 h-4 text-energy-teal" />
            <span>Film</span>
          </a>
          <a href="#projects" className="hover:text-energy-teal transition-colors">
            Systems
          </a>
          <a href="#architecture" className="hover:text-energy-teal transition-colors">
            Topology
          </a>
          <a href="#code" className="hover:text-energy-teal transition-colors">
            Code
          </a>
          <a href="#api-playground" className="hover:text-energy-teal transition-colors flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>API Suite</span>
          </a>
          <a href="#skills" className="hover:text-energy-teal transition-colors">
            Matrix
          </a>
          <a href="#terminal" className="hover:text-energy-teal transition-colors font-mono text-xs text-violet-400">
            &gt;_ CLI
          </a>
        </nav>

        {/* Right CTA, Audio Engine & Socials */}
        <div className="flex items-center space-x-3">
          <SoundEngine />

          <a
            href="https://github.com/mesameers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-space-850 border border-slate-700/80 text-slate-300 hover:text-white hover:border-energy-teal/50 hover:shadow-[0_0_15px_rgba(0,242,254,0.2)] transition-all"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-energy-teal/20 via-cyan-400/20 to-secondary-violet/20 border border-energy-teal/40 text-energy-cyan hover:text-white font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,242,254,0.15)] hover:shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:scale-105"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Let's Talk</span>
          </a>
        </div>
      </div>
    </header>
  );
};
