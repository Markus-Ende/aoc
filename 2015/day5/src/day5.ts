import { lines } from 'utils';

export function isNice(input: string): boolean {
  const threeVovels = /[aeiou].*[aeiou].*[aeiou]/i;
  const twoSameLettersInRow = /([a-zA-Z])\1/i;
  const forbiddenStrings = /(ab|cd|pq|xy)/i;
  return (
    threeVovels.test(input) &&
    twoSameLettersInRow.test(input) &&
    !forbiddenStrings.test(input)
  );
}

export function part1(input: string): number {
  return lines(input).filter(isNice).length;
}

export function isNice2(input: string): boolean {
  const pairOfLetters = /([a-zA-Z]{2}).*\1/i;
  const repeatedLetterWithOneBetween = /([a-zA-Z]).\1/i;

  return pairOfLetters.test(input) && repeatedLetterWithOneBetween.test(input);
}

export function part2(input: string): number {
  return lines(input).filter(isNice2).length;
}
