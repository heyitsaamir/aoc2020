import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

type Input = number[];

export class DaySolution implements Solution {
  parse(input: string): Input {
    return input.split("\n").map(Number);
  }

  part1(input: Input) {}

  part2(input: Input) {}

  async run() {
    const input = readInput("./inputs/dX.txt");
    return "not implemented";
  }
}
