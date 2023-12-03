import { readInput } from 'utils';
import { part1, part2 } from './day6';

describe('day6', () => {
  test.each`
    input          | expected
    ${'2015-day6'} | ${569999}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input          | expected
    ${'2015-day6'} | ${17836115}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
