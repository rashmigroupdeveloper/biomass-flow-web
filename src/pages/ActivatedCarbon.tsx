
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';

const ActivatedCarbon = () => {
  const [ref1, inView1] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const [ref2, inView2] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <div className="relative overflow-x-hidden">
      <Navigation />
      
      <div className="pt-24 md:pt-32">
        {/* Hero Section */}
        <div className="bg-primary-50/50 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-800 mb-6">
                Activated Carbon
              </h1>
              <div className="w-20 h-1.5 bg-primary-500 mb-8"></div>
              <p className="text-lg md:text-xl text-gray-700">
                Advanced purification solutions for industrial and environmental applications.
              </p>
            </div>
          </div>
        </div>
        
        {/* Introduction */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                  What is Activated Carbon?
                </h2>
                <div className="w-16 h-1 bg-primary-500 mb-6"></div>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Activated carbon is a highly porous carbonaceous material with a large internal surface area, making it an exceptional adsorbent for various applications. The activation process creates millions of tiny pores between carbon atoms, resulting in a material with remarkable adsorptive properties.
                  </p>
                  <p>
                    The extensive internal surface area, which can range from 500 to 1500 m²/g, allows activated carbon to effectively capture and retain a wide range of contaminants, including organic compounds, chemicals, gases, and particulates. This makes it an invaluable material for purification, filtration, and separation processes across diverse industries.
                  </p>
                  <p>
                    At Rashmi 6 Paradigm Limited, we produce high-quality activated carbon through carefully controlled manufacturing processes, ensuring optimal performance for specific applications. Our commitment to quality and innovation drives us to deliver activated carbon products that meet and exceed industry standards.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-200 rounded-lg z-0"></div>
                <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1613826488249-b67a7c670447" 
                    alt="Activated Carbon" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Types of Activated Carbon */}
        <section ref={ref1} className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Types of Activated Carbon We Produce
              </h2>
              <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer various types of activated carbon to meet the diverse needs of our customers across different industries.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Powdered Activated Carbon (PAC)</h3>
                <p className="text-gray-600">
                  Fine powdered carbon with particle sizes less than 100 µm, ideal for liquid phase applications where maximum surface area contact is required. PAC is commonly used in water treatment, food processing, and pharmaceutical applications.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Granular Activated Carbon (GAC)</h3>
                <p className="text-gray-600">
                  Irregular shaped particles with sizes ranging from 0.2 to 5 mm, designed for both liquid and gas phase applications. GAC is widely used in water treatment, air purification, and industrial processes due to its durability and reusability.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Extruded Activated Carbon (EAC)</h3>
                <p className="text-gray-600">
                  Cylindrical shaped carbon with diameters from 0.8 to 5 mm, featuring low pressure drops and high mechanical strength. EAC is particularly suitable for gas phase applications, such as gas purification, solvent recovery, and air treatment.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Impregnated Carbon</h3>
                <p className="text-gray-600">
                  Activated carbon impregnated with specific chemicals to enhance its capacity for capturing certain gases or compounds. Impregnated carbon is used in specialized applications such as gas masks, air purification systems, and industrial gas filtration.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Pelletized Carbon</h3>
                <p className="text-gray-600">
                  Uniform sized carbon pellets with low dust content and high density, offering superior handling characteristics and low pressure drop. Pelletized carbon is commonly used in vapor phase applications and catalytic processes.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-lg shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-primary-800 mb-3">Specialty Activated Carbon</h3>
                <p className="text-gray-600">
                  Custom-designed activated carbon products with specific properties tailored to meet unique application requirements, such as catalysis support, medical applications, and specialized purification processes.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Applications */}
        <section ref={ref2} className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Applications of Activated Carbon
              </h2>
              <div className="w-24 h-1.5 bg-primary-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Activated carbon plays a crucial role in various industries, providing effective solutions for purification, filtration, and environmental protection.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Water Treatment</h3>
                <ul className="space-y-3 text-gray-600 list-disc pl-5">
                  <li>Removal of organic compounds, chlorine, and disinfection byproducts from municipal water supplies</li>
                  <li>Treatment of industrial wastewater to remove pollutants and hazardous substances</li>
                  <li>Purification of groundwater and surface water sources</li>
                  <li>Removal of taste, odor, and color-causing compounds in drinking water</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Air & Gas Purification</h3>
                <ul className="space-y-3 text-gray-600 list-disc pl-5">
                  <li>Removal of volatile organic compounds (VOCs) from industrial emissions</li>
                  <li>Air purification in HVAC systems for commercial and residential buildings</li>
                  <li>Capture of harmful gases and odors in industrial processes</li>
                  <li>Gas mask filters for personal protection against toxic gases</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Food & Beverage Industry</h3>
                <ul className="space-y-3 text-gray-600 list-disc pl-5">
                  <li>Decolorization and purification of sugar syrups and sweeteners</li>
                  <li>Removal of impurities and off-flavors in alcoholic beverages</li>
                  <li>Purification of edible oils and fats</li>
                  <li>Decaffeination of coffee and tea</li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-2xl font-serif font-bold text-primary-800 mb-4">Pharmaceutical & Medical</h3>
                <ul className="space-y-3 text-gray-600 list-disc pl-5">
                  <li>Purification of pharmaceutical ingredients and intermediates</li>
                  <li>Removal of toxins in medical treatments such as hemoperfusion</li>
                  <li>Component in drug delivery systems</li>
                  <li>Treatment of poisoning and drug overdoses</li>
                </ul>
              </motion.div>
            </div>
            
            <div className="mt-12 text-center">
              <a href="/contact" className="interactive group px-8 py-3 bg-primary-500 text-white font-medium rounded overflow-hidden relative hover:bg-primary-600 transition-colors duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center">
                <span className="relative z-10">Contact Us Today</span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </a>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      
      {/* Grain Texture Overlay */}
      <div 
        className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAOh0lEQVR4nO1dbVczNw69JCEvBJInEEIgEIb//6/6fbu73e77tt0P1o2vZQ3QPgk9nMP9dM+ZzIztWJYlWZJlnRsAxVUl58z5iLgyKbBCL/0oF09+fq6KiJB/tps3zXVFWZ3bGl+9/XP8tlh8V359qbMh/rr8fpr+7uSouhrfzKslOvtQnNS5vDh5StpEg9RSnydnyGnI+dzст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")'
        }}
      ></div>
      
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

export default ActivatedCarbon;
