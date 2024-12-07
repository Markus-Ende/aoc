import { readInput } from 'utils';
import { part1, part2 } from './day6';

describe('day6', () => {
  test.each`
    input                  | expected
    ${'2024-day6-example'} | ${41}
  `('part1 example $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test('part1', () => {
    const result = part1(readInput('2024-day6'));
    expect(result).toEqual(5153);
  });

  test.each`
    input                         | expected
    ${'2024-day6-example'}        | ${6}
    ${'2024-day6-example-custom'} | ${5}
  `('part2 example $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });

  // FIXME: day 2 not working yet
  test.skip('part2', () => {
    const result = part2(readInput('2024-day6'));
    expect(result).toEqual(undefined);
  });
});
