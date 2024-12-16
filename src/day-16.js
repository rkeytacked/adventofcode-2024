#!/usr/bin/env node
const {log, toNumber, readCharArrays, forEach2D, key, min, set, unkey} = require("./common");

/* * * * * * * *
 * * DAY  16 * *
 * * * * * * * */

let input = readCharArrays('../inputs/16.txt');

let startX = 0, startY = 0, endX = 0, endY = 0;
forEach2D(input, 'S', (x, y) => [startX, startY] = [x, y]);
forEach2D(input, 'E', (x, y) => [endX, endY] = [x, y]);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const costsToReach = {[key(startX, startY, 1, 0)]: 0};
const toVisit = [{x: startX, y: startY, dX: 1, dY: 0, costs: 0}];

function visitIfCheaper(x, y, dX, dY, costs) {
    let situationKey = key(x, y, dX, dY);
    if (input[y][x] !== '#' && !(costs >= costsToReach[situationKey])) {
        costsToReach[situationKey] = costs;
        toVisit.push({x, y, dX, dY, costs});
    }
}

for (let situation; (situation = toVisit.shift());) {
    let {x, y, dX, dY, costs} = situation;
    visitIfCheaper(x + dX, y + dY, dX, dY, costs + 1);
    visitIfCheaper(x, y, dY, -dX, costs + 1000);
    visitIfCheaper(x, y, -dY, dX, costs + 1000);
}

let endKeyPrefix = key(endX, endY, '');
let endKeys = Object.keys(costsToReach).filter(k => k.startsWith(endKeyPrefix));
let bestTotalScore = min(endKeys.map(k => costsToReach[k]));

log('solution #1:', bestTotalScore);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let bestPlaces = set([endX, endY], [startX, startY]);

for (let situationKey of endKeys.filter(k => costsToReach[k] === bestTotalScore)) {
    let [x, y, dX, dY] = unkey(situationKey, toNumber);
    toVisit.push({x, y, dX, dY, costs: bestTotalScore});
}

function visitIfSameCosts(x, y, dX, dY, costs) {
    if (costsToReach[key(x, y, dX, dY)] === costs) {
        toVisit.push({x, y, dX, dY, costs});
    }
}

for (let situation; (situation = toVisit.shift());) {
    let {x, y, dX, dY, costs} = situation;
    bestPlaces.add([x, y]);
    visitIfSameCosts(x - dX, y - dY, dX, dY, costs - 1);
    visitIfSameCosts(x, y, -dY, dX, costs - 1000);
    visitIfSameCosts(x, y, dY, -dX, costs - 1000);
}

log('solution #2:', bestPlaces.size);
