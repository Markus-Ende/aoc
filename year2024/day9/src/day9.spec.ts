import { readInput } from 'utils';
import { part1, part2 } from './day9';

describe('day9', () => {
  test.each`
    input                  | expected
    ${'2024-day9-example'} | ${1928}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day9'));
    expect(result).toEqual(6446899523367);
  });

  test.each`
    input                  | expected
    ${'2024-day9-example'} | ${2858}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test.skip('part2', () => {
    const result = part2(readInput('2024-day9'));
    expect(result).toEqual(undefined);
  });
});
