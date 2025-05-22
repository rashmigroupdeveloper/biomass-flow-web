
import { Particle } from './types';

export class ParticleFactory {
  private minSize: number;
  private maxSize: number;
  private baseHue: number;
  private hueVariation: number;
  private width: number;
  private height: number;

  constructor(
    minSize: number, 
    maxSize: number, 
    baseHue: number, 
    hueVariation: number,
    width: number,
    height: number
  ) {
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.baseHue = baseHue;
    this.hueVariation = hueVariation;
    this.width = width;
    this.height = height;
  }

  createParticle(): Particle {
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      size: this.minSize + Math.random() * (this.maxSize - this.minSize),
      hue: this.baseHue + (Math.random() - 0.5) * this.hueVariation,
      opacity: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2
    };
  }

  createParticleAt(x: number, y: number): Particle {
    return {
      x,
      y,
      size: this.minSize + Math.random() * (this.maxSize - this.minSize),
      hue: this.baseHue + (Math.random() - 0.5) * this.hueVariation,
      opacity: Math.random() * 0.5 + 0.3,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2
    };
  }
}
