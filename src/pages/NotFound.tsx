
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <motion.div 
        className="flex-grow flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-9xl font-bold text-primary-200 mb-8">404</h1>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 max-w-lg mx-auto mb-10">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link 
            to="/" 
            className="px-8 py-3 bg-primary-500 text-white font-medium rounded hover:bg-primary-600 transition-all transform hover:-translate-y-1 inline-flex items-center justify-center"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
      
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

export default NotFound;
