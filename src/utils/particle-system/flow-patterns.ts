import { Particle, ParticleSystemOptions, Vector2D } from './types';

export class FlowPatterns {
  // Calculate flow for an individual particle based on its position and flow direction
  static calculateFlow(
    particle: Particle,
    canvasWidth: number,
    canvasHeight: number,
    options: ParticleSystemOptions,
    time: number = 0
  ): Vector2D {
    const { flowDirection, flowIntensity = 1 } = options;
    let flowX = 0;
    let flowY = 0;
    
    switch (flowDirection) {
      case 'leftward':
        return this.leftwardFlow(flowIntensity);
      case 'rightward':
        return this.rightwardFlow(flowIntensity);
      case 'upward':
        return this.upwardFlow(flowIntensity);
      case 'downward':
        return this.downwardFlow(flowIntensity);
      case 'radial':
        return this.radialFlow(particle, canvasWidth, canvasHeight, flowIntensity);
      case 'circular':
        return this.circularFlow(particle, canvasWidth, canvasHeight, flowIntensity);
      case 'wave':
        return this.waveFlow(particle, time, flowIntensity);
      case 'custom':
        return this.customFlow(particle, canvasWidth, canvasHeight, time, flowIntensity);
      default:
        return { x: 0, y: 0 };
    }
  }
  
  static leftwardFlow(intensity: number): Vector2D {
    return {
      x: -intensity,
      y: 0
    };
  }
  
  static rightwardFlow(intensity: number): Vector2D {
    return {
      x: intensity,
      y: 0
    };
  }
  
  static upwardFlow(intensity: number): Vector2D {
    return {
      x: 0,
      y: -intensity
    };
  }
  
  static downwardFlow(intensity: number): Vector2D {
    return {
      x: 0,
      y: intensity
    };
  }
  
  static radialFlow(particle: Particle, canvasWidth: number, canvasHeight: number, intensity: number): Vector2D {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const dx = particle.x - centerX;
    const dy = particle.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { x: 0, y: 0 };
    
    return {
      x: (dx / distance) * intensity,
      y: (dy / distance) * intensity
    };
  }
  
  static circularFlow(particle: Particle, canvasWidth: number, canvasHeight: number, intensity: number): Vector2D {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const dx = particle.x - centerX;
    const dy = particle.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0) return { x: 0, y: 0 };
    
    return {
      x: (-dy / distance) * intensity,
      y: (dx / distance) * intensity
    };
  }
  
  static waveFlow(particle: Particle, time: number, intensity: number): Vector2D {
    const waveAmplitude = 2;
    const waveFrequency = 0.02;
    const waveSpeed = 0.001;
    
    return {
      x: 0,
      y: Math.sin(particle.x * waveFrequency + time * waveSpeed) * waveAmplitude * intensity
    };
  }
  
  static customFlow(particle: Particle, canvasWidth: number, canvasHeight: number, time: number, intensity: number): Vector2D {
    // This is a placeholder for custom flow patterns
    // You can implement your own logic here
    
    // Example: combine circular and wave patterns
    const circular = this.circularFlow(particle, canvasWidth, canvasHeight, intensity * 0.5);
    const wave = this.waveFlow(particle, time, intensity * 0.5);
    
    return {
      x: circular.x + wave.x,
      y: circular.y + wave.y
    };
  }
  
  static perlinNoiseFlow(particle: Particle, time: number, intensity: number): Vector2D {
    // This is a simplified version of Perlin noise
    // In a real implementation, you would use a proper Perlin noise library
    const x = Math.sin(particle.x * 0.01 + time * 0.001) * Math.cos(particle.y * 0.01);
    const y = Math.cos(particle.x * 0.01) * Math.sin(particle.y * 0.01 + time * 0.001);
    
    return {
      x: x * intensity,
      y: y * intensity
    };
  }
}
