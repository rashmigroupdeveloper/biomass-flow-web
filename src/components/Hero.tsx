
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center">
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas 
          id="hero-particles" 
          options={{
            particleCount: 100,
            particleMinSize: 1,
            particleMaxSize: 3,
            baseHue: 120, // green hue
            backgroundColor: 'rgba(46, 125, 50, 0.05)', // Very light green background
            flowIntensity: 0.5,
            flowDirection: 'upward',
            connectionRadius: 150,
            mouseInteraction: true
          }}
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl">
          {/* Enhanced hero text with improved visibility */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-6"
          >
            <span className="bg-white/70 backdrop-blur-sm text-primary-600 px-4 py-1.5 rounded-full text-sm font-medium inline-block mb-4">
              Sustainable Biomass Solutions
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl inline-block text-gray-900">Turning Waste</span>
          </motion.h1>
          
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8 text-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl inline-block text-primary-600">Into Energy</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl mb-10 max-w-2xl bg-white/70 backdrop-blur-sm p-4 rounded-xl text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Rashmi 6 Paradigm is revolutionizing the biomass industry by converting agricultural waste into sustainable energy solutions, reducing carbon footprint and promoting a circular economy.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/products/bio-pellets" 
                className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
              >
                Our Products
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/about" 
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-medium rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              >
                About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating animation elements */}
        <motion.div
          className="absolute top-1/3 right-10 lg:right-32 w-24 h-24 rounded-full bg-primary-200/50"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-24 w-16 h-16 rounded-full bg-primary-300/40"
          animate={{
            y: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        
        <motion.div
          className="absolute top-1/2 left-16 w-20 h-20 rounded-full bg-primary-400/30"
          animate={{
            y: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>
      
      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200" className="w-full">
          <path 
            fill="#e8f5e9" 
            fillOpacity="1" 
            d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,165.3C1120,171,1280,149,1360,138.7L1440,128L1440,200L1360,200C1280,200,1120,200,960,200C800,200,640,200,480,200C320,200,160,200,80,200L0,200Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
