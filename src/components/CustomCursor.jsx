import React, { useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const outline = cursorOutlineRef.current;
    if (!dot || !outline) return;

    let mouseX = -100;
    let mouseY = -100;
    let outlineX = -100;
    let outlineY = -100;
    let isHovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const onMouseDown = () => {
      outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) scale(0.75)`;
    };

    const onMouseUp = () => {
      outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) scale(1)`;
    };

    // Detect clickable element hovers
    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive')
      ) {
        isHovering = true;
        outline.classList.add('cursor-hover');
      } else {
        isHovering = false;
        outline.classList.remove('cursor-hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    // Smooth lerp for outer ring
    let animationId;
    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.18;
      outlineY += (mouseY - outlineY) * 0.18;

      const scale = isHovering ? 1.75 : 1;
      outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0) scale(${scale})`;

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Central Sharp Dot */}
      <div
        ref={cursorDotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-energy-cyan shadow-[0_0_12px_#00FFE0] pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />

      {/* Lagging Glowing Halo Ring */}
      <div
        ref={cursorOutlineRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-energy-teal/60 pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 hidden md:block shadow-[0_0_20px_rgba(0,242,254,0.3)]"
        style={{ willChange: 'transform' }}
      />

      <style>{`
        .cursor-hover {
          border-color: #8B5CF6 !important;
          background: rgba(139, 92, 246, 0.15) !important;
          box-shadow: 0 0 25px rgba(139, 92, 246, 0.45) !important;
        }
      `}</style>
    </>
  );
};
