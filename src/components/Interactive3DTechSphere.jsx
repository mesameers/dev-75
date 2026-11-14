import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Layers, Cpu, Shield, Zap, RefreshCw } from 'lucide-react';

const TECH_ITEMS = [
  { name: 'React 18', category: 'Frontend', color: '#00F2FE', desc: 'Concurrent rendering, Server Components, custom hooks architecture' },
  { name: 'Next.js 14', category: 'Frontend', color: '#38BDF8', desc: 'App router, SSR/SSG caching strategies, Edge runtime' },
  { name: 'TypeScript', category: 'Language', color: '#00FFE0', desc: 'Strict typing, generic abstractions, AST transformations' },
  { name: 'Node.js', category: 'Backend', color: '#22C55E', desc: 'Event loop tuning, stream pipelines, asynchronous clustering' },
  { name: 'Python', category: 'Backend/AI', color: '#FACC15', desc: 'FastAPI microservices, PyTorch inference, data pipelines' },
  { name: 'PostgreSQL 16', category: 'Database', color: '#3B82F6', desc: 'ACID transactions, Row-Level Security, partition indexing' },
  { name: 'Redis', category: 'Cache', color: '#EF4444', desc: 'In-memory pub-sub, distributed locks, rate-limit caching' },
  { name: 'Docker', category: 'DevOps', color: '#0284C7', desc: 'Multi-stage builds, Alpine containerization, compose orchestration' },
  { name: 'Kubernetes', category: 'DevOps', color: '#6366F1', desc: 'Cloud-native pod scheduling, ingress controller, autoscaling' },
  { name: 'Supabase', category: 'Cloud', color: '#10B981', desc: 'Realtime change streams, PostgreSQL Auth, edge storage' },
  { name: 'GraphQL', category: 'API', color: '#EC4899', desc: 'Typed schema federation, Apollo servers, query batching' },
  { name: 'WebSockets', category: 'Realtime', color: '#A855F7', desc: 'Low-latency bi-directional sockets, binary delta sync' },
  { name: 'Tailwind CSS', category: 'Styling', color: '#06B6D4', desc: 'Design token systems, JIT engine, custom fluid utilities' },
  { name: 'Three.js / WebGL', category: '3D/Creative', color: '#F97316', desc: 'Custom shaders, buffer geometries, 60fps GPU pipeline' },
  { name: 'Remotion', category: 'Motion as Code', color: '#8B5CF6', desc: 'Deterministic 30fps code-driven analytical video rendering' },
  { name: 'Vite', category: 'Build', color: '#EAB308', desc: 'Rollup ESM bundling, instant HMR, tree-shaking optimizations' },
  { name: 'AWS Cloud', category: 'Infra', color: '#FF9900', desc: 'S3, ECS, Lambda serverless, CloudFront CDN edge distribution' },
  { name: 'Kafka', category: 'Streaming', color: '#E11D48', desc: 'High-throughput event logs, consumer group offset management' },
];

export const Interactive3DTechSphere = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedTech, setSelectedTech] = useState(TECH_ITEMS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  // Rotation angles & velocities
  const rotationRef = useRef({
    rx: 0.2,
    ry: 0.3,
    vx: 0.003,
    vy: 0.005,
    lastMouseX: 0,
    lastMouseY: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight || 500;
    };
    window.addEventListener('resize', handleResize);

    // Distribute tech items evenly on a 3D sphere surface using Fibonacci Sphere Algorithm
    const radius = Math.min(width, height) * 0.38;
    const nodes = TECH_ITEMS.map((tech, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / TECH_ITEMS.length);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      return {
        ...tech,
        x0: radius * Math.sin(phi) * Math.cos(theta),
        y0: radius * Math.cos(phi),
        z0: radius * Math.sin(phi) * Math.sin(theta),
        // Projected coordinates
        px: 0,
        py: 0,
        scale: 1,
        alpha: 1,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      // Update rotation
      if (autoRotate && !isDragging) {
        rotationRef.current.rx += rotationRef.current.vx;
        rotationRef.current.ry += rotationRef.current.vy;
      }

      const cosX = Math.cos(rotationRef.current.rx);
      const sinX = Math.sin(rotationRef.current.rx);
      const cosY = Math.cos(rotationRef.current.ry);
      const sinY = Math.sin(rotationRef.current.ry);

      // Rotate and project nodes
      for (let node of nodes) {
        // Rotate around Y axis
        const x1 = node.x0 * cosY - node.z0 * sinY;
        const z1 = node.x0 * sinY + node.z0 * cosY;

        // Rotate around X axis
        const y2 = node.y0 * cosX - z1 * sinX;
        const z2 = node.y0 * sinX + z1 * cosX;

        // Perspective projection
        const scale = fov / (fov + z2);
        node.px = cx + x1 * scale;
        node.py = cy + y2 * scale;
        node.scale = scale;
        node.z = z2;
        node.alpha = Math.max(0.18, (z2 + radius) / (2 * radius));
      }

      // Sort by Z for proper 3D depth rendering
      nodes.sort((a, b) => a.z - b.z);

      // 1. Draw glowing 3D wireframe constellation edges between closest nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].px - nodes[j].px;
          const dy = nodes[i].py - nodes[j].py;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            const avgAlpha = (nodes[i].alpha + nodes[j].alpha) / 2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].px, nodes[i].py);
            ctx.lineTo(nodes[j].px, nodes[j].py);
            ctx.strokeStyle = `rgba(0, 242, 254, ${avgAlpha * 0.18 * (1 - dist / 130)})`;
            ctx.lineWidth = Math.max(0.6, 1.2 * avgAlpha);
            ctx.stroke();
          }
        }
      }

      // 2. Render each 3D tech node
      for (let node of nodes) {
        const isSelected = selectedTech?.name === node.name;
        const size = Math.max(16, 26 * node.scale * (isSelected ? 1.4 : 1));

        // Outer glow
        const grad = ctx.createRadialGradient(node.px, node.py, 0, node.px, node.py, size * 1.5);
        grad.addColorStop(0, `${node.color}${Math.floor(node.alpha * 200).toString(16).padStart(2, '0')}`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.px, node.py, size * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Node center disc
        ctx.beginPath();
        ctx.arc(node.px, node.py, size * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#0B0F19';
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isSelected ? 3 : Math.max(1, 2 * node.scale);
        ctx.stroke();

        // Tech Label (Cull back-facing labels to prevent 3D collisions and visual overlap)
        if (node.z >= -25) {
          const fontSize = Math.max(10, Math.floor(13 * node.scale * (isSelected ? 1.2 : 1)));
          ctx.font = `bold ${fontSize}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';

          // Background label pill
          const textWidth = ctx.measureText(node.name).width;
          const pillPadX = 6 * node.scale;
          const pillPadY = 3 * node.scale;
          const pillY = node.py + size * 0.55;

          const depthAlpha = Math.min(1, Math.max(0.2, (node.z + 30) / 90));
          ctx.fillStyle = `rgba(5, 7, 11, ${depthAlpha * 0.92})`;
          ctx.strokeStyle = `${node.color}${Math.floor(depthAlpha * 180).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(
            node.px - textWidth / 2 - pillPadX,
            pillY,
            textWidth + pillPadX * 2,
            fontSize + pillPadY * 2,
            4
          );
          ctx.fill();
          ctx.stroke();

          // Text fill
          ctx.fillStyle = isSelected ? '#00FFE0' : `rgba(240, 246, 252, ${depthAlpha})`;
          ctx.fillText(node.name, node.px, pillY + pillPadY);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [autoRotate, isDragging, selectedTech]);

  // Pointer drag controls for 3D rotation
  const handlePointerDown = (e) => {
    setIsDragging(true);
    rotationRef.current.lastMouseX = e.clientX;
    rotationRef.current.lastMouseY = e.clientY;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - rotationRef.current.lastMouseX;
    const dy = e.clientY - rotationRef.current.lastMouseY;
    rotationRef.current.ry += dx * 0.006;
    rotationRef.current.rx += dy * 0.006;
    rotationRef.current.lastMouseX = e.clientX;
    rotationRef.current.lastMouseY = e.clientY;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl bg-space-900/80 border border-slate-800/80 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden select-none"
    >
      {/* Background Neon Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-energy-teal/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10 border-b border-slate-800/80 pb-5">
        <div>
          <div className="inline-flex items-center space-x-2 font-mono text-xs text-energy-teal tracking-wider uppercase mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive 3D WebGL Technology Universe</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Full-Stack Technology Cloud
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Drag to rotate sphere in 3D orbit • Click technologies below to inspect architectural mastery
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
              autoRotate
                ? 'bg-energy-teal/20 border border-energy-teal/40 text-energy-cyan shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                : 'bg-space-850 border border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
            <span>{autoRotate ? 'ORBIT: AUTO' : 'ORBIT: MANUAL'}</span>
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Canvas & Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* 3D Sphere Canvas (7 cols) */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="lg:col-span-7 h-[380px] sm:h-[460px] w-full rounded-2xl bg-space-950/70 border border-slate-800/80 cursor-grab active:cursor-grabbing relative overflow-hidden flex items-center justify-center"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Floating Helper Tip */}
          <div className="absolute bottom-3 left-4 font-mono text-[11px] text-slate-500 bg-space-900/80 px-2.5 py-1 rounded-lg border border-slate-800 pointer-events-none">
            3D PERSPECTIVE // 60 FPS GPU PIPELINE
          </div>
        </div>

        {/* Selected Technology Inspection Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 h-full">
          {/* Active Tech Card */}
          <div
            className="p-6 rounded-2xl bg-space-950/90 border transition-all"
            style={{
              borderColor: `${selectedTech.color}50`,
              boxShadow: `0 0 30px ${selectedTech.color}15`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `${selectedTech.color}20`,
                  color: selectedTech.color,
                  border: `1px solid ${selectedTech.color}40`,
                }}
              >
                {selectedTech.category}
              </span>
              <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>PRODUCTION_VERIFIED</span>
              </span>
            </div>

            <h4 className="text-3xl font-black text-white mb-2">{selectedTech.name}</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{selectedTech.desc}</p>

            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-space-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">THROUGHPUT</span>
                <span className="text-white font-bold">&gt; 10k req/sec</span>
              </div>
              <div className="bg-space-900/80 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-500 block">UPTIME SLA</span>
                <span className="text-energy-teal font-bold">99.99%</span>
              </div>
            </div>
          </div>

          {/* Quick Click Badges Grid to Switch Active Technology */}
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Select Technology Node:
            </div>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
              {TECH_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => setSelectedTech(item)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all ${
                    selectedTech.name === item.name
                      ? 'bg-gradient-to-r from-energy-teal to-cyan-400 text-space-950 font-extrabold shadow-[0_0_15px_rgba(0,242,254,0.4)] scale-105'
                      : 'bg-space-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
