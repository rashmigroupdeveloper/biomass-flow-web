
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const navbarClasses = scrolled 
    ? "bg-white shadow-md py-3 backdrop-blur-md bg-opacity-90"
    : "bg-transparent py-5";

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Process', path: '/process' },
    { name: 'Contact', path: '/contact' }
  ];
  
  // Enhanced animations
  const menuVariants = {
    closed: { 
      opacity: 0,
      x: 20,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClasses}`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo with animated transition */}
          <Logo size={scrolled ? 'small' : 'medium'} />
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path));
                
              return (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={item.path}
                    className={`relative text-${isActive ? 'primary-600 font-medium' : 'gray-700'} hover:text-primary-500 transition-colors px-1 py-2`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-primary-500 w-full rounded-full"
                        layoutId="navIndicator"
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
            
            {/* CTAs */}
            <motion.button
              className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.button>
            
            <motion.button
              className="bg-primary-500 text-white px-4 py-2 rounded-md font-medium"
              whileHover={{ scale: 1.05, backgroundColor: '#2e7d32' }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact Us
            </motion.button>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="text-gray-700 focus:outline-none"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg overflow-hidden"
          >
            <motion.nav 
              className="container mx-auto px-6 py-4"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path));
                  
                return (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    className="py-2"
                  >
                    <Link 
                      to={item.path}
                      className={`block text-lg ${isActive ? 'text-primary-600 font-medium' : 'text-gray-700'}`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div className="mt-4 flex gap-4" variants={itemVariants}>
                <button className="bg-primary-50 text-primary-600 px-4 py-2 rounded-md font-medium w-full">
                  Get a Quote
                </button>
                <button className="bg-primary-500 text-white px-4 py-2 rounded-md font-medium w-full">
                  Contact Us
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navigation;
