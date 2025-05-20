
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const Hero = () => {
  // Check for low performance mode
  const isLowPerformanceMode = typeof window !== 'undefined' && window.BIOMASS_LOW_PERFORMANCE_MODE === true;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isLowPerformanceMode ? 0.1 : 0.15,
        delayChildren: isLowPerformanceMode ? 0.3 : 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isLowPerformanceMode ? 0.5 : 0.8,
        ease: [0.645, 0.045, 0.355, 1.000] // Custom cubic-bezier for smoother animation
      }
    }
  };

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Biomass Particle Animation */}
      <ParticleCanvas
        id="biomassCanvas"
        options={{
          particleCount: isLowPerformanceMode ? 75 : 220,
          particleMinSize: isLowPerformanceMode ? 2 : 1.5,
          particleMaxSize: isLowPerformanceMode ? 4 : 5,
          baseHue: 120, // Green hue
          backgroundColor: 'rgba(255, 255, 255, 1)', // White background with green particles
          flowIntensity: isLowPerformanceMode ? 1.2 : 1.5,
          flowDirection: 'upward' as const,
          speedFactor: isLowPerformanceMode ? 0.3 : 0.5, // Slower movement for more graceful trails
          connectionRadius: isLowPerformanceMode ? 100 : 180, // Increased connection radius
          connectionOpacity: isLowPerformanceMode ? 0.15 : 0.25, // More visible connections
          mouseInteraction: !isLowPerformanceMode,
          responsive: true,
          densityFactor: isLowPerformanceMode ? 0.000075 : 0.00012,
          trailEffect: !isLowPerformanceMode, // Disable trailing effect on low performance devices
          trailLength: 0.92, // Controls how long trails persist (higher = longer)
          particleGlow: !isLowPerformanceMode, // Disable glow on low performance devices
          elongateParticles: !isLowPerformanceMode, // Disable elongation on low performance devices
          waveMotion: true, // Keep gentle wave-like motion
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-20 flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-full flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo at the top */}
          <motion.div
            className="mb-8 w-full max-w-xs"
            variants={itemVariants}
          >
            <img
              src="/logo.png"
              alt="Rashmi 6 Paradigm Logo"
              className="w-full h-auto"
            />
          </motion.div>

          {/* Main heading */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-800 mb-4"
            variants={itemVariants}
          >
            Turning Waste Into Energy
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl"
            variants={itemVariants}
          >
            Sustainable biomass solutions for a greener tomorrow...
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-16"
            variants={itemVariants}
          >
            <Link
              to="/products/bio-pellets"
              className="interactive group px-8 py-3 bg-primary-500 text-white font-medium rounded overflow-hidden relative hover:bg-primary-600 transition-colors duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <span className="relative z-10">Explore Products</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
            <Link
              to="/about"
              className="interactive group px-8 py-3 border border-primary-500 text-primary-500 font-medium rounded overflow-hidden relative hover:bg-primary-50 transition-colors duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <span className="relative z-10">Our Mission</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Link>
          </motion.div>

          {/* Bottom text */}
          <motion.div
            className="mt-auto"
            variants={itemVariants}
          >
            <p className="text-sm uppercase tracking-wider text-primary-700 font-medium">Engineering a sustainable tomorrow</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Enhanced with smoother animation */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: isLowPerformanceMode ? 1.0 : 1.5,
          duration: isLowPerformanceMode ? 0.5 : 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: isLowPerformanceMode ? 1.0 : 0.5
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 mb-2 font-light tracking-wider">Scroll</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L12 19M12 19L18 13M12 19L6 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
