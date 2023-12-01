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
