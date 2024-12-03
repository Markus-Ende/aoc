import { readInput } from 'utils';
import { part1, part2 } from './day3';

describe('day3', () => {
  test.each`
    input                  | expected
    ${'2024-day3-example'} | ${161}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day3'));
    expect(result).toEqual(184122457);
  });

  test.each`
    input                   | expected
    ${'2024-day3-example'}  | ${48}
    ${'2024-day3-example2'} | ${56}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('2024-day3'));
    expect(result).toEqual(107862689);
  });
});
