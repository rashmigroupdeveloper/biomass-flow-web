
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const Hero = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.000] // Custom cubic-bezier for smoother animation
      }
    }
  };

  // Floating animation for the decorative elements
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Updated Biomass Particle Animation with lighter appearance */}
      <ParticleCanvas 
        id="biomassCanvas"
        options={{
          particleCount: 180,
          particleSize: 2.5,
          particleColor: '#81c784',
          backgroundColor: 'rgba(255, 255, 255, 0.03)', // Lighter background
          flowSpeed: 0.9,
          flowDirection: 'upward',
          interactionStrength: 1.2,
          connectionRadius: 150,
          colorVariation: 15,
          densityFactor: 0.0001,
        }}
      />
      
      {/* Enhanced Gradient Overlay - Lighter for better visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-20 pt-20">
        <motion.div 
          className="max-w-3xl mx-auto lg:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="mb-8"
            variants={itemVariants}
          >
            <img 
              src="/lovable-uploads/b8ae8a7d-fba7-4a4d-860f-81420e70265f.png" 
              alt="Rashmi 6 Paradigm Limited" 
              className="h-24 md:h-28 w-auto mx-auto lg:mx-0"
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-800 mb-4 text-center lg:text-left"
            variants={itemVariants}
          >
            Turning Waste <br className="hidden md:block" />
            Into <span className="text-primary-500 relative inline-block">
              Energy
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1 bg-primary-300 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              ></motion.span>
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-8 text-center lg:text-left"
            variants={itemVariants}
          >
            Sustainable biomass solutions for a greener tomorrow. 
            Helping industries transition to environmentally friendly energy alternatives.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            variants={itemVariants}
          >
            <Link 
              to="/products" 
              className="group px-8 py-3 bg-primary-500 text-white font-medium rounded-lg overflow-hidden relative hover:bg-primary-600 transition-colors duration-300"
            >
              <span className="relative z-10">Explore Products</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                whileHover={{ scale: 1 }}
              ></motion.span>
            </Link>
            <Link 
              to="/about" 
              className="group px-8 py-3 border border-primary-500 text-primary-500 font-medium rounded-lg overflow-hidden relative hover:bg-primary-50 transition-colors duration-300"
            >
              <span className="relative z-10">Our Mission</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
                whileHover={{ scale: 1 }}
              ></motion.span>
            </Link>
          </motion.div>
          
          {/* Enhanced subtitle with animation */}
          <motion.div 
            className="mt-12 flex items-center justify-center lg:justify-start"
            variants={itemVariants}
          >
            <motion.div 
              className="h-px bg-primary-300 w-12 mr-4"
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            ></motion.div>
            <p className="text-sm uppercase tracking-wider text-primary-700 font-medium">Engineering a sustainable tomorrow</p>
          </motion.div>
          
          {/* Decorative floating particles */}
          <motion.div 
            className="absolute top-20 right-20 w-8 h-8 rounded-full bg-primary-200 opacity-40 hidden lg:block"
            animate={floatingAnimation}
          />
          <motion.div 
            className="absolute bottom-40 left-20 w-6 h-6 rounded-full bg-primary-300 opacity-30 hidden lg:block"
            animate={{
              ...floatingAnimation,
              transition: {
                delay: 0.5,
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          />
        </motion.div>
      </div>
      
      {/* Enhanced Scroll Indicator with smoother animation */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          delay: 1.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <motion.div 
          className="flex flex-col items-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            window.scrollBy({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <span className="text-sm text-gray-600 mb-2 font-light tracking-wider">Scroll</span>
          <motion.svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              y: [0, 5, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <path 
              d="M12 5L12 19M12 19L18 13M12 19L6 13" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
