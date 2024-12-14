#!/usr/bin/env node
const {log, readLines, toNumber, split, prod, range, set} = require("./common");

/* * * * * * * *
 * * DAY  14 * *
 * * * * * * * */

let input = readLines('../inputs/14.txt', split(/\s*[pv]=|,/g, toNumber));
const width = 101, height = 103;
let robots = input.map(([, x, y, vx, vy]) => ({x, y, vx, vy}));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function step() {
    robots.forEach(r => {
        r.x = (r.x + r.vx + width) % width;
        r.y = (r.y + r.vy + height) % height;
    });
}

for (let seconds = 0; seconds < 100; seconds++, step());

let quadrants = [0, 0, 0, 0];
robots.forEach(({x, y}) => {
    if (x * 2 !== width - 1 && y * 2 !== height - 1) {
        quadrants[(x * 2 < width ? 0 : 1) + (y * 2 < height ? 0 : 2)]++;
    }
});

log('solution #1:', prod(quadrants));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function draw() {
    let area = range(height).map(() => new Array(width).fill('.'))
    robots.forEach(({x, y}) => area[y][x] = '#');
    log(area.map(row => row.join('')).join('\n'));
}

let bestEasterEggnessFactor = 0, bestSeconds = 0;
for (let seconds = 100; seconds < 2024 * 10; seconds++, step()) {
    let tiles = set(...robots.map(({x, y}) => [x, y]));
    let easterEggnessFactor = 0;
    for (let [x, y] of tiles) {
        let neighborhood = [[x - 1, y], [x + 1, y], [x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]];
        if (neighborhood.some(p => tiles.has(p))) {
            easterEggnessFactor++;
        }
    }
    if (easterEggnessFactor > bestEasterEggnessFactor) {
        bestEasterEggnessFactor = easterEggnessFactor;
        bestSeconds = seconds;
        draw();
    }
    if (seconds % 1000 === 0) {
        log('possible solution #2 after', seconds, 'iterations:', 'easterEggness factor', bestEasterEggnessFactor, 'was at second', bestSeconds);
    }
}
