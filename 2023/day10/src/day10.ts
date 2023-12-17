import { Matrix } from 'utils';

type Char = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';

function parseInput(input: string) {
  return new Matrix<Char>(input).pad('.');
}

export function part1(input: string): number {
  const matrix = parseInput(input);
  const printMatrix = (matrix as Matrix<string>)
    .clone()
    .replace((value) => (value !== 'S' ? ' ' : 'S'));

  let last = matrix.find((value) => value === 'S')!;
  let current = matrix.findNeighbor(
    last,
    (next) =>
      (last.x > next.x &&
        last.y === next.y &&
        ['-', 'F', 'L'].includes(next.value)) ||
      (last.x < next.x &&
        last.y === next.y &&
        ['-', 'J', '7'].includes(next.value)) ||
      (last.x === next.x &&
        last.y > next.y &&
        ['|', 'F', '7'].includes(next.value)) ||
      (last.x === next.x &&
        last.y < next.y &&
        ['|', 'L', 'J'].includes(next.value))
  )!;

  let count = 1;
  while (current.value !== 'S') {
    printMatrix.set(current.x, current.y, current.value);
    count++;
    const currentCopy = current;
    switch (current.value) {
      case '|':
        current = matrix.getEntry(
          current.x,
          last.y < current.y ? current.y + 1 : current.y - 1
        );
        break;

      case '-':
        current = matrix.getEntry(
          last.x < current.x ? current.x + 1 : current.x - 1,
          current.y
        );
        break;

      case 'L':
        current = matrix.getEntry(
          last.x > current.x ? current.x : current.x + 1,
          last.x > current.x ? current.y - 1 : current.y
        );
        break;

      case 'J':
        current = matrix.getEntry(
          last.x < current.x ? current.x : current.x - 1,
          last.x < current.x ? current.y - 1 : current.y
        );
        break;

      case '7':
        current = matrix.getEntry(
          last.x < current.x ? current.x : current.x - 1,
          last.x < current.x ? current.y + 1 : current.y
        );
        break;

      case 'F':
        current = matrix.getEntry(
          last.x > current.x ? current.x : current.x + 1,
          last.x > current.x ? current.y + 1 : current.y
        );
        break;

      default:
        throw new Error('should not reach');
    }
    last = currentCopy;
  }

  const renderMap = {
    '|': '│',
    '-': '─',
    L: '└',
    J: '┘',
    '7': '┐',
    F: '┌',
    S: 'S',
    ' ': ' ',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  printMatrix.replace((value) => (renderMap as any)[value] as any);
  // fs.writeFileSync('./day10output.txt', printMatrix.unpad().toString()); // Write matrix to file

  return count / 2;
}

export function part2(input: string): number {
  throw new Error('Not implemented');
}
