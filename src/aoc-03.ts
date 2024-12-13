import * as fs from 'fs';

console.log("Advent of Code Day Three | Part 1 & 2");

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};

const calculateMulSum = (input: string): { part1: number, part2: number } => {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const doDontRegex = /(do\(\)|don't\(\))/g;

    let match;
    let totalSumPart1 = 0;
    let totalSumPart2 = 0;

    let mulEnabled = true;
    let instructions = input.match(doDontRegex) || [];

    while ((match = mulRegex.exec(input)) !== null) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        totalSumPart1 += num1 * num2;
    }

    const tokens = input.split(/(?=mul\()|(?=do\(\))|(?=don't\(\))/);
    for (const token of tokens) {
        if (token.startsWith("do()")) {
            mulEnabled = true;
        } else if (token.startsWith("don't()")) {
            mulEnabled = false;
        } else if (token.startsWith("mul(")) {
            const match = mulRegex.exec(token);
            if (match && mulEnabled) {
                const num1 = parseInt(match[1], 10);
                const num2 = parseInt(match[2], 10);
                totalSumPart2 += num1 * num2;
            }
        }
    }

    return { part1: totalSumPart1, part2: totalSumPart2 };
};

const filePath = 'input/aoc-03.txt';
const fileContent = readInputFile(filePath);

const results = calculateMulSum(fileContent);
console.log("Part 1 - Sum of all valid mul instructions:", results.part1);
console.log("Part 2 - Sum of all valid enabled mul instructions:", results.part2);

