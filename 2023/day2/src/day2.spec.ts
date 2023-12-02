import { readInput } from 'utils';
import { part1, part2 } from './day2';

describe('day2', () => {
  test.each`
    input                  | expected
    ${'2023-day2-example'} | ${8}
    ${'2023-day2'}         | ${2169}
  `('part1', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day2-example'} | ${2286}
    ${'2023-day2'}         | ${60948}
  `('part2', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
