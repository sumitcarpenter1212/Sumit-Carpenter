import { Github, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-white/10 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-accent-blue to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-8 h-8 flex items-center justify-center transform group-hover:scale-110 transition-all duration-500">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-tr from-accent-blue via-purple-500 to-accent-purple blur-sm opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple shadow-[inset_1px_1px_3px_rgba(255,255,255,0.6),_inset_-1px_-1px_3px_rgba(0,0,0,0.5)] border border-white/20 transform rotate-3 group-hover:rotate-12 transition-transform duration-500" />
            <div className="absolute inset-[2px] rounded-md bg-background/90 backdrop-blur-xl transform -rotate-3 group-hover:-rotate-12 transition-transform duration-500" />
            <span className="relative z-10 font-heading font-black text-transparent bg-clip-text bg-gradient-to-br from-accent-blue to-accent-purple text-lg drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
              P
            </span>
          </div>
          <span className="font-heading font-black text-xl tracking-[0.15em] relative">
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-white to-accent-purple drop-shadow-[0_2px_10px_rgba(124,58,237,0.5)]">
              PORTFOLIO
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-white/50 text-sm">
            &copy; {currentYear} AI Developer Portfolio. All rights reserved.
          </p>
          <Link to="/admin" className="w-1.5 h-1.5 rounded-full bg-white/5 hover:bg-accent-blue transition-colors cursor-pointer" title="Admin Access" />
        </div>

        <div className="flex items-center gap-4">
          {[
            { icon: <Github size={18} />, href: 'https://github.com/SumitCarpenter' },
            { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/sumit-carpenter-bbb919369' },
            { icon: <Instagram size={18} />, href: 'https://www.instagram.com/sumit_carpenter7' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:border-accent-blue/50 border border-transparent transition-all interactive"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
