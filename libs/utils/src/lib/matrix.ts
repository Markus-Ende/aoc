import { chars, lines } from './utils';

export interface Entry<T> {
  value: T;
  x: number;
  y: number;
}

export class Matrix<T> {
  private _data: T[][];
  private _rowSize: number;
  private _columnSize: number;

  constructor(
    data: string,
    convert: (char: string) => T = (char) => char as unknown as T
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
    this._data = rows.map((line) => chars(line).map(convert));
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

  /**
   * Gets the neighbors of the element at the specified coordinates, in clockwise order starting at the top.
   * @param x The x-coordinate.
   * @param y The y-coordinate.
   * @param withDiagonals Whether to include diagonal neighbors (default: false).
   * @returns An array of neighboring entries.
   */
  getNeighbors(x: number, y: number, withDiagonals = false): Entry<T>[] {
    if (x < 0 || x >= this._rowSize || y < 0 || y >= this._columnSize) {
      throw new Error('Out of bounds');
    }
    const neighbors: Entry<T>[] = [];
    // top
    if (y > 0) {
      neighbors.push({ value: this.get(x, y - 1), x, y: y - 1 });
    }
    // top right
    if (withDiagonals && x < this._rowSize - 1 && y > 0) {
      neighbors.push({ value: this.get(x + 1, y - 1), x: x + 1, y: y - 1 });
    }
    // right
    if (x < this._rowSize - 1) {
      neighbors.push({ value: this.get(x + 1, y), x: x + 1, y });
    }
    // bottom right
    if (withDiagonals && x < this._rowSize - 1 && y < this._columnSize - 1) {
      neighbors.push({ value: this.get(x + 1, y + 1), x: x + 1, y: y + 1 });
    }
    // bottom
    if (y < this._columnSize - 1) {
      neighbors.push({ value: this.get(x, y + 1), x, y: y + 1 });
    }
    // bottom left
    if (withDiagonals && x > 0 && y < this._columnSize - 1) {
      neighbors.push({ value: this.get(x - 1, y + 1), x: x - 1, y: y + 1 });
    }
    // left
    if (x > 0) {
      neighbors.push({ value: this.get(x - 1, y), x: x - 1, y });
    }
    // top left
    if (withDiagonals && x > 0 && y > 0) {
      neighbors.push({ value: this.get(x - 1, y - 1), x: x - 1, y: y - 1 });
    }

    return neighbors;
  }

  set(x: number, y: number, value: T): void {
    this._data[y][x] = value;
  }

  pad(value: T): Matrix<T> {
    for (let y = 0; y < this._columnSize; y++) {
      this._data[y].unshift(value);
      this._data[y].push(value);
    }
    this._rowSize += 2;
    this._data.unshift(Array(this._rowSize).fill(value));
    this._data.push(Array(this._rowSize).fill(value));
    this._columnSize += 2;
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

  findNeighbor(
    { x, y }: Entry<T>,
    predicate: (value: Entry<T>) => boolean
  ): Entry<T> | undefined {
    const neighbors = this.getNeighbors(x, y);
    return neighbors.find((entry) => predicate(entry));
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
