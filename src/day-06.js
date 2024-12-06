#!/usr/bin/env node
const {log, toNumber, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  06 * *
 * * * * * * * */

const input = readCharArrays('../inputs/06.txt');
let height = input.length;
let width = input[0].length;
let startX = 0, startY = 0;
loop: for (startY = 0; startY < height; startY++) {
    for (startX = 0; startX < width; startX++) {
        if (input[startY][startX] !== '.' && input[startY][startX] !== '#') {
            break loop;
        }
    }
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function walkPath() {
    const visited = new Set();
    let [x, y] = [startX, startY];
    for (let direction = [0, -1]; x >= 0 && x < width && y >= 0 && y < height; x += direction[0], y += direction[1]) {
        if (input[y][x] === '#') {
            x -= direction[0];
            y -= direction[1];
            direction = [-direction[1], direction[0]];
        }
        visited.add(key(x, y));
    }
    return visited;
}

const path = walkPath();
log('solution #1:', path.size);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const xCoordsOfInterest = [], yCoordsOfInterest = [];
input.forEach((line, y) => line.forEach((v, x) => {
    if (v === '#') {
        xCoordsOfInterest[x - 1] = xCoordsOfInterest[x + 1] = true;
        yCoordsOfInterest[y - 1] = yCoordsOfInterest[y + 1] = true;
    }
}));

function hasLoop() {
    const visited = new Set();
    let [x, y] = [startX, startY];
    for (let direction = [0, -1]; x >= 0 && x < width && y >= 0 && y < height; x += direction[0], y += direction[1]) {
        if (input[y][x] === '#') {
            x -= direction[0];
            y -= direction[1];
            direction = [-direction[1], direction[0]];
        }
        let config = key(x, y, direction);
        if (visited.has(config)) {
            return true;
        }
        visited.add(config);
    }
    return false;
}

let loopDetectionCounter = 0;
for (let [x, y] of [...path].map(id => id.split(':').map(toNumber))) {
    if (xCoordsOfInterest[x] && yCoordsOfInterest[y] && input[y][x] === '.') {
        input[y][x] = '#';
        if (hasLoop()) {
            loopDetectionCounter++;
        }
        input[y][x] = '.';
    }
}

log('solution #2:', loopDetectionCounter);
