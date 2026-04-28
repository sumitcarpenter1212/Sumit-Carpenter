import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useInView } from 'react-intersection-observer';
import { Layout, Smartphone, PenTool, Code2, ImageIcon } from 'lucide-react';

const skills = [
  {
    title: 'Website Development',
    description: 'Building modern, responsive, and user-friendly websites with clean design and smooth performance.',
    icon: <Layout size={32} />,
    color: 'from-accent-purple to-purple-600',
    shadow: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
  },
  {
    title: 'App Development',
    description: 'Creating simple and functional mobile applications with smooth design and easy navigation.',
    icon: <Smartphone size={32} />,
    color: 'from-accent-blue to-purple-600',
    shadow: 'shadow-[0_0_20px_rgba(0,240,255,0.3)]',
  },
  {
    title: 'UI/UX Design',
    description: 'Designing clean and attractive user interfaces that provide a smooth and easy user experience.',
    icon: <PenTool size={32} />,
    color: 'from-purple-600 to-accent-blue',
    shadow: 'shadow-[0_0_20px_rgba(124,58,237,0.3)]',
  },
  {
    title: 'Thumbnail Design',
    description: 'Creating eye-catching and modern thumbnails for YouTube and social media that attract attention and improve clicks.',
    icon: <ImageIcon size={32} />,
    color: 'from-[#ff3366] to-[#ff9933]',
    shadow: 'shadow-[0_0_20px_rgba(255,51,102,0.3)]',
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8 group/skills" style={{ perspective: '800px' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00f0ff] via-[#3b82f6] to-[#00f0ff] blur-xl opacity-30 group-hover/skills:opacity-60 transition-opacity duration-500 animate-pulse" />
            <motion.h2 
              className="relative text-4xl md:text-6xl font-black tracking-tight uppercase pb-2 flex items-center justify-center gap-3 md:gap-4"
              style={{ transformStyle: 'preserve-3d' }}
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
              <Code2 className="text-[#00f0ff] w-10 h-10 md:w-12 md:h-12" style={{ transform: 'translateZ(10px)' }} />
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute top-[2px] left-[2px] text-[#3b82f6] opacity-80 select-none" style={{ transform: 'translateZ(-5px)' }}>SKILLS</span>
                <span className="absolute top-[4px] left-[4px] text-[#00f0ff] opacity-60 select-none" style={{ transform: 'translateZ(-10px)' }}>SKILLS</span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#60a5fa] to-[#3b82f6]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.4))' }}>
                  SKILLS
                </span>
              </span>
            </motion.h2>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Tilt
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.05}
                transitionSpeed={2000}
                gyroscope={true}
                className="h-full"
              >
                <div className="glass-card p-8 h-full flex flex-col items-start group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
                  {/* Hover gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center mb-6 text-white ${skill.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  
                  <h3 className="text-xl font-heading font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-accent-purple transition-all">
                    {skill.title}
                  </h3>
                  
                  <p className="text-white/80 text-[15px] font-medium tracking-wide leading-relaxed">
                    {skill.description}
                  </p>
                  
                  {/* Bottom glow line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
