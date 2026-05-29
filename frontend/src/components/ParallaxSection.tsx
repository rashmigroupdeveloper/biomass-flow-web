
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxLayerProps {
  src: string;
  speed: number;
  zIndex?: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ src, speed, zIndex = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
  
  return (
    <motion.div 
      ref={ref}
      className="absolute inset-0 will-change-transform"
      style={{ 
        y,
        zIndex,
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

interface ParallaxSectionProps {
  title: string;
  subtitle?: string;
  height?: string;
  bgLayer: string;
  midLayer: string;
  fgLayer: string;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ 
  title, 
  subtitle, 
  height = "100vh", 
  bgLayer, 
  midLayer, 
  fgLayer 
}) => {
  return (
    <section 
      className="relative overflow-hidden"
      style={{ height }}
    >
      {/* Background Layer - Slowest Movement */}
      <ParallaxLayer src={bgLayer} speed={10} zIndex={1} />
      
      {/* Mid-ground Layer - Medium Movement */}
      <ParallaxLayer src={midLayer} speed={30} zIndex={2} />
      
      {/* Foreground Layer - Fastest Movement */}
      <ParallaxLayer src={fgLayer} speed={60} zIndex={3} />
      
      {/* Content - Fixed Position with enhanced animation */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg"
        >
          {title}
        </motion.h2>
        
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-white max-w-2xl drop-shadow-md"
          >
            {subtitle}
          </motion.p>
        )}
        
        {/* New decorative element */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.8 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="h-[3px] w-24 bg-white mt-8 rounded-full"
        />
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-4"></div>
    </section>
  );
};

export default ParallaxSection;
