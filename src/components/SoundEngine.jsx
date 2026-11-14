import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundEngine = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const droneGainRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      // Ambient Cosmic Drone (Harmonic dual oscillators + lowpass filter)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, ctx.currentTime); // Subtle pitch detune for shimmer

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc1.start();
      osc2.start();
      droneGainRef.current = gainNode;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const toggleAudio = () => {
    initAudio();
    if (!droneGainRef.current || !audioCtxRef.current) return;

    if (!isAudioEnabled) {
      // Fade in drone smoothly
      droneGainRef.current.gain.linearRampToValueAtTime(0.05, audioCtxRef.current.currentTime + 1.5);
      setIsAudioEnabled(true);
      playBlip(640);
    } else {
      // Fade out
      droneGainRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
      setIsAudioEnabled(false);
    }
  };

  const playBlip = (freq = 480) => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch (e) {
      // Audio not permitted yet
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`p-2.5 rounded-xl border font-mono text-xs transition-all flex items-center space-x-2 ${
        isAudioEnabled
          ? 'bg-energy-teal/20 border-energy-teal/50 text-energy-cyan shadow-[0_0_15px_rgba(0,242,254,0.3)]'
          : 'bg-space-850 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-600'
      }`}
      title={isAudioEnabled ? 'Mute Cosmic Ambient Sound' : 'Enable Cosmic Ambient Sound'}
    >
      {isAudioEnabled ? (
        <>
          <Volume2 className="w-4 h-4 text-energy-teal animate-pulse" />
          <span className="hidden sm:inline text-[11px] font-bold">COSMIC AUDIO ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">AUDIO OFF</span>
        </>
      )}
    </button>
  );
};
