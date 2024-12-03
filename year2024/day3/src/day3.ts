import { sum } from 'utils';

export function part1(input: string): number {
  // https://regex101.com/r/oKyKQi/1
  const matches = Array.from(input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g));
  let count = 0;
  matches?.forEach((match) => {
    count += Number(match[1]) * Number(match[2]);
  });
  return count;
}

export function part2(input: string): number {
  const startEnabled = input.split('do()');
  return sum(
    startEnabled.map((mul) => {
      const firstMulWithoutDont = mul.split(`don't()`)[0];
      return part1(firstMulWithoutDont);
    })
  );
}
