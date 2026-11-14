import React, { useEffect, useRef } from 'react';

export const ThreeCanvas3D = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 3D Starfield particles
    const starCount = Math.min(90, Math.floor((width * height) / 14000));
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1500 + 100,
        vz: 0.8 + Math.random() * 1.5,
        radius: 0.8 + Math.random() * 2,
        color: Math.random() > 0.35 ? '#00F2FE' : '#8B5CF6',
      });
    }

    // 3D Wireframe Icosahedron Geometry vertices
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoScale = 160;
    const rawVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => [x * icoScale, y * icoScale, z * icoScale]);

    // Icosahedron 30 Edges
    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
      [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
      [8, 1], [9, 5], [4, 11], [2, 10], [6, 7]
    ];

    let rotX = 0.4;
    let rotY = 0.6;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const cx = width / 2;
      const cy = height / 2;
      const fov = 600;

      // 1. Render 3D Starfield particles flying towards camera
      for (let star of stars) {
        star.z -= star.vz;
        if (star.z <= 10) {
          star.z = 1500;
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
        }

        const scale = fov / star.z;
        const px = cx + (star.x - mouseRef.current.x * 120) * scale;
        const py = cy + (star.y - mouseRef.current.y * 120) * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, Math.max(0.1, (1500 - star.z) / 1000));
          ctx.beginPath();
          ctx.arc(px, py, star.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha * 0.55;
          ctx.fill();
        }
      }

      // 2. Render 3D Background Floating Wireframe Polyhedron
      rotX += 0.003;
      rotY += 0.004;

      const curRotX = rotX + mouseRef.current.y * 0.6;
      const curRotY = rotY + mouseRef.current.x * 0.6;

      const cosX = Math.cos(curRotX);
      const sinX = Math.sin(curRotX);
      const cosY = Math.cos(curRotY);
      const sinY = Math.sin(curRotY);

      // Polyhedron center offset in background space
      const polyCenterX = cx + width * 0.28;
      const polyCenterY = cy - height * 0.15;
      const polyZ = 550;

      const projectedIco = rawVertices.map(([vx, vy, vz]) => {
        // Rotate around Y
        const x1 = vx * cosY - vz * sinY;
        const z1 = vx * sinY + vz * cosY;
        // Rotate around X
        const y2 = vy * cosX - z1 * sinX;
        const z2 = vy * sinX + z1 * cosX + polyZ;

        const scale = fov / z2;
        return {
          px: polyCenterX + x1 * scale,
          py: polyCenterY + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Draw wireframe edges
      ctx.globalAlpha = 0.22;
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = '#00F2FE';

      for (let [i1, i2] of edges) {
        const p1 = projectedIco[i1];
        const p2 = projectedIco[i2];
        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      // Draw small glowing vertices
      for (let p of projectedIco) {
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#00FFE0';
        ctx.globalAlpha = 0.45;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
