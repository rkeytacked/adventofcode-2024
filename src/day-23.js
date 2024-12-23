#!/usr/bin/env node
const {log, readLines, split, unique} = require("./common");

/* * * * * * * *
 * * DAY  23 * *
 * * * * * * * */

let input = readLines('../inputs/23.txt', split('-'));
const neighbors = {};
for (const [from, to] of input) {
    (neighbors[from] ??= new Set()).add(to);
    (neighbors[to] ??= new Set()).add(from);
}

/* * * * * * * *
 * * Part #1 * *
 * * * * * * * */

function* findTrianglesWithT() {
    for (let a in neighbors) if (a[0] === 't') {
        for (let b in neighbors) if (neighbors[a].has(b)) {
            for (let c in neighbors) if (neighbors[b].has(c) && neighbors[c].has(a)) {
                yield [a, b, c].sort();
            }
        }
    }
}

log('solution #1:', unique(findTrianglesWithT()).length);

log('\n-----------------------------------------------------------\n')

/* * * * * * * *
 * * Part #2 * *
 * * * * * * * */

/**
 * Bron-Kerbosch-Algorithm to find maximal cliques in an undirected graph
 * @param R {Set<String>} - current clique
 * @param P {Set<String>} - candidate nodes
 * @param X {Set<String>} - excluded (visited) nodes
 * @returns {Generator<Set<String>>}
 */
function* bronKerbosch(R, P, X) {
    if (P.size === 0 && X.size === 0) {
        yield R;
    }
    for (let v of P) {
        const neighborsV = neighbors[v];
        yield* bronKerbosch( // R ∪ {v}, P ∩ neighbors(v), X ∩ neighbors(v)
            new Set(R).add(v),
            new Set(P.values().filter(n => neighborsV.has(n))),
            new Set(X.values().filter(n => neighborsV.has(n)))
        );
        P.delete(v); // P = P \ {v}
        X.add(v); // X = X ∪ {v}
    }
}

function findMaximalCliques() {
    return bronKerbosch(new Set(), new Set(Object.keys(neighbors)), new Set());
}

const largestClique = findMaximalCliques().reduce((A, B) => A.size > B.size ? A : B);
log('solution #2:', [...largestClique].sort().join(','));
