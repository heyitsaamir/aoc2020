import { Solution } from "./utils/types";

const dayNumberString = process.argv[2];
if (!dayNumberString) throw new Error("Requires day number");

const daySolution = require(`./d${dayNumberString}`);
const solution = new daySolution.DaySolution() as Solution;
solution.run().then((res) => {
  console.log(res);
});
