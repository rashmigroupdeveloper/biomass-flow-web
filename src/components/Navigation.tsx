
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

const menuItems = [
  {
    name: 'Home',
    path: '/',
    preview: '/placeholder.svg'
  },
  {
    name: 'About',
    path: '/about',
    preview: '/placeholder.svg'
  },
  {
    name: 'Products',
    path: '/products',
    preview: '/placeholder.svg'
  },
  {
    name: 'Process',
    path: '/process',
    preview: '/placeholder.svg'
  },
  {
    name: 'Impact',
    path: '/impact',
    preview: '/placeholder.svg'
  },
  {
    name: 'Contact',
    path: '/contact',
    preview: '/placeholder.svg'
  }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="logo z-10">
            <Link to="/" className="font-serif text-2xl font-bold text-primary-800 hover:text-primary-600 transition-colors">
              Rashmi<span className="text-primary-500">6</span>
            </Link>
          </div>
          
          <button 
            className="nav-toggle z-10 w-10 h-10 flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-md rounded-full hover:bg-opacity-30 transition-all"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="w-5 h-5 text-primary-800" />
            ) : (
              <Menu className="w-5 h-5 text-primary-800" />
            )}
          </button>
        </div>
      </header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="flex items-center justify-center relative">
                <motion.nav className="text-center lg:text-left w-full px-6 md:px-12">
                  <ul className="space-y-6 md:space-y-8">
                    {menuItems.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        onMouseEnter={() => setActiveItem(index)}
                        onMouseLeave={() => setActiveItem(null)}
                      >
                        <Link 
                          to={item.path} 
                          className="text-3xl md:text-5xl font-serif text-primary-800 hover:text-primary-600 transition-colors relative block"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="relative z-10">{item.name}</span>
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
              
              <div className="hidden lg:block">
                <div className="h-full w-full relative overflow-hidden">
                  <AnimatePresence>
                    {activeItem !== null && (
                      <motion.div
                        key={activeItem}
                        className="absolute inset-0 bg-gray-100"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img 
                          src={menuItems[activeItem].preview} 
                          alt={menuItems[activeItem].name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-20"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {activeItem === null && (
                    <div className="flex items-center justify-center h-full bg-primary-50">
                      <p className="text-primary-800 text-opacity-30 text-2xl font-serif">
                        Hover for preview
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
