import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, PerspectiveCamera, Text } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

const Book = ({ position, rotation, color }) => {
  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position} rotation={rotation}>
        <boxGeometry args={[1, 1.4, 0.2]} />
        <meshStandardMaterial color={color} roughness={0.1} metalness={0.5} />
        {/* Spine */}
        <mesh position={[-0.45, 0, 0]}>
          <boxGeometry args={[0.1, 1.4, 0.2]} />
          <meshStandardMaterial color={color} />
        </mesh>
      </mesh>
    </Float>
  );
};

const BooksGroup = () => {
  const books = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      color: ["#6366f1", "#a855f7", "#3b82f6", "#ec4899"][Math.floor(Math.random() * 4)],
    }));
  }, []);

  return (
    <group>
      {books.map((props, i) => (
        <Book key={i} {...props} />
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <BooksGroup />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <fog attach="fog" args={["#020617", 5, 25]} />
      </Canvas>
    </div>
  );
};

export default Scene;
