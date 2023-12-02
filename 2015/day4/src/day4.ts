import * as crypto from 'node:crypto';

function md5(key: string, n: number): string {
  return crypto.createHash('md5').update(`${key}${n}`).digest('hex');
}

export function part1(input: string, leadingZeros = 5): number {
  let n = 1;
  while (md5(input, n).slice(0, leadingZeros) !== '0'.repeat(leadingZeros)) {
    n++;
  }
  return n;
}

export function part2(input: string): number {
  return part1(input, 6);
}
