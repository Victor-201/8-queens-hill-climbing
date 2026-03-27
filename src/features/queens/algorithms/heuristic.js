/**
 * h(q, n) — number of attacking queen pairs for an N-queens board.
 * Two queens attack each other if:
 *   (1) same row:     q[i] === q[j]
 *   (2) same diagonal:|q[i]-q[j]| === |i-j|
 * Same column cannot happen because state guarantees 1 queen per column.
 */
export function h(q, n = q.length) {
  let attacks = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (q[i] === q[j]) { attacks++; continue; }
      if (Math.abs(q[i] - q[j]) === Math.abs(i - j)) attacks++;
    }
  }
  return attacks;
}

/**
 * h for the state where queen in column `col` moves to `row`
 */
export function hMove(q, col, row, n = q.length) {
  const nq = q.slice();
  nq[col] = row;
  return h(nq, n);
}

/**
 * Build the full N×N heuristic table.
 * T[row][col] = h if queen at column col moves to row.
 * Current position cell shows h(q) (the queen is already there).
 */
export function buildTable(q, n = q.length) {
  const hv = h(q, n);
  const T = [];
  for (let row = 0; row < n; row++) {
    T[row] = [];
    for (let col = 0; col < n; col++) {
      T[row][col] = (row === q[col]) ? hv : hMove(q, col, row, n);
    }
  }
  return T;
}
