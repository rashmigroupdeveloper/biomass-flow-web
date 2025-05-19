
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const Hero = () => {
  // Animation variants
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

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Split the headline text for letter animation
  const titleText1 = "Turning Waste";
  const titleText2 = "Into Energy";
  
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Biomass Particle Animation */}
      <ParticleCanvas 
        id="biomassCanvas"
        options={{
          particleCount: 180,
          particleMinSize: 1,
          particleMaxSize: 4,
          baseHue: 120, // Green hue
          backgroundColor: 'rgba(46, 125, 50, 0.05)',
          flowIntensity: 1.2,
          flowDirection: 'upward',
          speedFactor: 0.7,
          connectionRadius: 150,
          connectionOpacity: 0.15,
          mouseInteraction: true,
          responsive: true,
          densityFactor: 0.0001,
        }}
      />
      
      {/* Gradient Overlay - Enhanced for better text visibility and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/90 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-20 pt-20">
        <motion.div 
          className="max-w-3xl mx-auto lg:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-800 mb-4 drop-shadow-sm"
            variants={itemVariants}
          >
            <span className="block mb-2 text-shadow-light">
              {titleText1.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
            <span className="block text-primary-600 text-shadow-light">
              {titleText2.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i + titleText1.length}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-800 mb-8 max-w-2xl text-shadow-sm"
            variants={itemVariants}
          >
            Sustainable biomass solutions for a greener tomorrow. 
            Helping industries transition to environmentally friendly energy alternatives.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <Link 
              to="/products/bio-pellets" 
              className="interactive group px-8 py-3 bg-primary-500 text-white font-medium rounded-md overflow-hidden relative hover:bg-primary-600 transition-colors duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products
              </motion.span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
            </Link>
            <Link 
              to="/about" 
              className="interactive group px-8 py-3 border border-primary-500 text-primary-700 font-medium rounded-md overflow-hidden relative hover:bg-primary-50 transition-colors duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              <motion.span 
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Our Mission
              </motion.span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-1 bg-primary-300"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ originX: 0 }}
              />
            </Link>
          </motion.div>
          
          {/* Added subtitle highlighting sustainability */}
          <motion.div 
            className="mt-12 flex items-center"
            variants={itemVariants}
          >
            <div className="h-px bg-primary-300 w-12 mr-4"></div>
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
          delay: 1.5,
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <motion.div 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById('about-section');
            if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
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
