import { readInput } from '../utils/readInput';
import { Solution } from '../utils/types';

interface Input {
  input: string;
  minChars: number;
  maxChars: number;
  char: string;
  password: string;
}

export class P1 implements Solution {
  parse(input: string): Input[] {
    // 4-7 z: zzzfzlzzz
    const lines = input.split('\n');
    return lines.map(line => {
      const tokens = line.split(' ');
      const [minChars, maxChars] = tokens[0].split('-');
      const character = tokens[1].split(':')[0];
      const password = tokens[2];
      return {
        input: line,
        minChars: Number(minChars),
        maxChars: Number(maxChars),
        char: character,
        password,
      }
    })
  }

  isValid(input: Input): boolean {
    let charCount = 0;
    for (let i = 0; i < input.password.length; i++) {
      if (input.password.charAt(i) === input.char) {
        charCount++;
      }

      if (charCount > input.maxChars) return false;
    }
    
    return charCount >= input.minChars;
  }

  isValid2(input: Input): boolean {
    const charAtPositionA = input.password.charAt(input.minChars - 1);
    const charAtPositionB = input.password.charAt(input.maxChars - 1);

    return (charAtPositionA === input.char) !== (charAtPositionB === input.char);
  }

  async run() {
    const data = readInput('./inputs/d2.txt');
    const inputs = this.parse(data);
    const valid = inputs.reduce((count, input) => this.isValid2(input) ? count + 1 :  count, 0);
    return valid.toString();
  }
}
