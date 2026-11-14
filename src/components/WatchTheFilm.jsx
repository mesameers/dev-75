import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Subtitles, Maximize2, ShieldCheck, Film, Terminal } from 'lucide-react';
import { BuiltInOrbitComposition } from '../../video/src/Composition';
import { VideoContext } from '../../video/src/remotion';

const TOTAL_FRAMES = 1800;
const FPS = 30;

const CAPTIONS = [
  { start: 0, end: 120, text: 'Sameer Hussain â€” Full-Stack Developer & Creative Engineer' },
  { start: 120, end: 240, text: 'Architecting high-performance web systems and weightless digital experiences' },
  { start: 240, end: 375, text: 'Core Philosophy: Systems built for resilience, throughput, and clean scale' },
  { start: 375, end: 510, text: 'Compiling production microservices with 99.99% operational uptime' },
  { start: 510, end: 645, text: 'Tech Stack in Orbit: React, TypeScript, Node.js, and Supabase PostgreSQL' },
  { start: 645, end: 780, text: 'Deploying containerized architectures with Docker, Tailwind, and Vite' },
  { start: 780, end: 945, text: 'Flagship Project: Multi-Campus Enterprise School Management System (EIMS)' },
  { start: 945, end: 1110, text: 'Powering 2,341 active sessions and 1,240 students across 3 institutions' },
  { start: 1110, end: 1260, text: 'Services: Full-Stack Web Development, Multi-Tenant Cloud Architecture' },
  { start: 1260, end: 1410, text: 'Interactive 3D Motion, Database Engineering, and Hardened Security' },
  { start: 1410, end: 1590, text: 'Pulling distributed branches and commits into a single unified build' },
  { start: 1590, end: 1800, text: "Let's Talk: mesameer762@gmail.com | github.com/mesameers" },
];

export const WatchTheFilm = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // High-precision deterministic frame tick
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        if (prev >= TOTAL_FRAMES - 1) {
          return isLooping ? 0 : prev;
        }
        return prev + 1;
      });
    }, 1000 / FPS);

    return () => clearInterval(interval);
  }, [isPlaying, isLooping]);

  const activeCaption = CAPTIONS.find(
    (c) => currentFrame >= c.start && currentFrame < c.end
  );

  const formatTime = (frame) => {
    const totalSeconds = Math.floor(frame / FPS);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleSeek = (e) => {
    const target = Number(e.target.value);
    setCurrentFrame(target);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <section id="film" className="py-20 px-6 bg-space-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3.5 py-1.5 rounded-full mb-3">
            <Film className="w-3.5 h-3.5" />
            <span>REMOTION // DETERMINISTIC PORTFOLIO FILM</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
            "Built in Orbit"
          </h2>
          <p className="text-slate-400 max-w-2xl text-base">
            Rendered from code deterministically at 30.0 fps. Exploring Sameer Hussain's engineering repository as a weightless system.
          </p>
        </div>

        {/* Video Theatre Player Container */}
        <div
          ref={containerRef}
          className="relative rounded-3xl bg-black border border-slate-800 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden group"
        >
          {/* Aspect Ratio 16:9 Canvas Host */}
          <div className="relative w-full aspect-video overflow-hidden bg-space-950 flex items-center justify-center">
            {/* Embedded Remotion Composition Canvas */}
            <div
              className="absolute inset-0 flex items-center justify-center origin-center"
              style={{
                transform: 'scale(calc(100% / 1920 * var(--scale, 1)))',
              }}
            >
              <div
                className="w-[1920px] h-[1080px] shrink-0"
                style={{
                  transform: 'scale(min(calc(100vw / 1920), calc(56.25vw / 1080)))',
                  transformOrigin: 'top left',
                }}
              >
                <VideoContext.Provider
                  value={{
                    currentFrame,
                    config: {
                      fps: FPS,
                      width: 1920,
                      height: 1080,
                      durationInFrames: TOTAL_FRAMES,
                    },
                  }}
                >
                  <BuiltInOrbitComposition />
                </VideoContext.Provider>
              </div>
            </div>

            {/* Burned-in / Live Captions Overlay */}
            {showCaptions && activeCaption && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 max-w-3xl px-6 py-2.5 rounded-xl bg-space-950/85 border border-slate-700/80 backdrop-blur-md text-center z-30 pointer-events-none transition-all">
                <p className="font-mono text-sm sm:text-base text-energy-cyan font-medium">
                  {activeCaption.text}
                </p>
              </div>
            )}
          </div>

          {/* Custom Film Player Controls Bar */}
          <div className="p-4 sm:p-5 bg-space-900/95 border-t border-slate-800 flex flex-col gap-3 z-30">
            {/* Timeline Scrubber */}
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs text-slate-400 w-12 text-right">
                {formatTime(currentFrame)}
              </span>
              <input
                type="range"
                min={0}
                max={TOTAL_FRAMES - 1}
                value={currentFrame}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-energy-teal"
              />
              <span className="font-mono text-xs text-slate-500 w-12">
                {formatTime(TOTAL_FRAMES)}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2.5 rounded-xl bg-energy-teal/20 border border-energy-teal/40 text-energy-cyan hover:bg-energy-teal/30 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <button
                  onClick={() => setCurrentFrame(0)}
                  className="p-2.5 rounded-xl bg-space-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Restart"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-xl bg-space-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`px-3 py-2 rounded-xl border text-xs font-mono font-semibold transition-colors flex items-center space-x-1.5 ${
                    showCaptions
                      ? 'bg-energy-teal/20 border-energy-teal/50 text-energy-cyan'
                      : 'bg-space-800 border-slate-700 text-slate-400'
                  }`}
                  title="Toggle Captions"
                >
                  <Subtitles className="w-3.5 h-3.5" />
                  <span>CC</span>
                </button>
              </div>

              {/* Status and Fullscreen */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 font-mono text-xs text-slate-400 bg-space-950 px-3 py-1 rounded-lg border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-energy-teal animate-pulse" />
                  <span>FRAME: {currentFrame} / {TOTAL_FRAMES}</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-slate-400">30.0 FPS</span>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-xl bg-space-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                  title="Fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility & Transcript Accordion */}
        <div className="mt-8 p-6 rounded-2xl bg-space-900/60 border border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-slate-200 font-semibold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Full Video Transcript & Accessibility Verification</span>
            </div>
            <a
              href="/media/captions.vtt"
              download
              className="text-xs font-mono text-energy-teal hover:underline"
            >
              Download .vtt captions
            </a>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-mono">
            {CAPTIONS.map((c) => c.text).join(' â€” ')}
          </p>
        </div>
      </div>
    </section>
  );
};
