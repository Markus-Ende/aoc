import { lines, numbers } from 'utils';

export function part1(input: string): number {
  const reports = lines(input);
  let count = 0;
  for (let i = 0; i < reports.length; i++) {
    const row = numbers(reports[i]);
    if (isSafe(row, true) || isSafe(row, false)) {
      count++;
    }
  }
  return count;
}

function isSafe(row: number[], increasing: boolean) {
  for (let j = 1; j < row.length; j++) {
    const diff = increasing ? row[j] - row[j - 1] : row[j - 1] - row[j];
    if (diff <= 0 || diff > 3) {
      return false;
    }
  }

  return true;
}

export function part2(input: string): number {
  const reports = lines(input);
  let count = 0;
  for (let i = 0; i < reports.length; i++) {
    const row = numbers(reports[i]);
    if (isSafeWithDampener(row, true) || isSafeWithDampener(row, false)) {
      count++;
    }
  }
  return count;

  function isSafeWithDampener(row: number[], increasing: boolean) {
    if (isSafe(row, increasing)) {
      return true;
    }
    for (let i = 0; i < row.length; i++) {
      const a = Array.from(row);
      a.splice(i, 1);
      if (isSafe(a, increasing)) {
        return true;
      }
    }
    return false;
  }
}
