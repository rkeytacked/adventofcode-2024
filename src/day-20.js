#!/usr/bin/env node
const {log, readCharArrays, forEach2D, key} = require("./common");

/* * * * * * * *
 * * DAY  20 * *
 * * * * * * * */

let input = readCharArrays('../inputs/20.txt');
let [sX, sY] = [0, 0];
let [eX, eY] = [0, 0];

forEach2D(input, 'S', (x, y) => [sX, sY] = [x, y]);
forEach2D(input, 'E', (x, y) => [eX, eY] = [x, y]);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* neighbors(x, y, radius) {
    for (let i = -radius; i <= radius; i++) {
        for (let j = Math.abs(i) - radius; j + Math.abs(i) <= radius; j++) {
            if (i !== 0 || j !== 0) {
                yield [x + i, y + j, Math.abs(i) + Math.abs(j)];
            }
        }
    }
}

let trackPositions = {[key(sX, sY)]: {x: sX, y: sY, dist: 0}};
for (let x = sX, y = sY, lastX = 0, lastY = 0, dist = 0; x !== eX || y !== eY;) {
    for (let [nextX, nextY] of neighbors(x, y, 1)) {
        if (input[nextY][nextX] !== '#' && (nextX !== lastX || nextY !== lastY)) {
            [lastX, lastY] = [x, y];
            [x, y] = [nextX, nextY];
            trackPositions[key(x, y)] = {x, y, dist: ++dist};
            break;
        }
    }
}

function countCheats(radius, threshold) {
    let cheatCount = 0;
    for (let {x, y, dist} of Object.values(trackPositions)) {
        for (let [nextX, nextY, steps] of neighbors(x, y, radius)) {
            let position = trackPositions[key(nextX, nextY)];
            if (position && position.dist - dist - steps >= threshold) {
                cheatCount++;
            }
        }
    }
    return cheatCount;
}

const threshold = input.length < 100 ? 50 : 100; // for test cases

log('solution #1:', countCheats(2, threshold));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', countCheats(20, threshold));
