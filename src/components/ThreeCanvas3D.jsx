import React, { useEffect, useRef } from 'react';

export const ThreeCanvas3D = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

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

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.targetY = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. 3D Starfield Particles with deep Z-depth
    const starCount = Math.min(130, Math.floor((width * height) / 10000));
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2200,
        y: (Math.random() - 0.5) * 2200,
        z: Math.random() * 1600 + 100,
        vz: 0.9 + Math.random() * 1.6,
        radius: 0.9 + Math.random() * 2.2,
        color: Math.random() > 0.4 ? '#00F2FE' : '#8B5CF6',
      });
    }

    // 2. Geometry 1: 3D Wireframe Icosahedron (Hero & Upper Orbit)
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoScale = 140;
    const icosahedronVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ].map(([x, y, z]) => [x * icoScale, y * icoScale, z * icoScale]);

    const icosahedronEdges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [4, 9], [9, 8], [8, 6], [6, 2], [2, 4],
      [1, 9], [5, 4], [11, 2], [10, 6], [7, 8],
      [8, 1], [9, 5], [4, 11], [2, 10], [6, 7]
    ];

    // 3. Geometry 2: 3D Wireframe Octahedron (Middle Scroll Area)
    const octScale = 160;
    const octahedronVertices = [
      [1, 0, 0], [-1, 0, 0],
      [0, 1, 0], [0, -1, 0],
      [0, 0, 1], [0, 0, -1]
    ].map(([x, y, z]) => [x * octScale, y * octScale, z * octScale]);

    const octahedronEdges = [
      [0, 2], [2, 1], [1, 3], [3, 0],
      [0, 4], [1, 4], [2, 4], [3, 4],
      [0, 5], [1, 5], [2, 5], [3, 5]
    ];

    // 4. Geometry 3: 3D Gyroscope Dual Rings (Bottom / Contact Section)
    const ringSegments = 24;
    const ring1Vertices = [];
    const ring2Vertices = [];
    const ringRadius = 180;
    for (let i = 0; i < ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ring1Vertices.push([Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0]);
      ring2Vertices.push([0, Math.cos(theta) * (ringRadius * 0.85), Math.sin(theta) * (ringRadius * 0.85)]);
    }

    let rot1 = { x: 0.2, y: 0.3 };
    let rot2 = { x: 0.4, y: 0.1 };
    let rot3 = { x: 0.6, y: 0.5 };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse & scroll lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      const cx = width / 2;
      const cy = height / 2;
      const fov = 650;
      const sY = scrollRef.current.y;

      // 1. Render 3D Starfield
      for (let star of stars) {
        star.z -= star.vz;
        if (star.z <= 10) {
          star.z = 1600;
          star.x = (Math.random() - 0.5) * 2200;
          star.y = (Math.random() - 0.5) * 2200;
        }

        const scale = fov / star.z;
        const px = cx + (star.x - mouseRef.current.x * 140) * scale;
        const py = cy + (star.y - mouseRef.current.y * 140 + (sY - 0.5) * 350) * scale;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, Math.max(0.12, (1600 - star.z) / 1000));
          ctx.beginPath();
          ctx.arc(px, py, star.radius * scale, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha * 0.55;
          ctx.fill();
        }
      }

      // Helper function to render a 3D wireframe mesh
      const renderMesh = (vertices, edges, center, rot, color, alpha) => {
        const cosX = Math.cos(rot.x);
        const sinX = Math.sin(rot.x);
        const cosY = Math.cos(rot.y);
        const sinY = Math.sin(rot.y);

        const projected = vertices.map(([vx, vy, vz]) => {
          const x1 = vx * cosY - vz * sinY;
          const z1 = vx * sinY + vz * cosY;
          const y2 = vy * cosX - z1 * sinX;
          const z2 = vy * sinX + z1 * cosX + center.z;

          const scale = fov / Math.max(10, z2);
          return {
            px: center.x + x1 * scale,
            py: center.y + y2 * scale,
            scale,
            z: z2,
          };
        });

        ctx.globalAlpha = alpha;
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = color;

        for (let [i1, i2] of edges) {
          const p1 = projected[i1];
          const p2 = projected[i2];
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(p2.px, p2.py);
          ctx.stroke();
        }

        // Vertices dots
        for (let p of projected) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#00FFE0';
          ctx.globalAlpha = alpha * 1.5;
          ctx.fill();
        }
      };

      // 2. Render 3D Polyhedron 1 (Hero - Top Right)
      rot1.x += 0.003;
      rot1.y += 0.004;
      const poly1Alpha = Math.max(0.08, 0.28 * (1 - sY * 1.5));
      if (poly1Alpha > 0.02) {
        renderMesh(
          icosahedronVertices,
          icosahedronEdges,
          {
            x: cx + width * 0.32 + mouseRef.current.x * 40,
            y: cy - height * 0.18 + mouseRef.current.y * 40 - sY * 200,
            z: 560,
          },
          { x: rot1.x + mouseRef.current.y * 0.5, y: rot1.y + mouseRef.current.x * 0.5 },
          '#00F2FE',
          poly1Alpha
        );
      }

      // 3. Render 3D Polyhedron 2 (Mid-Page - Left Orbit)
      rot2.x += 0.004;
      rot2.y -= 0.003;
      const poly2Alpha = Math.max(0.08, 0.25 * (1 - Math.abs(sY - 0.45) * 2));
      if (poly2Alpha > 0.02) {
        renderMesh(
          octahedronVertices,
          octahedronEdges,
          {
            x: cx - width * 0.35 + mouseRef.current.x * 50,
            y: cy + (sY - 0.45) * 150 + mouseRef.current.y * 30,
            z: 580,
          },
          { x: rot2.x + mouseRef.current.y * 0.4, y: rot2.y + mouseRef.current.x * 0.4 },
          '#8B5CF6',
          poly2Alpha
        );
      }

      // 4. Render 3D Gyroscope Rings (Bottom - Contact Section Behind LET'S TALK)
      rot3.x += 0.005;
      rot3.y += 0.006;
      const poly3Alpha = Math.max(0.08, 0.32 * (sY * 1.4));
      if (poly3Alpha > 0.03) {
        // Ring 1 Edges
        const ring1Edges = ring1Vertices.map((_, i) => [i, (i + 1) % ringSegments]);
        const ring2Edges = ring2Vertices.map((_, i) => [i, (i + 1) % ringSegments]);

        renderMesh(
          ring1Vertices,
          ring1Edges,
          {
            x: cx + mouseRef.current.x * 60,
            y: cy + height * 0.15 + mouseRef.current.y * 40,
            z: 520,
          },
          { x: rot3.x + mouseRef.current.y * 0.6, y: rot3.y + mouseRef.current.x * 0.6 },
          '#00F2FE',
          poly3Alpha
        );

        renderMesh(
          ring2Vertices,
          ring2Edges,
          {
            x: cx + mouseRef.current.x * 60,
            y: cy + height * 0.15 + mouseRef.current.y * 40,
            z: 520,
          },
          { x: -rot3.x * 0.8 + mouseRef.current.y * 0.4, y: -rot3.y * 0.8 + mouseRef.current.x * 0.4 },
          '#EC4899',
          poly3Alpha * 0.75
        );
      }

      ctx.globalAlpha = 1.0;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
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
