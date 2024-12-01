import { Matrix, combinations, sum } from 'utils';

export function part1(input: string): number {
  let matrix = new Matrix<'.' | '#'>(input);

  const emptyRows = matrix.findRows('all-cells', (value) => value === '.');
  for (const [i, row] of emptyRows.entries()) {
    console.log('duplicate row', row + i);
    matrix = matrix.duplicateRow(row + i);
  }

  const emptyColumns = matrix.findColumns(
    'all-cells',
    (value) => value === '.'
  );
  for (const [i, column] of emptyColumns.entries()) {
    console.log('duplicate column', column + i);
    matrix = matrix.duplicateColumn(column + i);
  }

  const galaxies = matrix.findAll((value) => value === '#');
  console.log('found ', galaxies.length, 'galaxies');

  let sum = 0;
  for (const [a, b] of combinations(galaxies, 2)) {
    sum += Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }
  return sum;
}

export function part2(input: string): number {
  throw new Error('Not implemented');
}
