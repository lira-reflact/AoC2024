import * as fs from 'fs';

console.log("Advent of Code Day Two | 2");

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};

const filePath = 'input/aoc-02.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");
const isSafeSequence = (numbers: number[]): boolean => {
    let direction: "increasing" | "decreasing" | null = null;
    for (let i = 1; i < numbers.length; i++) {
        const diff = numbers[i] - numbers[i - 1];
        if (diff < -3 || diff > 3 || diff === 0) return false;
        if (direction === null) {
            direction = diff > 0 ? "increasing" : "decreasing";
        } else if (
            (direction === "increasing" && diff < 0) ||
            (direction === "decreasing" && diff > 0)
        ) {
            return false;
        }
    }
    return true;
};
const isSafeWithDampener = (numbers: number[]): boolean => {
    for (let i = 0; i < numbers.length; i++) {
        const modifiedSequence = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        if (isSafeSequence(modifiedSequence)) {
            return true;
        }
    }
    return false;
};

const countSafeReports = (reports: string[]): number => {
    let safeReports = 0;

    for (const report of reports) {
        const numbers = report.split(" ").map(num => parseInt(num, 10));
        if (numbers.some(isNaN)) {
            console.error("The number sequence has invalid entries:", report);
            continue;
        }

        if (isSafeSequence(numbers) || isSafeWithDampener(numbers)) {
            safeReports++;
        }
    }

    return safeReports;
};

console.log("Safe reports with Dampener:", countSafeReports(fileContentSplit));
