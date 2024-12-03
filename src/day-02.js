#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  02 * *
 * * * * * * * */

const lines = readLines('../inputs/02.txt', split(/\s+/, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function isSafe(report) {
    let hasPositive = false, hasNegative = false;
    for (let i = 1; i < report.length; i++) {
        let diff = report[i] - report[i - 1];
        if (diff < 0) {
            hasNegative = true;
            if (hasPositive || diff < -3) {
                return false;
            }
        } else if (diff > 0) {
            hasPositive = true;
            if (hasNegative || diff > 3) {
                return false;
            }
        } else {
            return false;
        }
    }
    return true;
}

log('solution #1:', lines.filter(isSafe).length);


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function isSafeDampened(report) {
    if (isSafe(report)) {
        return true;
    }
    for (let i = 0; i < report.length; i++) {
        if (isSafe(report.toSpliced(i, 1))) {
            return true;
        }
    }
    return false;
}

log('solution #2: ', lines.filter(isSafeDampened).length);
