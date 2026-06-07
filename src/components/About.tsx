import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { User, Code, Cpu, Globe } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export default function About() {
  const [imgError, setImgError] = useState(false);
  const [statsData, setStatsData] = useState({ projects: 50, clients: 20, experience: 2 });
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'stats'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setStatsData({
          projects: parseInt(data.projects) || 50,
          clients: parseInt(data.clients) || 20,
          experience: parseInt(data.experience) || 2
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const stats = [
    { icon: <Code size={24} />, value: statsData.projects, suffix: '+', label: 'Projects Completed', color: 'text-accent-blue' },
    { icon: <User size={24} />, value: statsData.clients, suffix: '+', label: 'Happy Clients', color: 'text-accent-purple' },
    { icon: <Cpu size={24} />, value: statsData.experience, suffix: '+', label: 'Years Experience', color: 'text-accent-blue' },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { 
              opacity: 1, 
              x: 0,
              rotateX: [0, 3, 0, -3, 0], 
              rotateY: [0, -3, 0, 3, 0]
            } : { opacity: 0, x: -50 }}
            transition={{ 
              opacity: { duration: 0.8, delay: 0.2 },
              x: { duration: 0.8, delay: 0.2 },
              rotateX: { duration: 8, repeat: Infinity, ease: "linear" },
              rotateY: { duration: 8, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              gyroscope={true}
              className="glass-card p-4 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-secondary flex items-center justify-center">
                {!imgError ? (
                  <img 
                    src="/profile.png" 
                    alt="About Profile" 
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover object-top scale-105 transition-all duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/20">
                    <User size={64} />
                    <span className="text-sm mt-2 font-mono text-center">Upload profile.png<br/>to public folder</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent-blue/20 rounded-full blur-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl -z-10" />
            </Tilt>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="relative inline-block mb-8 group/profile" style={{ perspective: '800px' }}>
                <div className="absolute -inset-2 bg-gradient-to-r from-[#ff007f] via-[#7c3aed] to-[#00f0ff] blur-xl opacity-30 group-hover/profile:opacity-60 transition-opacity duration-500 animate-pulse" />
                <motion.h3 
                  className="relative text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase flex items-center gap-3 pb-2"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                  animate={{ 
                    rotateX: [0, 5, 0, -5, 0], 
                    rotateY: [0, -5, 0, 5, 0] 
                  }}
                  whileHover={{ rotateX: 10, rotateY: -10, scale: 1.05 }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <Globe className="text-accent-blue w-8 h-8 md:w-10 md:h-10" style={{ transform: 'translateZ(10px)' }} />
                  <span className="relative inline-block whitespace-nowrap">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#e879f9] to-[#ff007f]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(232,121,249,0.4))' }}>
                      MY PROFILE
                    </span>
                  </span>
                </motion.h3>
              </div>
              
              <p className="text-lg text-white/80 leading-relaxed font-light tracking-wide">
                Hello, My Name Is Sumit Carpenter. I am a Professional Website and App Developer who creates Modern, Clean, and Fully Functional Digital Products. I Focus on Building Smooth, User-Friendly, and Well-Designed Platforms that are Simple to Use and Visually Attractive. I Turn Ideas into Real Working Websites and Applications with a Strong Attention to Detail, Performance, and Design Quality
              </p>
              <p className="text-lg text-white/80 leading-relaxed font-light tracking-wide mt-4">
                I Focus on Creating Clean, Smooth, and Well-Structured Websites and Applications that are Easy to use and Professionally Designed. Every Project I Build is Made with Proper Attention to Performance, Design, and User Experience to Ensure a Reliable and High-Quality Final Product
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
              {stats.map((stat, index) => (
                <div key={index} className="glass p-6 rounded-xl border border-white/5 hover:border-white/20 transition-colors text-center group">
                  <div className={`flex justify-center mb-3 ${stat.color} group-hover:scale-110 transition-transform`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold font-heading mb-1">
                    {inView ? (
                      <CountUp end={stat.value} duration={2.5} />
                    ) : (
                      '0'
                    )}
                    <span className={stat.color}>{stat.suffix}</span>
                  </div>
                  <div className="text-xs text-white/50 uppercase tracking-wider font-mono">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
