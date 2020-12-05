import { readInput } from "../utils/readInput";
import { Solution } from "../utils/types";

interface Seat {
  row: number;
  col: number;
}

export class P1 implements Solution {
  parse(input: string): Seat[] {
    const inputStrings = input.split("\n");
    return inputStrings.map((inputString) => {
      let maxRow = 127;
      let minRow = 0;
      let row = 0;
      for (let i = 0; i < 8; i++) {
        if (inputString.charAt(i) === "F") {
          maxRow = Math.floor((maxRow + minRow) / 2);
          row = maxRow;
        } else if (inputString.charAt(i) === "B") {
          minRow = Math.ceil((maxRow + minRow) / 2);
          row = minRow;
        }
      }

      let maxCol = 7;
      let minCol = 0;
      let col = 0;
      for (let i = 7; i < 10; i++) {
        if (inputString.charAt(i) === "L") {
          maxCol = Math.floor((maxCol + minCol) / 2);
          col = maxCol;
        } else if (inputString.charAt(i) === "R") {
          minCol = Math.ceil((maxCol + minCol) / 2);
          col = minCol;
        }
      }

      return {
        row: maxRow,
        col: maxCol,
      };
    });
  }

  async run() {
    const data = readInput("./inputs/d5.txt");
    const seatLocations = this.parse(data);
    const seatIds = seatLocations.map(({ row, col }) => row * 8 + col).sort();
    const maxSeatId = seatIds.reduce(
      (maxId, id) => (id > maxId ? id : maxId),
      0
    );

    // [0, 1, 2, 3, 4, 5, 6, 7]
    // [8, , 10, , , 13, 14, 15]
    // [16 ... 1015]

    // i = 8 - 1015
    // if seat[i] does not exist exists && seat[i + 1] exists and seat[i-1] does not exist
    const seatMap = new Set(seatIds);
    for (let i = 8; i < 127 * 8; i++) {
      if (!seatMap.has(i) && seatMap.has(i + 1) && seatMap.has(i - 1)) {
        return i.toString();
      }
    }

    return maxSeatId.toString();
  }
}
