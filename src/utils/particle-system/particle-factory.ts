
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
    const grassEffect = this.options.grassEffect;
    
    for (let i = 0; i < count; i++) {
      let y = Math.random() * canvasHeight;
      let size = Math.random() * (maxSize - minSize) + minSize;
      
      // For grass effect, adjust particle distribution
      if (grassEffect) {
        // Make more particles at the bottom, fewer at the top
        y = canvasHeight * (1 - Math.pow(Math.random(), 1.5));
        
        // Smaller particles at the bottom, larger at the top
        const normalizedY = 1 - (y / canvasHeight); // 0 at bottom, 1 at top
        size = minSize + (maxSize - minSize) * (normalizedY * 0.8 + Math.random() * 0.2);
        
        // Additional grass-specific properties
        const length = size * (1 + normalizedY * 3); // Longer blades higher up
        const width = size * 0.5;
        const angle = (Math.random() - 0.5) * 0.3; // Slight random angle
        
        particles.push({
          x: Math.random() * canvasWidth,
          y: y,
          size: size,
          speedX: (Math.random() - 0.5) * 0.2,
          speedY: -Math.random() * 0.3 - 0.1, // Mostly upward movement
          hue: baseHue + Math.random() * 15 - 10 + normalizedY * 15, // More yellow-green at tips
          type: Math.floor(Math.random() * 4), // For variety in particle shapes
          length: length, // Grass blade length
          width: width,  // Grass blade width
          angle: angle   // Grass blade angle
        });
      } else {
        // Standard particles
        const hueVariation = 10;
        const hue = baseHue + Math.random() * hueVariation - (hueVariation/2);
        
        particles.push({
          x: Math.random() * canvasWidth,
          y: y,
          size: size,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          hue: hue,
          type: Math.floor(Math.random() * 4) // For variety in particle shapes
        });
      }
    }
    
    return particles;
  }
  
  resetParticle(particle: Particle): Particle {
    const minSize = this.options.particleMinSize || 1;
    const maxSize = this.options.particleMaxSize || 3;
    const baseHue = this.options.baseHue || 120;
    const grassEffect = this.options.grassEffect;
    
    // Reset position based on edges
    if (particle.x < -50) {
      particle.x = this.canvas.width + 50;
    } else if (particle.x > this.canvas.width + 50) {
      particle.x = -50;
    }
    
    if (particle.y < -50) {
      // If using grass effect, respawn from bottom when reaching top
      if (grassEffect) {
        particle.y = this.canvas.height + Math.random() * 10;
        particle.x = Math.random() * this.canvas.width; // Random horizontal position
        
        // Reset speed for a natural re-entry
        particle.speedX = (Math.random() - 0.5) * 0.3;
        particle.speedY = -Math.random() * 0.3 - 0.1;
        
        // Refresh particle appearance
        particle.size = Math.random() * (maxSize - minSize) + minSize;
        
        // More vibrant green at the bottom
        particle.hue = baseHue - 5 + Math.random() * 10;
        
        // Reset grass-specific properties if they exist
        if (particle.length !== undefined) {
          particle.length = particle.size * 1.5;
        }
        if (particle.width !== undefined) {
          particle.width = particle.size * 0.5;
        }
        if (particle.angle !== undefined) {
          particle.angle = (Math.random() - 0.5) * 0.3;
        }
      } else {
        particle.y = this.canvas.height + 50;
      }
    } else if (particle.y > this.canvas.height + 50) {
      // If using grass effect, respawn at slightly different position
      if (grassEffect) {
        particle.y = this.canvas.height * 0.9; // Appear near bottom
        particle.x = Math.random() * this.canvas.width;
        
        // Start with upward momentum
        particle.speedY = -Math.random() * 0.2 - 0.1;
      } else {
        particle.y = -50;
      }
    }
    
    // Occasionally reset particle properties for variety
    if (Math.random() < 0.01) {
      particle.size = Math.random() * (maxSize - minSize) + minSize;
      
      if (grassEffect) {
        // For grass effect, vary the green hues with height
        const normalizedY = 1 - (particle.y / this.canvas.height);
        particle.hue = baseHue + Math.random() * 15 - 10 + normalizedY * 15;
        
        // Ensure upward movement predominates
        particle.speedY = -Math.random() * 0.3 - 0.1;
      } else {
        particle.hue = baseHue + Math.random() * 20 - 10;
      }
    }
    
    return particle;
  }
}
