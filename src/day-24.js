#!/usr/bin/env node
const {log, readLines, split, shiftUntil, cache, unique, min} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

let input = readLines('../inputs/24.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

const initialValues = new Map(shiftUntil(input).map(split(': ')));
const gates = new Map(input.map(split(' ')).map(([a, op, b, , c]) => [c, [op, ...[a, b].sort()]]));

const getValue = cache(out => {
    if (initialValues.has(out)) {
        return Number(initialValues.get(out));
    }
    let [op, a, b] = gates.get(out);
    switch (op) {
        case 'AND':
            return getValue(a) & getValue(b);
        case 'OR':
            return getValue(a) | getValue(b);
        case 'XOR':
            return getValue(a) ^ getValue(b);
    }
});


const isOut = name => name[0] === 'z';
const outputs = [...gates.keys().filter(isOut)].sort();

const binaryResult = outputs.map(getValue).reverse().join('');
log('solution #1:', Number.parseInt(binaryResult, 2));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const isX = name => name[0] === 'x';
const xFirst = min(initialValues.keys().filter(isX));
const zLast = outputs[outputs.length - 1];

const isCarryOverGate = ([op, a]) => a === xFirst ? op === 'AND' : !isX(a) && op === 'OR';
const isXorInputGate = ([op, a]) => isX(a) && op === 'XOR';
const isAndGate = ([op]) => op === 'AND';

function* spotAdditionCircuitErrors() {
    for (let [out, [op, a, b]] of gates) {
        if (isOut(out) && op !== (out === zLast ? 'OR' : 'XOR')) yield out;
        switch (op) {
            case 'XOR':
                if (!isOut(out) && !isX(a)) yield out;
                // no break
            case 'AND':
                if (!isX(a)) {
                    let A = gates.get(a), B = gates.get(b);
                    if (isCarryOverGate(A) && !isXorInputGate(B) || isXorInputGate(A) && !isCarryOverGate(B)) yield b;
                    if (isCarryOverGate(B) && !isXorInputGate(A) || isXorInputGate(B) && !isCarryOverGate(A)) yield a;
                }
                break;
            case 'OR':
                if (!isAndGate(gates.get(a))) yield a;
                if (!isAndGate(gates.get(b))) yield b;
        }
    }
}

log('solution #2:', unique(spotAdditionCircuitErrors()).sort().join(','));
