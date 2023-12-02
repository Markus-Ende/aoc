import { part1, part2 } from './day4';

describe('day4', () => {
  test.each`
    input         | expected
    ${'abcdef'}   | ${609043}
    ${'ckczppom'} | ${117946}
  `('part1', ({ input, expected }) => {
    const result = part1(input);
    expect(result).toEqual(expected);
  });

  test.each`
    input         | expected
    ${'ckczppom'} | ${3938038}
  `('part2', ({ input, expected }) => {
    const result = part2(input);
    expect(result).toEqual(expected);
  });
});
