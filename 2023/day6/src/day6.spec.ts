import { readInput } from 'utils';
import { part1, part2 } from './day6';

describe('day6', () => {
  test.each`
    input                  | expected
    ${'2023-day6-example'} | ${288}
    ${'2023-day6'}         | ${293046}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day6-example'} | ${71503}
    ${'2023-day6'}         | ${35150181}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
