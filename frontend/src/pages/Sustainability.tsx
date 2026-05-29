
import React from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { webPageSchema } from '@/lib/schemas';
import { Card, CardContent } from '@/components/ui/card';
import { Recycle, Globe, TreeDeciduous, Factory, Lightbulb, ChartLine } from 'lucide-react';

const Sustainability = () => {
  return (
    <>
      <SEO
        title="Sustainability | Rashmi 6 Paradigm"
        description="Rashmi 6 Paradigm's sustainability approach — circular economy, carbon neutrality, and long-term environmental stewardship through biomass energy solutions."
        canonical="/sustainability"
        jsonLd={webPageSchema('Sustainability', 'Rashmi 6 Paradigm sustainability commitment and environmental stewardship.', 'https://rashmi6paradigm.com/sustainability')}
      />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-green-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1513836279014-a89f7a76ae86" 
            alt="Sustainability Background" 
            className="w-full h-full object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6">
              Our Sustainability Commitment
            </h1>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-10">
              Creating a sustainable future through innovative biomass solutions that benefit the planet and future generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sustainability Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Sustainability Vision</h2>
              <div className="w-16 h-1 bg-primary-500 mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                At Rashmi 6 Paradigm, sustainability is at the core of everything we do. We believe in creating a balance between economic growth, environmental stewardship, and social well-being.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our vision is to lead the transition to a circular economy where waste becomes a valuable resource, reducing environmental impact while creating economic opportunities.
              </p>
              <p className="text-lg text-gray-700">
                Through innovative biomass solutions, we're working to reduce carbon emissions, minimize waste, and promote sustainable resource management practices across industries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Sustainability Vision" 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-primary-500 opacity-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sustainability Goals Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Sustainability Goals</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We've set ambitious targets to guide our sustainability efforts and measure our progress.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-10 w-10 text-primary-600" />,
                title: "Carbon Neutrality",
                description: "Achieve carbon neutrality in our operations by 2030 through renewable energy adoption, efficiency improvements, and carbon offsets.",
                target: "2030"
              },
              {
                icon: <Recycle className="h-10 w-10 text-primary-600" />,
                title: "Zero Waste",
                description: "Implement zero waste practices across all our facilities, ensuring that 99% of materials are reused, recycled, or composted.",
                target: "2025"
              },
              {
                icon: <Factory className="h-10 w-10 text-primary-600" />,
                title: "Clean Production",
                description: "Reduce water consumption and eliminate hazardous materials from our production processes to minimize environmental impact.",
                target: "Ongoing"
              },
              {
                icon: <TreeDeciduous className="h-10 w-10 text-primary-600" />,
                title: "Biodiversity Protection",
                description: "Support biodiversity conservation through responsible sourcing practices and habitat restoration projects.",
                target: "Ongoing"
              },
              {
                icon: <ChartLine className="h-10 w-10 text-primary-600" />,
                title: "Sustainable Supply Chain",
                description: "Ensure 100% of our suppliers meet our strict environmental and social standards through rigorous assessment and collaborative improvement.",
                target: "2028"
              },
              {
                icon: <Lightbulb className="h-10 w-10 text-primary-600" />,
                title: "Renewable Energy",
                description: "Power all operations with 100% renewable energy through on-site generation and renewable energy procurement.",
                target: "2027"
              }
            ].map((goal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-t-4 border-primary-500 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{goal.icon}</div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-3">{goal.title}</h3>
                    <p className="text-gray-600 mb-4">{goal.description}</p>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-500">Target:</span>
                      <span className="text-sm font-bold text-primary-700 bg-primary-50 px-3 py-1 rounded-full">{goal.target}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainable Practices Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Sustainable Practices</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Implementing practical solutions that drive our sustainability mission forward.
            </p>
          </motion.div>

          <div className="space-y-12">
            {[
              {
                title: "Circular Economy Integration",
                description: "We've implemented a circular economy model that transforms agricultural waste into valuable biomass products, creating a closed-loop system that minimizes waste and maximizes resource efficiency.",
                image: "/icons/recycle.svg",
                points: [
                  "Collection of agricultural residues that would otherwise be burned",
                  "Processing waste materials into high-value biomass products",
                  "Returning nutrients to soil through organic byproducts"
                ]
              },
              {
                title: "Energy Efficient Manufacturing",
                description: "Our manufacturing facilities are designed with energy efficiency as a priority, using advanced technologies to reduce consumption while maintaining high production standards.",
                image: "/icons/quality.svg",
                points: [
                  "Heat recovery systems that capture and reuse thermal energy",
                  "Variable frequency drives to optimize motor efficiency",
                  "Smart monitoring systems to identify and eliminate energy waste"
                ]
              },
              {
                title: "Water Conservation",
                description: "Water is a precious resource, and our facilities implement comprehensive water conservation measures to minimize usage and prevent pollution.",
                image: "/icons/distribution.svg",
                points: [
                  "Closed-loop water systems that recycle process water",
                  "Rainwater harvesting for non-critical operations",
                  "Advanced treatment processes to ensure clean water discharge"
                ]
              }
            ].map((practice, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}
              >
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="w-48 h-48 bg-green-50 rounded-full flex items-center justify-center p-12">
                    <img src={practice.image} alt={practice.title} className="w-full h-auto" />
                  </div>
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold text-primary-800 mb-4">{practice.title}</h3>
                  <p className="text-gray-700 mb-6">{practice.description}</p>
                  <ul className="space-y-2">
                    {practice.points.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-primary-500 mr-2 mt-1">•</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Metrics Section */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Sustainability Impact</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Tracking our progress with measurable metrics that demonstrate our commitment to environmental stewardship.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                metric: "45%", 
                label: "Carbon Reduction", 
                description: "Reduction in carbon emissions through our biomass solutions compared to fossil fuel alternatives."
              },
              { 
                metric: "75%", 
                label: "Waste Diverted", 
                description: "Agricultural waste diverted from burning or landfills and transformed into valuable products."
              },
              { 
                metric: "30%", 
                label: "Energy Efficiency", 
                description: "Improvement in energy efficiency across our operations since implementation of our efficiency program."
              },
              { 
                metric: "85%", 
                label: "Water Recycled", 
                description: "Percentage of process water recycled in our manufacturing facilities."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border-none">
                  <div className="bg-primary-600 py-4">
                    <p className="text-white text-4xl font-bold text-center">{item.metric}</p>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <h3 className="text-xl font-semibold text-primary-800 mb-3 text-center">{item.label}</h3>
                    <p className="text-gray-600 text-center">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Sustainability Certifications</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our commitment to sustainability is validated through internationally recognized certifications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "ISO 14001",
                description: "Environmental Management System certification that ensures we systematically manage our environmental responsibilities."
              },
              {
                name: "FSC Certification",
                description: "Forest Stewardship Council certification ensuring responsible sourcing of forest-derived materials."
              },
              {
                name: "Carbon Trust Standard",
                description: "Recognition for measuring, managing, and reducing our carbon footprint year over year."
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4 h-16">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-primary-700 text-2xl font-bold">{cert.name.split(' ')[0]}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3 text-center">{cert.name}</h3>
                <p className="text-gray-600 text-center">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Sustainability Journey</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg mb-8">
              Partner with us to create a more sustainable future. Let's work together to implement biomass solutions that benefit your business and the environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Contact Us
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/impact"
                className="bg-transparent border border-white text-white hover:bg-white hover:text-primary-700 px-8 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Learn More About Our Impact
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Sustainability;
