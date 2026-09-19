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

  // Per-particle drift parameters: [radiusX, radiusY, speed, phase]. Each
  // particle continuously orbits a small ellipse around its "home" spot
  // instead of sitting still there, so the whole field stays in gentle,
  // never-repeating-looking motion even with no pointer interaction.
  const orbit = useRef<Float32Array>(new Float32Array(COUNT * 4));

  const { geometry, home } = useMemo(() => {
    const xOffset = viewport.width * 0.14;
    const homeArr = generateFractalPoints(COUNT, viewport.width, viewport.height, xOffset);
    const positions = homeArr.slice();
    const sizes = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      sizes[i] = 3.2 + Math.random() * 4.2;
      const oi = i * 4;
      orbit.current[oi] = 6 + Math.random() * 22;
      orbit.current[oi + 1] = 6 + Math.random() * 22;
      orbit.current[oi + 2] = 0.12 + Math.random() * 0.3;
      orbit.current[oi + 3] = Math.random() * Math.PI * 2;
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

  useFrame((state) => {
    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const energyAttr = geometry.attributes.aEnergy as THREE.BufferAttribute;
    const pos = posAttr.array as Float32Array;
    const vel = velocity.current;
    const hm = home.current;
    const en = energy.current;
    const ob = orbit.current;
    const t = state.clock.elapsedTime;

    const repelRadius = Math.min(viewport.width, viewport.height) * 0.16;
    const repelStrength = 2.6;
    const spring = 0.018;
    const damping = 0.9;

    const mx = pointerActive.current ? pointer.current.x : 100000;
    const my = pointerActive.current ? pointer.current.y : 100000;

    for (let i = 0; i < COUNT; i++) {
      const idx = i * 3;
      const oi = i * 4;
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

      // Orbit target: each particle's spring pulls toward a point drifting
      // in a small ellipse around its home position, so the field keeps
      // flowing on its own instead of settling into a static formation.
      const phase = t * ob[oi + 2] + ob[oi + 3];
      const targetX = hm[idx] + Math.cos(phase) * ob[oi];
      const targetY = hm[idx + 1] + Math.sin(phase * 1.3) * ob[oi + 1];

      vx += (targetX - px) * spring;
      vy += (targetY - py) * spring;
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
      // Divisor raised so the ambient orbit drift only tints particles
      // faintly — the brighter "hot" glow still reads as a response to the
      // pointer's repel force specifically, not as constant background noise.
      const target = Math.min(disp / 160, 1);
      en[i] += (target - en[i]) * 0.12;
    }

    posAttr.needsUpdate = true;
    (energyAttr.array as Float32Array).set(en);
    energyAttr.needsUpdate = true;

    if (pointsRef.current) {
      pointsRef.current.rotation.z += 0.00055;
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
