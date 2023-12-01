import { readInput } from 'utils';
import { part1, part2 } from './day2';

describe('day2', () => {
  test.each`
    input          | expected
    ${'2015-day2'} | ${1588178}
  `('part1', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input          | expected
    ${'2015-day2'} | ${3783758}
  `('part2', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
