import { readInput } from 'utils';
import { part1, part2 } from './day10';

describe('day10', () => {
  test.each`
    input                     | expected
    ${'2024-day10-example'}   | ${1}
    ${'2024-day10-example-2'} | ${2}
    ${'2024-day10-example-3'} | ${4}
    ${'2024-day10-example-4'} | ${3}
    ${'2024-day10-example-5'} | ${36}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day10'));
    expect(result).toEqual(557);
  });

  test.skip.each`
    input                   | expected
    ${'2024-day10-example'} | ${undefined}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test.skip('part2', () => {
    const result = part2(readInput('2024-day10'));
    expect(result).toEqual(undefined);
  });
});
