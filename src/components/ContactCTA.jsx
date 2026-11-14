import React, { useState, useRef } from 'react';
import {
  Mail,
  Copy,
  Check,
  Terminal,
  Send,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Radio,
  Lock,
  ExternalLink,
  Activity,
  Clock,
  Globe2
} from 'lucide-react';
import { GithubIcon } from './icons/GithubIcon';
import { Contact3DNode } from './Contact3DNode';
import { useInView } from '../hooks/useInView';

const PROJECT_DOMAINS = [
  'Full-Stack Web App',
  'Cloud Architecture',
  'Deterministic 3D Motion',
  'API Security & RBAC',
];

export const ContactCTA = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const cardRef = useRef(null);

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    domain: PROJECT_DOMAINS[0],
    message: '',
  });

  const [transmissionState, setTransmissionState] = useState('idle'); // idle | transmitting | sent
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const primaryEmail = 'mesameer762@gmail.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(primaryEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -5;
    const ry = ((x - centerX) / centerX) * 5;
    setTilt({ rx, ry });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    setTransmissionState('transmitting');

    setTimeout(() => {
      setTransmissionState('sent');

      const subject = encodeURIComponent(`[Transmission] Inquiry from ${formData.name || 'Visitor'} - ${formData.domain}`);
      const body = encodeURIComponent(
        `Sender Name: ${formData.name}\nSender Email: ${formData.email}\nDomain: ${formData.domain}\n\nMessage Payload:\n${formData.message}`
      );
      window.location.href = `mailto:${primaryEmail}?subject=${subject}&body=${body}`;

      setTimeout(() => {
        setTransmissionState('idle');
      }, 4000);
    }, 1200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden"
    >
      {/* Background Deep Cosmic Gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-t from-energy-teal/15 via-secondary-violet/10 to-transparent blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        {/* Monospace Indicator */}
        <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-6 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
          <Radio className="w-3.5 h-3.5 text-energy-cyan animate-pulse" />
          <span>DIRECT QUANTUM LINK // SECURE DISPATCH</span>
        </div>

        {/* 3-Column Header Deck: Left Floating Beacon, Center Headline, Right Floating SLA */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-10">
          {/* Left Flank: 3D Quantum Carrier Beacon (Fills Left Red Box!) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col p-5 rounded-2xl bg-space-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg">
            <div className="flex items-center space-x-2 font-mono text-xs text-energy-teal mb-2">
              <Radio className="w-4 h-4 text-energy-cyan animate-pulse" />
              <span className="font-bold">CARRIER_SIGNAL</span>
            </div>
            <div className="font-mono text-xl font-black text-white mb-1">1420.4 MHz</div>
            <div className="font-mono text-xs text-emerald-400 font-semibold mb-3">● 99.8% STRENGTH</div>
            <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <span>ORBIT LEO // GLOBAL</span>
            </div>
          </div>

          {/* Center Headline (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center text-center">
            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-3">
              LET'S{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-teal via-white to-secondary-violet animate-gradient-x">
                TALK.
              </span>
            </h2>
            <p className="text-slate-300 max-w-xl text-center text-sm sm:text-base font-medium leading-relaxed">
              Have an enterprise cloud platform, creative WebGL experience, or high-throughput API to engineer? Let's connect and build in orbit.
            </p>
          </div>

          {/* Right Flank: Real-Time Availability & SLA (Fills Right Red Box!) */}
          <div className="hidden lg:flex lg:col-span-3 flex-col p-5 rounded-2xl bg-space-900/80 border border-slate-800/80 backdrop-blur-xl shadow-lg text-right">
            <div className="flex items-center justify-end space-x-2 font-mono text-xs text-cyan-400 mb-2">
              <span className="font-bold">DISPATCH_STATUS</span>
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            </div>
            <div className="font-mono text-xl font-black text-emerald-400 mb-1">AVAILABLE NOW</div>
            <div className="font-mono text-xs text-slate-300 font-semibold mb-3">&lt; 2 HOUR RESPONSE SLA</div>
            <div className="flex items-center justify-end space-x-2 font-mono text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>TIMEZONE: UTC+5 / REMOTE</span>
            </div>
          </div>
        </div>

        {/* 3D Tilting Interactive Contact Console Container */}
        <div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg)`,
            transition: 'transform 0.15s ease-out',
          }}
          className={`w-full rounded-3xl bg-space-900/90 border border-energy-teal/30 shadow-[0_30px_100px_rgba(0,0,0,0.85),0_0_50px_rgba(0,242,254,0.1)] overflow-hidden backdrop-blur-2xl transition-all duration-700 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Console Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-space-850 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-xs text-slate-400">~/contact-transmission-node.sh</span>
            </div>

            <div className="flex items-center space-x-2 font-mono text-xs">
              <Lock className="w-3.5 h-3.5 text-energy-teal" />
              <span className="text-energy-teal font-semibold">AES-256 E2E ENCRYPTED</span>
            </div>
          </div>

          {/* Two-Column Grid: Left Transmission Form, Right 3D Globe Node */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10">
            {/* Left Column: Direct Message Form (7 cols) */}
            <form onSubmit={handleTransmit} className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 flex items-center space-x-2">
                  <span>Send Direct Engineering Transmission</span>
                  <Sparkles className="w-4 h-4 text-energy-teal" />
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-5">
                  Direct pipeline to Sameer Hussain. Messages routed instantly with zero drop.
                </p>

                {/* Domain Selection Chips */}
                <div className="mb-4">
                  <label className="block font-mono text-xs text-slate-400 mb-2">SELECT FOCUS DOMAIN:</label>
                  <div className="flex flex-wrap gap-2">
                    {PROJECT_DOMAINS.map((domain) => (
                      <button
                        type="button"
                        key={domain}
                        onClick={() => setFormData({ ...formData, domain })}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                          formData.domain === domain
                            ? 'bg-energy-teal text-space-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)] scale-105'
                            : 'bg-space-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1">YOUR NAME / ORG</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-energy-teal text-white font-mono text-xs outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-slate-400 mb-1">RETURN EMAIL</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-energy-teal text-white font-mono text-xs outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Message Payload Textarea */}
                <div>
                  <label className="block font-mono text-xs text-slate-400 mb-1">PROJECT DETAILS / MESSAGE</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe your architecture requirements, timeline, or engineering goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-space-950 border border-slate-800 focus:border-energy-teal text-white font-mono text-xs outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Transmit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={transmissionState === 'transmitting'}
                  className={`w-full flex items-center justify-center space-x-2.5 py-3.5 px-6 rounded-2xl font-mono text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(0,242,254,0.35)] ${
                    transmissionState === 'sent'
                      ? 'bg-emerald-400 text-space-950 shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                      : transmissionState === 'transmitting'
                      ? 'bg-energy-teal/80 text-space-950 animate-pulse'
                      : 'bg-gradient-to-r from-energy-teal via-cyan-300 to-secondary-violet text-space-950 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,242,254,0.5)]'
                  }`}
                >
                  {transmissionState === 'transmitting' ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>ENCRYPTING & DISPATCHING TRANSMISSION...</span>
                    </>
                  ) : transmissionState === 'sent' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>TRANSMISSION DISPATCHED TO SAMEER!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT MESSAGE VIA CLOUD GATEWAY</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Right Column: 3D Holographic Globe & One-Click Protocol Links (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* 3D Globe Transmitter Canvas */}
              <Contact3DNode isTransmitting={transmissionState === 'transmitting'} />

              {/* Quick Communication Protocol Pills */}
              <div className="space-y-3 font-mono text-xs">
                {/* Email Direct */}
                <div className="p-3.5 rounded-2xl bg-space-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-energy-teal shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">PRIMARY INBOX</span>
                      <span className="text-white font-bold tracking-tight text-xs sm:text-sm">
                        {primaryEmail}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-850 hover:bg-space-800 text-slate-200 border border-slate-700 transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-400" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* GitHub Direct */}
                <div className="p-3.5 rounded-2xl bg-space-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GithubIcon className="w-4 h-4 text-secondary-violet shrink-0" />
                    <div>
                      <span className="text-[10px] text-slate-500 block">SOURCE CODE REPOSITORY</span>
                      <span className="text-white font-bold text-xs sm:text-sm">
                        github.com/mesameers
                      </span>
                    </div>
                  </div>

                  <a
                    href="https://github.com/mesameers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-space-850 hover:bg-space-800 text-slate-200 border border-slate-700 transition-all hover:text-white"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
