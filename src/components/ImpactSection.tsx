import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleCanvas, { ParticleCanvasRef } from './ParticleCanvas';

// Fix the impact stats
const impactStats = [
  { label: 'Waste Repurposed', value: '50,000+', suffix: 'Tons', description: 'Agricultural and wood waste diverted from landfills and open burning' },
  { label: 'CO₂ Reduction', value: '75,000+', suffix: 'Tons', description: 'Carbon dioxide emissions prevented through sustainable practices' },
  { label: 'Energy Generated', value: '120+', suffix: 'GWh', description: 'Clean energy produced from our biomass products annually' },
  { label: 'Farmer Partnerships', value: '2,500+', suffix: '', description: 'Local farmers benefiting from our waste-to-energy initiatives' }
];

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });
  
  const particleRef = useRef<ParticleCanvasRef>(null);
  
  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 bg-primary-900 text-white relative overflow-hidden"
    >
      {/* Impact section particle animation with different style */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas 
          id="impactCanvas"
          options={{
            particleCount: 200,
            particleSize: 3, // Combined min/max into one value
            particleColor: '#81c784',
            backgroundColor: 'rgba(27, 94, 32, 0.5)',
            flowSpeed: 0.8,
            flowDirection: 'wave',
            interactionStrength: 1.0,
            connectionRadius: 150,
            colorVariation: 10,
            densityFactor: 0.00012,
          }}
          ref={particleRef}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Environmental <span className="text-primary-500">Impact</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our commitment to sustainability goes beyond products. See how we're making a real difference for our planet.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactStats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{stat.label}</h3>
              <p className="text-gray-600 mb-6">{stat.description}</p>
              
              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Improvement</span>
                  <span className="text-sm font-medium text-primary-600">{stat.value}{stat.suffix}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="h-2.5 rounded-full transition-all duration-1000 ease-out" 
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center">Comparison: Coal vs. Biomass Energy</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary-800">Traditional Coal</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-red-500 rounded-full mr-3"></span>
                  <span>High CO₂ emissions</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-red-500 rounded-full mr-3"></span>
                  <span>Non-renewable resource</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-red-500 rounded-full mr-3"></span>
                  <span>High sulfur content</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-red-500 rounded-full mr-3"></span>
                  <span>Mining damages ecosystems</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-red-500 rounded-full mr-3"></span>
                  <span>Contributes to air pollution</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4 text-primary-500">Biomass Energy</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-3"></span>
                  <span>Carbon neutral lifecycle</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-3"></span>
                  <span>Renewable resource</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-3"></span>
                  <span>Lower sulfur emissions</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-3"></span>
                  <span>Utilizes agricultural waste</span>
                </li>
                <li className="flex items-center text-gray-600">
                  <span className="w-5 h-5 bg-green-500 rounded-full mr-3"></span>
                  <span>Reduces landfill waste</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
