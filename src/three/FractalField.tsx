import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { generateFractalPoints } from "./generateFractalPoints";
import { particleFragmentShader, particleVertexShader } from "./particleShader";

const COUNT = 2800;
const COLOR_BASE = new THREE.Color("#8862f0");
const COLOR_HOT = new THREE.Color("#e4d9ff");

export default function FractalField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const { viewport, gl } = useThree();

  const velocity = useRef<Float32Array>(new Float32Array(COUNT * 3));
  const energy = useRef<Float32Array>(new Float32Array(COUNT));
  const pointer = useRef({ x: 100000, y: 100000 });
  const pointerActive = useRef(false);
  const mounted = useRef(false);

  const { geometry, home } = useMemo(() => {
    const xOffset = viewport.width * 0.14;
    const homeArr = generateFractalPoints(COUNT, viewport.width, viewport.height, xOffset);
    const positions = homeArr.slice();
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = 3.2 + Math.random() * 4.2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aEnergy", new THREE.BufferAttribute(new Float32Array(COUNT), 1));

    return { geometry: geo, home: { current: homeArr } };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const xOffset = viewport.width * 0.14;
    const newHome = generateFractalPoints(COUNT, viewport.width, viewport.height, xOffset);
    home.current = newHome;
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    (posAttr.array as Float32Array).set(newHome);
    posAttr.needsUpdate = true;
    velocity.current.fill(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewport.width, viewport.height]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y = (0.5 - event.clientY / window.innerHeight) * viewport.height;
      pointerActive.current = true;
    };
    const handlePointerLeave = () => {
      pointerActive.current = false;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [viewport.width, viewport.height]);

  useFrame(() => {
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const energyAttr = geometry.attributes.aEnergy as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const vel = velocity.current;
    const hm = home.current;
    const en = energy.current;

    const repelRadius = Math.min(viewport.width, viewport.height) * 0.16;
    const repelStrength = 2.6;
    const spring = 0.018;
    const damping = 0.9;

    const mx = pointerActive.current ? pointer.current.x : 100000;
    const my = pointerActive.current ? pointer.current.y : 100000;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      const px = pos[idx];
      const py = pos[idx + 1];
      const pz = pos[idx + 2];

      let vx = vel[idx];
      let vy = vel[idx + 1];
      let vz = vel[idx + 2];

      const dxm = px - mx;
      const dym = py - my;
      const distm = Math.sqrt(dxm * dxm + dym * dym);
      if (distm < repelRadius) {
        const falloff = 1 - distm / repelRadius;
        const force = (falloff * falloff * repelStrength) / Math.max(distm, 6);
        vx += dxm * force;
        vy += dym * force;
      }

      vx += (hm[idx] - px) * spring;
      vy += (hm[idx + 1] - py) * spring;
      vz += (hm[idx + 2] - pz) * spring;

      vx *= damping;
      vy *= damping;
      vz *= damping;

      const nx = px + vx;
      const ny = py + vy;
      const nz = pz + vz;

      pos[idx] = nx;
      pos[idx + 1] = ny;
      pos[idx + 2] = nz;
      vel[idx] = vx;
      vel[idx + 1] = vy;
      vel[idx + 2] = vz;

      const dispX = nx - hm[idx];
      const dispY = ny - hm[idx + 1];
      const dispZ = nz - hm[idx + 2];
      const disp = Math.sqrt(dispX * dispX + dispY * dispY + dispZ * dispZ);
      const target = Math.min(disp / 90, 1);
      en[i] += (target - en[i]) * 0.12;
    }

    posAttr.needsUpdate = true;
    (energyAttr.array as Float32Array).set(en);
    energyAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.00025;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 1.6) },
          uColor: { value: COLOR_BASE },
          uColorHot: { value: COLOR_HOT },
        }}
      />
    </points>
  );
}
