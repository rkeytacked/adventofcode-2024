#!/usr/bin/env node
const {log, readLines, sum, cache, min, key} = require("./common");

/* * * * * * * *
 * * DAY  21 * *
 * * * * * * * */

let input = readLines('../inputs/21.txt');

const mapButtons = (row, y) => [...row].map((c, x) => [c, [x, y]]);
const numericKeypad = new Map(['789', '456', '123', ' 0A'].flatMap(mapButtons));
const arrowKeypad = new Map([' ^A', '<v>'].flatMap(mapButtons));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const moves = {};
for (let [a, from] of numericKeypad) for (let [b, to] of numericKeypad) {
    moves[a + b] = [...findMoves(from, to, numericKeypad.get(' '))];
}
for (let [a, from] of arrowKeypad) for (let [b, to] of arrowKeypad) {
    moves[a + b] = [...findMoves(from, to, arrowKeypad.get(' '))];
}

function* findMoves([fromX, fromY], [toX, toY], [avoidX, avoidY]) {
    if (fromX === avoidX && fromY === avoidY || toX === avoidX && toY === avoidY) {
        return;
    }
    if (fromX === toX && fromY === toY) {
        yield 'A';
    }
    if (fromX < toX) {
        for (let m of findMoves([fromX + 1, fromY], [toX, toY], [avoidX, avoidY])) yield '>' + m;
    }
    if (fromX > toX) {
        for (let m of findMoves([fromX - 1, fromY], [toX, toY], [avoidX, avoidY])) yield '<' + m;
    }
    if (fromY < toY) {
        for (let m of findMoves([fromX, fromY + 1], [toX, toY], [avoidX, avoidY])) yield 'v' + m;
    }
    if (fromY > toY) {
        for (let m of findMoves([fromX, fromY - 1], [toX, toY], [avoidX, avoidY])) yield '^' + m;
    }
}

const countMinimumSteps = cache(function (buttons, directionalConsoles) {
    if (directionalConsoles === 0) {
        return buttons.length;
    }
    let steps = 0, a = 'A';
    for (let b of buttons) {
        steps += min(moves[a + b].map(p => countMinimumSteps(p, directionalConsoles - 1)));
        a = b;
    }
    return steps;
}, key);

function getComplexity(buttons, robots) {
    let number = Number(buttons.slice(0, -1));
    let steps = countMinimumSteps(buttons, robots + 1);
    log(buttons, `-(${robots})->`, number, '*', steps, '=', number * steps, '.');
    return number * steps;
}

log('solution #1:', sum(input.map(line => getComplexity(line, 2))));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(input.map(line => getComplexity(line, 25))));
