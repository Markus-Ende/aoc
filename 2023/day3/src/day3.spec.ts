import { readInput } from 'utils';
import { part1, part2 } from './day3';

describe('day3', () => {
  test.each`
    input                  | expected
    ${'2023-day3-example'} | ${4361}
    ${'2023-day3'}         | ${550064}
    ${'2023-day3-vlad'}    | ${556057}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day3-example'} | ${467835}
    ${'2023-day3'}         | ${85010461}
    ${'2023-day3-vlad'}    | ${82824352}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
