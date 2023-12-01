import { lines, reverse } from 'utils';

const spelledNumbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const spelledNumbersReversed = spelledNumbers.map((spelledNumber) =>
  reverse(spelledNumber)
);

export function sumOfCalibrationValuesFixed(input: string): number {
  let sum = 0;

  for (const line of lines(input)) {
    const firstNumberLeftMatch = line.match(
      /one|two|three|four|five|six|seven|eight|nine|\d/
    )?.[0];
    const firstNumberLeft = spelledNumbers.includes(firstNumberLeftMatch)
      ? spelledNumbers.indexOf(firstNumberLeftMatch) + 1
      : parseInt(firstNumberLeftMatch);

    const firstNumberRightMatch = reverse(line).match(
      /eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/
    )?.[0];
    const firstNumberRight = spelledNumbersReversed.includes(
      firstNumberRightMatch
    )
      ? spelledNumbersReversed.indexOf(firstNumberRightMatch) + 1
      : parseInt(firstNumberRightMatch);

    sum += firstNumberLeft * 10 + firstNumberRight;
  }
  return sum;
}
