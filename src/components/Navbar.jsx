import React from 'react';
import { Terminal, Film, Mail, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl bg-space-900/70 border border-slate-800/80 backdrop-blur-xl shadow-2xl">
        {/* Brand / Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-energy-teal/20 via-space-850 to-secondary-violet/20 border border-energy-teal/40 flex items-center justify-center text-energy-cyan font-mono font-bold text-lg shadow-[0_0_15px_rgba(0,242,254,0.25)] group-hover:scale-105 transition-transform">
            SH
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white tracking-tight leading-tight group-hover:text-energy-cyan transition-colors">
              Sameer Hussain
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              Full-Stack & Creative Dev
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#film" className="flex items-center space-x-1.5 hover:text-energy-teal transition-colors">
            <Film className="w-4 h-4 text-energy-teal" />
            <span>Watch the Film</span>
          </a>
          <a href="#projects" className="hover:text-energy-teal transition-colors">
            Featured System (EIMS)
          </a>
          <a href="#skills" className="hover:text-energy-teal transition-colors">
            Tech Stack
          </a>
          <a href="#services" className="hover:text-energy-teal transition-colors">
            Services
          </a>
        </nav>

        {/* Right CTA & Socials */}
        <div className="flex items-center space-x-4">
          <a
            href="https://github.com/mesameers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-space-800 border border-slate-700/60 text-slate-300 hover:text-white hover:border-energy-teal/50 transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-energy-teal/20 to-secondary-violet/20 border border-energy-teal/40 text-energy-cyan hover:text-white font-medium text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,242,254,0.15)] hover:shadow-[0_0_25px_rgba(0,242,254,0.35)]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Let's Talk</span>
          </a>
        </div>
      </div>
    </header>
  );
};
