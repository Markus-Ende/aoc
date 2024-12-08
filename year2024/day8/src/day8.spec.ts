import { readInput } from 'utils';
import { part1, part2 } from './day8';

describe('day8', () => {
  test.each`
    input                  | expected
    ${'2024-day8-example'} | ${14}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day8'));
    expect(result).toEqual(265);
  });

  test.each`
    input                  | expected
    ${'2024-day8-example'} | ${34}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('2024-day8'));
    expect(result).toEqual(962);
  });
});
