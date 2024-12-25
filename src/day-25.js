#!/usr/bin/env node
const {log, readLines, shiftUntil, forEach2D} = require("./common");

/* * * * * * * *
 * * DAY  25 * *
 * * * * * * * */

let input = readLines('../inputs/25.txt');

const locks = [];
const keys = [];
while (input.length) {
    let next = shiftUntil(input);
    let object = new Array(5).fill(0);
    (next.shift() === '#####' ? locks : keys).push(object);
    next.pop();
    forEach2D(next, '#', x => object[x]++);
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let matches = locks.flatMap(lock => keys.filter(key => lock.every((pin, i) => pin + key[i] <= 5)));
log('solution #1:', matches.length);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', 'Merry Christmas!');
