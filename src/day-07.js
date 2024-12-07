#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  07 * *
 * * * * * * * */

let input = readLines('../inputs/07.txt', split(/[:\s]+/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isSolvable1(testValue, value, numbers, index = 0) {
    if (value > testValue) {
        return false;
    }
    if (index >= numbers.length) {
        return value === testValue;
    }
    return isSolvable1(testValue, value * numbers[index], numbers, index + 1)
        || isSolvable1(testValue, value + numbers[index], numbers, index + 1);
}

function calibrationResult(equations) {
    return sum(equations.map(([testValue]) => testValue))
}

let solvables1 = input.filter(([testValue, first, ...numbers]) => isSolvable1(testValue, first, numbers));

log('solution #1:', calibrationResult(solvables1));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function isSolvable2(testValue, value, numbers, index = 0) {
    if (value > testValue) {
        return false;
    }
    if (index >= numbers.length) {
        return value === testValue;
    }
    return isSolvable2(testValue, value * numbers[index], numbers, index + 1)
        || isSolvable2(testValue, value + numbers[index], numbers, index + 1)
        || isSolvable2(testValue, Number("" + value + numbers[index]), numbers, index + 1);
}

let solvables2 = input.filter(([testValue, first, ...numbers]) => isSolvable2(testValue, first, numbers));

log('solution #2:', calibrationResult(solvables2));
