
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default DropdownMenu;
