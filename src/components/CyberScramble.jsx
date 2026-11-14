import React, { useState, useEffect } from 'react';

const ROLES = [
  'Senior Full-Stack Developer',
  'Creative Motion & WebGL Engineer',
  'Multi-Tenant Systems Architect',
  'PostgreSQL & Cloud Security Engineer'
];

const GLYPHS = 'ABCDEF0123456789_#@$!%&<>=/-*+';

export const CyberScramble = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState(ROLES[0]);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const targetText = ROLES[roleIndex];
    let frame = 0;
    const totalFrames = 24;
    setIsScrambling(true);

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * targetText.length);

      let result = '';
      for (let i = 0; i < targetText.length; i++) {
        if (i < revealedLength) {
          result += targetText[i];
        } else if (targetText[i] === ' ') {
          result += ' ';
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, 45);

    // Schedule next role switch
    const timeout = setTimeout(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [roleIndex]);

  return (
    <div className="h-8 sm:h-10 flex items-center mb-6 font-mono text-base sm:text-xl font-bold tracking-tight">
      <span className="text-energy-teal mr-2.5 select-none">&gt;_</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-energy-cyan via-white to-violet-300">
        {displayText}
      </span>
      <span
        className={`inline-block w-2 sm:w-2.5 h-4 sm:h-5 ml-1.5 bg-energy-cyan transition-opacity ${
          isScrambling ? 'opacity-100' : 'animate-pulse'
        }`}
      />
    </div>
  );
};
