import * as fs from 'node:fs';
import { sumOfCalibrationValues } from './part1';
import { sumOfCalibrationValuesFixed } from './part2';
import { assert } from 'node:console';

const input = fs.readFileSync('./puzzleinput/day1.txt', 'utf8');

const solutionPart1 = sumOfCalibrationValues(input);
assert(solutionPart1 === 54331);
console.log(`day 01 - part 1: ${solutionPart1}`);

const solutionPart2 = sumOfCalibrationValuesFixed(input);
assert(solutionPart2 === 54518);
console.log(`day 01 - part 2: ${solutionPart2}`);
