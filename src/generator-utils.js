/**
 * @typedef {function} filterCallback
 * @param {*} value
 * @param {number} i
 * @return {boolean}
 */

/**
 * GenUtils class description
 */
export default class GeneratorUtils {
    /**
     * @param {Generator} generator - The Generator to extend.
     */
    constructor(generator) {
        this[Symbol.iterator] = generator;
    }

    /**
     * @param {filterCallback} cb
     * @return {Array<*>} The filtered items
     */
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