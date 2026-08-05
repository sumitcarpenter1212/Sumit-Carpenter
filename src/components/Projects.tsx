import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Rocket, X } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const categories = ['All', 'Web', 'Apps', 'Design'];

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [subFilter, setSubFilter] = useState('All');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Reset subfilter when main filter changes
  useEffect(() => {
    setSubFilter('All');
  }, [filter]);
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

  // Get unique subcategories for the current main filter
  const availableSubCategories = filter === 'All' 
    ? [] 
    : ['All', ...new Set(projects.filter(p => p.category === filter && p.subCategory).map(p => p.subCategory))];

  const filteredProjects = projects.filter((project) => {
    const matchesMain = filter === 'All' || project.category === filter;
    const matchesSub = subFilter === 'All' || project.subCategory === subFilter;
    return matchesMain && matchesSub;
  });

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
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="text-[#ff3366] w-10 h-10 md:w-12 md:h-12" />
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute top-[2px] left-[2px] text-[#ff9933] opacity-80 select-none" >PROJECTS</span>
                <span className="absolute top-[4px] left-[4px] text-[#ff3366] opacity-60 select-none" >PROJECTS</span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#ff3366] via-[#ff6666] to-[#ff9933]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(255,102,102,0.4))' }}>
                  PROJECTS
                </span>
              </span>
            </motion.h2>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
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

          {/* Sub-Category Filter Buttons */}
          {availableSubCategories.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              {availableSubCategories.map((subCat: any) => (
                <button
                  key={subCat}
                  onClick={() => setSubFilter(subCat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 interactive ${
                    subFilter === subCat
                      ? 'bg-white/20 text-white border border-white/30'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {subCat}
                </button>
              ))}
            </motion.div>
          )}
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
                <div className="h-full hover:scale-[1.02] transition-transform duration-500">
                  <div className="glass-card overflow-hidden group h-full flex flex-col border border-white/5 hover:border-accent-blue/50 transition-colors duration-500">
                    {/* Image Container */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={project.image || undefined}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow relative bg-background/50">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-heading font-bold text-white group-hover:text-accent-blue transition-colors">
                          {project.title}
                        </h3>
                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-purple">
                            {project.category} {project.subCategory && `• ${project.subCategory}`}
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
                      
                      <p className="text-white/70 mb-6 flex-grow leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-white/5 text-white/60 border border-white/5">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                        {project.isPaid ? (
                          <>
                            {project.liveLink && (
                              <button 
                                onClick={() => window.open(project.liveLink, '_blank')}
                                className="flex-1 py-2.5 rounded-lg border border-white/20 text-white hover:bg-white/10 transition-all font-bold text-sm tracking-wide flex items-center justify-center gap-2"
                              >
                                <ExternalLink className="w-4 h-4" /> View Demo
                              </button>
                            )}
                            <button 
                              onClick={() => project.purchaseLink ? window.open(project.purchaseLink, '_blank') : alert('Purchase link not available')}
                              className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity"
                            >
                              Buy Now
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => window.open(project.liveLink, '_blank')}
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Get Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}
