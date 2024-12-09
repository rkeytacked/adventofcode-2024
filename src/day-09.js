#!/usr/bin/env node
const {log, readLines, sum, toNumber, split} = require("./common");

/* * * * * * * *
 * * DAY  09 * *
 * * * * * * * */

const [input] = readLines('../inputs/09.txt', split('', toNumber));

const disk = [];
const spaceMap = []
const fileMap = [];

function readDisk() {
    for (let pos = 0, i = 0; i < input.length; i += 2) {
        let fileLength = input[i];
        let spaceLength = input[i + 1] ?? 0;
        fileMap[i/2] = pos;
        for (let k = 0; k < fileLength; k++) {
            disk[pos++] = i / 2;
        }
        spaceMap[i/2] = pos;
        for (let k = 0; k < spaceLength; k++) {
            disk[pos++] = '.';
        }
    }
}

function checksum(disk) {
    return sum(disk.map((v, i) => v === '.' ? 0 : v * i));
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

readDisk();

for (let i = 0; i < disk.length; i++) {
    if (disk[i] === '.') {
        for (let j = disk.length - 1; j > i; j--) {
            disk[i] = disk[j];
            disk.length--;
            if (disk[i] !== '.') {
                break;
            }
        }
    }
}

log('solution #1:', checksum(disk));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

readDisk();

for (let j = input.length-1; j > 0; j-=2) {
    for (let i=0; i < j; i+=2) {
        let fileLength = input[j];
        let spaceLength = input[i+1];
        if (fileLength <= spaceLength) {
            let fileStart = fileMap[j/2];
            let spaceStart = spaceMap[i/2];
            for(let k=0; k<fileLength; k++) {
                disk[spaceStart+k] = j/2;
                disk[fileStart+k] = '.';
            }
            spaceMap[i/2] += fileLength;
            input[i+1] -= fileLength;
            break;
        }
    }
}

log('solution #2:', checksum(disk));
