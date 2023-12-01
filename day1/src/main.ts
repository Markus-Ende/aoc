import { sumOfCalibrationValues } from './part1';
import { sumOfCalibrationValuesFixed } from './part2';
import { assert } from 'node:console';
import { readInput } from 'utils';

const input = readInput('day1');

const solutionPart1 = sumOfCalibrationValues(input);
assert(solutionPart1 === 54331);
console.log(`day 01 - part 1: ${solutionPart1}`);

const solutionPart2 = sumOfCalibrationValuesFixed(input);
assert(solutionPart2 === 54518);
console.log(`day 01 - part 2: ${solutionPart2}`);
