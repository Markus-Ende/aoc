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

export function sumOfCalibrationValuesFixed(input: string): number {
  let sum = 0;

  for (const line of input.split('\n')) {
    let lineFromLeft = line;
    for (let i = 0; i < lineFromLeft.length; i++) {
      for (const spelledNumber of spelledNumbers) {
        if (lineFromLeft.startsWith(spelledNumber, i)) {
          lineFromLeft = lineFromLeft.replace(
            spelledNumber,
            `${spelledNumbers.indexOf(spelledNumber) + 1}`
          );
        }
      }
    }
    lineFromLeft = lineFromLeft.replace(/[^\d]/g, '');

    let lineFromRight = line;
    for (let i = lineFromRight.length - 1; i >= 0; i--) {
      for (const spelledNumber of spelledNumbers) {
        if (lineFromRight.startsWith(spelledNumber, i)) {
          lineFromRight = `${lineFromRight.slice(0, i)}${
            spelledNumbers.indexOf(spelledNumber) + 1
          }${lineFromRight.slice(i + spelledNumber.length)}`;
        }
      }
    }
    lineFromRight = lineFromRight.replace(/[^\d]/g, '');

    const numberToAdd = parseInt(
      `${lineFromLeft.at(0)}${lineFromRight.at(-1)}`
    );

    sum += numberToAdd;
  }
  return sum;
}
