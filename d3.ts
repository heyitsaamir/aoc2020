import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

interface Input {
  width: number;
  lines: string[];
}

interface Position {
  col: number;
  row: number;
}

export class DaySolution implements Solution {
  parse(input: string): Input {
    const lines = input.split("\n");
    return {
      lines,
      width: lines[0].length,
    };
  }

  traverse(input: Input, rowIncrease: number, colIncrease: number) {
    const position: Position = { col: 0, row: rowIncrease };
    let treeCount = 0;
    while (position.row < input.lines.length) {
      // advance
      position.col = (position.col + colIncrease) % input.width;
      if (input.lines[position.row].charAt(position.col) === "#") {
        treeCount++;
      }
      position.row += rowIncrease;
    }
    return treeCount;
  }

  async run() {
    const data = readInput("./inputs/d3.txt");
    const input = this.parse(data);
    // const treeCount = this.traverse(input, 1, 3);
    const product = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ]
      .map(([colIncrease, rowIncrease]) =>
        this.traverse(input, rowIncrease, colIncrease)
      )
      .reduce((prod, val) => prod * val, 1);
    return product.toString();
  }
}
