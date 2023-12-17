import { add, isNumber, rowSize, sum } from 'utils';

function parseMap(
  input: string,
  numberAndSymbolRegex: RegExp
): {
  rowSize: number;
  numbers: { index: number; value: string }[];
  symbols: { index: number; value: string }[];
} {
  const numbers: { index: number; value: string }[] = [];
  const symbols: { index: number; value: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = numberAndSymbolRegex.exec(input))) {
    if (isNumber(match[0])) {
      numbers.push({ index: match.index, value: match[0] });
    } else {
      symbols.push({ index: match.index, value: match[0] });
    }
  }
  return { rowSize: rowSize(input) + 1, numbers, symbols };
}
export function part1(input: string): number {
  const numberOrAnySymbol = /\b\d+\b|[^\d.\s]/g;
  const { rowSize, numbers, symbols } = parseMap(input, numberOrAnySymbol);

  const filteredNumbers = numbers.filter((n) => {
    const adjacentIndices = calculateAdjacentIndicesOfNumber(n, rowSize);
    return symbols.some((symbol) => adjacentIndices.has(symbol.index));
  });

  return sum(filteredNumbers);
}

function calculateAdjacentIndicesOfNumber(
  n: { index: number; value: string },
  rowSize: number
) {
  const adjacentIndices = new Set<number>();

  for (let i = n.index; i < n.index + n.value.length; i++) {
    const adjacentIndicesOfSingleLetter = [
      i - rowSize - 1,
      i - rowSize,
      i - rowSize + 1,
      i - 1,
      i + 1,
      i + rowSize - 1,
      i + rowSize,
      i + rowSize + 1,
    ];
    adjacentIndicesOfSingleLetter.forEach((index) =>
      adjacentIndices.add(index)
    );
  }
  return adjacentIndices;
}

export function part2(input: string): number {
  const numberOrAsterisk = /\b\d+\b|\*/g;
  const { rowSize, numbers, symbols } = parseMap(input, numberOrAsterisk);

  const potentialGears = new Map<number, number[]>();

  numbers.forEach((n) => {
    const adjacentIndices = calculateAdjacentIndicesOfNumber(n, rowSize);

    const maybeAsterisk = symbols.find((symbol) =>
      adjacentIndices.has(symbol.index)
    );

    if (maybeAsterisk) {
      add(maybeAsterisk.index, parseInt(n.value), potentialGears);
    }
  });

  let sumOfRatios = 0;
  potentialGears.forEach((values) => {
    if (values.length != 2) {
      return;
    }
    sumOfRatios += values[0] * values[1];
  });
  return sumOfRatios;
}
