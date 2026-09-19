export const particleVertexShader = /* glsl */ `
attribute float aSize;
attribute float aEnergy;
uniform float uPixelRatio;
varying float vEnergy;

void main() {
  vEnergy = aEnergy;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = (aSize + aEnergy * 4.5) * uPixelRatio;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform vec3 uColorHot;
varying float vEnergy;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;
  // A tight edge falloff instead of a wide gaussian glow — reads as a
  // crisp dot rather than a soft, hazy blob.
  float edge = smoothstep(0.5, 0.34, dist);
  // Dim by default so the field never fights with text sitting on top of
  // it; only particles the pointer is actively repelling (a much larger
  // displacement than the constant ambient drift ever produces) light up
  // toward full opacity, giving a punchy, localized hover response.
  float energyFactor = smoothstep(0.22, 0.65, vEnergy);
  float alpha = pow(edge, 1.5) * mix(0.2, 1.0, energyFactor);
  vec3 color = mix(uColor, uColorHot, clamp(vEnergy * 1.4, 0.0, 1.0));
  gl_FragColor = vec4(color, alpha);
}
`;
