import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = () => {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit' | 'done'>('enter');

  useEffect(() => {
    // wordmark fades in → hold → curtain wipes up
    const t1 = setTimeout(() => setPhase('hold'), 400);
    const t2 = setTimeout(() => setPhase('exit'), 900);
    const t3 = setTimeout(() => setPhase('done'), 1650);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#071a09' }}
          animate={phase === 'exit' ? {
            clipPath: 'inset(0 0 100% 0)',
          } : {
            clipPath: 'inset(0 0 0% 0)',
          }}
          transition={phase === 'exit' ? {
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          } : {
            duration: 0,
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(46,125,50,0.15) 0%, transparent 70%)',
            }}
          />

          {/* Wordmark */}
          <motion.div
            className="relative z-10 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase === 'exit' ? 0 : 1, y: phase === 'exit' ? -8 : 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <img
              src="/logo.png"
              alt="Rashmi 6 Paradigm"
              className="h-10 md:h-12 w-auto mx-auto mb-4"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.45em]">
              Sustainable Biomass Energy
            </p>
          </motion.div>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-primary-500/50"
            initial={{ width: '0%' }}
            animate={{ width: phase === 'exit' ? '100%' : phase === 'hold' ? '70%' : '20%' }}
            transition={{ duration: phase === 'exit' ? 0.5 : 0.6, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
