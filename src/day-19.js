#!/usr/bin/env node
const {log, readLines, sum, max, cache} = require("./common");

/* * * * * * * *
 * * DAY  19 * *
 * * * * * * * */

let input = readLines('../inputs/19.txt');
let towels = new Set(input.shift().split(', '));
let maxSize = max([...towels].map(x => x.length));
let [, ...patterns] = input;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const findPossibilities = cache(pattern => {
    if (pattern.length === 0) {
        return 1;
    }
    let count = 0;
    for (let i = 1; i <= pattern.length && i <= maxSize; i++) {
        let subPattern = pattern.substring(i);
        if (towels.has(pattern.substring(0, i))) {
            count += findPossibilities(subPattern);
        }
    }
    return count;
});

log('solution #1:', patterns.filter(findPossibilities).length);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(patterns.map(findPossibilities)));
