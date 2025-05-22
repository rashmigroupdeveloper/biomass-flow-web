
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [showTransition, setShowTransition] = useState(true);
  const [showBlur, setShowBlur] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initial page transition effect
    let timer1: NodeJS.Timeout;
    
    // Wait for assets to load
    if (document.readyState === 'complete') {
      // Set a slight delay to ensure animations run smoothly
      timer1 = setTimeout(() => {
        setShowTransition(false);
        // Add blur effect after page transition
        setTimeout(() => {
          setShowBlur(true);
          setPageLoaded(true);
        }, 300);
      }, 800);
    } else {
      window.addEventListener('load', () => {
        timer1 = setTimeout(() => {
          setShowTransition(false);
          setTimeout(() => {
            setShowBlur(true);
            setPageLoaded(true);
          }, 300);
        }, 800);
      });
    }
    
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  // Reset transition when route changes
  useEffect(() => {
    setShowTransition(true);
    setShowBlur(false);
    
    // Delay to match transition duration
    const timer = setTimeout(() => {
      setShowTransition(false);
      
      // Add blur effect after page transition
      setTimeout(() => {
        setShowBlur(true);
      }, 300);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* Full page transition overlay */}
      <motion.div
        className="fixed inset-0 z-[100] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: showTransition ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.87, 0, 0.13, 1] }}
        style={{
          transformOrigin: 'top',
          backgroundColor: 'var(--color-primary-500, #4CAF50)',
        }}
      >
        <ParticleCanvas
          id="transitionCanvas"
          options={{
            particleCount: 100,
            particleMinSize: 2,
            particleMaxSize: 6,
            baseHue: 120,
            flowIntensity: 1,
            flowDirection: 'circular',
            speedFactor: 0.8,
            connectionRadius: 150,
            connectionOpacity: 0.3,
            interactive: true,
            responsive: true,
            densityFactor: 0.00012,
          }}
        />
      </motion.div>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: pageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
