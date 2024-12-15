#!/usr/bin/env node
const {log, readLines, sum, shiftUntil, set, forEach2D} = require("./common");

/* * * * * * * *
 * * DAY  15 * *
 * * * * * * * */

let input = readLines('../inputs/15.txt');

const warehouse = shiftUntil(input);
const steps = [...input.join('')];

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let walls = set(), goods = set(), pX, pY;

forEach2D(warehouse, '#', (x, y) => walls.add([x, y]));
forEach2D(warehouse, 'O', (x, y) => goods.add([x, y]));
forEach2D(warehouse, '@', (x, y) => [pX, pY] = [x, y]);

const directions = {
    '<': [-1, 0],
    '>': [1, 0],
    '^': [0, -1],
    'v': [0, 1]
};

function doStep(step) {
    let [dX, dY] = directions[step];
    let hitWall = false, countBoxes = 0;
    let [tX, tY] = [pX + dX, pY + dY];
    for (; !hitWall; [tX, tY] = [tX + dX, tY + dY]) {
        if (goods.has([tX, tY])) {
            countBoxes++;
        } else if (walls.has([tX, tY])) {
            hitWall = true;
        } else {
            break;
        }
    }
    if (hitWall) {
        return;
    }
    [pX, pY] = [pX + dX, pY + dY];
    if (countBoxes > 0) {
        goods.delete([pX, pY]);
        goods.add([tX, tY]);
    }
}

function gps([x, y]) {
    return 100 * y + x;
}

steps.forEach(doStep);
log('solution #1:', goods.size, 'boxes with GPS sum', sum([...goods].map(gps)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

walls.clear();
goods.clear();
forEach2D(warehouse, '#', (x, y) => walls.add([2 * x, y]) && walls.add([2 * x + 1, y]));
forEach2D(warehouse, 'O', (x, y) => goods.add([2 * x, y]));
forEach2D(warehouse, '@', (x, y) => [pX, pY] = [2 * x, y]);

function findBoxes2Left(x, y) {
    let result = set();
    for (x -= 2; goods.has([x, y]); x -= 2) {
        result.add([x, y]);
    }
    if (walls.has([x + 1, y])) {
        return false;
    }
    return result;
}

function findBoxes2Right(x, y) {
    let result = set();
    for (x++; goods.has([x, y]); x += 2) {
        result.add([x, y]);
    }
    if (walls.has([x, y])) {
        return false;
    }
    return result;
}

function findBoxes2Down(x, y) {
    let result = set();
    for (let pushCoords = set([x, y + 1]); pushCoords.size > 0; y++) {
        let nextCoords = set();
        for (let [pX, pY] of pushCoords) {
            if (walls.has([pX, pY])) {
                return false;
            }
            if (goods.has([pX, pY])) {
                nextCoords.add([pX, pY + 1]);
                nextCoords.add([pX + 1, pY + 1]);
                result.add([pX, pY]);
            } else if (goods.has([pX - 1, pY])) {
                nextCoords.add([pX, pY + 1]);
                nextCoords.add([pX - 1, pY + 1]);
                result.add([pX - 1, pY]);
            }
        }
        pushCoords = nextCoords;
    }
    return result;
}

function findBoxes2Up(x, y) {
    let result = set();
    for (let pushCoords = set([x, y - 1]); pushCoords.size > 0; y--) {
        let nextCoords = set();
        for (let [pX, pY] of pushCoords) {
            if (walls.has([pX, pY])) {
                return false;
            }
            if (goods.has([pX, pY])) {
                nextCoords.add([pX, pY - 1]);
                nextCoords.add([pX + 1, pY - 1]);
                result.add([pX, pY]);
            } else if (goods.has([pX - 1, pY])) {
                nextCoords.add([pX, pY - 1]);
                nextCoords.add([pX - 1, pY - 1]);
                result.add([pX - 1, pY]);
            }
        }
        pushCoords = nextCoords;
    }
    return result;
}

const boxFindings = {
    '<': findBoxes2Left,
    '>': findBoxes2Right,
    '^': findBoxes2Up,
    'v': findBoxes2Down
};

function doStep2(step) {
    let boxes = boxFindings[step](pX, pY);
    if (!boxes) {
        return;
    }
    let [dX, dY] = directions[step];
    [pX, pY] = [pX + dX, pY + dY];
    for (let [x, y] of boxes) {
        goods.delete([x, y]);
    }
    for (let [x, y] of boxes) {
        goods.add([x + dX, y + dY]);
    }
}

steps.forEach(doStep2);
log('solution #2:', goods.size, 'boxes with GPS sum', sum([...goods].map(gps)));
