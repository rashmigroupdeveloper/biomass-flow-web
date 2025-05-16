
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Factory, TrendingUp, Wind } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  unit?: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, unit = '', delay }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, threshold: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000; // Animation duration in milliseconds
    const startTime = Date.now();
    
    const countUpAnimation = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(countUpAnimation);
      }
    };
    
    // Start animation after delay
    const timer = setTimeout(() => {
      requestAnimationFrame(countUpAnimation);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      className="contribution-item p-6 md:p-8 bg-white rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="w-16 h-16 mx-auto bg-primary-50 rounded-full flex items-center justify-center mb-6">
        <div className="text-primary-600">
          {icon}
        </div>
      </div>
      
      <div 
        ref={counterRef}
        className="text-4xl font-bold text-primary-800 mb-2"
      >
        {count.toLocaleString()}{unit}
      </div>
      
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const AboutAnimatedStats = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, threshold: 0.1 });

  return (
    <section className="py-20 px-6 md:px-12 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4">Our Impact in Numbers</h2>
          <div className="h-1 w-20 bg-primary-500 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Rashmi 6 Paradigm, we're committed to creating a sustainable future through innovative biomass solutions. 
            Our impact is measured in real environmental benefits.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatItem 
            icon={<Leaf className="w-8 h-8" />} 
            value={150000} 
            label="Tons of CO₂ Reduced Annually" 
            delay={200}
          />
          <StatItem 
            icon={<Factory className="w-8 h-8" />} 
            value={500000} 
            label="Tons of Biomass Processed" 
            delay={400}
          />
          <StatItem 
            icon={<TrendingUp className="w-8 h-8" />} 
            value={35} 
            label="Percent Energy Efficiency Increase" 
            unit="%" 
            delay={600}
          />
          <StatItem 
            icon={<Wind className="w-8 h-8" />} 
            value={200} 
            label="Direct Market Applications" 
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutAnimatedStats;
