import { Graph } from './graph';
import { ObjectMap } from './object-map';
import { ObjectSet } from './object-set';

export function dijkstra<T extends { id: string | number }>(
  graph: Graph<T>,
  start: T,
  /**
   * A function that returns true if the algorithm should stop.
   * Default: stop when all nodes have been visited
   */
  stopCriterion: (visited: ObjectSet<T>) => boolean = (visited) =>
    visited.size >= graph.getNodeCount()
): Map<T, number> {
  const distances = new ObjectMap<T, number>();
  const visited = new ObjectSet<T>();

  // Initialize distances with infinity for all nodes except the start node
  for (const node of graph.nodes) {
    distances.set(node, node.id === start.id ? 0 : Infinity);
  }

  while (!stopCriterion(visited)) {
    let currentNode: T | undefined;
    let minDistance = Infinity;

    // Find the node with the minimum distance among the unvisited nodes
    for (const [node, distance] of distances) {
      if (!visited.has(node) && distance < minDistance) {
        currentNode = node;
        minDistance = distance;
      }
    }

    if (!currentNode) {
      break; // No more reachable nodes
    }

    visited.add(currentNode);

    // Update distances of neighboring nodes
    for (const neighbor of graph.getEdges(currentNode)) {
      const edgeWeight = 1; // Assuming all edges have weight 1
      const totalDistance = minDistance + edgeWeight;

      if (totalDistance < distances.get(neighbor)!) {
        distances.set(neighbor, totalDistance);
      }
    }
  }

  return distances;
}
