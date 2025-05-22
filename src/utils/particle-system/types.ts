
export interface Vector2D {
  x: number;
  y: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  hue: number;
  opacity: number;
  speedX: number;
  speedY: number;
}

export type FlowDirection = 'upward' | 'downward' | 'leftward' | 'rightward' | 'radial' | 'circular' | 'wave' | 'custom';

export interface ParticleSystemOptions {
  particleCount?: number;
  particleMinSize?: number;
  particleMaxSize?: number;
  baseHue?: number;
  backgroundColor?: string;
  flowIntensity?: number;
  flowDirection?: FlowDirection;
  speedFactor?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  interactive?: boolean;
  responsive?: boolean;
  densityFactor?: number;
  useHardwareAcceleration?: boolean;
  lowPerformanceMode?: boolean;
}
