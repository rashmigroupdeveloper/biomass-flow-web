
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

  updateOptions(options: ParticleSystemOptions): void {
    this.options = options;
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
    // Enhanced upward motion with gentle swaying
    const verticalPosition = particle.y / this.canvas.height;
    
    // Stronger upward movement for particles higher in the canvas
    const baseUpwardForce = 0.003 * intensity;
    const heightAdjustedForce = baseUpwardForce * (1 + (1 - verticalPosition) * 0.5);
    
    // Apply upward force with natural variation
    particle.speedY -= heightAdjustedForce * (1 + Math.sin(this.time + particle.x * 0.01) * 0.2) * delta;
    
    // Add some horizontal drift with variation based on particle properties
    const wiggle = Math.sin(this.time * 0.5 + particle.y * 0.02 + particle.hue * 0.1) * 0.001;
    particle.speedX += wiggle * intensity * delta;
    
    // Add more natural randomness
    if (Math.random() < 0.01) {
      particle.speedX += (Math.random() - 0.5) * 0.002 * intensity;
    }
    
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
    
    // Enhanced wave effect based on x position and time
    const waveStrength = Math.sin(particle.x * 0.01 + this.time) * 0.15 * intensity;
    
    particle.speedX = 0.5 * intensity * delta * 0.01;
    particle.speedY = waveStrength * delta * 0.01;
    
    // Add vertical drift based on the wave's position
    particle.speedY += Math.cos(particle.x * 0.02 + this.time * 1.5) * 0.05 * delta * 0.01;
    
    // Apply speed limits
    this.limitSpeed(particle, speedFactor);
    
    // Update position
    particle.x += particle.speedX * speedFactor * delta;
    particle.y += particle.speedY * speedFactor * delta;
  }
  
  private applyCustomFlow(particle: Particle, intensity: number, speedFactor: number, delta: number): void {
    // Left to right flow for process section with organic movement
    particle.speedX += 0.001 * intensity * delta;
    
    // More dynamic vertical drift based on horizontal position
    const horizontalPosition = particle.x / this.canvas.width;
    const verticalDrift = Math.sin(horizontalPosition * Math.PI * 4 + this.time) * 0.0015 * intensity;
    particle.speedY += verticalDrift * delta;
    
    // Add some natural randomness
    if (Math.random() < 0.02) {
      particle.speedY += (Math.random() - 0.5) * 0.001 * intensity;
    }
    
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
  
  applyMouseInfluence(particle: Particle, mousePos: Vector2D): void {
    const dx = mousePos.x - particle.x;
    const dy = mousePos.y - particle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const influence = 100; // Mouse influence radius
    
    if (distance < influence) {
      const force = (influence - distance) / influence;
      const repelFactor = 0.03;
      particle.speedX -= (dx / distance) * force * repelFactor;
      particle.speedY -= (dy / distance) * force * repelFactor;
    }
  }
}
