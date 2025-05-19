
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
    
    // Handle scroll events
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Links data
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', hasChildren: true, children: [
      { name: 'Bio Pellets', path: '/products/bio-pellets' },
      { name: 'Activated Carbon', path: '/products/activated-carbon' },
      { name: 'Charcoal Briquettes', path: '/products/charcoal-briquettes' },
    ]},
    { name: 'Process', path: '/process' },
    { name: 'Impact', path: '/impact' },
    { name: 'Contact', path: '/contact' }
  ];

  const headerClasses = cn(
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
    {
      'bg-white/95 backdrop-blur-sm shadow-sm border-gray-200': scrolled,
      'bg-transparent border-transparent': !scrolled
    }
  );

  // Animation variants
  const navigationVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring',
        stiffness: 100,
        duration: 0.3,
        delay: 0.1
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * i,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };
  
  const mobileNavVariants = {
    closed: { 
      x: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    open: { 
      x: '0%',
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.1
      }
    }
  };
  
  const mobileNavItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };
  
  const mobileChildLinkVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };
  
  // Custom hover effect for desktop menu items
  const hoverEffect = {
    whileHover: { scale: 1.03 }
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <header className={headerClasses}>
      <motion.div 
        className="container mx-auto px-6 py-4 flex items-center justify-between"
        variants={navigationVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <Link to="/" className="z-50 relative">
          <motion.div 
            className="flex items-center gap-2" 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img 
              src="/logo.png" 
              alt="Rashmi 6 Paradigm Logo" 
              className="h-10 w-auto"
            />
            <span className="text-xl font-medium text-primary-800">Rashmi 6</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link, index) => (
            <motion.div
              key={link.name}
              custom={index}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              className="relative"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {link.hasChildren ? (
                <div className="relative group">
                  <button 
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary-600 ${
                      location.pathname.includes('/products') ? 'text-primary-600' : (scrolled ? 'text-gray-800' : 'text-gray-800')
                    }`}
                  >
                    {link.name}
                    <span className="ml-1">▾</span>
                  </button>
                  
                  <motion.div 
                    className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50 invisible group-hover:visible"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0, 
                      y: hoveredIndex === index ? 0 : 10,
                      height: hoveredIndex === index ? 'auto' : 0
                    }}
                    transition={{ 
                      duration: 0.2,
                      ease: [0.04, 0.62, 0.23, 0.98] 
                    }}
                  >
                    <div className="py-1">
                      {link.children?.map((childLink, childIndex) => (
                        <motion.div
                          key={childLink.name}
                          variants={mobileChildLinkVariants}
                          whileHover={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}
                        >
                          <Link
                            to={childLink.path}
                            className={`block px-4 py-2 text-sm ${
                              location.pathname === childLink.path 
                              ? 'text-primary-600 font-medium' 
                              : 'text-gray-700'
                            }`}
                          >
                            {childLink.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ) : (
                <motion.div {...hoverEffect}>
                  <Link
                    to={link.path}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover:text-primary-600 ${
                      location.pathname === link.path 
                      ? 'text-primary-600' 
                      : (scrolled ? 'text-gray-800' : 'text-gray-800')
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              )}
              
              {location.pathname === link.path && !link.hasChildren && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full mx-4"
                  layoutId="navbar-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          ))}
          
          <motion.div
            variants={navItemVariants}
            custom={links.length}
            initial="hidden"
            animate="visible"
          >
            <Link 
              to="/contact" 
              className="ml-4 px-4 py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </nav>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${
              isOpen ? 'text-gray-900' : (scrolled ? 'text-gray-900' : 'text-gray-800')
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.div>
      
      {/* Mobile Navigation */}
      <motion.div
        className="md:hidden fixed inset-y-0 right-0 w-full bg-white z-40 shadow-xl"
        variants={mobileNavVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="h-full flex flex-col pt-20 pb-6 px-6 overflow-y-auto">
          <div className="flex-grow">
            {links.map((link, index) => (
              <motion.div
                key={link.name}
                variants={mobileNavItemVariants}
                className="py-2"
              >
                {link.hasChildren ? (
                  <div className="mb-2">
                    <h3 className="font-medium text-lg text-gray-900 mb-2">{link.name}</h3>
                    <div className="pl-4 border-l-2 border-primary-200 space-y-2">
                      {link.children?.map((childLink) => (
                        <motion.div
                          key={childLink.name}
                          variants={mobileChildLinkVariants}
                          whileTap={{ scale: 0.97 }}
                        >
                          <Link
                            to={childLink.path}
                            className={`block py-1 ${
                              location.pathname === childLink.path 
                              ? 'text-primary-600 font-medium' 
                              : 'text-gray-700'
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {childLink.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div whileTap={{ scale: 0.97 }}>
                    <Link
                      to={link.path}
                      className={`block py-2 text-lg ${
                        location.pathname === link.path 
                        ? 'text-primary-600 font-medium' 
                        : 'text-gray-900'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div variants={mobileNavItemVariants} className="pt-4 mt-6 border-t border-gray-200">
            <Link 
              to="/contact" 
              className="block w-full py-3 px-4 rounded-md text-center font-medium bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-300"
              onClick={() => setIsOpen(false)}
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navigation;
