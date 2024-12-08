#!/usr/bin/env node
const {log, readLines, sum, toNumber, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  08 * *
 * * * * * * * */

let input = readCharArrays('../inputs/08.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const antennas = {};
input.forEach((line, y) => line.forEach((frequency, x) => {
    if (frequency !== '.') {
        (antennas[frequency] ||= []).push({x, y});
    }
}));

const antinodes = new Set();

function addAntinode(a) {
    if (a.x >= 0 && a.y >= 0 && a.x < input.width && a.y < input.height) {
        return antinodes.add(key(a.x, a.y));
    }
}

for (let frequency in antennas) {
    for (let i = 0; i < antennas[frequency].length; i++) {
        for (let j = i + 1; j < antennas[frequency].length; j++) {
            const p1 = antennas[frequency][i];
            const p2 = antennas[frequency][j];
            const [dX, dY] = [p2.x - p1.x, p2.y - p1.y];
            addAntinode({x: p1.x - dX, y: p1.y - dY});
            addAntinode({x: p2.x + dX, y: p2.y + dY});
        }
    }
}

log('solution #1:', antinodes.size);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

for (let frequency in antennas) {
    for (let i = 0; i < antennas[frequency].length; i++) {
        for (let j = i + 1; j < antennas[frequency].length; j++) {
            const p1 = antennas[frequency][i];
            const p2 = antennas[frequency][j];
            const [dX, dY] = [p2.x - p1.x, p2.y - p1.y];
            for (let node = p1; addAntinode(node); node = {x: node.x - dX, y: node.y - dY}) ;
            for (let node = p2; addAntinode(node); node = {x: node.x + dX, y: node.y + dY}) ;
        }
    }
}

log('solution #2:', antinodes.size);
