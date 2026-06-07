import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CreditCard, CheckCircle2, HelpCircle, Zap, Star, Diamond, Smartphone } from 'lucide-react';

const websitePlans = [
  {
    name: 'Starter',
    icon: <Zap className="w-6 h-6 text-[#00ff87]" />,
    nameColor: 'from-[#00ff87] to-[#60efff]',
    nameGlow: 'drop-shadow(0 0 8px rgba(0,255,135,0.6))',
    description: 'Best for: Personal / small work',
    price: 299,
    features: [
      { text: '1 Page Website', tooltip: null },
      { text: 'Clean & Simple Design', tooltip: null },
      { text: 'Mobile Friendly', tooltip: null },
      { text: 'Contact Support', tooltip: null },
      { text: 'Fast Loading', tooltip: null },
      { text: '1 Revision', tooltip: null },
      { text: 'Delivery in 2–3 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Starter* plan for a website. I’d like to discuss my requirements and see how we can get started with a clean and professional website for my project.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: false,
  },
  {
    name: 'Professional',
    icon: <Star className="w-6 h-6 text-[#00f0ff]" />,
    nameColor: 'from-[#00f0ff] to-[#3b82f6]',
    nameGlow: 'drop-shadow(0 0 8px rgba(0,240,255,0.6))',
    description: 'Best for: Business / portfolio',
    price: 699,
    features: [
      { text: '3–5 Pages Website', tooltip: null },
      { text: 'Modern & Attractive Design', tooltip: null },
      { text: 'Mobile + Tablet Friendly', tooltip: null },
      { text: 'Contact Support', tooltip: null },
      { text: 'Basic Animations', tooltip: null },
      { text: 'Fast Loading', tooltip: null },
      { text: '2 Revisions', tooltip: null },
      { text: 'Delivery in 5–7 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Professional* plan. I’d like to discuss my project requirements and get a modern, well-designed website built for my needs.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: true,
  },
  {
    name: 'Advanced',
    icon: <Diamond className="w-6 h-6 text-[#ff9933]" />,
    nameColor: 'from-[#ff9933] to-[#ff3366]',
    nameGlow: 'drop-shadow(0 0 8px rgba(255,153,51,0.6))',
    description: 'Best for: Advanced / custom work',
    price: 999,
    features: [
      { text: 'Custom Website Design', tooltip: null },
      { text: 'Multiple Pages', tooltip: null },
      { text: 'Smooth Animations & Effects', tooltip: null },
      { text: 'Contact Support', tooltip: null },
      { text: 'Clean & Professional Layout', tooltip: null },
      { text: 'Fast Performance', tooltip: null },
      { text: '3 Revisions', tooltip: null },
      { text: 'Delivery in 15–20 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Advanced* plan. I’m looking for a custom website for my project. I’d like to discuss my requirements in detail and explore the best solution you can provide.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: false,
  },
];

const appPlans = [
  {
    name: 'Starter',
    icon: <Zap className="w-6 h-6 text-[#00ff87]" />,
    nameColor: 'from-[#00ff87] to-[#60efff]',
    nameGlow: 'drop-shadow(0 0 8px rgba(0,255,135,0.6))',
    description: 'Best for: Basic Android App',
    price: 499,
    features: [
      { text: 'Basic Android App (WebView type)', tooltip: null },
      { text: 'Simple UI Design', tooltip: null },
      { text: 'App Icon + Splash Screen', tooltip: null },
      { text: 'Smooth Navigation', tooltip: null },
      { text: 'Fast & Lightweight', tooltip: null },
      { text: 'Basic Features Integration', tooltip: null },
      { text: '1 Revision', tooltip: null },
      { text: 'Delivery in 3–5 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Starter* plan for an application. I’d like to discuss my requirements and see how we can get started with a clean and professional application for my project.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: false,
  },
  {
    name: 'Professional',
    icon: <Star className="w-6 h-6 text-[#00f0ff]" />,
    nameColor: 'from-[#00f0ff] to-[#3b82f6]',
    nameGlow: 'drop-shadow(0 0 8px rgba(0,240,255,0.6))',
    description: 'Best for: Custom Android App',
    price: 999,
    features: [
      { text: 'Custom Android App', tooltip: null },
      { text: 'Modern UI Design', tooltip: null },
      { text: 'Multiple Screens (3–5 Screens)', tooltip: null },
      { text: 'Smooth Navigation', tooltip: null },
      { text: 'App Icon + Splash Screen', tooltip: null },
      { text: 'Basic Feature Integration', tooltip: null },
      { text: 'WhatsApp / Form Integration', tooltip: null },
      { text: '2 Revisions', tooltip: null },
      { text: 'Delivery in 5–7 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Professional* plan. I’d like to discuss my project requirements and get a modern, well-designed application built for my needs.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: true,
  },
  {
    name: 'Advanced',
    icon: <Diamond className="w-6 h-6 text-[#ff9933]" />,
    nameColor: 'from-[#ff9933] to-[#ff3366]',
    nameGlow: 'drop-shadow(0 0 8px rgba(255,153,51,0.6))',
    description: 'Best for: Advanced Android App',
    price: 1499,
    features: [
      { text: 'Advanced Android App', tooltip: null },
      { text: 'Custom UI + Animations', tooltip: null },
      { text: 'Multiple Screens + Features', tooltip: null },
      { text: 'API Integration (basic level)', tooltip: null },
      { text: 'Login / User System (basic)', tooltip: null },
      { text: 'Smooth Performance', tooltip: null },
      { text: 'App Icon + Splash Screen', tooltip: null },
      { text: '3 Revisions', tooltip: null },
      { text: 'Priority Support', tooltip: null },
      { text: 'Delivery in 15–20 Days', tooltip: null },
    ],
    buttonText: 'Contact Now',
    whatsappText: 'Hi, I’m interested in your *Advanced* plan. I’m looking for a custom application for my project. I’d like to discuss my requirements in detail and explore the best solution you can provide.',
    buttonStyle: 'bg-gradient-to-r from-accent-blue to-accent-purple text-white shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105',
    isPopular: false,
  },
];

export default function Pricing() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8 group/pricing" style={{ perspective: '800px' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00ff87] via-[#60efff] to-[#00ff87] blur-xl opacity-30 group-hover/pricing:opacity-60 transition-opacity duration-500 animate-pulse" />
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
              <CreditCard className="text-[#00ff87] w-10 h-10 md:w-12 md:h-12" style={{ transform: 'translateZ(10px)' }} />
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute top-[2px] left-[2px] text-[#60efff] opacity-80 select-none" style={{ transform: 'translateZ(-5px)' }}>WEBSITE PRICING</span>
                <span className="absolute top-[4px] left-[4px] text-[#00ff87] opacity-60 select-none" style={{ transform: 'translateZ(-10px)' }}>WEBSITE PRICING</span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] via-[#60efff] to-[#00ff87]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(0,255,135,0.4))' }}>
                  WEBSITE PRICING
                </span>
              </span>
            </motion.h2>
          </div>

        </motion.div>

        {/* Website Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center mb-24">
          {websitePlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? 'glass border-accent-blue/50 scale-105 shadow-[0_0_40px_rgba(0,240,255,0.15)] z-10 bg-background/60 md:-mt-8 md:mb-8' 
                  : 'glass border-white/10 hover:border-white/20 bg-background/40'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  POPULAR
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {plan.icon}
                  </div>
                  <h3 className={`text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r ${plan.nameColor}`} style={{ filter: plan.nameGlow }}>
                    {plan.name}
                  </h3>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">₹{plan.price}</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/918955671482?text=${encodeURIComponent(plan.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-8 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </a>

              <div className="space-y-4">
                <p className="font-medium text-white/90 mb-4">Free features</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70 leading-tight">{feature.text}</span>
                    {feature.tooltip && (
                      <div className="relative shrink-0 mt-0.5 group/tooltip">
                        <HelpCircle className="w-4 h-4 text-white/30 hover:text-white/80 cursor-help transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 border border-white/10 rounded-xl text-xs text-white/90 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-xl backdrop-blur-md">
                          {feature.tooltip}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Application Pricing Subheader */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-12"
        >
          <div className="relative inline-block mb-8 group/pricing-app" style={{ perspective: '800px' }}>
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00f0ff] via-[#3b82f6] to-[#00f0ff] blur-xl opacity-30 group-hover/pricing-app:opacity-60 transition-opacity duration-500 animate-pulse" />
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
              <Smartphone className="text-[#00f0ff] w-10 h-10 md:w-12 md:h-12" style={{ transform: 'translateZ(10px)' }} />
              <span className="relative inline-block whitespace-nowrap">
                <span className="absolute top-[2px] left-[2px] text-[#3b82f6] opacity-80 select-none" style={{ transform: 'translateZ(-5px)' }}>APPLICATION PRICING</span>
                <span className="absolute top-[4px] left-[4px] text-[#00f0ff] opacity-60 select-none" style={{ transform: 'translateZ(-10px)' }}>APPLICATION PRICING</span>
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#3b82f6] to-[#00f0ff]" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', filter: 'drop-shadow(0 0 10px rgba(0,240,255,0.4))' }}>
                  APPLICATION PRICING
                </span>
              </span>
            </motion.h2>
          </div>
        </motion.div>

        {/* Application Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {appPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                plan.isPopular 
                  ? 'glass border-accent-blue/50 scale-105 shadow-[0_0_40px_rgba(0,240,255,0.15)] z-10 bg-background/60 md:-mt-8 md:mb-8' 
                  : 'glass border-white/10 hover:border-white/20 bg-background/40'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 right-8 bg-gradient-to-r from-accent-blue to-accent-purple text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]">
                  POPULAR
                </div>
              )}

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    {plan.icon}
                  </div>
                  <h3 className={`text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r ${plan.nameColor}`} style={{ filter: plan.nameGlow }}>
                    {plan.name}
                  </h3>
                </div>
                <p className="text-white/60 text-sm">{plan.description}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">₹{plan.price}</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/918955671482?text=${encodeURIComponent(plan.whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center w-full py-3 rounded-xl font-semibold transition-all duration-300 mb-8 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </a>

              <div className="space-y-4">
                <p className="font-medium text-white/90 mb-4">Free features</p>
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 relative">
                    <CheckCircle2 className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
                    <span className="text-sm text-white/70 leading-tight">{feature.text}</span>
                    {feature.tooltip && (
                      <div className="relative shrink-0 mt-0.5 group/tooltip">
                        <HelpCircle className="w-4 h-4 text-white/30 hover:text-white/80 cursor-help transition-colors" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 p-3 bg-gray-900 border border-white/10 rounded-xl text-xs text-white/90 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-xl backdrop-blur-md">
                          {feature.tooltip}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
