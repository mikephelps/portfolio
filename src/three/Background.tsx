import { Canvas } from "@react-three/fiber";
import FractalField from "./FractalField";

export default function Background() {
  return (
    <div className="scene-background" aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
      >
        <color attach="background" args={["#08080a"]} />
        <FractalField />
      </Canvas>
    </div>
  );
}
