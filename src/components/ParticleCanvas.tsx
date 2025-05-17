
import React, { useEffect, useRef, forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import { BiomassFlowFieldSystem } from '../utils/flow-field-particles';

export interface ParticleCanvasProps {
  id: string;
  className?: string;
  options?: {
    particleCount?: number;
    particleSize?: number;
    particleColor?: string;
    backgroundColor?: string;
    flowSpeed?: number;
    flowDirection?: 'upward' | 'circular' | 'wave' | 'custom';
    interactionStrength?: number;
    connectionRadius?: number;
    colorVariation?: number;
    densityFactor?: number;
  };
}

export interface ParticleCanvasRef {
  getSystem: () => BiomassFlowFieldSystem | null;
}

const ParticleCanvas = forwardRef(({ id, className, options = {} }: ParticleCanvasProps, ref: ForwardedRef<ParticleCanvasRef>) => {
  const systemRef = useRef<BiomassFlowFieldSystem | null>(null);
  
  // Expose the system instance via ref
  useImperativeHandle(ref, () => ({
    getSystem: () => systemRef.current
  }));
  
  useEffect(() => {
    // Initialize particle system when component mounts
    const defaultOptions = {
      particleCount: 150,
      particleSize: 2.5,
      particleColor: '#81c784',
      backgroundColor: 'rgba(46, 125, 50, 0.05)',
      flowSpeed: 1.2,
      flowDirection: 'upward' as const,
      interactionStrength: 1.5,
      connectionRadius: 120,
      colorVariation: 15,
      densityFactor: 0.00009,
    };

    const mergedOptions = { ...defaultOptions, ...options };
    
    // Create and start the particle system
    systemRef.current = new BiomassFlowFieldSystem(id, mergedOptions);
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
