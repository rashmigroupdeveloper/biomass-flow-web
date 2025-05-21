import { Particle, ParticleSystemOptions } from './types';

export class ParticleRenderer {
  private ctx: CanvasRenderingContext2D;
  private options: ParticleSystemOptions;
  private backgroundColor: string;
  private offscreenCanvas: HTMLCanvasElement | null = null;
  private offscreenCtx: CanvasRenderingContext2D | null = null;

  constructor(ctx: CanvasRenderingContext2D, options: ParticleSystemOptions) {
    this.ctx = ctx;
    this.options = options;
    this.backgroundColor = options.backgroundColor || 'rgba(46, 125, 50, 0.05)';

    // Setup offscreen canvas for better performance if available
    if (this.options.useHardwareAcceleration !== false) {
      this.setupOffscreenCanvas();
    }
  }

  private setupOffscreenCanvas(): void {
    try {
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = this.ctx.canvas.width;
      this.offscreenCanvas.height = this.ctx.canvas.height;

      const offCtx = this.offscreenCanvas.getContext('2d', {
        alpha: true,
        desynchronized: true, // Reduce main thread jank
        willReadFrequently: false,
      });

      if (offCtx) {
        this.offscreenCtx = offCtx;
      }
    } catch (err) {
      console.warn('Failed to create offscreen canvas, fallback to regular rendering', err);
      this.offscreenCanvas = null;
      this.offscreenCtx = null;
    }
  }

  updateCanvasSize(width: number, height: number): void {
    if (this.offscreenCanvas) {
      this.offscreenCanvas.width = width;
      this.offscreenCanvas.height = height;
    }
  }

  clear(): void {
    const targetCtx = this.offscreenCtx || this.ctx;
    targetCtx.clearRect(0, 0, targetCtx.canvas.width, targetCtx.canvas.height);
    targetCtx.fillStyle = this.backgroundColor;
    targetCtx.fillRect(0, 0, targetCtx.canvas.width, targetCtx.canvas.height);
  }

  // Cache for pre-rendered particle images
  private particleImageCache: Map<string, HTMLCanvasElement> = new Map();

  renderParticles(particles: Particle[]): void {
    this.drawParticles(particles);
  }

  renderConnections(particles: Particle[], connectionRadius: number, connectionOpacity: number): void {
    this.drawConnections(particles);
  }

  private drawParticles(particles: Particle[]): void {
    const targetCtx = this.offscreenCtx || this.ctx;
    const isLowPerformance = this.options.lowPerformanceMode;

    // In low performance mode, use a simpler drawing approach with fewer hue variations
    if (isLowPerformance) {
      // Group particles into just a few hue buckets
      const hueGroups: Record<number, Particle[]> = {
        100: [], // Yellow-green
        120: [], // Green
        140: [], // Blue-green
      };

      // Assign each particle to the closest hue group
      particles.forEach(particle => {
        const hue = particle.hue;
        if (hue < 110) {
          hueGroups[100].push(particle);
        } else if (hue < 130) {
          hueGroups[120].push(particle);
        } else {
          hueGroups[140].push(particle);
        }
      });

      // Draw each hue group
      Object.entries(hueGroups).forEach(([hue, groupParticles]) => {
        if (groupParticles.length === 0) return;

        targetCtx.beginPath();
        targetCtx.fillStyle = `hsla(${hue}, 70%, 60%, 0.7)`;

        groupParticles.forEach(particle => {
          targetCtx.moveTo(particle.x, particle.y);
          targetCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        });

        targetCtx.fill();
      });
    } else {
      // Use cached particle images for better performance in normal mode
      // Batch similar particles together for better GPU performance
      const particlesByHue: Record<number, Particle[]> = {};

      particles.forEach(particle => {
        // Round hue to reduce number of different fill styles (10 degree increments)
        const roundedHue = Math.round(particle.hue / 10) * 10;
        if (!particlesByHue[roundedHue]) {
          particlesByHue[roundedHue] = [];
        }
        particlesByHue[roundedHue].push(particle);
      });

      // Draw particles grouped by hue to minimize context changes
      Object.entries(particlesByHue).forEach(([hue, hueParticles]) => {
        targetCtx.beginPath();
        targetCtx.fillStyle = `hsla(${hue}, 70%, 60%, 0.7)`;

        hueParticles.forEach(particle => {
          targetCtx.moveTo(particle.x, particle.y);
          targetCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        });

        targetCtx.fill();
      });
    }

    // Copy from offscreen canvas to main canvas if needed
    if (this.offscreenCtx && this.offscreenCanvas) {
      this.ctx.drawImage(this.offscreenCanvas, 0, 0);
    }
  }

  private drawConnections(particles: Particle[]): void {
    const targetCtx = this.offscreenCtx || this.ctx;
    const connectionRadius = this.options.connectionRadius || 100;
    const connectionOpacity = this.options.connectionOpacity || 0.1;
    const isLowPerformance = this.options.lowPerformanceMode;

    // In low performance mode, use a more aggressive optimization
    const effectiveRadius = isLowPerformance ? connectionRadius * 0.7 : connectionRadius;

    // Skip connection drawing if radius is too small
    if (effectiveRadius < 10) return;

    // Optimize connection drawing by using a spatial grid
    const gridSize = effectiveRadius;
    const grid: Record<string, Particle[]> = {};

    // Place particles in grid cells
    particles.forEach(particle => {
      const cellX = Math.floor(particle.x / gridSize);
      const cellY = Math.floor(particle.y / gridSize);
      const key = `${cellX},${cellY}`;

      if (!grid[key]) {
        grid[key] = [];
      }
      grid[key].push(particle);
    });

    // In low performance mode, only process a subset of particles for connections
    const particlesToProcess = isLowPerformance
      ? particles.filter((_, i) => i % 3 === 0) // Process only 1/3 of particles
      : particles;

    // Draw connections using grid for optimization
    targetCtx.lineWidth = 1;

    particlesToProcess.forEach(particle1 => {
      const cellX = Math.floor(particle1.x / gridSize);
      const cellY = Math.floor(particle1.y / gridSize);

      // Check nearby cells
      for (let x = cellX - 1; x <= cellX + 1; x++) {
        for (let y = cellY - 1; y <= cellY + 1; y++) {
          const key = `${x},${y}`;
          const cellParticles = grid[key] || [];

          // In low performance mode, batch similar connections together
          if (isLowPerformance) {
            targetCtx.beginPath();
            let drewAny = false;

            cellParticles.forEach(particle2 => {
              // Avoid duplicate connections and self-connections
              if (particle1 === particle2) return;

              const dx = particle1.x - particle2.x;
              const dy = particle1.y - particle2.y;
              const distanceSquared = dx * dx + dy * dy; // Avoid sqrt for performance

              if (distanceSquared < effectiveRadius * effectiveRadius) {
                drewAny = true;
                targetCtx.moveTo(particle1.x, particle1.y);
                targetCtx.lineTo(particle2.x, particle2.y);
              }
            });

            if (drewAny) {
              targetCtx.strokeStyle = `hsla(${particle1.hue}, 70%, 60%, ${connectionOpacity * 0.8})`;
              targetCtx.stroke();
            }
          } else {
            // Normal mode - draw each connection with its own opacity
            cellParticles.forEach(particle2 => {
              // Avoid duplicate connections and self-connections
              if (particle1 === particle2) return;

              const dx = particle1.x - particle2.x;
              const dy = particle1.y - particle2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < effectiveRadius) {
                const opacity = (1 - (distance / effectiveRadius)) * connectionOpacity;
                targetCtx.beginPath();
                targetCtx.moveTo(particle1.x, particle1.y);
                targetCtx.lineTo(particle2.x, particle2.y);
                targetCtx.strokeStyle = `hsla(${particle1.hue}, 70%, 60%, ${opacity})`;
                targetCtx.stroke();
              }
            });
          }
        }
      }
    });

    // Copy from offscreen canvas to main canvas if needed
    if (this.offscreenCtx && this.offscreenCanvas) {
      this.ctx.drawImage(this.offscreenCanvas, 0, 0);
    }
  }
}
