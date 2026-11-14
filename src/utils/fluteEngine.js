// Procedural Serene Ambient Flute Engine using Web Audio API
// Soft, meditative, peaceful background flute melody that auto-ducks during conversation

class AmbientFluteEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.isDucked = false;
    this.noteTimer = null;
    this.melodyIndex = 0;

    // Meditative Bansuri / Celtic Pentatonic Flute Melody
    this.notes = [
      { freq: 293.66, dur: 3.0, pause: 0.6 }, // D4
      { freq: 349.23, dur: 2.6, pause: 0.5 }, // F4
      { freq: 392.00, dur: 3.4, pause: 0.8 }, // G4
      { freq: 440.00, dur: 2.8, pause: 0.5 }, // A4
      { freq: 523.25, dur: 3.8, pause: 1.0 }, // C5
      { freq: 440.00, dur: 2.6, pause: 0.6 }, // A4
      { freq: 392.00, dur: 3.2, pause: 0.8 }, // G4
      { freq: 349.23, dur: 2.8, pause: 0.6 }, // F4
      { freq: 293.66, dur: 4.2, pause: 1.2 }, // D4 home
      { freq: 261.63, dur: 2.4, pause: 0.5 }, // C4
      { freq: 293.66, dur: 3.6, pause: 0.8 }, // D4
      { freq: 392.00, dur: 3.4, pause: 1.0 }, // G4
    ];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // "slightly sound" -> soft, gentle background volume
      this.masterGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (e) {}
  }

  playNextNote() {
    if (!this.isPlaying || !this.ctx || this.ctx.state !== 'running') return;

    const note = this.notes[this.melodyIndex];
    this.melodyIndex = (this.melodyIndex + 1) % this.notes.length;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const harmonic = this.ctx.createOscillator();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Flute Warmth Filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(1.5, now);

      // Fundamental Tone (Sine)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      // Soft 2nd Harmonic Tone (Triangle) for authentic flute body
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(note.freq * 2, now);

      // 5Hz Subtle Breath Vibrato
      lfo.frequency.setValueAtTime(5.2, now);
      lfoGain.gain.setValueAtTime(1.8, now); // subtle pitch vibrato
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfoGain.connect(harmonic.frequency);

      // Natural Flute Envelope: gentle swell (attack) -> soft breath sustain -> graceful decay
      const attack = 0.45;
      const release = 0.85;
      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.7, now + attack);
      noteGain.gain.linearRampToValueAtTime(0.55, now + note.dur - release);
      noteGain.gain.linearRampToValueAtTime(0.0001, now + note.dur);

      osc.connect(filter);
      harmonic.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      lfo.start(now);
      osc.start(now);
      harmonic.start(now);

      const stopTime = now + note.dur + 0.1;
      osc.stop(stopTime);
      harmonic.stop(stopTime);
      lfo.stop(stopTime);

      // Schedule next note
      const intervalMs = (note.dur + note.pause) * 1000;
      this.noteTimer = setTimeout(() => {
        this.playNextNote();
      }, intervalMs);
    } catch (e) {}
  }

  start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.masterGain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    this.playNextNote();
  }

  // Auto-Ducking: Immediately pause / fade out when conversation starts
  duck() {
    if (!this.ctx || !this.masterGain) return;
    this.isDucked = true;
    try {
      this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.15);
    } catch (e) {}
  }

  // Restore: Automatically fade back in when conversation ends
  unduck() {
    if (!this.ctx || !this.masterGain) return;
    this.isDucked = false;
    try {
      if (this.ctx.state === 'suspended') this.ctx.resume();
      this.masterGain.gain.setTargetAtTime(0.04, this.ctx.currentTime, 0.5);
    } catch (e) {}
  }

  stop() {
    this.isPlaying = false;
    if (this.noteTimer) {
      clearTimeout(this.noteTimer);
      this.noteTimer = null;
    }
    if (this.masterGain && this.ctx) {
      try {
        this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      } catch (e) {}
    }
  }
}

export const fluteEngine = new AmbientFluteEngine();
