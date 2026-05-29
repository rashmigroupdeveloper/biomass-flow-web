
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type AnimationType = 'shine' | 'fill' | 'ripple' | 'border';

interface EnhancedButtonProps {
  to?: string;
  href?: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  animationType?: AnimationType;
  className?: string;
  onClick?: () => void;
}

const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  to,
  href,
  children,
  variant = 'primary',
  animationType = 'shine',
  className = '',
  onClick
}) => {
  const baseClasses = "relative overflow-hidden px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-primary-500 text-white hover:bg-primary-600",
    secondary: "bg-white text-primary-800 hover:bg-gray-100",
    outline: "border border-primary-500 text-primary-500 hover:bg-primary-50",
  };
  
  const buttonContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Animation Effects */}
      {animationType === 'shine' && (
        <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-all duration-1000 group-hover:left-[100%]"></span>
      )}
      
      {animationType === 'fill' && (
        <span className="absolute inset-0 w-full h-full bg-primary-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out -z-10"></span>
      )}
      
      {animationType === 'ripple' && (
        <span className="absolute inset-0 w-0 h-0 bg-white/20 rounded-full transform -translate-x-1/2 -translate-y-1/2 group-hover:w-[300%] group-hover:h-[300%] transition-all duration-700 origin-center"></span>
      )}
      
      {animationType === 'border' && (
        <>
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary-200 group-hover:w-full transition-all duration-300 ease-out"></span>
          <span className="absolute right-0 top-0 h-[2px] w-0 bg-primary-200 group-hover:w-full transition-all duration-300 ease-out"></span>
          <span className="absolute left-0 top-0 h-0 w-[2px] bg-primary-200 group-hover:h-full transition-all duration-300 ease-out"></span>
          <span className="absolute right-0 bottom-0 h-0 w-[2px] bg-primary-200 group-hover:h-full transition-all duration-300 ease-out"></span>
        </>
      )}
    </>
  );

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${className} group`;
  
  if (to) {
    return <Link to={to} className={allClasses}>{buttonContent}</Link>;
  } else if (href) {
    return <a href={href} className={allClasses} target="_blank" rel="noopener noreferrer">{buttonContent}</a>;
  } else {
    return <button onClick={onClick} className={allClasses}>{buttonContent}</button>;
  }
};

export default EnhancedButton;
