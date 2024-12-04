import { readInput } from 'utils';
import { part1, part2 } from './day4';

describe('day4', () => {
  test.each`
    input                  | expected
    ${'2024-day4-example'} | ${18}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day4'));
    expect(result).toEqual(2462);
  });

  test.each`
    input                  | expected
    ${'2024-day4-example'} | ${9}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('2024-day4'));
    expect(result).toEqual(1877);
  });
});
