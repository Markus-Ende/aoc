import { dijkstra } from './dijkstra';
import { Graph } from './graph';
import { ObjectSet } from './object-set';

describe('dijkstra', () => {
  const graph = new Graph<{ id: string }>();
  graph.addEdge({ id: 'A' }, { id: 'B' });
  graph.addEdge({ id: 'A' }, { id: 'C' });
  graph.addEdge({ id: 'B' }, { id: 'C' });
  graph.addEdge({ id: 'B' }, { id: 'D' });
  graph.addEdge({ id: 'C' }, { id: 'D' });
  graph.addEdge({ id: 'C' }, { id: 'E' });
  graph.addEdge({ id: 'D' }, { id: 'E' });

  it('should find the shortest distances from the start node', () => {
    const startNode = { id: 'A' };
    const distances = dijkstra(graph, startNode);

    expect(distances.get({ id: 'A' })).toBe(0);
    expect(distances.get({ id: 'B' })).toBe(1);
    expect(distances.get({ id: 'C' })).toBe(1);
    expect(distances.get({ id: 'D' })).toBe(2);
    expect(distances.get({ id: 'E' })).toBe(2);
  });

  it('should stop when the stop criterion is met', () => {
    const startNode = { id: 'A' };
    const stopCriterion = (visited: ObjectSet<{ id: string }>) =>
      visited.size >= 1; // Stop when more than 1 node has been visited
    const distances = dijkstra(graph, startNode, stopCriterion);

    expect(distances.get({ id: 'A' })).toBe(0);
    expect(distances.get({ id: 'B' })).toBe(1);
    expect(distances.get({ id: 'C' })).toBe(1);
    expect(distances.get({ id: 'D' })).toBe(Infinity); // Node D should not be visited
    expect(distances.get({ id: 'E' })).toBe(Infinity); // Node E should not be visited
  });
});
