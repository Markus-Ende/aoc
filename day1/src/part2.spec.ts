import { readInput } from 'utils';
import { sumOfCalibrationValuesFixed } from './part2';

describe('sumOfCalibrationValues', () => {
  test.each`
    input              | expected
    ${'day1'}          | ${54518}
    ${'day1-example2'} | ${281}
  `('should return $expected for $input input', ({ input, expected }) => {
    const result = sumOfCalibrationValuesFixed(readInput(input));
    expect(result).toEqual(expected);
  });
});
