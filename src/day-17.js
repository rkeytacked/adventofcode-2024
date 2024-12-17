#!/usr/bin/env node
const {log, readLines, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  17 * *
 * * * * * * * */

let input = readLines('../inputs/17.txt', split(/[,\s]+/g, toNumber));
let [[, , A], [, , B], [, , C], , [, ...program]] = input;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function runProgram(a, b, c) {
    let [A, B, C] = [a, b, c].map(BigInt);
    let instr = 0, output = [];

    const combo = op => op < 4 ? BigInt(op) : [A, B, C][op - 4];

    while (instr < program.length) {
        let cmd = program[instr++];
        let op = program[instr++];
        switch (cmd) {
            case 0: // adv
                A >>= combo(op);
                break;
            case 1: // bxl
                B ^= BigInt(op);
                break;
            case 2: // bst
                B = combo(op) & 7n;
                break;
            case 3: // jnz
                A && (instr = op);
                break;
            case 4: // bxc
                B ^= C;
                break;
            case 5: // out
                output.push(combo(op) & 7n);
                break;
            case 6:
                B = A >> combo(op);
                break;
            case 7:
                C = A >> combo(op);
                break;
        }
    }
    return output.join(',');
}

log('solution #1:', runProgram(A, B, C));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let expectedOutput = program.join(',');

function matchProgramOutputRecursive(A, i) {
    if (i === program.length) {
        if (expectedOutput === runProgram(A, B, C)) {
            log('solution #2:', "" + A);
            return true;
        } else {
            return false;
        }
    }
    A *= 8;
    for (let byte = 0; byte < 8; byte++) {
        if (expectedOutput.endsWith(runProgram(A + byte, B, C)) && matchProgramOutputRecursive(A + byte, i + 1)) {
            return true;
        }
    }
    return false;
}

matchProgramOutputRecursive(0, 0);
