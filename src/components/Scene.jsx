import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Inner component that runs inside the Canvas context
function LatticeNode({ scrollProgress }) {
  const groupRef = useRef();
  const centralCoreRef = useRef();
  const wireframeShellRef = useRef();
  const satelliteRefs = useRef([]);

  // Generate 42 satellite nodes deterministically
  const satellites = useMemo(() => {
    const temp = [];
    const count = 42;
    for (let i = 0; i < count; i++) {
      // Use spherical distribution
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      
      const radius = 2.2;
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      // Random speed and direction for floating animation
      const speed = 0.5 + Math.random() * 1.5;
      
      // Drift direction is outward + upward
      const driftX = x * (1.2 + Math.random() * 0.8);
      const driftY = 4.0 + Math.random() * 6.0; // Strong upward drift
      const driftZ = z * (1.2 + Math.random() * 0.8);

      temp.push({
        id: i,
        initialPos: new THREE.Vector3(x, y, z),
        driftDir: new THREE.Vector3(driftX, driftY, driftZ),
        speed,
        scale: 0.05 + Math.random() * 0.08,
        color: i % 2 === 0 ? '#00ced1' : '#ff8c00', // Teal or Orange
      });
    }
    return temp;
  }, []);

  // Update loop for animations (running at 60fps in WebGL)
  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const p = scrollProgress?.current ? scrollProgress.current.value : 0;

    // 1. Central Core Animation
    if (centralCoreRef.current) {
      centralCoreRef.current.rotation.y = elapsed * 0.2;
      centralCoreRef.current.rotation.x = elapsed * 0.1;
      
      // Central core shrinks and disappears as it disassembles
      const coreScale = Math.max(0, 1 - p * 1.5);
      centralCoreRef.current.scale.setScalar(coreScale);
    }

    // 2. Wireframe Shell Animation
    if (wireframeShellRef.current) {
      wireframeShellRef.current.rotation.y = -elapsed * 0.15;
      wireframeShellRef.current.rotation.z = elapsed * 0.08;
      
      // Wireframe shell expands and fades out
      const shellScale = 1 + p * 3.5;
      wireframeShellRef.current.scale.setScalar(shellScale);
      
      if (wireframeShellRef.current.material) {
        wireframeShellRef.current.material.opacity = Math.max(0, 0.4 - p * 0.5);
      }
    }

    // 3. Satellite Nodes Animation
    satellites.forEach((sat, index) => {
      const mesh = satelliteRefs.current[index];
      if (mesh) {
        // Position = Initial + (Drift * ScrollProgress) + Small Float fluctuation
        const floatOffset = Math.sin(elapsed * sat.speed) * 0.1;
        
        mesh.position.x = sat.initialPos.x + sat.driftDir.x * p;
        mesh.position.y = sat.initialPos.y + sat.driftDir.y * p + floatOffset;
        mesh.position.z = sat.initialPos.z + sat.driftDir.z * p;
        
        // Satellite spins faster as it disassembles
        mesh.rotation.y = elapsed * sat.speed + p * 5;
        mesh.rotation.x = elapsed * (sat.speed * 0.5);

        // Satellites fade out slightly towards the end
        if (mesh.material) {
          mesh.material.opacity = Math.max(0.1, 0.9 - p * 0.8);
        }
      }
    });

    // 4. Slow overall scene rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = elapsed * 0.05 + p * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Node (Core Server Node) */}
      <mesh ref={centralCoreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial 
          color="#1b1c1c" 
          roughness={0.1}
          metalness={0.9}
          wireframe={false}
          emissive="#00ced1"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Wireframe Shell Grid */}
      <mesh ref={wireframeShellRef}>
        <icosahedronGeometry args={[1.6, 2]} />
        <meshBasicMaterial 
          color="#00ced1" 
          wireframe={true} 
          transparent={true} 
          opacity={0.4}
        />
      </mesh>

      {/* Satellite Node Lattice */}
      {satellites.map((sat, index) => (
        <mesh 
          key={sat.id}
          ref={el => satelliteRefs.current[index] = el}
          position={sat.initialPos}
        >
          {/* Use box or sphere geometry for placeholders that can be easily swapped */}
          {sat.id % 3 === 0 ? (
            <boxGeometry args={[sat.scale * 1.5, sat.scale * 1.5, sat.scale * 1.5]} />
          ) : sat.id % 3 === 1 ? (
            <icosahedronGeometry args={[sat.scale, 0]} />
          ) : (
            <octahedronGeometry args={[sat.scale, 0]} />
          )}
          <meshStandardMaterial 
            color={sat.color} 
            roughness={0.2}
            metalness={0.8}
            emissive={sat.color}
            emissiveIntensity={0.6}
            transparent={true}
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* Connection lines to central core (visible mainly in snapped start state) */}
      {satellites.filter((_, idx) => idx % 4 === 0).map((sat) => {
        const points = [new THREE.Vector3(0, 0, 0), sat.initialPos];
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`line-${sat.id}`} geometry={lineGeometry}>
            <lineBasicMaterial color="#444748" transparent opacity={0.25} />
          </line>
        );
      })}
    </group>
  );
}

export default function Scene({ scrollProgress }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={['transparent']} />
        
        {/* Soft atmospheric stars */}
        <Stars radius={100} depth={50} count={1200} factor={4} saturation={0.5} fade speed={1} />
        
        {/* Ambient lighting */}
        <ambientLight intensity={0.25} />
        
        {/* High-contrast Teal and Orange point lights to create cinematic mood */}
        <pointLight 
          position={[-10, 5, -5]} 
          color="#00ced1" 
          intensity={5.0} 
          distance={30} 
          decay={1.5}
        />
        <pointLight 
          position={[10, -5, 5]} 
          color="#ff8c00" 
          intensity={6.0} 
          distance={30} 
          decay={1.5}
        />
        
        {/* Spotlight highlights */}
        <spotLight 
          position={[0, 10, 0]} 
          color="#ffffff" 
          intensity={2.0} 
          distance={20}
          angle={Math.PI / 6}
          penumbra={0.8}
        />

        {/* Float adds a gentle overall float logic to the node */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
          <LatticeNode scrollProgress={scrollProgress} />
        </Float>
      </Canvas>
    </div>
  );
}
