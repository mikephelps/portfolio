import { simplexNoise3D } from "./noise.glsl";

export const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec3 uBg;
uniform vec3 uAccent;
varying vec2 vUv;

${simplexNoise3D}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 st = vec2(uv.x * aspect, uv.y);

  float t = uTime * 0.045;

  // Slow drifting smoke field.
  float n = fbm(vec3(st * 1.6, t));
  float n2 = fbm(vec3(st * 2.6 + 4.2, t * 1.3));
  float field = smoothstep(0.05, 0.85, n * 0.6 + n2 * 0.4);

  // Mouse-reactive soft light, aspect-corrected, broken up by noise so it
  // reads as a drifting cloud of light rather than a flat radial spotlight.
  vec2 mouseSt = vec2(uMouse.x * aspect, uMouse.y);
  float distToMouse = distance(st, mouseSt);
  float mouseGlow = smoothstep(0.85, 0.0, distToMouse);
  mouseGlow = pow(mouseGlow, 2.4);
  float glowNoise = fbm(vec3(st * 2.4 + 11.0, t * 1.7));
  mouseGlow *= 0.55 + 0.45 * smoothstep(-0.25, 0.55, glowNoise);

  // Combine: base near-black, wisps of accent, faint pool near cursor.
  float glowStrength = field * 0.13 + mouseGlow * 0.28;
  vec3 color = mix(uBg, uAccent, clamp(glowStrength, 0.0, 1.0));

  // Extra fine wisps for texture, kept subtle.
  float wisp = smoothstep(0.55, 0.95, n2);
  color = mix(color, uAccent, wisp * 0.045);

  // Vignette to keep focus centered / edges recede to near-black.
  float vig = smoothstep(1.05, 0.25, distance(uv, vec2(0.5)));
  color *= mix(0.72, 1.0, vig);

  // Subtle grain to avoid banding on the smoke gradient.
  float grain = fract(sin(dot(uv * uResolution.xy, vec2(12.9898, 78.233))) * 43758.5453);
  color += (grain - 0.5) * 0.012;

  gl_FragColor = vec4(color, 1.0);
}
`;
