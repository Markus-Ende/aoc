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

  getNeighbors(x: number, y: number): Entry<T>[] {
    const neighbors: Entry<T>[] = [];
    if (y > 0) {
      neighbors.push({ value: this.get(x, y - 1), x, y: y - 1 });
    }
    if (x < this._rowSize - 1) {
      neighbors.push({ value: this.get(x + 1, y), x: x + 1, y });
    }
    if (y < this._columnSize - 1) {
      neighbors.push({ value: this.get(x, y + 1), x, y: y + 1 });
    }
    if (x > 0) {
      neighbors.push({ value: this.get(x - 1, y), x: x - 1, y });
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
}
