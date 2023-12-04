import { readInput } from 'utils';
import { part1, part2 } from './day4';

describe('day4', () => {
  test.each`
    input                  | expected
    ${'2023-day4-example'} | ${13}
    ${'2023-day4'}         | ${15268}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day4-example'} | ${30}
    ${'2023-day4'}         | ${6283755}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
