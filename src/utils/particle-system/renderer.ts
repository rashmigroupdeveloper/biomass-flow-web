
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
  
  updateOptions(options: ParticleSystemOptions): void {
    this.options = options;
    this.backgroundColor = options.backgroundColor || 'rgba(46, 125, 50, 0.05)';
  }
  
  clear(): void {
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  
  drawParticles(particles: Particle[], time: number = 0): void {
    const canvas = this.ctx.canvas;
    const particleVariety = this.options.particleVariety;
    const grassEffect = this.options.grassEffect;
    
    particles.forEach(particle => {
      // Save current drawing state
      this.ctx.save();
      
      if (particleVariety && grassEffect) {
        // Enhanced grass-like rendering
        const verticalPosition = 1 - (particle.y / canvas.height);
        
        // Taller particles at the top for a grass-like effect
        if (verticalPosition > 0.6) {
          // Draw elongated particles for grass blades
          const length = particle.size * (1 + verticalPosition * 2);
          const width = particle.size * 0.5;
          const swayAngle = Math.sin(time * 2 + particle.x * 0.05) * 0.2;
          
          this.ctx.translate(particle.x, particle.y);
          this.ctx.rotate(swayAngle - Math.PI / 2); // Point upward with swaying
          
          // Grass blade gradient
          const gradient = this.ctx.createLinearGradient(0, -length, 0, particle.size);
          gradient.addColorStop(0, `hsla(${particle.hue+10}, 85%, 65%, 0.7)`);
          gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0.9)`);
          
          this.ctx.fillStyle = gradient;
          
          // Draw a tapered blade shape
          this.ctx.beginPath();
          this.ctx.moveTo(0, -length);
          this.ctx.lineTo(width/2, 0);
          this.ctx.lineTo(-width/2, 0);
          this.ctx.closePath();
          this.ctx.fill();
        } else {
          // Draw regular particles for lower positions
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          this.ctx.fillStyle = `hsla(${particle.hue}, ${70 + verticalPosition * 15}%, ${55 + verticalPosition * 10}%, ${0.6 + verticalPosition * 0.3})`;
          this.ctx.fill();
        }
      } else if (particleVariety) {
        // Enhanced varied particles
        const randomShape = Math.floor((particle.x * particle.y) % 4);
        
        switch (randomShape) {
          case 0:
            // Circle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.7)`;
            this.ctx.fill();
            break;
          case 1:
            // Square
            this.ctx.fillStyle = `hsla(${particle.hue+5}, 75%, 65%, 0.7)`;
            this.ctx.fillRect(
              particle.x - particle.size/2, 
              particle.y - particle.size/2, 
              particle.size, 
              particle.size
            );
            break;
          case 2:
            // Triangle
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y - particle.size);
            this.ctx.lineTo(particle.x + particle.size, particle.y + particle.size);
            this.ctx.lineTo(particle.x - particle.size, particle.y + particle.size);
            this.ctx.closePath();
            this.ctx.fillStyle = `hsla(${particle.hue-5}, 80%, 60%, 0.7)`;
            this.ctx.fill();
            break;
          default:
            // Diamond
            this.ctx.beginPath();
            this.ctx.moveTo(particle.x, particle.y - particle.size);
            this.ctx.lineTo(particle.x + particle.size, particle.y);
            this.ctx.lineTo(particle.x, particle.y + particle.size);
            this.ctx.lineTo(particle.x - particle.size, particle.y);
            this.ctx.closePath();
            this.ctx.fillStyle = `hsla(${particle.hue+10}, 85%, 65%, 0.7)`;
            this.ctx.fill();
        }
      } else {
        // Standard circular particles
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.7)`;
        this.ctx.fill();
      }
      
      // Restore drawing state
      this.ctx.restore();
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
          
          // Create a gradient between the two particles
          const gradient = this.ctx.createLinearGradient(
            particles[i].x, particles[i].y, 
            particles[j].x, particles[j].y
          );
          gradient.addColorStop(0, `hsla(${particles[i].hue}, 70%, 60%, ${opacity})`);
          gradient.addColorStop(1, `hsla(${particles[j].hue}, 70%, 60%, ${opacity})`);
          
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = opacity * 1.5;
          this.ctx.stroke();
        }
      }
    }
  }
}
