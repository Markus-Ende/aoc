import { lines, sortAsc } from 'utils';

function wrappingPaper(...[l, w, h]: number[]): number {
  const lw = l * w;
  const wh = w * h;
  const hl = h * l;
  return 2 * lw + 2 * wh + 2 * hl + Math.min(lw, wh, hl);
}

export function part1(input: string): number {
  let sum = 0;
  lines(input).forEach((line) => {
    sum += wrappingPaper(...line.split('x').map((x) => parseInt(x, 10)));
  });
  return sum;
}

function ribbon(...[l, w, h]: number[]): number {
  const [small1, small2] = sortAsc(...[l, w, h]);
  return 2 * small1 + 2 * small2 + l * w * h;
}

export function part2(input: string): number {
  let sum = 0;
  lines(input).forEach((line) => {
    sum += ribbon(...line.split('x').map((x) => parseInt(x, 10)));
  });
  return sum;
}
