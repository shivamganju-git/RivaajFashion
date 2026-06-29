import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';

const SilkFabric = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color="#9B3B26"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.2}
          roughness={0.4}
          distort={0.4}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
};

const ThreeCanvas = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#FFF5E1" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#D4AF37" />
        
        <SilkFabric />
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 3, 0, 1]}>
            <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[5, 1, -1]} scale={2} />
            <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
          </group>
        </Environment>
      </Canvas>
    </div>
  );
};

export default ThreeCanvas;
