import { lines } from 'utils';

function parseGameLine(line: string): {
  id: number;
  cubes: Map<string, number>;
} {
  const id = parseInt(line.match(/Game (\d+):/)![1]);
  const cubes = new Map<string, number>();

  const colors = line.matchAll(/(\d+) (\w+)/g);
  for (const [, amountString, color] of colors) {
    const amount = parseInt(amountString);

    if (!cubes.has(color) || amount > cubes.get(color)!) {
      cubes.set(color, amount);
    }
  }
  return { id, cubes };
}

export function part1(input: string): number {
  const cubesInBag = new Map<string, number>([
    ['red', 12],
    ['green', 13],
    ['blue', 14],
  ]);
  return lines(input)
    .map(parseGameLine)
    .filter((game) =>
      Array.from(game.cubes.entries()).every(
        ([color, amount]) =>
          cubesInBag.has(color) && cubesInBag.get(color)! >= amount
      )
    )
    .reduce((acc, game) => acc + game.id, 0);
}

export function part2(input: string): number {
  return lines(input)
    .map(parseGameLine)
    .map((game) => {
      let power = 1;
      Array.from(game.cubes.entries()).forEach(([, amount]) => {
        power *= amount;
      });
      return power;
    })
    .reduce((acc, power) => acc + power, 0);
}
