import { readInput } from 'utils';
import { part1, part2 } from './day3';

describe('day3', () => {
  test.each`
    input          | expected
    ${'2015-day3'} | ${2565}
  `('part1', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input          | expected
    ${'2015-day3'} | ${2639}
  `('part2', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
