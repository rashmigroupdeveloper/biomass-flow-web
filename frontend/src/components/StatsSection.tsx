
import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Factory, TrendingUp, Wind } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  unit?: string;
  delay?: number;
}

const StatItem = ({ icon, value, label, unit = '', delay = 0 }: StatItemProps) => {
  const counterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(counterRef, { once: true, margin: "-100px" });
  const formattedValue = value.toLocaleString();
  
  useEffect(() => {
    if (!isInView || !counterRef.current) return;
    
    const counter = counterRef.current;
    const target = value;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target)) || 50;
    const startTime = Date.now();
    
    const updateCounter = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Apply easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(target * easeOutQuart);
      
      counter.textContent = current.toLocaleString() + unit;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };
    
    setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, delay);
    
  }, [isInView, value, unit, delay]);

  return (
    <motion.div
      className="contribution-item bg-white p-8 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <div 
        ref={counterRef}
        className="text-4xl font-bold text-primary-800 mb-2"
      >
        0{unit}
      </div>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800">Our Environmental Impact</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            At Rashmi 6 Paradigm, we're committed to creating a sustainable future through innovative biomass solutions. Our impact is measured in real environmental benefits.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem 
            icon={<Leaf className="w-8 h-8 text-primary-600" />} 
            value={150000} 
            label="Tons of CO2 Reduced Annually" 
            delay={200}
          />
          <StatItem 
            icon={<Factory className="w-8 h-8 text-primary-600" />} 
            value={500000} 
            label="Tons of Biomass Processed" 
            delay={400}
          />
          <StatItem 
            icon={<TrendingUp className="w-8 h-8 text-primary-600" />} 
            value={35} 
            label="Percent Energy Efficiency Increase" 
            unit="%" 
            delay={600}
          />
          <StatItem 
            icon={<Wind className="w-8 h-8 text-primary-600" />} 
            value={200} 
            label="Direct Market Applications" 
            delay={800}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
