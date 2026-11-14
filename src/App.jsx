import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WatchTheFilm } from './components/WatchTheFilm';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Interactive3DTechSphere } from './components/Interactive3DTechSphere';
import { ArchitectureTopology } from './components/ArchitectureTopology';
import { ProductionCodeInspector } from './components/ProductionCodeInspector';
import { ApiPlayground } from './components/ApiPlayground';
import { SkillsGrid } from './components/SkillsGrid';
import { ServicesSection } from './components/ServicesSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { CyberTickerBanner } from './components/CyberTickerBanner';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { ThreeCanvas3D } from './components/ThreeCanvas3D';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBar } from './components/ScrollProgressBar';

export function App() {
  return (
    <div className="relative min-h-screen bg-space-950 text-slate-100 flex flex-col selection:bg-energy-teal/20 selection:text-energy-cyan overflow-x-hidden">
      {/* 1. Top Reading Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* 2. Custom Glowing Cursor Trail */}
      <CustomCursor />

      {/* 3. Global Full 3D Starfield & Wireframe Polyhedron Canvas */}
      <ThreeCanvas3D />

      {/* 4. Top Glassmorphic Navigation Bar with Audio Synthesizer */}
      <Navbar />

      {/* 5. Core Portfolio Sections */}
      <main className="flex-1 relative z-10">
        <Hero />
        <WatchTheFilm />
        
        {/* Interactive 3D Technology Universe */}
        <section id="tech-sphere" className="py-20 px-6 max-w-7xl mx-auto scroll-mt-24">
          <Interactive3DTechSphere />
        </section>

        <FeaturedProjects />
        <ArchitectureTopology />
        <ProductionCodeInspector />
        <ApiPlayground />
        <SkillsGrid />
        <ServicesSection />
        <ScopeEstimator />
        <TestimonialsSection />
        <InteractiveTerminal />

        {/* Dynamic 3D Infinite Stream Ticker (Bridges Terminal & Let's Talk) */}
        <CyberTickerBanner />

        <ContactCTA />
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}

export default App;
