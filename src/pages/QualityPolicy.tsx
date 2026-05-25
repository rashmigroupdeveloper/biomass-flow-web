
import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

const QualityPolicy = () => {
  return (
    <div className="relative bg-white" style={{ overflowX: 'clip' }}>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 bg-primary-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary-800 mb-6">
              Our Quality Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              At Rashmi6, quality is at the heart of everything we do. Our comprehensive quality management system ensures that we deliver products that exceed customer expectations.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Quality Statement Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
                alt="Quality Control"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="md:w-1/2"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
                Our Quality Statement
              </h2>
              <p className="text-gray-600 mb-6">
                "To consistently deliver high-quality, sustainable products that meet or exceed the requirements and expectations of our customers, while continuously improving our processes, systems, and employee skills."
              </p>
              <p className="text-gray-600">
                This quality policy is communicated and understood at all levels of the organization and is regularly reviewed for continued suitability.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Quality Objectives */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-12 text-center">
            Our Quality Objectives
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Customer Satisfaction",
                description: "Achieve and maintain a customer satisfaction rating of 95% or higher through regular feedback and surveys."
              },
              {
                title: "Product Conformity",
                description: "Ensure 99.5% of all products conform to specifications and meet quality standards on the first inspection."
              },
              {
                title: "Continuous Improvement",
                description: "Implement at least 10 process improvements annually based on data analysis and feedback."
              },
              {
                title: "On-Time Delivery",
                description: "Maintain an on-time delivery rate of 98% or better for all customer orders."
              },
              {
                title: "Employee Training",
                description: "Provide an average of 40 hours of quality-related training per employee annually."
              },
              {
                title: "Supplier Performance",
                description: "Evaluate all key suppliers quarterly and maintain an approved supplier rating of 90% or higher."
              }
            ].map((objective, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold text-primary-700 mb-4 flex items-start">
                      <CheckCircle className="mr-3 text-primary-500 mt-1 flex-shrink-0" size={20} />
                      <span>{objective.title}</span>
                    </h3>
                    <p className="text-gray-600">{objective.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Quality Management System */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-12 text-center">
            Our Quality Management System
          </h2>
          
          <div className="space-y-12">
            {[
              {
                title: "ISO 9001:2015 Certification",
                description: "Our quality management system is certified to ISO 9001:2015, demonstrating our commitment to consistent quality and continuous improvement."
              },
              {
                title: "Quality Control Processes",
                description: "We employ rigorous quality control processes throughout our production cycle, from raw material inspection to final product testing."
              },
              {
                title: "Documentation and Records",
                description: "Comprehensive documentation and record-keeping ensure traceability and provide data for analysis and improvement."
              },
              {
                title: "Internal Audits",
                description: "Regular internal audits are conducted to verify compliance with our quality management system and identify opportunities for improvement."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold text-primary-700 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Learn More About Our Quality Commitment
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10">
            Contact us today to discuss how our quality standards can benefit your business.
          </p>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white hover:text-primary-800">
            Contact Us <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QualityPolicy;
