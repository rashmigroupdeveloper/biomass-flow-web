
import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, HandHeart, Users, TreeDeciduous, Earth, Award } from 'lucide-react';

const CSR = () => {
  return (
    <>
      <Helmet>
        <title>Corporate Social Responsibility | Rashmi 6 Paradigm</title>
        <meta name="description" content="Our commitment to corporate social responsibility and community development through sustainable biomass solutions." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-800 mb-6">
              Corporate Social Responsibility
            </h1>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-8"></div>
            <p className="text-lg text-gray-700 mb-10">
              Our commitment to making a positive impact on society, communities, and the environment through sustainable business practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CSR Vision Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Vision for Responsibility</h2>
              <div className="w-16 h-1 bg-primary-500 mb-6"></div>
              <p className="text-lg text-gray-700 mb-6">
                At Rashmi 6 Paradigm, corporate social responsibility is integral to our business model. We believe that sustainable growth can only be achieved through practices that benefit society and protect our environment.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our CSR initiatives focus on three key areas: Environmental Stewardship, Community Development, and Ethical Business Practices. Through these pillars, we aim to create lasting positive impacts beyond our commercial operations.
              </p>
              <p className="text-lg text-gray-700">
                We are committed to the United Nations Sustainable Development Goals and continuously strive to align our business operations with these global objectives.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                alt="CSR Vision" 
                className="rounded-lg shadow-xl w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-primary-500 rounded-lg opacity-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CSR Pillars Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Our CSR Pillars</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our CSR strategy is built on these essential pillars that guide our actions and commitments.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-primary-600" />,
                title: "Ethical Business",
                description: "We maintain the highest standards of ethics and transparency across all our business operations, ensuring fair dealings with stakeholders and partners."
              },
              {
                icon: <Earth className="h-10 w-10 text-primary-600" />,
                title: "Environmental Protection",
                description: "Our commitment to environmental protection extends beyond compliance, implementing sustainable practices throughout our value chain."
              },
              {
                icon: <Users className="h-10 w-10 text-primary-600" />,
                title: "Community Development",
                description: "We actively engage with and invest in local communities, supporting education, healthcare, and economic development initiatives."
              },
              {
                icon: <TreeDeciduous className="h-10 w-10 text-primary-600" />,
                title: "Sustainable Resources",
                description: "Promoting responsible sourcing and resource management to ensure long-term environmental sustainability."
              },
              {
                icon: <HandHeart className="h-10 w-10 text-primary-600" />,
                title: "Social Impact",
                description: "Creating meaningful social impact through targeted programs that address specific needs in the communities where we operate."
              },
              {
                icon: <Award className="h-10 w-10 text-primary-600" />,
                title: "Governance",
                description: "Strong governance frameworks ensure accountability, compliance, and ethical decision-making across all levels of our organization."
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="pt-6">
                    <div className="mb-4">{pillar.icon}</div>
                    <h3 className="text-xl font-semibold text-primary-800 mb-3">{pillar.title}</h3>
                    <p className="text-gray-600">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR Initiatives Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Our Initiatives</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Discover our ongoing initiatives that make a difference in communities and the environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-green-50 rounded-lg p-8 border-l-4 border-primary-500"
            >
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Green Education Program</h3>
              <p className="text-gray-700 mb-6">
                Our flagship initiative focuses on educating future generations about sustainable practices and environmental conservation. We partner with schools to implement green curricula and hands-on learning experiences.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Workshops on sustainable farming and waste management
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  School garden programs promoting organic growing methods
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Educational materials on renewable energy and conservation
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-green-50 rounded-lg p-8 border-l-4 border-primary-500"
            >
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Community Empowerment</h3>
              <p className="text-gray-700 mb-6">
                We support local communities by creating sustainable employment opportunities and providing training in biomass processing techniques, helping to build resilient local economies.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Skills development programs for agricultural waste management
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Entrepreneurship opportunities in the green economy
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Financial support for community-driven environmental projects
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-green-50 rounded-lg p-8 border-l-4 border-primary-500"
            >
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Reforestation Projects</h3>
              <p className="text-gray-700 mb-6">
                Our commitment to environmental restoration includes large-scale reforestation efforts in areas affected by deforestation, promoting biodiversity and carbon sequestration.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Annual tree planting drives with community participation
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Native species restoration programs
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Long-term forest maintenance and monitoring
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-green-50 rounded-lg p-8 border-l-4 border-primary-500"
            >
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Clean Water Initiative</h3>
              <p className="text-gray-700 mb-6">
                We're committed to improving access to clean water in rural areas through the implementation of sustainable water management systems and filtration technologies.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Installation of water purification systems in underserved areas
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Rainwater harvesting projects for sustainable water supply
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2">✓</span>
                  Education on water conservation practices
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-16 bg-primary-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">Our Impact in Numbers</h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6"></div>
            <p className="text-lg max-w-3xl mx-auto">
              Measuring our progress and impact through meaningful metrics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Trees Planted" },
              { number: "25+", label: "Community Projects" },
              { number: "5,000+", label: "People Trained" },
              { number: "30%", label: "Carbon Reduction" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white bg-opacity-10 rounded-lg p-8 hover:bg-opacity-20 transition-all duration-300">
                  <p className="text-4xl font-bold text-white mb-2">{metric.number}</p>
                  <p className="text-lg text-gray-200">{metric.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-primary-800 mb-6">Join Our CSR Journey</h2>
            <div className="w-16 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 mb-8">
              Partner with us in our mission to create sustainable impact. Whether you're an individual, business, or organization, there are many ways to get involved.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/contact"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Contact Us
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/impact"
                className="bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Learn More
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default CSR;
