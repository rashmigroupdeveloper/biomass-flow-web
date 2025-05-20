import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

interface AudioState {
  audioContext: AudioContext | null;
  gainNode: GainNode | null;
  oscillator: OscillatorNode | null;
}

const EnhancedParticleAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const targetMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const mouseSpeedRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const prevMouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const rafIdRef = useRef<number | null>(null);
  const mouseHistoryRef = useRef<THREE.Vector2[]>([]);
  const clicksRef = useRef<{position: THREE.Vector2, time: number}[]>([]);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const audioRef = useRef<AudioState>({
    audioContext: null,
    gainNode: null,
    oscillator: null
  });

  // Use intersection observer to only animate when in view
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Initialize audio
  const initAudio = () => {
    if (audioInitialized) return;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();

      // Only proceed if the audio context is not closed
      if (audioContext.state !== 'closed') {
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0; // Start with no volume
        gainNode.connect(audioContext.destination);

        // Create oscillator for sound
        const oscillator = audioContext.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.value = 220; // Base frequency
        oscillator.connect(gainNode);
        oscillator.start();

        audioRef.current = { audioContext, gainNode, oscillator };
        setAudioInitialized(true);
      }
    } catch (error) {
      console.error("Audio initialization error:", error);
    }
  };

  // Create and play a short sound effect
  const playClickSound = () => {
    if (!audioRef.current.audioContext || audioRef.current.audioContext.state === 'closed') return;

    try {
      const { audioContext } = audioRef.current;
      const clickOsc = audioContext.createOscillator();
      const clickGain = audioContext.createGain();

      clickOsc.type = 'sine';
      clickOsc.frequency.value = 440 + Math.random() * 200;

      clickGain.gain.value = 0.1;
      clickGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

      clickOsc.connect(clickGain);
      clickGain.connect(audioContext.destination);

      clickOsc.start();
      clickOsc.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error("Error playing click sound:", error);
    }
  };

  // Update audio parameters based on mouse position
  const updateAudio = (e: MouseEvent) => {
    if (!audioRef.current.audioContext || !audioRef.current.gainNode || !audioRef.current.oscillator || audioRef.current.audioContext.state === 'closed') return;

    const { oscillator, gainNode, audioContext } = audioRef.current;

    // Map mouse position to audio parameters
    const mouseXRatio = e.clientX / window.innerWidth;
    const mouseYRatio = e.clientY / window.innerHeight;

    // Update frequency based on X position (higher to the right)
    oscillator.frequency.value = 220 + mouseXRatio * 220;

    // Update volume based on Y position and mouse speed
    const speed = mouseSpeedRef.current.length();
    const volume = Math.max(0, 0.02 * (1 - mouseYRatio * 1.2) + speed * 0.02);
    gainNode.gain.setTargetAtTime(volume, audioContext.currentTime, 0.1);
  };

  // Add a new click impulse to the particles
  const addClickImpulse = (e: MouseEvent) => {
    if (!canvasRef.current) return;

    // Only play sound if audio is properly initialized
    if (audioInitialized && audioRef.current.audioContext && audioRef.current.audioContext.state !== 'closed') {
      playClickSound();
    }

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    clicksRef.current.push({
      position: new THREE.Vector2(x, y),
      time: Date.now()
    });

    // Remove old clicks
    if (clicksRef.current.length > 5) {
      clicksRef.current = clicksRef.current.slice(-5);
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !inView) return;

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

    // Particle system setup with performance optimization
    const isLowPerformance = window.BIOMASS_LOW_PERFORMANCE_MODE;
    const densityFactor = isLowPerformance ? 600 : 300; // Higher number = fewer particles
    const particleCount = Math.min(
      isLowPerformance ? 5000 : 12000,
      Math.floor(width * height / densityFactor)
    );
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
        uMouseSpeed: { value: new THREE.Vector2() },
        uClicks: { value: [] },
        uSize: { value: 60.0 },
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
        uniform vec2 uMouseSpeed;
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

          // Enhanced mouse interaction with momentum
          float mouseDistance = length(vec2(pos.x, pos.y) - uMouse);
          float mouseInfluence = smoothstep(5.0, 0.5, mouseDistance);
          vec2 direction = normalize(vec2(pos.x, pos.y) - uMouse);

          // Apply mouse speed to particles
          float speedFactor = length(uMouseSpeed) * 0.5;
          vec2 speedInfluence = uMouseSpeed * smoothstep(5.0, 0.1, mouseDistance) * 0.3;

          // Particles are pushed away from mouse with momentum
          pos.x += direction.x * mouseInfluence * 3.0 + speedInfluence.x;
          pos.y += direction.y * mouseInfluence * 3.0 + speedInfluence.y;

          // Add subtle orbiting motion
          float orbit = snoise(vec3(pos.xy * 0.1, uTime * 0.1)) * 0.2;
          pos.x += cos(uTime * 0.2 + aRandom * 10.0) * orbit;
          pos.y += sin(uTime * 0.2 + aRandom * 10.0) * orbit;

          // Project position
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          gl_Position = projectedPosition;

          // Size variation based on depth, random attribute, and mouse speed
          float sizeModifier = 0.3 + aRandom * 0.7 + speedFactor * 0.5;
          gl_PointSize = uSize * sizeModifier * uPixelRatio;
          gl_PointSize *= (1.0 / -viewPosition.z); // Size attenuation
        }
      `,
      fragmentShader: `
        uniform vec3 uColors[3];
        uniform vec2 uMouseSpeed;
        uniform float uTime;

        varying float vRandom;
        varying float vBiomassType;

        void main() {
          // Circular particle shape with soft edge
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          if (strength < 0.05) discard; // Discard non-circular parts

          // Select color based on biomass type
          int colorIndex = int(vBiomassType);
          vec3 color = uColors[colorIndex];

          // Add subtle variation based on random value
          color = mix(color, color * 1.3, vRandom * 0.4);

          // Add subtle pulsing based on time and mouse movement
          float pulse = sin(uTime * 0.5 + vRandom * 10.0) * 0.1 + 0.9;
          float speed = length(uMouseSpeed);
          float glowFactor = min(speed * 10.0, 0.5) * vRandom;
          color = mix(color, color * 1.5, glowFactor);

          // Set fragment color with opacity based on strength and pulsing
          gl_FragColor = vec4(color, strength * 0.7 * pulse);
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

    // Set up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      // Store previous mouse position for calculating speed
      prevMouseRef.current.copy(mouseRef.current);

      // Convert mouse position to normalized device coordinates
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        // Smooth mouse movement with easing
        targetMouseRef.current.set(x, y);

        // Update audio based on mouse position
        if (audioInitialized) {
          updateAudio(e);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (audioInitialized) {
        addClickImpulse(e);
      } else {
        initAudio();
        addClickImpulse(e);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      prevMouseRef.current.copy(mouseRef.current);

      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect && e.touches[0]) {
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        const y = -((e.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
        targetMouseRef.current.set(x, y);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!audioInitialized) {
        initAudio();
      }

      if (e.touches[0]) {
        const mouseEvent = new MouseEvent('click', {
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY
        });
        addClickImpulse(mouseEvent);
      }
    };

    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return;

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

    // Animation loop
    const clock = new THREE.Clock();
    let lastTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - lastTime;
      lastTime = elapsedTime;

      // Smooth mouse movement
      mouseRef.current.lerp(targetMouseRef.current, 0.1);

      // Calculate mouse speed
      mouseSpeedRef.current.subVectors(mouseRef.current, prevMouseRef.current);
      mouseSpeedRef.current.multiplyScalar(5); // Amplify effect

      // Create a trail effect by storing mouse history
      if (deltaTime > 0) {
        mouseHistoryRef.current.unshift(mouseRef.current.clone());
        if (mouseHistoryRef.current.length > 10) {
          mouseHistoryRef.current.pop();
        }
      }

      // Update material uniforms
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = elapsedTime;
        materialRef.current.uniforms.uMouse.value = mouseRef.current;
        materialRef.current.uniforms.uMouseSpeed.value = mouseSpeedRef.current;
      }

      // Update particle rotation for dynamic movement
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsedTime * 0.05;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.025) * 0.1;
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
    window.addEventListener('click', handleClick);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', handleResize);

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      // Clean up audio resources
      if (audioRef.current.oscillator) {
        audioRef.current.oscillator.stop();
      }

      if (audioRef.current.audioContext) {
        audioRef.current.audioContext.close();
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
    };
  }, [inView, audioInitialized]);

  return (
    <div ref={inViewRef} className="absolute top-0 left-0 w-full h-full z-0">
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-none"
        style={{ touchAction: 'none' }} // Prevents touch scrolling issues
      />
    </div>
  );
};

export default EnhancedParticleAnimation;
