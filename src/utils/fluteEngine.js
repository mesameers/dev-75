// Authentic Bansuri Flute Engine - "Hum Tumhare Hain Sanam" Melody
// Synthesizes the iconic romantic Bollywood melody with real flute breath, warmth, and auto-ducking

class AmbientFluteEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.isPlaying = false;
    this.isDucked = false;
    this.noteTimer = null;
    this.melodyIndex = 0;

    // "Hum Tumhare Hain Sanam" (ہم تمہارے ہیں صنم) Authentic Flute Notations
    this.notes = [
      // Phrase 1: "Hum tumhaare hain... tumhaare sanam..."
      { freq: 329.63, dur: 0.65, pause: 0.08, label: 'Hum' },        // E4
      { freq: 349.23, dur: 0.65, pause: 0.08, label: 'tum-' },       // F4
      { freq: 392.00, dur: 0.70, pause: 0.08, label: '-haa-' },      // G4
      { freq: 440.00, dur: 1.35, pause: 0.28, label: '-re hain' },   // A4
      { freq: 440.00, dur: 0.55, pause: 0.08, label: 'tum-' },       // A4
      { freq: 440.00, dur: 0.50, pause: 0.08, label: '-haa-' },      // A4
      { freq: 493.88, dur: 0.55, pause: 0.08, label: '-re' },        // B4
      { freq: 523.25, dur: 1.85, pause: 0.55, label: 'sa-nam...' },  // C5

      // Phrase 2: "Jaaneman mohabbat ki, har kasam ki kasam..."
      { freq: 523.25, dur: 0.65, pause: 0.08, label: 'Jaa-' },       // C5
      { freq: 493.88, dur: 0.52, pause: 0.08, label: '-ne-' },       // B4
      { freq: 440.00, dur: 0.58, pause: 0.08, label: '-man' },       // A4
      { freq: 392.00, dur: 1.15, pause: 0.28, label: 'mohab-bat' },  // G4
      { freq: 392.00, dur: 0.42, pause: 0.06, label: 'har' },        // G4
      { freq: 349.23, dur: 0.42, pause: 0.06, label: 'ka-' },        // F4
      { freq: 392.00, dur: 0.45, pause: 0.06, label: '-sam' },       // G4
      { freq: 440.00, dur: 0.45, pause: 0.06, label: 'ki' },         // A4
      { freq: 493.88, dur: 0.52, pause: 0.06, label: 'ka-' },        // B4
      { freq: 440.00, dur: 0.45, pause: 0.06, label: '-sam' },       // A4
      { freq: 392.00, dur: 1.35, pause: 0.40, label: 'ki...' },      // G4

      // Phrase 3: "Na juda honge hum..."
      { freq: 349.23, dur: 0.58, pause: 0.08, label: 'Na' },         // F4
      { freq: 392.00, dur: 0.58, pause: 0.08, label: 'ju-' },        // G4
      { freq: 440.00, dur: 0.62, pause: 0.08, label: '-da' },        // A4
      { freq: 392.00, dur: 0.58, pause: 0.08, label: 'hon-' },       // G4
      { freq: 349.23, dur: 0.58, pause: 0.08, label: '-ge' },        // F4
      { freq: 329.63, dur: 0.75, pause: 0.10, label: 'hum...' },     // E4
      { freq: 293.66, dur: 1.65, pause: 0.50, label: 'hum...' },     // D4

      // Phrase 4: "Hum tumhaare hain, tumhaare sanam" (Refrain climax)
      { freq: 329.63, dur: 0.65, pause: 0.08, label: 'Hum' },        // E4
      { freq: 349.23, dur: 0.65, pause: 0.08, label: 'tum-' },       // F4
      { freq: 392.00, dur: 0.70, pause: 0.08, label: '-haa-' },      // G4
      { freq: 440.00, dur: 1.35, pause: 0.28, label: '-re hain' },   // A4
      { freq: 440.00, dur: 0.55, pause: 0.08, label: 'tum-' },       // A4
      { freq: 440.00, dur: 0.50, pause: 0.08, label: '-haa-' },      // A4
      { freq: 493.88, dur: 0.55, pause: 0.08, label: '-re' },        // B4
      { freq: 523.25, dur: 2.30, pause: 0.85, label: 'sa-nam...' },  // C5

      // Phrase 5: Serene Flute Alaap / Interlude connecting into next cycle
      { freq: 587.33, dur: 0.75, pause: 0.10, label: 'D5 alaap' },   // D5
      { freq: 523.25, dur: 0.85, pause: 0.12, label: 'C5 alaap' },   // C5
      { freq: 493.88, dur: 0.75, pause: 0.10, label: 'B4 alaap' },   // B4
      { freq: 440.00, dur: 1.10, pause: 0.15, label: 'A4 alaap' },   // A4
      { freq: 392.00, dur: 0.90, pause: 0.15, label: 'G4 alaap' },   // G4
      { freq: 349.23, dur: 0.85, pause: 0.15, label: 'F4 alaap' },   // F4
      { freq: 329.63, dur: 1.70, pause: 1.25, label: 'E4 resolve' }, // E4 peaceful resolution before looping
    ];
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      // Soft, gentle background presence ("slightly sound k saath")
      this.masterGain.gain.setValueAtTime(0.045, this.ctx.currentTime);
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
      const harmonicGain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Flute Warmth Filter (bamboo resonance)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1550, now);
      filter.Q.setValueAtTime(1.8, now);

      // Fundamental Tone (Sine)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note.freq, now);

      // Soft 2nd Harmonic Tone (Triangle) for authentic bansuri body
      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(note.freq * 2, now);
      harmonicGain.gain.setValueAtTime(0.22, now);

      // 5.2Hz Natural Breath Vibrato
      lfo.frequency.setValueAtTime(5.2, now);
      lfoGain.gain.setValueAtTime(2.1, now);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfoGain.connect(harmonic.frequency);

      // Natural Flute Breath Envelope (soft attack swell -> sustain -> gentle decay)
      const attack = Math.min(0.22, note.dur * 0.28);
      const release = Math.min(0.32, note.dur * 0.38);
      const sustainTime = Math.max(0.05, note.dur - attack - release);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.68, now + attack);
      noteGain.gain.linearRampToValueAtTime(0.52, now + attack + sustainTime);
      noteGain.gain.linearRampToValueAtTime(0.0001, now + note.dur);

      osc.connect(filter);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      lfo.start(now);
      osc.start(now);
      harmonic.start(now);

      const stopTime = now + note.dur + 0.1;
      osc.stop(stopTime);
      harmonic.stop(stopTime);
      lfo.stop(stopTime);

      // Schedule next note with exact phrasing pause
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
    this.masterGain.gain.setValueAtTime(0.045, this.ctx.currentTime);
    this.playNextNote();
  }

  // Auto-Ducking: Immediately pause / duck volume when speech starts
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
      this.masterGain.gain.setTargetAtTime(0.045, this.ctx.currentTime, 0.5);
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
