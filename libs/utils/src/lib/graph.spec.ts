import { Graph } from './graph';
import { Matrix, Entry } from './matrix';

describe('Graph', () => {
  let graph: Graph<{ id: string }>;

  beforeEach(() => {
    graph = new Graph<{ id: string }>();
  });

  test('addEdge should add an edge between two nodes', () => {
    const from = { id: 'Node A' };
    const to = { id: 'Node B' };

    graph.addEdge(from, to);

    expect(graph.hasEdge(from, to)).toBe(true);
    expect(graph.hasEdge(to, from)).toBe(false); // not bidirectional
  });

  test('addEdge should create new nodes if they do not exist', () => {
    const from = { id: 'Node A' };
    const to = { id: 'Node B' };

    graph.addEdge(from, to);

    expect(graph.hasNode(from)).toBe(true);
    expect(graph.hasNode(to)).toBe(true);
  });

  test('fromMatrix should create a graph from a matrix using the provided edge predicate', () => {
    const matrix: Matrix<number> = new Matrix('12\n34', Number);

    const edgePredicate = (from: Entry<number>, to: Entry<number>) => {
      return from.x === 0 && from.y === 0 && to.x === 0 && to.y === 1;
    };

    const expectedGraph = new Graph<{
      id: string;
      value: number;
      x: number;
      y: number;
    }>();
    expectedGraph.addEdge(
      { id: '(0,0):1', value: 1, x: 0, y: 0 },
      { id: '(0,1):3', value: 3, x: 0, y: 1 }
    );

    const result = Graph.fromMatrix(matrix, edgePredicate);
    expect(result).toEqual(expectedGraph);
  });
});

test('getEdges should return an iterable of edges from a given node', () => {
  const graph = new Graph<{ id: string }>();
  const nodeA = { id: 'Node A' };
  const nodeB = { id: 'Node B' };
  const nodeC = { id: 'Node C' };

  graph.addEdge(nodeA, nodeB);
  graph.addEdge(nodeA, nodeC);

  const edges = graph.getEdges(nodeA);

  expect(Array.from(edges)).toEqual([nodeB, nodeC]);
});

test('getEdges should return an empty iterable if the node does not exist', () => {
  const graph = new Graph<{ id: string }>();
  const nodeA = { id: 'Node A' };

  const edges = graph.getEdges(nodeA);

  expect(Array.from(edges)).toEqual([]);
});
test('getIncomingEdges should return an iterable of incoming edges to a given node', () => {
  const graph = new Graph<{ id: string }>();
  const nodeA = { id: 'Node A' };
  const nodeB = { id: 'Node B' };
  const nodeC = { id: 'Node C' };

  graph.addEdge(nodeA, nodeB);
  graph.addEdge(nodeC, nodeA);

  const incomingEdges = graph.getIncomingEdges(nodeA);

  expect(Array.from(incomingEdges)).toEqual([nodeC]);
});

test('getIncomingEdges should return an empty iterable if there are no incoming edges to the node', () => {
  const graph = new Graph<{ id: string }>();
  const nodeA = { id: 'Node A' };
  const nodeB = { id: 'Node B' };

  graph.addEdge(nodeA, nodeB);

  const incomingEdges = graph.getIncomingEdges(nodeA);

  expect(Array.from(incomingEdges)).toEqual([]);
});

test('getIncomingEdges should return an empty iterable if the node does not exist', () => {
  const graph = new Graph<{ id: string }>();
  const nodeA = { id: 'Node A' };

  const incomingEdges = graph.getIncomingEdges(nodeA);

  expect(Array.from(incomingEdges)).toEqual([]);
});
