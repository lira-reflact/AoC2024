import * as fs from 'fs';
console.log("Advent of Code Day 04");

const readInputFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (error) {
    console.error("Error reading the file:", error);
    return '';
  }
};

const filePath = 'input/aoc-04.txt';
const fileContent = readInputFile(filePath);

console.log("Part 2 - Sum of all valid enabled mul instructions:", fileContent);
