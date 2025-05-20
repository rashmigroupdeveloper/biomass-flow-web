
import React, { useEffect, useRef, forwardRef, useImperativeHandle, ForwardedRef } from 'react';
import { BiomassParticleSystem } from '../utils/particle-system';
import { EnhancedBiomassParticleSystem } from '../utils/enhanced-particle-system';
import { EnhancedParticleSystemOptions } from '../utils/particle-system/enhanced-types';
import { ParticleSystemOptions } from '../utils/particle-system/types';

export interface ParticleCanvasProps {
  id: string;
  className?: string;
  options?: EnhancedParticleSystemOptions;
}

export interface ParticleCanvasRef {
  getSystem: () => BiomassParticleSystem | EnhancedBiomassParticleSystem | null;
}

const ParticleCanvas = forwardRef(({ id, className, options = {} }: ParticleCanvasProps, ref: ForwardedRef<ParticleCanvasRef>) => {
  const systemRef = useRef<BiomassParticleSystem | EnhancedBiomassParticleSystem | null>(null);
  const isLowPerformanceMode = typeof window !== 'undefined' && window.BIOMASS_LOW_PERFORMANCE_MODE === true;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Expose the system instance via ref
  useImperativeHandle(ref, () => ({
    getSystem: () => systemRef.current
  }));

  useEffect(() => {
    // Check if component is still mounted
    let isMounted = true;

    // Initialize particle system when component mounts
    // Apply low performance mode adjustments
    const particleCount = isLowPerformanceMode 
      ? Math.min(options.particleCount || 150, 50) // Cap at 50 particles in low performance mode
      : options.particleCount || 150;
      
    const defaultOptions: ParticleSystemOptions = {
      particleCount,
      particleMinSize: isLowPerformanceMode ? 1.5 : (options.particleMinSize || 1),
      particleMaxSize: isLowPerformanceMode ? 3 : (options.particleMaxSize || 4),
      baseHue: 120, // Green hue
      backgroundColor: 'rgba(46, 125, 50, 0.05)', // Very subtle green background
      flowIntensity: isLowPerformanceMode ? 0.9 : 1.2,
      flowDirection: options.flowDirection || 'upward',
      speedFactor: isLowPerformanceMode ? 0.4 : 0.6,
      connectionRadius: isLowPerformanceMode ? 80 : 120,
      connectionOpacity: isLowPerformanceMode ? 0.08 : 0.12,
      mouseInteraction: !isLowPerformanceMode && (options.mouseInteraction !== false),
      responsive: true,
      densityFactor: isLowPerformanceMode ? 0.00003 : 0.00009,
      useHardwareAcceleration: true, // Enable hardware acceleration
    };

    const mergedOptions = { ...defaultOptions, ...options };

    // Override specific options for low performance mode for safety
    if (isLowPerformanceMode) {
      mergedOptions.particleCount = Math.min(mergedOptions.particleCount || 150, 50);
      mergedOptions.connectionRadius = Math.min(mergedOptions.connectionRadius || 120, 80);
      mergedOptions.densityFactor = Math.min(mergedOptions.densityFactor || 0.00009, 0.00003);
      mergedOptions.mouseInteraction = false;
      mergedOptions.trailEffect = false;
      mergedOptions.particleGlow = false;
    }

    // Setup deferred initialization to avoid blocking the main thread
    const initTimeout = setTimeout(() => {
      if (!isMounted) return;
      
      try {
        // Check if we should use the enhanced particle system with trails
        if (mergedOptions.trailEffect && !isLowPerformanceMode) {
          // Create and start the enhanced particle system with trailing effects
          systemRef.current = new EnhancedBiomassParticleSystem(id, mergedOptions);
        } else {
          // Create and start the standard particle system
          systemRef.current = new BiomassParticleSystem(id, mergedOptions);
        }
  
        systemRef.current.start();
      } catch (error) {
        console.error("Error initializing particle system:", error);
      }
    }, isLowPerformanceMode ? 500 : 100); // Longer delay for low performance devices

    // Cleanup function to destroy the particle system when component unmounts
    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      
      if (systemRef.current) {
        systemRef.current.destroy();
        systemRef.current = null;
      }
    };
  }, [id, options, isLowPerformanceMode]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={`particle-canvas ${className || ''}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';

export default ParticleCanvas;
