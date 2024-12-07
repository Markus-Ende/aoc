import { combinationsWithRepeat, lines, sum } from 'utils';

export function part1(input: string): number {
  return sum(
    lines(input).map((line) => {
      const [valueString, operatorsString] = line.split(':');
      const value = Number(valueString);
      const operands = operatorsString.trim().split(' ').map(Number);
      const operatorCombinations = combinationsWithRepeat(
        ['+', '*'],
        operands.length - 1
      );
      // console.log(value, operands, operatorCombinations);

      const foundCorrectOperators = operatorCombinations.some((operators) => {
        let calculationResult = operands[0];
        operators.forEach(
          (op, i) =>
            (calculationResult =
              op === '+'
                ? calculationResult + operands[i + 1]
                : calculationResult * operands[i + 1])
        );
        // console.log('test', operators, calculationResult);
        return calculationResult === value;
      });
      return foundCorrectOperators ? value : 0;
    })
  );
}

export function part2(input: string): number {
  return sum(
    lines(input).map((line) => {
      const [valueString, operatorsString] = line.split(':');
      const value = Number(valueString);
      const operands = operatorsString.trim().split(' ').map(Number);
      const operatorCombinations = combinationsWithRepeat(
        ['+', '*', '||'],
        operands.length - 1
      );
      // console.log(value, operands, operatorCombinations);

      const foundCorrectOperators = operatorCombinations.some((operators) => {
        let calculationResult = operands[0];
        operators.forEach(
          (op, i) =>
            (calculationResult =
              op === '+'
                ? calculationResult + operands[i + 1]
                : op === '*'
                ? calculationResult * operands[i + 1]
                : // ||
                  Number(`${calculationResult}${operands[i + 1]}`))
        );
        // console.log('test', operators, calculationResult);
        return calculationResult === value;
      });
      return foundCorrectOperators ? value : 0;
    })
  );
}
