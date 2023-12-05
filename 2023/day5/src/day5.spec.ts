import { readInput } from 'utils';
import { part1, part2 } from './day5';

describe('day5', () => {
  test.each`
    input                  | expected
    ${'2023-day5-example'} | ${35}
    ${'2023-day5'}         | ${174137457}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  // ${'2023-day5'}         | ${1493866}
  test.each`
    input                  | expected
    ${'2023-day5-example'} | ${46}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
