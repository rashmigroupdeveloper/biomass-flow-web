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

  // Expose the system instance via ref
  useImperativeHandle(ref, () => ({
    getSystem: () => systemRef.current
  }));

  useEffect(() => {
    // Import performance optimizer functions
    const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;

    // Initialize particle system when component mounts with performance optimizations
    const defaultOptions: ParticleSystemOptions = {
      particleCount: isLowPerformance ? 80 : 150,
      particleMinSize: 1,
      particleMaxSize: isLowPerformance ? 3 : 4,
      baseHue: 120, // Green hue
      backgroundColor: 'rgba(46, 125, 50, 0.05)', // Very subtle green background
      flowIntensity: isLowPerformance ? 1.0 : 1.2,
      flowDirection: 'upward' as const,
      speedFactor: isLowPerformance ? 0.5 : 0.6,
      connectionRadius: isLowPerformance ? 80 : 120,
      connectionOpacity: 0.12,
      mouseInteraction: true,
      responsive: true,
      densityFactor: isLowPerformance ? 0.00005 : 0.00009,
      useHardwareAcceleration: true, // Enable hardware acceleration
    };

    // Merge with any provided options, but ensure performance settings are applied
    const mergedOptions = {
      ...defaultOptions,
      ...options,
      // Always override these options based on performance mode
      particleCount: options?.particleCount
        ? (isLowPerformance ? Math.floor(options.particleCount * 0.6) : options.particleCount)
        : defaultOptions.particleCount,
      connectionRadius: options?.connectionRadius
        ? (isLowPerformance ? Math.floor(options.connectionRadius * 0.7) : options.connectionRadius)
        : defaultOptions.connectionRadius,
    };

    // Check if we should use the enhanced particle system with trails
    if (mergedOptions.trailEffect) {
      // Create and start the enhanced particle system with trailing effects
      systemRef.current = new EnhancedBiomassParticleSystem(id, mergedOptions);
    } else {
      // Create and start the standard particle system
      systemRef.current = new BiomassParticleSystem(id, mergedOptions);
    }

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
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';

export default ParticleCanvas;


