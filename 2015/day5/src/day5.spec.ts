import { readInput } from 'utils';
import { isNice, isNice2, part1, part2 } from './day5';

describe('day5', () => {
  test.each`
    input                 | expected
    ${'ugknbfddgicrmopn'} | ${true}
    ${'aaa'}              | ${true}
    ${'aaab'}             | ${false}
    ${''}                 | ${false}
    ${'jchzalrnumimnmhp'} | ${false}
    ${'haegwjzuvuyypxyu'} | ${false}
    ${'dvszwmarrgswjxmb'} | ${false}
  `('isNice $input $expected', ({ input, expected }) => {
    const result = isNice(input);
    expect(result).toEqual(expected);
  });

  test.each`
    input          | expected
    ${'2015-day5'} | ${258}
  `('part1', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                 | expected
    ${'qjhvhtzxzqqjkmpb'} | ${true}
    ${'xxyxx'}            | ${true}
    ${'uurcxstgmygtbstg'} | ${false}
    ${'ieodomkazucvgmuy'} | ${false}
  `('isNice2 $input $expected', ({ input, expected }) => {
    const result = isNice2(input);
    expect(result).toEqual(expected);
  });

  test.each`
    input          | expected
    ${'2015-day5'} | ${53}
  `('part2', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
