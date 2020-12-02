import {Solution} from '../utils/types';

type Input = {
  nums: number[];
}

const input: Input = require('./input.json');

export class P1 implements Solution {
  async run() {
    const set = new Set(input.nums);
    for (const num of input.nums) {
      const diff = 2020 - num;
      if (set.has(diff)) {
        return `${num} * ${diff} = ${num * diff}`;
      }
    }
    throw new Error('Not found!');
  }
}

export class P2 implements Solution {
  async run() {
    const sortedArray = input.nums.sort((a, b) => a - b);
    for (let i = 0; i < sortedArray.length - 2; i++) {
      const requiredDiff = 2020 - sortedArray[i];
      for (let j = i + 1, k = sortedArray.length - 1; j < k;) {
        const sumOfLastTwoNumbers = sortedArray[j] + sortedArray[k];
        if (sumOfLastTwoNumbers < requiredDiff) {
          j++;
        } else if (sumOfLastTwoNumbers > requiredDiff) {
          k--;
        } else {
          return `${sortedArray[i]} * ${sortedArray[j]} * ${sortedArray[k]} = ${sortedArray[i] * sortedArray[j] * sortedArray[k]}`
        }
      }
    }
    throw new Error('Not found!');
  }
}