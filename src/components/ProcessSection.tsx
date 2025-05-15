
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    id: 1,
    title: "Raw Material Collection",
    description: "Agro and Wood Waste is procured from farmers and compiled into bales, providing additional income for farmers while repurposing agricultural waste.",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    title: "Processing & Cleaning",
    description: "Bales are processed in our state-of-the-art facility where they are cleaned, dried, and prepared for pelletization.",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    title: "Pelletization",
    description: "Processed material is transformed into high-quality Bio Mass Pellets through our precision engineering process.",
    image: "/placeholder.svg"
  },
  {
    id: 4,
    title: "Green Energy Generation",
    description: "The final pellets are used by various industries for green power generation, reducing carbon footprints and supporting sustainable practices.",
    image: "/placeholder.svg"
  }
];

const ProcessSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Our <span className="text-primary-500">Process</span>
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto text-gray-600"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            From raw agricultural waste to sustainable energy solutions. Discover how we transform waste materials into valuable energy resources.
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-primary-100"></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="mb-24 last:mb-0"
            >
              <div className={`flex flex-col items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                {/* Process step marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-primary-500 z-10"></div>
                
                {/* Content */}
                <motion.div 
                  className={`lg:w-1/2 p-6 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <span className="inline-block bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium mb-2">
                    Step {step.id}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
                
                {/* Image */}
                <motion.div 
                  className={`mt-6 lg:mt-0 lg:w-1/2 ${index % 2 === 0 ? 'lg:pl-16' : 'lg:pr-16'}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                >
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
