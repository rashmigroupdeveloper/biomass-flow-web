
import { Particle, ParticleSystemOptions } from './types';

export class ParticleRenderer {
  private ctx: CanvasRenderingContext2D;
  private options: ParticleSystemOptions;
  private backgroundColor: string;
  
  constructor(ctx: CanvasRenderingContext2D, options: ParticleSystemOptions) {
    this.ctx = ctx;
    this.options = options;
    this.backgroundColor = options.backgroundColor || 'rgba(46, 125, 50, 0.05)';
  }
  
  clear(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  
  drawParticles(particles: Particle[]): void {
    particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.7)`;
      this.ctx.fill();
    });
  }
  
  drawConnections(particles: Particle[]): void {
    const connectionRadius = this.options.connectionRadius || 100;
    const connectionOpacity = this.options.connectionOpacity || 0.1;
    
    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionRadius) {
          const opacity = (1 - (distance / connectionRadius)) * connectionOpacity;
          this.ctx.beginPath();
          this.ctx.moveTo(particles[i].x, particles[i].y);
          this.ctx.lineTo(particles[j].x, particles[j].y);
          this.ctx.strokeStyle = `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
}
