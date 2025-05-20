/**
 * Enhanced Biomass Particle System with trailing effects
 *
 * This extends the functionality of the BiomassParticleSystem to add:
 * - Particle trails that persist for a few seconds
 * - Elongated particle shapes that resemble grass or plant-like structures
 * - Wave-like motion for a more organic, flowing appearance
 * - Subtle glow effects for enhanced visibility
 */

import { EnhancedParticleSystemOptions } from './particle-system/enhanced-types';

interface TrailPoint {
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
}

interface EnhancedParticle {
  x: number;
  y: number;
  size: number;
  originalSize: number;
  elongation: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  growing: boolean;
  lifespan: number;
  age: number;
  rotation: number;
  rotationSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  wavePhase: number;
  angle: number;
  radius: number;
  trail: TrailPoint[];
  trailMaxLength: number;
  oscillationPhase?: number;
  oscillationSpeed?: number;
}

interface MousePosition {
  x: number | null;
  y: number | null;
}

export class EnhancedBiomassParticleSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: EnhancedParticle[] = [];
  private options: EnhancedParticleSystemOptions;
  private mousePosition: MousePosition = { x: null, y: null };
  private lastFrameTime: number = 0;
  private isRunning: boolean = false;
  private animationFrameId: number | null = null;
  private time: number = 0;

  constructor(canvasId: string, options: EnhancedParticleSystemOptions = {}) {
    // Canvas setup
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas element with ID "${canvasId}" not found.`);
    }
    this.canvas = canvas;

    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context from canvas');
    }
    this.ctx = ctx;

    // Configuration options with defaults
    this.options = {
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 5,
      baseHue: 120, // Green
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      flowIntensity: 1.5,
      flowDirection: 'upward',
      speedFactor: 0.5,
      connectionRadius: 180,
      connectionOpacity: 0.25,
      mouseInteraction: true,
      responsive: true,
      densityFactor: 0.00012,
      trailEffect: true,
      trailLength: 0.92, // Controls how long trails persist (0-1, higher = longer)
      particleGlow: true,
      elongateParticles: true,
      waveMotion: true,
      ...options
    };

    // Event bindings
    this._onResize = this._onResize.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseLeave = this._onMouseLeave.bind(this);
    this._animate = this._animate.bind(this);

    // Setup
    this._setupEventListeners();
    this._adjustCanvasSize();

    // Initialize particle system
    this._initParticles();
  }

  /**
   * Start the animation loop
   */
  start(): this {
    if (!this.isRunning) {
      this.isRunning = true;
      this.lastFrameTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this._animate);
    }
    return this;
  }

  /**
   * Stop the animation loop
   */
  stop(): this {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    return this;
  }

  /**
   * Clean up resources
   */
  destroy(): this {
    this.stop();
    this._removeEventListeners();
    this.particles = [];
    return this;
  }

  /**
   * Set up event listeners
   * @private
   */
  private _setupEventListeners(): void {
    if (this.options.mouseInteraction) {
      this.canvas.addEventListener('mousemove', this._onMouseMove);
      this.canvas.addEventListener('mouseleave', this._onMouseLeave);
      this.canvas.addEventListener('touchmove', this._onMouseMove as EventListener);
      this.canvas.addEventListener('touchend', this._onMouseLeave);
    }

    if (this.options.responsive) {
      window.addEventListener('resize', this._onResize);
    }
  }

  /**
   * Remove event listeners
   * @private
   */
  private _removeEventListeners(): void {
    if (this.options.mouseInteraction) {
      this.canvas.removeEventListener('mousemove', this._onMouseMove);
      this.canvas.removeEventListener('mouseleave', this._onMouseLeave);
      this.canvas.removeEventListener('touchmove', this._onMouseMove as EventListener);
      this.canvas.removeEventListener('touchend', this._onMouseLeave);
    }

    if (this.options.responsive) {
      window.removeEventListener('resize', this._onResize);
    }
  }

  /**
   * Handle mouse movement
   * @param {MouseEvent|TouchEvent} e - Mouse or touch event
   * @private
   */
  private _onMouseMove(e: MouseEvent | TouchEvent): void {
    const rect = this.canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    this.mousePosition = {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  /**
   * Handle mouse leave
   * @private
   */
  private _onMouseLeave(): void {
    this.mousePosition = { x: null, y: null };
  }

  /**
   * Handle window resize
   * @private
   */
  private _onResize(): void {
    this._adjustCanvasSize();
    this._adjustParticleCount();
  }

  /**
   * Adjust canvas size to fit container
   * @private
   */
  private _adjustCanvasSize(): void {
    const parent = this.canvas.parentElement || document.body;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }

  /**
   * Adjust particle count based on canvas size and density
   * @private
   */
  private _adjustParticleCount(): void {
    if (!this.options.densityFactor) return;

    const targetCount = Math.floor(this.canvas.width * this.canvas.height * this.options.densityFactor);
    const currentCount = this.particles.length;

    if (targetCount > currentCount) {
      this.addParticles(targetCount - currentCount);
    } else if (targetCount < currentCount) {
      this.particles = this.particles.slice(0, targetCount);
    }
  }

  /**
   * Initialize particles
   * @private
   */
  private _initParticles(): void {
    const count = this.options.particleCount || 150;
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
  }

  /**
   * Add particles to the system
   * @param {Number} count - Number of particles to add
   */
  addParticles(count: number): this {
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
    return this;
  }

  /**
   * Create a new particle
   * @param {Number} x - Optional x position
   * @param {Number} y - Optional y position
   * @returns {Object} Particle object
   * @private
   */
  private _createParticle(x?: number, y?: number): EnhancedParticle {
    const minSize = this.options.particleMinSize || 1;
    const maxSize = this.options.particleMaxSize || 5;
    const baseSize = minSize + Math.random() * (maxSize - minSize);

    // For elongated particles
    const elongation = this.options.elongateParticles ? 1.5 + Math.random() * 2 : 1;

    // For wave motion
    const waveFrequency = 0.5 + Math.random() * 1.5;
    const waveAmplitude = 0.5 + Math.random() * 1.5;
    const wavePhase = Math.random() * Math.PI * 2;

    return {
      x: x || Math.random() * this.canvas.width,
      y: y || Math.random() * this.canvas.height,
      size: baseSize,
      originalSize: baseSize,
      elongation: elongation,
      speedX: (Math.random() - 0.5) * 2 * (this.options.speedFactor || 0.5),
      speedY: (Math.random() - 0.5) * 2 * (this.options.speedFactor || 0.5),
      // Generate color with slight hue variation for visual interest
      color: this._generateParticleColor(),
      opacity: Math.random() * 0.5 + 0.3,
      growing: Math.random() > 0.5, // Determines if the particle is growing or shrinking
      lifespan: Math.random() * 100 + 100, // How long the particle lives before regenerating
      age: 0,
      // Add rotation for more organic feel
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      // For wave motion
      waveFrequency: waveFrequency,
      waveAmplitude: waveAmplitude,
      wavePhase: wavePhase,
      // For circular flow pattern
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.min(this.canvas.width, this.canvas.height) * 0.4,
      // For trail effect
      trail: [],
      trailMaxLength: 10 + Math.floor(Math.random() * 15), // Varies trail length per particle
    };
  }

  /**
   * Generate a color for a particle based on the base hue
   * @returns {String} CSS color string
   * @private
   */
  private _generateParticleColor(): string {
    const baseHue = this.options.baseHue || 120;
    const hueVariation = 20; // Degree of hue variation
    const hue = baseHue + (Math.random() - 0.5) * hueVariation;
    const saturation = 70 + Math.random() * 30; // 70-100%
    const lightness = 40 + Math.random() * 20; // 40-60%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  /**
   * Animation loop
   * @param {Number} timestamp - Current animation timestamp
   * @private
   */
  private _animate(timestamp: number): void {
    if (!this.isRunning) return;

    // Calculate delta time for smooth animation regardless of frame rate
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Update global time for wave motion
    this.time += deltaTime * 0.001;

    // Clear canvas with semi-transparent background for trail effect
    if (this.options.trailEffect) {
      // Use a more transparent background fill for longer trails
      const trailFactor = this.options.trailLength || 0.92;
      const alpha = 1 - trailFactor;

      // Extract the RGB values from the background color
      let bgColor = this.options.backgroundColor || 'rgba(255, 255, 255, 0.85)';
      if (bgColor.startsWith('rgba')) {
        // If it's already rgba, just adjust the alpha
        bgColor = bgColor.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/,
          (_, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
      } else if (bgColor.startsWith('rgb')) {
        // Convert rgb to rgba
        bgColor = bgColor.replace(/rgb\(([^,]+),([^,]+),([^)]+)\)/,
          (_, r, g, b) => `rgba(${r},${g},${b},${alpha})`);
      } else {
        // Default fallback
        bgColor = `rgba(255, 255, 255, ${alpha})`;
      }

      this.ctx.fillStyle = bgColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      // Standard clear without trails
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.options.backgroundColor) {
        this.ctx.fillStyle = this.options.backgroundColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    // Update and draw particles
    this._updateParticles(deltaTime);
    this._drawConnections();
    this._drawParticles();

    // Continue animation loop
    this.animationFrameId = requestAnimationFrame(this._animate);
  }

  /**
   * Update particles position and properties
   * @param {Number} deltaTime - Time elapsed since last frame
   * @private
   */
  private _updateParticles(deltaTime: number): void {
    const normalizedDelta = deltaTime / 16.67; // Normalize based on 60fps

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Store current position for trail effect if enabled
      if (this.options.trailEffect && p.trail) {
        p.trail.unshift({ x: p.x, y: p.y, size: p.size, opacity: p.opacity, rotation: p.rotation });
        if (p.trail.length > p.trailMaxLength) {
          p.trail.pop();
        }
      }

      // Increase age
      p.age += normalizedDelta;

      // Regenerate particle if it's too old
      if (p.age > p.lifespan) {
        this.particles[i] = this._createParticle();
        continue;
      }

      // Mouse interaction
      if (this.options.mouseInteraction &&
          this.mousePosition.x !== null &&
          this.mousePosition.y !== null) {
        const dx = p.x - this.mousePosition.x;
        const dy = p.y - this.mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100 * 10;
          p.speedX += (dx / distance) * force * 0.02 * normalizedDelta;
          p.speedY += (dy / distance) * force * 0.02 * normalizedDelta;
        }
      }

      // Apply flow direction modifiers
      const flowDirection = this.options.flowDirection || 'upward';
      const flowIntensity = this.options.flowIntensity || 1;

      // Use separate if/else statements for each flow direction to fix type checking
      if (flowDirection === 'upward') {
        // Slight upward bias
        p.speedY -= 0.01 * flowIntensity * normalizedDelta;
      } 
      else if (flowDirection === 'downward') {
        p.speedY += 0.01 * flowIntensity * normalizedDelta;
      }
      else if (flowDirection === 'leftward') {
        p.speedX -= 0.01 * flowIntensity * normalizedDelta;
      }
      else if (flowDirection === 'rightward') {
        p.speedX += 0.01 * flowIntensity * normalizedDelta;
      }
      else if (flowDirection === 'radial') {
        const dx = p.x - this.canvas.width / 2;
        const dy = p.y - this.canvas.height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        p.speedX += (dx / distance) * 0.01 * flowIntensity * normalizedDelta;
        p.speedY += (dy / distance) * 0.01 * flowIntensity * normalizedDelta;
      }
      else if (flowDirection === 'circular') {
        // Circular flow around center
        p.angle += 0.01 * flowIntensity * normalizedDelta;
        p.x = this.canvas.width / 2 + Math.cos(p.angle) * p.radius;
        p.y = this.canvas.height / 2 + Math.sin(p.angle) * p.radius;
        continue; // Skip regular position update
      }
      else if (flowDirection === 'wave') {
        // Wave-like horizontal motion
        p.x += p.speedX * normalizedDelta;
        if (p.oscillationPhase !== undefined) {
          p.y = p.y + Math.sin(p.oscillationPhase) * 2;
          if (p.oscillationSpeed !== undefined) {
            p.oscillationPhase += p.oscillationSpeed * normalizedDelta;
          }
        }
      }
      else if (flowDirection === 'custom') {
        // Left to right flow with vertical variation
        p.speedX += 0.01 * flowIntensity * normalizedDelta;
        p.speedY += (Math.random() - 0.5) * 0.01 * flowIntensity * normalizedDelta;
      }

      // Apply wave motion if enabled
      if (this.options.waveMotion && flowDirection !== 'circular') {
        const waveOffset = Math.sin(this.time * p.waveFrequency + p.wavePhase) * p.waveAmplitude;
        p.x += waveOffset * 0.3 * normalizedDelta;
      }

      // Update position based on speed if not in circular mode
      if (flowDirection !== 'circular') {
        p.x += p.speedX * normalizedDelta;
        p.y += p.speedY * normalizedDelta;
      }

      // Slowly drift speed back to original range
      p.speedX *= 0.99;
      p.speedY *= 0.99;

      // Update rotation
      p.rotation += p.rotationSpeed * normalizedDelta;

      // Particle size pulsing
      if (p.growing) {
        p.size += 0.03 * normalizedDelta;
        if (p.size >= p.originalSize * 1.5) {
          p.growing = false;
        }
      } else {
        p.size -= 0.03 * normalizedDelta;
        if (p.size <= p.originalSize * 0.7) {
          p.growing = true;
        }
      }

      // Contain particles within canvas - with wrapping for natural flow
      if (p.x < -p.size * 2) p.x = this.canvas.width + p.size;
      else if (p.x > this.canvas.width + p.size * 2) p.x = -p.size;

      if (p.y < -p.size * 2) p.y = this.canvas.height + p.size;
      else if (p.y > this.canvas.height + p.size * 2) p.y = -p.size;
    }
  }

  /**
   * Draw connections between nearby particles
   * @private
   */
  private _drawConnections(): void {
    const maxDistance = this.options.connectionRadius || 180;
    const connectionOpacity = this.options.connectionOpacity || 0.25;

    this.ctx.lineWidth = 0.5;

    for (let i = 0; i < this.particles.length; i++) {
      const p1 = this.particles[i];

      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          // Opacity based on distance
          const opacity = (1 - distance / maxDistance) * connectionOpacity;

          // Extract hue from color for consistent connections
          let hue = 120; // Default green hue
          if (p1.color.startsWith('hsl')) {
            const match = p1.color.match(/hsl\(([^,]+),/);
            if (match && match[1]) {
              hue = parseFloat(match[1]);
            }
          }

          this.ctx.beginPath();
          this.ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${opacity})`;
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  /**
   * Draw particles on canvas
   * @private
   */
  private _drawParticles(): void {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Draw trails first if enabled
      if (this.options.trailEffect && p.trail && p.trail.length > 0) {
        for (let t = 0; t < p.trail.length; t++) {
          const trailPoint = p.trail[t];
          const trailOpacity = p.opacity * (1 - t / p.trail.length); // Fade out based on position in trail

          this.ctx.save();
          this.ctx.translate(trailPoint.x, trailPoint.y);
          this.ctx.rotate(trailPoint.rotation);

          // Draw trail segment
          this._drawParticleShape(p, trailPoint.size * 0.8, trailOpacity * 0.5);

          this.ctx.restore();
        }
      }

      // Draw the main particle
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      // Draw with glow effect if enabled
      if (this.options.particleGlow) {
        // Add subtle glow
        const glowSize = p.size * 2;
        const gradient = this.ctx.createRadialGradient(
          p.x, p.y, 0,  // Start position and radius
          p.x, p.y, Math.max(0.1, p.size)  // Ensure minimum radius of 0.1
        );
        const color = p.color;

        // Extract hue for glow
        let hue = 120; // Default green hue
        if (color.startsWith('hsl')) {
          const match = color.match(/hsl\(([^,]+),/);
          if (match && match[1]) {
            hue = parseFloat(match[1]);
          }
        }

        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${p.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${hue}, 80%, 60%, 0)`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-glowSize, -glowSize, glowSize * 2, glowSize * 2);
      }

      // Draw the actual particle
      this._drawParticleShape(p, p.size, p.opacity);

      this.ctx.restore();
    }
  }

  /**
   * Draw a particle shape
   * @param {Object} p - Particle object
   * @param {Number} size - Size to draw
   * @param {Number} opacity - Opacity to use
   * @private
   */
  private _drawParticleShape(p: EnhancedParticle, size: number, opacity: number): void {
    // Create gradient for more organic look
    const gradient = this.ctx.createRadialGradient(
      p.x, p.y, 0,  // Start position and radius
      p.x, p.y, Math.max(0.1, p.size)  // Ensure minimum radius of 0.1
    );
    const color = p.color;

    // Extract hue, saturation, lightness for consistent gradient
    let hue = 120, saturation = 70, lightness = 50;
    if (color.startsWith('hsl')) {
      const match = color.match(/hsl\(([^,]+),([^%]+)%,([^%]+)%\)/);
      if (match && match.length >= 4) {
        hue = parseFloat(match[1]);
        saturation = parseFloat(match[2]);
        lightness = parseFloat(match[3]);
      }
    }

    gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`);
    gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);

    this.ctx.fillStyle = gradient;

    // Draw elongated shape if enabled, otherwise draw circle
    if (this.options.elongateParticles && p.elongation > 1) {
      // Draw elongated shape (like grass blade)
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, size * 0.7, size * p.elongation, 0, 0, Math.PI * 2);
      this.ctx.fill();
    } else {
      // Draw circle
      this.ctx.beginPath();
      this.ctx.arc(0, 0, size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
}
