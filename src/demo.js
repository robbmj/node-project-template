
'use strict';

import Promise from 'bluebird';
import { param, returns } from './decorators';
import GeneratorUtils from './generator-utils';


/**
 * @return {GeneratorUtils}
 */
function generator() {
    return new GeneratorUtils(function * () {
        for (let v of [0, 1, 2, 3, 4]) {
            yield v;
        }
    });
}

/**
 * A Test for decorators
 */
class DecoratorTest {

    /**
     * Prints' I am decorated' when the method is called
     *
     * @param {String} name - someone's name
     * @param {number?} age - that person's age, if you know it.
     *
     * @return {String} A message stating a persons name and age.
     */
    @param('string', ['number', 'undefined'])
    @returns('string')
    decoratorTest(name, age) {
        console.log('I am decorated');
        age = age || '31, I think';
        return `${name} is ${age}`;
    }
}

/**
 * Resolves after `ms` milliseconds
 *
 * @param {number} ms - The time to wait
 * @return {Promise}
 */
async function getPromise(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`you waited ${ms} milliseconds for this message`);
        }, ms);
    });
}

/**
 * Logs and return async messages
 *
 * @return {Array<String>} messages
 */
export async function asyncTest() {
    const messages = await Promise.all([getPromise(1000), getPromise(2000)]);
    console.log(messages);
    return messages;
}

/**
 * Logs Arrays create by the generator function
 */
export function generatorTest() {
    console.log([...generator()]);
    console.log(generator().filter(v => (v & 1) === 0));
}

/**
 * Logs the return values of the decoratorTest method
 */
export function decoratorTest() {
    const test = new DecoratorTest();
    console.log(test.decoratorTest('mike'));
    console.log(test.decoratorTest('mike', 31));
}
