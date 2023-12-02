import { readInput } from 'utils';
import { part1, part2 } from './day{{day}}';

describe('day{{day}}', () => {
  test.each`
    input                    | expected
    ${'{{year}}-day{{day}}'} | ${undefined}
  `('part1', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                    | expected
    ${'{{year}}-day{{day}}'} | ${undefined}
  `('part2', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
