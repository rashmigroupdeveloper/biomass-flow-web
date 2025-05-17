
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const Process = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Process steps data
  const processSteps = [
    {
      title: "Raw Material Sourcing",
      description: "We carefully source agricultural residues, forestry waste, and other organic materials from sustainable suppliers. All raw materials undergo strict quality control to ensure they meet our standards.",
      image: "https://images.unsplash.com/photo-1505471768190-275e2ad7abf9?auto=format&fit=crop&w=800&q=80",
      iconBackground: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      title: "Pre-processing",
      description: "Raw materials are cleaned, dried, and ground to achieve optimal moisture content and particle size for processing. This ensures consistency in the final product quality.",
      image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=800&q=80",
      iconBackground: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    {
      title: "Densification/Carbonization",
      description: "For bio pellets, material is compressed under high pressure. For activated carbon and charcoal, material undergoes carefully controlled carbonization at specific temperatures.",
      image: "https://images.unsplash.com/photo-1613585535485-dc11d0995c5f?auto=format&fit=crop&w=800&q=80",
      iconBackground: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Quality Testing",
      description: "Every batch undergoes comprehensive testing for physical properties, chemical composition, and performance characteristics to ensure it meets international standards.",
      image: "https://images.unsplash.com/photo-1581093458791-9d09da4f533f?auto=format&fit=crop&w=800&q=80",
      iconBackground: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "Packaging & Distribution",
      description: "Products are packaged in appropriate materials to maintain quality during transport and storage. We optimize logistics to minimize carbon footprint during distribution.",
      image: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
      iconBackground: "bg-rose-100",
      iconColor: "text-rose-600"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Particle Background */}
          <div className="absolute inset-0 z-0">
            <ParticleCanvas 
              id="processCanvas"
              options={{
                particleCount: 120,
                particleMinSize: 2,
                particleMaxSize: 4,
                baseHue: 140,
                backgroundColor: 'rgba(46, 125, 50, 0.03)',
                flowIntensity: 0.8,
                flowDirection: 'radial',
                speedFactor: 0.5,
                connectionRadius: 140,
                connectionOpacity: 0.1,
                mouseInteraction: true,
                responsive: true,
                densityFactor: 0.00008,
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-800 mb-6">
                Our <span className="text-primary-600">Process</span>
              </h1>
              <p className="text-lg max-w-2xl mx-auto text-gray-700 mb-10">
                From raw material to finished product, our manufacturing process combines traditional knowledge with cutting-edge technology to create sustainable biomass solutions.
              </p>
              <motion.div 
                className="w-24 h-1.5 bg-primary-500 mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
            </motion.div>
          </div>
        </section>

        {/* Manufacturing Process Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-12 text-center">
              Manufacturing Excellence
            </h2>
            
            <div className="space-y-32 mt-16">
              {processSteps.map((step, index) => (
                <ProcessStep 
                  key={step.title}
                  title={step.title}
                  description={step.description}
                  image={step.image}
                  iconBackground={step.iconBackground}
                  iconColor={step.iconColor}
                  stepNumber={index + 1}
                  isReversed={index % 2 !== 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                  Advanced Technology & Innovation
                </h2>
                <p className="text-gray-700 mb-6">
                  Our state-of-the-art manufacturing facilities employ the latest technologies in biomass processing to ensure optimal efficiency, consistency, and environmental performance.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Automated production lines with real-time monitoring</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Precision control systems for optimal carbonization conditions</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Energy recovery systems to maximize resource efficiency</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Advanced emission control for minimal environmental impact</p>
                  </div>
                </div>
                <motion.div className="mt-8">
                  <a 
                    href="#" 
                    className="flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    <span>Learn about our R&D initiatives</span>
                    <ArrowRight size={18} className="ml-2" />
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary-100 rounded-full -z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581094258407-8010c72c367d?auto=format&fit=crop&w=800&q=80" 
                  alt="Advanced manufacturing technology" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-50 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Sustainability Section */}
        <section className="py-16 md:py-24 bg-primary-700 text-white">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-serif font-bold mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                Sustainability at Every Step
              </motion.h2>
              <motion.p
                className="text-lg text-primary-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Our commitment to environmental stewardship is integrated into every stage of our production process.
              </motion.p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SustainabilityCard 
                title="Resource Efficiency" 
                description="We utilize agricultural and forestry by-products, diverting waste from landfills while creating valuable energy resources."
                iconClass="bg-emerald-600"
              />
              <SustainabilityCard 
                title="Energy Conservation" 
                description="Our facilities employ energy recovery systems and optimize processes to minimize energy consumption."
                iconClass="bg-blue-600"
              />
              <SustainabilityCard 
                title="Emissions Reduction" 
                description="Advanced filtration and control systems ensure minimal air and water emissions throughout the production cycle."
                iconClass="bg-amber-600"
              />
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Page Transition */}
      <motion.div
        className="page-transition fixed inset-0 bg-primary-500 z-[100] pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        style={{ transformOrigin: 'top' }}
      />
    </div>
  );
};

interface ProcessStepProps {
  title: string;
  description: string;
  image: string;
  iconBackground: string;
  iconColor: string;
  stepNumber: number;
  isReversed: boolean;
}

const ProcessStep = ({ 
  title, 
  description, 
  image, 
  iconBackground, 
  iconColor, 
  stepNumber, 
  isReversed 
}: ProcessStepProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  
  return (
    <div 
      ref={containerRef} 
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}
    >
      <motion.div
        className={`order-2 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}
        initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? -30 : 30 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-28 h-28 bg-primary-50 rounded-full -z-10"></div>
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <motion.img 
              src={image} 
              alt={title}
              className="w-full h-auto object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center text-lg font-bold text-primary-700">
              {stepNumber}
            </div>
          </div>
          <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-primary-100 rounded-full -z-10"></div>
        </div>
      </motion.div>
      
      <motion.div
        className={`order-1 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
        initial={{ opacity: 0, x: isReversed ? 30 : -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isReversed ? 30 : -30 }}
        transition={{ duration: 0.8 }}
      >
        <div className={`w-16 h-16 ${iconBackground} rounded-full flex items-center justify-center mb-6`}>
          <div className={`text-2xl font-bold ${iconColor}`}>{stepNumber}</div>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4">{title}</h3>
        <p className="text-gray-700 text-lg">{description}</p>
      </motion.div>
    </div>
  );
};

interface SustainabilityCardProps {
  title: string;
  description: string;
  iconClass: string;
}

const SustainabilityCard = ({ title, description, iconClass }: SustainabilityCardProps) => {
  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
      variants={itemVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className={`w-12 h-12 ${iconClass} rounded-full flex items-center justify-center mb-6`}>
        <div className="w-6 h-6 bg-white/80 rounded-full"></div>
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-primary-100">{description}</p>
    </motion.div>
  );
};

export default Process;
