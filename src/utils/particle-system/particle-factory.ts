
import { Particle } from './types';

export class ParticleFactory {
  private readonly minSize: number;
  private readonly maxSize: number;
  private readonly baseHue: number;
  private readonly hueVariation: number;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  
  constructor(
    minSize: number,
    maxSize: number,
    baseHue: number,
    hueVariation: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.baseHue = baseHue;
    this.hueVariation = hueVariation;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  createParticle(): Particle {
    const size = Math.random() * (this.maxSize - this.minSize) + this.minSize;
    const speedFactor = 0.5; // Base speed factor
    const speedX = (Math.random() - 0.5) * speedFactor;
    const speedY = (Math.random() - 0.5) * speedFactor;
    const hue = this.baseHue + (Math.random() * this.hueVariation * 2 - this.hueVariation);
    
    return {
      x: Math.random() * this.canvasWidth,
      y: Math.random() * this.canvasHeight,
      size,
      speedX,
      speedY,
      hue,
      opacity: Math.random() * 0.5 + 0.5 // Add opacity property
    };
  }

  createParticleAt(x: number, y: number): Particle {
    const particle = this.createParticle();
    particle.x = x;
    particle.y = y;
    return particle;
  }
}
