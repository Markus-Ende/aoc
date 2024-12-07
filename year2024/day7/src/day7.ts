import { combinationsWithRepeat, lines, sum } from 'utils';

export function part1(input: string): number {
  return executeCalculations(
    input,
    ['+', '*'],
    (operand1: number, operand2: number, op: string) =>
      op === '+' ? operand1 + operand2 : operand1 * operand2
  );
}

function executeCalculations(
  input: string,
  operators: Array<string>,
  calc: (operand1: number, operand2: number, op: string) => number
): number {
  return sum(
    lines(input).map((line) => {
      const [valueString, operatorsString] = line.split(':');
      const value = Number(valueString);
      const operands = operatorsString.trim().split(' ').map(Number);
      const operatorCombinations = combinationsWithRepeat(
        operators,
        operands.length - 1
      );
      const foundCorrectOperators = operatorCombinations.some((operators) => {
        let calculationResult = operands[0];
        operators.forEach(
          (op, i) =>
            (calculationResult = calc(calculationResult, operands[i + 1], op))
        );
        return calculationResult === value;
      });
      return foundCorrectOperators ? value : 0;
    })
  );
}

export function part2(input: string): number {
  return executeCalculations(
    input,
    ['+', '*', '||'],
    (operand1: number, operand2: number, op: string) =>
      op === '+'
        ? operand1 + operand2
        : op === '*'
        ? operand1 * operand2
        : Number(`${operand1}${operand2}`)
  );
}
