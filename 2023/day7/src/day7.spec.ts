import { readInput } from 'utils';
import {
  HandType,
  compareHands,
  compareHandsWithJokers,
  determineHandType,
  part1,
  part2,
} from './day7';

describe('day7', () => {
  test.each`
    cards      | useJoker | expected
    ${'AAAAA'} | ${false} | ${HandType.FiveOfAKind}
    ${'AAAA2'} | ${false} | ${HandType.FourOfAKind}
    ${'2AAAA'} | ${false} | ${HandType.FourOfAKind}
    ${'AA2AA'} | ${false} | ${HandType.FourOfAKind}
    ${'2AAA2'} | ${false} | ${HandType.FullHouse}
    ${'2A2AA'} | ${false} | ${HandType.FullHouse}
    ${'AA29A'} | ${false} | ${HandType.ThreeOfAKind}
    ${'2AAA9'} | ${false} | ${HandType.ThreeOfAKind}
    ${'2AA29'} | ${false} | ${HandType.TwoPairs}
    ${'2AK29'} | ${false} | ${HandType.OnePair}
    ${'2AK39'} | ${false} | ${HandType.HighCard}
    ${'AAAA1'} | ${true}  | ${HandType.FiveOfAKind}
    ${'AAA11'} | ${true}  | ${HandType.FiveOfAKind}
    ${'AA111'} | ${true}  | ${HandType.FiveOfAKind}
    ${'BA111'} | ${true}  | ${HandType.FourOfAKind}
    ${'BAQ11'} | ${true}  | ${HandType.ThreeOfAKind}
    ${'23451'} | ${true}  | ${HandType.OnePair}
  `(
    'determineHandType $cards (useJoker $useJoker) $expected',
    ({ cards, useJoker, expected }) => {
      const result = determineHandType({ cards, bid: 0 }, useJoker);
      expect(result).toEqual(expected);
    }
  );

  test.each`
    hand1      | hand2      | expected
    ${'AAAAA'} | ${'1AAAA'} | ${1}
    ${'1DDD2'} | ${'CCCC2'} | ${-1}
    ${'1DDD2'} | ${'1CCC2'} | ${1}
    ${'11DD2'} | ${'1CCC2'} | ${-1}
    ${'D1DD2'} | ${'1CCC2'} | ${1}
    ${'DDDD2'} | ${'CCCC2'} | ${1}
    ${'DDD12'} | ${'DDDD2'} | ${-1}
  `(
    'compareHandsWithJokers $hand1 $hand2 $expected',
    ({ hand1, hand2, expected }) => {
      const result = compareHandsWithJokers(
        { cards: hand1, bid: 0 },
        { cards: hand2, bid: 0 }
      );
      expect(result).toEqual(expected);
    }
  );

  test.each`
    hand1      | hand2      | expected
    ${'DDDD2'} | ${'CCCC2'} | ${1}
  `('compareHands $hand1 $hand2 $expected', ({ hand1, hand2, expected }) => {
    const result = compareHands(
      { cards: hand1, bid: 0 },
      { cards: hand2, bid: 0 }
    );
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day7-example'} | ${6440}
    ${'2023-day7'}         | ${246163188}
  `('part1 $input $expected', ({ input, expected }) => {
    const result = part1(readInput(input));
    expect(result).toEqual(expected);
  });

  test.each`
    input                  | expected
    ${'2023-day7-example'} | ${5905}
    ${'2023-day7'}         | ${245794069}
  `('part2 $input $expected', ({ input, expected }) => {
    const result = part2(readInput(input));
    expect(result).toEqual(expected);
  });
});
