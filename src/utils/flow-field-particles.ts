
import * as THREE from 'three';

export interface ParticleSystemOptions {
  particleCount?: number;
  particleSize?: number;
  particleColor?: string;
  backgroundColor?: string;
  flowSpeed?: number;
  flowDirection?: 'upward' | 'circular' | 'wave' | 'custom';
  interactionStrength?: number;
  connectionRadius?: number;
  colorVariation?: number;
  densityFactor?: number;
}

export class BiomassFlowFieldSystem {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private particles: any[] = [];
  private options: ParticleSystemOptions;
  private animationFrameId: number | null = null;
  private lastTimestamp: number = 0;
  private mousePosition = { x: 0, y: 0 };
  private mouseActive = false;
  private noiseScale = 0.005;
  private noise3D: (x: number, y: number, z: number) => number;
  private flowField: { x: number, y: number }[][] = [];
  private time = 0;

  constructor(canvasId: string, options: ParticleSystemOptions = {}) {
    // Set default options
    this.options = {
      particleCount: 200,
      particleSize: 2,
      particleColor: '#4caf50',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      flowSpeed: 0.5,
      flowDirection: 'upward',
      interactionStrength: 1.0,
      connectionRadius: 100,
      colorVariation: 20,
      densityFactor: 0.00008,
      ...options
    };

    // Get canvas element
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) {
      throw new Error(`Canvas with ID "${canvasId}" not found.`);
    }
    this.canvas = canvas;

    // Get context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get 2D context for canvas');
    }
    this.ctx = ctx;

    // Setup noise
    this.noise3D = this.createSimplexNoise();

    // Initialize
    this.init();
    this.setupEventListeners();
  }

  // Simplex noise implementation
  private createSimplexNoise() {
    const F3 = 1.0 / 3.0;
    const G3 = 1.0 / 6.0;
    
    // Permutation table
    const p = new Array(512);
    const perm = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180];
    for (let i=0; i < 256; i++) {
      p[i] = perm[i]; 
      p[i + 256] = perm[i];
    }

    return function(x: number, y: number, z: number) {
      // Find unit grid cell containing point
      let i = Math.floor(x) & 255;
      let j = Math.floor(y) & 255;
      let k = Math.floor(z) & 255;
      
      // Get relative coords of point within that cell
      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);
      
      // Compute fade curves
      const u = fade(x);
      const v = fade(y);
      const w = fade(z);
      
      // Hash coordinates of the 8 cube corners
      const A = p[i] + j;
      const AA = p[A] + k;
      const AB = p[A + 1] + k;
      const B = p[i + 1] + j;
      const BA = p[B] + k;
      const BB = p[B + 1] + k;
      
      // And add blended results from 8 corners of cube
      return lerp(w, 
        lerp(v, 
          lerp(u, 
            grad(p[AA], x, y, z), 
            grad(p[BA], x - 1, y, z)
          ),
          lerp(u, 
            grad(p[AB], x, y - 1, z), 
            grad(p[BB], x - 1, y - 1, z)
          )
        ),
        lerp(v, 
          lerp(u, 
            grad(p[AA + 1], x, y, z - 1), 
            grad(p[BA + 1], x - 1, y, z - 1)
          ),
          lerp(u, 
            grad(p[AB + 1], x, y - 1, z - 1), 
            grad(p[BB + 1], x - 1, y - 1, z - 1)
          )
        )
      );
    };

    function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    
    function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
    
    function grad(hash: number, x: number, y: number, z: number) {
      // Convert low 4 bits of hash code into 12 gradient directions
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
  }

  private init() {
    // Set canvas size
    this.resize();

    // Generate particles based on window size and density factor
    const area = this.width * this.height;
    const count = Math.min(
      this.options.particleCount || 200,
      Math.max(50, Math.floor(area * (this.options.densityFactor || 0.00008)))
    );

    // Create particles
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push(this.createParticle());
    }

    // Generate initial flow field
    this.generateFlowField();
  }

  private createParticle(x?: number, y?: number) {
    return {
      x: x !== undefined ? x : Math.random() * this.width,
      y: y !== undefined ? y : Math.random() * this.height,
      size: Math.random() * 2 + (this.options.particleSize || 2) - 1,
      speedFactor: Math.random() * 0.5 + 0.5,
      hue: this.getBaseHue() + (Math.random() * 2 - 1) * (this.options.colorVariation || 20),
      lastX: 0,
      lastY: 0
    };
  }

  private getBaseHue(): number {
    // Extract hue from particle color if it's a string
    if (typeof this.options.particleColor === 'string') {
      // Handle hex values
      if (this.options.particleColor.startsWith('#')) {
        const rgb = this.hexToRGB(this.options.particleColor);
        return this.rgbToHSL(rgb.r, rgb.g, rgb.b).h * 360;
      }
      // Handle strings like "green"
      else {
        return 120; // Default green hue
      }
    }
    
    // Default to green
    return 120;
  }

  private hexToRGB(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 255, b: 0 }; // Default to green
  }
  
  private rgbToHSL(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
  
      h /= 6;
    }
  
    return { h, s, l };
  }

  private setupEventListeners() {
    // Handle window resize
    window.addEventListener('resize', this.resize.bind(this));

    // Handle mouse/touch interaction
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.canvas.addEventListener('touchstart', this.handleMouseEnter.bind(this));
    this.canvas.addEventListener('touchend', this.handleMouseLeave.bind(this));
  }

  private removeEventListeners() {
    window.removeEventListener('resize', this.resize.bind(this));
    this.canvas.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    this.canvas.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.canvas.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.canvas.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
    this.canvas.removeEventListener('touchstart', this.handleMouseEnter.bind(this));
    this.canvas.removeEventListener('touchend', this.handleMouseLeave.bind(this));
  }

  private handleMouseMove(e: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  private handleTouchMove(e: TouchEvent) {
    if (e.touches.length > 0) {
      const rect = this.canvas.getBoundingClientRect();
      this.mousePosition = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    e.preventDefault(); // Prevent scrolling
  }

  private handleMouseEnter() {
    this.mouseActive = true;
  }

  private handleMouseLeave() {
    this.mouseActive = false;
  }

  private resize() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    // Set canvas size to parent size
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Regenerate flow field when resizing
    this.generateFlowField();
  }

  private generateFlowField() {
    const cellSize = 20; // Size of each flow field cell
    const cols = Math.ceil(this.width / cellSize);
    const rows = Math.ceil(this.height / cellSize);
    
    // Create empty array
    this.flowField = [];
    
    // Generate field values based on flow direction
    for (let y = 0; y < rows; y++) {
      this.flowField[y] = [];
      for (let x = 0; x < cols; x++) {
        const angle = this.calculateFlowAngle(x, y, cols, rows);
        this.flowField[y][x] = {
          x: Math.cos(angle),
          y: Math.sin(angle)
        };
      }
    }
  }

  private calculateFlowAngle(x: number, y: number, cols: number, rows: number): number {
    const direction = this.options.flowDirection || 'upward';
    
    switch (direction) {
      case 'upward':
        // Mostly upward flow with some noise
        return Math.PI * 1.5 + (this.noise3D(x * 0.1, y * 0.1, this.time * 0.05) * 0.5);
        
      case 'circular':
        // Calculate angle from center
        const centerX = cols / 2;
        const centerY = rows / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        // Tangential flow around center
        const baseAngle = Math.atan2(dy, dx) + Math.PI / 2;
        // Add some noise
        return baseAngle + (this.noise3D(x * 0.1, y * 0.1, this.time * 0.05) * 0.5);
        
      case 'wave':
        // Horizontal waves
        return Math.sin(y * 0.1 + this.time * 0.1) * 0.5 + Math.PI * 0;
        
      case 'custom':
        // Complex flow based on noise
        return this.noise3D(x * 0.1, y * 0.1, this.time * 0.05) * Math.PI * 2;
        
      default:
        return Math.PI * 1.5; // Default upward
    }
  }

  private updateParticles(deltaTime: number) {
    const cellSize = 20; // Size of each flow field cell
    
    this.particles.forEach(particle => {
      // Save last position for trails
      particle.lastX = particle.x;
      particle.lastY = particle.y;
      
      // Get flow field vector at particle position
      const col = Math.floor(particle.x / cellSize);
      const row = Math.floor(particle.y / cellSize);
      
      let flowX = 0;
      let flowY = 0;
      
      // Make sure we're within the flow field bounds
      if (row >= 0 && row < this.flowField.length && 
          col >= 0 && this.flowField[row] && col < this.flowField[row].length) {
        flowX = this.flowField[row][col].x;
        flowY = this.flowField[row][col].y;
      }
      
      // Apply flow field vector to particle
      particle.x += flowX * (this.options.flowSpeed || 0.5) * particle.speedFactor * deltaTime;
      particle.y += flowY * (this.options.flowSpeed || 0.5) * particle.speedFactor * deltaTime;
      
      // Mouse interaction if active
      if (this.mouseActive) {
        const dx = this.mousePosition.x - particle.x;
        const dy = this.mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;
        
        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * (this.options.interactionStrength || 1.0);
          particle.x -= dx * force * 0.01 * deltaTime;
          particle.y -= dy * force * 0.01 * deltaTime;
        }
      }
      
      // Check boundaries and wrap particles
      this.wrapParticle(particle);
    });
  }

  private wrapParticle(particle: any) {
    // Wrap around edges with a small buffer
    const buffer = 50;
    
    if (particle.x < -buffer) particle.x = this.width + buffer;
    if (particle.y < -buffer) particle.y = this.height + buffer;
    if (particle.x > this.width + buffer) particle.x = -buffer;
    if (particle.y > this.height + buffer) particle.y = -buffer;
  }

  private render() {
    // Clear canvas with background color
    this.ctx.fillStyle = this.options.backgroundColor || 'rgba(255, 255, 255, 0.02)';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw connections between particles
    if (this.options.connectionRadius && this.options.connectionRadius > 0) {
      this.drawConnections();
    }
    
    // Draw particles
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      
      // Draw circle
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      
      // Set color for this particle
      this.ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, 0.8)`;
      
      this.ctx.fill();
    });
  }

  private drawConnections() {
    const maxDistance = this.options.connectionRadius || 0;
    if (maxDistance <= 0) return;
    
    // Draw lines between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      const particleA = this.particles[i];
      
      for (let j = i + 1; j < this.particles.length; j++) {
        const particleB = this.particles[j];
        
        const dx = particleA.x - particleB.x;
        const dy = particleA.y - particleB.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxDistance) {
          // Calculate opacity based on distance
          const opacity = (1 - distance / maxDistance) * 0.15;
          
          this.ctx.beginPath();
          this.ctx.moveTo(particleA.x, particleA.y);
          this.ctx.lineTo(particleB.x, particleB.y);
          
          // Use the average hue of both particles
          const avgHue = (particleA.hue + particleB.hue) / 2;
          this.ctx.strokeStyle = `hsla(${avgHue}, 70%, 60%, ${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  private animate(timestamp: number) {
    if (!this.lastTimestamp) this.lastTimestamp = timestamp;
    
    // Calculate time since last frame
    const deltaTime = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    
    // Update time for noise functions
    this.time += deltaTime * 0.001;
    
    // Update particles
    this.updateParticles(deltaTime * 0.1);
    
    // Render
    this.render();
    
    // Request next frame
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  public start() {
    if (this.animationFrameId) return; // Already running
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
  }

  public stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public destroy() {
    this.stop();
    this.removeEventListeners();
    this.particles = [];
  }

  public updateOptions(options: ParticleSystemOptions) {
    this.options = { ...this.options, ...options };
    this.generateFlowField(); // Update flow field with new options
  }
}
