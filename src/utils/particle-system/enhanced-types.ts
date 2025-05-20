import { ParticleSystemOptions as BaseParticleSystemOptions } from './types';

export interface EnhancedParticleSystemOptions extends BaseParticleSystemOptions {
  trailEffect?: boolean;
  trailLength?: number;
  particleGlow?: boolean;
  elongateParticles?: boolean;
  waveMotion?: boolean;
}
