import React, { useEffect, useRef } from 'react';
import { Radio, Wifi, Shield, Globe, Cpu } from 'lucide-react';

export const Contact3DNode = ({ isTransmitting = false }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = Math.max(200, canvas.parentElement?.clientWidth || 320));
    let height = (canvas.height = Math.max(200, canvas.parentElement?.clientHeight || 320));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = Math.max(200, canvas.parentElement.clientWidth || 320);
      height = canvas.height = Math.max(200, canvas.parentElement.clientHeight || 320);
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const halfW = rect.width / 2 || 1;
      const halfH = rect.height / 2 || 1;
      mouseRef.current.targetX = (e.clientX - (rect.left + halfW)) / halfW;
      mouseRef.current.targetY = (e.clientY - (rect.top + halfH)) / halfH;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    // Build 3D Globe Latitude & Longitude Circles
    const radius = Math.max(80, Math.min(width, height) * 0.36);
    const latLines = [-50, -25, 0, 25, 50]; // degrees
    const longLines = [0, 30, 60, 90, 120, 150]; // degrees

    let rotY = 0;
    let pulseWave = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      rotY += isTransmitting ? 0.04 : 0.008;
      pulseWave = (pulseWave + 0.03) % 1;

      const cx = width / 2;
      const cy = height / 2;
      const fov = 400;

      const rotX = 0.3 + mouseRef.current.y * 0.4;
      const curRotY = rotY + mouseRef.current.x * 0.6;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(curRotY);
      const sinY = Math.sin(curRotY);

      // Core Background Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.3);
      glowGrad.addColorStop(0, isTransmitting ? 'rgba(0, 255, 224, 0.35)' : 'rgba(0, 242, 254, 0.15)');
      glowGrad.addColorStop(0.6, 'rgba(121, 40, 202, 0.1)');
      glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 1. Draw Latitudes
      for (let lat of latLines) {
        const phi = (lat * Math.PI) / 180;
        const rLat = radius * Math.cos(phi);
        const yLat = radius * Math.sin(phi);

        ctx.beginPath();
        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const x0 = rLat * Math.cos(theta);
          const z0 = rLat * Math.sin(theta);

          // Rotate around Y
          const x1 = x0 * cosY - z0 * sinY;
          const z1 = x0 * sinY + z0 * cosY;

          // Rotate around X
          const y2 = yLat * cosX - z1 * sinX;
          const z2 = yLat * sinX + z1 * cosX;

          const scale = fov / (fov + z2);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = lat === 0 ? '#00FFE0' : 'rgba(0, 242, 254, 0.25)';
        ctx.lineWidth = lat === 0 ? 1.8 : 0.9;
        ctx.stroke();
      }

      // 2. Draw Longitudes
      for (let lon of longLines) {
        const phi = (lon * Math.PI) / 180;
        ctx.beginPath();
        const steps = 36;
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          const x0 = radius * Math.cos(theta) * Math.cos(phi);
          const y0 = radius * Math.sin(theta);
          const z0 = radius * Math.cos(theta) * Math.sin(phi);

          // Rotate around Y
          const x1 = x0 * cosY - z0 * sinY;
          const z1 = x0 * sinY + z0 * cosY;

          // Rotate around X
          const y2 = y0 * cosX - z1 * sinX;
          const z2 = y0 * sinX + z1 * cosX;

          const scale = fov / (fov + z2);
          const px = cx + x1 * scale;
          const py = cy + y2 * scale;

          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(139, 92, 246, 0.28)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // 3. Orbiting Satellite Beacon & Pulse Rings
      const satAngle = rotY * 1.8;
      const satRadius = radius * 1.35;
      const satX0 = satRadius * Math.cos(satAngle);
      const satY0 = satRadius * Math.sin(satAngle) * 0.45;
      const satZ0 = satRadius * Math.sin(satAngle) * 0.85;

      const satX1 = satX0 * cosY - satZ0 * sinY;
      const satZ1 = satX0 * sinY + satZ0 * cosY;
      const satY2 = satY0 * cosX - satZ1 * sinX;
      const satZ2 = satY0 * sinX + satZ1 * cosX;

      const satScale = fov / (fov + satZ2);
      const satPx = cx + satX1 * satScale;
      const satPy = cy + satY2 * satScale;

      // Draw Satellite Node
      ctx.beginPath();
      ctx.arc(satPx, satPy, 4 * satScale, 0, Math.PI * 2);
      ctx.fillStyle = '#00FFE0';
      ctx.shadowColor = '#00FFE0';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Pulse Ring from Satellite
      const pulseR = 8 + pulseWave * 32 * satScale;
      ctx.beginPath();
      ctx.arc(satPx, satPy, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 255, 224, ${(1 - pulseWave) * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Transmission Laser Line when active
      if (isTransmitting) {
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(satPx, satPy);
        ctx.strokeStyle = 'rgba(0, 255, 224, 0.9)';
        ctx.lineWidth = 2.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isTransmitting]);

  return (
    <div className="relative w-full h-[280px] sm:h-[320px] rounded-2xl bg-space-950/80 border border-slate-800/80 flex flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />

      {/* Floating HUD Telemetry Readouts */}
      <div className="absolute top-3 left-4 flex items-center space-x-2 font-mono text-[10px] text-energy-teal bg-space-900/85 px-2.5 py-1 rounded-md border border-slate-800">
        <Radio className="w-3 h-3 text-energy-cyan animate-pulse" />
        <span>3D QUANTUM CARRIER // LOCKED</span>
      </div>

      <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-400 bg-space-900/85 px-2.5 py-1 rounded-md border border-slate-800">
        LATENCY: <span className="text-emerald-400 font-bold">12ms</span>
      </div>

      <div className="absolute bottom-3 left-4 font-mono text-[10px] text-slate-500 bg-space-900/85 px-2.5 py-1 rounded-md border border-slate-800">
        FREQ: 1420.4 MHz • AES-256
      </div>

      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-cyan-400 bg-space-900/85 px-2.5 py-1 rounded-md border border-slate-800">
        ORBIT: LEO 410 KM
      </div>
    </div>
  );
};
