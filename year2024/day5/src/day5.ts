import { Graph, lines, sum } from 'utils';

export function part1(input: string): number {
  const [rules, pages] = input.split('\n\n');
  const ruleGraph = createRuleGraph(rules);

  return sum(
    lines(pages).map((page) => {
      const pageNumbers = page.split(',').map(Number);
      if (isLegalUpdate(pageNumbers, ruleGraph)) {
        return pageNumbers.at(pageNumbers.length / 2) ?? 0;
      }
      return 0;
    })
  );
}

function createRuleGraph(rules: string) {
  const pageGraph = new Graph();
  lines(rules).forEach((line) => {
    const [left, right] = line.split('|');
    pageGraph.addEdge({ id: Number(left) }, { id: Number(right) });
  });
  return pageGraph;
}

function isLegalUpdate(
  pageNumbers: number[],
  pageGraph: Graph<{ id: string | number }>
) {
  let isLegal = true;
  outer: for (let i = 1; i < pageNumbers.length; i++) {
    for (let j = 0; j < i; j++) {
      if (pageGraph.hasEdge({ id: pageNumbers[i] }, { id: pageNumbers[j] })) {
        isLegal = false;
        continue outer;
      }
    }
  }
  return isLegal;
}

export function part2(input: string): number {
  const [rules, pages] = input.split('\n\n');
  const ruleGraph = createRuleGraph(rules);

  return sum(
    lines(pages).map((page) => {
      const pageNumbers = page.split(',').map(Number);
      if (!isLegalUpdate(pageNumbers, ruleGraph)) {
        const sortedPageNumbers = pageNumbers.sort((a, b) => {
          return ruleGraph.hasEdge({ id: a }, { id: b }) ? -1 : 1;
        });
        return sortedPageNumbers.at(sortedPageNumbers.length / 2) ?? 0;
      }
      return 0;
    })
  );
}
