import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

type Input = {
  departTime: number;
  busIds: number[];
};

export class DaySolution implements Solution {
  parse(input: string): Input {
    const lines = input.split("\n");
    return {
      departTime: Number(lines[0]),
      busIds: lines[1]
        .split(",")
        .map((bId) => (bId === "x" ? -1 : Number(bId))),
    };
  }

  part1(input: Input) {
    const busIdsWithMods = input.busIds
      .filter((bId) => bId !== -1)
      .map((busId) => ({
        busId,
        mod: input.departTime % busId,
      }));
    const minMod = busIdsWithMods.reduce(
      (prevMin, bwm) => {
        if (bwm.busId - bwm.mod < prevMin.diff) {
          return { busId: bwm.busId, diff: bwm.busId - bwm.mod };
        }
        return prevMin;
      },
      { diff: Infinity, busId: -1 }
    );
    return minMod.diff * minMod.busId;
  }

  part2(input: Input) {
    const busIdsWithDiff = input.busIds
      .map((bId, index) => {
        return {
          bId,
          index,
        };
      })
      .filter((b) => b.bId !== -1);
    let time = 0;
    let advanceBy = 1;
    for (let i = 0; i < busIdsWithDiff.length; i++) {
      while (true) {
        time += advanceBy;
        if ((time + busIdsWithDiff[i].index) % busIdsWithDiff[i].bId === 0) {
          break;
        }
      }
      advanceBy = advanceBy * busIdsWithDiff[i].bId;
    }

    return time;
  }

  isDivisible(inp: number, target: number) {
    return target % inp === 0;
  }

  async run() {
    const input = readInput("./inputs/d13.txt");
    const parsed = this.parse(input);
    return this.part2(parsed).toString();
  }
}
