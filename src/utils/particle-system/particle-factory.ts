
import { Particle, ParticleSystemOptions } from './types';

export class ParticleFactory {
  private canvas: HTMLCanvasElement;
  private options: ParticleSystemOptions;
  
  constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions) {
    this.canvas = canvas;
    this.options = options;
  }
  
  createParticles(count: number): Particle[] {
    const particles: Particle[] = [];
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const minSize = this.options.particleMinSize || 1;
    const maxSize = this.options.particleMaxSize || 3;
    const baseHue = this.options.baseHue || 120;
    
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        size: Math.random() * (maxSize - minSize) + minSize,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        hue: baseHue + Math.random() * 20 - 10,
        opacity: Math.random() * 0.5 + 0.5 // Add opacity property with a default value
      });
    }
    
    return particles;
  }
  
  resetParticle(particle: Particle): Particle {
    const minSize = this.options.particleMinSize || 1;
    const maxSize = this.options.particleMaxSize || 3;
    const baseHue = this.options.baseHue || 120;
    
    // Reset position based on edges
    if (particle.x < 0) {
      particle.x = this.canvas.width;
    } else if (particle.x > this.canvas.width) {
      particle.x = 0;
    }
    
    if (particle.y < 0) {
      particle.y = this.canvas.height;
    } else if (particle.y > this.canvas.height) {
      particle.y = 0;
    }
    
    // Occasionally reset particle properties for variety
    if (Math.random() < 0.01) {
      particle.size = Math.random() * (maxSize - minSize) + minSize;
      particle.hue = baseHue + Math.random() * 20 - 10;
      // Occasionally refresh opacity as well
      particle.opacity = Math.random() * 0.5 + 0.5;
    }
    
    return particle;
  }
}
