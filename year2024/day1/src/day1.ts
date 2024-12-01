import { numberMatrix, sortAsc, sum } from 'utils';

export function part1(input: string): number {
  const matrix = numberMatrix(input, true);
  const left = sortAsc(...matrix.getColumn(0));
  const right = sortAsc(...matrix.getColumn(1));

  const differences = left.map((l, i) => {
    const r = right[i];
    return Math.abs(r - l);
  });

  return sum(differences);
}

export function part2(input: string): number {
  const matrix = numberMatrix(input, true);
  const left = matrix.getColumn(0);
  const right = matrix.getColumn(1);

  const scores = left.map((l, i) => {
    // optimziation: create a map of counts of right hand side beforehand
    return l * right.filter((r) => r === l).length;
  });
  return sum(scores);
}
