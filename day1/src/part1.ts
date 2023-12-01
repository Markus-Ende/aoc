import { lines } from 'utils';

export function sumOfCalibrationValues(input: string): number {
  let sum = 0;
  const inputWithoutLetters = input.replace(/[^\d\n]/g, '');
  for (const line of lines(inputWithoutLetters)) {
    const number = parseInt(`${line.at(0)}${line.at(-1)}`, 10);
    sum += number;
  }
  return sum;
}
