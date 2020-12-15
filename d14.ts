import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

interface Mask {
  type: "MASK";
  val: string;
}

interface Set {
  type: "SET";
  memLoc: number;
  value: number;
}

type Input = (Mask | Set)[];

export class DaySolution implements Solution {
  parse(input: string): Input {
    return input.split("\n").map((line) => {
      const tokens = line.split(" = ");
      if (tokens[0] === "mask") {
        return {
          type: "MASK",
          val: tokens[1],
        };
      } else {
        return {
          type: "SET",
          memLoc: Number(tokens[0].match(/(\d)/g).join("")),
          value: Number(tokens[1]),
        };
      }
    });
  }

  part1(input: Input) {
    const map = new Map<number, number>();
    let [mask1, mask2] = this.converMaskToNumber(input[0] as Mask);
    for (let i = 0; i < input.length; i++) {
      const entry = input[i];
      if (entry.type === "MASK") {
        [mask1, mask2] = this.converMaskToNumber(entry);
      } else {
        const firstHalf = ((entry.value >> 18) & mask1.ANDMask) | mask1.ORMask;
        const secHalf = (entry.value & mask2.ANDMask) | mask2.ORMask;

        const res = this.combine(firstHalf, secHalf);
        map.set(entry.memLoc, res);
      }
    }

    return Array.from(map.values()).reduce((sum, v) => sum + v, 0);
  }

  combine(firstHalf: number, secHalf: number) {
    return firstHalf * Math.pow(2, 18) + secHalf;
  }

  converMaskToNumber(mask: Mask) {
    const bits = mask.val.split("");
    const firstHalf = bits.slice(0, 18);
    const secHalf = bits.slice(18);
    return [firstHalf, secHalf].map((bit) => {
      let ORMask = 0;
      let ANDMask = 0;
      bit.forEach((v) => {
        ORMask = ORMask << 1;
        ANDMask = (ANDMask << 1) | 1;

        if (v === "0") {
          ANDMask = (ANDMask >> 1) << 1;
        } else if (v === "1") {
          ORMask = ORMask | 1;
        }
      });

      return { ORMask, ANDMask };
    });
  }

  async run() {
    const input = readInput("./inputs/d14.txt");
    const parsed = this.parse(input);
    return this.part1(parsed).toString();
  }
}
