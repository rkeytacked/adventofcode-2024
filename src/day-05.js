#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  05 * *
 * * * * * * * */

let input = readLines('../inputs/05.txt', split(/[,|]/g, toNumber));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const comesAfter = {};
let lineIndex = 0;
for (; lineIndex < input.length && input[lineIndex].length === 2; lineIndex++) {
    const [a, b] = input[lineIndex];
    (comesAfter[a] ||= new Set()).add(b);
}
const updates = input.slice(lineIndex + 1);

function isRightOrder(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let a = arr[i];
            let b = arr[j];
            if (comesAfter[b]?.has(a)) {
                return false;
            }
        }
    }
    return true;
}

const alreadyFineUpdates = updates.filter(isRightOrder);

log('solution #1:', sum(alreadyFineUpdates.map(arr => arr[(arr.length - 1) / 2])));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function toRightOrder(broken) {
    let arr = broken.slice();
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            let a = arr[i];
            let b = arr[j];
            if (comesAfter[b]?.has(a)) {
                [arr[i], arr[j]] = [b, a]
                j = i + 1;
            }
        }
    }
    return arr;
}

const fixedUpdates = updates.filter(x => !isRightOrder(x)).map(toRightOrder);

log('solution #2:', sum(fixedUpdates.map(arr => arr[(arr.length - 1) / 2])));
