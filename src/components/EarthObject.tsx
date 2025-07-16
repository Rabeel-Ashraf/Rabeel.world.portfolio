import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial } from 'three';
import * as THREE from 'three';

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Load Earth texture with fallback
  let earthTexture;
  try {
    earthTexture = useLoader(TextureLoader, 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=1024&h=512&fit=crop');
  } catch (error) {
    console.warn('Failed to load Earth texture, using fallback');
    earthTexture = null;
  }
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        map={earthTexture} 
        color={earthTexture ? '#ffffff' : '#4a90e2'}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

const Stars = () => {
  const starsRef = useRef<THREE.Points>(null);
  
  const starsGeometry = new THREE.BufferGeometry();
  const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.002 });
  
  const starsVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starsVertices.push(x, y, z);
  }
  
  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
  
  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.0001;
      starsRef.current.rotation.y += 0.0001;
    }
  });

  return <points ref={starsRef} geometry={starsGeometry} material={starsMaterial} />;
};

const EarthObject = () => {
  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden bg-gray-900 border border-purple-500/30 relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#a855f7" />
        <Stars />
        <Earth />
      </Canvas>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
    </div>
  );
};

export default EarthObject;