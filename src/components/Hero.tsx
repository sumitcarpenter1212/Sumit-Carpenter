import { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ArrowRight, User } from 'lucide-react';

export default function Hero() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-6 z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
            Hello, I'm <br />
            <div className="relative inline-block mt-2 md:mt-4 group" style={{ perspective: '1000px' }}>
              {/* Animated Background Glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#ff007f] blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 animate-pulse" />
              
              {/* 4D VIP Text Container */}
              <motion.div 
                className="relative whitespace-nowrap text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                animate={{ 
                  rotateX: [0, 5, 0, -5, 0], 
                  rotateY: [0, -5, 0, 5, 0] 
                }}
                whileHover={{ rotateX: 15, rotateY: -15, scale: 1.05 }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* 3D Extrusion Layers */}
                <span className="absolute top-[2px] left-[2px] text-[#7c3aed] opacity-80 select-none" style={{ transform: 'translateZ(-10px)' }}>SUMIT CARPENTER</span>
                <span className="absolute top-[4px] left-[4px] text-[#ff007f] opacity-60 select-none" style={{ transform: 'translateZ(-20px)' }}>SUMIT CARPENTER</span>
                <span className="absolute top-[6px] left-[6px] text-black opacity-50 blur-[3px] select-none" style={{ transform: 'translateZ(-30px)' }}>SUMIT CARPENTER</span>
                
                {/* Main Vibrant Text */}
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#e879f9] to-[#ff007f]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', filter: 'drop-shadow(0 0 15px rgba(232,121,249,0.5))' }}>
                  SUMIT CARPENTER
                </span>
                
                {/* Glass/Shine Overlay */}
                <span className="absolute inset-0 z-20 text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-white/0 to-transparent pointer-events-none select-none">
                  SUMIT CARPENTER
                </span>
              </motion.div>
            </div>
          </h1>
          
          <div className="relative inline-block mt-2 group/role" style={{ perspective: '800px' }}>
            {/* Subtle Animated Background Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 blur-lg opacity-20 group-hover/role:opacity-50 transition-opacity duration-500" />
            
            {/* 4D Text Container */}
            <motion.h2 
              className="relative text-xl sm:text-2xl md:text-3xl font-bold tracking-wide uppercase"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
              animate={{ 
                rotateX: [0, -5, 0, 5, 0], 
                rotateY: [0, 5, 0, -5, 0] 
              }}
              whileHover={{ rotateX: 10, rotateY: -10, scale: 1.02 }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "linear",
                delay: 0.5 
              }}
            >
              {/* 3D Extrusion Layers */}
              <span className="absolute top-[1px] left-[1px] text-blue-700 opacity-70 select-none" style={{ transform: 'translateZ(-5px)' }}>AI Website & App Developer</span>
              <span className="absolute top-[2px] left-[2px] text-black opacity-50 blur-[2px] select-none" style={{ transform: 'translateZ(-10px)' }}>AI Website & App Developer</span>
              
              {/* Main Vibrant Text */}
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400" style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.1)', filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }}>
                AI Website & App Developer
              </span>
            </motion.h2>
          </div>
          
          <p className="text-lg text-white/80 max-w-lg leading-relaxed font-light tracking-wide">
            I Design Websites, Mobile Application, and Digital Products that Convert your Ideas into Smooth, Modern, and Fully Working Platforms
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a href="#projects" className="group relative px-8 py-4 bg-white/10 backdrop-blur-md border border-accent-blue/50 rounded-full font-medium text-white overflow-hidden transition-all hover:scale-105 interactive neon-border-blue inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                View Projects
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a href="#contact" className="px-8 py-4 rounded-full font-medium text-white transition-all hover:bg-white/5 border border-transparent hover:border-white/10 interactive inline-block">
              Hire Me
            </a>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateX: [0, 3, 0, -3, 0], 
            rotateY: [0, -3, 0, 3, 0]
          }}
          transition={{ 
            opacity: { duration: 1, delay: 0.4 },
            scale: { duration: 1, delay: 0.4 },
            rotateX: { duration: 8, repeat: Infinity, ease: "linear" },
            rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          className="relative flex justify-center items-center z-10"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            perspective={1000}
            scale={1.05}
            transitionSpeed={2000}
            gyroscope={true}
            className="relative w-72 h-72 md:w-96 md:h-96"
          >
            {/* Outer glowing rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-10%] rounded-full border border-accent-blue/30 border-dashed"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-5%] rounded-full border border-accent-purple/30 border-dotted"
            />
            
            {/* Main Image Container */}
            <div className="absolute inset-0 rounded-full p-2 bg-gradient-to-tr from-accent-blue via-transparent to-accent-purple neon-border-blue">
              <div className="w-full h-full rounded-full bg-secondary relative flex items-center justify-center overflow-hidden">
                {/* Inner overlay glow */}
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] pointer-events-none z-20" />
                
                {!imgError ? (
                  <img 
                    src="/profile.png" 
                    alt="Profile" 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-[center_5%] scale-[1.15] z-10"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/20 z-10">
                    <User size={80} />
                    <span className="text-sm mt-4 font-mono text-center px-4">Upload profile.png<br/>to public folder</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Floating badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -right-4 glass px-4 py-2 rounded-xl flex items-center gap-2 border-accent-blue/30"
            >
              <div className="w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_#00f0ff]" />
              <span className="text-xs font-bold font-mono">AI EXPERT</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-4 glass px-4 py-2 rounded-xl flex items-center gap-2 border-accent-purple/30"
            >
              <div className="w-2 h-2 rounded-full bg-accent-purple shadow-[0_0_8px_#7c3aed]" />
              <span className="text-xs font-bold font-mono">FULL STACK</span>
            </motion.div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
