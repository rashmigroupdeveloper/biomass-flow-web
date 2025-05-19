
import { ParticleSystemOptions, Particle, Vector2D } from './types';
import { ParticleFactory } from './particle-factory';
import { FlowPatterns } from './flow-patterns';
import { ParticleRenderer } from './renderer';

export class BiomassParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private options: ParticleSystemOptions;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private lastUpdateTime: number = 0;
  private mousePos: Vector2D | null = null;
  
  private particleFactory: ParticleFactory;
  private flowPatterns: FlowPatterns;
  private renderer: ParticleRenderer;
  
  constructor(canvasId: string, options: ParticleSystemOptions = {}) {
    // Set default options
    this.options = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 3,
      baseHue: 120,
      backgroundColor: 'rgba(46, 125, 50, 0.05)',
      flowIntensity: 1,
      flowDirection: 'upward',
      speedFactor: 0.5,
      connectionRadius: 100,
      connectionOpacity: 0.1,
      mouseInteraction: true,
      responsive: true,
      densityFactor: 0.00007,
      ...options
    };
    
    // Initialize canvas
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      throw new Error(`Canvas with id "${canvasId}" not found`);
    }
    
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;
    
    // Initialize particle system components
    this.particleFactory = new ParticleFactory(this.canvas, this.options);
    this.flowPatterns = new FlowPatterns(this.canvas, this.options);
    this.renderer = new ParticleRenderer(this.ctx, this.options);
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Set initial canvas size
    this.resizeCanvas();
  }
  
  private setupEventListeners(): void {
    // Mouse interaction
    if (this.options.mouseInteraction) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.addEventListener('mouseleave', this.handleMouseLeave);
      this.canvas.addEventListener('touchmove', this.handleTouchMove);
      this.canvas.addEventListener('touchend', this.handleMouseLeave);
    }
    
    // Responsive canvas size
    if (this.options.responsive) {
      window.addEventListener('resize', this.handleResize);
    }
  }
  
  private removeEventListeners(): void {
    if (this.options.mouseInteraction) {
      this.canvas.removeEventListener('mousemove', this.handleMouseMove);
      this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
      this.canvas.removeEventListener('touchmove', this.handleTouchMove);
      this.canvas.removeEventListener('touchend', this.handleMouseLeave);
    }
    
    if (this.options.responsive) {
      window.removeEventListener('resize', this.handleResize);
    }
  }
  
  private handleMouseMove = (e: MouseEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };
  
  private handleTouchMove = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      e.preventDefault();
      const rect = this.canvas.getBoundingClientRect();
      this.mousePos = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
  };
  
  private handleMouseLeave = (): void => {
    this.mousePos = null;
  };
  
  private handleResize = (): void => {
    this.resizeCanvas();
  };
  
  private resizeCanvas(): void {
    if (this.options.responsive) {
      const parent = this.canvas.parentElement;
      if (parent) {
        this.canvas.width = parent.clientWidth;
        this.canvas.height = parent.clientHeight;
        
        // Adjust particle count based on canvas size
        const area = this.canvas.width * this.canvas.height;
        const targetCount = Math.floor(area * (this.options.densityFactor || 0.00007));
        
        // Only recreate particles if count differs significantly
        if (Math.abs(targetCount - this.particles.length) > 10) {
          this.particles = this.particleFactory.createParticles(targetCount);
        }
      }
    }
  }
  
  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.lastUpdateTime = performance.now();
    
    // Create initial particles
    const count = this.options.particleCount || 150;
    this.particles = this.particleFactory.createParticles(count);
    
    // Start animation loop
    this.animate();
  }
  
  stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
  
  destroy(): void {
    this.stop();
    this.removeEventListeners();
    this.particles = [];
  }
  
  private animate = (): void => {
    if (!this.isRunning) return;
    
    const currentTime = performance.now();
    const delta = currentTime - this.lastUpdateTime;
    this.lastUpdateTime = currentTime;
    
    // Update time for flow patterns
    this.flowPatterns.updateTime(delta);
    
    // Clear canvas
    this.renderer.clear();
    
    // Update and draw particles
    this.updateParticles(delta);
    this.renderer.drawConnections(this.particles);
    this.renderer.drawParticles(this.particles);
    
    // Request next frame
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
  
  private updateParticles(delta: number): void {
    this.particles.forEach(particle => {
      // Apply flow patterns
      this.flowPatterns.applyFlow(particle, delta);
      
      // Apply mouse influence if enabled
      if (this.options.mouseInteraction && this.mousePos) {
        this.flowPatterns.applyMouseInfluence(particle, this.mousePos, delta);
      }
      
      // Check if particle is out of bounds and reset if necessary
      this.particleFactory.resetParticle(particle);
    });
  }
}
