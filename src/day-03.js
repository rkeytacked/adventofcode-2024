#!/usr/bin/env node
const {log, readLines} = require("./common");

/* * * * * * * *
 * * DAY  03 * *
 * * * * * * * */

let input = readLines('../inputs/03.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let prodSum = input.flatMap(line => [...line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)])
    .reduce((x, [, a, b]) => x + a * b, 0);

log('solution #1:', prodSum);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let {sum} = input.flatMap(line => [...line.matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)])
    .reduce(({sum, enabled}, [x, a, b]) =>
            x === 'do()' ? {sum, enabled: true} :
                x === 'don\'t()' ? {sum, enabled: false} :
                    {sum: enabled ? sum + a * b : sum, enabled},
        {sum: 0, enabled: true});

log('solution #2:', sum);
