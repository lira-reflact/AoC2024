import * as fs from 'fs';

console.log("Advent of Code Day Two | 1")


const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};

const filePath = 'input/Day02.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");

const testIfSafe = (reports: string[]): number => {
    let safeReports = 0;
    for (const report of reports) {
        const numbers = report.split(" ").map(num => parseInt(num, 10));
        if (numbers.some(isNaN)) {
            console.error("The number sequence has invalid entries.")
            continue;
        }
        let direction: "increasing" | "decreasing" | null = null;
        let isSafe = true;
        for (let i = 1; i < numbers.length; i++) {
            const diff = numbers[i] - numbers[i - 1];

            if (diff < - 3 || diff > 3 || diff === 0) {
                isSafe = false;
                break;
            }
            if (direction === null) {
                direction = diff > 0 ? "increasing" : "decreasing";
            } else if (
                (direction === "increasing" && diff < 0) ||
                (direction === "decreasing" && diff > 0)
            ) {
                isSafe = false;
                break;
            }
        }
        if (isSafe) {
            safeReports++;
        }
    }
    return safeReports
}
console.log("Safe reports: ", testIfSafe(fileContentSplit));