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

export function sum(numbers: number[]): number;
export function sum(numbers: IterableIterator<number>): number;
export function sum(numbers: string[]): number;
export function sum(numbers: { value: number }[]): number;
export function sum(numbers: { value: string }[]): number;
export function sum(
  numbers:
    | number[]
    | IterableIterator<number>
    | string[]
    | { value: number }[]
    | { value: string }[]
): number {
  if (!Array.isArray(numbers)) {
    numbers = Array.from(numbers);
  }
  if (numbers.length === 0) {
    return 0;
  }
  switch (typeof numbers[0]) {
    case 'number':
    case 'string':
      return numbers.reduce((acc: number, n) => acc + Number(n), 0);
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

/**
 * Intersection of two or more sets (or arrays)
 * @param sets
 */
export function intersection<T>(...sets: T[]): Set<T>;
export function intersection<T>(...sets: Set<T>[]): Set<T>;
export function intersection<T>(...sets: Set<T>[] | T[][]): Set<T> {
  const result = new Set<T>();
  if (sets.length === 0) {
    return result;
  }
  if (sets.length === 1) {
    return set(sets[0]);
  }
  if (sets && sets.length > 0 && Array.isArray(sets[0])) {
    sets = sets.map((s) => new Set(s));
  }
  for (const value of sets[0]) {
    if (sets.every((set) => (set as Set<T>).has(value))) {
      result.add(value);
    }
  }
  return result;
}

export function set<T>(s: T[] | Set<T>): Set<T> {
  return Array.isArray(s) ? new Set<T>(s) : s;
}
