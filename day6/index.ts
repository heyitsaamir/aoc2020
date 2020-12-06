import { readInput } from "../utils/readInput";
import { Solution } from "../utils/types";

interface Group {
  correctAnswers: Set<string>;
}

export class P1 implements Solution {
  parse(input: string): Group[] {
    const inputStrings = input.split("\n\n");
    return inputStrings.map((inputString) => {
      const cleanString = inputString.replace(/\n/g, "");
      const set = new Set<string>();
      cleanString.split("").forEach((c) => set.add(c));
      return {
        correctAnswers: set,
      };
    });
  }

  parse2(input: string): Group[] {
    const inputStrings = input.split("\n\n");
    return inputStrings.map((inputString) => {
      const allPpl = inputString.split("\n");
      const allPossibleAnswers = new Set<string>();
      const [firstPerson, ...otherPpl] = allPpl;
      firstPerson.split("").forEach((c) => allPossibleAnswers.add(c));
      otherPpl.forEach((answer) => {
        // find out if each answer in this person is also in the first answer
        const thisPersonsAnswer = new Set<string>();
        answer.split("").forEach((c) => thisPersonsAnswer.add(c));
        Array.from(allPossibleAnswers.values()).forEach((a) => {
          if (!thisPersonsAnswer.has(a)) {
            allPossibleAnswers.delete(a);
          }
        });
      });
      return {
        correctAnswers: allPossibleAnswers,
      };
    });
  }

  async run() {
    const data = readInput("./inputs/d6.txt");
    const groupAnswers = this.parse2(data);
    const total = groupAnswers.reduce((total, { correctAnswers }) => {
      return total + correctAnswers.size;
    }, 0);
    return total.toString();
  }
}
