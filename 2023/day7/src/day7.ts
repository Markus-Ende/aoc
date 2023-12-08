import { chars, getMostFrequentCharacter, lines, sum } from 'utils';

interface Hand {
  cards: string;
  bid: number;
}

// we replace the labels to be able to sort lexicographically
const labels: Record<string, string> = {
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  T: 'A',
  J: 'B',
  Q: 'C',
  K: 'D',
  A: 'E',
};

function parseInput(input: string, useJoker = false): Hand[] {
  return lines(input).map((line) => {
    const [, cards, bid] = line.match(/(.{5}) (\d+)/)!;
    const hand = {
      bid: Number(bid),
      cards: chars(cards)
        .map((card) => (useJoker && card === 'J' ? '1' : labels[card]))
        .join(''),
    };
    return hand;
  });
}

export enum HandType {
  HighCard,
  OnePair,
  TwoPairs,
  ThreeOfAKind,
  FullHouse,
  FourOfAKind,
  FiveOfAKind,
}

export function determineHandType(hand: Hand, useJoker = false): HandType {
  if (useJoker && hand.cards.includes('1')) {
    if (hand.cards === '11111') {
      // this special case took me way too long to realize 🙈
      return HandType.FiveOfAKind;
    }
    hand.cards = hand.cards.replace(
      /1/g,
      getMostFrequentCharacter(hand.cards.replace(/1/g, ''))
    );
  }

  hand.cards = chars(hand.cards).sort().join('');

  if (hand.cards.match(/(.)\1{4}/)) {
    return HandType.FiveOfAKind;
  }
  if (hand.cards.match(/(.)\1{3}/)) {
    return HandType.FourOfAKind;
  }
  if (hand.cards.match(/(.)\1{2}(.)\2{1}|(.)\3{1}(.)\4{2}/)) {
    return HandType.FullHouse;
  }
  if (hand.cards.match(/(.)\1{2}/)) {
    return HandType.ThreeOfAKind;
  }
  if (hand.cards.match(/(.)\1{1}.?(.)\2{1}/)) {
    return HandType.TwoPairs;
  }
  if (hand.cards.match(/(.)\1{1}/)) {
    return HandType.OnePair;
  }
  return HandType.HighCard;
}

export function compareHands(hand1: Hand, hand2: Hand, useJoker = false) {
  const handType1 = determineHandType({ ...hand1 }, useJoker);
  const handType2 = determineHandType({ ...hand2 }, useJoker);

  if (handType1 !== handType2) {
    return handType1 - handType2;
  }

  return hand1.cards.localeCompare(hand2.cards);
}

export function compareHandsWithJokers(hand1: Hand, hand2: Hand) {
  return compareHands(hand1, hand2, true);
}

export function part1(input: string): number {
  const hands = parseInput(input).sort(compareHands);
  return sum(hands.map((hand, i) => (i + 1) * hand.bid));
}

export function part2(input: string): number {
  const hands = parseInput(input, true).sort(compareHandsWithJokers);
  return sum(hands.map((hand, i) => (i + 1) * hand.bid));
}
