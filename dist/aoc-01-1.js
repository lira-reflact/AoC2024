"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readInputFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    }
    catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};
const filePath = 'input/aoc-01-1.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");
const processColumns = (lines) => {
    const left = [];
    const right = [];
    let isLeftColumn = true;
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine === "") {
            continue;
        }
        const parts = trimmedLine.split(/\s+/);
        if (parts.length !== 2) {
            console.error(`Invalid line, 3 Values Expected: "${trimmedLine}"`);
            continue;
        }
        console.log();
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
const calculateSumOfDifferences = (left, right) => {
    const minLength = Math.min(left.length, right.length);
    let sumOfDifferences = 0;
    for (let i = 0; i < minLength; i++) {
        const difference = Math.abs(left[i] - right[i]);
        console.log(`Rang ${i + 1}: | ${left[i]} - ${right[i]} | = ${difference}`);
        sumOfDifferences += difference;
    }
    return sumOfDifferences;
};
const sortedColumns = processColumns(fileContentSplit);
const result = calculateSumOfDifferences(sortedColumns.left, sortedColumns.right);
console.log("Sum of differences:", result);
