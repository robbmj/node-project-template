
'use strict';

import Promise from 'bluebird';

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
    return new GenUtils(function * () {
        for (let v of [0, 1, 2, 3, 4]) {
            yield v;
        }
    });
}

async function asyncTest(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`you waited ${ms} milliseconds for this message`);
        }, ms);
    });
}

async function test() {
    console.log([...generator()]);
    console.log(generator().filter(v => (v & 1) === 0));

    const messages = await Promise.all([asyncTest(1000), asyncTest(2000)]);
    console.log(messages);
    return messages;

}

test();

export default test;
