import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  isOpen: boolean;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
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
          to="/media"
          className={({ isActive }) =>
            cn(
              "block px-3 py-2 rounded-md text-base font-medium",
              isActive
                ? "bg-green-50 text-green-700"
                : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
            )
          }
        >
          Media
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
  );
};

export default MobileNavigation;
