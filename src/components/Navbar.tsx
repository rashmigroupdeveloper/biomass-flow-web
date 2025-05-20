
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  label: string;
  children?: React.ReactNode;
  isActive: boolean;
}

interface DropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownProps> = ({ isOpen, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const NavItem: React.FC<NavItemProps> = ({ to, label, children, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const hasDropdown = !!children;

  return (
    <div ref={ref} className="relative">
      <div 
        className="group flex items-center"
        onMouseEnter={() => hasDropdown && setIsOpen(true)}
        onMouseLeave={() => hasDropdown && setIsOpen(false)}
      >
        {hasDropdown ? (
          <button
            className={cn(
              "flex items-center px-4 py-2 text-sm font-medium",
              isActive ? "text-green-700" : "text-gray-700 hover:text-green-600"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {label}
            <ChevronDownIcon 
              className={cn(
                "ml-1 h-4 w-4 transition-transform duration-200", 
                isOpen ? "rotate-180" : ""
              )} 
            />
          </button>
        ) : (
          <NavLink
            to={to}
            className={({ isActive }) =>
              cn(
                "px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "text-green-700 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500"
                  : "text-gray-700 hover:text-green-600"
              )
            }
          >
            {label}
          </NavLink>
        )}
      </div>

      {hasDropdown && (
        <DropdownMenu isOpen={isOpen}>
          {children}
        </DropdownMenu>
      )}
    </div>
  );
};

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="text-xl font-bold text-green-600">Biomass Flow</span>
              </motion.div>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-1">
            <NavItem to="/" label="Home" isActive={location.pathname === '/'} />
            <NavItem to="/about" label="About" isActive={location.pathname === '/about'} />
            
            <NavItem 
              to="/products/bio-pellets" 
              label="Products" 
              isActive={location.pathname.includes('/products')}
            >
              <div className="py-1">
                <NavLink
                  to="/products/bio-pellets"
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-sm",
                      isActive
                        ? "text-green-700 bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    )
                  }
                >
                  Bio Pellets
                </NavLink>
                <NavLink
                  to="/products/activated-carbon"
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-sm",
                      isActive
                        ? "text-green-700 bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    )
                  }
                >
                  Activated Carbon
                </NavLink>
                <NavLink
                  to="/products/charcoal-briquettes"
                  className={({ isActive }) =>
                    cn(
                      "block px-4 py-2 text-sm",
                      isActive
                        ? "text-green-700 bg-gray-100"
                        : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                    )
                  }
                >
                  Charcoal Briquettes
                </NavLink>
              </div>
            </NavItem>
            
            <NavItem to="/process" label="Process" isActive={location.pathname === '/process'} />
            <NavItem to="/impact" label="Impact" isActive={location.pathname === '/impact'} />
            <NavItem to="/sustainability" label="Sustainability" isActive={location.pathname === '/sustainability'} />
            <NavItem to="/csr" label="CSR" isActive={location.pathname === '/csr'} />
            <NavItem to="/certificates" label="Certificates" isActive={location.pathname === '/certificates'} />
            <NavItem to="/contact" label="Contact" isActive={location.pathname === '/contact'} />
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <XIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                About
              </NavLink>
              
              <div className="relative">
                <div className="px-3 py-2 font-medium text-gray-700">
                  Products
                </div>
                <div className="pl-6 border-l-2 border-gray-200 ml-3 mt-1">
                  <NavLink
                    to="/products/bio-pellets"
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                      )
                    }
                  >
                    Bio Pellets
                  </NavLink>
                  <NavLink
                    to="/products/activated-carbon"
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                      )
                    }
                  >
                    Activated Carbon
                  </NavLink>
                  <NavLink
                    to="/products/charcoal-briquettes"
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2 rounded-md text-sm font-medium",
                        isActive
                          ? "bg-green-50 text-green-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
                      )
                    }
                  >
                    Charcoal Briquettes
                  </NavLink>
                </div>
              </div>
              
              <NavLink
                to="/process"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Process
              </NavLink>
              <NavLink
                to="/impact"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Impact
              </NavLink>
              <NavLink
                to="/sustainability"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Sustainability
              </NavLink>
              <NavLink
                to="/csr"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                CSR
              </NavLink>
              <NavLink
                to="/certificates"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Certificates
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-md text-base font-medium",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )
                }
              >
                Contact
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 
