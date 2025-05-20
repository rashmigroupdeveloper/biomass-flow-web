/**
 * Performance Optimizer Utility
 * 
 * This utility provides functions to optimize performance across the application
 * without changing the visual appearance of animations.
 */

/**
 * Get optimized particle count based on device capabilities and screen size
 * 
 * @param baseCount The default particle count
 * @param width Canvas width
 * @param height Canvas height
 * @returns Optimized particle count
 */
export function getOptimizedParticleCount(baseCount: number, width: number, height: number): number {
  const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
  const screenArea = width * height;
  
  // Base density calculation (particles per pixel)
  const baseDensity = baseCount / (1920 * 1080); // Reference resolution
  
  // Calculate target count based on screen area
  let targetCount = Math.floor(screenArea * baseDensity);
  
  // Apply reduction for low performance devices
  if (isLowPerformance) {
    targetCount = Math.floor(targetCount * 0.4); // More aggressive reduction
  }
  
  // Apply additional reduction for very large screens
  if (screenArea > 2560 * 1440) {
    targetCount = Math.floor(targetCount * 0.8);
  }
  
  // Ensure minimum and maximum values
  return Math.max(50, Math.min(targetCount, isLowPerformance ? 200 : baseCount));
}

/**
 * Get optimized connection radius based on device capabilities
 * 
 * @param baseRadius The default connection radius
 * @returns Optimized connection radius
 */
export function getOptimizedConnectionRadius(baseRadius: number): number {
  const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
  
  if (isLowPerformance) {
    return Math.floor(baseRadius * 0.7); // Reduce connection radius on low-performance devices
  }
  
  return baseRadius;
}

/**
 * Get optimized animation frame rate
 * 
 * @returns Number of frames to skip (0 = run every frame, 1 = run every other frame, etc.)
 */
export function getOptimizedFrameSkip(): number {
  const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
  
  if (isLowPerformance) {
    return 2; // Skip 2 frames (run every 3rd frame) on low-performance devices
  }
  
  return 0; // Don't skip frames on high-performance devices
}

/**
 * Get optimized Three.js particle count
 * 
 * @param baseCount The default particle count
 * @param width Canvas width
 * @param height Canvas height
 * @returns Optimized particle count for Three.js
 */
export function getOptimizedThreeJsParticleCount(baseCount: number, width: number, height: number): number {
  const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
  
  // Calculate base count based on screen area
  const screenArea = width * height;
  const baseDensity = baseCount / (1920 * 1080);
  let targetCount = Math.floor(screenArea * baseDensity);
  
  // Apply more aggressive reduction for Three.js particles
  if (isLowPerformance) {
    targetCount = Math.floor(targetCount * 0.3);
  }
  
  return Math.max(1000, Math.min(targetCount, isLowPerformance ? 5000 : baseCount));
}

/**
 * Determine if a specific animation feature should be enabled
 * 
 * @param featureName The name of the feature to check
 * @param defaultValue The default value if not in low performance mode
 * @returns Whether the feature should be enabled
 */
export function shouldEnableFeature(featureName: string, defaultValue: boolean): boolean {
  const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
  
  if (!isLowPerformance) {
    return defaultValue;
  }
  
  // Feature-specific decisions for low performance mode
  switch (featureName) {
    case 'trailEffect':
      return false;
    case 'particleGlow':
      return false;
    case 'connectionLines':
      return true; // Keep connections but with reduced radius
    case 'mouseInteraction':
      return true; // Keep mouse interaction
    default:
      return defaultValue;
  }
}
