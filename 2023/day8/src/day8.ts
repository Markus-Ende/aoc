import { chars, lcm, lines } from 'utils';

interface Input {
  instructions: ('L' | 'R')[];
  graph: Map<string, Node>;
}

interface Node {
  value: string;
  L: string;
  R: string;
}

function parseInput(input: string): Input {
  const [rlLine, , ...nodeLines] = lines(input);

  const instructions = chars(rlLine) as ('L' | 'R')[];
  const graph = new Map<string, Node>();

  for (const line of nodeLines) {
    const [, value, L, R] = line.match(/(\w+) = \((\w+), (\w+)\)/)!;
    graph.set(value, { value, L, R });
  }
  return { instructions, graph };
}

export function part1(inputRaw: string): number {
  const input = parseInput(inputRaw);

  return calculateSteps(
    input,
    input.graph.get('AAA')!,
    (node) => node.value === 'ZZZ'
  );
}

/**
 * @deprecated too slow
 * @param input
 * @returns
 */
export function part2_naive(input: string): number {
  const graph = parseInput(input);

  const startingNodes = Array.from(graph.graph.entries())
    .filter(([, node]) => node.value.endsWith('A'))
    .map(([, node]) => node);

  let currentNodes = startingNodes;
  let count = 0;

  while (!currentNodes.every((node) => node.value.endsWith('Z'))) {
    for (const instruction of graph.instructions) {
      currentNodes = currentNodes.map(
        (node) => graph.graph.get(node[instruction])!
      );

      count++;
    }
  }
  return count;
}

function calculateSteps(
  input: Input,
  startingNode: Node,
  finishPredicate: (node: Node) => boolean
): number {
  let currentNode = startingNode;
  let count = 0;
  while (!finishPredicate(currentNode)) {
    for (const instruction of input.instructions) {
      currentNode = input.graph.get(currentNode[instruction])!;

      count++;
    }
  }
  return count;
}

export function part2(inputRaw: string): number {
  const input = parseInput(inputRaw);

  const startingNodes = Array.from(input.graph.entries())
    .filter(([, node]) => node.value.endsWith('A'))
    .map(([, node]) => node);

  const times = startingNodes.map((node) =>
    calculateSteps(input, node, (node) => node.value.endsWith('Z'))
  );

  return lcm(times);
}
