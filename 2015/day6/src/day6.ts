/**
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *    0 0 0 0 0 0 0 0 0 0
 *
 *
 *
 *
 */

import { lines, sum } from 'utils';

class Matrix<T> {
  private readonly data;
  constructor(
    private readonly width: number,
    private readonly height: number,
    initialValue: T
  ) {
    this.data = Array.from(
      { length: this.width * this.height },
      () => initialValue
    );
  }

  get(x: number, y: number): T {
    return this.data[y * this.width + x];
  }

  set(x: number, y: number, value: T): void {
    this.data[y * this.width + x] = value;
  }

  get values(): T[] {
    return this.data;
  }
}

export function part1(input: string): number {
  const lights = new Matrix(1000, 1000, false);
  lines(input).forEach((line) => {
    const [, op, ...coordinates] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    )!;
    const [x1, y1, x2, y2] = coordinates.map((c) => parseInt(c));
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (op) {
          case 'turn on':
            lights.set(x, y, true);
            break;
          case 'turn off':
            lights.set(x, y, false);
            break;
          case 'toggle':
            lights.set(x, y, !lights.get(x, y));
            break;
        }
      }
    }
  });
  return lights.values.filter((v) => !!v).length;
}

export function part2(input: string): number {
  const lights = new Matrix(1000, 1000, 0);
  lines(input).forEach((line) => {
    const [, op, ...coordinates] = line.match(
      /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/
    )!;
    const [x1, y1, x2, y2] = coordinates.map((c) => parseInt(c));
    for (let x = x1; x <= x2; x++) {
      for (let y = y1; y <= y2; y++) {
        switch (op) {
          case 'turn on':
            lights.set(x, y, lights.get(x, y) + 1);
            break;
          case 'turn off':
            lights.set(x, y, Math.max(lights.get(x, y) - 1, 0));
            break;
          case 'toggle':
            lights.set(x, y, lights.get(x, y) + 2);
            break;
        }
      }
    }
  });
  return sum(lights.values);
}
