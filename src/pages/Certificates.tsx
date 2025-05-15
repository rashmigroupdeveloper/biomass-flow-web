
import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Download } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Certificates = () => {
  // Sample certificates data
  const certificates = [
    {
      title: "ISO 9001:2015",
      description: "Quality Management System Certification",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      validUntil: "December 2025"
    },
    {
      title: "ISO 14001:2015",
      description: "Environmental Management System Certification",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      validUntil: "November 2024"
    },
    {
      title: "FSC Certification",
      description: "Forest Stewardship Council Chain of Custody",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      validUntil: "March 2026"
    },
    {
      title: "PEFC Certification",
      description: "Programme for the Endorsement of Forest Certification",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      validUntil: "June 2025"
    },
    {
      title: "Carbon Trust Standard",
      description: "Carbon Footprint Reduction Certification",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
      validUntil: "September 2024"
    },
    {
      title: "OHSAS 18001",
      description: "Occupational Health and Safety Management",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      validUntil: "February 2025"
    }
  ];

  return (
    <div className="relative overflow-x-hidden bg-white">
      {/* Navigation */}
      <Navigation />
      
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
              Our Certifications
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Rashmi6 operates with the highest industry standards. Our certifications demonstrate our commitment to quality, sustainability, and responsible business practices.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Certificates Grid */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={certificate.image} 
                        alt={certificate.title} 
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-4 right-4 bg-primary-500 text-white py-1 px-3 rounded-full text-sm">
                      Valid until {certificate.validUntil}
                    </div>
                  </div>
                  <CardContent className="pt-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-primary-700 mb-2">{certificate.title}</h3>
                    <p className="text-gray-600 mb-6">{certificate.description}</p>
                    <div className="mt-auto">
                      <Button variant="outline" size="sm" className="flex gap-2">
                        <FileText size={16} />
                        View Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Certification Process */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-12 text-center">
            Our Certification Process
          </h2>
          
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Rigorous Assessment</h3>
                <p className="text-gray-600 mb-4">
                  Our certification process begins with a comprehensive assessment of our operations, systems, and practices against international standards.
                </p>
                <p className="text-gray-600">
                  Independent third-party auditors conduct thorough evaluations to ensure compliance with all requirements.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img 
                  src="https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
                  alt="Certification Assessment" 
                  className="w-full h-auto"
                />
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="rounded-2xl overflow-hidden shadow-lg md:order-1 order-2"
              >
                <img 
                  src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9"
                  alt="Continuous Improvement" 
                  className="w-full h-auto"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="md:order-2 order-1"
              >
                <h3 className="text-2xl font-bold text-primary-700 mb-4">Continuous Improvement</h3>
                <p className="text-gray-600 mb-4">
                  Certification is not a one-time achievement. We maintain our certifications through ongoing monitoring, regular audits, and continuous improvement.
                </p>
                <p className="text-gray-600">
                  Our team is committed to staying ahead of industry standards and implementing best practices across all areas of operation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Download Pack Section */}
      <section className="py-20 px-6 md:px-12 bg-primary-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-6">
            Download Our Certificate Pack
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Need our certificates for your records? Download our complete certification package in a single convenient file.
          </p>
          <Button size="lg" className="rounded-full px-8 bg-primary-500 hover:bg-primary-600 inline-flex items-center">
            <Download className="mr-2" size={20} />
            Download Certificate Pack
          </Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Questions About Our Certifications?
          </h2>
          <p className="text-lg md:text-xl text-primary-100 mb-10">
            Contact our quality assurance team for more information about our certifications and quality standards.
          </p>
          <Button size="lg" variant="outline" className="rounded-full px-8 border-white text-white hover:bg-white hover:text-primary-800">
            Contact Us <ArrowRight className="ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
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

export default Certificates;
