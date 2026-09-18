import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { fragmentShader, vertexShader } from "./backgroundShader";

const BG_COLOR = new THREE.Color("#08080a");
const ACCENT_COLOR = new THREE.Color("#ff5a3c");

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();
  const pointer = useRef({ x: 0.5, y: 0.5 });
  const smoothed = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth;
      pointer.current.y = 1 - event.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  useFrame((state) => {
    smoothed.current.x += (pointer.current.x - smoothed.current.x) * 0.035;
    smoothed.current.y += (pointer.current.y - smoothed.current.y) * 0.035;

    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.set(smoothed.current.x, smoothed.current.y);
    material.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uResolution: { value: new THREE.Vector2(1, 1) },
          uBg: { value: BG_COLOR },
          uAccent: { value: ACCENT_COLOR },
        }}
      />
    </mesh>
  );
}

export default function Background() {
  return (
    <div className="scene-background" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
