
import React, { useEffect, useRef, forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import { BiomassParticleSystem } from '../utils/particle-system';

export interface ParticleCanvasProps {
  id: string;
  className?: string;
  options?: Record<string, any>;
}

export interface ParticleCanvasRef {
  getSystem: () => BiomassParticleSystem | null;
}

const ParticleCanvas = forwardRef(({ id, className, options = {} }: ParticleCanvasProps, ref: ForwardedRef<ParticleCanvasRef>) => {
  const systemRef = useRef<BiomassParticleSystem | null>(null);
  
  // Expose the system instance via ref
  useImperativeHandle(ref, () => ({
    getSystem: () => systemRef.current
  }));
  
  useEffect(() => {
    // Initialize particle system when component mounts
    const defaultOptions = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 4,
      baseHue: 120, // Green hue
      backgroundColor: 'rgba(46, 125, 50, 0.05)', // Very subtle green background
      flowIntensity: 1.2,
      flowDirection: 'upward',
      speedFactor: 0.6,
      connectionRadius: 120,
      connectionOpacity: 0.12,
      mouseInteraction: true,
      responsive: true,
      densityFactor: 0.00009,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    // Create and start the particle system
    systemRef.current = new BiomassParticleSystem(id, mergedOptions);
    systemRef.current.start();
    
    // Cleanup function to destroy the particle system when component unmounts
    return () => {
      if (systemRef.current) {
        systemRef.current.destroy();
        systemRef.current = null;
      }
    };
  }, [id, options]);
  
  return (
    <canvas 
      id={id} 
      className={`particle-canvas ${className || ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
});

export default ParticleCanvas;
