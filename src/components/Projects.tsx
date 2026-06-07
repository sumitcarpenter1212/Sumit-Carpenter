import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Rocket, X } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const categories = ['All', 'Web', 'Apps', 'Design'];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData.sort((a: any, b: any) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, (error) => {
      console.error("Error fetching projects:", error);
    });

    return () => unsubscribe();
  }, []);

  const filteredProjects = projects.filter(
    (project) => filter === 'All' || project.category === filter
  );

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="relative inline-block mb-8 group/projects" style={{ perspective: '800px' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#ff3366] via-[#ff9933] to-[#ff3366] blur-xl opacity-30 group-hover/projects:opacity-60 transition-opacity duration-500 animate-pulse" />
            <motion.h2 
              className="relative text-4xl md:text-6xl font-black tracking-tight uppercase pb-2 flex items-center justify-center gap-3 md:gap-4"
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
              <Rocket className="text-[#ff3366] w-10 h-10 md:w-12 md:h-12" style={{ transform: 'translateZ(10px)' }} />
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute top-[2px] left-[2px] text-[#ff9933] opacity-80 select-none" style={{ transform: 'translateZ(-5px)' }}>PROJECTS</span>
                <span className="absolute top-[4px] left-[4px] text-[#ff3366] opacity-60 select-none" style={{ transform: 'translateZ(-10px)' }}>PROJECTS</span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff3366] via-[#ff6666] to-[#ff9933]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(255,102,102,0.4))' }}>
                  PROJECTS
                </span>
              </span>
            </motion.h2>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 interactive ${
                  filter === cat
                    ? 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'glass text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  perspective={1000}
                  scale={1.02}
                  transitionSpeed={1000}
                  gyroscope={true}
                  className="h-full"
                >
                  <div className="glass-card overflow-hidden group h-full flex flex-col border border-white/5 hover:border-accent-blue/50 transition-colors duration-500">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0 bg-secondary/40 z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <img
                        src={project.image || undefined}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      {/* Overlay Buttons */}
                      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/60 backdrop-blur-sm">
                        {project.isPaid ? (
                          <>
                            {project.liveLink && (
                              <button 
                                onClick={() => window.open(project.liveLink, '_blank')}
                                className="px-6 py-2 rounded-full border border-white/50 text-white hover:bg-white/10 transition-all font-bold tracking-wide"
                              >
                                View Demo
                              </button>
                            )}
                            <button 
                              onClick={() => project.purchaseLink ? window.open(project.purchaseLink, '_blank') : alert('Purchase link not available')}
                              className="px-6 py-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:scale-105 transition-all"
                            >
                              Buy Now
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => window.open(project.liveLink, '_blank')}
                            className="px-6 py-2 rounded-full bg-accent-blue text-background font-bold tracking-wide hover:scale-105 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.5)]"
                          >
                            Get Now
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow relative">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-heading font-bold text-white group-hover:text-accent-blue transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-purple">
                            {project.category}
                          </span>
                          {project.isPaid ? (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#ff9933] to-[#ff3366] text-white shadow-[0_0_10px_rgba(255,153,51,0.4)]">
                              PAID ₹{project.price?.replace('₹', '')}
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#00ff87] to-[#60efff] text-gray-900 shadow-[0_0_10px_rgba(0,255,135,0.4)]">
                              FREE
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-white/60 mb-6 flex-grow">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-white/50 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
