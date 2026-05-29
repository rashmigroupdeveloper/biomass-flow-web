
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutParallaxHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const midLayerRef = useRef<HTMLDivElement>(null);
  const fgLayerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up parallax scrolling effect
    gsap.to(bgLayerRef.current, {
      y: () => ScrollTrigger.maxScroll(window) * 0.1 * -1, // slowest
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
    
    gsap.to(midLayerRef.current, {
      y: () => ScrollTrigger.maxScroll(window) * 0.3 * -1, // medium speed
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
    
    gsap.to(fgLayerRef.current, {
      y: () => ScrollTrigger.maxScroll(window) * 0.6 * -1, // fastest
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-[60vh] md:h-[70vh] overflow-hidden"
    >
      {/* Background Layer (furthest away, moves slowest) */}
      <div 
        ref={bgLayerRef}
        className="absolute inset-0 h-[120%]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 1
        }}
      />
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      
      {/* Middle Layer */}
      <div 
        ref={midLayerRef}
        className="absolute inset-0 h-[120%]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 2,
          opacity: 0.7
        }}
      />
      
      {/* Foreground Layer (closest, moves fastest) */}
      <div 
        ref={fgLayerRef}
        className="absolute inset-0 h-[120%]"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 3,
          opacity: 0.6
        }}
      />
      
      {/* Content */}
      <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            About Rashmi 6 Paradigm
          </h1>
          
          <div className="w-20 h-1.5 bg-primary-500 mx-auto mb-6"></div>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Pioneering sustainable biomass energy solutions for a greener future
          </motion.p>
        </motion.div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent z-20"></div>
    </div>
  );
};

export default AboutParallaxHero;
