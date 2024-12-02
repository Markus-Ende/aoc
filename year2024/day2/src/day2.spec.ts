import { readInput } from 'utils';
import { part1, part2 } from './day2';

describe('day2', () => {
  test.each`
    input                  | expected
    ${'2024-day2'}         | ${383}
    ${'2024-day2-example'} | ${2}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2024-day2'}         | ${436}
    ${'2024-day2-example'} | ${4}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
