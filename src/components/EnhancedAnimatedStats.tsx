
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Leaf, Factory, TrendingUp, Wind } from 'lucide-react';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  unit?: string;
  delay: number;
  color: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, unit = '', delay, color }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(countRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds animation
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Apply easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    // Add delay before starting animation
    const timer = setTimeout(() => {
      requestAnimationFrame(step);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [isInView, value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="bg-white p-8 rounded-xl shadow-lg border-t-4 hover:shadow-xl transition-shadow duration-300"
      style={{ borderColor: color }}
    >
      <div 
        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
        style={{ backgroundColor: `${color}20` }} // Using hex opacity
      >
        <div style={{ color: color }}>
          {icon}
        </div>
      </div>
      
      <div 
        ref={countRef}
        className="text-4xl font-bold mb-2 text-center"
        style={{ color }}
      >
        {count.toLocaleString()}{unit}
      </div>
      
      <p className="text-gray-600 text-center">{label}</p>
    </motion.div>
  );
};

const EnhancedAnimatedStats: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Define stat colors for cohesive theme
  const colors = {
    leaf: "#4CAF50",      // Green for environmental impact
    factory: "#FF9800",   // Orange for production
    trend: "#2196F3",     // Blue for efficiency
    wind: "#9C27B0"       // Purple for applications
  };

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.span
            className="text-sm uppercase tracking-wider font-medium"
            style={{ color: colors.leaf }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Making a Difference
          </motion.span>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-4 mt-2">Our Environmental Impact</h2>
          
          <motion.div 
            className="h-1 w-24 mx-auto mb-6"
            style={{ backgroundColor: colors.leaf }}
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: 96, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          
          <p className="text-gray-600 max-w-3xl mx-auto">
            At Rashmi 6 Paradigm, we're committed to creating a sustainable future through innovative biomass solutions. 
            Our impact is measured in real environmental benefits that help industries reduce their carbon footprint.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem 
            icon={<Leaf className="w-8 h-8" />} 
            value={150000} 
            label="Tons of CO₂ Reduced Annually" 
            delay={200}
            color={colors.leaf}
          />
          <StatItem 
            icon={<Factory className="w-8 h-8" />} 
            value={500000} 
            label="Tons of Biomass Processed" 
            delay={400}
            color={colors.factory}
          />
          <StatItem 
            icon={<TrendingUp className="w-8 h-8" />} 
            value={35} 
            label="Percent Energy Efficiency Increase" 
            unit="%" 
            delay={600}
            color={colors.trend}
          />
          <StatItem 
            icon={<Wind className="w-8 h-8" />} 
            value={200} 
            label="Direct Market Applications" 
            delay={800}
            color={colors.wind}
          />
        </div>
      </div>
    </section>
  );
};

export default EnhancedAnimatedStats;
