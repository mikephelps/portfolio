// An asymmetric multi-attractor chaos game: repeatedly jump partway toward
// a randomly chosen attractor point. With an irregular (non-polygonal) set
// of attractors this reads as abstract shattered dust rather than a
// recognizable geometric symbol, while keeping the same fractal, self-similar
// texture.
const ATTRACTORS: [number, number][] = [
  [0.02, 0.66],
  [-0.58, 0.3],
  [-0.68, -0.28],
  [-0.14, -0.64],
  [0.4, -0.72],
  [0.72, -0.12],
  [0.55, 0.48],
  [0.1, 0.08],
];

const JUMP_RATIO = 0.56;

export function generateFractalPoints(
  count: number,
  width: number,
  height: number,
  centerXOffset = 0,
): Float32Array {
  const size = Math.min(width, height) * 0.95;
  const cx = centerXOffset;
  const cy = size * 0.02;

  const vertices = ATTRACTORS.map(([x, y]) => [cx + x * size * 0.5, cy + y * size * 0.5]);

  const points = new Float32Array(count * 3);
  let x = vertices[0][0];
  let y = vertices[0][1];

  for (let i = -30; i < count; i++) {
    const v = vertices[(Math.random() * vertices.length) | 0];
    x = x + (v[0] - x) * JUMP_RATIO;
    y = y + (v[1] - y) * JUMP_RATIO;
    if (i >= 0) {
      const idx = i * 3;
      points[idx] = x;
      points[idx + 1] = y;
      points[idx + 2] = (Math.random() - 0.5) * 70;
    }
  }

  return points;
}
