import {Solution} from '../../utils/types';

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