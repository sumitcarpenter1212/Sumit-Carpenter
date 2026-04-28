import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function MainSite() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-accent-blue/30 selection:text-accent-blue">
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {loading && <PageLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ParticleBackground />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Services />
            <Pricing />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
