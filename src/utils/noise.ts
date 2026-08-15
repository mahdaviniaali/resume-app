// Simplex Noise simulation (pseudo-noise for smooth waves)
export function noise(x: number, y: number, t: number): number {
  return (
    Math.sin(x * 0.01 + t) +
    Math.cos(y * 0.01 + t * 1.3) +
    Math.sin((x + y) * 0.005 + t * 0.7)
  ) / 3
}
