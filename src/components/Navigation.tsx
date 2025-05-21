import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Menu, ChevronDown } from 'lucide-react';

// Updated menu structure with subcategories
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
    preview: '/placeholder.svg',
    submenu: [
      {
        name: 'Bio Pellets',
        path: '/products/bio-pellets',
        preview: '/placeholder.svg'
      },
      {
        name: 'Activated Carbon',
        path: '/products/activated-carbon',
        preview: '/placeholder.svg'
      },
      {
        name: 'Charcoal Briquettes',
        path: '/products/charcoal-briquettes',
        preview: '/placeholder.svg'
      }
    ]
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
    name: 'Sustainability',
    path: '/sustainability',
    preview: '/placeholder.svg'
  },
  {
    name: 'CSR',
    path: '/csr',
    preview: '/placeholder.svg'
  },
  {
    name: 'Media',
    path: '/media',
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
  const [expandedSubmenus, setExpandedSubmenus] = useState<number[]>([]);
  
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
    setExpandedSubmenus([]); // Reset expanded submenus when toggling main menu
  };

  const toggleSubmenu = (index: number) => {
    setExpandedSubmenus(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  // Menu button variants for animation
  const menuButtonVariants = {
    open: { 
      rotate: 90, 
      scale: 1.2,
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
    },
    closed: { 
      rotate: 0, 
      scale: 1,
      transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 20 }
    }
  };
  
  // Menu icon variants for animation
  const menuIconVariants = {
    open: { opacity: 0, y: -10 },
    closed: { opacity: 1, y: 0 },
  };
  
  const closeIconVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 10 },
  };
  
  // Menu overlay variants
  const menuOverlayVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Menu item staggered animation
  const menuListVariants = {
    open: {
      transition: { 
        staggerChildren: 0.07,
        delayChildren: 0.2,
        staggerDirection: 1
      }
    },
    closed: {
      transition: { 
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };
  
  const menuItemVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const submenuItemVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { 
        height: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.3, ease: "easeOut" }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { 
        height: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.2, ease: "easeOut" }
      }
    }
  };

  // Preview image animation
  const previewVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 py-6 px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="logo z-10">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Rashmi6 Logo" 
                className="h-10 md:h-12 w-auto"
              />
            </Link>
          </div>
          
          <motion.button 
            className="nav-toggle z-10 w-12 h-12 flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-md rounded-full hover:bg-opacity-40 transition-all shadow-md"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            variants={menuButtonVariants}
            animate={isOpen ? "open" : "closed"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="absolute"
              variants={menuIconVariants}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-primary-800" />
            </motion.div>
            
            <motion.div 
              className="absolute"
              variants={closeIconVariants}
              animate={isOpen ? "open" : "closed"}
              initial="closed"
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-primary-800" />
            </motion.div>
          </motion.button>
        </div>
      </header>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 overflow-hidden"
            variants={menuOverlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
              <div className="flex items-center justify-center relative">
                <motion.nav 
                  className="text-center lg:text-left w-full px-6 md:px-12 max-h-[90vh] overflow-y-auto py-10 md:py-16"
                  variants={menuListVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <ul className="space-y-7 md:space-y-9">
                    {menuItems.map((item, index) => (
                      <motion.li 
                        key={item.name}
                        variants={menuItemVariants}
                        className="relative"
                        onMouseEnter={() => setActiveItem(index)}
                        onMouseLeave={() => setActiveItem(null)}
                      >
                        {item.submenu ? (
                          <>
                            <button 
                              onClick={() => toggleSubmenu(index)}
                              className="text-3xl md:text-5xl font-serif text-primary-800 hover:text-primary-600 transition-colors relative flex items-center justify-center lg:justify-start group w-full"
                            >
                              <span className="relative z-10">{item.name}</span>
                              <ChevronDown 
                                className={`ml-2 transition-transform duration-300 ${expandedSubmenus.includes(index) ? 'rotate-180' : ''}`}
                                size={expandedSubmenus.includes(index) ? 28 : 24}
                                aria-hidden="true"
                              />
                              <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                            </button>
                            
                            <motion.ul 
                              variants={submenuItemVariants}
                              initial="closed"
                              animate={expandedSubmenus.includes(index) ? "open" : "closed"}
                              className="overflow-hidden pl-6 md:pl-10 mt-3 md:mt-4"
                            >
                              {item.submenu.map((subItem) => (
                                <motion.li 
                                  key={subItem.name}
                                  variants={{
                                    open: { opacity: 1, y: 0 },
                                    closed: { opacity: 0, y: 20 }
                                  }}
                                  className="my-3 md:my-4"
                                >
                                  <Link 
                                    to={subItem.path} 
                                    className="text-xl md:text-2xl font-serif text-primary-700 hover:text-primary-500 transition-colors relative inline-block group"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    <span className="relative z-10">{subItem.name}</span>
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-400 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </>
                        ) : (
                          <Link 
                            to={item.path} 
                            className="text-3xl md:text-5xl font-serif text-primary-800 hover:text-primary-600 transition-colors relative block group"
                            onClick={() => setIsOpen(false)}
                          >
                            <span className="relative z-10">{item.name}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-primary-500 transition-all duration-500 ease-in-out group-hover:w-full"></span>
                          </Link>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
              
              <div className="hidden lg:block">
                <div className="h-full w-full relative overflow-hidden bg-gray-50">
                  <AnimatePresence>
                    {activeItem !== null && (
                      <motion.div
                        key={activeItem}
                        className="absolute inset-0"
                        variants={previewVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                      >
                        <img 
                          src={menuItems[activeItem].preview} 
                          alt={menuItems[activeItem].name} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-20 backdrop-blur-sm flex flex-col items-center justify-center">
                          <motion.h2 
                            className="text-5xl text-white font-serif font-bold drop-shadow-lg mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            {menuItems[activeItem].name}
                          </motion.h2>
                          
                          <motion.div
                            className="w-20 h-1 bg-white rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 80, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                          />
                        </div>
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
