import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

/* ── The spinning 3D model ── */
function EmblemModel() {
  const groupRef = useRef();
  const { scene } = useGLTF('/vsi_emblem.glb');


  useFrame((_, delta) => {
    if (groupRef.current) {
      // Smooth continuous Y rotation
      groupRef.current.rotation.y += delta * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        // scale 1 = natural size; camera distance controls apparent size
        scale={1.5}
        position={[0, 0, 0]}
      />
    </group>
  );
}

/* ── Intro-screen variant ──
   Canvas is 260×260 px.
   Camera at z=9 with fov=28 keeps the whole model in frame with breathing room.
── */
export function IntroLogo3D() {
  return (
    <div
      style={{
        width:  270,
        height: 270,
        margin: '0 auto',
        // no border-radius so the WebGL canvas doesn't clip
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 28 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', display: 'block' }}
      >
        <Suspense fallback={null}>
          {/* Lighting: purple key, amber fill, pink rim */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 6, 4]}  intensity={2.0} color="#a855f7" />
          <directionalLight position={[-4, -2, -4]} intensity={0.7} color="#f59e0b" />
          <pointLight       position={[0, 4, 2]}   intensity={1.0} color="#ec4899" />
          <EmblemModel />
          {/* <Environment preset="city" /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the GLB so it's ready before the intro plays
useGLTF.preload('/vsi_emblem.glb');
