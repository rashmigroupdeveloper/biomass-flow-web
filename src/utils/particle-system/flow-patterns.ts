import { Particle, FlowDirection, Vector2D } from './types';

export class FlowPatterns {
  private width: number;
  private height: number;
  private flowIntensity: number;
  private flowDirection: FlowDirection;
  private time: number = 0;

  constructor(width: number, height: number, flowDirection: FlowDirection, flowIntensity: number) {
    this.width = width;
    this.height = height;
    this.flowDirection = flowDirection;
    this.flowIntensity = flowIntensity;
  }

  updateTime(deltaTime: number): void {
    this.time += deltaTime * 0.001;
  }

  applyFlow(particle: Particle, deltaTime: number): void {
    const timeScale = deltaTime / 16.667; // Normalize for 60 FPS
    let flowX = 0;
    let flowY = 0;
    
    switch(this.flowDirection) {
      case 'upward':
        flowY = -this.flowIntensity;
        break;
      case 'downward':
        flowY = this.flowIntensity;
        break;
      case 'leftward':
        flowX = -this.flowIntensity;
        break;
      case 'rightward':
        flowX = this.flowIntensity;
        break;
      case 'radial':
        const dx = particle.x - this.width / 2;
        const dy = particle.y - this.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
          flowX = dx / distance * this.flowIntensity;
          flowY = dy / distance * this.flowIntensity;
        }
        break;
      case 'circular':
        const cdx = particle.x - this.width / 2;
        const cdy = particle.y - this.height / 2;
        const cdistance = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdistance > 0) {
          flowX = -cdy / cdistance * this.flowIntensity;
          flowY = cdx / cdistance * this.flowIntensity;
        }
        break;
      case 'wave':
        const waveAmplitude = 2;
        const waveFrequency = 0.02;
        const waveSpeed = 0.01;
        flowY = Math.sin(particle.x * waveFrequency + this.time * waveSpeed) * waveAmplitude;
        break;
      case 'custom':
        // Custom flow pattern could be implemented here
        break;
    }

    particle.x += flowX * timeScale;
    particle.y += flowY * timeScale;
  }

  applyMouseInfluence(particle: Particle, mousePos: Vector2D, radius: number = 100, strength: number = 1): void {
    if (!mousePos.x || !mousePos.y) return;
    
    const dx = particle.x - mousePos.x;
    const dy = particle.y - mousePos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < radius && distance > 0) {
      const force = (radius - distance) / radius * strength;
      particle.x += dx / distance * force;
      particle.y += dy / distance * force;
    }
  }
}
