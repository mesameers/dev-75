import React, { useState } from 'react';
import { Mail, Copy, Check, Terminal, Send, ArrowRight } from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';

export const ContactCTA = () => {
  const [copied, setCopied] = useState(false);
  const email = 'mesameer762@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 px-6 bg-space-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-t from-energy-teal/15 via-secondary-violet/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Monospace Indicator */}
        <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(0,242,254,0.2)]">
          <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
          <span>INITIALIZE CONTACT // ORBIT LINK</span>
        </div>

        {/* Big Closing CTA Headline */}
        <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-6">
          LET'S{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet">
            TALK.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-300 max-w-2xl text-lg sm:text-xl font-medium leading-relaxed mb-12">
          Have an enterprise application, creative web experience, or architecture challenge to solve? Let's connect.
        </p>

        {/* Interactive Terminal Contact Box */}
        <div className="w-full max-w-3xl rounded-3xl bg-space-900/90 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] overflow-hidden text-left font-mono backdrop-blur-xl">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-3.5 bg-space-850 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-slate-400">~/contact-dispatcher.sh</span>
            <span className="text-xs text-energy-teal font-semibold">STATUS: LISTENING</span>
          </div>

          {/* Terminal Content */}
          <div className="p-8 space-y-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">// Direct Communication Protocol</p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-space-950 border border-slate-800">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-energy-teal" />
                  <div>
                    <span className="text-xs text-slate-500 block">PRIMARY EMAIL</span>
                    <span className="text-base sm:text-lg text-white font-bold tracking-tight">
                      {email}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyEmail}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${email}?subject=Project%20Inquiry%20via%20Portfolio`}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-energy-teal hover:bg-energy-cyan text-space-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  >
                    <span>Send Mail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1">// Public Code Repositories</p>
              <div className="flex items-center justify-between p-4 rounded-2xl bg-space-950 border border-slate-800">
                <div className="flex items-center space-x-3">
                  <GithubIcon className="w-5 h-5 text-secondary-violet" />
                  <div>
                    <span className="text-xs text-slate-500 block">GITHUB PROFILE</span>
                    <span className="text-sm sm:text-base text-white font-semibold">
                      github.com/mesameers
                    </span>
                  </div>
                </div>

                <a
                  href="https://github.com/mesameers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-space-800 hover:bg-space-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                >
                  <span>Visit GitHub</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
