import { readInput } from 'utils';
import { sumOfCalibrationValues } from './part1';

describe('sumOfCalibrationValues', () => {
  test.each`
    input              | expected
    ${'day1'}          | ${54331}
    ${'day1-example1'} | ${142}
  `('should return $expected for $input input', ({ input, expected }) => {
    const result = sumOfCalibrationValues(readInput(input));
    expect(result).toEqual(expected);
  });
});
