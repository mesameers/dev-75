import React, { useEffect, useState } from 'react';

export const ScrollProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-energy-teal via-cyan-400 to-secondary-violet transition-all duration-150 ease-out shadow-[0_0_12px_#00FFE0]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
