
import { ParticleSystemOptions, FlowDirection } from './types';

export interface EnhancedParticleSystemOptions extends ParticleSystemOptions {
  trailEffect?: boolean;
  trailLength?: number;
  particleGlow?: boolean;
  elongateParticles?: boolean;
  waveMotion?: boolean;
}
