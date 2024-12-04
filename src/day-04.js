#!/usr/bin/env node
const {log, readLines, sum, toNumber, readCharArrays} = require("./common");

/* * * * * * * *
 * * DAY  04 * *
 * * * * * * * */

const input = readCharArrays('../inputs/04.txt');
const height = input.length, width = input[0].length;

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const horizVertically = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const diagonally = [[1, 1], [-1, 1], [-1, -1], [1, -1]];

function findWord(word, directions) {
    let found = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            loop: for (let [dx, dy] of directions) {
                for (let iy = 0; iy < word.length; iy++) {
                    for (let ix = 0; ix < word[iy].length; ix++) {
                        let c = word[iy][ix];
                        if (c === '.') {
                            continue;
                        }
                        let X = x + dx * ix + dy * iy;
                        let Y = y + dy * ix - dx * iy;
                        if (X < 0 || Y < 0 || X >= width || Y >= height || input[Y][X] !== c) {
                            continue loop;
                        }
                    }
                }
                found++;
            }
        }
    }
    return found;
}

log('solution #1:', findWord(['XMAS'], [...horizVertically, ...diagonally]));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', findWord(['M.S', '.A.', 'M.S'], horizVertically));
