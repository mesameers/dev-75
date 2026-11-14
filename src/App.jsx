import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WatchTheFilm } from './components/WatchTheFilm';
import { ProjectEIMS } from './components/ProjectEIMS';
import { SkillsGrid } from './components/SkillsGrid';
import { ServicesSection } from './components/ServicesSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ParticleCanvas } from './components/ParticleCanvas';

export function App() {
  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-energy-teal/20 selection:text-energy-cyan">
      {/* 1. Global Interactive Cosmic Particle & Constellation Background Canvas */}
      <ParticleCanvas />

      {/* 2. Top Glassmorphic Navigation Bar */}
      <Navbar />

      {/* 3. Main Content Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <WatchTheFilm />
        <ProjectEIMS />
        <SkillsGrid />
        <ServicesSection />
        <ContactCTA />
      </main>

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}

export default App;
