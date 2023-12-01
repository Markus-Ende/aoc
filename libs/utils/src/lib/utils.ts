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
