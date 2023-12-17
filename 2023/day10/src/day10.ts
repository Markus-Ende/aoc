import { Matrix, NeighborEntry } from 'utils';
import fs from 'fs';
import path from 'path';

type Char = '│' | '─' | '└' | '┘' | '┐' | '┌' | '.' | 'S';

function parseInput(input: string) {
  const charMapping: Record<string, Char> = {
    '|': '│',
    '-': '─',
    L: '└',
    J: '┘',
    '7': '┐',
    F: '┌',
    S: 'S',
    '.': '.',
  };
  return new Matrix(input, (char) => charMapping[char]!).pad('.');
}

export function part1(input: string): number {
  const { matrix, loop, count } = detectMainLoop(input);

  writeLoopToFile(matrix, loop);

  return Math.floor(count / 2);
}

export function part2(input: string): number {
  const { matrix, loop } = detectMainLoop(input, true);

  const innerSet = new Set<`${number},${number}`>();
  loop.forEach((entry) => {
    // line goes up -> add right │III
    if (entry.dx === 0 && entry.dy === -1) {
      for (let x = entry.x + 1; x < matrix.rowSize; x++) {
        if (loop.find((node) => node.x === x && node.y === entry.y)) {
          break;
        }
        innerSet.add(`${x},${entry.y}`);
      }
    }
    // line goes down -> add left III│
    if (entry.dx === 0 && entry.dy === 1) {
      for (let x = entry.x - 1; x >= 0; x--) {
        if (loop.find((node) => node.x === x && node.y === entry.y)) {
          break;
        }
        innerSet.add(`${x},${entry.y}`);
      }
    }
    //                          I
    //                          I
    // line goes left -> add up ─
    if (entry.dx === -1 && entry.dy === 0) {
      for (let y = entry.y - 1; y >= 0; y--) {
        if (loop.find((node) => node.x === entry.x && node.y === y)) {
          break;
        }
        innerSet.add(`${entry.x},${y}`);
      }
    }
    // line goes right -> add down ─
    //                             I
    //                             I
    if (
      (entry.dx === 1 && entry.dy === 0) ||
      (entry.value === '└' && entry.dx === 0 && entry.dy === 1)
    ) {
      for (let y = entry.y + 1; y < matrix.columnSize; y++) {
        if (loop.find((node) => node.x === entry.x && node.y === y)) {
          break;
        }
        innerSet.add(`${entry.x},${y}`);
      }
    }
  });

  writeLoopToFile(matrix, loop, innerSet);
  return innerSet.size;
}

function writeLoopToFile(
  matrix: Matrix<Char>,
  loop: NeighborEntry<Char>[],
  innerSet?: Set<`${number},${number}`>
) {
  const printMatrix = (matrix.clone() as Matrix<string>).replace(() => ' ');
  loop.forEach((entry) => printMatrix.set(entry.x, entry.y, entry.value));
  if (innerSet) {
    for (const entry of innerSet) {
      const [x, y] = entry.split(',');
      printMatrix.set(+x, +y, 'I');
    }
  }
  fs.writeFileSync(
    path.join(__dirname, 'day10output.txt'),
    printMatrix.unpad().toString()
  );
}

function detectMainLoop(input: string, reverseSearchForFirstNeighbor = false) {
  const matrix = parseInput(input);
  const loop: NeighborEntry<Char>[] = [];

  let last = matrix.find((value) => value === 'S')!;
  let current = matrix.findNeighbor(
    last,
    (next) =>
      (last.x > next.x &&
        last.y === next.y &&
        ['─', '┌', '└'].includes(next.value)) ||
      (last.x < next.x &&
        last.y === next.y &&
        ['─', '┘', '┐'].includes(next.value)) ||
      (last.x === next.x &&
        last.y > next.y &&
        ['│', '┌', '┐'].includes(next.value)) ||
      (last.x === next.x &&
        last.y < next.y &&
        ['│', '└', '┘'].includes(next.value)),
    reverseSearchForFirstNeighbor
  )!;

  let count = 1;
  while (last.value !== 'S' || loop.length === 0) {
    loop.push(current);
    count++;
    const currentCopy = current;
    switch (current.value) {
      case '│':
        current = {
          ...matrix.getEntry(
            current.x,
            last.y < current.y ? current.y + 1 : current.y - 1
          ),
          dx: 0,
          dy: last.y < current.y ? 1 : -1,
        };
        break;

      case '─':
        current = {
          ...matrix.getEntry(
            last.x < current.x ? current.x + 1 : current.x - 1,
            current.y
          ),
          dx: last.x < current.x ? 1 : -1,
          dy: 0,
        };
        break;

      case '└':
        current = {
          ...matrix.getEntry(
            last.x > current.x ? current.x : current.x + 1,
            last.x > current.x ? current.y - 1 : current.y
          ),
          dx: last.x > current.x ? 0 : 1,
          dy: last.x > current.x ? -1 : 0,
        };
        break;

      case '┘':
        current = {
          ...matrix.getEntry(
            last.x < current.x ? current.x : current.x - 1,
            last.x < current.x ? current.y - 1 : current.y
          ),
          dx: last.x < current.x ? 0 : -1,
          dy: last.x < current.x ? -1 : 0,
        };
        break;

      case '┐':
        current = {
          ...matrix.getEntry(
            last.x < current.x ? current.x : current.x - 1,
            last.x < current.x ? current.y + 1 : current.y
          ),
          dx: last.x < current.x ? 0 : -1,
          dy: last.x < current.x ? 1 : 0,
        };
        break;

      case '┌':
        current = {
          ...matrix.getEntry(
            last.x > current.x ? current.x : current.x + 1,
            last.x > current.x ? current.y + 1 : current.y
          ),
          dx: last.x > current.x ? 0 : 1,
          dy: last.x > current.x ? 1 : 0,
        };
        break;
      case 'S':
        break;
      default:
        throw new Error('should not reach:' + current.value);
    }
    last = currentCopy;
  }

  return { matrix, count, loop };
}
