
'use strict';

import Promise from 'bluebird';

//const Promise = require("bluebird");

class GenUtils {
    constructor(generator) {
        this[Symbol.iterator] = generator;
    }

    filter(cb) {
        let i = 0;
        const a = [];
        for (let v of this) {
            if (cb(v, i++)) {
                a.push(v);
            }

        }
        return a;
    }
}

function generator() {
    return new GenUtils(function* () {
        for (let v of [0, 1, 2, 3, 4]) {
            yield v;
        }
    });
}

async function asyncTest() {

}

function test() {
    console.log([...generator()]);
    console.log(generator().filter(v => (v & 1) === 0));
}

test();