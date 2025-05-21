
export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  opacity: number;
}

export type FlowDirection = 'upward' | 'downward' | 'leftward' | 'rightward' | 'radial' | 'wave' | 'custom' | 'circular';

export interface FlowFieldOptions {
  direction: FlowDirection;
  intensity: number;
  scale: number;
  seed: number;
  animate?: boolean;
}

export interface ParticleSystemOptions {
  canvasId: string;
  particleCount?: number;
  particleMinSize?: number;
  particleMaxSize?: number;
  baseHue?: number;
  hueVariation?: number;
  flowDirection?: FlowDirection;
  flowIntensity?: number;
  speedFactor?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  interactive?: boolean;
  flowOptions?: FlowFieldOptions;
  lowPerformanceMode?: boolean;
  backgroundColor?: string;
  useHardwareAcceleration?: boolean;
}
