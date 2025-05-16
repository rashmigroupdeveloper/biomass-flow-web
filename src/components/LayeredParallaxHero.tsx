
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  imageUrl: string;
  speed: number;
  zIndex: number;
  opacity?: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ imageUrl, speed, zIndex, opacity = 1 }) => {
  const layerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    
    gsap.to(layer, {
      y: () => ScrollTrigger.maxScroll(window) * speed * -1,
      ease: "none",
      scrollTrigger: {
        trigger: layer.parentElement,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, [speed]);
  
  return (
    <div 
      ref={layerRef} 
      className="absolute inset-0 will-change-transform"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex,
        opacity
      }}
    />
  );
};

const LayeredParallaxHero: React.FC = () => {
  // High-quality nature images from Unsplash
  const bgLayer = "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80";
  const midLayer = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80";
  const fgLayer = "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80";
  
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Layer - Slowest Movement */}
      <ParallaxLayer imageUrl={bgLayer} speed={0.1} zIndex={1} />
      
      {/* Mid-ground Layer */}
      <ParallaxLayer imageUrl={midLayer} speed={0.3} zIndex={2} opacity={0.8} />
      
      {/* Foreground Layer - Fastest Movement */}
      <ParallaxLayer imageUrl={fgLayer} speed={0.6} zIndex={3} opacity={0.6} />
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl"
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Rashmi 6 Paradigm: <br />
            Powering a Sustainable Future
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Leading innovation in biomass energy solutions for a greener tomorrow
          </motion.p>
          
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <Link 
              to="/products"
              className="px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Explore Products</span>
              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-all duration-1000 group-hover:left-[100%]"></span>
            </Link>
            
            <Link 
              to="/about"
              className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              Our Mission
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <motion.svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <path d="M12 5L12 19M12 19L18 13M12 19L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default LayeredParallaxHero;
