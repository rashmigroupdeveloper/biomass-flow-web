
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface EnhancedButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fill' | 'shine' | 'ripple' | 'border';
  hoverScale?: boolean;
}

const EnhancedButton = ({ 
  children, 
  className, 
  animationType = 'shine', 
  hoverScale = true, 
  ...props 
}: EnhancedButtonProps) => {
  const [rippleArray, setRippleArray] = useState<{x: number, y: number, size: number}[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    
    const newRipple = { x, y, size };
    
    setRippleArray([...rippleArray, newRipple]);
    
    // Remove the ripple after animation completes
    setTimeout(() => {
      setRippleArray(prev => prev.filter(ripple => ripple !== newRipple));
    }, 1000);
  };

  return (
    <Button
      {...props}
      className={cn(
        "relative overflow-hidden group",
        hoverScale && "transition-transform duration-300 hover:-translate-y-1",
        className
      )}
      onClick={(e) => {
        if (animationType === 'ripple') {
          addRipple(e);
        }
        props.onClick?.(e);
      }}
    >
      {/* Content */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Shine effect */}
      {animationType === 'shine' && (
        <span 
          className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform transition-all duration-1000 group-hover:left-[100%] pointer-events-none"
        ></span>
      )}
      
      {/* Fill effect */}
      {animationType === 'fill' && (
        <span 
          className="absolute inset-0 bg-primary-600 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out pointer-events-none"
        ></span>
      )}
      
      {/* Border effect */}
      {animationType === 'border' && (
        <>
          <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-primary-200 group-hover:w-full transition-all duration-300 ease-out"></span>
          <span className="absolute right-0 top-0 h-[2px] w-0 bg-primary-200 group-hover:w-full transition-all duration-300 ease-out"></span>
          <span className="absolute left-0 top-0 h-0 w-[2px] bg-primary-200 group-hover:h-full transition-all duration-300 ease-out"></span>
          <span className="absolute right-0 bottom-0 h-0 w-[2px] bg-primary-200 group-hover:h-full transition-all duration-300 ease-out"></span>
        </>
      )}
      
      {/* Ripple effect */}
      {animationType === 'ripple' && (
        <>
          {rippleArray.map((ripple, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full bg-white/30 pointer-events-none"
              initial={{ 
                width: 0, 
                height: 0, 
                opacity: 0.5,
                x: ripple.x, 
                y: ripple.y 
              }}
              animate={{ 
                width: ripple.size, 
                height: ripple.size, 
                opacity: 0,
                x: ripple.x - ripple.size/2, 
                y: ripple.y - ripple.size/2 
              }}
              transition={{ 
                duration: 0.8, 
                ease: "easeOut" 
              }}
            />
          ))}
        </>
      )}
    </Button>
  );
};

export default EnhancedButton;
