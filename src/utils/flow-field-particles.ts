
import { ParticleSystemOptions, Particle, Vector2D } from './particle-system/types';

// Flow field system options interface
interface FlowFieldOptions extends ParticleSystemOptions {
  flowDirection?: string;
  flowIntensity?: number;
  interactionStrength?: number;
}

export class BiomassFlowFieldSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private mousePosition: Vector2D | null = null;
  private options: FlowFieldOptions;
  private rafId: number | null = null;
  private isRunning: boolean = false;
  
  constructor(canvasId: string, options: FlowFieldOptions = {}) {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }
    
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }
    this.ctx = ctx;
    
    // Default options
    this.options = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 4,
      baseHue: 120, // Green hue
      backgroundColor: 'rgba(46, 125, 50, 0.05)',
      flowDirection: 'upward',
      flowIntensity: 1.2,
      interactionStrength: 1.5,
      connectionRadius: 120,
      mouseInteraction: true,
      responsive: true,
      speedFactor: 1.0,
      ...options
    };
    
    this.initCanvas();
    this.createParticles();
    this.setupEventListeners();
  }
  
  private initCanvas(): void {
    const setCanvasDimensions = () => {
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    };
    
    setCanvasDimensions();
    
    if (this.options.responsive) {
      window.addEventListener('resize', setCanvasDimensions);
    }
  }
  
  private createParticles(): void {
    const count = this.options.particleCount || 150;
    const minSize = this.options.particleMinSize || 1;
    const maxSize = this.options.particleMaxSize || 4;
    const baseHue = this.options.baseHue || 120;
    
    this.particles = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      // Calculate speed based on size (smaller particles move faster)
      const speedFactor = this.options.speedFactor || 1.0;
      const baseSpeed = (1.5 - size / maxSize) * speedFactor;
      
      const particle: Particle = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size,
        speedX: (Math.random() - 0.5) * baseSpeed,
        speedY: (Math.random() - 0.5) * baseSpeed,
        hue: baseHue + Math.random() * 30 - 15, // Variation around base hue
      };
      
      this.particles.push(particle);
    }
  }
  
  private setupEventListeners(): void {
    if (this.options.mouseInteraction) {
      // Track mouse movement
      this.canvas.addEventListener('mousemove', (event) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        };
      });
      
      // Reset mouse position when mouse leaves canvas
      this.canvas.addEventListener('mouseleave', () => {
        this.mousePosition = null;
      });
    }
  }
  
  private applyFlowField(particle: Particle): void {
    const flowIntensity = this.options.flowIntensity || 1.0;
    const direction = this.options.flowDirection || 'upward';
    
    // Apply different flow patterns based on the selected direction
    switch (direction) {
      case 'upward':
        particle.speedY -= 0.01 * flowIntensity;
        break;
      case 'downward':
        particle.speedY += 0.01 * flowIntensity;
        break;
      case 'leftward':
        particle.speedX -= 0.01 * flowIntensity;
        break;
      case 'rightward':
        particle.speedX += 0.01 * flowIntensity;
        break;
      case 'circular':
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
        
        if (distanceToCenter > 0) {
          const angle = Math.atan2(dy, dx);
          particle.speedX += Math.cos(angle + Math.PI / 2) * 0.01 * flowIntensity;
          particle.speedY += Math.sin(angle + Math.PI / 2) * 0.01 * flowIntensity;
        }
        break;
      case 'radial':
        const centerX2 = this.canvas.width / 2;
        const centerY2 = this.canvas.height / 2;
        const dx2 = centerX2 - particle.x;
        const dy2 = centerY2 - particle.y;
        const distanceToCenter2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        
        if (distanceToCenter2 > 0) {
          const angle = Math.atan2(dy2, dx2);
          particle.speedX -= Math.cos(angle) * 0.01 * flowIntensity;
          particle.speedY -= Math.sin(angle) * 0.01 * flowIntensity;
        }
        break;
      case 'noise': // Simple perlin-like noise approximation
        const noise = Math.sin(particle.x * 0.01) * Math.cos(particle.y * 0.01);
        particle.speedX += Math.cos(noise * Math.PI * 2) * 0.01 * flowIntensity;
        particle.speedY += Math.sin(noise * Math.PI * 2) * 0.01 * flowIntensity;
        break;
    }
    
    // Apply mouse interaction if enabled
    if (this.options.mouseInteraction && this.mousePosition) {
      const dx = this.mousePosition.x - particle.x;
      const dy = this.mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      if (distance < maxDistance && distance > 0) {
        const force = (1 - distance / maxDistance) * 0.02 * (this.options.interactionStrength || 1.5);
        particle.speedX += dx * force;
        particle.speedY += dy * force;
      }
    }
  }
  
  private updateParticle(particle: Particle): void {
    // Apply flow field forces
    this.applyFlowField(particle);
    
    // Apply velocity limits
    const maxSpeed = 2.0;
    const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
    
    if (speed > maxSpeed) {
      particle.speedX = (particle.speedX / speed) * maxSpeed;
      particle.speedY = (particle.speedY / speed) * maxSpeed;
    }
    
    // Apply some friction to prevent excessive speed
    particle.speedX *= 0.98;
    particle.speedY *= 0.98;
    
    // Update position
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Wrap around edges
    if (particle.x < 0) particle.x = this.canvas.width;
    if (particle.x > this.canvas.width) particle.x = 0;
    if (particle.y < 0) particle.y = this.canvas.height;
    if (particle.y > this.canvas.height) particle.y = 0;
  }
  
  private drawParticle(particle: Particle): void {
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, 0.7)`;
    this.ctx.fill();
  }
  
  private drawConnections(): void {
    const connectionRadius = this.options.connectionRadius || 100;
    
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionRadius) {
          const opacity = (1 - distance / connectionRadius) * 0.15; // Adjust opacity based on distance
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `hsla(${this.particles[i].hue}, 70%, 60%, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }
  
  private animate = (): void => {
    // Clear canvas
    this.ctx.fillStyle = this.options.backgroundColor || 'rgba(255, 255, 255, 0.1)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw connections first (behind particles)
    this.drawConnections();
    
    // Update and draw particles
    this.particles.forEach(particle => {
      this.updateParticle(particle);
      this.drawParticle(particle);
    });
    
    // Continue animation loop
    if (this.isRunning) {
      this.rafId = requestAnimationFrame(this.animate);
    }
  };
  
  // Public methods
  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }
  
  stop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
  
  destroy(): void {
    this.stop();
    // Remove event listeners
    if (this.options.mouseInteraction) {
      this.canvas.removeEventListener('mousemove', () => {});
      this.canvas.removeEventListener('mouseleave', () => {});
    }
    if (this.options.responsive) {
      window.removeEventListener('resize', () => {});
    }
  }
}
