#!/usr/bin/env node
const {log, readLines, sum, toNumber, sort, split} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let lines = readLines('../inputs/01.txt', split(/\s+/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let first = sort(lines.map(([x]) => x));
let second = sort(lines.map(([, y]) => y));

let distances = first.map((x, i) => Math.abs(second[i] - x));

log('solution #1: ', sum(distances));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let similarityScores = second.map(y => sum(first.filter(x => x === y)));

log('solution #2: ', sum(similarityScores));
