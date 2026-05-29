
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Logo: React.FC = () => {
  return (
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
  );
};

export default Logo;
