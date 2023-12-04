import { intersection, lines, sum } from 'utils';

function parseCard(card: string): {
  index: number;
  winning: number[];
  own: number[];
} {
  const [, index, winningStr, ownStr] =
    card.match(/Card\s+(\d+):\s+(.+)\s+\|\s+(.+)/) || [];
  const winning = winningStr.split(/\s+/).map(Number);
  const own = ownStr.split(/\s+/).map(Number);
  return { index: Number(index), winning, own };
}

export function part1(input: string): number {
  return sum(
    lines(input)
      .map(parseCard)
      .map(({ winning, own }) => {
        const matches = intersection(winning, own).size;
        return matches ? Math.pow(2, matches - 1) : 0;
      })
  );
}

export function part2(input: string): number {
  const copies = new Map<number, number>();

  const originals = lines(input).map(parseCard);

  originals.forEach(({ index, winning, own }) => {
    const matches = intersection(winning, own).size;
    const increment = 1 + (copies.get(index) || 0);
    for (let i = index + 1; i <= index + matches; i++) {
      copies.set(i, (copies.get(i) || 0) + increment);
    }
  });

  return originals.length + sum(copies.values());
}
