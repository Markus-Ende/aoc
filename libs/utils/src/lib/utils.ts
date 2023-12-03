import * as fs from 'node:fs';

/**
 * input data must be in a .txt file in [workspaceroot]/puzzleinput/
 * @param inputName file name without extension
 * @returns content
 */
export function readInput(
  inputName: `${number}-day${number}${'' | `-${string}`}`
): string {
  return fs.readFileSync(`./input/${inputName}.txt`, 'utf8');
}

export function reverse(s: string): string {
  return s.split('').reverse().join('');
}

export function lines(s: string): string[] {
  return s.split('\n');
}

export function chars(s: string): string[] {
  return Array.from(s);
}

export function countChars(s: string, c: string): number {
  return chars(s).filter((char) => char === c).length;
}

export function sortAsc(...numbers: number[]): number[] {
  return numbers.sort((a, b) => a - b);
}

export function sortDesc(...numbers: number[]): number[] {
  return numbers.sort((a, b) => b - a);
}

export function rowSize(matrix: string): number {
  const rowSize = matrix.indexOf('\n');
  if (lines(matrix).some((line) => line.length !== rowSize)) {
    throw new Error('Matrix is not rectangular');
  }
  return rowSize;
}

export function isNumber(s: string): boolean {
  return !isNaN(parseInt(s));
}

export function sum(
  numbers: number[] | string[] | { value: number }[] | { value: string }[]
): number {
  if (numbers.length === 0) {
    return 0;
  }
  switch (typeof numbers[0]) {
    case 'number':
      return numbers.reduce((acc: number, n) => acc + (n as number), 0);
    case 'string':
      return numbers.reduce((acc: number, n) => acc + parseInt(n as string), 0);
    default: {
      if (typeof numbers[0].value === 'number') {
        return numbers.reduce(
          (acc: number, n) => acc + (n as { value: number }).value,
          0
        );
      }
      return numbers.reduce(
        (acc: number, n) => acc + parseInt((n as { value: string }).value),
        0
      );
    }
  }
}

export function add<KEYTYPE, VALUETYPE>(
  key: KEYTYPE,
  value: VALUETYPE,
  map: Map<KEYTYPE, VALUETYPE[]>
): void {
  if (!map.has(key)) {
    map.set(key, []);
  }
  map.get(key)?.push(value);
}
