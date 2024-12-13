#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  13 * *
 * * * * * * * */

let input = readLines('../inputs/13.txt', split(/^.*?[+=]|,.*?[+=]/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* findIntegerIntersections(addC = 0) {
    for (let i = 0; i < input.length; i++) {
        let [, a1, a2] = input[i++];
        let [, b1, b2] = input[i++];
        let [, c1, c2] = input[i++];
        [c1, c2] = [c1 + addC, c2 + addC];

        let divisor = a1 * b2 - a2 * b1;
        let a = c1 * b2 - c2 * b1;
        let b = a1 * c2 - a2 * c1;
        if (a % divisor === 0 && b % divisor === 0) {
            yield 3 * a / divisor + b / divisor;
        }
    }
}

log('solution #1:', sum(findIntegerIntersections()));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(findIntegerIntersections(10000000000000)));
