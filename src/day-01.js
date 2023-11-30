#!/usr/bin/env node
const {log, readCharArrays, max} = require("./common");

/* * * * * * * *
 * * DAY  01 * *
 * * * * * * * */

let start = {prev: true, Verticals: [], Horizontals: [], Singles: [], Prisoner: []};
let chars = readCharArrays('../inputs/02.txt');
chars.forEach((line, y) => line.forEach((c, x) => {
    (c === 'V' ? start.Verticals : c === 'H' ? start.Horizontals : c === 'S' ? start.Singles : c === 'P' ? start.Prisoner : []).push([x, y]);
}));
let w = max(chars.map(l => l.length));
let h = chars.filter(l => l).length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const finishX = Math.floor((w - 1) / 2);
const finishY = h - 2;
log("Ziel (x|y):", finishX, finishY);

function isFinish({Prisoner: [[x, y]]}) {
    return x === finishX && y === finishY;
}

function hash({Verticals, Horizontals, Singles, Prisoner}) {
    let pic = new Array(w * h);
    pic.fill(' ');
    for (const [x, y] of Verticals) {
        pic[x + y * w] = 'V';
        pic[x + (y + 1) * w] = 'v';
    }
    for (const [x, y] of Horizontals) {
        pic[x + y * w] = 'H';
        pic[x + 1 + y * w] = 'h';
    }
    for (const [x, y] of Singles) {
        pic[x + y * w] = 'S';
    }
    for (const [x, y] of Prisoner) {
        pic[x + y * w] = 'P';
        pic[x + 1 + y * w] = pic[x + (y + 1) * w] = pic[x + 1 + (y + 1) * w] = 'p';
    }
    return pic.join('');
}

const drawRegexp = new RegExp(`(.{${w}})`, 'g');

function draw(hash) {
    return hash.replaceAll(drawRegexp, '$1\n');
}

log('Startsituation')
log(draw(hash(start)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const previous = {};

function next(checking, prev, {Verticals, Horizontals, Singles, Prisoner}) {
    const free = [...prev].map(c => c === ' ');
    for (let i = 0; i < Verticals.length; i++) {
        const [x, y] = Verticals[i];
        if (y > 0 && free[x + (y - 1) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x, y - 1]),
                Horizontals, Singles, Prisoner, prev
            });
        }
        if (y > 1 && free[x + (y - 1) * w] && free[x + (y - 2) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x, y - 2]),
                Horizontals, Singles, Prisoner, prev
            });
        }
        if (y < h - 2 && free[x + (y + 2) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x, y + 1]),
                Horizontals, Singles, Prisoner, prev
            });
        }
        if (y < h - 3 && free[x + (y + 2) * w] && free[x + (y + 3) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x, y + 2]),
                Horizontals, Singles, Prisoner, prev
            });
        }
        if (x > 0 && free[x - 1 + y * w] && free[x - 1 + (y + 1) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x - 1, y]),
                Horizontals, Singles, Prisoner, prev
            });
        }
        if (x < w - 1 && free[x + 1 + y * w] && free[x + 1 + (y + 1) * w]) {
            checking.push({
                Verticals: copy(Verticals, i, [x + 1, y]),
                Horizontals, Singles, Prisoner, prev
            });
        }
    }
    for (let i = 0; i < Horizontals.length; i++) {
        const [x, y] = Horizontals[i];
        if (y > 0 && free[x + (y - 1) * w] && free[x + 1 + (y - 1) * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x, y - 1]),
                Verticals, Singles, Prisoner, prev
            });
        }
        if (y < h - 1 && free[x + (y + 1) * w] && free[x + 1 + (y + 1) * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x, y + 1]),
                Verticals, Singles, Prisoner, prev
            });
        }
        if (x > 0 && free[x - 1 + y * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x - 1, y]),
                Verticals, Singles, Prisoner, prev
            });
        }
        if (x > 1 && free[x - 1 + y * w] && free[x - 2 + y * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x - 2, y]),
                Verticals, Singles, Prisoner, prev
            });
        }
        if (x < w - 2 && free[x + 2 + y * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x + 1, y]),
                Verticals, Singles, Prisoner, prev
            });
        }
        if (x < w - 3 && free[x + 2 + y * w] && free[x + 3 + y * w]) {
            checking.push({
                Horizontals: copy(Horizontals, i, [x + 2, y]),
                Verticals, Singles, Prisoner, prev
            });
        }
    }
    for (let i = 0; i < Singles.length; i++) {
        const [x, y] = Singles[i];
        if (y > 0 && free[x + (y - 1) * w]) {
            checking.push({
                Singles: copy(Singles, i, [x, y - 1]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (y > 1 && free[x + (y - 1) * w] && free[x + (y - 2) * w]) {
            checking.push({
                Singles: copy(Singles, i, [x, y - 2]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (y < h - 1 && free[x + (y + 1) * w]) {
            checking.push({
                Singles: copy(Singles, i, [x, y + 1]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (y < h - 2 && free[x + (y + 1) * w] && free[x + (y + 2) * w]) {
            checking.push({
                Singles: copy(Singles, i, [x, y + 2]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (x > 0 && free[x - 1 + y * w]) {
            checking.push({
                Singles: copy(Singles, i, [x - 1, y]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (x > 1 && free[x - 1 + y * w] && free[x - 2 + y * w]) {
            checking.push({
                Singles: copy(Singles, i, [x - 2, y]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (x < w - 1 && free[x + 1 + y * w]) {
            checking.push({
                Singles: copy(Singles, i, [x + 1, y]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
        if (x < w - 2 && free[x + 1 + y * w] && free[x + 2 + y * w]) {
            checking.push({
                Singles: copy(Singles, i, [x + 2, y]),
                Horizontals, Prisoner, Verticals, prev
            });
        }
    }
    for (let i = 0; i < Prisoner.length; i++) {
        const [x, y] = Prisoner[i];
        if (y > 0 && free[x + (y - 1) * w] && free[x + 1 + (y - 1) * w]) {
            checking.push({
                Prisoner: copy(Prisoner, i, [x, y - 1]),
                Horizontals, Singles, Verticals, prev
            });
        }
        if (y < h - 2 && free[x + (y + 2) * w] && free[x + 1 + (y + 2) * w]) {
            checking.push({
                Prisoner: copy(Prisoner, i, [x, y + 1]),
                Horizontals, Singles, Verticals, prev
            });
        }
        if (x > 0 && free[x - 1 + y * w] && free[x - 1 + (y + 1) * w]) {
            checking.push({
                Prisoner: copy(Prisoner, i, [x - 1, y]),
                Horizontals, Singles, Verticals, prev
            });
        }
        if (x < w - 2 && free[x + 2 + y * w] && free[x + 2 + (y + 1) * w]) {
            checking.push({
                Prisoner: copy(Prisoner, i, [x + 1, y]),
                Horizontals, Singles, Verticals, prev
            });
        }
    }
}

function copy(arr, index, elem) {
    let result = arr.slice();
    result[index] = elem;
    return result;
}

function findSolution() {
    let time = new Date().getTime();
    for (let stepsDepth = 0, nextDepthChecking = [start]; nextDepthChecking.length; stepsDepth++) {
        const checkingNow = nextDepthChecking;
        log(stepsDepth, 'Schritte:', `(${checkingNow.length} Stellungen)`);
        nextDepthChecking = [];
        for (let candidate of checkingNow) {
            let h = hash(candidate);
            if (!previous[h]) {
                previous[h] = candidate.prev;
                if (isFinish(candidate)) {
                    return h;
                }
                next(nextDepthChecking, h, candidate);
            }
        }
        let newTime = new Date().getTime();
        log('Geschwindigkeit:', Math.round((checkingNow.length + nextDepthChecking.length) / (newTime - time + 1)), 'kHz');
        time = newTime;
    }
}

let solution = findSolution();

log('solution #2\n' + draw(solution));

function* getPathToStart(state) {
    while (state && state !== true) {
        yield state;
        state = previous[state];
    }
}

[...getPathToStart(solution)].reverse().forEach((step, i) => {
    log('Schritt', i, ':');
    log(draw(step));
});