#!/usr/bin/env node
const {log, readLines, toNumber, split, set, key, binarySearch} = require("./common");

/* * * * * * * *
 * * DAY  18 * *
 * * * * * * * */

let input = readLines('../inputs/18.txt', split(',', toNumber));
const width = 71;
const height = 71;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function findExitCost(bytesCount) {
    let corrupted = set(...input.slice(0, bytesCount));

    let toVisit = [[0, 0]];
    let costs = {[key(0, 0)]: 0};

    while (toVisit.length) {
        let [x, y] = toVisit.shift();
        let cost = costs[key(x, y)];
        for (let neighbor of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
            if (x >= 0 && y >= 0 && x < width && y < height && !corrupted.has(neighbor) && !(cost + 1 >= costs[key(neighbor)])) {
                costs[key(neighbor)] = cost + 1;
                toVisit.push(neighbor);
            }
        }
    }
    return costs[key(width - 1, height - 1)];
}

log('solution #1:', findExitCost(input.slice(0, 1024)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let blockingIndex = binarySearch(1024, input.length, i => findExitCost(i) === undefined) - 1;

log('solution #2:', input[blockingIndex].join(','));
