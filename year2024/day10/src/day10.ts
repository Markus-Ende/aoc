import { dijkstra, Graph, numberMatrix, sum } from 'utils';

export function part1(input: string): number {
  const map = Graph.fromMatrix(
    numberMatrix(input),
    (from, to) => to.value - from.value === 1
  );
  const startNodes = map.findAllNodes((node) => node.value === 0);
  return sum(
    startNodes.map((node) => {
      const trails = dijkstra(map, node);

      return Array.from(trails.entries()).filter(
        (e) => e[0].value === 9 && e[1] !== Infinity
      ).length;
    })
  );
}

export function part2(input: string): number {
  throw new Error('Not implemented');
}
