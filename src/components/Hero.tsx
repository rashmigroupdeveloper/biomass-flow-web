
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleAnimation from './ParticleAnimation';

const Hero = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
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

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Particle Background */}
      <ParticleAnimation />
      
      {/* Gradient Overlay - Enhanced for better text visibility and depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-20 pt-20">
        <motion.div 
          className="max-w-3xl mx-auto lg:mx-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-800 mb-4"
            variants={itemVariants}
          >
            Turning Waste <br className="hidden md:block" />
            Into <span className="text-primary-500">Energy</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-8"
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
              to="/products" 
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
      
      {/* Enhanced decorative blobs with better positioning and animation */}
      <div className="hidden md:block absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
      <div className="hidden md:block absolute -bottom-[15%] -right-[10%] w-[45%] h-[45%] bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float animation-delay-2000"></div>
      <div className="hidden md:block absolute top-[40%] -right-[20%] w-[30%] h-[30%] bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float animation-delay-4000"></div>
    </div>
  );
};

export default Hero;
