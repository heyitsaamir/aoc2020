import { readInput } from "../utils/readInput";
import { Solution } from "../utils/types";

export class P1 implements Solution {
  parse(input: string): number[] {
    return input.split("\n").map(Number);
  }

  part1(input: number[], preamble: number): number {
    const numberWithIndices = new Map<number, number[]>();
    input.map((n, i) => {
      let arr = numberWithIndices.get(n) ?? [];
      arr.push(i);
      numberWithIndices.set(n, arr);
    });

    for (let i = preamble; i < input.length; i++) {
      const val = input[i];
      let isValidResultFound = false;
      for (let j = i - preamble; j < i; j++) {
        const otherNumber = numberWithIndices.get(val - input[j]);
        if (otherNumber && otherNumber.some((k) => k > i - preamble)) {
          isValidResultFound = true;
          break;
        }
      }

      if (!isValidResultFound) {
        return val;
      }
    }

    throw new Error("not found");
  }

  part2(input: number[], target: number): number {
    let runningTotal = input[0] + input[1];
    for (
      let startIndex = 0, endIndex = 1;
      endIndex < input.length && startIndex < endIndex;

    ) {
      if (runningTotal === target) {
        return (
          Math.max(...input.slice(startIndex, endIndex)) +
          Math.min(...input.slice(startIndex, endIndex))
        );
      } else if (runningTotal > target) {
        runningTotal -= input[startIndex];
        startIndex++;
      } else {
        endIndex++;
        runningTotal += input[endIndex];
      }
    }
  }

  async run() {
    const data = readInput("./inputs/d9.txt");
    const input = this.parse(data);
    return this.part2(input, this.part1(input, 25)).toString();
  }
}
