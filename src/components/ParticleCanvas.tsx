
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { ParticleSystemOptions } from '@/utils/particle-system/types';
import { BiomassParticleSystem } from '@/utils/particle-system';
import '@/components/ParticleCanvas.css';

export interface ParticleCanvasRef {
  start: () => void;
  stop: () => void;
  updateOptions: (newOptions: Partial<ParticleSystemOptions>) => void;
}

interface ParticleCanvasProps {
  id: string;
  options: ParticleSystemOptions;
}

const ParticleCanvas = forwardRef<ParticleCanvasRef, ParticleCanvasProps>(({ id, options }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleSystemRef = useRef<BiomassParticleSystem | null>(null);

  useImperativeHandle(ref, () => ({
    start: () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.start();
      }
    },
    stop: () => {
      if (particleSystemRef.current) {
        particleSystemRef.current.stop();
      }
    },
    updateOptions: (newOptions: Partial<ParticleSystemOptions>) => {
      if (particleSystemRef.current) {
        particleSystemRef.current.updateOptions(newOptions);
      }
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particleSystem = new BiomassParticleSystem(canvas, options);
    particleSystemRef.current = particleSystem;
    particleSystem.start();

    const resizeObserver = new ResizeObserver(() => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particleSystem.handleResize();
    });

    resizeObserver.observe(canvas);

    return () => {
      particleSystem.stop();
      resizeObserver.disconnect();
    };
  }, [options]);

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className="particle-canvas"
    />
  );
});

ParticleCanvas.displayName = 'ParticleCanvas';

export default ParticleCanvas;
