import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, ShaderMaterial, Vector3, AdditiveBlending, BackSide } from 'three';
import * as THREE from 'three';

// Custom Earth shader for day/night cycle
const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D specularMap;
  uniform vec3 sunDirection;
  uniform float time;
  
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  
  void main() {
    vec3 dayColor = texture2D(dayTexture, vUv).rgb;
    vec3 nightColor = texture2D(nightTexture, vUv).rgb;
    float specular = texture2D(specularMap, vUv).r;
    
    // Calculate lighting
    float intensity = dot(vNormal, sunDirection);
    float mixFactor = smoothstep(-0.1, 0.1, intensity);
    
    // Mix day and night textures
    vec3 color = mix(nightColor * 2.0, dayColor, mixFactor);
    
    // Add specular highlights for oceans
    if (mixFactor > 0.5) {
      vec3 viewDirection = normalize(cameraPosition - vPosition);
      vec3 reflectDirection = reflect(-sunDirection, vNormal);
      float specularIntensity = pow(max(dot(viewDirection, reflectDirection), 0.0), 32.0);
      color += specular * specularIntensity * vec3(0.8, 0.9, 1.0) * 0.5;
    }
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

// Atmosphere shader
const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  uniform float time;
  
  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    float pulse = sin(time * 2.0) * 0.1 + 0.9;
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * pulse;
  }
`;

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  // Load high-quality textures
  const dayTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=2048&h=1024&fit=crop');
  const nightTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=2048&h=1024&fit=crop');
  const specularTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=2048&h=1024&fit=crop');
  const cloudsTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=2048&h=1024&fit=crop');
  
  // Get user's timezone and calculate sun position
  const { sunDirection, rotationOffset } = useMemo(() => {
    const now = new Date();
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const userTime = new Date().toLocaleString("en-US", {timeZone: userTimezone});
    const localTime = new Date(userTime);
    
    // Calculate hours from UTC
    const utcHours = now.getUTCHours();
    const localHours = localTime.getHours();
    const timezoneOffset = localHours - utcHours;
    
    // Calculate sun position based on time
    const hourAngle = (utcHours + timezoneOffset) * 15 * Math.PI / 180; // 15 degrees per hour
    const sunDir = new Vector3(
      Math.cos(hourAngle),
      0.3, // Sun elevation
      Math.sin(hourAngle)
    ).normalize();
    
    // Calculate Earth rotation to show user's location
    const earthRotation = -(timezoneOffset * Math.PI / 12); // Rotate Earth based on timezone
    
    return {
      sunDirection: sunDir,
      rotationOffset: earthRotation
    };
  }, []);
  
  // Custom shader material for Earth
  const earthMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        dayTexture: { value: dayTexture },
        nightTexture: { value: nightTexture },
        specularMap: { value: specularTexture },
        sunDirection: { value: sunDirection },
        time: { value: 0 }
      }
    });
  }, [dayTexture, nightTexture, specularTexture, sunDirection]);
  
  // Atmosphere material
  const atmosphereMaterial = useMemo(() => {
    return new ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        time: { value: 0 }
      },
      blending: AdditiveBlending,
      side: BackSide,
      transparent: true
    });
  }, []);
  
  // Clouds material
  const cloudsMaterial = useMemo(() => {
    return new THREE.MeshLambertMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.4,
      blending: AdditiveBlending
    });
  }, [cloudsTexture]);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Realistic Earth rotation (1 day = 24 hours, but sped up for demo)
      meshRef.current.rotation.y = rotationOffset + time * 0.01;
      earthMaterial.uniforms.time.value = time;
    }
    
    if (cloudsRef.current) {
      // Clouds rotate slightly faster
      cloudsRef.current.rotation.y = rotationOffset + time * 0.012;
    }
    
    if (atmosphereRef.current) {
      atmosphereMaterial.uniforms.time.value = time;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={meshRef} material={earthMaterial}>
        <sphereGeometry args={[1.5, 128, 64]} />
      </mesh>
      
      {/* Clouds */}
      <mesh ref={cloudsRef} material={cloudsMaterial}>
        <sphereGeometry args={[1.53, 64, 32]} />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef} material={atmosphereMaterial}>
        <sphereGeometry args={[1.6, 32, 16]} />
      </mesh>
    </group>
  );
};

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const { starsGeometry, starsMaterial } = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 2,
      sizeAttenuation: false
    });
    
    const starsVertices = [];
    const starsColors = [];
    
    for (let i = 0; i < 15000; i++) {
      // Create sphere distribution
      const radius = 100;
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      starsVertices.push(x, y, z);
      
      // Add some color variation
      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.5, 0.5 + Math.random() * 0.5);
      starsColors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(starsColors, 3));
    
    material.vertexColors = true;
    
    return { starsGeometry: geometry, starsMaterial: material };
  }, []);
  
  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />;
};

const RealisticEarth = () => {
  return (
    <div className="w-full h-80 md:h-96 rounded-xl overflow-hidden bg-black border border-cyan-500/30 relative">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting setup */}
        <ambientLight intensity={0.1} />
        <directionalLight 
          position={[5, 3, 5]} 
          intensity={1.2} 
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#4a90e2" />
        
        {/* Scene objects */}
        <Stars />
        <Earth />
      </Canvas>
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-cyan-400/20 pointer-events-none">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />
      </div>
      
      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 text-xs text-cyan-300 bg-black/50 px-3 py-2 rounded-lg backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Live Earth • Real-time Timezone</span>
        </div>
      </div>
    </div>
  );
};

export default RealisticEarth;