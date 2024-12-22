#!/usr/bin/env node
const {log, readLines, sum, toNumber, set, key, max} = require("./common");

/* * * * * * * *
 * * DAY  22 * *
 * * * * * * * */

let input = readLines('../inputs/22.txt', toNumber);

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* pseudoRandom(secret) {
    while (true) {
        secret = (secret ^ (secret << 6)) & 16777215;
        secret = (secret ^ (secret >> 5)) & 16777215;
        secret = (secret ^ (secret << 11)) & 16777215;
        yield secret;
    }
}

const secret2000s = input.map(num => pseudoRandom(num).drop(1999).next().value);
log('solution #1:', sum(secret2000s));

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

let bestPrices = {};

for (let secret of input) {
    let visited = set();
    let price = secret % 10;
    let [a, b, c, d] = [];
    for (let newPrice of pseudoRandom(secret).take(2000).map(x => x % 10)) {
        [a, b, c, d] = [b, c, d, newPrice - price];
        if (a !== undefined) {
            let priceKey = key(a, b, c, d);
            if (!visited.has(priceKey)) {
                visited.add(priceKey);
                bestPrices[priceKey] = (bestPrices[priceKey] ?? 0) + newPrice;
            }
        }
        price = newPrice;
    }
}

log('solution #2:', max(Object.values(bestPrices)));
