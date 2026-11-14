import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WatchTheFilm } from './components/WatchTheFilm';
import { ProjectEIMS } from './components/ProjectEIMS';
import { SkillsGrid } from './components/SkillsGrid';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-energy-teal/20 selection:text-energy-cyan overflow-x-hidden">
      {/* 1. Custom Glowing Cursor Trail */}
      <CustomCursor />

      {/* 2. Global Interactive Cosmic Constellation Particle Canvas */}
      <ParticleCanvas />

      {/* 3. Top Glassmorphic Navigation Bar with Audio Synthesizer */}
      <Navbar />

      {/* 4. Core Portfolio Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <WatchTheFilm />
        <ProjectEIMS />
        <SkillsGrid />
        <ServicesSection />
        <TestimonialsSection />
        <InteractiveTerminal />
        <ContactCTA />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}

export default App;
