export interface Vector2D {
  x: number;
  y: number;
}

export interface EnhancedParticle {
  x: number;
  y: number;
  size: number;
  hue: number;
  opacity: number;
  vx: number;
  vy: number;
  phase: number;
  trail: Vector2D[];
}

export interface EnhancedParticleSystemOptions {
  particleCount?: number;
  particleMinSize?: number;
  particleMaxSize?: number;
  baseHue?: number;
  backgroundColor?: string;
  flowIntensity?: number;
  flowDirection?: 'upward' | 'downward' | 'leftward' | 'rightward' | 'radial' | 'circular' | 'wave' | 'custom';
  speedFactor?: number;
  connectionRadius?: number;
  connectionOpacity?: number;
  mouseInteraction?: boolean;
  responsive?: boolean;
  densityFactor?: number;
  useHardwareAcceleration?: boolean;
  lowPerformanceMode?: boolean;
  adaptiveQuality?: boolean;
  maxConnections?: number;
  connectionLineWidth?: number;
  particleOpacity?: number;
  pulseEffect?: boolean;
  glowEffect?: boolean;
  noiseIntensity?: number;
  colorVariation?: number;
  enableCollisions?: boolean;
  enableTrails?: boolean;
  trailLength?: number;
  enablePhysics?: boolean;
  gravity?: number;
  friction?: number;
  enableMagneticField?: boolean;
  magneticStrength?: number;
  enableWaveDistortion?: boolean;
  waveAmplitude?: number;
  waveFrequency?: number;
}

export class EnhancedParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: EnhancedParticle[] = [];
  private animationId: number | null = null;
  private options: Required<EnhancedParticleSystemOptions>;
  private performanceMode: 'high' | 'medium' | 'low' = 'high';
  private lastFrameTime = 0;
  private targetFPS = 60;
  private frameCount = 0;
  private fpsHistory: number[] = [];
  private adaptiveQuality = true;

  constructor(canvas: HTMLCanvasElement, options: EnhancedParticleSystemOptions = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;

    // Default options with proper types
    this.options = {
      particleCount: options.particleCount ?? 150,
      particleMinSize: options.particleMinSize ?? 1,
      particleMaxSize: options.particleMaxSize ?? 4,
      baseHue: options.baseHue ?? 120,
      backgroundColor: options.backgroundColor ?? 'transparent',
      flowIntensity: options.flowIntensity ?? 1,
      flowDirection: options.flowDirection ?? 'upward',
      speedFactor: options.speedFactor ?? 1,
      connectionRadius: options.connectionRadius ?? 80,
      connectionOpacity: options.connectionOpacity ?? 0.1,
      mouseInteraction: options.mouseInteraction ?? true,
      responsive: options.responsive ?? true,
      densityFactor: options.densityFactor ?? 1,
      useHardwareAcceleration: options.useHardwareAcceleration ?? true,
      lowPerformanceMode: options.lowPerformanceMode ?? false,
      adaptiveQuality: options.adaptiveQuality ?? true,
      maxConnections: options.maxConnections ?? 3,
      connectionLineWidth: options.connectionLineWidth ?? 1,
      particleOpacity: options.particleOpacity ?? 0.8,
      pulseEffect: options.pulseEffect ?? false,
      glowEffect: options.glowEffect ?? false,
      noiseIntensity: options.noiseIntensity ?? 0.5,
      colorVariation: options.colorVariation ?? 30,
      enableCollisions: options.enableCollisions ?? false,
      enableTrails: options.enableTrails ?? false,
      trailLength: options.trailLength ?? 5,
      enablePhysics: options.enablePhysics ?? false,
      gravity: options.gravity ?? 0,
      friction: options.friction ?? 0.99,
      enableMagneticField: options.enableMagneticField ?? false,
      magneticStrength: options.magneticStrength ?? 1,
      enableWaveDistortion: options.enableWaveDistortion ?? false,
      waveAmplitude: options.waveAmplitude ?? 10,
      waveFrequency: options.waveFrequency ?? 0.01
    };

    this.detectPerformanceMode();
    this.initializeParticles();
    this.setupEventListeners();
  }

  private detectPerformanceMode(): void {
    // Check if low performance mode is forced globally
    if (typeof window !== 'undefined' && window.BIOMASS_LOW_PERFORMANCE_MODE) {
      this.performanceMode = 'low';
      this.options.particleCount = Math.min(this.options.particleCount, 50);
      this.options.connectionRadius = Math.min(this.options.connectionRadius, 50);
      this.options.enableTrails = false;
      this.options.glowEffect = false;
      this.options.enablePhysics = false;
      return;
    }

    // Check device capabilities
    const isMobile = typeof navigator !== 'undefined' && 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const hasLowCPU = typeof navigator !== 'undefined' && 
      navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;

    if (isMobile || hasLowCPU || this.options.lowPerformanceMode) {
      this.performanceMode = 'low';
      this.options.particleCount = Math.min(this.options.particleCount, 75);
      this.options.enableTrails = false;
      this.options.glowEffect = false;
    }
  }

  private initializeParticles(): void {
    // Clear existing particles
    this.particles = [];

    // Set canvas size if responsive
    if (this.options.responsive) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    }

    // Create particles
    const count = this.options.particleCount;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const minSize = this.options.particleMinSize;
    const maxSize = this.options.particleMaxSize;
    const baseHue = this.options.baseHue;
    const colorVariation = this.options.colorVariation;

    for (let i = 0; i < count; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const hue = (baseHue + Math.random() * colorVariation * 2 - colorVariation) % 360;
      const opacity = Math.random() * 0.5 + this.options.particleOpacity - 0.5;
      const vx = (Math.random() - 0.5) * this.options.speedFactor;
      const vy = (Math.random() - 0.5) * this.options.speedFactor;
      const phase = Math.random() * Math.PI * 2;

      this.particles.push({
        x,
        y,
        size,
        hue,
        opacity,
        vx,
        vy,
        phase,
        trail: []
      });
    }
  }

  private setupEventListeners(): void {
    if (this.options.responsive) {
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    if (this.options.mouseInteraction) {
      this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    }
  }

  private handleResize(): void {
    if (this.options.responsive) {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
      this.initializeParticles();
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    if (!this.options.mouseInteraction) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    this.applyForceToParticles(x, y);
  }

  private handleTouchMove(e: TouchEvent): void {
    if (!this.options.mouseInteraction || !e.touches[0]) return;
    e.preventDefault();

    const rect = this.canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    
    this.applyForceToParticles(x, y);
  }

  private applyForceToParticles(x: number, y: number): void {
    const radius = this.options.connectionRadius * 2;
    const strength = 0.5 * this.options.flowIntensity;

    for (const particle of this.particles) {
      const dx = particle.x - x;
      const dy = particle.y - y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < radius) {
        const force = (1 - distance / radius) * strength;
        particle.vx += (dx / distance) * force;
        particle.vy += (dy / distance) * force;
      }
    }
  }

  private updateParticleFlow(particle: EnhancedParticle): void {
    const time = Date.now() * 0.001;
    const intensity = this.options.flowIntensity;
    const speed = this.options.speedFactor;

    switch (this.options.flowDirection) {
      case 'upward':
        particle.vy -= intensity * speed * 0.1;
        break;
      case 'downward':
        particle.vy += intensity * speed * 0.1;
        break;
      case 'leftward':
        particle.vx -= intensity * speed * 0.1;
        break;
      case 'rightward':
        particle.vx += intensity * speed * 0.1;
        break;
      case 'radial':
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
        particle.vx += Math.cos(angle) * intensity * speed * 0.1;
        particle.vy += Math.sin(angle) * intensity * speed * 0.1;
        break;
      case 'circular':
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        const dx = particle.x - cx;
        const dy = particle.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle2 = Math.atan2(dy, dx);
        particle.vx += -Math.sin(angle2) * intensity * speed * 0.1;
        particle.vy += Math.cos(angle2) * intensity * speed * 0.1;
        break;
      case 'wave':
        particle.vx += Math.sin(time + particle.y * 0.01) * intensity * speed * 0.1;
        particle.vy += Math.cos(time + particle.x * 0.01) * intensity * speed * 0.1;
        break;
      case 'custom':
        // Custom flow pattern can be implemented here
        particle.vx += Math.sin(time * 0.5 + particle.phase) * intensity * speed * 0.05;
        particle.vy += Math.cos(time * 0.3 + particle.phase) * intensity * speed * 0.05;
        break;
    }
  }

  private updateParticles(): void {
    const width = this.canvas.width;
    const height = this.canvas.height;
    const noiseIntensity = this.options.noiseIntensity;
    const time = Date.now() * 0.001;
    const friction = this.options.friction;
    const gravity = this.options.gravity;
    const enablePhysics = this.options.enablePhysics;
    const enableTrails = this.options.enableTrails;
    const trailLength = this.options.trailLength;
    const enableCollisions = this.options.enableCollisions;
    const enableWaveDistortion = this.options.enableWaveDistortion;
    const waveAmplitude = this.options.waveAmplitude;
    const waveFrequency = this.options.waveFrequency;

    for (const particle of this.particles) {
      // Apply flow direction
      this.updateParticleFlow(particle);
      
      // Apply random movement (noise)
      particle.vx += (Math.random() - 0.5) * noiseIntensity * 0.1;
      particle.vy += (Math.random() - 0.5) * noiseIntensity * 0.1;
      
      // Apply physics if enabled
      if (enablePhysics) {
        // Apply gravity
        particle.vy += gravity * 0.01;
        
        // Apply friction
        particle.vx *= friction;
        particle.vy *= friction;
      }
      
      // Apply wave distortion if enabled
      if (enableWaveDistortion) {
        particle.y += Math.sin(time * waveFrequency + particle.x * 0.01) * waveAmplitude * 0.1;
      }
      
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Store trail positions if enabled
      if (enableTrails) {
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > trailLength) {
          particle.trail.shift();
        }
      }
      
      // Handle collisions with other particles if enabled
      if (enableCollisions) {
        for (const other of this.particles) {
          if (particle === other) continue;
          
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDistance = particle.size + other.size;
          
          if (distance < minDistance) {
            const angle = Math.atan2(dy, dx);
            const targetX = particle.x + Math.cos(angle) * minDistance;
            const targetY = particle.y + Math.sin(angle) * minDistance;
            const ax = (targetX - other.x) * 0.05;
            const ay = (targetY - other.y) * 0.05;
            
            particle.vx -= ax;
            particle.vy -= ay;
            other.vx += ax;
            other.vy += ay;
          }
        }
      }
      
      // Handle boundary conditions (wrap around)
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    }
  }

  private drawParticles(): void {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const connectionRadius = this.options.connectionRadius;
    const connectionOpacity = this.options.connectionOpacity;
    const maxConnections = this.options.maxConnections;
    const connectionLineWidth = this.options.connectionLineWidth;
    const glowEffect = this.options.glowEffect;
    const pulseEffect = this.options.pulseEffect;
    const enableTrails = this.options.enableTrails;
    const time = Date.now() * 0.001;
    
    // Clear canvas
    ctx.globalCompositeOperation = 'source-over';
    if (this.options.backgroundColor === 'transparent') {
      ctx.clearRect(0, 0, width, height);
    } else {
      ctx.fillStyle = this.options.backgroundColor;
      ctx.fillRect(0, 0, width, height);
    }
    
    // Draw connections between particles
    ctx.globalCompositeOperation = 'lighter';
    ctx.lineWidth = connectionLineWidth;
    
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      let connectionCount = 0;
      
      for (let j = i + 1; j < this.particles.length; j++) {
        if (connectionCount >= maxConnections) break;
        
        const other = this.particles[j];
        const dx = other.x - particle.x;
        const dy = other.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionRadius) {
          const opacity = (1 - distance / connectionRadius) * connectionOpacity;
          const hue = (particle.hue + other.hue) / 2;
          
          ctx.beginPath();
          ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${opacity})`;
          
          if (enableTrails && particle.trail.length > 1 && other.trail.length > 1) {
            // Draw connection between trails
            const trailPoint1 = particle.trail[particle.trail.length - 1];
            const trailPoint2 = other.trail[other.trail.length - 1];
            ctx.moveTo(trailPoint1.x, trailPoint1.y);
            ctx.lineTo(trailPoint2.x, trailPoint2.y);
          } else {
            // Draw direct connection
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
          }
          
          ctx.stroke();
          connectionCount++;
        }
      }
    }
    
    // Draw particles
    for (const particle of this.particles) {
      let opacity = particle.opacity;
      let size = particle.size;
      
      // Apply pulse effect if enabled
      if (pulseEffect) {
        opacity *= 0.7 + Math.sin(time * 2 + particle.phase) * 0.3;
        size *= 0.8 + Math.sin(time * 3 + particle.phase) * 0.2;
      }
      
      // Draw trails if enabled
      if (enableTrails && particle.trail.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = `hsla(${particle.hue}, 80%, 60%, ${opacity * 0.5})`;
        ctx.lineWidth = size * 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        for (let i = 1; i < particle.trail.length; i++) {
          ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        }
        ctx.stroke();
      }
      
      // Apply glow effect if enabled
      if (glowEffect) {
        ctx.shadowBlur = size * 2;
        ctx.shadowColor = `hsla(${particle.hue}, 80%, 60%, 0.5)`;
      } else {
        ctx.shadowBlur = 0;
      }
      
      // Draw particle
      ctx.beginPath();
      ctx.fillStyle = `hsla(${particle.hue}, 80%, 60%, ${opacity})`;
      ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'source-over';
  }

  private animate(timestamp: number = 0): void {
    // Calculate FPS for adaptive quality
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    if (deltaTime > 0) {
      const fps = 1000 / deltaTime;
      this.fpsHistory.push(fps);
      
      if (this.fpsHistory.length > 30) {
        this.fpsHistory.shift();
      }
      
      // Adjust quality if adaptive quality is enabled
      if (this.options.adaptiveQuality && this.frameCount % 60 === 0) {
        const avgFps = this.fpsHistory.reduce((sum, fps) => sum + fps, 0) / this.fpsHistory.length;
        
        if (avgFps < 30 && this.performanceMode !== 'low') {
          this.performanceMode = 'low';
          this.options.glowEffect = false;
          this.options.enableTrails = false;
          this.options.maxConnections = Math.min(this.options.maxConnections, 2);
        } else if (avgFps > 50 && avgFps < 55 && this.performanceMode !== 'medium') {
          this.performanceMode = 'medium';
          this.options.glowEffect = false;
          this.options.enableTrails = false;
          this.options.maxConnections = Math.min(this.options.maxConnections, 3);
        } else if (avgFps > 58 && this.performanceMode !== 'high') {
          this.performanceMode = 'high';
          this.options.glowEffect = this.options.glowEffect;
          this.options.enableTrails = this.options.enableTrails;
          this.options.maxConnections = this.options.maxConnections;
        }
      }
    }
    
    this.frameCount++;
    
    // Update and draw
    this.updateParticles();
    this.drawParticles();
    
    // Request next frame
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }

  public updateOptions(newOptions: Partial<EnhancedParticleSystemOptions>): void {
    this.options = { ...this.options, ...newOptions };
    
    // Re-initialize particles if count changed
    if (newOptions.particleCount !== undefined) {
      this.initializeParticles();
    }
  }

  public start(): void {
    if (this.animationId === null) {
      this.animate();
    }
  }

  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  public handleResize(): void {
    // Update canvas size and redistribute particles
    this.initializeParticles();
  }
}
