import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

type Input = string[][];

type OccupanceyEvaluator = (
  input: Input,
  row: number,
  col: number
) => "SIT" | "LEAVE" | "NO_CHANGE";

export class DaySolution implements Solution {
  parse(input: string): Input {
    return input.split("\n").map((line) => line.split(""));
  }

  part1(input: Input) {
    return this.evaluate(input, this.nextMove1);
  }

  part2(input: Input) {
    return this.evaluate(input, this.nextMove2);
  }

  evaluate(input: Input, occupancyEvaluator: OccupanceyEvaluator) {
    let oldInput = input;
    while (true) {
      const newInput = this.updateSeating(oldInput, occupancyEvaluator);
      if (newInput == null) break;
      oldInput = newInput;
    }

    return oldInput.reduce((total, row) => {
      return total + row.filter((cell) => cell === "#").length;
    }, 0);
  }

  updateSeating(
    input: Input,
    occupancyEvaluator: OccupanceyEvaluator
  ): Input | null {
    let numberOfChanges = 0;
    const newOutput = input.map((row, rowIndex) => {
      return row.map((_, colIndex) => {
        const nextMove = occupancyEvaluator(input, rowIndex, colIndex);
        switch (nextMove) {
          case "SIT":
            numberOfChanges++;
            return "#";
          case "LEAVE":
            numberOfChanges++;
            return "L";
          default:
            return input[rowIndex][colIndex];
        }
      });
    });
    if (numberOfChanges === 0) return null;
    return newOutput;
  }

  nextMove1(
    input: Input,
    row: number,
    col: number
  ): "SIT" | "LEAVE" | "NO_CHANGE" {
    if (input[row][col] === ".") return "NO_CHANGE";

    let occupiedAdjacentSeats = 0;
    for (let r = -1; r <= 1; r++) {
      const rRow = row + r;
      if (rRow < 0 || rRow >= input.length) continue;
      for (let c = -1; c <= 1; c++) {
        const cCol = col + c;
        if (rRow === row && cCol === col) continue;
        if (cCol < 0 || cCol >= input[0].length) continue;
        if (input[rRow][cCol] === "#") occupiedAdjacentSeats++;
      }
    }

    if (input[row][col] === "L" && occupiedAdjacentSeats === 0) return "SIT";
    if (input[row][col] === "#" && occupiedAdjacentSeats >= 4) return "LEAVE";
    return "NO_CHANGE";
  }

  nextMove2(
    input: Input,
    row: number,
    col: number
  ): "SIT" | "LEAVE" | "NO_CHANGE" {
    if (input[row][col] === ".") return "NO_CHANGE";

    let occupiedAdjacentSeats = 0;
    [
      { rowIncrease: -1, colIncrease: -1 },
      { rowIncrease: -1, colIncrease: 0 },
      { rowIncrease: -1, colIncrease: 1 },
      { rowIncrease: 0, colIncrease: -1 },
      { rowIncrease: 0, colIncrease: 1 },
      { rowIncrease: 1, colIncrease: -1 },
      { rowIncrease: 1, colIncrease: 0 },
      { rowIncrease: 1, colIncrease: 1 },
    ].forEach(({ rowIncrease, colIncrease }) => {
      let rRow = row + rowIncrease;
      let cCol = col + colIncrease;

      while (
        rRow >= 0 &&
        rRow < input.length &&
        cCol >= 0 &&
        cCol < input[0].length
      ) {
        if (input[rRow][cCol] === "L") break;
        if (input[rRow][cCol] === "#") {
          occupiedAdjacentSeats++;
          break;
        }
        rRow += rowIncrease;
        cCol += colIncrease;
      }
    });

    if (input[row][col] === "L" && occupiedAdjacentSeats === 0) return "SIT";
    if (input[row][col] === "#" && occupiedAdjacentSeats >= 5) return "LEAVE";
    return "NO_CHANGE";
  }

  async run() {
    const inputString = readInput("./inputs/d11.txt");
    const input = this.parse(inputString);
    return this.part2(input).toString();
  }
}
