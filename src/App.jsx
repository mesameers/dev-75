import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WatchTheFilm } from './components/WatchTheFilm';
import { ProjectEIMS } from './components/ProjectEIMS';
import { SkillsGrid } from './components/SkillsGrid';
import { ServicesSection } from './components/ServicesSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="min-h-screen bg-space-950 text-slate-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <WatchTheFilm />
        <ProjectEIMS />
        <SkillsGrid />
        <ServicesSection />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
