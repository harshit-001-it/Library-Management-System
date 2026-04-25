import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
  const ref = useRef();
  
  // Create random points for stars
  const stars = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={stars} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c0c1ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const BackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0c1324]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
        {/* Subtle nebula glow */}
        <ambientLight intensity={0.5} />
      </Canvas>
      <div 
        className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 via-transparent to-purple-900/20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)'
        }}
      />
    </div>
  );
};

export default BackgroundCanvas;
