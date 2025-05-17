
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  index: number;
}

const Products = () => {
  const products = [
    {
      title: "Bio Pellets",
      description: "Our premium bio pellets are manufactured from agricultural residues and forestry waste. They provide a sustainable alternative to fossil fuels with high energy density and low moisture content.",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?auto=format&fit=crop&w=800&q=80",
      link: "/products/bio-pellets"
    },
    {
      title: "Activated Carbon",
      description: "Our activated carbon products are produced through a carefully controlled carbonization process, resulting in highly porous material ideal for filtration, purification, and deodorization applications.",
      image: "https://images.unsplash.com/photo-1635859890087-7c021fad9427?auto=format&fit=crop&w=800&q=80",
      link: "/products/activated-carbon"
    },
    {
      title: "Charcoal Briquettes",
      description: "Made from compressed biomass carbonized under controlled conditions, our charcoal briquettes offer consistent heat output, minimal smoke, and extended burning time for various commercial and domestic applications.",
      image: "https://images.unsplash.com/photo-1551131618-3f8e05697a5d?auto=format&fit=crop&w=800&q=80",
      link: "/products/charcoal-briquettes"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation />
      
      <main className="flex-grow pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-primary-50">
          <motion.div 
            className="container mx-auto px-6 md:px-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-800 mb-6">
              Our <span className="text-primary-600">Products</span>
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-gray-700 mb-10">
              Discover our range of sustainable biomass solutions designed to meet your energy needs while reducing environmental impact.
            </p>
            <motion.div 
              className="w-24 h-1.5 bg-primary-500 mx-auto"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </section>

        {/* Products Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product, index) => (
                <ProductCard 
                  key={product.title}
                  title={product.title}
                  description={product.description}
                  image={product.image}
                  link={product.link}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Quality Assurance Section */}
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
                  Quality Assurance & Sustainability Standards
                </h2>
                <p className="text-gray-700 mb-6">
                  All our products undergo rigorous quality control measures to ensure they meet international standards for performance, safety, and environmental impact. Our manufacturing processes are certified to ISO 9001:2015 and ISO 14001:2015 standards.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Stringent raw material selection and testing</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Advanced manufacturing technologies with precise control</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Comprehensive product testing before distribution</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-1 mr-3">
                      <div className="w-3 h-3 bg-primary-500 rounded-full" />
                    </div>
                    <p className="text-gray-700">Complete traceability from raw material to finished product</p>
                  </div>
                </div>
                <motion.div className="mt-8">
                  <Link 
                    to="/certificates" 
                    className="flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    <span>View our certifications</span>
                    <ArrowRight size={18} className="ml-2" />
                  </Link>
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
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&w=800&q=80" 
                  alt="Quality testing in laboratory" 
                  className="w-full h-auto rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary-50 rounded-full -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary-700 text-white relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-full opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <motion.div 
            className="container mx-auto px-6 md:px-12 text-center relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6">
              Ready to Make the Sustainable Switch?
            </h2>
            <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto mb-10">
              Our team is ready to help you find the perfect biomass solution for your specific needs.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/contact" 
                className="inline-flex items-center px-8 py-3 bg-white text-primary-700 font-medium rounded-md hover:bg-primary-50 transition-colors duration-300 shadow-lg"
              >
                Contact Our Experts
                <ArrowRight size={18} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
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

const ProductCard = ({ title, description, image, link, index }: ProductCardProps) => {
  return (
    <motion.div 
      className="flex flex-col h-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay: index * 0.2 }
        }
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <div className="relative h-60 overflow-hidden">
        <motion.img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-primary-800 mb-3">{title}</h3>
        <p className="text-gray-700 mb-6 flex-grow">{description}</p>
        <Link 
          to={link}
          className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 mt-auto group"
        >
          <span>Learn more</span>
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default Products;
