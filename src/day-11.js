#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  11 * *
 * * * * * * * */

let [input] = readLines('../inputs/11.txt', split(/\s+/g, toNumber));

let stones = new Map();

function addStones(stones, num, factor = 1) {
    stones.set(num, (stones.get(num) ?? 0) + factor);
}

for (let num of input) {
    addStones(stones, num);
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function blinkOnce() {
    let newStones = new Map();
    for (let [num, multi] of stones) {
        if (num === 0) {
            addStones(newStones, 1, multi);
            continue;
        }
        let text = "" + num;
        if (text.length % 2 === 0) {
            addStones(newStones, Number(text.substring(0, text.length / 2)), multi);
            addStones(newStones, Number(text.substring(text.length / 2)), multi);
        } else {
            addStones(newStones, num * 2024, multi);
        }
    }
    stones = newStones;
}

for (let i = 0; i < 25; i++) {
    blinkOnce();
}

log('solution #1:', sum(stones.values()));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let i = 0; i < 50; i++) {
    blinkOnce();
}

log('solution #2:', sum(stones.values()));
