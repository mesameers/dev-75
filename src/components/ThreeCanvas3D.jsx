import React, { useEffect, useRef } from 'react';

export const ThreeCanvas3D = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, screenX: -1000, screenY: -1000 });
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
      mouseRef.current.screenX = e.clientX;
      mouseRef.current.screenY = e.clientY;
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current.targetY = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 1. Continuous 3D Constellation Nodes (Spanning the entire universe)
    const nodeCount = Math.min(110, Math.floor((width * height) / 9500));
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * (width * 1.5),
        y: (Math.random() - 0.5) * (height * 1.5),
        z: Math.random() * 800 + 100,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        vz: (Math.random() - 0.5) * 0.3,
        radius: 1.5 + Math.random() * 2.2,
        color: Math.random() > 0.35 ? '#00F2FE' : '#8B5CF6',
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    // 2. 3D Wireframe Geometries
    // Geometry A: Icosahedron
    const phi = (1 + Math.sqrt(5)) / 2;
    const icoScale = 135;
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

    // Geometry B: Octahedron
    const octScale = 140;
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

    // Geometry C: Gyroscope Concentric Rings
    const ringSegments = 24;
    const ring1Vertices = [];
    const ring2Vertices = [];
    const ringRadius = 155;
    for (let i = 0; i < ringSegments; i++) {
      const theta = (i / ringSegments) * Math.PI * 2;
      ring1Vertices.push([Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0]);
      ring2Vertices.push([0, Math.cos(theta) * (ringRadius * 0.82), Math.sin(theta) * (ringRadius * 0.82)]);
    }
    const ring1Edges = ring1Vertices.map((_, i) => [i, (i + 1) % ringSegments]);
    const ring2Edges = ring2Vertices.map((_, i) => [i, (i + 1) % ringSegments]);

    // Rotation accumulators
    let rotA = { x: 0.2, y: 0.3 };
    let rotB = { x: 0.5, y: 0.1 };
    let rotC = { x: 0.3, y: 0.6 };
    let rotD = { x: 0.4, y: 0.4 };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse & scroll interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      const cx = width / 2;
      const cy = height / 2;
      const fov = 580;
      const sY = scrollRef.current.y;

      // 1. UPDATE & PROJECT 3D NODES
      const projectedNodes = [];
      const boundX = width * 0.8;
      const boundY = height * 0.8;

      for (let node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;
        node.pulse += node.pulseSpeed;

        // Wrap around boundaries in 3D
        if (node.x < -boundX) node.x = boundX;
        if (node.x > boundX) node.x = -boundX;
        if (node.y < -boundY) node.y = boundY;
        if (node.y > boundY) node.y = -boundY;
        if (node.z < 80) node.z = 900;
        if (node.z > 900) node.z = 80;

        // Perspective projection with mouse parallax & scroll drift
        const scale = fov / (fov + node.z);
        const px = cx + (node.x - mouseRef.current.x * 100) * scale;
        const py = cy + (node.y - mouseRef.current.y * 100 + (sY - 0.5) * 200) * scale;

        projectedNodes.push({
          px,
          py,
          scale,
          z: node.z,
          radius: node.radius * scale,
          color: node.color,
          alpha: Math.min(1, Math.max(0.18, (900 - node.z) / 700)) * (0.8 + 0.2 * Math.sin(node.pulse)),
        });
      }

      // 2. DRAW 3D CONSTELLATION LATTICE LINES
      // Connect nodes that are within 3D proximity
      const maxConnectDist = 150;
      for (let i = 0; i < projectedNodes.length; i++) {
        const p1 = projectedNodes[i];
        if (p1.px < -50 || p1.px > width + 50 || p1.py < -50 || p1.py > height + 50) continue;

        for (let j = i + 1; j < projectedNodes.length; j++) {
          const p2 = projectedNodes[j];
          if (p2.px < -50 || p2.px > width + 50 || p2.py < -50 || p2.py > height + 50) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * Math.min(p1.alpha, p2.alpha) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = p1.color === '#00F2FE' ? `rgba(0, 242, 254, ${lineAlpha})` : `rgba(139, 92, 246, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.7, 1.4 * p1.scale);
            ctx.stroke();
          }
        }

        // Connect nearby nodes to user's interactive mouse cursor!
        if (mouseRef.current.screenX > 0 && mouseRef.current.screenY > 0) {
          const mDist = Math.hypot(p1.px - mouseRef.current.screenX, p1.py - mouseRef.current.screenY);
          if (mDist < 180) {
            const mouseLineAlpha = (1 - mDist / 180) * 0.55;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(mouseRef.current.screenX, mouseRef.current.screenY);
            ctx.strokeStyle = `rgba(0, 255, 224, ${mouseLineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // 3. DRAW GLOWING CONSTELLATION NODES
      for (let p of projectedNodes) {
        if (p.px < -20 || p.px > width + 20 || p.py < -20 || p.py > height + 20) continue;

        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10 * p.scale;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1.0;

      // 4. HELPER TO RENDER A 3D ROTATING WIREFRAME POLYHEDRON
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

        // Draw glowing vertex points
        for (let p of projected) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 2.5 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#00FFE0';
          ctx.globalAlpha = Math.min(1, alpha * 1.6);
          ctx.fill();
        }
      };

      // 5. RENDER CONTINUOUS 3D GEOMETRIC OBJECTS AT MULTIPLE QUADRANTS (Covering EVERY section)
      // Polyhedron 1: Hero Quadrant (Upper Right)
      rotA.x += 0.003;
      rotA.y += 0.004;
      renderMesh(
        icosahedronVertices,
        icosahedronEdges,
        {
          x: cx + width * 0.35 + mouseRef.current.x * 40,
          y: cy - height * 0.2 + mouseRef.current.y * 40,
          z: 520,
        },
        { x: rotA.x + mouseRef.current.y * 0.4, y: rotA.y + mouseRef.current.x * 0.4 },
        '#00F2FE',
        0.32
      );

      // Polyhedron 2: Film & Tech Quadrant (Upper Left)
      rotB.x += 0.004;
      rotB.y -= 0.003;
      renderMesh(
        octahedronVertices,
        octahedronEdges,
        {
          x: cx - width * 0.36 + mouseRef.current.x * 50,
          y: cy - height * 0.05 + mouseRef.current.y * 30,
          z: 560,
        },
        { x: rotB.x + mouseRef.current.y * 0.3, y: rotB.y + mouseRef.current.x * 0.3 },
        '#8B5CF6',
        0.28
      );

      // Polyhedron 3: Systems & Skills Quadrant (Mid Right)
      rotC.x += 0.003;
      rotC.y += 0.005;
      renderMesh(
        icosahedronVertices,
        icosahedronEdges,
        {
          x: cx + width * 0.38 + mouseRef.current.x * 45,
          y: cy + height * 0.15 + mouseRef.current.y * 35,
          z: 540,
        },
        { x: rotC.x + mouseRef.current.y * 0.35, y: rotC.y + mouseRef.current.x * 0.35 },
        '#00FFE0',
        0.30
      );

      // Polyhedron 4: Terminal & Contact Gyroscope Rings (Bottom Left & Center)
      rotD.x += 0.005;
      rotD.y += 0.006;
      renderMesh(
        ring1Vertices,
        ring1Edges,
        {
          x: cx - width * 0.25 + mouseRef.current.x * 50,
          y: cy + height * 0.28 + mouseRef.current.y * 40,
          z: 500,
        },
        { x: rotD.x + mouseRef.current.y * 0.5, y: rotD.y + mouseRef.current.x * 0.5 },
        '#00F2FE',
        0.34
      );

      renderMesh(
        ring2Vertices,
        ring2Edges,
        {
          x: cx - width * 0.25 + mouseRef.current.x * 50,
          y: cy + height * 0.28 + mouseRef.current.y * 40,
          z: 500,
        },
        { x: -rotD.x * 0.8 + mouseRef.current.y * 0.4, y: -rotD.y * 0.8 + mouseRef.current.x * 0.4 },
        '#EC4899',
        0.26
      );

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
