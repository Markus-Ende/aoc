import { readInput } from 'utils';
import { part1, part2 } from './day9';

describe('day9', () => {
  test.each`
    input                  | expected
    ${'2023-day9-example'} | ${114}
    ${'2023-day9'}         | ${1731106378}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day9-example'} | ${2}
    ${'2023-day9'}         | ${1087}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
