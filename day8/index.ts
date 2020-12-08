import { readInput } from "../utils/readInput";
import { Solution } from "../utils/types";

type OperationType = "nop" | "jmp" | "acc";

interface Operation {
  type: OperationType;
  amt: number;
}

export class P1 implements Solution {
  parseOperations(input: string): Operation[] {
    const operationStrings = input.split("\n");
    return operationStrings.map((str) => {
      const [operation, num] = str.split(" ");
      return {
        type: operation as OperationType,
        amt: Number(num),
      };
    });
  }

  part1(operations: Operation[]): number {
    const indexDone = new Set<number>();
    let acc = 0;
    let index = 0;
    while (index >= 0 && index < operations.length) {
      if (indexDone.has(index)) {
        return acc;
      }

      indexDone.add(index);
      switch (operations[index].type) {
        case "nop":
          index++;
          break;
        case "acc":
          acc += operations[index].amt;
          index++;
          break;
        case "jmp":
          index += operations[index].amt;
          break;
      }
    }

    return acc;
  }

  traverse(
    operations: Operation[],
    index: number = 0,
    visited: Set<number> = new Set<number>()
  ): number {
    let acc = 0;
    while (index >= 0 && index < operations.length) {
      if (visited.has(index)) {
        return null;
      }

      visited.add(index);
      switch (operations[index].type) {
        case "nop":
          index++;
          break;
        case "acc":
          acc += operations[index].amt;
          index++;
          break;
        case "jmp":
          index += operations[index].amt;
          break;
      }
    }

    return acc;
  }

  part2(operations: Operation[]): number {
    const indexDone = new Set<number>([0]);
    let acc = 0;
    let index = 0;
    while (index >= 0 && index < operations.length) {
      const originalIndex = index;
      let amtToAdvance = 1;
      switch (operations[index].type) {
        case "nop":
          break;
        case "acc":
          acc += operations[index].amt;
          break;
        case "jmp":
          amtToAdvance = operations[index].amt;
          break;
      }

      // switch operations
      if (operations[index].type !== "acc") {
        operations[index].type =
          operations[index].type === "nop" ? "jmp" : "nop";
        // traverse
        const traverseResult = this.traverse(
          operations,
          index,
          new Set(Array.from(indexDone).slice())
        );
        if (traverseResult != null) {
          return acc + traverseResult;
        } else {
          operations[index].type =
            operations[index].type === "nop" ? "jmp" : "nop";
        }
      }
      indexDone.add(index);
      index += amtToAdvance;
    }

    return this.part1(operations);
  }

  async run() {
    const data = readInput("./inputs/d8.txt");
    const operations = this.parseOperations(data);
    return this.part2(operations).toString();
  }
}
