import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const AntiGravityHero3D = ({ className = "" }) => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x0a0f1d, 1.8);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00f2fe, 4.5, 20);
    blueLight.position.set(-4, 3, 4);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 4.8, 20);
    violetLight.position.set(4, -3, 3);
    scene.add(violetLight);

    const rimLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    rimLight.position.set(0, 6, -3);
    scene.add(rimLight);

    // 5. Central Anti-Gravity Floating Core (Root Group)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Main Metallic Core (Faceted Icosahedron Sphere with high reflectivity)
    const coreGeo = new THREE.IcosahedronGeometry(1.65, 3);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111625,
      metalness: 0.92,
      roughness: 0.18,
      wireframe: false,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // B. Inner Wireframe Luminescent Lattice
    const wireGeo = new THREE.IcosahedronGeometry(1.72, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    coreGroup.add(wireMesh);

    // C. Glowing Concentric Energy Rings
    // Ring 1: Equatorial Cyan Ring
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.022, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.8,
      roughness: 0.3,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    scene.add(ring1);

    // Ring 2: Inclined Violet Ring
    const ring2Geo = new THREE.TorusGeometry(2.75, 0.018, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.9,
      roughness: 0.25,
      metalness: 0.85,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);

    // Ring 3: Outer Precision Orbit Ring
    const ring3Geo = new THREE.TorusGeometry(3.15, 0.014, 16, 120);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x00ffe0,
      emissiveIntensity: 0.6,
      roughness: 0.4,
      metalness: 0.9,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    scene.add(ring3);

    // D. Orbiting Geometric Satellite Debris (Levitating Objects)
    const debrisGroup = new THREE.Group();
    scene.add(debrisGroup);

    const debrisList = [];
    const debrisGeos = [
      new THREE.OctahedronGeometry(0.18, 0),
      new THREE.TetrahedronGeometry(0.16, 0),
      new THREE.DodecahedronGeometry(0.17, 0),
    ];
    const debrisMat = new THREE.MeshStandardMaterial({
      color: 0xd8b4fe,
      metalness: 0.95,
      roughness: 0.15,
    });

    for (let i = 0; i < 9; i++) {
      const geo = debrisGeos[i % debrisGeos.length];
      const mesh = new THREE.Mesh(geo, debrisMat);
      const angle = (i / 9) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.9;
      const yOffset = (Math.random() - 0.5) * 1.5;
      mesh.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      debrisGroup.add(mesh);
      debrisList.push({
        mesh,
        angle,
        radius,
        speed: 0.008 + (i % 3) * 0.004,
        rotSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    // E. Anti-Gravity Energy Particle Swarm (Orbital Point Cloud)
    const particleCount = 280;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    const cyanColor = new THREE.Color(0x00f2fe);
    const violetColor = new THREE.Color(0x8b5cf6);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const mixedColor = cyanColor.clone().lerp(violetColor, Math.random());
      particleColors[i * 3] = mixedColor.r;
      particleColors[i * 3 + 1] = mixedColor.g;
      particleColors[i * 3 + 2] = mixedColor.b;

      particleVelocities.push({
        radius: r,
        theta,
        phi,
        speed: 0.004 + Math.random() * 0.006,
        wobble: Math.random() * Math.PI * 2,
      });
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Mouse Interaction & Parallax Handlers
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
      setIsHovered(false);
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Smooth Easing & Anti-Gravity Floating
    let animationFrameId;
    let clock = new THREE.Clock();
    let isVisible = true;

    // Viewport Intersection Observer for GPU optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Anti-gravity sinusoidal levitation
      const levitation = Math.sin(elapsedTime * 1.5) * 0.14;
      coreGroup.position.y = levitation;
      debrisGroup.position.y = levitation * 0.7;

      // Core rotation with mouse parallax influence
      coreGroup.rotation.y = elapsedTime * 0.35 + mouseRef.current.x * 0.6;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.25) * 0.15 - mouseRef.current.y * 0.6;
      coreGroup.rotation.z = Math.cos(elapsedTime * 0.3) * 0.1;

      // Energy rings multi-axis counter-rotations
      ring1.rotation.z = elapsedTime * 0.45;
      ring1.rotation.x = Math.PI / 2.3 + Math.sin(elapsedTime * 0.6) * 0.08;

      ring2.rotation.y = elapsedTime * -0.55;
      ring2.rotation.z = Math.cos(elapsedTime * 0.5) * 0.1;

      ring3.rotation.x = elapsedTime * 0.38;
      ring3.rotation.y = Math.sin(elapsedTime * 0.4) * 0.12;

      // Orbital debris motion
      debrisList.forEach((debris) => {
        debris.angle += debris.speed;
        debris.mesh.position.x = Math.cos(debris.angle) * debris.radius;
        debris.mesh.position.z = Math.sin(debris.angle) * debris.radius;
        debris.mesh.rotation.x += debris.rotSpeed;
        debris.mesh.rotation.y += debris.rotSpeed * 0.8;
      });

      // Orbital particle swarm dynamics
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const vel = particleVelocities[i];
        vel.theta += vel.speed;
        vel.wobble += 0.02;

        const dynamicR = vel.radius + Math.sin(vel.wobble) * 0.08;
        positions[i * 3] = dynamicR * Math.sin(vel.phi) * Math.cos(vel.theta);
        positions[i * 3 + 1] = dynamicR * Math.sin(vel.phi) * Math.sin(vel.theta) + Math.cos(vel.wobble) * 0.05;
        positions[i * 3 + 2] = dynamicR * Math.cos(vel.phi);
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Dynamic light intensity pulsation
      blueLight.intensity = 4.2 + Math.sin(elapsedTime * 2.2) * 0.8;
      violetLight.intensity = 4.5 + Math.cos(elapsedTime * 2.0) * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup & Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Three.js geometries & materials
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      debrisGeos.forEach((g) => g.dispose());
      debrisMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-square max-w-[540px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      title="Interactive 3D Anti-Gravity Core — Move mouse to influence gravity & orbit"
    >
      {/* Subtle Ambient Radial Glow Backplate */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-energy-teal/15 via-secondary-violet/15 to-transparent blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      
      {/* Holographic Target HUD Overlays */}
      <div className="absolute top-2 left-2 font-mono text-[10px] text-energy-teal/60 pointer-events-none tracking-widest uppercase flex items-center space-x-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-energy-cyan animate-ping" />
        <span>GRAV_FIELD // 0.00 G</span>
      </div>

      <div className="absolute bottom-2 right-2 font-mono text-[10px] text-secondary-violet/70 pointer-events-none tracking-widest uppercase">
        THREE.JS WEBGL // 60 FPS
      </div>
    </div>
  );
};
