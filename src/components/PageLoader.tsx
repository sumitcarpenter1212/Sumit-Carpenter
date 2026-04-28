import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer glowing ring */}
        <motion.div
          className="absolute w-32 h-32 rounded-full border-t-2 border-accent-blue opacity-70"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)' }}
        />
        {/* Inner glowing ring */}
        <motion.div
          className="absolute w-24 h-24 rounded-full border-b-2 border-accent-purple opacity-70"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' }}
        />
        {/* Core */}
        <motion.div
          className="w-12 h-12 bg-gradient-to-tr from-accent-blue to-accent-purple rounded-full blur-sm"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple mb-2 tracking-widest">
          INITIALIZING
        </h2>
        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-blue to-accent-purple"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <p className="mt-2 text-sm font-mono text-white/50">{progress}%</p>
      </div>
    </motion.div>
  );
}
