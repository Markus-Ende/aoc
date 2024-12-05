import { readInput } from 'utils';
import { part1, part2 } from './day5';

describe('day5', () => {
  test.each`
    input                  | expected
    ${'2024-day5-example'} | ${143}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day5'));
    expect(result).toEqual(6612);
  });

  test.each`
    input                  | expected
    ${'2024-day5-example'} | ${123}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('2024-day5'));
    expect(result).toEqual(4944);
  });
});
