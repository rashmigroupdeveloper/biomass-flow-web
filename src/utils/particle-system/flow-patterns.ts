
import { Particle, Vector2D, ParticleSystemOptions } from './types';

export class FlowPatterns {
  private options: ParticleSystemOptions;
  private canvas: HTMLCanvasElement;
  private time: number = 0;
  
  constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions) {
    this.canvas = canvas;
    this.options = options;
  }
  
  updateTime(delta: number): void {
    this.time += delta * 0.001;
  }
  
  applyFlow(particle: Particle, delta: number): void {
    const flowType = this.options.flowDirection || 'upward';
    const intensity = this.options.flowIntensity || 1;
    const speedFactor = this.options.speedFactor || 0.5;
    
    // Base flow patterns
    switch (flowType) {
      case 'upward':
        this.applyUpwardFlow(particle, intensity, speedFactor, delta);
        break;
      case 'circular':
        this.applyCircularFlow(particle, intensity, speedFactor, delta);
        break;
      case 'wave':
        this.applyWaveFlow(particle, intensity, speedFactor, delta);
        break;
      case 'custom':
        this.applyCustomFlow(particle, intensity, speedFactor, delta);
        break;
      default:
        this.applyUpwardFlow(particle, intensity, speedFactor, delta);
    }
  }
  
  private applyUpwardFlow(particle: Particle, intensity: number, speedFactor: number, delta: number): void {
    // Gentle rising motion
    particle.speedY -= 0.002 * intensity * delta;
    
    // Add some horizontal drift
    particle.speedX += (Math.random() - 0.5) * 0.002 * intensity * delta;
    
    // Apply speed limits
    this.limitSpeed(particle, speedFactor);
    
    // Update position
    particle.x += particle.speedX * speedFactor * delta;
    particle.y += particle.speedY * speedFactor * delta;
  }
  
  private applyCircularFlow(particle: Particle, intensity: number, speedFactor: number, delta: number): void {
    // Get vector to center
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const dx = particle.x - centerX;
    const dy = particle.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Apply circular motion
    const angle = Math.atan2(dy, dx);
    const newAngle = angle + 0.0005 * intensity * delta;
    
    particle.speedX = -Math.sin(newAngle) * 0.5 * intensity;
    particle.speedY = Math.cos(newAngle) * 0.5 * intensity;
    
    // Add some inward/outward drift based on sine wave
    const optimalDistance = Math.min(this.canvas.width, this.canvas.height) * 0.3;
    const distanceFactor = (distance - optimalDistance) * 0.0001 * intensity;
    
    particle.speedX -= dx * distanceFactor * delta;
    particle.speedY -= dy * distanceFactor * delta;
    
    // Apply speed limits
    this.limitSpeed(particle, speedFactor);
    
    // Update position
    particle.x += particle.speedX * speedFactor * delta;
    particle.y += particle.speedY * speedFactor * delta;
  }
  
  private applyWaveFlow(particle: Particle, intensity: number, speedFactor: number, delta: number): void {
    // Horizontal flow with wave pattern
    const yPosition = particle.y / this.canvas.height;
    
    // Wave effect based on x position and time
    const waveStrength = Math.sin(particle.x * 0.01 + this.time) * 0.1 * intensity;
    
    particle.speedX = 0.5 * intensity * delta * 0.01;
    particle.speedY = waveStrength * delta * 0.01;
    
    // Apply speed limits
    this.limitSpeed(particle, speedFactor);
    
    // Update position
    particle.x += particle.speedX * speedFactor * delta;
    particle.y += particle.speedY * speedFactor * delta;
  }
  
  private applyCustomFlow(particle: Particle, intensity: number, speedFactor: number, delta: number): void {
    // Left to right flow for process section
    particle.speedX += 0.001 * intensity * delta;
    
    // Slight vertical drift
    particle.speedY += (Math.random() - 0.5) * 0.001 * intensity * delta;
    
    // Apply speed limits
    this.limitSpeed(particle, speedFactor);
    
    // Update position
    particle.x += particle.speedX * speedFactor * delta;
    particle.y += particle.speedY * speedFactor * delta;
  }
  
  private limitSpeed(particle: Particle, speedFactor: number): void {
    const maxSpeed = 0.5 * speedFactor;
    
    // Limit horizontal speed
    if (particle.speedX > maxSpeed) {
      particle.speedX = maxSpeed;
    } else if (particle.speedX < -maxSpeed) {
      particle.speedX = -maxSpeed;
    }
    
    // Limit vertical speed
    if (particle.speedY > maxSpeed) {
      particle.speedY = maxSpeed;
    } else if (particle.speedY < -maxSpeed) {
      particle.speedY = -maxSpeed;
    }
    
    // Apply some damping
    particle.speedX *= 0.99;
    particle.speedY *= 0.99;
  }
  
  applyMouseInfluence(particle: Particle, mousePos: Vector2D | null, delta: number): void {
    if (!mousePos) return;
    
    const dx = mousePos.x - particle.x;
    const dy = mousePos.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = 100; // Mouse influence radius
    
    if (distance < influence) {
      const force = (influence - distance) / influence;
      particle.speedX += (dx / distance) * force * 0.02 * delta;
      particle.speedY += (dy / distance) * force * 0.02 * delta;
    }
  }
}

// Export standalone flow pattern functions for backward compatibility
export function applyUpwardFlow(particle: Particle, intensity: number): void {
  particle.speedY -= 0.002 * intensity;
  particle.speedX += (Math.random() - 0.5) * 0.002 * intensity;
}

export function applyDownwardFlow(particle: Particle, intensity: number): void {
  particle.speedY += 0.002 * intensity;
  particle.speedX += (Math.random() - 0.5) * 0.002 * intensity;
}

export function applyCircularFlow(particle: Particle, centerX: number, centerY: number, intensity: number): void {
  const dx = particle.x - centerX;
  const dy = particle.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  const angle = Math.atan2(dy, dx);
  const newAngle = angle + 0.0005 * intensity;
  
  particle.speedX = -Math.sin(newAngle) * 0.5 * intensity;
  particle.speedY = Math.cos(newAngle) * 0.5 * intensity;
}

export function applyRadialFlow(particle: Particle, centerX: number, centerY: number, intensity: number): void {
  const dx = particle.x - centerX;
  const dy = particle.y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance > 0) {
    const factor = 0.01 * intensity / distance;
    particle.speedX += dx * factor;
    particle.speedY += dy * factor;
  }
}

export function applyNoiseFlow(particle: Particle, intensity: number, time: number): void {
  // Simple noise-based flow
  const noiseX = Math.sin(particle.x * 0.01 + time) * Math.cos(particle.y * 0.01 + time * 0.5);
  const noiseY = Math.sin(particle.y * 0.01 + time) * Math.cos(particle.x * 0.01 + time * 0.5);
  
  particle.speedX += noiseX * 0.01 * intensity;
  particle.speedY += noiseY * 0.01 * intensity;
}
