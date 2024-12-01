import { readInput } from 'utils';
import { part1, part2 } from './day1';

describe('day1', () => {
  // 3   4
  // 4   3
  // 2   5
  // 1   3
  // 3   9
  // 3   3
  // -->
  // 1   3  -> 2
  // 2   3  -> 1
  // 3   3  -> 0
  // 3   4  -> 1
  // 3   5  -> 2
  // 4   9  -> 5
  // --> 11

  test.each`
    input                  | expected
    ${'2024-day1-example'} | ${11}
    ${'2024-day1'}         | ${1341714}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2024-day1-example'} | ${31}
    ${'2024-day1'}         | ${27384707}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
