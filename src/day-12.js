#!/usr/bin/env node
const {log, sum, readCharArrays, set} = require("./common");

/* * * * * * * *
 * * DAY  12 * *
 * * * * * * * */

let input = readCharArrays('../inputs/12.txt');

let types = {};

input.forEach((row, y) => row.forEach((field, x) => (types[field] ||= []).push([x, y])));

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

let regions = Object.values(types).flatMap(coords => [...splitRegions(coords)]);

function* splitRegions(coords) {
    let unchecked = set(...coords);
    for (let start of coords) {
        if (!unchecked.has(start)) {
            continue;
        }
        const fields = set();
        for (let toVisit = [start]; toVisit.length > 0;) {
            const [x, y] = toVisit.pop();
            if (!unchecked.delete([x, y])) {
                continue;
            }
            fields.add([x, y]);
            toVisit.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
        }
        let perimeter = 0;
        let sides = 0;
        for (let [x, y] of fields) {
            if (!fields.has([x - 1, y])) {
                perimeter++;
                if (!fields.has([x, y + 1]) || fields.has([x - 1, y + 1])) {
                    sides++;
                }
            }
            if (!fields.has([x + 1, y])) {
                perimeter++;
                if (!fields.has([x, y - 1]) || fields.has([x + 1, y - 1])) {
                    sides++;
                }
            }
            if (!fields.has([x, y - 1])) {
                perimeter++;
                if (!fields.has([x - 1, y]) || fields.has([x - 1, y - 1])) {
                    sides++;
                }
            }
            if (!fields.has([x, y + 1])) {
                perimeter++;
                if (!fields.has([x + 1, y]) || fields.has([x + 1, y + 1])) {
                    sides++;
                }
            }
        }
        yield {
            fields: fields,
            size: fields.size,
            perimeter,
            sides
        };
    }
}

log('solution #1:', sum(regions.map(r => r.size * r.perimeter)));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

log('solution #2:', sum(regions.map(r => r.size * r.sides)));
