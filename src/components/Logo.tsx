
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ className, size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8',
    medium: 'h-10',
    large: 'h-16'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/b8ae8a7d-fba7-4a4d-860f-81420e70265f.png" 
          alt="Rashmi 6 Paradigm Limited" 
          className={`${sizeClasses[size]} w-auto`}
        />
      </Link>
    </motion.div>
  );
};

export default Logo;
