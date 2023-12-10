import { lines, sum, words } from 'utils';

export function part1(input: string): number {
  return sum(
    lines(input).map((line) => {
      const valuesStack: number[][] = [words(line).map(Number)];

      while (valuesStack.at(-1)!.some((n) => n !== 0)) {
        const currentNumbers = valuesStack.at(-1)!;
        const differences: number[] = [];
        for (let i = 1; i < currentNumbers.length; i++) {
          differences.push(currentNumbers[i] - currentNumbers[i - 1]);
        }
        valuesStack.push(differences);
      }

      let extrapolated = 0;
      for (let i = valuesStack.length - 2; i >= 0; i--) {
        extrapolated += valuesStack[i].at(-1)!;
      }

      return extrapolated;
    })
  );
}

export function part2(input: string): number {
  return sum(
    lines(input).map((line) => {
      const valuesStack: number[][] = [words(line).map(Number)];
      while (valuesStack.at(-1)!.some((n) => n !== 0)) {
        const currentNumbers = valuesStack.at(-1)!;
        const differences: number[] = [];
        for (let i = 1; i < currentNumbers.length; i++) {
          differences.push(currentNumbers[i] - currentNumbers[i - 1]);
        }
        valuesStack.push(differences);
      }

      let extrapolated = 0;
      for (let i = valuesStack.length - 2; i >= 0; i--) {
        extrapolated = valuesStack[i].at(0)! - extrapolated;
      }

      return extrapolated;
    })
  );
}
