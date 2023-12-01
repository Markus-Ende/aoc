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
  spelledNumber.split('').reverse().join('')
);

export function sumOfCalibrationValuesFixed(input: string): number {
  let sum = 0;

  for (const line of input.split('\n')) {
    const firstNumberLeftMatch = line.match(
      /one|two|three|four|five|six|seven|eight|nine|\d/
    )?.[0];
    const firstNumberLeft = spelledNumbers.includes(firstNumberLeftMatch)
      ? spelledNumbers.indexOf(firstNumberLeftMatch) + 1
      : parseInt(firstNumberLeftMatch);

    const firstNumberRightMatch = line
      .split('')
      .reverse()
      .join('')
      .match(/eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|\d/)?.[0];
    const firstNumberRight = spelledNumbersReversed.includes(
      firstNumberRightMatch
    )
      ? spelledNumbersReversed.indexOf(firstNumberRightMatch) + 1
      : parseInt(firstNumberRightMatch);

    sum += firstNumberLeft * 10 + firstNumberRight;
  }

  return sum;
}
