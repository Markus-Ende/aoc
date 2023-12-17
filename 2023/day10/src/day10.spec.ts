import { readInput } from 'utils';
import { part1, part2 } from './day10';

describe('day10', () => {
  test.each`
    input                     | expected
    ${'2023-day10-example'}   | ${4}
    ${'2023-day10-example-2'} | ${8}
    ${'2023-day10'}           | ${7066}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                     | expected
    ${'2023-day10-example'}   | ${1}
    ${'2023-day10-example-2'} | ${1}
    ${'2023-day10-example-3'} | ${10}
    ${'2023-day10'}           | ${401}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
