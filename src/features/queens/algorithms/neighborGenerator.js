/**
 * Steepest-Ascent Hill Climbing neighbor generator.
 * Scans all N*(N-1) neighbors (N cols × N-1 non-current rows).
 * Returns { h0, bestH, moves } where moves is array of {col, row, hv}.
 * If bestH >= h0 → local optimum or plateau → stop.
 */
import { h, hMove } from './heuristic.js';

export function steepest(q, n = q.length) {
  const h0 = h(q, n);
  let bestH = Infinity;
  const moves = [];

  for (let col = 0; col < n; col++) {
    for (let row = 0; row < n; row++) {
      if (row === q[col]) continue; // skip current position
      const hv = hMove(q, col, row, n);
      if (hv < bestH) {
        bestH = hv;
        moves.length = 0;
        moves.push({ col, row, hv });
      } else if (hv === bestH) {
        moves.push({ col, row, hv });
      }
    }
  }

  return { h0, bestH, moves };
}

/**
 * Returns a Set of "col,row" strings for all attacked queen positions.
 */
export function attackedSet(q, n = q.length) {
  const s = new Set();
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (q[i] === q[j] || Math.abs(q[i] - q[j]) === Math.abs(i - j)) {
        s.add(`${i},${q[i]}`);
        s.add(`${j},${q[j]}`);
      }
    }
  }
  return s;
}
