import { pathToFileURL } from "url";

const fs = require('fs')

export const readInput = (filePath: string) => {
  const path = pathToFileURL(filePath);
  const data = fs.readFileSync(path, 'utf8')
  return data;
}