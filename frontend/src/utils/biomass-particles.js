
/**
 * Rashmi 6 Paradigm - Biomass Particle Animation System
 * 
 * This script creates an interactive particle animation that represents
 * the transformation of biomass into sustainable energy, with particles
 * flowing in various patterns and responding to user interaction.
 */

export class BiomassParticleSystem {
  constructor(canvasId, options = {}) {
    // Canvas setup
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas element with ID "${canvasId}" not found.`);
      return;
    }
    
    this.ctx = this.canvas.getContext('2d');
    
    // Configuration options with defaults
    this.options = Object.assign({
      particleCount: 150,
      particleMinSize: 1,
      particleMaxSize: 5,
      particleColor: '#ffffff',
      baseHue: 120, // Green
      backgroundColor: 'rgba(46, 125, 50, 0.1)',
      flowIntensity: 1,
      flowDirection: 'upward', // 'upward', 'circular', 'wave', 'custom'
      speedFactor: 0.8,
      connectionRadius: 100,
      connectionOpacity: 0.15,
      mouseInteraction: true,
      responsive: true,
      densityFactor: 0.0001, // Particles per pixel
    }, options);
    
    // Initialize properties
    this.particles = [];
    this.mousePosition = { x: null, y: null };
    this.lastFrameTime = 0;
    this.isRunning = false;
    this.animationFrameId = null;
    
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
  start() {
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
  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    return this;
  }
  
  /**
   * Clean up resources and remove event listeners
   */
  destroy() {
    this.stop();
    this._removeEventListeners();
    return this;
  }
  
  /**
   * Update animation configuration options
   * @param {Object} newOptions - New configuration options
   */
  updateOptions(newOptions) {
    this.options = Object.assign(this.options, newOptions);
    return this;
  }
  
  /**
   * Add more particles to the system
   * @param {Number} count - Number of particles to add
   */
  addParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
    return this;
  }
  
  /**
   * Set up event listeners for responsive behavior
   * @private
   */
  _setupEventListeners() {
    if (this.options.responsive) {
      window.addEventListener('resize', this._onResize);
    }
    
    if (this.options.mouseInteraction) {
      this.canvas.addEventListener('mousemove', this._onMouseMove);
      this.canvas.addEventListener('mouseleave', this._onMouseLeave);
      this.canvas.addEventListener('touchmove', this._onMouseMove);
      this.canvas.addEventListener('touchend', this._onMouseLeave);
    }
  }
  
  /**
   * Remove event listeners
   * @private
   */
  _removeEventListeners() {
    window.removeEventListener('resize', this._onResize);
    this.canvas.removeEventListener('mousemove', this._onMouseMove);
    this.canvas.removeEventListener('mouseleave', this._onMouseLeave);
    this.canvas.removeEventListener('touchmove', this._onMouseMove);
    this.canvas.removeEventListener('touchend', this._onMouseLeave);
  }
  
  /**
   * Handle window resize events
   * @private
   */
  _onResize() {
    this._adjustCanvasSize();
    this._adjustParticleCount();
  }
  
  /**
   * Handle mouse move events
   * @param {Event} event - Mouse event
   * @private
   */
  _onMouseMove(event) {
    if (event.touches && event.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition = {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
      };
    } else {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    }
  }
  
  /**
   * Handle mouse leave events
   * @private
   */
  _onMouseLeave() {
    this.mousePosition = { x: null, y: null };
  }
  
  /**
   * Adjust canvas size to fit container
   * @private
   */
  _adjustCanvasSize() {
    const parent = this.canvas.parentElement || document.body;
    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
  }
  
  /**
   * Adjust particle count based on canvas size and density
   * @private
   */
  _adjustParticleCount() {
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
  _initParticles() {
    this.particles = [];
    const count = this.options.responsive 
      ? Math.floor(this.canvas.width * this.canvas.height * this.options.densityFactor)
      : this.options.particleCount;
    
    for (let i = 0; i < count; i++) {
      this.particles.push(this._createParticle());
    }
  }
  
  /**
   * Create a single particle with random properties
   * @private
   * @returns {Object} Particle object
   */
  _createParticle(x, y) {
    const baseSize = this.options.particleMinSize + Math.random() * (this.options.particleMaxSize - this.options.particleMinSize);
    
    return {
      x: x || Math.random() * this.canvas.width,
      y: y || Math.random() * this.canvas.height,
      size: baseSize,
      originalSize: baseSize,
      speedX: (Math.random() - 0.5) * 2 * this.options.speedFactor,
      speedY: (Math.random() - 0.5) * 2 * this.options.speedFactor,
      // Generate color with slight hue variation for visual interest
      color: this._generateParticleColor(),
      opacity: Math.random() * 0.5 + 0.3,
      growing: Math.random() > 0.5, // Determines if the particle is growing or shrinking
      lifespan: Math.random() * 100 + 100, // How long the particle lives before regenerating
      age: 0,
      // Add rotation for more organic feel
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      // For circular flow pattern
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * (this.canvas.width / 4) + 50,
      // For oscillation effects
      oscillationPhase: Math.random() * Math.PI * 2,
      oscillationSpeed: Math.random() * 0.05 + 0.01
    };
  }
  
  /**
   * Generate a particle color based on options
   * @private
   * @returns {String} CSS color value
   */
  _generateParticleColor() {
    if (typeof this.options.particleColor === 'function') {
      return this.options.particleColor();
    }
    
    if (typeof this.options.particleColor === 'string') {
      if (this.options.particleColor.startsWith('#') || this.options.particleColor.startsWith('rgb')) {
        return this.options.particleColor;
      }
    }
    
    // Generate color based on hue
    const hueVariation = 20; // +/- variation from base hue
    const hue = this.options.baseHue + (Math.random() * hueVariation * 2 - hueVariation);
    const saturation = 60 + Math.random() * 20; // 60-80%
    const lightness = 40 + Math.random() * 20; // 40-60%
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
  
  /**
   * Animation loop
   * @param {Number} timestamp - Current animation timestamp
   * @private
   */
  _animate(timestamp) {
    if (!this.isRunning) return;
    
    // Calculate delta time for smooth animation regardless of frame rate
    const deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Optional: Fill background with semi-transparent color for trail effect
    if (this.options.backgroundColor) {
      this.ctx.fillStyle = this.options.backgroundColor;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
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
  _updateParticles(deltaTime) {
    const normalizedDelta = deltaTime / 16.67; // Normalize based on 60fps
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
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
      switch (this.options.flowDirection) {
        case 'upward':
          // Slight upward bias
          p.speedY -= 0.01 * this.options.flowIntensity * normalizedDelta;
          break;
        case 'circular':
          // Circular flow around center
          p.angle += 0.01 * this.options.flowIntensity * normalizedDelta;
          p.x = this.canvas.width / 2 + Math.cos(p.angle) * p.radius;
          p.y = this.canvas.height / 2 + Math.sin(p.angle) * p.radius;
          continue; // Skip regular position update
        case 'wave':
          // Wave-like horizontal motion
          p.x += p.speedX * normalizedDelta;
          p.y = p.y + Math.sin(p.oscillationPhase) * 2;
          p.oscillationPhase += p.oscillationSpeed * normalizedDelta;
          break;
        case 'custom':
          // Flow particles from left to right in the process flow
          p.speedX = Math.abs(p.speedX) * 1.5;
          p.speedY = p.speedY * 0.5;
          break;
        default:
          // Default behavior
          break;
      }
      
      // Update position based on speed if not in circular mode
      if (this.options.flowDirection !== 'circular') {
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
  _drawConnections() {
    const maxDistance = this.options.connectionRadius;
    
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.options.connectionOpacity})`;
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
          const opacity = (1 - distance / maxDistance) * this.options.connectionOpacity;
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
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
  _drawParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      
      // Draw with gradient for more organic look
      const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      const color = p.color;
      
      gradient.addColorStop(0, color.replace(')', ', ' + p.opacity + ')').replace('rgb', 'rgba'));
      gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
      
      this.ctx.fillStyle = gradient;
      
      // Random particle shape
      const shapeRand = (i % 4); // Use particle index for deterministic shape
      
      switch (shapeRand) {
        case 0: // Circle (most common)
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          this.ctx.fill();
          break;
        case 1: // Square
          this.ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
          break;
        case 2: // Triangle
          this.ctx.beginPath();
          this.ctx.moveTo(0, -p.size);
          this.ctx.lineTo(p.size, p.size);
          this.ctx.lineTo(-p.size, p.size);
          this.ctx.closePath();
          this.ctx.fill();
          break;
        case 3: // Organic blob
          this.ctx.beginPath();
          const sides = 5;
          const angleStep = (Math.PI * 2) / sides;
          for (let j = 0; j < sides; j++) {
            const radius = p.size * (0.8 + Math.sin(j * 3 + p.age * 0.1) * 0.2);
            const x = Math.cos(j * angleStep) * radius;
            const y = Math.sin(j * angleStep) * radius;
            
            if (j === 0) {
              this.ctx.moveTo(x, y);
            } else {
              this.ctx.lineTo(x, y);
            }
          }
          this.ctx.closePath();
          this.ctx.fill();
          break;
      }
      
      this.ctx.restore();
    }
  }
}
