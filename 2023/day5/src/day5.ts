import { lines } from 'utils';

interface Mapping {
  source: number;
  destination: number;
  range: number;
}

function parseInput(input: string): { seeds: number[]; maps: Mapping[][] } {
  const [, seeds, ...maps] = input
    .split(/seeds:|[\w-]+ map:/)
    .map((x) => x.trim());
  return {
    seeds: seeds.split(' ').map(Number),
    maps: maps.map((map) => {
      return lines(map)
        .map((line) => line.split(' '))
        .map(([destination, source, range]) => ({
          destination: Number(destination),
          source: Number(source),
          range: Number(range),
        }))
        .sort((a, b) => a.source - b.source);
    }),
  };
}

export function part1(input: string): number {
  const { seeds, maps } = parseInput(input);

  return Math.min(
    ...seeds.map((seed) => {
      return mapSeedToLocation(seed, maps);
    })
  );
}

function mapSeedToLocation(seed: number, maps: Mapping[][]) {
  let currentNumber = seed;
  for (let i = 0; i < maps.length; i++) {
    const map = maps[i];
    const mapping = map.find(
      ({ source, range }) =>
        source <= currentNumber && currentNumber <= source + (range - 1)
    );
    if (mapping) {
      currentNumber = mapping.destination + (currentNumber - mapping.source);
    }
  }
  return currentNumber;
}

// FIXME: This naive implementation takes > 15 minutes
export function part2(input: string): number {
  const { seeds: seedRanges, maps } = parseInput(input);

  let minLocation = Number.MAX_SAFE_INTEGER;
  for (let i = 0; i < seedRanges.length; i += 2) {
    for (let j = 0; j < seedRanges[i + 1]; j++) {
      const seed = seedRanges[i] + j;
      const location = mapSeedToLocation(seed, maps);
      minLocation = Math.min(minLocation, location);
    }
  }
  return minLocation;
}
