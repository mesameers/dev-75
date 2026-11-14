import React from 'react';
import { Quote, Star, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export const TestimonialsSection = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-space-950 relative border-t border-slate-900 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Header Indicator */}
        <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 rounded-full mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>PRODUCTION IMPACT & VALIDATION</span>
        </div>

        {/* Big Quote Card */}
        <div
          className={`relative p-8 sm:p-14 rounded-3xl bg-space-900/80 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] backdrop-blur-xl transition-all duration-700 ${
            isInView ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-8'
          }`}
        >
          <Quote className="w-12 h-12 text-energy-teal/30 mx-auto mb-6 animate-pulse" />

          <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight mb-8">
            “Sameer architected our Multi-Campus Management System with exceptional reliability. It seamlessly handles over 2,300 live sessions across campuses with zero data leakage and flawless RBAC isolation.”
          </p>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
            <h4 className="text-lg font-bold text-slate-100">Executive Campus Administration</h4>
            <p className="text-xs font-mono text-energy-teal">Multi-Campus Educational Network</p>
          </div>
        </div>
      </div>
    </section>
  );
};
