import * as fs from 'fs';
console.log("Advent of Code Day Three");

const readInputFile = (filePath: string): string => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};

const calculateMulSum = (input: string): { part1: number } => {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const doDontRegex = /(do\(\)|don't\(\))/g;

    let match;
    let totalSumPart1 = 0;
    let totalSumPart2 = 0;

    let mulEnabled = true;

    while ((match = mulRegex.exec(input)) !== null) {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
        totalSumPart1 += num1 * num2;
    }

    return { part1: totalSumPart1 };
};

const part2 = (input: string) => {
    const pattern = /(?:(mul)\((\d+),(\d+)\))|(?:(do)\(\))|(?:(don't)\(\))/g;

    const instructions = [...input.matchAll(pattern)];

    let total = 0;
    let enabled = true;
    instructions.forEach(inst => {
        // if inst[1] isn't set, it's not a mul() instruction
        if (!inst[1]) {
            /* so set enabled to the existence of inst[4], which is
             * set if it's a do() instruction
             */
            enabled = !!inst[4];
        } else if (enabled) {
            const result = Number(inst[2]) * Number(inst[3]);
            total += result;
        }
    });

    return total;
}

const filePath = 'input/Day03.txt';
const fileContent = readInputFile(filePath);

const results = calculateMulSum(fileContent);
console.log("Part 1 - Sum of all valid mul instructions:", results.part1);
console.log("Part 2 - Sum of all valid enabled mul instructions:", part2(fileContent));

