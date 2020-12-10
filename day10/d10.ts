import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

export class DaySolution implements Solution {
  parse(input: string): number[] {
    return input.split("\n").map(Number);
  }

  part1(input: number[]): number {
    const sortedAdapters = input.sort((a, b) => a - b);
    const map = new Map<number, number>();
    map.set(1, 0);
    map.set(2, 0);
    map.set(3, 0);
    [...sortedAdapters, sortedAdapters[sortedAdapters.length - 1] + 3].reduce(
      (prev, current) => {
        const diff = current - prev;
        map.set(diff, map.get(diff)! + 1);
        return current;
      },
      0
    );

    return map.get(1)! * map.get(3)!;
  }

  part2(input: number[]): number {
    const sortedAdapters = input.sort((a, b) => a - b);
    return this.part2Recurse(
      [...sortedAdapters, sortedAdapters[sortedAdapters.length - 1] + 3],
      0,
      new Map()
    );
  }

  part2Recurse(
    array: number[],
    currentIndex: number,
    memo: Map<number, number>
  ) {
    if (memo.has(array[currentIndex])) {
      return memo.get(array[currentIndex])!;
    }

    if (currentIndex >= array.length) {
      return 0;
    }

    if (currentIndex === array.length - 1) {
      return 1;
    }

    let total = 0;
    for (let i = currentIndex + 3; i > currentIndex; i--) {
      if (i >= array.length) continue;
      if (array[i] - array[currentIndex] > 3) continue;
      total += this.part2Recurse(array, i, memo);
    }

    memo.set(array[currentIndex], total);
    return total;
  }

  async run() {
    const data = readInput("./inputs/d10.txt");
    const input = this.parse(data);
    return this.part2(input).toString();
  }
}
