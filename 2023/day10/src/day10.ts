import { Graph, Matrix, arr, dijkstra, length } from 'utils';
import * as fs from 'fs';

type Char = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S';

function parseInput(input: string) {
  const matrix = new Matrix<Char>(input).pad('.');
  const graph = Graph.fromMatrix(matrix, (from, to) => {
    if (from.value === '.' || to.value === '.') {
      return false;
    }
    switch (from.value) {
      case 'S':
        return true;
      case '|':
        return (
          from.x === to.x &&
          // from is above
          (from.y === to.y - 1 /* && ['|', 'J', 'L'].includes(to.value) */ ||
            // from is below
            from.y === to.y + 1) /* && ['|', 'F', '7'].includes(to.value) */
        );
      case '-':
        return (
          from.y === to.y &&
          // from is left
          (from.x === to.x - 1 /* && ['-', '7', 'J'].includes(to.value) */ ||
            // from is right
            from.x === to.x + 1) /* && ['-', 'F', 'L'].includes(to.value) */
        );
      case 'L':
        return (
          // L is under
          (from.x === to.x && from.y === to.y + 1) /* &&
            ['|', '7', 'F'].includes(to.value) */ ||
          // L is left
          (from.x === to.x - 1 && from.y === to.y) /* &&
            ['-', '7', 'J'].includes(to.value) */
        );
      case 'J':
        return (
          // J is right
          (from.x === to.x + 1 && from.y === to.y) /* &&
            ['-', 'L', 'F'].includes(to.value) */ ||
          // J is under
          (from.x === to.x && from.y === to.y + 1) /* &&
            ['|', '7', 'F'].includes(to.value) */
        );
      case '7':
        return (
          // 7 is right
          (from.x === to.x + 1 && from.y === to.y) /* &&
            ['-', 'L', 'F'].includes(to.value) */ ||
          // 7 is above
          (from.x === to.x && from.y === to.y - 1) /* &&
            ['|', 'L', 'J'].includes(to.value) */
        );
      case 'F':
        return (
          // F is left
          (from.x === to.x - 1 && from.y === to.y) /* &&
            ['-', 'J', '7'].includes(to.value) */ ||
          // F is above
          (from.x === to.x && from.y === to.y - 1) /* &&
            ['|', 'L', 'J'].includes(to.value) */
        );
      default:
        return false;
    }
  });
  return { graph, matrix };
}

export function part1(input: string): number {
  const { graph, matrix } = parseInput(input);
  const start = graph.findNode((node) => node.value === 'S')!;
  // console.log(graph, start);

  const distances = dijkstra(graph, start);
  // console.log(distances);

  matrix.replace((value, x, y) => {
    const node = distances.get({ id: `(${x},${y}):${value}` } as any);
    return node === Infinity ? '.' : value;
  });
  // console.log(matrix.toString());

  fs.writeFileSync(
    '/home/markus/work/code/private/aoc/aoc/2023/day10/src/day10output.txt',
    matrix.unpad().toString()
  ); // Write matrix to file

  const relevantNodes = Array.from(
    distances.entries()
  ); /* .filter(([k, v]) => {
    if (v === Infinity) {
      return false;
    }
    const incomingEdges = arr(graph.getIncomingEdges(k));
    // console.log(
    //   'relevantNodes',
    //   k,
    //   v,
    //   'incomingEdges.',
    //   arr(incomingEdges),
    //   length(incomingEdges)
    // );
    return (
      length(incomingEdges) === 2 &&
      arr(incomingEdges).every((e) => distances.get(e) === v - 1)
    );
  }); */
  // console.log(' complete', relevantNodes);
  const maxDistance = Math.max(
    ...relevantNodes.map(([, v]) => (v === Infinity ? -1 : v))
  );

  arr(distances.entries()).find(([k, v]) => {
    if (v === maxDistance) {
      console.log(k, v);
      return true;
    }
    return false;
  });

  return maxDistance;
}

export function part2(input: string): number {
  throw new Error('Not implemented');
}
