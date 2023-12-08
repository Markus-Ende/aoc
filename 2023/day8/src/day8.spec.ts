import { readInput } from 'utils';
import { part1, part2 } from './day8';

describe('day8', () => {
  test.each`
    input                   | expected
    ${'2023-day8-example'}  | ${2}
    ${'2023-day8-example2'} | ${6}
    ${'2023-day8'}          | ${22199}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                   | expected
    ${'2023-day8-example3'} | ${6}
    ${'2023-day8'}          | ${13334102464297}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
