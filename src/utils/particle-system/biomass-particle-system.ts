
import { Particle, ParticleSystemOptions } from './types';
import { FlowPatterns } from './flow-patterns';
import { ParticleFactory } from './particle-factory';
import { Renderer } from './renderer';

export class BiomassParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private width: number;
  private height: number;
  private particles: Particle[] = [];
  private options: ParticleSystemOptions;
  private running: boolean = false;
  private animationFrameId: number = 0;
  private lastFrameTime: number = 0;
  private factory: ParticleFactory | null = null;
  private renderer: Renderer | null = null;
  private flowPatterns: FlowPatterns | null = null;
  private mousePosX: number = 0;
  private mousePosY: number = 0;
  private mouseInteracting: boolean = false;

  constructor(canvas: HTMLCanvasElement, options: ParticleSystemOptions) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    
    // Set default options
    this.options = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 3,
      baseHue: 120,
      hueVariation: 20,
      flowDirection: 'upward',
      flowIntensity: 0.5,
      speedFactor: 0.5,
      connectionRadius: 100,
      connectionOpacity: 0.3,
      interactive: true,
      responsive: true,
      ...options
    };
    
    this.initialize();
  }

  private initialize(): void {
    if (!this.ctx) return;
    
    // Initialize factory and renderer
    this.factory = new ParticleFactory(
      this.options.particleMinSize || 1,
      this.options.particleMaxSize || 3,
      this.options.baseHue || 120,
      this.options.hueVariation || 20,
      this.width,
      this.height
    );
    
    this.renderer = new Renderer(this.ctx, this.width, this.height);
    
    this.flowPatterns = new FlowPatterns(
      this.width,
      this.height,
      this.options.flowDirection || 'upward',
      this.options.flowIntensity || 0.5
    );
    
    // Create initial particles
    const count = this.options.particleCount || 150;
    for (let i = 0; i < count; i++) {
      if (this.factory) {
        this.particles.push(this.factory.createParticle());
      }
    }
    
    // Setup interaction events
    if (this.options.interactive) {
      this.setupInteraction();
    }
  }
  
  private setupInteraction(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosX = e.clientX - rect.left;
      this.mousePosY = e.clientY - rect.top;
      this.mouseInteracting = true;
    });
    
    this.canvas.addEventListener('mouseleave', () => {
      this.mouseInteracting = false;
    });
    
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mousePosX = e.touches[0].clientX - rect.left;
        this.mousePosY = e.touches[0].clientY - rect.top;
        this.mouseInteracting = true;
        e.preventDefault();
      }
    });
    
    this.canvas.addEventListener('touchend', () => {
      this.mouseInteracting = false;
    });
  }
  
  public start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }
  
  public stop(): void {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  public updateOptions(newOptions: Partial<ParticleSystemOptions>): void {
    this.options = { ...this.options, ...newOptions };
    
    // Update flow patterns if direction or intensity changed
    if (newOptions.flowDirection || newOptions.flowIntensity) {
      this.flowPatterns = new FlowPatterns(
        this.width,
        this.height,
        this.options.flowDirection || 'upward',
        this.options.flowIntensity || 0.5
      );
    }
  }
  
  public handleResize(): void {
    if (!this.ctx) return;
    
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    
    // Update factory, renderer and flow patterns with new dimensions
    if (this.factory && this.renderer && this.flowPatterns) {
      this.factory = new ParticleFactory(
        this.options.particleMinSize || 1,
        this.options.particleMaxSize || 3,
        this.options.baseHue || 120,
        this.options.hueVariation || 20,
        this.width,
        this.height
      );
      
      this.renderer = new Renderer(this.ctx, this.width, this.height);
      
      this.flowPatterns = new FlowPatterns(
        this.width,
        this.height,
        this.options.flowDirection || 'upward',
        this.options.flowIntensity || 0.5
      );
      
      // Adjust particles that are now out of bounds
      this.particles.forEach(p => {
        if (p.x > this.width) p.x = Math.random() * this.width;
        if (p.y > this.height) p.y = Math.random() * this.height;
      });
    }
  }
  
  private animate = (timestamp: number = 0): void => {
    if (!this.running) return;
    
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    this.update(deltaTime);
    this.render();
    
    this.animationFrameId = requestAnimationFrame(this.animate);
  }
  
  private update(deltaTime: number): void {
    if (!this.flowPatterns) return;
    
    // Update flow patterns time
    this.flowPatterns.updateTime(deltaTime);
    
    // Update particle positions
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      // Apply base motion
      p.x += p.speedX * (this.options.speedFactor || 0.5) * (deltaTime / 16.667);
      p.y += p.speedY * (this.options.speedFactor || 0.5) * (deltaTime / 16.667);
      
      // Apply flow pattern
      this.flowPatterns.applyFlow(p, deltaTime);
      
      // Apply mouse interaction if enabled
      if (this.mouseInteracting && this.options.interactive) {
        this.flowPatterns.applyMouseInfluence(p, { x: this.mousePosX, y: this.mousePosY });
      }
      
      // Wrap around screen
      if (p.x < 0) p.x = this.width;
      else if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      else if (p.y > this.height) p.y = 0;
    }
  }
  
  private render(): void {
    if (!this.ctx || !this.renderer) return;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background if specified
    if (this.options.backgroundColor) {
      this.ctx.fillStyle = this.options.backgroundColor;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    // Draw connections between particles
    if (this.options.connectionRadius && this.options.connectionRadius > 0) {
      this.renderer.renderConnections(
        this.particles,
        this.options.connectionRadius,
        this.options.connectionOpacity || 0.3
      );
    }
    
    // Draw particles
    this.renderer.renderParticles(this.particles);
  }
}
