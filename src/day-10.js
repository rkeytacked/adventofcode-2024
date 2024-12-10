#!/usr/bin/env node
const {log, sum, toNumber, readCharArrays, key} = require("./common");

/* * * * * * * *
 * * DAY  10 * *
 * * * * * * * */

let input = readCharArrays('../inputs/10.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* findTrailheads() {
    const goals = input.map((line, y) => line.map((field, x) => field === 9 ? {[key(x, y)]: 1} : {}));

    for (let level = 8; level >= 0; level--) {
        for (let y = 0; y < input.height; y++) {
            for (let x = 0; x < input.width; x++) {
                if (level === input[y][x]) {
                    for (let [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
                        if (nx >= 0 && nx < input.width && ny >= 0 && ny < input.height && input[ny][nx] === level + 1) {
                            for (let [goal, count] of Object.entries(goals[ny][nx])) {
                                goals[y][x][goal] = (goals[y][x][goal] ?? 0) + count;
                            }
                        }
                    }
                    if (level === 0) {
                        yield goals[y][x];
                    }
                }
            }
        }
    }
}

function score(trailhead) {
    return Object.keys(trailhead).length;
}

log('solution #1:', sum(findTrailheads().map(score)));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

function rating(trailhead) {
    return sum(Object.values(trailhead));
}

log('solution #2:', sum(findTrailheads().map(rating)));
