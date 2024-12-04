import { chars, lines, words } from './utils';

export interface Entry<T> {
  value: T;
  x: number;
  y: number;
}

export interface NeighborEntry<T> extends Entry<T> {
  dx: number;
  dy: number;
}

export function stringMatrix(
  s: string,
  ignoreWhiteSpace = false
): Matrix<string> {
  return new Matrix(s, undefined, ignoreWhiteSpace);
}

export function numberMatrix(
  s: string,
  ignoreWhiteSpace = false
): Matrix<number> {
  return new Matrix(s, Number, ignoreWhiteSpace);
}

export class Matrix<T> {
  private _data: T[][];
  private _rowSize: number;
  private _columnSize: number;

  constructor(
    data: string,
    convert: (char: string) => T = (char) => char as unknown as T,
    ignoreWhitespace = false
  ) {
    if (data === '') {
      this._rowSize = 0;
      this._columnSize = 0;
      this._data = [];
      return;
    }
    const rows = lines(data);
    this._rowSize = rows[0].length;
    if (rows.some((line) => line.length !== this._rowSize)) {
      throw new Error('Matrix is not rectangular');
    }
    this._columnSize = rows.length;
    this._data = rows.map((line) => {
      if (ignoreWhitespace) {
        return words(line).map(convert);
      } else {
        return chars(line).map(convert);
      }
    });
  }

  get rowSize(): number {
    return this._rowSize;
  }

  get columnSize(): number {
    return this._columnSize;
  }

  get data(): T[][] {
    return this._data;
  }

  get(x: number, y: number): T {
    return this._data[y][x];
  }

  getEntry(x: number, y: number): Entry<T> {
    return { value: this.get(x, y), x, y };
  }

  getRow(y: number): T[] {
    if (y < 0 || y >= this._columnSize) {
      throw new Error('Out of bounds');
    }
    return this._data[y];
  }

  getColumn(x: number): T[] {
    if (x < 0 || x >= this._rowSize) {
      throw new Error('Out of bounds');
    }
    return this._data.map((row) => row[x]);
  }

  /**
   * Gets the neighbors of the element at the specified coordinates, in clockwise order starting at the top.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   * @param withDiagonals Whether to include diagonal neighbors (default: false).
   * @returns An array of neighboring entries.
   */
  getNeighbors(
    x: number,
    y: number,
    withDiagonals = false
  ): NeighborEntry<T>[] {
    if (x < 0 || x >= this._rowSize || y < 0 || y >= this._columnSize) {
      throw new Error('Out of bounds');
    }
    const neighbors: NeighborEntry<T>[] = [];
    // top
    if (y > 0) {
      neighbors.push({ value: this.get(x, y - 1), x, y: y - 1, dx: 0, dy: -1 });
    }
    // top right
    if (withDiagonals && x < this._rowSize - 1 && y > 0) {
      neighbors.push({
        value: this.get(x + 1, y - 1),
        x: x + 1,
        y: y - 1,
        dx: 1,
        dy: -1,
      });
    }
    // right
    if (x < this._rowSize - 1) {
      neighbors.push({ value: this.get(x + 1, y), x: x + 1, y, dx: 1, dy: 0 });
    }
    // bottom right
    if (withDiagonals && x < this._rowSize - 1 && y < this._columnSize - 1) {
      neighbors.push({
        value: this.get(x + 1, y + 1),
        x: x + 1,
        y: y + 1,
        dx: 1,
        dy: 1,
      });
    }
    // bottom
    if (y < this._columnSize - 1) {
      neighbors.push({ value: this.get(x, y + 1), x, y: y + 1, dx: 0, dy: 1 });
    }
    // bottom left
    if (withDiagonals && x > 0 && y < this._columnSize - 1) {
      neighbors.push({
        value: this.get(x - 1, y + 1),
        x: x - 1,
        y: y + 1,
        dx: -1,
        dy: 1,
      });
    }
    // left
    if (x > 0) {
      neighbors.push({ value: this.get(x - 1, y), x: x - 1, y, dx: -1, dy: 0 });
    }
    // top left
    if (withDiagonals && x > 0 && y > 0) {
      neighbors.push({
        value: this.get(x - 1, y - 1),
        x: x - 1,
        y: y - 1,
        dx: -1,
        dy: -1,
      });
    }

    return neighbors;
  }

  set(x: number, y: number, value: T): void {
    this._data[y][x] = value;
  }

  pad(value: T, amount = 1): Matrix<T> {
    for (let i = 0; i < amount; i++) {
      for (let y = 0; y < this._columnSize; y++) {
        this._data[y].unshift(value);
        this._data[y].push(value);
      }
      this._rowSize += 2;
      this._data.unshift(Array(this._rowSize).fill(value));
      this._data.push(Array(this._rowSize).fill(value));
      this._columnSize += 2;
    }

    return this;
  }

  unpad(): Matrix<T> {
    if (this._rowSize === 0 || this._columnSize === 0) {
      return this;
    }
    for (let y = 0; y < this._columnSize; y++) {
      this._data[y].shift();
      this._data[y].pop();
    }
    this._rowSize -= 2;
    this._data.shift();
    this._data.pop();
    this._columnSize -= 2;
    return this;
  }

  /** Returns the first element for which the predicate returns true */
  find(
    predicate: (value: T, x: number, y: number) => boolean
  ): Entry<T> | undefined {
    for (let y = 0; y < this._columnSize; y++) {
      for (let x = 0; x < this._rowSize; x++) {
        if (predicate(this._data[y][x], x, y)) {
          return { value: this._data[y][x], x, y };
        }
      }
    }
  }

  findAll(predicate: (value: T, x: number, y: number) => boolean): Entry<T>[] {
    const entries: Entry<T>[] = [];
    for (let y = 0; y < this._columnSize; y++) {
      for (let x = 0; x < this._rowSize; x++) {
        if (predicate(this._data[y][x], x, y)) {
          entries.push({ value: this._data[y][x], x, y });
        }
      }
    }
    return entries;
  }

  findRow(
    condition: 'all-cells' | 'some-cells',
    predicate: (value: T, x: number, y: number) => boolean,
    start = 0
  ): number | undefined {
    if (start < 0 || start >= this._rowSize) {
      throw new Error('Out of bounds:' + start + '/' + this._rowSize);
    }
    for (let y = start; y < this._rowSize; y++) {
      if (
        condition === 'all-cells' &&
        this._data[y].every((value, x) => predicate(value, x, y))
      ) {
        return y;
      }
      if (
        condition === 'some-cells' &&
        this._data[y].some((value, x) => predicate(value, x, y))
      ) {
        return y;
      }
    }
    return undefined;
  }

  findColumn(
    condition: 'all-cells' | 'some-cells',
    predicate: (value: T, x: number, y: number) => boolean,
    start = 0
  ): number | undefined {
    if (start < 0 || start >= this._columnSize) {
      throw new Error('Out of bounds:' + start + '/' + this._columnSize);
    }
    for (let x = start; x < this._columnSize; x++) {
      if (
        condition === 'all-cells' &&
        this._data.every((row) => predicate(row[x], x, this._data.indexOf(row)))
      ) {
        return x;
      }
      if (
        condition === 'some-cells' &&
        this._data.some((row) => predicate(row[x], x, this._data.indexOf(row)))
      ) {
        return x;
      }
    }
    return undefined;
  }

  findColumns(
    condition: 'all-cells' | 'some-cells',
    predicate: (value: T, x: number, y: number) => boolean
  ) {
    const columns: number[] = [];
    let start = 0;
    while (start < this._columnSize) {
      const index = this.findColumn(condition, predicate, start);
      if (index === undefined) {
        break;
      }
      columns.push(index);
      start = index + 1;
    }
    return columns;
  }

  findRows(
    condition: 'all-cells' | 'some-cells',
    predicate: (value: T, x: number, y: number) => boolean
  ) {
    const rows: number[] = [];
    let start = 0;
    while (start < this._rowSize) {
      const index = this.findRow(condition, predicate, start);
      if (index === undefined) {
        break;
      }
      rows.push(index);
      start = index + 1;
    }
    return rows;
  }

  duplicateRow(y: number): Matrix<T> {
    if (y < 0 || y >= this._rowSize) {
      throw new Error('Out of bounds: ' + y + '/' + this._rowSize);
    }
    this._data.splice(y, 0, [...this._data[y]]);
    this._columnSize++;
    return this;
  }

  duplicateColumn(x: number): Matrix<T> {
    if (x < 0 || x >= this._columnSize) {
      throw new Error('Out of bounds: ' + x + '/' + this._columnSize);
    }
    for (let y = 0; y < this._columnSize; y++) {
      this._data[y].splice(x, 0, this._data[y][x]);
    }
    this._rowSize++;
    return this;
  }

  findNeighbor(
    { x, y }: Entry<T>,
    predicate: (value: Entry<T>) => boolean,
    reverseSearch = false,
    withDiagonals = false
  ): NeighborEntry<T> | undefined {
    let neighbors = this.getNeighbors(x, y, withDiagonals);
    if (reverseSearch) {
      neighbors = neighbors.reverse();
    }
    return neighbors.find((entry) => predicate(entry));
  }

  findAllNeighbors(
    { x, y }: Entry<T>,
    predicate: (value: Entry<T>) => boolean,
    reverseSearch = false,
    withDiagonals = false
  ): Array<NeighborEntry<T>> {
    let neighbors = this.getNeighbors(x, y, withDiagonals);
    if (reverseSearch) {
      neighbors = neighbors.reverse();
    }
    return neighbors.filter((entry) => predicate(entry));
  }

  replace(callback: (value: T, x: number, y: number) => T): Matrix<T> {
    for (let y = 0; y < this._columnSize; y++) {
      for (let x = 0; x < this._rowSize; x++) {
        this._data[y][x] = callback(this._data[y][x], x, y);
      }
    }
    return this;
  }

  toString(): string {
    return this._data.map((row) => row.join('')).join('\n');
  }

  clone(): Matrix<T> {
    const matrix = new Matrix<T>('');
    matrix._data = this._data.map((row) => [...row]);
    matrix._rowSize = this._rowSize;
    matrix._columnSize = this._columnSize;
    return matrix;
  }
}
