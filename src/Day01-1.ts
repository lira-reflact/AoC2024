import * as fs from 'fs';

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};

const filePath = 'input/Day01.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");
const processColumns = (lines: string[]): { left: number[], right: number[] } => {
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
        } console.log()
        const leftValue = parseFloat(parts[0]);
        const rightValue = parseFloat(parts[1]);
        if (isNaN(leftValue) || isNaN(rightValue)) {
            console.error(`Invalid number in line: "${trimmedLine}"`);
            continue;
        }
        left.push(leftValue);
        right.push(rightValue);
    }
    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);
    return { left, right };
};
const calculateSumOfDifferences = (left: number[], right: number[]): number => {
    const minLength = Math.min(left.length, right.length);
    let sumOfDifferences = 0;
    for (let i = 0; i < minLength; i++) {
        const difference = Math.abs(left[i] - right[i]);
        console.log(`Rang ${i + 1}: | ${left[i]} - ${right[i]} | = ${difference}`);
        sumOfDifferences += difference;
    }
    return sumOfDifferences;
}
const sortedColumns = processColumns(fileContentSplit);
const result = calculateSumOfDifferences(sortedColumns.left, sortedColumns.right);
console.log("Sum of differences:", result)