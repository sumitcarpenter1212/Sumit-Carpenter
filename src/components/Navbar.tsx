import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Award, Calendar, BookOpen } from 'lucide-react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [cvUrl, setCvUrl] = useState('/SUMIT CARPENTER C.V.pdf');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    // Fetch CV URL from Firestore
    const unsubscribe = onSnapshot(doc(db, 'settings', 'cv'), (doc) => {
      if (doc.exists() && doc.data().url) {
        setCvUrl(doc.data().url);
      }
    });

    const unsubscribeCerts = onSnapshot(collection(db, 'certificates'), (snapshot) => {
      const certData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCertificates(certData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navLinks.map(link => link.name.toLowerCase());
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
      unsubscribeCerts();
    };
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    
    // Fallback to native scroll into view if offset calculation is acting weird
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[100rem] w-full mx-auto px-4 md:px-8 grid grid-cols-2 lg:grid-cols-3 items-center">
        {/* Logo Left */}
        <div 
          className="flex items-center gap-3 cursor-pointer group justify-self-start" 
          onClick={() => scrollToSection('#home')}
        >
          {/* 3D Logo Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-accent-blue via-purple-500 to-accent-purple blur-md opacity-80 group-hover:opacity-100 animate-pulse" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple shadow-[inset_2px_2px_5px_rgba(255,255,255,0.6),_inset_-2px_-2px_5px_rgba(0,0,0,0.5),_0_5px_10px_rgba(0,0,0,0.5)] border border-white/20 transform rotate-3 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-[2px] rounded-lg bg-background/90 backdrop-blur-xl transform -rotate-3 group-hover:-rotate-12 transition-transform duration-500 shadow-[inset_0_0_10px_rgba(0,240,255,0.2)]" />
            <span className="relative z-10 font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-blue to-accent-purple text-2xl drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
              P
            </span>
          </div>
          
          {/* 3D Text */}
          <div className="relative flex flex-col justify-center">
            <span className="font-heading font-black text-xl md:text-2xl lg:text-3xl tracking-[0.15em] relative">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-b from-white/30 to-transparent translate-y-[2px] blur-[1px]">PORTFOLIO</span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-white to-accent-purple drop-shadow-[0_4px_15px_rgba(124,58,237,0.6)]">
                PORTFOLIO
              </span>
            </span>
          </div>
        </div>

        {/* Desktop Nav - Centered */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="flex items-center gap-4 bg-secondary/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'text-sm font-semibold transition-colors relative interactive block py-1',
                  activeSection === link.name.toLowerCase() ? 'text-white' : 'text-white/60 hover:text-white'
                )}
              >
                {link.name}
                {activeSection === link.name.toLowerCase() && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-accent-blue rounded-full"
                    style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)' }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons - Right */}
        <div className="hidden lg:flex items-center justify-self-end gap-3 perspective-1000">
          <motion.button
            onClick={() => setIsCertModalOpen(true)}
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-black tracking-wider uppercase overflow-hidden shadow-[0_0_20px_rgba(255,51,102,0.4)] hover:shadow-[0_0_30px_rgba(255,51,102,0.6)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366] via-purple-500 to-accent-blue opacity-90 group-hover:opacity-100 transition-opacity" style={{ transform: 'translateZ(-10px)' }} />
            <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm group-hover:bg-[#0a0a0a]/40 transition-colors duration-300 pointer-events-none" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 group-hover:text-white relative z-10 transition-colors drop-shadow-md text-xs sm:text-sm" style={{ transform: 'translateZ(20px)' }}>
              CERTIFICATES
            </span>
            <Award size={16} className="text-white group-hover:animate-bounce relative z-10 filter drop-shadow-md" style={{ transform: 'translateZ(20px)' }} />
          </motion.button>

          <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: -10 }}
            whileTap={{ scale: 0.95 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-black tracking-wider uppercase overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-[#ff3366] opacity-90 group-hover:opacity-100 transition-opacity" style={{ transform: 'translateZ(-10px)' }} />
            <div className="absolute inset-[2px] rounded-full bg-[#0a0a0a]/80 backdrop-blur-sm group-hover:bg-[#0a0a0a]/40 transition-colors duration-300 pointer-events-none" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 group-hover:text-white relative z-10 transition-colors drop-shadow-md text-xs sm:text-sm" style={{ transform: 'translateZ(20px)' }}>
              Download CV
            </span>
            <Download size={16} className="text-white group-hover:animate-bounce relative z-10 filter drop-shadow-md" style={{ transform: 'translateZ(20px)' }} />
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden justify-self-end text-white p-2 interactive z-50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-white/10 mt-3 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={cn(
                    'text-left text-lg font-medium transition-colors py-2 border-b border-white/5',
                    activeSection === link.name.toLowerCase() ? 'text-accent-blue' : 'text-white/70'
                  )}
                >
                  {link.name}
                </button>
              ))}
              
              <div className="flex flex-col gap-3 mt-2">
                <motion.button
                  onClick={() => {
                    setIsCertModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_15px_rgba(255,51,102,0.3)] group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff3366] via-purple-500 to-accent-blue opacity-80" />
                  <div className="absolute inset-[2px] rounded-[10px] bg-[#0a0a0a]/90 backdrop-blur-sm group-hover:bg-[#0a0a0a]/50 transition-colors" />
                  <Award size={20} className="text-white relative z-10" />
                  <span className="text-white relative z-10">CERTIFICATES</span>
                </motion.button>

                <motion.a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center gap-3 py-4 rounded-xl font-bold tracking-widest uppercase overflow-hidden shadow-[0_0_15px_rgba(0,240,255,0.3)] group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-accent-purple to-[#ff3366] opacity-80" />
                  <div className="absolute inset-[2px] rounded-[10px] bg-[#0a0a0a]/90 backdrop-blur-sm group-hover:bg-[#0a0a0a]/50 transition-colors" />
                  <Download size={20} className="text-white relative z-10" />
                  <span className="text-white relative z-10">Download CV</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificates Modal */}
      <AnimatePresence>
        {isCertModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0a0a0a]/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-4xl max-h-[85vh] bg-[#111] border border-white/10 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_50px_rgba(255,51,102,0.15)] relative"
            >
              {/* Decorative glows */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] bg-gradient-to-b from-[#ff3366]/20 to-transparent blur-[80px] pointer-events-none" />

              <div className="p-6 sm:p-8 flex items-center justify-between border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff3366] to-accent-purple flex items-center justify-center shadow-[0_0_15px_rgba(255,51,102,0.4)]">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-wider uppercase">My Certificates</h2>
                </div>
                <button
                  onClick={() => setIsCertModalOpen(false)}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 relative z-10 custom-scrollbar">
                {certificates.length > 0 ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    {certificates.map((cert) => (
                      <div key={cert.id} className="group relative bg-white/[0.02] border border-white/5 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#ff3366]/5 to-accent-blue/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        
                        <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors drop-shadow-sm">{cert.title}</h3>
                        
                        <div className="flex flex-col gap-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-[#ff3366] font-mono">
                            <BookOpen size={14} />
                            <span>{cert.issuer}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-accent-blue font-mono">
                            <Calendar size={14} />
                            <span>{cert.date}</span>
                          </div>
                        </div>

                        <p className="text-sm text-white/60 leading-relaxed mb-6">
                          {cert.description}
                        </p>

                        <a
                          href={cert.url}
                          download={cert.filename || `Certificate_${cert.title.replace(/\s+/g, '_')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all border border-white/10 hover:border-white/30 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                          <Download size={16} />
                          VIEW CERTIFICATE
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-white/30 space-y-4 py-12">
                    <Award size={48} className="opacity-20" />
                    <p className="text-lg">No certificates to show yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
