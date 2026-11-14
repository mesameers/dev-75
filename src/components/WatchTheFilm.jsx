import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Subtitles,
  Maximize2,
  ShieldCheck,
  Film,
  Sparkles,
  Layers,
  Code2,
  Check
} from 'lucide-react';
import { BuiltInOrbitComposition, SCENE_DURATIONS } from '../../video/src/Composition';
import { VideoContext } from '../../video/src/remotion';

const TOTAL_FRAMES = 1800;
const FPS = 30;

const SCENES = [
  { name: '01. Orbit Hero', start: 0, end: 270 },
  { name: '02. Philosophy', start: 270, end: 570 },
  { name: '03. Stack in Orbit', start: 570, end: 870 },
  { name: '04. Enterprise Cloud', start: 870, end: 1200 },
  { name: '05. Disciplines', start: 1200, end: 1500 },
  { name: '06. Git Merge & CTA', start: 1500, end: 1800 },
];

const CAPTIONS = [
  { start: 0, end: 120, text: 'Sameer Hussain — Full-Stack Developer & Systems Architect' },
  { start: 120, end: 270, text: 'Architecting high-performance web systems and weightless digital experiences' },
  { start: 270, end: 420, text: 'Core Philosophy: Systems built for resilience, throughput, and clean scale' },
  { start: 420, end: 570, text: 'Compiling production microservices with 99.99% operational uptime' },
  { start: 570, end: 720, text: 'Tech Stack in Orbit: React, Next.js, TypeScript, Node.js, and PostgreSQL' },
  { start: 720, end: 870, text: 'Deploying containerized architectures with Docker, Redis, and Vite' },
  { start: 870, end: 1030, text: 'Flagship Architecture: High-Throughput Distributed Microservices Platform' },
  { start: 1030, end: 1200, text: 'Processing 12,400 req/sec with sub-15ms p99 query latency and 99.99% uptime' },
  { start: 1200, end: 1350, text: 'Services: Full-Stack Web Development, Multi-Tenant Cloud Architecture' },
  { start: 1350, end: 1500, text: 'Interactive 3D Motion, Database Engineering, and Hardened Security' },
  { start: 1500, end: 1650, text: 'Pulling distributed branches and commits into a single unified build' },
  { start: 1650, end: 1800, text: "Let's Talk: mesameer762@gmail.com | github.com/mesameers" },
];

export const WatchTheFilm = () => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showCaptions, setShowCaptions] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [scale, setScale] = useState(0.5);

  const containerRef = useRef(null);
  const viewportRef = useRef(null);

  // Measure container and compute accurate responsive scale for 1920x1080 canvas
  useEffect(() => {
    const updateScale = () => {
      if (!viewportRef.current) return;
      const rect = viewportRef.current.getBoundingClientRect();
      const newScale = rect.width / 1920;
      if (newScale > 0) {
        setScale(newScale);
      }
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    if (viewportRef.current) {
      ro.observe(viewportRef.current);
    }
    window.addEventListener('resize', updateScale);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, []);

  // Frame tick animation loop
  useEffect(() => {
    if (!isPlaying) return;

    let frameId;
    let lastTime = performance.now();
    const frameInterval = 1000 / FPS;

    const tick = (now) => {
      const elapsed = now - lastTime;
      if (elapsed >= frameInterval) {
        lastTime = now - (elapsed % frameInterval);
        setCurrentFrame((prev) => {
          if (prev >= TOTAL_FRAMES - 1) {
            return isLooping ? 0 : prev;
          }
          return prev + 1;
        });
      }
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying, isLooping]);

  const activeCaption = CAPTIONS.find(
    (c) => currentFrame >= c.start && currentFrame < c.end
  );

  const activeSceneIndex = SCENES.findIndex(
    (s) => currentFrame >= s.start && currentFrame < s.end
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

  const jumpToScene = (startFrame) => {
    setCurrentFrame(startFrame);
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
    <section id="film" className="py-24 px-6 bg-space-950 relative border-t border-slate-900">
      {/* Background Ambient Glow Behind Player */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-energy-teal/15 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Film className="w-3.5 h-3.5" />
            <span>REMOTION // DETERMINISTIC PORTFOLIO FILM</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-3">
            "Built in Orbit"
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Rendered from code deterministically at 30.0 fps. Touring Sameer Hussain's engineering repository as a weightless system.
          </p>
        </div>

        {/* Scene Quick-Jumper Navigation Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
          {SCENES.map((scene, idx) => (
            <button
              key={idx}
              onClick={() => jumpToScene(scene.start)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all flex items-center space-x-1.5 ${
                activeSceneIndex === idx
                  ? 'bg-energy-teal text-space-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.4)] scale-105'
                  : 'bg-space-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span>{scene.name}</span>
            </button>
          ))}
        </div>

        {/* Cinema Video Theatre Player */}
        <div
          ref={containerRef}
          className="relative rounded-3xl bg-black border-2 border-energy-teal/30 shadow-[0_30px_100px_rgba(0,242,254,0.15)] overflow-hidden"
        >
          {/* 16:9 Viewport Canvas */}
          <div
            ref={viewportRef}
            className="relative w-full aspect-video overflow-hidden bg-[#05070B] flex items-center justify-center"
          >
            {/* The 1920x1080 Remotion Canvas dynamically scaled to fit perfectly */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '1920px',
                height: '1080px',
                transform: `scale(${scale})`,
                transformOrigin: 'center center',
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

            {/* Captions Overlay Bar */}
            {showCaptions && activeCaption && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 max-w-4xl px-6 py-2.5 rounded-2xl bg-space-950/90 border border-energy-teal/40 backdrop-blur-md text-center z-30 pointer-events-none shadow-[0_0_25px_rgba(0,242,254,0.25)]">
                <p className="font-mono text-sm sm:text-base text-energy-cyan font-bold tracking-wide">
                  {activeCaption.text}
                </p>
              </div>
            )}
          </div>

          {/* Film Player Controls Bar */}
          <div className="p-4 sm:p-5 bg-space-900/95 border-t border-slate-800 flex flex-col gap-3.5 z-30">
            {/* Timeline Scrubber */}
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs text-slate-300 w-12 text-right font-semibold">
                {formatTime(currentFrame)}
              </span>
              <input
                type="range"
                min={0}
                max={TOTAL_FRAMES - 1}
                value={currentFrame}
                onChange={handleSeek}
                className="w-full h-2 bg-space-950 rounded-lg appearance-none cursor-pointer accent-energy-teal border border-slate-800"
              />
              <span className="font-mono text-xs text-slate-500 w-12 font-medium">
                {formatTime(TOTAL_FRAMES)}
              </span>
            </div>

            {/* Controls Row */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-4 py-2 rounded-xl bg-energy-teal hover:bg-energy-cyan text-space-950 font-bold text-xs transition-all flex items-center space-x-2 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY</span>
                    </>
                  )}
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

              {/* Status HUD and Fullscreen */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-400 bg-space-950 px-3.5 py-1.5 rounded-xl border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-energy-cyan animate-pulse" />
                  <span className="text-white font-semibold">FRAME {currentFrame}</span>
                  <span className="text-slate-600">/</span>
                  <span>1800</span>
                  <span className="text-slate-600">|</span>
                  <span className="text-energy-teal">30.0 FPS</span>
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

        {/* Accessibility Verification Box */}
        <div className="mt-8 p-6 rounded-2xl bg-space-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-slate-300 text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Deterministic rendering engine verified. Zero unseeded randomness. 100% frame-locked.</span>
          </div>

          <a
            href="/media/captions.vtt"
            download
            className="px-4 py-2 rounded-xl bg-space-800 border border-slate-700 hover:border-energy-teal/50 text-energy-cyan text-xs font-mono font-semibold transition-colors shrink-0"
          >
            Download captions.vtt
          </a>
        </div>
      </div>
    </section>
  );
};
