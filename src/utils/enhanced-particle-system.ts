import { Particle, ParticleSystemOptions, FlowDirection } from './particle-system/types';
import { ParticleFactory } from './particle-system/particle-factory';
import { ParticleRenderer } from './particle-system/renderer';

export class EnhancedBiomassParticleSystem {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private width: number = 0;
  private height: number = 0;
  private factory: ParticleFactory | null = null;
  private renderer: ParticleRenderer | null = null;
  private running: boolean = false;
  private animationFrameId: number = 0;
  private lastFrameTime: number = 0;
  private mousePosX: number = 0;
  private mousePosY: number = 0;
  private mouseInteracting: boolean = false;
  private readonly options: ParticleSystemOptions;

  constructor(canvasId: string, options: ParticleSystemOptions) {
    // Default options with reasonable fallbacks
    this.options = {
      canvasId,
      particleCount: options.particleCount || 150,
      particleMinSize: options.particleMinSize || 1,
      particleMaxSize: options.particleMaxSize || 3,
      baseHue: options.baseHue || 120, // Green hue for biomass theme
      hueVariation: options.hueVariation || 20,
      flowDirection: options.flowDirection || 'upward',
      flowIntensity: options.flowIntensity || 0.5,
      speedFactor: options.speedFactor || 0.5,
      connectionRadius: options.connectionRadius || 100,
      connectionOpacity: options.connectionOpacity || 0.3,
      interactive: options.interactive !== undefined ? options.interactive : true,
      flowOptions: options.flowOptions,
      lowPerformanceMode: options.lowPerformanceMode || false
    };
  }

  initialize(): void {
    this.canvas = document.getElementById(this.options.canvasId) as HTMLCanvasElement;
    if (!this.canvas) {
      console.error(`Canvas with ID '${this.options.canvasId}' not found`);
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    if (!this.ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    // Set canvas size
    this.setCanvasSize();

    // Initialize the factory and renderer
    this.factory = new ParticleFactory(
      this.options.particleMinSize!,
      this.options.particleMaxSize!,
      this.options.baseHue!,
      this.options.hueVariation!,
      this.width,
      this.height
    );

    this.renderer = new ParticleRenderer(this.ctx, this.width, this.height);

    // Initialize particles
    // Adjust particle count for low performance mode
    const particleCount = this.options.lowPerformanceMode
      ? Math.floor(this.options.particleCount! * 0.5) // 50% fewer particles in low performance mode
      : this.options.particleCount!;

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      if (this.factory) {
        this.particles.push(this.factory.createParticle());
      }
    }

    // Add event listeners if interactive
    if (this.options.interactive) {
      this.setupInteraction();
    }

    // Start animation loop
    this.start();

    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private setCanvasSize(): void {
    if (this.canvas) {
      // Get the container dimensions
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width;
      this.height = rect.height;

      // Set the canvas size with device pixel ratio for sharper rendering
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;

      // Scale the context to ensure correct drawing operations
      if (this.ctx) {
        this.ctx.scale(dpr, dpr);
      }

      // Set CSS size
      this.canvas.style.width = `${this.width}px`;
      this.canvas.style.height = `${this.height}px`;
    }
  }

  private setupInteraction(): void {
    if (!this.canvas) return;

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas!.getBoundingClientRect();
      this.mousePosX = e.clientX - rect.left;
      this.mousePosY = e.clientY - rect.top;
      this.mouseInteracting = true;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouseInteracting = false;
    });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas!.getBoundingClientRect();
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

  private handleResize(): void {
    this.setCanvasSize();
    if (this.factory && this.renderer) {
      // Update factory and renderer with new dimensions
      this.factory = new ParticleFactory(
        this.options.particleMinSize!,
        this.options.particleMaxSize!,
        this.options.baseHue!,
        this.options.hueVariation!,
        this.width,
        this.height
      );

      this.renderer = new ParticleRenderer(this.ctx!, this.width, this.height);

      // Re-initialize particles within new dimensions
      this.particles.forEach(p => {
        if (p.x > this.width) p.x = Math.random() * this.width;
        if (p.y > this.height) p.y = Math.random() * this.height;
      });
    }
  }

  private update(time: number): void {
    if (!this.ctx || !this.canvas) return;

    // Clear the canvas
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and render particles
    this.updateParticles(time);
    this.drawConnections();
    this.drawParticles();

    // Add interactive effect if mouse is over canvas
    if (this.mouseInteracting && this.options.interactive) {
      this.handleMouseInteraction();
    }
  }

  private updateParticles(time: number): void {
    const deltaTime = time - this.lastFrameTime;
    const timeScale = deltaTime / 16.667; // Normalize for 60 FPS

    // Update position and handle boundaries
    this.particles.forEach(p => {
      // Apply base velocity
      p.x += p.speedX * this.options.speedFactor! * timeScale;
      p.y += p.speedY * this.options.speedFactor! * timeScale;

      this._updateParticlePosition(p, time);

      // Handle boundaries - wrap particles around the canvas
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
    });
  }

  private _updateParticlePosition(particle: Particle, time: number) {
    // Apply flow direction
    let flowX = 0;
    let flowY = 0;

    // Calculate base flow based on flowDirection
    const flowDirection = this.options.flowDirection as FlowDirection;
    
    if (flowDirection === 'leftward') {
      flowX = -this.options.flowIntensity! || -1;
    } else if (flowDirection === 'rightward') {
      flowX = this.options.flowIntensity! || 1;
    } else if (flowDirection === 'upward') {
      flowY = -this.options.flowIntensity! || -1;
    } else if (flowDirection === 'downward') {
      flowY = this.options.flowIntensity! || 1;
    } else if (flowDirection === 'radial') {
      const dx = particle.x - this.width / 2;
      const dy = particle.y - this.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        flowX = (dx / distance) * (this.options.flowIntensity! || 1);
        flowY = (dy / distance) * (this.options.flowIntensity! || 1);
      }
    } else if (flowDirection === 'circular') {
      const dx = particle.x - this.width / 2;
      const dy = particle.y - this.height / 2;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > 0) {
        flowX = (-dy / distance) * (this.options.flowIntensity! || 1);
        flowY = (dx / distance) * (this.options.flowIntensity! || 1);
      }
    } else if (flowDirection === 'wave') {
      const waveAmplitude = 2;
      const waveFrequency = 0.02;
      const waveSpeed = 0.01;
      flowY = Math.sin(particle.x * waveFrequency + time * waveSpeed) * waveAmplitude;
    } else if (flowDirection === 'custom' && this.options.flowOptions) {
      // Custom flow implementation using Perlin noise or other advanced patterns
      // would be implemented here...
    }

    particle.x += flowX * (this.options.speedFactor! || 1);
    particle.y += flowY * (this.options.speedFactor! || 1);
  }

  private drawParticles(): void {
    if (!this.renderer) return;
    this.renderer.renderParticles(this.particles);
  }

  private drawConnections(): void {
    // Adjust connection radius for low performance mode
    const connectionRadius = this.options.lowPerformanceMode
      ? this.options.connectionRadius! * 0.7 // 30% smaller connection radius for performance
      : this.options.connectionRadius!;

    if (!this.ctx || !this.renderer || connectionRadius <= 0) return;

    // Skip connections in extreme low performance mode if too many particles
    if (this.options.lowPerformanceMode && this.particles.length > 100) {
      // Draw connections only for a subset of particles
      const subsetSize = Math.floor(this.particles.length * 0.3); // Only 30% of particles
      const subset = this.particles.slice(0, subsetSize);
      this.renderer.renderConnections(subset, connectionRadius, this.options.connectionOpacity!);
    } else {
      this.renderer.renderConnections(this.particles, connectionRadius, this.options.connectionOpacity!);
    }
  }

  private handleMouseInteraction(): void {
    if (!this.factory || !this.renderer) return;

    // Add particles near the mouse pointer
    const chanceToAdd = this.options.lowPerformanceMode ? 0.05 : 0.1; // Lower chance in low performance mode

    if (Math.random() < chanceToAdd) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      const particle = this.factory.createParticleAt(
        this.mousePosX + offsetX,
        this.mousePosY + offsetY
      );
      this.particles.push(particle);

      // Cap the maximum number of particles
      const maxParticles = this.options.lowPerformanceMode
        ? Math.floor(this.options.particleCount! * 0.75) // 25% lower cap in low performance mode
        : this.options.particleCount! * 1.5;

      while (this.particles.length > maxParticles) {
        this.particles.shift();
      }
    }

    // Repel particles near the mouse
    const repelRadius = this.options.lowPerformanceMode ? 60 : 100;
    const repelStrength = this.options.lowPerformanceMode ? 0.5 : 1;

    this.particles.forEach(p => {
      const dx = p.x - this.mousePosX;
      const dy = p.y - this.mousePosY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < repelRadius && distance > 0) {
        const force = (repelRadius - distance) / repelRadius;
        p.x += (dx / distance) * force * repelStrength;
        p.y += (dy / distance) * force * repelStrength;
      }
    });
  }

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.animate();
  }

  stop(): void {
    this.running = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private animate = (time: number = 0): void => {
    if (!this.running) return;

    this.update(time);
    this.lastFrameTime = time;
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  destroy(): void {
    this.stop();
    if (this.canvas) {
      // Remove event listeners to prevent memory leaks
      this.canvas.removeEventListener('mousemove', () => { });
      this.canvas.removeEventListener('mouseleave', () => { });
      this.canvas.removeEventListener('touchmove', () => { });
      this.canvas.removeEventListener('touchend', () => { });
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.particles = [];
    this.factory = null;
    this.renderer = null;
    this.ctx = null;
    this.canvas = null;
  }
}
