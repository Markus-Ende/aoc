import { readInput } from 'utils';
import { part1, part2 } from './day7';

describe('day7', () => {
  test.each`
    input                  | expected
    ${'2024-day7-example'} | ${3749}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day7'));
    expect(result).toEqual(7885693428401);
  });

  test.each`
    input                  | expected
    ${'2024-day7-example'} | ${11387}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('2024-day7'));
    expect(result).toEqual(348360680516005);
  });
});
