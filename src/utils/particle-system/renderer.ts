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
      
      if (grassEffect && particleVariety) {
        // Enhanced grass-like rendering
        const verticalPosition = 1 - (particle.y / canvas.height);
        
        // Higher particles (top part of screen) are drawn as longer grass blades
        if (verticalPosition > 0.3) {
          // Calculate length based on vertical position - higher = longer
          const length = (particle.length || particle.size * 2) * (0.5 + verticalPosition);
          const width = particle.width || particle.size * 0.5;
          
          // Dynamic swaying angle based on time and position
          const baseAngle = particle.angle || 0;
          const swayAmount = 0.2 + verticalPosition * 0.3; // More sway at the top
          const swaySpeed = 1.0 + particle.x * 0.001; // Slight variation in sway speed
          const swayAngle = baseAngle + Math.sin(time * swaySpeed + particle.x * 0.05) * swayAmount;
          
          // Move to particle position and apply rotation
          this.ctx.translate(particle.x, particle.y);
          this.ctx.rotate(swayAngle - Math.PI / 2); // Point upward with swaying
          
          // Create a gradient for the grass blade
          const gradient = this.ctx.createLinearGradient(0, -length, 0, particle.size * 0.5);
          
          // Color variation based on height - tips are lighter and more yellow-green
          const tipHue = particle.hue + 10; // More yellow at tips
          const baseHue = particle.hue - 5; // More blue-green at base
          
          gradient.addColorStop(0, `hsla(${tipHue}, 90%, ${60 + verticalPosition * 10}%, ${0.7 + verticalPosition * 0.3})`);
          gradient.addColorStop(1, `hsla(${baseHue}, 80%, ${50 + verticalPosition * 5}%, 0.9)`);
          
          this.ctx.fillStyle = gradient;
          
          // Draw a tapered blade shape
          this.ctx.beginPath();
          
          // More tapered at higher positions
          const taperFactor = 0.3 + verticalPosition * 0.7;
          
          // Draw blade with bezier curves for more natural look
          this.ctx.moveTo(0, -length);
          this.ctx.bezierCurveTo(
            width * taperFactor, -length * 0.7, 
            width, -length * 0.3, 
            width * 0.5, 0
          );
          this.ctx.bezierCurveTo(
            0, -length * 0.1,
            -width * 0.5, -length * 0.3,
            -width * taperFactor, -length * 0.7
          );
          this.ctx.closePath();
          this.ctx.fill();
          
          // Sometimes add a highlight line
          if ((particle.x + particle.y) % 5 < 1) {
            this.ctx.strokeStyle = `hsla(${tipHue + 20}, 90%, 75%, 0.3)`;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.moveTo(0, -length);
            this.ctx.lineTo(0, -length * 0.3);
            this.ctx.stroke();
          }
        } else {
          // Draw simpler particles for lower positions
          this.ctx.beginPath();
          this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          
          // Base color is more saturated at the bottom
          const saturation = 60 + verticalPosition * 20;
          const lightness = 40 + verticalPosition * 20;
          this.ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${0.6 + verticalPosition * 0.4})`;
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
    const grassEffect = this.options.grassEffect;
    
    // For grass effect, make connections more visible higher up
    if (grassEffect) {
      // Draw connections between nearby particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        // Higher particles (more grass-like) get more connections
        const verticalPosition1 = 1 - (p1.y / this.ctx.canvas.height);
        
        // Skip some connections for lower particles to reduce density at bottom
        if (verticalPosition1 < 0.3 && Math.random() > verticalPosition1 * 2) {
          continue;
        }
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const verticalPosition2 = 1 - (p2.y / this.ctx.canvas.height);
          
          // Calculate dynamic connection radius based on height
          // Higher particles get longer connections
          const heightFactor = (verticalPosition1 + verticalPosition2) / 2;
          const dynamicRadius = connectionRadius * (0.7 + heightFactor * 0.6);
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < dynamicRadius) {
            // Connections more visible higher up
            const baseOpacity = connectionOpacity * (0.5 + heightFactor * 1.5);
            const opacity = (1 - (distance / dynamicRadius)) * baseOpacity;
            
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            
            // Create a gradient that's more visible for higher particles
            const gradient = this.ctx.createLinearGradient(
              p1.x, p1.y, p2.x, p2.y
            );
            
            // More saturated colors for connections higher up
            const sat1 = 60 + verticalPosition1 * 30;
            const sat2 = 60 + verticalPosition2 * 30;
            const light1 = 50 + verticalPosition1 * 20;
            const light2 = 50 + verticalPosition2 * 20;
            
            gradient.addColorStop(0, `hsla(${p1.hue}, ${sat1}%, ${light1}%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${p2.hue}, ${sat2}%, ${light2}%, ${opacity})`);
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = opacity * 2.5;
            this.ctx.stroke();
          }
        }
      }
    } else {
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
}
