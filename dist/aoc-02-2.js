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
console.log("Advent of Code Day Two | 2");
const readInputFile = (filePath) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    }
    catch (error) {
        console.error("Error reading the file:", error);
        return '';
    }
};
const filePath = 'input/aoc-02.txt';
const fileContent = readInputFile(filePath);
let fileContentSplit = fileContent.split("\n");
const isSafeSequence = (numbers) => {
    let direction = null;
    for (let i = 1; i < numbers.length; i++) {
        const diff = numbers[i] - numbers[i - 1];
        if (diff < -3 || diff > 3 || diff === 0)
            return false;
        if (direction === null) {
            direction = diff > 0 ? "increasing" : "decreasing";
        }
        else if ((direction === "increasing" && diff < 0) ||
            (direction === "decreasing" && diff > 0)) {
            return false;
        }
    }
    return true;
};
const isSafeWithDampener = (numbers) => {
    for (let i = 0; i < numbers.length; i++) {
        const modifiedSequence = [...numbers.slice(0, i), ...numbers.slice(i + 1)];
        if (isSafeSequence(modifiedSequence)) {
            return true;
        }
    }
    return false;
};
const countSafeReports = (reports) => {
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
