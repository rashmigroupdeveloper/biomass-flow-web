
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {isTransitioning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-900/50 backdrop-blur-sm">
            <div className="relative w-60 h-60">
              <ParticleCanvas
                id="transitionCanvas"
                options={{
                  particleCount: 100,
                  particleMinSize: 2,
                  particleMaxSize: 6,
                  baseHue: 120,
                  backgroundColor: 'transparent',
                  flowIntensity: 2,
                  flowDirection: 'circular',
                  speedFactor: 1.2,
                  connectionRadius: 100,
                  connectionOpacity: 0.2,
                  mouseInteraction: false,
                  responsive: false,
                }}
              />
            </div>
          </div>
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
