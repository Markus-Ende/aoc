import { Entry, Matrix } from './matrix';
import { ObjectMap } from './object-map';
import { ObjectSet } from './object-set';

export class Graph<T extends { id: string | number }> {
  private _nodes = new ObjectMap<T, ObjectSet<T>>();

  static fromMatrix<T>(
    matrix: Matrix<T>,
    edgePredicate: (from: Entry<T>, to: Entry<T>) => boolean
  ): Graph<{ id: `(${number},${number}):${string}` } & Entry<T>> {
    const graph = new Graph<{
      id: `(${number},${number}):${string}`;
      value: T;
      x: number;
      y: number;
    }>();
    for (let y = 0; y < matrix.columnSize; y++) {
      for (let x = 0; x < matrix.rowSize; x++) {
        const value = matrix.get(x, y);
        for (const neighbor of matrix.getNeighbors(x, y)) {
          if (edgePredicate({ value, x, y }, neighbor)) {
            graph.addEdge(
              { id: `(${x},${y}):${value}`, value, x, y },
              {
                id: `(${neighbor.x},${neighbor.y}):${neighbor.value}`,
                value: neighbor.value,
                x: neighbor.x,
                y: neighbor.y,
              }
            );
          }
        }
      }
    }
    return graph;
  }

  findNode(predicate: (node: T) => boolean): T | undefined {
    for (const node of this._nodes.keys()) {
      if (predicate(node)) {
        return node;
      }
    }
    return undefined;
  }

  findAllNodes(predicate: (node: T) => boolean): T[] {
    return Array.from(this._nodes.keys()).filter(predicate);
  }

  addEdge(from: T, to: T): void {
    if (!this._nodes.has(from)) {
      this._nodes.set(from, new ObjectSet<T>());
    }
    if (!this._nodes.has(to)) {
      this._nodes.set(to, new ObjectSet<T>());
    }
    this._nodes.get(from)?.add(to);
  }

  hasEdge(from: T, to: T): boolean {
    return this._nodes.get(from)?.has(to) ?? false;
  }

  get nodes(): IterableIterator<T> {
    return this._nodes.keys();
  }

  hasNode(node: T): boolean {
    return this._nodes.has(node);
  }

  get edges(): IterableIterator<[T, T]> {
    return this._getEdges().values();
  }

  private _getEdges(): [T, T][] {
    const edges = new ObjectSet<{ id: `${T['id']}->${T['id']}`; v: [T, T] }>();
    for (const [from, tos] of this._nodes) {
      for (const to of tos) {
        edges.add({ id: `${from.id}->${to.id}`, v: [from, to] });
      }
    }
    return Array.from(edges.values()).map((v) => v.v);
  }

  getEdges(from: T): IterableIterator<T> {
    return this._nodes.get(from)?.values() ?? [].values();
  }

  getIncomingEdges(to: T): IterableIterator<T> {
    return this._getEdges()
      .filter(([, t]) => t.id === to.id)
      .map(([f]) => f)
      .values();
  }

  getEdgeCount(from: T): number {
    return this._nodes.get(from)?.size ?? 0;
  }

  getNodeCount(): number {
    return this._nodes.size;
  }

  toString(): string {
    return (
      'Graph\n' +
      Array.from(this._nodes.entries())
        .map(
          (entry) =>
            `'${entry[0].id}' => ${Array.from(entry[1].values())
              .map((v) => `'${v.id}'`)
              .join(',')}`
        )
        .join('\n')
    );
  }
}
