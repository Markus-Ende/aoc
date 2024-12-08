import { combinations, stringMatrix } from 'utils';

export function part1(input: string): number {
  const map = stringMatrix(input);
  const antennas = map.findAll((v) => v !== '.');
  const antennasTypes = new Map(
    antennas.map((e) => [e.value, antennas.filter((a) => a.value === e.value)])
  );

  const antinodes = new Set<`${number},${number}`>();

  Array.from(antennasTypes.values()).forEach((antennas) => {
    const pairs = Array.from(combinations(antennas, 2));
    pairs.forEach(([a, b]) => {
      const diffX = b.x - a.x;
      const diffY = b.y - a.y;
      if (map.isInBounds(a.x - diffX, a.y - diffY)) {
        antinodes.add(`${a.x - diffX},${a.y - diffY}`);
      }
      if (map.isInBounds(b.x + diffX, b.y + diffY)) {
        antinodes.add(`${b.x + diffX},${b.y + diffY}`);
      }
    });
  });
  return antinodes.size;
}

export function part2(input: string): number {
  const map = stringMatrix(input);
  const antennas = map.findAll((v) => v !== '.');
  const antennasTypes = new Map(
    antennas.map((e) => [e.value, antennas.filter((a) => a.value === e.value)])
  );

  const antinodes = new Set<`${number},${number}`>();

  Array.from(antennasTypes.values()).forEach((antennas) => {
    const pairs = Array.from(combinations(antennas, 2));
    pairs.forEach(([a, b]) => {
      const diffX = b.x - a.x;
      const diffY = b.y - a.y;
      let times = 0;
      // TODO optimization: calculate actual diffs only once
      while (
        map.isInBounds(a.x - times * diffX, a.y - times * diffY) ||
        map.isInBounds(b.x + times * diffX, b.y + times * diffY)
      ) {
        if (map.isInBounds(a.x - times * diffX, a.y - times * diffY)) {
          antinodes.add(`${a.x - times * diffX},${a.y - times * diffY}`);
        }
        if (map.isInBounds(b.x + times * diffX, b.y + times * diffY)) {
          antinodes.add(`${b.x + times * diffX},${b.y + times * diffY}`);
        }

        times++;
      }
    });
  });
  return antinodes.size;
}
