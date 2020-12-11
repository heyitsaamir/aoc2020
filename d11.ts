import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

type Input = string[][];

export class DaySolution implements Solution {
  parse(input: string): Input {
    return input.split("\n").map((line) => line.split(""));
  }

  part1(input: Input) {
    let oldInput = input;
    while (true) {
      const newInput = this.evaluate1(oldInput);
      if (newInput == null) break;
      oldInput = newInput;
    }

    return oldInput.reduce((total, row) => {
      return total + row.filter((cell) => cell === "#").length;
    }, 0);
  }

  evaluate1(input: Input): Input | null {
    let numberOfChanges = 0;
    const newOutput = input.map((row, rowIndex) => {
      return row.map((_, colIndex) => {
        const nextMove = this.nextMove1(input, rowIndex, colIndex);
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

  part2(input: Input) {
    let oldInput = input;
    while (true) {
      const newInput = this.evaluate2(oldInput);
      if (newInput == null) break;
      oldInput = newInput;
    }

    return oldInput.reduce((total, row) => {
      return total + row.filter((cell) => cell === "#").length;
    }, 0);
  }

  evaluate2(input: Input): Input | null {
    let numberOfChanges = 0;
    const newOutput = input.map((row, rowIndex) => {
      return row.map((_, colIndex) => {
        const nextMove = this.nextMove2(input, rowIndex, colIndex);
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

  nextMove2(
    input: Input,
    row: number,
    col: number
  ): "SIT" | "LEAVE" | "NO_CHANGE" {
    if (input[row][col] === ".") return "NO_CHANGE";

    let occupiedAdjacentSeats = 0;
    // top left
    let rRow = row - 1;
    let cCol = col - 1;
    while (rRow >= 0 && cCol >= 0) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow--;
      cCol--;
    }

    // top
    rRow = row - 1;
    cCol = col;
    while (rRow >= 0) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow--;
    }

    // topRight
    rRow = row - 1;
    cCol = col + 1;
    while (rRow >= 0 && cCol < input[0].length) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow--;
      cCol++;
    }

    // left
    rRow = row;
    cCol = col - 1;
    while (cCol >= 0) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      cCol--;
    }

    //right
    rRow = row;
    cCol = col + 1;
    while (cCol < input[0].length) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      cCol++;
    }

    // bottom  left
    rRow = row + 1;
    cCol = col - 1;
    while (rRow < input.length && cCol >= 0) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow++;
      cCol--;
    }

    // bottom
    rRow = row + 1;
    cCol = col;
    while (rRow < input.length) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow++;
    }

    // bottom Right
    rRow = row + 1;
    cCol = col + 1;
    while (rRow < input.length && cCol < input[0].length) {
      if (input[rRow][cCol] === "L") break;
      if (input[rRow][cCol] === "#") {
        occupiedAdjacentSeats++;
        break;
      }
      rRow++;
      cCol++;
    }

    if (input[row][col] === "L" && occupiedAdjacentSeats === 0) return "SIT";
    if (input[row][col] === "#" && occupiedAdjacentSeats >= 5) return "LEAVE";
    return "NO_CHANGE";
  }

  print(input: Input | null) {
    if (input == null) return;
    console.log(input.map((r) => r.join("")).join("\n"));
    console.log("---");
  }

  async run() {
    const inputString = readInput("./inputs/d11.txt");
    const input = this.parse(inputString);
    return this.part2(input).toString();
  }
}
