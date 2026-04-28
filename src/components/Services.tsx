import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Cpu, Layers, Zap } from 'lucide-react';

const services = [
  {
    icon: <Code2 size={32} />,
    title: 'AI Website Development',
    description: 'Custom-built, high-performance websites integrated with cutting-edge AI features like chatbots, dynamic content generation, and predictive analytics.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]',
    border: 'group-hover:border-accent-blue/50',
  },
  {
    icon: <Cpu size={32} />,
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications designed for speed, scalability, and seamless user experiences across all devices.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]',
    border: 'group-hover:border-accent-purple/50',
  },
  {
    icon: <Zap size={32} />,
    title: 'Automation Tools',
    description: 'Intelligent workflow automations and custom scripts that save time, reduce errors, and optimize your business operations.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]',
    border: 'group-hover:border-accent-blue/50',
  },
  {
    icon: <Layers size={32} />,
    title: 'Custom UI/UX Design',
    description: 'Premium, futuristic interface designs that captivate users. Specializing in dark mode, glassmorphism, and 3D interactive elements.',
    glow: 'group-hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]',
    border: 'group-hover:border-accent-purple/50',
  },
];

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-blue to-accent-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group glass-card p-8 border border-white/5 transition-all duration-500 hover:-translate-y-2 ${service.border} ${service.glow} relative overflow-hidden`}
            >
              {/* Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white group-hover:text-accent-blue transition-colors duration-300">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-blue group-hover:to-accent-purple transition-all">
                    {service.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
