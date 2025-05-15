
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleAnimation from './ParticleAnimation';

const Hero = () => {
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Background */}
      <ParticleAnimation />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/80 z-10"></div>
      
      {/* Content */}
      <div className="container mx-auto px-6 md:px-12 z-20 pt-20">
        <div className="max-w-3xl mx-auto lg:mx-0">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-800 mb-4"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Turning Waste <br className="hidden md:block" />
            Into <span className="text-primary-500">Energy</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-8"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            Sustainable biomass solutions for a greener tomorrow. 
            Helping industries transition to environmentally friendly energy alternatives.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            <Link 
              to="/products" 
              className="interactive px-8 py-3 bg-primary-500 text-white font-medium rounded hover:bg-primary-600 transition-all transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              Explore Products
            </Link>
            <Link 
              to="/about" 
              className="interactive px-8 py-3 border border-primary-500 text-primary-500 font-medium rounded hover:bg-primary-50 transition-all transform hover:-translate-y-1 inline-flex items-center justify-center"
            >
              Our Mission
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 mb-2">Scroll</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="animate-bounce"
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
      
      {/* Decorative Blobs */}
      <div className="hidden md:block absolute -top-20 -left-20 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float"></div>
      <div className="hidden md:block absolute -bottom-20 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-float animation-delay-2000"></div>
    </div>
  );
};

export default Hero;
