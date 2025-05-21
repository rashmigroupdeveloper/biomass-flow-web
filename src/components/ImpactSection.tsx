
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ParticleCanvas from './ParticleCanvas';

const ImpactSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const carbonChartRef = useRef<HTMLDivElement>(null);
  const emissionsChartRef = useRef<HTMLDivElement>(null);
  const sustainabilityChartRef = useRef<HTMLDivElement>(null);

  // Animation for charts when they come into view
  useEffect(() => {
    if (inView) {
      if (carbonChartRef.current) {
        carbonChartRef.current.style.width = '38%';
      }
      if (emissionsChartRef.current) {
        emissionsChartRef.current.style.width = '65%';
      }
      if (sustainabilityChartRef.current) {
        sustainabilityChartRef.current.style.width = '90%';
      }
    }
  }, [inView]);

  const metrics = [
    {
      title: "Carbon Reduction",
      description: "A 5% reduction in coal consumption through biomass co-firing yields an annual reduction of approximately 38 million metric tons of CO2 emissions.",
      percentage: 38,
      color: "bg-primary-500",
      ref: carbonChartRef
    },
    {
      title: "Reduced Emissions",
      description: "Biomass co-firing effectively lowers net CO2, PM, SO2, and often NOx emissions when compared to coal combustion.",
      percentage: 65,
      color: "bg-primary-600",
      ref: emissionsChartRef
    },
    {
      title: "Carbon Neutrality",
      description: "The subsequent generation of plants effectively offsets the CO2 emissions from the combustion of agro-residues, making it carbon-neutral.",
      percentage: 90,
      color: "bg-primary-700",
      ref: sustainabilityChartRef
    }
  ];

  return (
    <section
      ref={ref}
      className="py-20 md:py-32 bg-primary-50 relative overflow-hidden"
    >
      {/* Environmental Impact Particle Animation */}
      <div className="absolute inset-0 z-0">
        <ParticleCanvas
          id="environmentCanvas"
          options={{
            particleCount: 100,
            particleMinSize: 2,
            particleMaxSize: 5,
            baseHue: 140, // Deeper green for environmental theme
            backgroundColor: 'rgba(46, 125, 50, 0.04)',
            flowIntensity: 0.9,
            flowDirection: 'circular',
            speedFactor: 0.5,
            connectionRadius: 150,
            connectionOpacity: 0.2,
            interactive: true, // Changed from mouseInteraction
            responsive: true,
            densityFactor: 0.00007,
          }}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 impact-text">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-heading">
              Environmental <span className="section-heading-accent">Impact</span>
            </h2>
            <div className="decorative-line mx-auto"></div>
          </motion.div>

          <motion.div
            className="glass-card max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="enhanced-paragraph">
              Our commitment to sustainability goes beyond products. See how we're making a real difference for our planet.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              className="accent-corner-card hover-lift"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="mb-3">
                <h3 className="process-step-title">{metric.title}</h3>
              </div>
              <div className="mb-6">
                <p className="process-step-description">{metric.description}</p>
              </div>

              <div className="mt-6">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Improvement</span>
                  <span className="text-sm font-medium text-primary-600">{metric.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    ref={metric.ref}
                    className={`${metric.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: '0%' }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 glass-card hover-lift"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="section-heading text-center mb-6">Comparison: Coal vs. <span className="section-heading-accent">Biomass Energy</span></h3>

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
