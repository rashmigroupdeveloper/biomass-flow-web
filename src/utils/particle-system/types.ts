
export interface ParticleSystemOptions {
  particleCount?: number;
  particleMinSize?: number;
  particleMaxSize?: number;
  baseHue?: number;
  backgroundColor?: string;
  flowIntensity?: number;
  flowDirection?: string;
  speedFactor?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  mouseInteraction?: boolean;
  responsive?: boolean;
  densityFactor?: number;
  grassEffect?: boolean;
  particleVariety?: boolean;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  hue: number;
  opacity?: number;
  type?: number;
  length?: number; // For grass blade length
  width?: number;  // For grass blade width
  angle?: number;  // For grass blade angle
}

export type Vector2D = {
  x: number;
  y: number;
};
