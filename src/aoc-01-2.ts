import * as fs from 'fs';

console.log("Advent of Code Day One | 2")

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};
const filePath = 'input/aoc-01-1.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");
const processColumns = (lines: string[]): { left: number[], right: number[]} => {
    const left: number[] = [];
    const right: number[] = [];
    let isLeftColumn = true;
    for (const line of lines) {
        const trimmedLine: string = line.trim();
        if (trimmedLine === "") {
            continue;
        }
        const parts = trimmedLine.split(/\s+/);
        if (parts.length !== 2) {
            console.error(`Invalid line, 3 Values Expected: "${trimmedLine}"`);
            continue;
        }
        const leftValue = parseFloat(parts[0]);
        const rightValue = parseFloat(parts[1]);
        if (isNaN(leftValue) || isNaN(rightValue)) {
            console.error(`Invalid number in line: "${trimmedLine}"`);
            continue;
        }
        left.push(leftValue);
        right.push(rightValue);
    }
    right.sort((a, b) => a - b);
    return {left, right};
};

function calculateSimilarityScore(left: number[], right: number[]): number {
    const rightCount = new Map<number, number>();

    for (const num of right) {
        rightCount.set(num, (rightCount.get(num) || 0) + 1);
    }

    let similarityScore = 0;

    for (const num of left) {
        const count = rightCount.get(num) || 0;
        similarityScore += num * count;
    }
    return similarityScore;
}

const sortedColumns = processColumns(fileContentSplit);
console.log("Similarity score:", calculateSimilarityScore(sortedColumns.left, sortedColumns.right)) 