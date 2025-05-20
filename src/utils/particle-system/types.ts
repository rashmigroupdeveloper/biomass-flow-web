
export interface ParticleSystemOptions {
  particleCount?: number;
  particleMinSize?: number;
  particleMaxSize?: number;
  baseHue?: number;
  backgroundColor?: string;
  flowIntensity?: number;
  flowDirection?: 'upward' | 'downward' | 'leftward' | 'rightward' | 'radial' | 'circular' | 'wave' | 'custom';
  speedFactor?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  mouseInteraction?: boolean;
  responsive?: boolean;
  densityFactor?: number;
  useHardwareAcceleration?: boolean; // New option for GPU acceleration
  lowPerformanceMode?: boolean; // Option for systems with limited resources
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
}

export type Vector2D = {
  x: number;
  y: number;
};

