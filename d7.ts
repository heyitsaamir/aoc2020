import { readInput } from "./utils/readInput";
import { Solution } from "./utils/types";

interface Bag {
  type: string;
  contains: { quantity: number; type: string }[];
  isContainedBy: { quantity: number; type: string }[];
}

export class DaySolution implements Solution {
  parseAndBuildGraph(input: string): Map<string, Bag> {
    const rules = input.split("\n");
    const bags: Map<string, Bag> = new Map();
    rules.forEach((rule) => {
      const [type, containsString] = rule
        .replace(/\./, "")
        .replace(/bags/g, "bag")
        .split(" contain ");
      const contains = containsString.split(", ").map((contain) => {
        const [quantity, ...bagType] = contain.split(" ");
        return {
          type: bagType.join(" "),
          quantity: quantity === "no" ? 0 : Number(quantity),
        };
      });

      let bag: Bag;
      if (!bags.has(type)) {
        bag = {
          type,
          contains: [],
          isContainedBy: [],
        };
        bags.set(type, bag);
      } else {
        bag = bags.get(type);
      }

      contains.forEach(({ type: containedType, quantity }) => {
        let containedBag: Bag;
        if (quantity === 0) return;
        if (!bags.has(containedType)) {
          containedBag = {
            type: containedType,
            contains: [],
            isContainedBy: [],
          };
          bags.set(containedType, containedBag);
        } else {
          containedBag = bags.get(containedType);
        }

        bag.contains.push({ quantity, type: containedType });
        containedBag.isContainedBy.push({ quantity, type });
      });
    });
    return bags;
  }

  part1(bagMap: Map<string, Bag>) {
    const shinyBag = bagMap.get("shiny gold bag")!;
    const stack = shinyBag.isContainedBy.map((b) => b.type);
    let total = 0;
    const visited = new Set<string>(["shiny gold bag"]);
    while (stack.length > 0) {
      const topOfStack = stack.pop();
      if (visited.has(topOfStack)) {
        continue;
      }
      total++;
      visited.add(topOfStack);
      const bag = bagMap.get(topOfStack)!;
      bag.isContainedBy.forEach(({ type }) => {
        stack.push(type);
      });
    }
    return total;
  }

  part2(bagMap: Map<string, Bag>) {
    return this.getBagsInside(bagMap, "shiny gold bag") - 1;
  }

  getBagsInside(bagMap: Map<string, Bag>, bagName: string): number {
    // for each of the bags inside, get bags inside those,
    // then add 1 and multiply the result with quantity
    // lol this will blow up if there are any cycles
    const bag = bagMap.get(bagName)!;
    return bag.contains.reduce((total, containedBag) => {
      const containedBags = this.getBagsInside(bagMap, containedBag.type);
      return total + containedBag.quantity * containedBags;
    }, 1);
  }

  async run() {
    const data = readInput("./inputs/d7.txt");
    const bagMap = this.parseAndBuildGraph(data);
    return this.part2(bagMap).toString();
  }
}
