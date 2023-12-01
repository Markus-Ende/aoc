import { countChars } from 'utils';

export function part1(input: string): number {
  return countChars(input, '(') - countChars(input, ')');
}

export function part2(input: string): number {
  let floor = 0;
  for (let i = 0; i < input.length; i++) {
    floor += input[i] === '(' ? 1 : -1;
    if (floor === -1) {
      return i + 1;
    }
  }
}
