import { readInput } from 'utils';
import { part1, part2 } from './day{{day}}';

describe('day{{day}}', () => {
  test.each`
    input                            | expected
    ${'{{year}}-day{{day}}-example'} | ${undefined}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('{{year}}-day{{day}}'));
    expect(result).toEqual(undefined);
  });

  test.each`
    input                            | expected
    ${'{{year}}-day{{day}}-example'} | ${undefined}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part2', () => {
    const result = part2(readInput('{{year}}-day{{day}}'));
    expect(result).toEqual(undefined);
  });
});
