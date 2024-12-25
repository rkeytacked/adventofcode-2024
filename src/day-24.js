#!/usr/bin/env node
const {log, readLines, split, shiftUntil, cache, unique} = require("./common");

/* * * * * * * *
 * * DAY  24 * *
 * * * * * * * */

let input = readLines('../inputs/24.txt');

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */
const initialValues = new Map(shiftUntil(input).map(split(': ')));
const gates = new Map(input.map(split(' ')).map(([a, op, b, , c]) => [c, {op, params: [a, b].sort()}]));

const getValue = cache(name => {
    if (initialValues.has(name)) {
        return Number(initialValues.get(name));
    }
    let {op, params: [a, b]} = gates.get(name);
    switch (op) {
        case 'AND':
            return getValue(a) & getValue(b);
        case 'OR':
            return getValue(a) | getValue(b);
        case 'XOR':
            return getValue(a) ^ getValue(b);
    }
});

const inputsX = [...gates.values().flatMap(({params}) => params).filter(name => name[0] === 'x')].sort();
const outputs = [...gates.keys().filter(name => name[0] === 'z')].sort();

const binaryResult = outputs.map(getValue).reverse().join('');
log('solution #1:', Number.parseInt(binaryResult, 2));


log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

const xFirst = inputsX[0];
const zLast = outputs[outputs.length - 1];

function isOutput(name) {
    return name[0] === 'z';
}

function isInputs(a, b) {
    return a[0] === 'x' && b[0] === 'y';
}

function* spotErrors() {
    for (let [out, {op, params: [a, b]}] of gates) {
        if (isOutput(out) && op !== (out === zLast ? 'OR' : 'XOR')) yield out;
        if (op === 'XOR' && !isInputs(a, b) && !isOutput(out)) yield out;
        if ((op === 'XOR' || op === 'AND') && !isInputs(a, b)) {
            let isAndOrGate = ({op, params}) => params[0] === xFirst ? op === 'AND' : !isInputs(params) && op === 'OR';
            let isXorGate = ({op, params}) => isInputs(...params) && op === 'XOR';
            let A = gates.get(a), B = gates.get(b);
            if (isAndOrGate(A) && !isXorGate(B) || isXorGate(A) && !isAndOrGate(B)) yield b;
            if (isAndOrGate(B) && !isXorGate(A) || isXorGate(B) && !isAndOrGate(A)) yield a;
        }
        if (op === 'OR') {
            if (gates.get(a).op !== 'AND') yield a;
            if (gates.get(b).op !== 'AND') yield b;
        }
    }
}

log('solution #2:', unique(spotErrors()).sort().join(','));
