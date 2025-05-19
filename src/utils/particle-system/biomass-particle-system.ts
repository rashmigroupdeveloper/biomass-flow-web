
import { Particle, ParticleSystemOptions } from './types';
import { ParticleRenderer } from './renderer';
import { ParticleFactory } from './particle-factory';
import { FlowPatterns, applyUpwardFlow, applyDownwardFlow, applyCircularFlow, applyRadialFlow, applyNoiseFlow } from './flow-patterns';

export class BiomassParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private renderer: ParticleRenderer;
  private options: ParticleSystemOptions;
  private mousePosition: { x: number, y: number } | null = null;
  private isRunning = false;
  private animationFrame: number | null = null;
  private flowPatterns: FlowPatterns;
  
  constructor(canvasId: string, options: ParticleSystemOptions = {}) {
    // Find the canvas element
    const canvasElement = document.getElementById(canvasId);
    if (!canvasElement || !(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error(`Canvas element with id "${canvasId}" not found.`);
    }
    this.canvas = canvasElement;
    
    // Get the 2D rendering context
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Failed to get 2D rendering context from canvas.');
    }
    this.ctx = context;
    
    // Set canvas size to match its display size
    this.resizeCanvas();
    
    // Merge default options with provided options
    this.options = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 4,
      baseHue: 120, // Default to green
      backgroundColor: 'rgba(46, 125, 50, 0.05)',
      flowIntensity: 1.0,
      flowDirection: 'upward',
      speedFactor: 1.0,
      connectionRadius: 100,
      connectionOpacity: 0.1,
      mouseInteraction: true,
      responsive: true,
      densityFactor: 0.00015,
      ...options
    };
    
    // Initialize the renderer and flow patterns
    this.renderer = new ParticleRenderer(this.ctx, this.options);
    this.flowPatterns = new FlowPatterns(this.canvas, this.options);
    
    // Create particles
    this.createParticles();
    
    // Add event listeners for mouse interaction and responsive canvas
    this.setupEventListeners();
  }
  
  private resizeCanvas(): void {
    // Set canvas dimensions to match its CSS display size
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }
  
  private setupEventListeners(): void {
    // Handle window resize event for responsive canvas
    if (this.options.responsive) {
      window.addEventListener('resize', () => {
        this.resizeCanvas();
        this.createParticles(); // Recreate particles to match new canvas size
      });
    }
    
    // Handle mouse interaction
    if (this.options.mouseInteraction) {
      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      });
      
      this.canvas.addEventListener('mouseleave', () => {
        this.mousePosition = null;
      });
      
      // Handle touch events for mobile
      this.canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }, { passive: false });
      
      this.canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosition = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top
        };
      }, { passive: false });
      
      this.canvas.addEventListener('touchend', () => {
        this.mousePosition = null;
      });
    }
  }
  
  private createParticles(): void {
    const factory = new ParticleFactory(this.canvas.width, this.canvas.height, this.options);
    
    // Calculate number of particles based on canvas area and density factor
    let count = this.options.particleCount || 150;
    if (this.options.densityFactor) {
      const area = this.canvas.width * this.canvas.height;
      count = Math.floor(area * this.options.densityFactor);
      // Apply min/max constraints
      count = Math.max(50, Math.min(500, count));
    }
    
    this.particles = factory.createParticles(count);
  }
  
  private applyMouseInteraction(particle: Particle, delta: number): void {
    if (!this.mousePosition || !this.options.mouseInteraction) return;
    
    this.flowPatterns.applyMouseInfluence(particle, this.mousePosition, delta);
  }
  
  private applyFlowPatterns(particle: Particle, delta: number): void {
    const intensity = this.options.flowIntensity || 1.0;
    
    // Using the FlowPatterns class for more sophisticated flow control
    this.flowPatterns.applyFlow(particle, delta);
  }
  
  private updateParticle(particle: Particle, delta: number): void {
    // Apply flow patterns
    this.applyFlowPatterns(particle, delta);
    
    // Apply mouse interaction
    this.applyMouseInteraction(particle, delta);
    
    // Apply maximum speed limit
    const maxSpeed = 2 * (this.options.speedFactor || 1.0);
    const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
    
    if (currentSpeed > maxSpeed) {
      particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
      particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
    }
    
    // Add a small amount of randomness
    particle.speedX += (Math.random() - 0.5) * 0.1;
    particle.speedY += (Math.random() - 0.5) * 0.1;
    
    // Apply friction
    particle.speedX *= 0.98;
    particle.speedY *= 0.98;
    
    // Update position
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // Handle boundaries - wrap around edges
    if (particle.x < 0) particle.x = this.canvas.width;
    else if (particle.x > this.canvas.width) particle.x = 0;
    
    if (particle.y < 0) particle.y = this.canvas.height;
    else if (particle.y > this.canvas.height) particle.y = 0;
  }
  
  private animate = (timestamp: number): void => {
    // Track time for animation
    static let lastTime = 0;
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    
    // Update flow patterns time
    this.flowPatterns.updateTime(delta);
    
    // Clear the canvas
    this.renderer.clear();
    
    // First draw connections between particles
    this.renderer.drawConnections(this.particles);
    
    // Then update and draw individual particles
    for (const particle of this.particles) {
      this.updateParticle(particle, delta);
    }
    
    this.renderer.drawParticles(this.particles);
    
    // Continue animation loop if running
    if (this.isRunning) {
      this.animationFrame = requestAnimationFrame(this.animate);
    }
  };
  
  /**
   * Start the particle animation
   */
  start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animationFrame = requestAnimationFrame(this.animate);
    }
  }
  
  /**
   * Stop the particle animation
   */
  stop(): void {
    this.isRunning = false;
    if (this.animationFrame !== null) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }
  
  /**
   * Clean up resources and stop animation
   */
  destroy(): void {
    this.stop();
    
    // Remove event listeners
    if (this.options.responsive) {
      window.removeEventListener('resize', this.resizeCanvas);
    }
    
    if (this.options.mouseInteraction) {
      this.canvas.removeEventListener('mousemove', () => {});
      this.canvas.removeEventListener('mouseleave', () => {});
      this.canvas.removeEventListener('touchstart', () => {});
      this.canvas.removeEventListener('touchmove', () => {});
      this.canvas.removeEventListener('touchend', () => {});
    }
  }
  
  /**
   * Update system options
   */
  updateOptions(options: Partial<ParticleSystemOptions>): void {
    this.options = { ...this.options, ...options };
    this.renderer = new ParticleRenderer(this.ctx, this.options);
    this.flowPatterns = new FlowPatterns(this.canvas, this.options);
    
    // Recreate particles if count or size options changed
    if ('particleCount' in options || 'particleMinSize' in options || 'particleMaxSize' in options || 'densityFactor' in options) {
      this.createParticles();
    }
  }
}
