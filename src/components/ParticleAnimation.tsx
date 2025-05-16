import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const rafIdRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Get the canvas dimensions
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;
    
    // Particle system setup
    const particleCount = Math.min(30000, Math.floor(width * height / 120));
    const positions = new Float32Array(particleCount * 3);
    const randomValues = new Float32Array(particleCount);
    const biomassTypes = new Float32Array(particleCount);
    
    // Initialize particle properties
    for (let i = 0; i < particleCount; i++) {
      // Random positions in a cloud-like formation
      const radius = 8 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.5; // Flattened in Y direction
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      randomValues[i] = Math.random();
      
      // Assign biomass type (0: straw, 1: wood, 2: coconut shells)
      biomassTypes[i] = Math.floor(Math.random() * 3);
    }
    
    // Create geometry and set attributes
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomValues, 1));
    geometry.setAttribute('aBiomassType', new THREE.BufferAttribute(biomassTypes, 1));
    
    // Create shader material for particles
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2() },
        uSize: { value: 50.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uColors: { 
          value: [
            new THREE.Color('#81c784'), // Light green - straw
            new THREE.Color('#2e7d32'), // Dark green - wood
            new THREE.Color('#795548')  // Brown - coconut shell
          ] 
        }
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uSize;
        uniform float uPixelRatio;
        
        attribute float aRandom;
        attribute float aBiomassType;
        
        varying float vRandom;
        varying float vBiomassType;
        
        // Simplex 3D noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289((x * 34.0 + 1.0) * x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          
          // Compute skew
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          
          // Compute other corners
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          
          // Permutations
          i = mod289(i);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                   
          // Gradients
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          
          // Normalize gradients
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          
          // Mix
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
        }
        
        void main() {
          vRandom = aRandom;
          vBiomassType = aBiomassType;
          
          // Copy original position
          vec3 pos = position;
          
          // Apply noise-based movement
          float noiseFreq = 0.4;
          float noiseAmp = 0.5;
          vec3 noisePos = vec3(
            pos.x * noiseFreq + uTime * 0.1,
            pos.y * noiseFreq + uTime * 0.1,
            pos.z * noiseFreq + uTime * 0.2
          );
          float noise = snoise(noisePos);
          
          // Dynamic movement based on noise and random attribute
          pos.x += noise * noiseAmp * (0.5 + aRandom * 0.5);
          pos.y += noise * noiseAmp * (0.5 + aRandom * 0.5);
          pos.z += noise * noiseAmp * (0.5 + aRandom * 0.5);
          
          // Mouse interaction
          float mouseDistance = length(vec2(pos.x, pos.y) - uMouse);
          float mouseInfluence = smoothstep(5.0, 0.5, mouseDistance);
          vec2 direction = normalize(vec2(pos.x, pos.y) - uMouse);
          
          // Particles are pushed away from mouse
          pos.x += direction.x * mouseInfluence * 2.0;
          pos.y += direction.y * mouseInfluence * 2.0;
          
          // Add subtle orbiting motion
          float orbit = snoise(vec3(pos.xy * 0.1, uTime * 0.1)) * 0.1;
          pos.x += cos(uTime * 0.2 + aRandom * 10.0) * orbit;
          pos.y += sin(uTime * 0.2 + aRandom * 10.0) * orbit;
          
          // Project position
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;
          
          // Size variation based on depth and random attribute
          gl_PointSize = uSize * (0.3 + aRandom * 0.7) * uPixelRatio;
          gl_PointSize *= (1.0 / -viewPosition.z); // Size attenuation
        }
      `,
      fragmentShader: `
        uniform vec3 uColors[3];
        
        varying float vRandom;
        varying float vBiomassType;
        
        void main() {
          // Circular particle shape
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          if (strength < 0.05) discard; // Discard non-circular parts
          
          // Select color based on biomass type
          int colorIndex = int(vBiomassType);
          vec3 color = uColors[colorIndex];
          
          // Add subtle variation based on random value
          color = mix(color, color * 1.3, vRandom * 0.4);
          
          // Set fragment color with opacity based on strength
          gl_FragColor = vec4(color, strength * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    materialRef.current = material;
    
    // Create the particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;
    
    // Add mouse move listener
    const handleMouseMove = (event: MouseEvent) => {
      // Convert mouse position to normalized device coordinates
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    // Add touch move listener for mobile
    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      // Convert touch position to normalized device coordinates
      mouseRef.current.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update camera aspect ratio and projection matrix
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      // Update renderer size
      rendererRef.current.setSize(width, height);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Update uniform
      if (materialRef.current) {
        materialRef.current.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
      }
    };
    
    // Add click effect for bursts
    const handleClick = (event: MouseEvent) => {
      // If we have particles and material, create a burst effect
      if (particlesRef.current && materialRef.current) {
        // Play with particle size temporarily
        const originalSize = materialRef.current.uniforms.uSize.value;
        materialRef.current.uniforms.uSize.value = originalSize * 1.5;
        
        // Return to original size after animation
        setTimeout(() => {
          if (materialRef.current) {
            materialRef.current.uniforms.uSize.value = originalSize;
          }
        }, 300);
      }
    };
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      if (materialRef.current) {
        // Update uniform time
        materialRef.current.uniforms.uTime.value = elapsedTime;
        
        // Update mouse position in the shader
        materialRef.current.uniforms.uMouse.value = mouseRef.current;
      }
      
      if (particlesRef.current) {
        // Optional: Add slight overall rotation to the particle system
        particlesRef.current.rotation.y = elapsedTime * 0.05;
      }
      
      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      // Continue animation loop
      rafIdRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);
    window.addEventListener('click', handleClick);
    
    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleClick);
      
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      
      // Dispose resources
      if (particlesRef.current?.geometry) {
        particlesRef.current.geometry.dispose();
      }
      
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Clean references
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      particlesRef.current = null;
      materialRef.current = null;
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0 cursor-none"
      style={{ touchAction: 'none' }} // Prevents touch scrolling issues
    />
  );
};

export default ParticleAnimation;
