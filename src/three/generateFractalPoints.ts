// Sierpinski gasket via the chaos-game algorithm: repeatedly jump halfway
// toward a randomly chosen triangle vertex. Cheap, and produces a
// recognizable fractal silhouette to use as the particles' "home" formation.
export function generateSierpinskiPoints(
  count: number,
  width: number,
  height: number,
  centerXOffset = 0,
): Float32Array {
  const size = Math.min(width, height) * 0.92;
  const cx = centerXOffset;
  const cy = size * 0.05;
  const vertices: [number, number][] = [
    [cx, cy + size * 0.56],
    [cx - size * 0.56, cy - size * 0.42],
    [cx + size * 0.56, cy - size * 0.42],
  ];

  const points = new Float32Array(count * 3);
  let x = vertices[0][0];
  let y = vertices[0][1];

  for (let i = -30; i < count; i++) {
    const v = vertices[(Math.random() * 3) | 0];
    x = (x + v[0]) / 2;
    y = (y + v[1]) / 2;
    if (i >= 0) {
      const idx = i * 3;
      points[idx] = x;
      points[idx + 1] = y;
      points[idx + 2] = (Math.random() - 0.5) * 70;
    }
  }

  return points;
}
